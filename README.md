# DSA Instructor

A comprehensive Data Structures and Algorithms learning platform powered by AI. This application allows users to interact with an AI instructor to learn DSA concepts, ask questions, and receive personalized guidance.

## 🚀 Features

- **AI-Powered Learning**: Interact with a Gemini-powered AI instructor tailored for DSA topics.
- **Chat Interface**: Create multiple chat sessions ("Tabs") to organize different learning topics.
- **Authentication**: Secure user signup and login with JWT access and refresh tokens.
- **Persistent History**: All chat history is saved in MongoDB, allowing users to revisit previous lessons.
- **Responsive Design**: Modern UI built with Next.js and Tailwind CSS.

## 🛠️ Tech Stack

### Client (Frontend)

- **Framework**: Next.js 16 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS 4
- **State Management**: React Context API
- **HTTP Client**: Axios
- **Icons**: Lucide React
- **Notifications**: Sonner

### Server (Backend)

- **Runtime**: Node.js
- **Framework**: Express.js
- **Language**: TypeScript
- **Database**: MongoDB (via Mongoose)
- **Authentication**: JWT (JSON Web Tokens), bcrypt for password hashing
- **AI Integration**: Google GenAI SDK (Gemini)

## 📂 Project Structure

The project is organized as a monorepo with `client` and `server` directories:

```
dsa_instructor/
├── client/          # Next.js Frontend
│   ├── src/
│   │   ├── app/     # App Router pages and layouts
│   │   ├── components/ # Reusable UI components
│   │   ├── lib/     # Utilities (axios setup, etc.)
│   │   └── context/ # Global state (Auth, Theme)
│   └── ...
├── server/          # Express Backend
│   ├── src/
│   │   ├── controllers/ # Business logic
│   │   ├── models/      # Mongoose schemas (Auth, Tab)
│   │   ├── routes/      # API endpoints
│   │   ├── middlewares/ # Auth & Error handling
│   │   └── config/      # Environment config & DB connection
│   └── ...
└── README.md
```

## 📋 Prerequisites

- **Node.js**: v18+ recommended
- **MongoDB**: Local instance or MongoDB Atlas connection string
- **Google Gemini API Key**: For AI functionality

## 🚀 Getting Started

### 1. Server Setup

Navigate to the server directory and install dependencies:

```bash
cd server
npm install
```

Create a `.env` file in the `server` directory based on `.env.example`:

```env
# Server Configuration
NODE_ENV=development
PORT=4040
CORS_ORIGIN=http://localhost:3000

# Database
MONGODB_URI=mongodb://localhost:27017/dsa-instructor # or your Atlas URI

# Gemini AI
GEMINI_API_KEY=your_gemini_api_key_here
GEMINI_MODEL=gemini-1.5-flash # or gemini-pro

# Authentication (JWT)
JWT_ACCESS_TOKEN_SECRET=your_super_secret_access_key
JWT_ACCESS_TOKEN_EXPIRY=15m
JWT_REFRESH_TOKEN_SECRET=your_super_secret_refresh_key
JWT_REFRESH_TOKEN_EXPIRY=7d
```

Start the development server:

```bash
npm run dev
```

The server will start on `http://localhost:4040`.

### 2. Client Setup

Open a new terminal, navigate to the client directory, and install dependencies:

```bash
cd client
npm install
```

Create a `.env` file in the `client` directory:

```env
NEXT_PUBLIC_NODE_ENV=development
NEXT_PUBLIC_API_URL=http://localhost:4040/api/v1
```

Start the frontend development server:

```bash
npm run dev
```

The application will be available at `http://localhost:3000`.

## 🔌 API Endpoints Summary

### Authentication (`/api/v1/auth`)

- `POST /signup`: Register a new user
- `POST /login`: Login and receive tokens
- `POST /refresh-token`: Refresh access token
- `POST /logout`: Logout user

### Messaging (`/api/v1/message`)

- `POST /new-tab`: Create a new chat session
- `GET /get-tabs`: Get all user chat sessions
- `GET /get-tab/:slug`: Get specific chat session details
- `POST /send-message/:slug`: Send a prompt to the AI and get a response

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License.
