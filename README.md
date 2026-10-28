# Pokémon Gym Leader Registry

A Pokémon-themed web application for managing Gym Leader records. Built with Angular, Express.js, and MongoDB Atlas.

## Features

- **View Gym Leaders** — Browse registered Gym Leaders and their details.
- **Add Leaders** — Create new Gym Leader records.
- **Edit Leaders** — Update existing leader information.
- **Delete Leaders** — Remove records when needed.
- **Regional Counts** — View Gym Leader counts for Kanto, Johto, and Hoenn.
- **Responsive Design** — Pokémon-inspired styling with colorful cards and animations.

## Tech Stack

- **Frontend:** Angular
- **Backend:** Node.js and Express.js
- **Database:** MongoDB Atlas with Mongoose
- **API:** REST API for CRUD operations

## Prerequisites

Install the following before running the application:

- Node.js and npm
- Angular CLI
- A MongoDB Atlas database connection

## Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/basilioSIT-ashley/pokemon-gym-leader-registry.git
cd pokemon-gym-leader-registry
```

### 2. Install frontend dependencies

```bash
npm install
```

### 3. Configure the backend

Open the `backend` folder and install its dependencies:

```bash
cd backend
npm install
```

Create a `.env` file in the `backend` folder and configure the environment variables required by your backend, including your MongoDB Atlas connection string and server port. Refer to your backend configuration for the exact variable names.

**Security:** Never commit your `.env` file, database credentials, or secrets to GitHub.

### 4. Run the backend

From the `backend` folder, use the start command configured in its `package.json`, for example:

```bash
npm start
```

### 5. Run the Angular frontend

Open a second terminal in the project root and run:

```bash
ng serve
```

Open [http://localhost:4200](http://localhost:4200) in your browser.

Make sure the backend is running and the frontend is configured to use the correct API URL.

## Building the Project

From the project root, run:

```bash
ng build
```

The production build output is generated in the configured Angular output directory.

## Project Purpose

This project demonstrates full-stack web development through Angular components, routing, reactive state management, REST API integration, and MongoDB database operations.

## Author

Created as a web development project.
