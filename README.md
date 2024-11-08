# TimeTrack App

A full-stack time tracking application built with React and Node.js.

## Project Structure

- `/frontend` - React application
- `/backend` - Node.js/Express API

## Setup Instructions

### Frontend
```bash
cd frontend
npm install
npm start
```

### Backend
```bash
cd backend
npm install
npm run dev
```

## Environment Variables

### Frontend
Create a `.env` file in the frontend directory:
```
REACT_APP_API_URL=http://localhost:5001
```

### Backend
Create a `.env` file in the backend directory:
```
MONGODB_URI=your_mongodb_uri
PORT=5001
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
JWT_SECRET=your_jwt_secret
FRONTEND_URL=http://localhost:3000
NODE_ENV=development
```