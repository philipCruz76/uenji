# Uenji

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Next.js](https://img.shields.io/badge/Next.js-15-black)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue)](https://www.typescriptlang.org/)
[![Node.js](https://img.shields.io/badge/Node.js-18+-green)](https://nodejs.org/)

A modern, full-stack freelancer marketplace platform that connects buyers with skilled freelancers. Built with Next.js 14 and designed for scale, featuring comprehensive tools for managing freelance services, orders, and payments.

## Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Getting Started](#getting-started)
- [Environment Setup](#environment-setup)
- [Database Setup](#database-setup)
- [Project Structure](#project-structure)
- [Development](#development)
- [Deployment](#deployment)
- [Contributing](#contributing)
- [License](#license)
- [Support](#support)

## Features

### Core Platform
- **Marketplace**: Complete gig creation and discovery system with advanced search and categorization
- **Dual Dashboard**: Seamless switching between buyer and seller perspectives with role-based interfaces
- **Order Management**: Full lifecycle management from creation to completion with milestone tracking
- **Review System**: Comprehensive rating and feedback system with quality metrics

### Payment & Commerce
- **Stripe Integration**: Secure payment processing with support for multiple currencies
- **Subscription Management**: Flexible subscription models with automatic billing
- **Revenue Analytics**: Detailed financial reporting and commission tracking

### Communication
- **Real-time Messaging**: Instant messaging powered by Pusher with file sharing capabilities
- **Notification System**: Multi-channel notifications for order updates and communications
- **Video Conferencing**: Integrated video calls for project consultations

### Security & Authentication
- **NextAuth Integration**: Secure authentication with multiple providers
- **Rate Limiting**: Redis-based rate limiting to prevent abuse
- **Email Verification**: Secure account activation and password recovery
- **Role-based Access Control**: Granular permissions system

### Internationalization
- **Multi-language Support**: Currently supporting Portuguese (default) and English
- **Extensible Localization**: Ready for 18+ additional languages
- **RTL Support**: Right-to-left language support for Arabic and Persian markets

## Tech Stack

**Frontend**
- [Next.js 14](https://nextjs.org/) - React framework with App Router
- [TypeScript](https://www.typescriptlang.org/) - Type-safe development
- [Tailwind CSS](https://tailwindcss.com/) - Utility-first CSS framework
- [Radix UI](https://www.radix-ui.com/) - Accessible component primitives
- [Framer Motion](https://www.framer.com/motion/) - Animation library

**Backend**
- [Next.js API Routes](https://nextjs.org/docs/api-routes/introduction) - Serverless backend
- [Prisma](https://www.prisma.io/) - Type-safe database ORM
- [MongoDB](https://www.mongodb.com/) - NoSQL database
- [NextAuth.js](https://next-auth.js.org/) - Authentication library

**Services & Integrations**
- [Stripe](https://stripe.com/) - Payment processing
- [Pusher](https://pusher.com/) - Real-time communications
- [Cloudinary](https://cloudinary.com/) - Media management
- [AWS S3](https://aws.amazon.com/s3/) - File storage
- [Upstash Redis](https://upstash.com/) - Caching and rate limiting
- [Nodemailer](https://nodemailer.com/) - Email services




## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

---

Built with Next.js and modern web technologies.
