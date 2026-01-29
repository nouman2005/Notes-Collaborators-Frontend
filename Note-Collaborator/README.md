Real-Time Collaborative Notes Application

A full-stack real-time collaborative notes application where multiple users can create, edit, and share notes with live updates.
Built with React, Tailwind CSS, Node.js, Express, MySQL, and Socket.IO.

🚀 Features
🔐 Authentication & Authorization

User registration and login using JWT

Role-based access (admin, editor, viewer)

Protected routes for authenticated users

📝 Notes Management

Create, read, update notes

Inline editable note titles

Autosave with debounce

View all notes owned or shared with you

⚡ Real-Time Collaboration

Live note editing using Socket.IO

Changes synced instantly across users

Activity logging for note actions

🔗 Sharing

Generate secure share links

Public read-only access via tokenized URLs

No authentication required for shared notes

🎨 Modern UI/UX

Clean, responsive UI using Tailwind CSS

Notion / Google Docs–inspired editor

Sticky toolbar and activity panel

🛠 Tech Stack
Frontend

React (Vite)

Tailwind CSS

React Router

Axios

Socket.IO Client

Backend

Node.js

Express.js

MySQL

Socket.IO

JWT Authentication

bcrypt (password hashing)

express-validator

Deployment

Frontend: Vercel / Netlify

Backend: Railway / Render

Database: MySQL

├── backend
│ ├── controllers
│ ├── routes
│ ├── middlewares
│ ├── validators
│ ├── config
│ ├── utils
│ └── server.js
│
├── frontend
│ ├── src
│ │ ├── pages
│ │ ├── components
│ │ ├── auth
│ │ ├── api
│ │ └── socket
│ └── main.jsx

cd backend
npm install
npm start

cd frontend
cd Note-Collaborator
npm install
npm run dev

Architecture Highlights

REST APIs for data persistence

WebSockets for real-time collaboration

Debounced autosave to reduce DB load

Token-based public sharing

Clean separation of concerns (MVC pattern)

Security Considerations

Passwords hashed using bcrypt

JWT-based authentication

Protected routes using middleware

Share links expose only read-only content

SQL injection prevention using prepared queries
