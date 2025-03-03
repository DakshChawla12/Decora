# Decora.API - Home Decor E-Commerce API

## Overview
Decora is a backend service for a home decor e-commerce platform. It provides RESTful endpoints for managing products, brands, reviews, categories, and other entities. The API is built using **Node.js**, **Express.js**, and **Sequelize** with a **MySQL** database. Testing has been performed using **Postman**.

## Tech Stack
- **Node.js**
- **Express.js**
- **MySQL**
- **Sequelize ORM**
- **Postman** (for API testing)

## Database Schema
The application consists of the following tables:

1. **Product**
2. **Brand**
3. **Review**
4. **Category**
5. **Customer**
6. **User**
7. **Country**
8. **Department**
9. **State Region**
10. **Roles**
11. **Roles permissions**
12. **Employees**
13. **State**
14. **Country State**
15. **Brand**
16. **Category**
17. **Review**
18. **Product**


Each table has five standard controllers:
- **Find All** (`GET /{table}`)
- **Find by Primary Key (ID)** (`GET /{table}/:id`)
- **Create** (`POST /{table}`)
- **Update** (`PUT /{table}/:id`)
- **Delete** (`DELETE /{table}/:id`)

## Installation & Setup
### Prerequisites
- Node.js (>= 14.x)
- MySQL database

### Steps
1. **Clone the repository:**
   ```sh
   git clone https://github.com/yourusername/Decora.git
   cd Decora
   ```

2. **Install dependencies:**
   ```sh
   npm install
   ```

3. **Configure environment variables:**
   Create a `.env` file and add your database credentials:
   ```env
   DB_HOST=localhost
   DB_USER=root
   DB_PASSWORD=yourpassword
   DB_NAME=decora_db
   DB_DIALECT=mysql
   PORT=5000
   ```

4. **Start the server:**
   ```sh
   npm start
   ```

5. **Test the API with Postman:**
   Import the Postman collection and make requests to the API endpoints.

## Testing with Postman
- Use Postman to send `GET`, `POST`, `PATCH`, and `DELETE` requests to test the API.
- Ensure proper request body formatting for `POST` and `PATCH` methods.
- Verify the responses and database updates.

## Contributing
Feel free to fork this project, make enhancements, and submit a pull request. 

## License
This project is licensed under the MIT License.

