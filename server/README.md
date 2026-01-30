# Server

## Folder Structure

```
server/
├── src/
│   ├── config/
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── middleware/
│   └── utils/
│   └── types/
├── .env.example
├── package.json
├── README.md
└── server.ts
└── app.ts
```

## Build

### Prerequisites

- Node.js (v14+)
- npm or yarn

### Installation

```bash
npm install
```

### Configuration

Copy `.env.example` to `.env` and update variables:

```bash
cp .env.example .env
```

### Run Development

```bash
npm run dev
```

### Run Production

```bash
npm run build
npm start
```

### Tests

```bash
npm test
```

## API Documentation

| No | Name           | Total |
|----|----------------|-------|
| 1  | Authentication |   5   |
| 2  | Users API      |   4   |
| 3  | Helth          |   1   |

- auth: http://localhost:4040/api/v1/auth
- message: http://localhost:4040/api/v1/message
