# Healthcare Website

A comprehensive healthcare platform for organ donation, blood availability, and hospital bed tracking.

## Features

- Organ Donor Registration
- Organ Request System
- Blood Availability Tracking
- Hospital Bed Availability
- User Authentication
- Contact Form
- Admin Dashboard

## Tech Stack

- Frontend: Next.js, TypeScript, Tailwind CSS
- Backend: Node.js, Express, TypeScript
- Database: MongoDB
- Authentication: JWT

## Prerequisites

- Node.js (v14 or higher)
- MongoDB
- npm or yarn

## Setup Instructions

1. Clone the repository:
```bash
git clone https://github.com/yourusername/healthcare-website.git
cd healthcare-website
```

2. Install frontend dependencies:
```bash
npm install
```

3. Install backend dependencies:
```bash
cd backend
npm install
```

4. Create environment files:

Frontend (.env.local):
```
NEXT_PUBLIC_API_URL=http://localhost:5001
```

Backend (.env):
```
PORT=5001
MONGODB_URI=mongodb://localhost:27017/healthcare
JWT_SECRET=your_jwt_secret
```

5. Start the development servers:

Frontend:
```bash
npm run dev
```

Backend:
```bash
cd backend
npm run dev
```

## Deployment

### Frontend Deployment (Vercel)

1. Push your code to GitHub
2. Connect your repository to Vercel
3. Configure environment variables in Vercel
4. Deploy

### Backend Deployment (Heroku)

1. Create a Heroku account
2. Install Heroku CLI
3. Login to Heroku:
```bash
heroku login
```
4. Create a new Heroku app:
```bash
heroku create your-app-name
```
5. Add MongoDB addon:
```bash
heroku addons:create mongolab
```
6. Configure environment variables:
```bash
heroku config:set JWT_SECRET=your_jwt_secret
```
7. Deploy:
```bash
git push heroku main
```

## Contributing

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Create a new Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.
