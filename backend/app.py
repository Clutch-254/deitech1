# app.py - Complete Flask Backend for Product Management System

from flask import Flask, request, jsonify
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy
from flask_bcrypt import Bcrypt
from flask_jwt_extended import JWTManager, create_access_token, jwt_required, get_jwt_identity
from datetime import datetime, timedelta
import os
from functools import wraps

# Initialize Flask app
app = Flask(__name__)

# Configuration
app.config['SQLALCHEMY_DATABASE_URI'] = os.getenv(
    'DATABASE_URL', 
    'sqlite:///deitech.db'  # Using SQLite for easier setup
)
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['JWT_SECRET_KEY'] = os.getenv('JWT_SECRET_KEY', 'dev-secret-key-change-in-production')
app.config['JWT_ACCESS_TOKEN_EXPIRES'] = timedelta(hours=24)

# Initialize extensions
CORS(app)
db = SQLAlchemy(app)
bcrypt = Bcrypt(app)
jwt = JWTManager(app)

# ============================================================================
# DATABASE MODELS
# ============================================================================

class User(db.Model):
    __tablename__ = 'users'
    
    user_id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(255), unique=True, nullable=False)
    password_hash = db.Column(db.String(255), nullable=False)
    full_name = db.Column(db.String(255), nullable=False)
    role = db.Column(db.String(50), nullable=False)  # 'clerk', 'supervisor', 'admin'
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    
    def to_dict(self):
        return {
            'user_id': self.user_id,
            'email': self.email,
            'full_name': self.full_name,
            'role': self.role,
            'created_at': self.created_at.isoformat()
        }

class Product(db.Model):
    __tablename__ = 'products'
    
    id = db.Column(db.Integer, primary_key=True)
    product_name = db.Column(db.String(255), nullable=False)
    sku = db.Column(db.String(50), unique=True, nullable=False)
    batch_number = db.Column(db.String(100))
    category = db.Column(db.String(100), nullable=False)
    brand = db.Column(db.String(100), nullable=False)
    variant = db.Column(db.String(100))
    product_type = db.Column(db.String(100))
    quantity = db.Column(db.Integer)
    unit = db.Column(db.String(10))
    status = db.Column(db.String(20), default='Draft')  # Draft, In Review, Approved
    created_by = db.Column(db.Integer, db.ForeignKey('users.user_id'))
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
    approved_by = db.Column(db.Integer, db.ForeignKey('users.user_id'))
    approved_at = db.Column(db.DateTime)
    
    creator = db.relationship('User', foreign_keys=[created_by])
    approver = db.relationship('User', foreign_keys=[approved_by])
    
    def to_dict(self):
        return {
            'id': self.id,
            'productName': self.product_name,
            'sku': self.sku,
            'batchNumber': self.batch_number,
            'category': self.category,
            'brand': self.brand,
            'variant': self.variant,
            'productType': self.product_type,
            'quantity': self.quantity,
            'unit': self.unit,
            'status': self.status,
            'created_by': self.created_by,
            'created_at': self.created_at.isoformat(),
            'updated_at': self.updated_at.isoformat(),
            'approved_at': self.approved_at.isoformat() if self.approved_at else None,
            'creator_name': self.creator.full_name if self.creator else None,
            'approver_name': self.approver.full_name if self.approver else None
        }

class AuditLog(db.Model):
    __tablename__ = 'audit_logs'
    
    log_id = db.Column(db.Integer, primary_key=True)
    product_id = db.Column(db.Integer, db.ForeignKey('products.id'))
    user_id = db.Column(db.Integer, db.ForeignKey('users.user_id'))
    action = db.Column(db.String(50), nullable=False)
    changes = db.Column(db.Text)
    timestamp = db.Column(db.DateTime, default=datetime.utcnow)
    
    def to_dict(self):
        return {
            'log_id': self.log_id,
            'product_id': self.product_id,
            'user_id': self.user_id,
            'action': self.action,
            'changes': self.changes,
            'timestamp': self.timestamp.isoformat()
        }

# ============================================================================
# HELPER FUNCTIONS
# ============================================================================

def log_action(product_id, action, changes=None):
    """Log an action to audit trail"""
    try:
        current_user_id = get_jwt_identity()
        log = AuditLog(
            product_id=product_id,
            user_id=current_user_id,
            action=action,
            changes=str(changes) if changes else None
        )
        db.session.add(log)
        db.session.commit()
    except Exception as e:
        print(f"Error logging action: {str(e)}")

# ============================================================================
# AUTHENTICATION ROUTES
# ============================================================================

@app.route('/api/auth/register', methods=['POST'])
def register():
    """Register a new user"""
    try:
        data = request.get_json()
        
        if not all(k in data for k in ['email', 'password', 'full_name', 'role']):
            return jsonify({'error': 'Missing required fields'}), 400
        
        if User.query.filter_by(email=data['email']).first():
            return jsonify({'error': 'Email already registered'}), 400
        
        password_hash = bcrypt.generate_password_hash(data['password']).decode('utf-8')
        
        user = User(
            email=data['email'],
            password_hash=password_hash,
            full_name=data['full_name'],
            role=data['role']
        )
        
        db.session.add(user)
        db.session.commit()
        
        return jsonify({
            'message': 'User registered successfully',
            'user': user.to_dict()
        }), 201
        
    except Exception as e:
        db.session.rollback()
        return jsonify({'error': str(e)}), 500

@app.route('/api/auth/login', methods=['POST'])
def login():
    """Login user and return JWT token"""
    try:
        data = request.get_json()
        
        if not data.get('email') or not data.get('password'):
            return jsonify({'error': 'Email and password required'}), 400
        
        user = User.query.filter_by(email=data['email']).first()
        
        if not user or not bcrypt.check_password_hash(user.password_hash, data['password']):
            return jsonify({'error': 'Invalid credentials'}), 401
        
        access_token = create_access_token(identity=user.user_id)
        
        return jsonify({
            'message': 'Login successful',
            'access_token': access_token,
            'user': user.to_dict()
        }), 200
        
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/api/auth/me', methods=['GET'])
@jwt_required()
def get_current_user():
    """Get current logged-in user"""
    try:
        current_user_id = get_jwt_identity()
        user = User.query.get(current_user_id)
        
        if not user:
            return jsonify({'error': 'User not found'}), 404
        
        return jsonify(user.to_dict()), 200
        
    except Exception as e:
        return jsonify({'error': str(e)}), 500

# ============================================================================
# PRODUCT ROUTES
# ============================================================================

@app.route('/api/products', methods=['POST'])
def create_product():
    """Create a new product (no auth required for now)"""
    try:
        data = request.get_json()
        
        # Check for duplicate SKU
        if Product.query.filter_by(sku=data['sku']).first():
            return jsonify({'error': 'SKU already exists'}), 400
        
        product = Product(
            product_name=data['productName'],
            sku=data['sku'],
            batch_number=data.get('batchNumber'),
            category=data['category'],
            brand=data['brand'],
            variant=data.get('variant'),
            product_type=data.get('productType'),
            quantity=data.get('quantity'),
            unit=data.get('unit', 'g'),
            status=data.get('status', 'Draft')
        )
        
        db.session.add(product)
        db.session.commit()
        
        return jsonify({
            'message': 'Product created successfully',
            'product': product.to_dict()
        }), 201
        
    except Exception as e:
        db.session.rollback()
        return jsonify({'error': str(e)}), 500

@app.route('/api/products', methods=['GET'])
def get_products():
    """Get all products with filtering"""
    try:
        category = request.args.get('category')
        status = request.args.get('status')
        search = request.args.get('search')
        
        query = Product.query
        
        if category:
            query = query.filter_by(category=category)
        if status:
            query = query.filter_by(status=status)
        if search:
            query = query.filter(
                db.or_(
                    Product.product_name.ilike(f'%{search}%'),
                    Product.sku.ilike(f'%{search}%'),
                    Product.brand.ilike(f'%{search}%')
                )
            )
        
        products = query.order_by(Product.created_at.desc()).all()
        
        return jsonify({
            'products': [p.to_dict() for p in products],
            'total': len(products)
        }), 200
        
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/api/products/<int:product_id>', methods=['GET'])
def get_product(product_id):
    """Get single product"""
    try:
        product = Product.query.get_or_404(product_id)
        return jsonify(product.to_dict()), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 404

@app.route('/api/products/<int:product_id>', methods=['PUT'])
def update_product(product_id):
    """Update product"""
    try:
        product = Product.query.get_or_404(product_id)
        data = request.get_json()
        
        # Update fields
        if 'productName' in data:
            product.product_name = data['productName']
        if 'category' in data:
            product.category = data['category']
        if 'brand' in data:
            product.brand = data['brand']
        if 'variant' in data:
            product.variant = data['variant']
        if 'productType' in data:
            product.product_type = data['productType']
        if 'quantity' in data:
            product.quantity = data['quantity']
        if 'unit' in data:
            product.unit = data['unit']
        if 'batchNumber' in data:
            product.batch_number = data['batchNumber']
        if 'status' in data:
            product.status = data['status']
        
        product.updated_at = datetime.utcnow()
        db.session.commit()
        
        return jsonify({
            'message': 'Product updated successfully',
            'product': product.to_dict()
        }), 200
        
    except Exception as e:
        db.session.rollback()
        return jsonify({'error': str(e)}), 500

@app.route('/api/products/<int:product_id>', methods=['DELETE'])
def delete_product(product_id):
    """Delete product"""
    try:
        product = Product.query.get_or_404(product_id)
        
        db.session.delete(product)
        db.session.commit()
        
        return jsonify({'message': 'Product deleted successfully'}), 200
        
    except Exception as e:
        db.session.rollback()
        return jsonify({'error': str(e)}), 500

# ============================================================================
# ANALYTICS ROUTES
# ============================================================================

@app.route('/api/analytics/summary', methods=['GET'])
def get_analytics_summary():
    """Get analytics summary"""
    try:
        total_products = Product.query.count()
        
        # Products by category
        categories = db.session.query(
            Product.category, 
            db.func.count(Product.id)
        ).group_by(Product.category).all()
        
        # Products by status
        statuses = db.session.query(
            Product.status,
            db.func.count(Product.id)
        ).group_by(Product.status).all()
        
        return jsonify({
            'total_products': total_products,
            'by_category': [{'category': c[0], 'count': c[1]} for c in categories],
            'by_status': [{'status': s[0], 'count': s[1]} for s in statuses]
        }), 200
        
    except Exception as e:
        return jsonify({'error': str(e)}), 500

# ============================================================================
# HEALTH CHECK
# ============================================================================

@app.route('/api/health', methods=['GET'])
def health_check():
    """Health check"""
    return jsonify({
        'status': 'healthy',
        'timestamp': datetime.utcnow().isoformat()
    }), 200

@app.route('/api/categories', methods=['GET'])
def get_categories():
    """Get all product categories"""
    categories = ['Soaps', 'Dishwashing', 'Cussons Baby', 'Hand Wash', 'Bodywash']
    return jsonify({'categories': categories}), 200

# ============================================================================
# DATABASE INITIALIZATION
# ============================================================================

def init_db():
    """Initialize database with tables"""
    with app.app_context():
        db.create_all()
        print("Database tables created successfully!")
        
        # Create default admin user if not exists
        if not User.query.filter_by(email='admin@deitech.com').first():
            admin = User(
                email='admin@deitech.com',
                password_hash=bcrypt.generate_password_hash('admin123').decode('utf-8'),
                full_name='System Administrator',
                role='admin'
            )
            db.session.add(admin)
            db.session.commit()
            print("Default admin user created: admin@deitech.com / admin123")

# ============================================================================
# RUN APPLICATION
# ============================================================================

if __name__ == '__main__':
    init_db()
    app.run(debug=True, host='0.0.0.0', port=5000)
