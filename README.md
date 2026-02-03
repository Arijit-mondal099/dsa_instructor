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
   env.example
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
   NEXT_PUBLIC_NODE_ENV=development
   NEXT_PUBLIC_API_URL=http://localhost:3000

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

Server runs on `http://localhost:4040`

| No | Name           | Total |
|----|----------------|-------|
| 1  | Authentication |   5   |
| 2  | Users API      |   4   |
| 3  | Helth          |   1   |

- auth: http://localhost:4040/api/v1/auth
- message: http://localhost:4040/api/v1/message

## Deployment

### Server

```bash
npm run build
```

### Client

```bash
npm run build
```

## Environment Variables

Refer to `.env.example` files in respective directories.

## License

MIT
