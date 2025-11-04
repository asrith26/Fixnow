# FixNow - Professional Services Booking Platform

FixNow is a comprehensive MERN stack application that connects customers with professional service providers for home repairs and maintenance. The platform allows users to find, book, and manage professional services while providing professionals with tools to manage their business.

## 🚀 Features

### For Customers:
- **User Authentication**: Secure signup and login system
- **Service Discovery**: Browse and search for various professional services
- **Professional Search**: Find professionals near you with map integration
- **Booking Management**: Book services, view booking history, edit upcoming bookings, and cancel bookings
- **Payment Processing**: Secure payment handling with transaction history
- **Dashboard**: Personalized dashboard with quick access to all features

### For Professionals:
- **Professional Dashboard**: Manage services, bookings, and profile
- **Application System**: Apply to become a verified professional
- **Booking Management**: View and manage incoming bookings
- **Service Management**: Add and manage offered services

### Core Features:
- **Real-time Booking System**: Instant booking confirmation and status updates
- **Location-based Services**: Find professionals in your area
- **Secure Payments**: Integrated payment system with refund policies
- **Responsive Design**: Mobile-friendly interface with dark/light theme support
- **User Reviews & Ratings**: Rate and review completed services

## 🛠 Tech Stack

### Frontend:
- **React.js** - UI library
- **React Router** - Client-side routing
- **Tailwind CSS** - Utility-first CSS framework
- **Lucide React** - Icon library
- **Context API** - State management

### Backend:
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MongoDB** - NoSQL database
- **Mongoose** - ODM for MongoDB
- **JWT** - Authentication
- **bcrypt** - Password hashing

### Development Tools:
- **Vite** - Build tool and dev server
- **ESLint** - Code linting
- **Git** - Version control

## 📋 Prerequisites

Before running this application, make sure you have the following installed:

- **Node.js** (v16 or higher)
- **MongoDB** (local or cloud instance)
- **npm** or **yarn** package manager
- **Git**

## 🚀 Installation & Setup

### 1. Clone the Repository
```bash
git clone https://github.com/asrith26/fixnow-MERN-.git
cd fixnow-MERN-
```

### 2. Backend Setup

#### Navigate to backend directory:
```bash
cd backend
```

#### Install dependencies:
```bash
npm install
```

#### Environment Configuration:
Create a `.env` file in the backend directory with the following variables:
```env
PORT=5001
MONGODB_URI=mongodb://localhost:27017/fixnow
JWT_SECRET=your_jwt_secret_key_here
NODE_ENV=development
```

#### Start the backend server:
```bash
npm start
# or for development with auto-reload:
npm run dev
```

### 3. Frontend Setup

#### Navigate to root directory (from backend):
```bash
cd ..
```

#### Install dependencies:
```bash
npm install
```

#### Start the frontend development server:
```bash
npm run dev
```

The application will be available at:
- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:5001

## 📖 Usage

### For Customers:
1. **Sign Up/Login**: Create an account or log in to existing account
2. **Browse Services**: Explore available service categories
3. **Find Professionals**: Use the map to find professionals near you
4. **Book Services**: Select a professional and book a time slot
5. **Manage Bookings**: View upcoming bookings, edit details, or cancel if needed
6. **Make Payments**: Complete secure payments for services
7. **View History**: Check past bookings and payment history

### For Professionals:
1. **Apply**: Submit an application to become a verified professional
2. **Dashboard**: Access your professional dashboard
3. **Manage Services**: Add and update your service offerings
4. **Handle Bookings**: View incoming bookings and manage your schedule

## 🔌 API Endpoints

### Authentication Routes:
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `GET /api/auth/profile` - Get user profile

### Booking Routes:
- `GET /api/bookings` - Get user bookings
- `POST /api/bookings` - Create new booking
- `PUT /api/bookings/:id` - Update booking details
- `PATCH /api/bookings/:id/status` - Update booking status
- `DELETE /api/bookings/:id` - Delete booking

### Services Routes:
- `GET /api/services` - Get all services
- `POST /api/services` - Create new service (professionals only)

### Payment Routes:
- `GET /api/payments` - Get payment history
- `POST /api/payments` - Process payment

## 🏗 Project Structure

```
fixnow-MERN-/
├── backend/                    # Backend application
│   ├── controllers/           # Route controllers
│   ├── middleware/            # Custom middleware
│   ├── models/               # MongoDB models
│   ├── routes/               # API routes
│   ├── config/               # Database configuration
│   └── server.js             # Server entry point
├── src/                       # Frontend application
│   ├── components/           # Reusable components
│   ├── context/              # React context providers
│   ├── pages/                # Page components
│   ├── hooks/                # Custom hooks
│   ├── utils/                # Utility functions
│   └── App.js                # Main app component
├── public/                   # Static assets
├── package.json              # Frontend dependencies
└── README.md                 # Project documentation
```

## 🤝 Contributing

We welcome contributions! Please follow these steps:

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/your-feature-name`
3. Commit your changes: `git commit -m 'Add some feature'`
4. Push to the branch: `git push origin feature/your-feature-name`
5. Open a Pull Request

### Development Guidelines:
- Follow the existing code style
- Write clear, concise commit messages
- Test your changes thoroughly
- Update documentation as needed

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 📞 Support

If you have any questions or need help:

- Open an issue on GitHub
- Contact the development team
- Check the documentation for common solutions

## 🔄 Recent Updates

- **Enhanced Booking Management**: Added edit functionality for upcoming bookings
- **Improved Cancellation Process**: Clear refund policy information (3 working days)
- **Better Form Handling**: Consistent FormInput components across the app
- **Error Handling**: Robust error handling for API operations

---

**FixNow** - Connecting you with trusted professionals for all your home service needs! 🏠✨
