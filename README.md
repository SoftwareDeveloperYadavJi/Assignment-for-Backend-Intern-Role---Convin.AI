# Expense Splitter API

## Overview

The Expense Splitter API is a RESTful web service that allows users to manage shared expenses. Users can add expenses, which can be split equally, exactly, or by percentage among participants. The API is built using Node.js, Express, and MongoDB.

## Features

- **Add Expense**: Allows users to add an expense with different split methods.
- **Split Methods**:
  - **Equal Split**: The total amount is divided equally among all participants.
  - **Exact Split**: Users can specify how much each participant owes.
  - **Percentage Split**: Users can specify the percentage of the total amount each participant should pay.

## Project Structure

```plaintext
expense-splitter/
├── models/
│   └── Expense.js         # Mongoose model for Expense
├── routes/
│   └── expenses.js        # Routes for expense-related operations
├── controllers/
│   └── expenseController.js # Controller for handling expense logic
├── config/
│   └── db.js              # Database connection configuration
├── server.js               # Main server file
├── package.json            # Project dependencies and scripts
└── README.md               # Project documentation
```

## Installation

1. Clone the repository:
   ```bash
   https://github.com/SoftwareDeveloperYadavJi/Assignment-for-Backend-Intern-Role---Convin.AI.git
   ```

2. Install the dependencies:
   ```bash
   npm install
   ```

3. Set up the database configuration in `config/db.js`.

4. Run the server:
   ```bash
   npm run dev
   ```

## API Endpoints

### 1. Add Expense

- **Endpoint**: POST /api/expenses
- **Description**: Adds a new expense with the specified split method.
- **Request Body**:
  ```json
  {
    "userId": "603c9a0d8b1c2e24d4e0b123",  // ID of the user adding the expense
    "amount": 100,                      // Total amount of the expense
    "splitMethod": "equal",             // Split method: equal, exact, or percentage
    "participants": [                    // Array of participant IDs
      "603c9a0d8b1c2e24d4e0b456",
      "603c9a0d8b1c2e24d4e0b789"
    ]
  }
  ```
- **Response**:
  - Success (201):
    ```json
    {
      "message": "Expense added successfully",
      "expense": {
        "_id": "603c9a0d8b1c2e24d4e0babc",
        "userId": "603c9a0d8b1c2e24d4e0b123",
        "amount": 100,
        "splitMethod": "equal",
        "participants": [
          {
            "userId": "603c9a0d8b1c2e24d4e0b456",
            "amount": 50
          },
          {
            "userId": "603c9a0d8b1c2e24d4e0b789",
            "amount": 50
          }
        ],
        "createdAt": "2024-10-17T00:00:00.000Z",
        "updatedAt": "2024-10-17T00:00:00.000Z",
        "__v": 0
      }
    }
    ```
  - Error (500):
    ```json
    {
      "message": "Error adding expense",
      "error": "Participant must have a userId"
    }
    ```

## Example Usage

Here is an example of how to add an expense using Postman:

1. Set the request type to POST.
2. Enter the URL: `http://localhost:3000/api/expenses`.
3. In the Body tab, select `raw` and set the format to JSON.
4. Paste the request body as shown above.
5. Click Send.

## Technologies Used

- Node.js: JavaScript runtime for building the server.
- Express: Web framework for Node.js.
- MongoDB: NoSQL database for storing expense data.
- Mongoose: ODM library for MongoDB and Node.js.

## Contributing

Contributions are welcome! If you have suggestions for improvements or new features, feel free to create an issue or submit a pull request.


## Contact

For any questions or inquiries, please contact [Nitin Yadav](mailto:nitiny1524@gmail.com).
