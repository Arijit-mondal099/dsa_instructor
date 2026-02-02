# Client README

```markdown
# DSA Instructor - Client

## Description

The client application for the DSA Instructor platform provides an interactive learning interface for users to study Data Structures and Algorithms with guided instruction and real-time feedback.

## Folder Structure

```text
client/
├── public/
│ ├── index.html
│ └── favicon.ico
├── src/
│ ├── app/
│ ├── components/
│ ├── lib/
│ ├── type/
│ └── middleware.ts
├── .env.example
├── .gitignore
├── package.json
└── README.md
````

## Tech Stack
- **Frontend Framework**: React 19
- **Build Tool**: Next.js
- **Styling**: Tailwind CSS
- **State Management**: Context API
- **HTTP Client**: Axios
- **Testing**: Vitest / Jest

## Installation

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn

### Clone Repository
```bash
git clone https://github.com/your-username/dsa-instructor.git
cd dsa-instructor/client
````

### Install Dependencies

```bash
npm install
```

### Environment Setup

```bash
NEXT_PUBLIC_NODE_ENV=development
NEXT_PUBLIC_API_URL=http://localhost:4040
```

## Running the Application

```bash
# Development
npm run dev

# Build
npm run build

# Preview
npm run preview
```

## Contributing

Please follow the coding standards and submit pull requests with detailed descriptions.

