# 🚗 Velocity Car Shop – Backend

This is the **backend service** for the Velocity Car Shop project, a role-based e-commerce platform for buying and selling cars. It handles user authentication, product & order management, secure payments, and admin/user dashboards. Built with **Node.js**, **Express**, **TypeScript**, and **MongoDB**.

> 🔗 [Live Server URL](https://velocity-car-shop-backend.vercel.app/)

## 📁 Project Structure

```
/src
├── app
│   ├── middlewares
│   ├── modules
│   └── routes
├── config
├── constants
├── utils
└── server.ts
```

---

## 🚀 Features

### 🔐 Authentication
- JWT-based login/logout system
- Role-based access control (Admin/User)
- Password hashing using bcrypt
- Secure cookie storage

### 🧍 User Management
- User registration and login
- Manual role upgrade (Admin)
- View and update user profiles

### 🚗 Product Management
- Admin CRUD for products (cars)
- Products have name, brand, price, stock, model, and category
- Pagination support for large listings

### 📦 Order Management
- Place and manage car orders
- Prevent orders if product is out of stock
- Role-based dashboards:
  - **Admin**: manage all orders
  - **User**: view their own orders

### 💳 Payment Integration
- Integrated with **ShurjoPay** for payment processing
- Handles secure transactions on order placement

### ✅ Error Handling
- Consistent, user-friendly error responses
- Handles validation, auth errors, and edge cases

---

## ⚙️ Tech Stack

- **Language**: TypeScript
- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MongoDB with Mongoose
- **Payment Gateway**: ShurjoPay
- **Authentication**: JWT + bcrypt
- **Validation**: Zod
- **File Upload**: Multer + Cloudinary (for images)

---

## 🔧 Getting Started (Local Setup)

### 1. Clone the Repo

```bash
git clone https://github.com/ifajul89/velocity-backend.git
cd velocity-backend
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Environment Variables

Create a `.env` file in the root directory and add the following:

```env
PORT=5000
DATABASE_URL=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
JWT_EXPIRES_IN=7d
COOKIE_SECRET=your_cookie_secret
SHURJOPAY_USERNAME=your_username
SHURJOPAY_PASSWORD=your_password
SHURJOPAY_PREFIX=your_prefix
SHURJOPAY_RETURN_URL=URL
```

### 4. Start the Development Server

```bash
npm run dev
```

To build the project:

```bash
npm run build
```

---

## 🔌 API Endpoints

| Method | Endpoint                  | Description                      |
|--------|---------------------------|----------------------------------|
| POST   | `/api/auth/register`      | Register new user                |
| POST   | `/api/auth/login`         | Login and receive JWT            |
| GET    | `/api/users/me`           | Get current user info            |
| POST   | `/api/products`           | Create new product (admin only)  |
| GET    | `/api/products`           | List all products (with filters) |
| GET    | `/api/products/:id`       | Get product details              |
| PATCH  | `/api/products/:id`       | Update product (admin only)      |
| DELETE | `/api/products/:id`       | Delete product (admin only)      |
| POST   | `/api/orders`             | Create order (user only)         |
| GET    | `/api/orders`             | View orders (admin/user based)   |
| PATCH  | `/api/orders/:id/status`  | Update order status (admin)      |

---

## 📡 Deployment

- **Backend Live**: [https://velocity-car-shop-backend.vercel.app](https://velocity-car-shop-backend.vercel.app)
- Hosted on: **Vercel**

---

## 🧪 Dev Scripts

```bash
npm run dev        # Start development server with ts-node-dev
npm run build      # Compile TypeScript to JavaScript
npm start          # Run production build
npm run lint       # Run ESLint
npm run format     # Format code using Prettier
```