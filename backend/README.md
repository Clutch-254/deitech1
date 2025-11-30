# Backend API Documentation

## Setup Instructions

### 1. Install Dependencies

```bash
cd backend
pip install -r requirements.txt
```

### 2. Initialize Database

The database will be automatically created when you first run the application. It uses SQLite by default for easy setup.

### 3. Run the Server

```bash
python app.py
```

The server will start on `http://localhost:5000`

### 4. Default Admin User

A default admin user is created automatically:
- **Email**: admin@deitech.com
- **Password**: admin123

## API Endpoints

### Authentication

#### POST /api/auth/register
Register a new user
```json
{
  "email": "user@example.com",
  "password": "password123",
  "full_name": "John Doe",
  "role": "clerk"
}
```

#### POST /api/auth/login
Login and receive JWT token
```json
{
  "email": "user@example.com",
  "password": "password123"
}
```

#### GET /api/auth/me
Get current user (requires JWT token)

### Products

#### GET /api/products
Get all products
- Query params: `category`, `status`, `search`

#### GET /api/products/:id
Get single product

#### POST /api/products
Create new product
```json
{
  "productName": "Product Name",
  "sku": "SKU-123",
  "category": "Soaps",
  "brand": "Brand Name",
  "variant": "Original",
  "productType": "Bar Soap",
  "quantity": 175,
  "unit": "g",
  "batchNumber": "BATCH-001",
  "status": "Draft"
}
```

#### PUT /api/products/:id
Update product

#### DELETE /api/products/:id
Delete product

### Analytics

#### GET /api/analytics/summary
Get analytics summary (product counts by category and status)

#### GET /api/categories
Get list of available categories

## Database Schema

### Users Table
- user_id (Primary Key)
- email (Unique)
- password_hash
- full_name
- role (clerk, supervisor, admin)
- created_at

### Products Table
- id (Primary Key)
- product_name
- sku (Unique)
- batch_number
- category
- brand
- variant
- product_type
- quantity
- unit
- status (Draft, In Review, Approved)
- created_by (Foreign Key -> Users)
- approved_by (Foreign Key -> Users)
- created_at
- updated_at
- approved_at

### Audit Logs Table
- log_id (Primary Key)
- product_id (Foreign Key -> Products)
- user_id (Foreign Key -> Users)
- action
- changes
- timestamp

## Environment Variables

Create a `.env` file based on `.env.example`:

```
DATABASE_URL=sqlite:///deitech.db
JWT_SECRET_KEY=your-secret-key-here
FLASK_ENV=development
FLASK_APP=app.py
```

## Switching to PostgreSQL

To use PostgreSQL instead of SQLite:

1. Install PostgreSQL
2. Create a database: `createdb deitech_db`
3. Update `.env`:
   ```
   DATABASE_URL=postgresql://username:password@localhost/deitech_db
   ```
4. Restart the server

## CORS

CORS is enabled for all origins in development. Update `CORS(app)` in `app.py` for production.
