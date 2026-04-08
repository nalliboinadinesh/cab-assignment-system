# Cab Assignment System API

A real-time cab assignment system that matches riders with the nearest available drivers based on GPS coordinates.

##  Deployed URL

```
http://13.206.81.220:3000
```

##  Tech Stack

- **Node.js** - JavaScript runtime
- **Express.js** - Web framework
- **SQLite** - Database
- **Docker** - Containerization

## Project Structure

```
project/
├── config/
│   └── db.js                    # Database configuration
├── models/
│   ├── driverModel.js           # Driver database operations
│   ├── rideModel.js             # Ride database operations
│   └── userModel.js             # User database operations
├── controllers/
│   ├── driverController.js      # Driver logic
│   ├── rideController.js        # Ride assignment logic
│   └── userController.js        # User authentication logic
├── routes/
│   ├── driverRoutes.js          # Driver endpoints
│   ├── rideRoutes.js            # Ride endpoints
│   └── userRoutes.js            # User endpoints
├── utils/
│   └── distance.js              # Distance calculation utility
├── app.js                       # Express app setup
├── server.js                    # Server entry point
├── Dockerfile                   # Docker configuration
├── docker-compose.yml           # Docker Compose setup
└── package.json                 # Dependencies
```

## Quick Start

### Local Setup

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd cab-assignment-system
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the server**
   ```bash
   npm start
   ```

4. **For development with auto-reload**
   ```bash
   npm run dev
   ```

The server will run at `http://localhost:3000`

### Docker Setup

1. **Build and run with Docker Compose**
   ```bash
   docker-compose up --build
   ```

2. **Or build manually**
   ```bash
   docker build -t cab-assignment-system .
   docker run -p 3000:3000 cab-assignment-system
   ```

3. **Stop the container**
   ```bash
   docker-compose down
   ```

## API Endpoints

### 1. Add Driver
Register a new driver with their location

**Endpoint:** `POST /api/drivers/add-driver`

**Request Body:**
```json
{
  "name": "John Doe",
  "x": 40.7128,
  "y": -74.0060
}
```

**Parameters:**
- `name` (string, required) - Driver's name
- `x` (number, required) - Longitude coordinate
- `y` (number, required) - Latitude coordinate

**Response (Success 200):**
```json
{
  "message": "Driver added",
  "driverId": 1
}
```

**Response (Error 400):**
```json
{
  "message": "Missing required fields: name, x, y"
}
```

**Example:**
```bash
curl -X POST http://13.206.81.220:3000/api/drivers/add-driver \
  -H "Content-Type: application/json" \
  -d '{"name":"John Doe","x":40.7128,"y":-74.0060}'
```

---

### 2. Request Ride
Find and assign the nearest available driver to a ride request

**Endpoint:** `POST /api/rides/request-ride`

**Request Body:**
```json
{
  "x": 40.7580,
  "y": -73.9855
}
```

**Parameters:**
- `x` (number, required) - User's longitude coordinate
- `y` (number, required) - User's latitude coordinate

**Response (Success 200):**
```json
{
  "message": "Driver assigned",
  "driver": {
    "id": 1,
    "name": "John Doe",
    "x_coordinate": 40.7128,
    "y_coordinate": -74.0060,
    "is_available": 0
  },
  "distance": 5.234
}
```

**Response (Error 404):**
```json
{
  "message": "No drivers available"
}
```

**Response (Error 400):**
```json
{
  "message": "Missing required fields: x, y"
}
```

**Example:**
```bash
curl -X POST http://13.206.81.220:3000/api/rides/request-ride \
  -H "Content-Type: application/json" \
  -d '{"x":40.7580,"y":-73.9855}'
```

---

### 3. User Registration
Register a new user account

**Endpoint:** `POST /api/users/register`

**Request Body:**
```json
{
  "name": "Alice Smith",
  "email": "alice@example.com",
  "password": "securepassword123"
}
```

**Parameters:**
- `name` (string, required) - User's full name
- `email` (string, required) - User's email (unique)
- `password` (string, required) - User's password (min 6 characters)

**Response (Success 200):**
```json
{
  "message": "User registered successfully",
  "userId": 1
}
```

**Response (Error 400):**
```json
{
  "message": "Missing required fields or email already exists"
}
```

**Example:**
```bash
curl -X POST http://13.206.81.220:3000/api/users/register \
  -H "Content-Type: application/json" \
  -d '{"name":"Alice Smith","email":"alice@example.com","password":"securepassword123"}'
```

---

### 4. User Login
Authenticate user and get session token

**Endpoint:** `POST /api/users/login`

**Request Body:**
```json
{
  "email": "alice@example.com",
  "password": "securepassword123"
}
```

**Parameters:**
- `email` (string, required) - User's email
- `password` (string, required) - User's password

**Response (Success 200):**
```json
{
  "message": "Login successful",
  "userId": 1,
  "name": "Alice Smith"
}
```

**Response (Error 401):**
```json
{
  "message": "Invalid email or password"
}
```

**Example:**
```bash
curl -X POST http://13.206.81.220:3000/api/users/login \
  -H "Content-Type: application/json" \
  -d '{"email":"alice@example.com","password":"securepassword123"}'
```

---

##  Testing with cURL

### Add multiple drivers
```bash
curl -X POST http://13.206.81.220:3000/api/drivers/add-driver \
  -H "Content-Type: application/json" \
  -d '{"name":"Driver 1","x":40.7128,"y":-74.0060}'

curl -X POST http://13.206.81.220:3000/api/drivers/add-driver \
  -H "Content-Type: application/json" \
  -d '{"name":"Driver 2","x":40.7200,"y":-73.9900}'
```

### Request a ride
```bash
curl -X POST http://13.206.81.220:3000/api/rides/request-ride \
  -H "Content-Type: application/json" \
  -d '{"x":40.7150,"y":-73.9950}'
```

### Register a user
```bash
curl -X POST http://13.206.81.220:3000/api/users/register \
  -H "Content-Type: application/json" \
  -d '{"name":"John","email":"john@example.com","password":"password123"}'
```

##  Database Schema

### drivers table
| Column | Type | Description |
|--------|------|-------------|
| id | INTEGER | Primary key |
| name | TEXT | Driver's name |
| x_coordinate | REAL | Longitude |
| y_coordinate | REAL | Latitude |
| is_available | INTEGER | Availability status (1=available, 0=busy) |

### rides table
| Column | Type | Description |
|--------|------|-------------|
| id | INTEGER | Primary key |
| user_x | REAL | Rider's longitude |
| user_y | REAL | Rider's latitude |
| driver_id | INTEGER | Assigned driver ID |
| status | TEXT | Ride status (assigned, completed, cancelled) |

### users table
| Column | Type | Description |
|--------|------|-------------|
| id | INTEGER | Primary key |
| name | TEXT | User's name |
| email | TEXT | User's email (unique) |
| password | TEXT | Hashed password |
| created_at | DATETIME | Account creation timestamp |

##  Configuration

### Environment Variables (optional)
Create a `.env` file in the root directory:
```
NODE_ENV=development
PORT=3000
DB_PATH=./ride_system.db
```

##  Validation Rules

**Add Driver:**
- ✅ All fields required (name, x, y)
- ✅ name must be a string
- ✅ x and y must be numbers (valid coordinates)

**Request Ride:**
- ✅ Both x and y required
- ✅ Both must be numbers

**Register User:**
- ✅ All fields required (name, email, password)
- ✅ Email must be unique
- ✅ Password minimum 6 characters

**Login:**
- ✅ Email and password required
- ✅ Credentials must be valid

##  Error Responses

All error responses include a status code and message:

```json
{
  "message": "Error description"
}
```

**Common Status Codes:**
- `200` - Success
- `400` - Bad request (validation error)
- `401` - Unauthorized (login failed)
- `404` - Not found (no drivers available)
- `500` - Server error

## Algorithm: Nearest Driver Assignment

The system uses the **Euclidean distance formula** to find the nearest driver:

```
distance = √((x₂ - x₁)² + (y₂ - y₁)²)
```

1. Gets all available drivers
2. Calculates distance from rider to each driver
3. Assigns the driver with minimum distance
4. Updates driver availability to busy
5. Creates a new ride record

## Dependencies

- **express** (^4.18.2) - Web framework
- **sqlite** (^5.0.1) - Database access
- **sqlite3** (^5.1.6) - SQLite driver
- **nodemon** (^3.1.14) - Development auto-reload

## License

MIT License - feel free to use this project for learning and development.

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Push and create a pull request



