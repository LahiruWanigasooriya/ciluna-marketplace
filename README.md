# Ciluna Marketplace

## 1. Project Title & Short Description
**Ciluna Marketplace** is a modern, full-stack e-commerce platform built with Next.js 15, React 19, and MongoDB. It offers a seamless shopping experience with secure authentication, advanced product filtering, a shopping cart, and integrated payments via Stripe.

## 2. Project Overview
The Ciluna Marketplace is designed to handle the complexities of a real-world e-commerce application. It includes complete user flows from browsing product categories and variants to checkout and payment processing. The application leverages Next.js App Router and Server Actions for optimized performance and SEO.

## 3. Key Features
- **Comprehensive Product Catalog**: Supports categories, subcategories, and product variants.
- **Shopping Cart & Checkout**: Persistent cart functionality with a smooth checkout process.
- **Secure Payments**: Integrated with Stripe for secure transaction processing.
- **User Authentication**: JWT-based authentication with bcrypt for secure password hashing.
- **User Dashboard**: Manage orders, wishlists, and user profiles.
- **Advanced UI/UX**: Built with Tailwind CSS, Framer Motion for animations, and accessible UI components.
- **Media Management**: Integrated with Cloudinary for optimized image storage and delivery.
- **Email Notifications**: Automated transactional emails using Nodemailer.

## 4. Tech Stack
- **Framework**: Next.js 15 (App Router, Turbopack)
- **Frontend**: React 19, Tailwind CSS, Framer Motion
- **State Management**: Zustand
- **Form Handling**: React Hook Form, Yup validation
- **Backend**: Node.js, Next.js Server Actions
- **Database**: MongoDB (Mongoose Object Data Modeling)
- **Authentication**: JWT, bcryptjs
- **Payments**: Stripe (@stripe/stripe-js, @stripe/react-stripe-js)
- **Media**: Cloudinary
- **Email**: Nodemailer

## 5. How It Works / Workflow
1. **User Browsing**: Users can browse the catalog, filter by categories/brands, and view detailed product pages including variants.
2. **Authentication**: Users sign up or log in to manage their cart, wishlist, and profile.
3. **Checkout**: Users add items to the cart and proceed to checkout, providing shipping and billing information.
4. **Payment**: Stripe securely processes the payment.
5. **Order Management**: Once successful, an order is generated in the MongoDB database, and confirmation emails are sent.

## 6. Project Folder Structure
```
ciluna/
├── app/                  # Next.js App Router pages and layouts
├── backend/              # Server-side logic
│   ├── actions/          # Next.js Server Actions
│   └── models/           # Mongoose Database Models (User, Product, Order, etc.)
├── components/           # Reusable React components (UI, layout, etc.)
├── config/               # Configuration files
├── constants/            # Application constants and static data
├── functions/            # Helper functions and utilities
├── hooks/                # Custom React hooks
├── lib/                  # Library configurations (e.g., database connection)
├── public/               # Static assets
├── schemas/              # Validation schemas (Yup)
├── store/                # Zustand state management store
├── types/                # TypeScript type definitions
└── utils/                # Utility functions
```

## 7. Installation & Setup Guide

### Prerequisites
- Node.js (v18 or higher recommended)
- MongoDB instance (local or MongoDB Atlas)
- Stripe Account
- Cloudinary Account

### Steps
1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd ciluna
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or yarn install / pnpm install
   ```

3. **Set up Environment Variables**
   Create a `.env` file in the root directory and add the necessary environment variables (see below).

4. **Run the development server**
   ```bash
   npm run dev
   ```
   Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## 8. Environment Variables
To run this project, you will need to add the following environment variables to your `.env` file:
- `MONGODB_URI` - Your MongoDB connection string
- `JWT_SECRET` - Secret key for JWT signing
- `STRIPE_SECRET_KEY` - Stripe secret key
- `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` - Stripe publishable key
- `CLOUDINARY_CLOUD_NAME` - Cloudinary cloud name
- `CLOUDINARY_API_KEY` - Cloudinary API key
- `CLOUDINARY_API_SECRET` - Cloudinary API secret
- `EMAIL_HOST`, `EMAIL_PORT`, `EMAIL_USER`, `EMAIL_PASS` - SMTP credentials for Nodemailer

## 9. Docker / Deployment Instructions
The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new).
For standard deployment:
1. Run `npm run build` to build the application for production.
2. Run `npm run start` to start the production server.

## 10. License / Acknowledgements
This project uses [Next.js](https://nextjs.org), [Tailwind CSS](https://tailwindcss.com), and [Mongoose](https://mongoosejs.com).
