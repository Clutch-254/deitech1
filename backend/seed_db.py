#!/usr/bin/env python3
"""Seed the database with mock products"""

import sys
import os

# Add the backend directory to the path
sys.path.insert(0, os.path.dirname(__file__))

from app import app, db, Product

# Mock products data
mock_products = [
    {
        'product_name': 'Imperial Leather Active Bar Soap',
        'sku': 'ILS-175G-ACT',
        'category': 'Soaps',
        'brand': 'Imperial Leather',
        'variant': 'Active',
        'product_type': 'Bar Soap',
        'quantity': 175,
        'unit': 'g',
        'batch_number': 'BATCH-IL-001',
        'status': 'Approved'
    },
    {
        'product_name': 'Imperial Leather Japanese Spa Bar Soap',
        'sku': 'ILS-175G-JSP',
        'category': 'Soaps',
        'brand': 'Imperial Leather',
        'variant': 'Japanese Spa',
        'product_type': 'Bar Soap',
        'quantity': 175,
        'unit': 'g',
        'batch_number': 'BATCH-IL-002',
        'status': 'Approved'
    },
    {
        'product_name': 'Morning Fresh Original Dishwashing Liquid',
        'sku': 'MFD-450ML-ORIG',
        'category': 'Dishwashing',
        'brand': 'Morning Fresh',
        'variant': 'Original',
        'product_type': 'Dishwashing Liquid',
        'quantity': 450,
        'unit': 'ml',
        'batch_number': 'BATCH-MF-003',
        'status': 'In Review'
    },
    {
        'product_name': 'Morning Fresh Orange & Tea Tree Dishwashing Liquid',
        'sku': 'MFD-450ML-OTT',
        'category': 'Dishwashing',
        'brand': 'Morning Fresh',
        'variant': 'Orange & Tea Tree',
        'product_type': 'Dishwashing Liquid',
        'quantity': 450,
        'unit': 'ml',
        'batch_number': 'BATCH-MF-004',
        'status': 'Draft'
    },
    {
        'product_name': 'Flamingo Rose Bar Soap',
        'sku': 'FLS-150G-ROSE',
        'category': 'Soaps',
        'brand': 'Flamingo',
        'variant': 'Rose',
        'product_type': 'Bar Soap',
        'quantity': 150,
        'unit': 'g',
        'batch_number': 'BATCH-FL-002',
        'status': 'In Review'
    },
    {
        'product_name': 'Flamingo Lemon Bar Soap',
        'sku': 'FLS-150G-LEMN',
        'category': 'Soaps',
        'brand': 'Flamingo',
        'variant': 'Lemon',
        'product_type': 'Bar Soap',
        'quantity': 150,
        'unit': 'g',
        'batch_number': 'BATCH-FL-003',
        'status': 'Draft'
    },
    {
        'product_name': 'Carex Hand Wash Original',
        'sku': 'CXHW-250ML-ORIG',
        'category': 'Hand Wash',
        'brand': 'Carex',
        'variant': 'Original',
        'product_type': 'Liquid Soap',
        'quantity': 250,
        'unit': 'ml',
        'batch_number': 'BATCH-CXHW-001',
        'status': 'Approved'
    },
    {
        'product_name': 'Carex Hand Wash Sensitive',
        'sku': 'CXHW-250ML-SENS',
        'category': 'Hand Wash',
        'brand': 'Carex',
        'variant': 'Sensitive',
        'product_type': 'Liquid Soap',
        'quantity': 250,
        'unit': 'ml',
        'batch_number': 'BATCH-CXHW-002',
        'status': 'Approved'
    },
    {
        'product_name': 'Imperial Leather Bodywash Active',
        'sku': 'ILBW-500ML-ACT',
        'category': 'Bodywash',
        'brand': 'Imperial Leather',
        'variant': 'Active',
        'product_type': 'Bodywash',
        'quantity': 500,
        'unit': 'ml',
        'batch_number': 'BATCH-ILBW-001',
        'status': 'Approved'
    },
    {
        'product_name': 'Baby Jelly Mild',
        'sku': 'CBJ-100G-MILD',
        'category': 'Cussons Baby',
        'brand': 'Cussons Baby',
        'variant': 'Mild',
        'product_type': 'Baby Jelly',
        'quantity': 100,
        'unit': 'g',
        'batch_number': 'BATCH-CBJ-001',
        'status': 'Approved'
    }
]

def seed_database():
    with app.app_context():
        # Check if products already exist
        existing_count = Product.query.count()
        if existing_count > 0:
            print(f"Database already has {existing_count} products. Skipping seed.")
            return
        
        print("Seeding database with mock products...")
        
        for product_data in mock_products:
            product = Product(**product_data)
            db.session.add(product)
        
        db.session.commit()
        print(f"✅ Successfully added {len(mock_products)} mock products!")
        
        # Display the products
        print("\nProducts added:")
        for product in Product.query.all():
            print(f"  - {product.product_name} ({product.sku}) - {product.status}")

if __name__ == '__main__':
    seed_database()
