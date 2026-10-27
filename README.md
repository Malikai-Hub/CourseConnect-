# Course Connect

//Had ai write the ReadMe for me
Course Connect is a full-stack web application designed to help students collaborate, stay organized, and manage their coursework in one place. Students can connect through study groups, share posts, and organize assignments in a centralized learning environment.

## Features

- **User Authentication** — Register and log in to an account.
- **Study Groups** — Browse available groups, search by group title, create groups, and join or leave groups.
- **Group Assignments** — Create assignments for groups, add descriptions and due dates, and view existing assignments.
- **Group Posts** — Create posts to share information and communicate with other group members.
- **Post Ownership** — Posts are associated with the users who created them.
- **Protected Actions** — Authentication and group membership are used to control access to group features.

## Technologies Used

### Frontend

- React
- JavaScript
- React Router
- HTML
- CSS

### Backend

- Node.js
- Express.js
- REST API
- JSON Web Tokens (JWT)

### Database

- PostgreSQL
- SQL

## Getting Started

Follow these steps to run Course Connect locally.

### Prerequisites

Make sure you have installed:

- [Node.js](https://nodejs.org/)
- [PostgreSQL](https://www.postgresql.org/)
- npm

### 1. Clone the repository

```bash
git clone YOUR_REPOSITORY_URL
cd CourseConnect
```

Replace `YOUR_REPOSITORY_URL` with your GitHub repository URL.

### 2. Install dependencies

Install the project's npm dependencies:

```bash
npm install
```

If your frontend and backend are in separate directories, navigate into each directory and run `npm install` there instead.

### 3. Set up the database

Create a PostgreSQL database named `courseconnect`.

Load the database schema from your project directory:

```bash
psql -U postgres -d courseconnect -f db/schema.sql
```

This creates the database tables used by the application.

### 4. Configure environment variables

Create a `.env` file in the backend project directory, using the following variables:

```env
DATABASE_URL=postgres://postgres:YOUR_PASSWORD@localhost:5432/courseconnect
JWT_SECRET=YOUR_SECRET_KEY
VITE_API=http://localhost:3000/api
```

Replace `YOUR_PASSWORD` with your PostgreSQL password and `YOUR_SECRET_KEY` with a secure, randomly generated secret.

**Important:** Never commit your `.env` file, database credentials, or JWT secret to GitHub.

If your frontend and backend use separate directories, place `VITE_API` in the frontend's `.env` file and the database and JWT variables in the backend's `.env` file.

### 5. Start the application

Start the backend API using your project's server command. In the current backend setup, this is:

```bash
node --env-file=.env server.js
```

Start the React frontend using the appropriate development script from its `package.json`, commonly:

```bash
npm run dev
```

The backend is configured to use port `3000`, and the Vite frontend typically runs at `http://localhost:5173`.

## Database Structure

Course Connect uses PostgreSQL to store application data.

| Table            | Purpose                                     |
| ---------------- | ------------------------------------------- |
| `users`          | Stores user account information             |
| `groups`         | Stores study group details and creators     |
| `group_members`  | Tracks group membership                     |
| `assignments`    | Stores group assignments and due dates      |
| `posts`          | Stores posts created within groups          |
| `study_sets`     | Stores study set information                |
| `flashcards`     | Stores questions and answers for study sets |
| `tests`          | Stores tests associated with study sets     |
| `test_questions` | Stores questions associated with tests      |

## Project Goals

Course Connect aims to make collaborative learning easier by giving students a shared space to find study groups, communicate, and organize coursework.

The project also provides hands-on experience with full-stack development, including frontend state management, REST API design, database relationships, authentication, and protected routes.

## Future Improvements

Potential future enhancements include:

- Editing and deleting group posts
- Completing the study set and flashcard workflows
- Adding interactive tests and quizzes
- Improving the user interface and responsive design
- Expanding assignment management features

## Author

Developed as a full-stack web development capstone project.
