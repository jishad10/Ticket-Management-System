# Ticket Management System Backend

A backend application for managing bus ticket reservations with authentication, role-based access, and ticket purchasing functionality. 
Built using **Node.js**, **Express.js**, and **MongoDB**, following a scalable modular design pattern.

----

## Features

### Authentication
- User Registration, Login, Logout
- Password hashing with JWT-based authentication
- Role-based access control (Admin / User)

### Admin Functionalities
- Add, update, and delete bus information
- Manage ticket schedules and pricing per time slot

### User Functionalities
- View all available buses and schedules
- Purchase tickets with selected seat and transaction ID

---

## Tech Stack

- **Backend**: Node.js, Express.js
- **Database**: MongoDB with Mongoose
- **Authentication**: JWT 
- **Language**: JavaScript 

---

## ER Diagram

![ER Diagram](https://github.com/jishad10/Ticket-Management-System/blob/main/Ticket%20Management/public/Diagram/Ticket%20Model%20Diagram.png)

---

## Postman Collection

You can test all API endpoints using the Postman collection available in this repository:

🔗 [Download Postman Collection](https://github.com/jishad10/Ticket-Management-System/tree/main/Ticket%20Management/public/postman%20collection)


## Installation & Setup

```
# 1. Clone the repository
git clone https://github.com/yourusername/ticket-management-system.git

# 2. Navigate into the project directory
cd ticket-management-system

# 3. Install dependencies
npm install

# 4. Configure your .env file

# 5. Run the server
npm run dev

```

---

## API Endpoints

### Authentication

| Method | Endpoint               | Description                |
|--------|------------------------|----------------------------|
| POST   | `/auth/register`       | Register a user            |
| POST   | `/auth/login`          | Login a user               |
| POST   | `/auth/logout`         | Logout a user              |
| POST   | `/auth/change-password`| Change user password       |
| PATCH  | `/auth/update-account` | Update user account details|

---

### Admin APIs

| Method | Endpoint             | Description       |
|--------|----------------------|-------------------|
| POST   | `/admin/bus`         | Add a new bus     |
| PUT    | `/admin/bus/:id`     | Update a bus      |
| DELETE | `/admin/bus/:id`     | Delete a bus      |
| POST   | `/admin/ticket`      | Upload new ticket |
| PUT    | `/admin/ticket/:id`  | Update ticket     |
| DELETE | `/admin/ticket/:id`  | Delete a ticket   |

---

### User APIs

| Method | Endpoint              | Description                         |
|--------|------------------------|-------------------------------------|
| GET    | `/buses`               | View all buses                      |
| GET    | `/tickets`             | View tickets by schedule/bus        |
| POST   | `/tickets/purchase`    | Purchase a ticket (with txn ID)     |


```
### Project Structure

TICKET MANAGEMENT/
├── node_modules/                # Project dependencies
├── public/                      # Public assets
│   ├── Diagram/                 # ER diagram or architecture visuals
│   ├── postman collection/      # Postman collections for API testing
│   └── temp/                    # Temporary files
├── src/                         # Source code
│   ├── controllers/             # Route logic handlers
│   ├── db/                      # MongoDB connection logic
│   ├── middlewares/            # Auth, role, and error-handling middleware
│   ├── models/                  # Mongoose schemas/models
│   ├── routes/                  # Route definitions
│   ├── utils/                   # Utility functions
│   ├── validators/              # Input validators 
│   ├── app.js                   # Express app config
│   ├── constants.js             # Project constants
│   └── index.js                 # Entry point
├── .env                         # Environment variables
├── .gitignore                   # Git ignored files
├── .prettierrc / .prettierignore # Code formatting config
├── package.json                 # Project metadata and scripts
└── package-lock.json            # Dependency lockfile




