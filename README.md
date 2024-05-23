
# Backend Test with Plain Node.js

This project implements a simple backend server using plain Node.js, TypeScript, and PostgreSQL. It includes two main functionalities:
1. Fetching items from the Skinport API.
2. Updating user balance in a PostgreSQL database.

## Prerequisites

- Node.js (version 14 or higher)
- PostgreSQL
- TypeScript

## Setup

1. **Clone the repository:**
   ```sh
   git clone
   cd backend-task-node
   ```

2. **Install dependencies:**
   ```sh
   npm install
   ```

3. **Set up environment variables:**
   - Create a `.env` file in the root directory.
   - Add the following environment variable:
     ```plaintext
     DATABASE_URL=your_postgresql_database_url
     ```

4. **Build the project:**
   ```sh
   npm run build
   ```

5. **Start the server:**
   ```sh
   npm start
   ```

## Endpoints

### GET /items

Fetches a list of items from the Skinport API.

**Example request:**
```sh
curl -X GET http://localhost:3000/items
```

**Example response:**
```json
[
  {
    "market_hash_name": "Glove Case Key",
    "currency": "EUR",
    "item_page": "https://skinport.com/item/csgo/glove-case-key",
    ...
  },
  ...
]
```

### POST /user/balance

Updates the user's balance by deducting a specified amount.

**Request body:**
```json
{
  "userId": 1,
  "amount": 100
}
```

**Example request:**
```sh
curl -X POST http://localhost:3000/user/balance -H "Content-Type: application/json" -d '{"userId": 1, "amount": 100}'
```

**Example response:**
```json
{
  "id": 1,
  "balance": 900
}
```