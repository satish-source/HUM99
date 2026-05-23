# HUM99 Backend

This is the backend server for the HUM99 project, built with Node.js, Express.js, MongoDB, and OpenAI.

## Setup

1. **Install MongoDB** (if not already installed):
   - Download from [mongodb.com](https://www.mongodb.com/try/download/community).
   - Install and start the MongoDB service (mongod.exe).

2. **Get OpenAI API Key**:
   - Sign up at [OpenAI](https://platform.openai.com/).
   - Create an API key.

3. **Set Environment Variable**:
   - Create a `.env` file in the backend directory.
   - Add: `OPENAI_API_KEY=your_api_key_here`

4. **Navigate to the backend directory**:
   ```
   cd backend
   ```

5. **Install dependencies**:
   ```
   npm install
   ```

6. **Start the server**:
   ```
   npm start
   ```

The server will run on `http://localhost:5000` by default and connect to MongoDB at `mongodb://localhost:27017/hum99`.

## API Endpoints

- `GET /`: Welcome message
- `GET /api/data`: Retrieve all stored data from database
- `POST /api/data`: Save new data to database (send JSON body like `{ "message": "test", "data": [1,2,3] }`)- `POST /api/chat`: Chat with Nova AI Mentor (send JSON body like `{ "message": "hi" }`)
## Testing

Use Postman or curl:

- Get data: `curl http://localhost:5000/api/data`
- Post data: `curl -X POST http://localhost:5000/api/data -H "Content-Type: application/json" -d '{"message":"test","data":[1,2,3]}'`
- Chat: `curl -X POST http://localhost:5000/api/chat -H "Content-Type: application/json" -d '{"message":"hi"}'`

## Troubleshooting

- If MongoDB connection fails, ensure mongod is running.
- If OpenAI fails, check your API key and .env file.
- Check port 5000 isn't in use.
- For production, use a cloud database like MongoDB Atlas.