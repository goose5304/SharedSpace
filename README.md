#  Shared Space

A vibrant social platform for artists to share their daily creations, connect with friends, and participate in creative challenges. Build your streak, climb the leaderboard, and explore a community of digital art.

##  Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Getting Started](#getting-started)
- [API Documentation](#api-documentation)
- [Project Structure](#project-structure)

##  Features

### User Features

-  **Art Wall**: Explore a dynamic gallery of artworks shared by the community.
-  **Share Creativity**: Upload your daily artwork with titles and descriptions.
-  **Friends System**: Send friend requests, accept/decline invites, and view a personalized feed of your friends' art.
-  **Leaderboard & Gamification**: Earn points, maintain daily streaks, and compete for top spots on the leaderboard.
-  **Challenges**: Participate in active drawing challenges to spark inspiration.
-  **Profile Management**: Manage your portfolio, track achievements, and update your profile details.
-  **Secure Authentication**: Safe and secure login/signup process using JWT.

### Admin Features

-  **User Management**: Oversee registered users and manage community access.
-  **Content Moderation**: Tools to ensure the community remains safe and strictly for art.

##  Tech Stack

### Frontend

- **Framework:** React 19
- **Build Tool:** Vite 7
- **Routing:** React Router DOM 7
- **Styling:** Vanilla CSS / CSS Modules
- **State Management:** React Hooks
- **Language:** JavaScript/JSX

### Backend

- **Runtime:** Node.js 24
- **Framework:** Express 5
- **Database:** MongoDB (Mongoose 8)
- **Authentication:** JWT + bcrypt
- **Image Hosting:** Cloudinary
- **File Upload:** Multer

##  Getting Started

### Prerequisites

- Node.js (v18 or higher recommended)
- MongoDB Atlas account or local MongoDB
- Cloudinary account for image storage
- npm

### Installation

1. **Clone the repository**

```bash
git clone https://github.com/yourusername/shared-space.git
cd shared-space
```

2. **Install backend dependencies**

```bash
cd backend
npm install
```

3. **Install frontend dependencies**

```bash
cd ../frontend/SharedSpace
npm install
```

4. **Configure environment variables**

Create a `.env` file in the `backend` directory:

```env
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
PORT=3000
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```

5. **Run the application**

**Backend (Terminal 1):**

```bash
cd backend
npm run start
```

**Frontend (Terminal 2):**

```bash
cd frontend/SharedSpace
npm run dev
```

The frontend will be available at `http://localhost:5173` and the backend at `http://localhost:3000`.

##  API Documentation

### Authentication Endpoints

| Method | Endpoint             | Description          | Auth Required |
| ------ | -------------------- | -------------------- | ------------- |
| POST   | `/api/users/register`| Register a new user  | No            |
| POST   | `/api/users/login`   | Login user           | No            |

### Artwork Endpoints

| Method | Endpoint                    | Description                  | Auth Required |
| ------ | --------------------------- | ---------------------------- | ------------- |
| GET    | `/api/artworks/all`         | Get all artworks (Art Wall)  | No            |
| GET    | `/api/artworks/my`          | Get current user's artworks  | Yes           |
| GET    | `/api/artworks/friends`     | Get friends' artworks feed   | Yes           |
| POST   | `/api/artworks/create`      | Upload new artwork           | Yes           |
| GET    | `/api/artworks/:id`         | Get artwork by ID            | Yes           |
| PUT    | `/api/artworks/update/:id`  | Update artwork details       | Yes           |
| DELETE | `/api/artworks/delete/:id`  | Delete artwork               | Yes           |

### Social & User Endpoints

| Method | Endpoint                     | Description                  | Auth Required |
| ------ | ---------------------------- | ---------------------------- | ------------- |
| GET    | `/api/users/me`              | Get current user profile     | Yes           |
| PUT    | `/api/users/streak`          | Perform daily streak check-in| Yes           |
| POST   | `/api/users/friends/request` | Send friend request          | Yes           |
| POST   | `/api/users/friends/accept`  | Accept friend request        | Yes           |
| GET    | `/api/users/friends`         | Get friends list             | Yes           |

### Challenge Endpoints

| Method | Endpoint                 | Description             | Auth Required |
| ------ | ------------------------ | ----------------------- | ------------- |
| GET    | `/api/challenges/active` | Get active challenge    | Yes           |
| GET    | `/api/challenges/all`    | Get all challenges      | Yes           |
| POST   | `/api/challenges/submit` | Submit entry to challenge| Yes          |

##  Project Structure

```
SharedSpace/
├── backend/
│   ├── controllers/        # Request handlers (User, Artwork, Challenge)
│   ├── middleware/         # Auth and Admin middleware
│   ├── models/             # Mongoose schemas
│   ├── routes/             # API route definitions
│   ├── utils/              # Helpers
│   └── server.js           # Express entry point
│
└── frontend/
    └── SharedSpace/
        ├── src/
        │   ├── assets/     # Static images and icons
        │   ├── components/ # Reusable UI components
        │   ├── pages/      # Application pages (Home, Login, ArtWall)
        │   ├── App.jsx     # Main React component
        │   └── main.jsx    # Entry point
        ├── index.html
        └── package.json
```

## License

This project is a creative sharing platform built for community engagement accomplished for JPAD.

**Connect, Create, and Share your Space.**