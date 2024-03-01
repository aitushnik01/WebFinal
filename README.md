# Backend Authentication and Authorization System

This project implements authentication and authorization functionalities in a backend system, fulfilling the specified assignment requirements. Below is an overview of the implemented features and how the system works.

## Features Implemented

1. **User Registration and Login**: Users can register and log in to the system using their credentials.
2. **JWT Token Authentication**: JWT (JSON Web Token) based token authentication is used to authenticate users. Tokens are saved in cookies for secure authentication.
3. **Roles and Permissions**: Two roles are defined in the system:
   - **Manager**: Can create and update books.
   - **Admin**: Can create, update, and delete books.
4. **Password Recovery**: Password recovery is implemented using one-time passwords (OTPs) sent via email.
5. **Two-Factor Authentication (2FA)**: Two-factor authentication is available via VK (Vkontakte).

## How It Works

### Registration and Login
1. Users can register by providing their username, email, and password.
2. Upon successful registration, users can log in using their registered email and password.

### JWT Token Authentication
1. When a user logs in successfully, a JWT token is generated and saved in cookies.
2. This token is sent with subsequent requests to authenticate the user.

### Roles and Permissions
1. Two roles are defined: Manager and Admin.
2. Managers can create and update books.
3. Admins have additional permission to delete books.

### Password Recovery
1. Users can initiate password recovery by requesting a one-time password (OTP).
2. The OTP is sent to the user's email address.
3. The user can use the OTP to recover their password.

### Two-Factor Authentication (2FA)
1. Two-factor authentication is available via VK.
2. Users can enable 2FA for additional security.

## Usage
1. Clone the repository: `git clone https://github.com/yourusername/yourproject.git`
2. Install dependencies: `npm install`
3. Set up environment variables for SMTP configuration (for email notifications) and VK authentication.
4. Start the server: `npm start`
## API Documentation

API documentation is available using Swagger UI. Access it at [http://localhost:3000/api-docs](http://localhost:3000/api-docs).

## Contributing
Contributions are welcome! Please follow the guidelines for pull requests and issue reporting.

## License
This project is licensed under the [MIT License](LICENSE).
