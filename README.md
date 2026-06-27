# 🚀 Auth Backend Assignment

A full-stack web application that demonstrates secure authentication and a structured 3-step onboarding flow using Spring Boot, MySQL, and React.

This project is built as an assignment to simulate real-world onboarding systems used in modern applications like fintech and SaaS platforms.

---

## 🧠 Project Overview

The application handles:

- User registration and login
- JWT-based authentication
- Multi-step onboarding process
- OTP verification (dummy OTP)
- Card management system
- Protected backend APIs

---

## 🚀 Features

- User Sign Up
- User Login
- JWT token generation
- Password encryption using BCrypt
- Secure protected routes
- Multi-step onboarding flow
- Basic info submission
- OTP verification (123456)
- Card management system

---

## 🧾 3-Step Onboarding Flow

### Step 1: Basic Information
Users submit personal details.

Fields:
- name
- dob
- address

---

### Step 2: OTP Verification
- Fixed OTP: 123456
- Marks user as verified after success

---

### Step 3: Add Card Details
- Only verified users can access this step
- Stores card details linked to user

Fields:
- cardNumber
- expiryMonth
- expiryYear

---

## 💳 View Cards

Get all saved cards of the logged-in user.

Requires JWT token in headers:
Authorization: Bearer <token>

---

## 🏗️ Tech Stack

### Backend
- Java
- Spring Boot
- Spring Security
- JWT Authentication
- Spring Data JPA
- Hibernate

### Database
- MySQL

### Frontend
- React.js
- Axios
- HTML/CSS (basic UI)

---

---

## ⚙️ How to run locally

### Clone the repo
git clone https://github.com/your-username/auth-backend-assignment.git

---

### Backend setup

Update application.properties:

Run backend:

mvn spring-boot:run

Backend runs at:
http://localhost:8080

---

### Frontend setup

cd client

npm install

npm start

Frontend runs at:
http://localhost:3000

---

## 🔐 Authentication Flow

1. User signs up or logs in
2. Server generates JWT token
3. Token stored in frontend
4. Token sent in every request:

Authorization: Bearer <token>

5. Backend validates token before allowing access

---

## 📁 Project Structure

Backend:
- Controller → APIs
- Service → Business logic
- Repository → DB layer
- Entity → Models
- Security → JWT config

Frontend:
- Pages → Login, Signup, Onboarding
- Components → UI forms
- Services → API calls

---

## 🔌 API Endpoints

Auth:
- POST /signup
- POST /login

Onboarding:
- POST /user/basic
- POST /user/verify
- POST /user/cards

Cards:
- GET /user/cards

---

## 🔒 Security Features

- JWT authentication
- BCrypt password hashing
- Protected routes
- OTP verification flow

---

## 🚀 Future Improvements

- Email OTP system
- Refresh tokens
- Role-based access (Admin/User)
- Payment integration
- Docker deployment
- Better UI

---

## 👩‍💻 Author

Your Name

---

## ⭐ Note

This project is built as an assignment to demonstrate backend design, authentication, and onboarding flow using full-stack development.
