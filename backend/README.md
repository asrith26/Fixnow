# FixNow Backend

Backend API for the FixNow home repair services platform.

## Features

- User authentication (register/login) with JWT
- Booking management (CRUD operations)
- Payment history tracking
- MongoDB Atlas integration
- CORS enabled for frontend integration

## Setup

1. Install dependencies:
   ```bash
   npm install
   ```

2. Create a `.env` file in the backend directory with:
   ```
   MONGO_URI=your_mongodb_atlas_connection_string
   JWT_SECRET=your_super_secret_jwt_key
   PORT=5001
   ```

3. Start the server:
   ```bash
   npm start
   ```

   For development with auto-restart:
   ```bash
   npm run dev
   ```

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login user

### Bookings
- `GET /api/bookings` - Get all user bookings
- `POST /api/bookings` - Create a new booking
- `PUT /api/bookings/:id` - Update a booking
- `PATCH /api/bookings/:id/status` - Update booking status
- `DELETE /api/bookings/:id` - Delete a booking

### Payments
- `GET /api/payments` - Get all user payments
- `POST /api/payments` - Create a new payment
- `GET /api/payments/:id` - Get a specific payment
- `PATCH /api/payments/:id/status` - Update payment status
- `DELETE /api/payments/:id` - Delete a payment

### Health Check
- `GET /api/health` - Check server status

## Data Models

### User
- name (String, required)
- email (String, required, unique)
- password (String, required, hashed)
- role (String, enum: user/professional/admin, default: user)
- phone (String)
- address (String)

### Booking
- user (ObjectId, ref: User, required)
- service (String, required)
- title (String, required)
- date (String, required)
- time (String, required)
- address (String, required)
- city (String, required)
- zipCode (String, required)
- notes (String)
- professional (String, default: 'Professional')
- status (String, enum: Pending/Confirmed/In Progress/Completed/Cancelled, default: Confirmed)
- image (String, default URL)

### Payment
- user (ObjectId, ref: User, required)
- bookingId (ObjectId, ref: Booking, required)
- amount (Number, required, min: 0)
- paymentMethod (String, enum: card/paypal/cash, default: card)
- service (String, required)
- location (String)
- date (String, required)
- time (String, required)
- status (String, enum: pending/completed/failed/refunded, default: completed)

## Authentication

All protected routes require a JWT token in the Authorization header:
```
Authorization: Bearer <your_jwt_token>
```

## Frontend Integration

Update your frontend `.env` file:
```
REACT_APP_API_URL=http://localhost:5001
