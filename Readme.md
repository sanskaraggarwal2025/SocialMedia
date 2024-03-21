# Social Media Web Application

This project is a social media web application where users can connect with their friends, share posts, like others' posts, and engage in real-time chat. It's built using the MERN stack (MongoDB, Express.js, React.js, Node.js), with the addition of the `ws` library for real-time chat functionality and `recoil` for state management.

## Features

- **User Authentication**: Users can sign up, log in, and log out securely.
- **Friend Connections**: Users can connect with friends by following or unfollowing them.
- **Post Sharing**: Users can create, edit, and delete posts, as well as like posts from other users.
- **Real-time Chat**: Users can engage in real-time chat with their friends.


## Technologies Used

- **MongoDB**: NoSQL database used for storing user information, posts, and chat messages.
- **Express.js**: Backend framework for handling HTTP requests and routing.
- **React.js**: Frontend library for building user interfaces.
- **Node.js**: Server-side JavaScript runtime environment.
- **ws Library**: Lightweight WebSocket library for real-time chat functionality.
- **recoil**: State management library for React applications.

## Deployment

### Backend Deployment on EC2 Instance
**EC2 Instance Setup**:
   - Launch an EC2 instance on AWS.
   - Configure security groups to allow traffic on the required ports (e.g., 80 for HTTP, 443 for HTTPS, and any other port your backend server is using).
   - SSH into the instance and install necessary dependencies (Node.js, npm, MongoDB, etc.).



