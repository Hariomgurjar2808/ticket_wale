# MongoDB Setup for Ticket Wales

## Installation Complete ✅

MongoDB has been successfully added to your Ticket Wales project with the following components:

### 📦 Packages Installed
- `mongodb` - MongoDB Node.js driver
- `mongoose` - MongoDB object modeling for Node.js
- `bcryptjs` - Password hashing library
- `jsonwebtoken` - JWT token generation and verification

### 🗂️ Files Created

#### Database Configuration
- `lib/mongodb.js` - MongoDB connection with caching for performance
- `.env.local` - Environment variables (UPDATE YOUR CREDENTIALS!)

#### Database Models
- `models/User.js` - User schema with authentication fields
- `models/Booking.js` - Booking schema for travel bookings
- `models/Service.js` - Service schema for flights, hotels, etc.

#### API Routes
- `app/api/auth/login/route.js` - User login endpoint
- `app/api/auth/register/route.js` - User registration endpoint
- `app/api/bookings/route.js` - Booking CRUD operations
- `app/api/test-db/route.js` - Database connection test

## 🚀 Quick Setup

### 1. Configure Database Connection
Edit `.env.local` and update the MongoDB URI:

```bash
# For local MongoDB
MONGODB_URI=mongodb://localhost:27017/ticket_wales

# For MongoDB Atlas (replace with your credentials)
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/ticket_wales?retryWrites=true&w=majority

# Update JWT secret
JWT_SECRET=your-super-secret-jwt-key-here
```

### 2. Install MongoDB Locally (Optional)
If using local MongoDB:
```bash
# macOS with Homebrew
brew install mongodb-community
brew services start mongodb-community

# Or use MongoDB Atlas (cloud) - recommended for production
```

### 3. Test Database Connection
```bash
npm run dev
```
Then visit: `http://localhost:3000/api/test-db`

## 📡 API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user

### Bookings
- `GET /api/bookings` - Get user bookings (requires auth)
- `POST /api/bookings` - Create new booking (requires auth)

### Example Usage

#### Register User
```bash
curl -X POST http://localhost:3000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Doe",
    "email": "john@example.com",
    "password": "password123",
    "phone": "+1234567890"
  }'
```

#### Login User
```bash
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "john@example.com",
    "password": "password123"
  }'
```

#### Create Booking (with auth token)
```bash
curl -X POST http://localhost:3000/api/bookings \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -d '{
    "serviceType": "flight",
    "from": "New York",
    "to": "London",
    "departureDate": "2024-12-25",
    "passengers": 2,
    "price": 599.99
  }'
```

## 🔐 Security Features
- Password hashing with bcryptjs
- JWT token authentication
- Input validation with Mongoose
- Environment variable protection

## 🗄️ Database Schema

### User Model
- Name, email, password (hashed)
- Role (user/admin/driver)
- Phone, profile image
- Email verification status

### Booking Model
- User reference
- Service type (flight/hotel/bus/auto/bike/parcel)
- Travel details (from/to/dates)
- Status and payment tracking
- Auto-generated booking reference

### Service Model
- Service details and pricing
- Provider information
- Location and schedule data
- Features and policies

## 🛠️ Next Steps

1. **Update Environment Variables** - Add your MongoDB credentials
2. **Test API Endpoints** - Use the provided curl examples
3. **Integrate with Frontend** - Connect your React components to the API
4. **Add Authentication Context** - Manage user state across components
5. **Implement Error Handling** - Add proper error boundaries

## 📝 Notes
- All passwords are automatically hashed before storage
- JWT tokens expire in 7 days
- Booking references are auto-generated
- API requires authentication headers for protected routes

Happy coding! 🚀