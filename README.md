# 💼 Skill Sphere - Job Portal Platform

Skill Sphere is a modern and responsive job portal web application where users can explore job listings from various companies, filter opportunities based on preferences, and apply with ease. Employers can also post job vacancies and manage listings, creating a dynamic ecosystem for both job seekers and recruiters.

## 🌟 Features

📱 Fully responsive design for all devices
🔎 Search and filter jobs by role, company, location, and experience
📝 Apply for jobs with resume upload support (via Cloudinary)
🏢 Employer dashboard to post and manage job listings
🔐 JWT-based authentication and authorization
🌐 Manual location entry for better control and accuracy
🗃️ Redux Toolkit for scalable and predictable state management
💾 Job data stored in MongoDB, ensuring reliability and scalability
  
## ⚙️ Tech Stack

- **Frontend:**
  - React JS
  - Tailwind CSS
  - shadcn/ui 
  - React-Router-DOM
  - Redux Toolkit (for state management)
  - Axios

- **Backend:**
  - Node.js (with Express)
  - MongoDB (with Mongoose)
  - Bcryptjs (for password hashing)
  - Cloudinary (for resume uploads)
  - Cookie-Parser
  - Dotenv (for environment variables)
  - JSON Web Tokens (JWT)
  - Nodemon (for automatic server restarts)

## Getting Started

### Installation

To get the project up and running, follow these steps:

1. Clone the repository to your local machine.
  
2. Create a .ENV file in the root folder.

   ```bash
   MONGODB_URI =...
   PORT = 8000
   SECRET_KEY =...
   CLOUDINARY_CLOUD_NAME =...
   CLOUDINARY_API_KEY =..
   CLOUDINARY_API_SECRET =...
   ```

### Scripts

 **Build the project**
  
   ```bash
   npm run build
   ```


 **Start the project**
  ```bash
  npm run start
  ```
