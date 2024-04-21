# Shopping List Backend

This Node.js-based shopping list application serves as the final project of the second part of the evening programming course offered by
[Unicorn a.s](https://unicorn.com/en/). It empowers users with the ability to manage their shopping list seamlessly, offering features such as item creation, editing, and deletion.

## Installation
Follow these steps to set up the shopping list application locally:

### Prerequisites
- **Node.js** (version 15.x or higher)
- **npm** (normally comes with Node.js)
- **MongoDB** installed and running on your local machine.


### Step 1: Clone the Repository
First, clone the repository to your local machine. You can do this by running the following command in your terminal:
```bash
git clone https://github.com/VelikanovDev/Shopping-List-Backend.git
cd Shopping-List-Backend
```

### Step 2: Install Dependencies
Navigate to the project directory and install the necessary packages with npm:
```bash
cd path/to/Shopping-List-Backend  # If you are not already in the project directory
npm install
```

### Step 3: Start the Application
Once the installation and configuration are complete, you can start the application by running:
```bash
node app.js
```

## API Endpoints
This section describes the endpoints available in the shopping list application, detailing the purpose and usage of each.

### POST /create
- **Description**: Creates a new shopping list item.
- **Request Body**: 
```json
{
  "content": "Milk",
  "count": 2,
  "state": "DELIVERED"
}
```
- **Responses**:
  - **201 Created**: Successfully created item. Returns the created item.
  - **400 Bad Request**: Error in item creation (e.g., missing required fields).

### GET /list
- **Description**: Retrieves a list of items, optionally filtered by content, state, or creation date.
- **Query Parameters**: 
  - **content**: (Optional) Filter items by content substring.
  - **state**: (Optional) Filter items by state, comma-separated if multiple.
  - **createdAt**: (Optional) Filter items by creation date range in the format YYYY-MM-DDtoYYYY-MM-DD.
- **Responses**:
  - **200 OK**: Returns an array of matching items.
  - **500 Internal Server Error**: Error retrieving items.

### DELETE /delete/:id
- **Description**: Deletes an item by its ID.
- **URL Parameters**:
  - **id**: The ID of the item to delete.
- Responses:
  - **200 OK**: Successfully deleted the item, returns success message.
  - **404 Not Found**: Item with specified ID not found.
  - **500 Internal Server Error**: Error deleting the item.

### PUT /update/:id
- **Description**: Updates an existing item.
- **URL Parameters**:
  - **id**: The ID of the item to update.
- **Request Body**:
```json
{
  "content": "Updated Milk",
  "count": 2,
  "state": "CANCELED"
}
```
- **Responses**:
  - **200 OK**: Successfully updated the item. Returns the updated item.
  - **404 Not Found**: Item with specified ID not found.
  - **500 Internal Server Error**: Error updating the item.
