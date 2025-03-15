# Auth Service

This project is an authentication service designed to handle user authentication and authorization.

## Features

- User registration and login
- Token-based authentication (JWT)
- Role-based access control
- Password hashing and validation
- Secure API endpoints

## Technologies

- **Backend**: Node.js, Express
- **Database**: MongoDB
- **Authentication**: JSON Web Tokens (JWT), bcrypt
- **Environment Management**: dotenv

## Installation

1. Clone the repository:

   ```bash
   git clone <repository-url>
   cd auth-service
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Set up environment variables:
   Create a `.env` file in the root directory and configure the following:

   ```
   PORT=3000
   DATABASE_URL=<your-database-url>
   JWT_SECRET=<your-secret-key>
   ```

4. Run the application:
   ```bash
   npm start
   ```

## License

This project is licensed under the MIT License.
