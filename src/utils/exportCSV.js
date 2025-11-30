// CSV Export utility
export const exportToCSV = (products, filename = 'products.csv') => {
    if (!products || products.length === 0) {
        alert('No products to export');
        return;
    }

    // Define CSV headers
    const headers = [
        'ID',
        'Product Name',
        'SKU',
        'Batch Number',
        'Category',
        'Brand',
        'Variant',
        'Product Type',
        'Quantity',
        'Unit',
        'Status',
        'Created At',
    ];

    // Convert products to CSV rows
    const rows = products.map(product => [
        product.id,
        product.productName || product.product_name,
        product.sku,
        product.batchNumber || product.batch_number || '',
        product.category,
        product.brand,
        product.variant || '',
        product.productType || product.product_type || '',
        product.quantity || '',
        product.unit || '',
        product.status,
        product.created_at || product.createdAt || new Date().toISOString(),
    ]);

    // Combine headers and rows
    const csvContent = [
        headers.join(','),
        ...rows.map(row => row.map(cell => `"${cell}"`).join(','))
    ].join('\n');

    // Create blob and download
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);

    link.setAttribute('href', url);
    link.setAttribute('download', filename);
    link.style.visibility = 'hidden';

    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
};
