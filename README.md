# Vegetables API

This is a simple RESTful API built with Node.js and Express. It demonstrates CRUD (Create, Read, Update, Delete) operations on a mock database (`vegetables`). The project uses middleware for logging requests, parsing incoming request bodies, and handling errors.

---

## **Features**
- **Retrieve all vegetables**: `GET /vegetables`
- **Retrieve a single vegetable**: `GET /vegetables/:id`
- **Add a new vegetable**: `POST /vegetables`
- **Delete a vegetable**: `DELETE /vegetables/:id`
- **Custom Middleware**:
  - Logs request details.
  - Handles 404 errors.
