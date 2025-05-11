# Mini Blog

A simple blog platform built with the MERN stack (MongoDB, Express, React, Node.js) to allow users to create, read, edit, and delete blog posts. The app includes features like user authentication, JWT-based authorization, and a responsive UI built with Tailwind CSS.

## Features

- **User Authentication**: Users can sign up, log in, and manage their sessions with JWT tokens.
- **CRUD Operations**: Users can create, read, update, and delete blog posts.
- **Responsive UI**: A clean, user-friendly interface built with React and styled using Tailwind CSS.
- **Tags**: Add tags to posts for easy categorization and search.


## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/astonlazar/Mini-Blog.git

2. Navigate to the project directory:
   ```bash
   cd Mini-Blog

3. Install dependencies for both the backend (mini-blog-server) and frontend (mini-blog-client):
   ```bash
   # Install backend dependencies
   cd mini-blog-server
   npm install
  
   # Install frontend dependencies
   cd ../mini-blog-client
   npm install

4. Set up environment variables for both the server and client. Create a .env file for each and set up necessary configurations       (database URI, JWT secret, PORT number).

5. Start both the server and client from the root directory:
   ```bash
   # Start the server (backend)
   cd mini-blog-server
   npm start
    
   # In a new terminal, start the client (frontend)
   cd ../mini-blog-client
   npm start

