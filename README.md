# DSA Instructor

A comprehensive Data Structures and Algorithms learning platform with client and server components.

## Prerequisites

- Node.js (v14+)
- npm or yarn
- Git

## Project Structure

```
dsa_instructor/
├── client/          # Frontend application
├── server/          # Backend application
└── README.md
```

## Getting Started

### Server Setup

1. Navigate to server directory:

   ```bash
   cd server
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Create `.env` file:

   ```env
   PORT=5000
   NODE_ENV=development
   DATABASE_URL=your_database_url
   ```

4. Start development server:

   ```bash
   npm run dev
   ```

5. Production build:
   ```bash
   npm run build
   npm start
   ```

### Client Setup

1. Navigate to client directory:

   ```bash
   cd client
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Create `.env` file:

   ```env
   REACT_APP_API_URL=http://localhost:5000
   ```

4. Start development:

   ```bash
   npm start
   ```

5. Production build:
   ```bash
   npm run build
   ```

## API Documentation

Server runs on `http://localhost:5000`

Key endpoints:

- `GET /api/problems` - List all DSA problems
- `POST /api/solutions` - Submit solution

## Deployment

### Server (Heroku/Railway/Vercel)

```bash
npm run build
```

### Client (Vercel/Netlify)

```bash
npm run build
```

## Environment Variables

Refer to `.env.example` files in respective directories.

## License

MIT
