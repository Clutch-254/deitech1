# Deitech1 PIM System - Quick Start Guide

## 🚀 Quick Start (2 Steps)

### 1. Start Backend
```bash
cd backend
./venv/bin/python app.py
```
✅ Backend running on http://localhost:5000

### 2. Start Frontend (new terminal)
```bash
npm start
```
✅ Frontend running on http://localhost:3000

## 🎯 What You Can Do Now

### ✅ Add Products
1. Click "Add Product" button
2. Fill in all fields (including Category dropdown)
3. Click "Save Product"
4. **Product is saved to database!**

### ✅ Edit Products
1. Click "Edit" button on any product card
2. Modify fields
3. Click "Save Product"
4. **Changes persisted!**

### ✅ Delete Products
1. Click "Delete" button (red with trash icon)
2. Confirm deletion
3. **Product removed from database!**

### ✅ Export to CSV
1. Click "Export CSV" button (green)
2. File downloads automatically
3. **All products exported!**

### ✅ Data Persists
- Refresh the page
- **All products still there!**
- No more data loss

## 📊 Default Admin Login

- Email: `admin@deitech.com`
- Password: `admin123`

## 🔧 Troubleshooting

### Backend won't start?
```bash
cd backend
python3 -m venv venv
./venv/bin/pip install -r requirements.txt
./venv/bin/python app.py
```

### Frontend can't connect?
Check that backend is running on port 5000:
```bash
curl http://localhost:5000/api/health
```

## 📁 Key Files

- `backend/app.py` - Flask API server
- `backend/deitech.db` - SQLite database
- `src/App.js` - Main React app
- `src/utils/api.js` - API client

## ✨ Features Implemented

✅ Full CRUD operations  
✅ Data persistence (SQLite)  
✅ Category field in form  
✅ Edit/Delete buttons work  
✅ CSV export  
✅ Product counts on dashboard  
✅ Loading states  
✅ Error handling  

## 🔮 Next: AI Features

Ready to add (see your instructions):
- Smart SKU generation
- Auto-categorization
- Duplicate detection
- Anomaly detection
- AI description generator

All code is ready - just need to integrate the AI components!
