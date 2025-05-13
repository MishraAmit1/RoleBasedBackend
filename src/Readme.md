
#### Backend README (`backend/README.md`)
```markdown
# Role-Based Authentication App (Backend)

A Node.js backend for the role-based authentication app, handling Google OAuth, user management, and form CRUD operations with MongoDB.

## Live Demo
- **URL**: https://role-based-app-v8qx.onrender.com
- **Frontend**: https://role-based-frontend-plum.vercel.app

## Features
- **Google OAuth**: Authenticates users via Gmail.
- **User Management**: Creates users with no default role; allows role assignment (Admin/Guest).
- **Form CRUD**: Stores and manages form data (Name, Address, PIN, Phone Number) with role-based access.
- **JWT**: Generates tokens for secure authentication.

## Tech Stack
- **Backend**: Node.js, Express, Passport.js
- **Database**: MongoDB
- **Deployment**: Render

## Setup Instructions
1. **Clone the repo**:
   ```bash
   git clone https://github.com/<your-username>/role-based-backend.git
   cd role-based-backend
