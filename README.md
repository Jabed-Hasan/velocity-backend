Car Store Backend Documentation
Project Setup
The Car Store API is an Express-based TypeScript application using MongoDB and Mongoose for schema definition and data operations. It provides CRUD operations for cars and orders while ensuring data integrity with schema validation.

1. Create a Car
   Endpoint: /api/cars
   Method: POST
   Request Body Example:
   {
   "brand": "Toyota",
   "model": "Camry",
   "year": 2024,
   "price": 25000,
   "category": "Sedan",
   "description": "A reliable family sedan.",
   "quantity": 50,
   "inStock": true
   }

Response Example:
{
"message": "Car created successfully",
"success": true,
"data": {
"\_id": "carId",
"brand": "Toyota",
"model": "Camry",
...
}
}

2. Get All Cars
   Endpoint: /api/cars
   Method: GET
   Query Parameters: searchTerm (optional for brand, model, or category).
   Response Example:
   {
   "message": "Cars retrieved successfully",
   "status": true,
   "data": [
   {
   "_id": "carId",
   "brand": "Toyota",
   "model": "Camry",
   ...
   }
   ]
   }

3. Get a Specific Car
   Endpoint: /api/cars/:carId
   Method: GET
   Response Example:
   {
   "message": "Car retrieved successfully",
   "status": true,
   "data": {
   "\_id": "carId",
   "brand": "Toyota",
   ...
   }
   }

4. Update a Car
   Endpoint: /api/cars/:carId
   Method: PUT
   Request Body Example:
   {
   "price": 27000,
   "quantity": 30
   }

Response Example:
{
"message": "Car updated successfully",
"status": true,
"data": {
"\_id": "carId",
"price": 27000,
...
}
}

5. Delete a Car
   Endpoint: /api/cars/:carId
   Method: DELETE
   Response Example:
   {
   "message": "Car deleted successfully",
   "status": true,
   "data": {}
   }

6. Order a Car
   Endpoint: /api/orders
   Method: POST
   Request Body Example:
   {
   "email": "customer@example.com",
   "car": "carId",
   "quantity": 1,
   "totalPrice": 27000
   }

Response Example:
{
"message": "Order created successfully",
"status": true,
"data": {
"\_id": "orderId",
"email": "customer@example.com",
...
}
}

Inventory Logic:
Decrease the car's quantity.
If quantity === 0, set inStock: false.
Return an error if stock is insufficient. 7. Calculate Revenue
Endpoint: /api/orders/revenue
Method: GET
Response Example:
{
"message": "Revenue calculated successfully",
"status": true,
"data": {
"totalRevenue": 810000
}
}

Error Handling
Validation Errors:
{
"message": "Validation failed",
"success": false,
"error": { ... },
"stack": "Error stack trace"
}

Not Found: Return a 404 error if a car or order is missing.
Insufficient Stock: Custom error response for orders exceeding available stock.
Technologies Used
Backend Framework: Express with TypeScript
Database: MongoDB with Mongoose
Validation: Mongoose schema validation
Testing Tools: Postman
How to Run
Clone the repository.
Install dependencies: npm install.
Create a .env file with MongoDB URI and port.
Build the Project Compile TypeScript into JavaScript using the following command: npm run build
Run the server: npm run dev.
Test endpoints using Postman or any REST client.
