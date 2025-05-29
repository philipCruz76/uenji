# Uenji - Freelancer Marketplace Platform

Uenji is a modern, full-stack freelancer marketplace platform that connects buyers with skilled freelancers. Built with Next.js 14 and featuring a comprehensive set of tools for managing freelance services, orders, and payments.

## ✨ Features

### 🏪 **Marketplace**
- **Gig Creation**: Freelancers can create detailed service listings with packages, pricing, and delivery times
- **Advanced Search**: Category-based browsing and search functionality
- **User Profiles**: Comprehensive freelancer profiles with skills, education, and portfolio

### 💼 **Dual Dashboard System**
- **Buyer Dashboard**: Order management, messaging, and service discovery
- **Seller Dashboard**: Gig management, order tracking, and analytics
- **View Switching**: Users can seamlessly switch between buyer and seller perspectives

### 💳 **Payment & Orders**
- **Stripe Integration**: Secure payment processing with PaymentIntents
- **Order Management**: Complete order lifecycle from creation to delivery
- **Review System**: Post-completion rating and feedback system

### 💬 **Communication**
- **Real-time Messaging**: Instant messaging system powered by Pusher
- **Inbox Management**: Organized conversations between buyers and sellers
- **Notifications**: Push notifications for important updates

### 🌍 **Internationalization**
- **Multi-language Support**: Ready for Portuguese (default) and English
- **Extensible**: Support for 18+ languages (configurable)
- **RTL Support**: Right-to-left language support for Arabic and Persian

### 🔐 **Authentication & Security**
- **NextAuth Integration**: Secure authentication with multiple providers
- **Rate Limiting**: Upstash Redis-based rate limiting
- **Email Verification**: Account activation via email tokens
- **Password Reset**: Secure password recovery system

## 🛠️ Tech Stack

### **Frontend**
- **Next.js 14** - React framework with App Router
- **TypeScript** - Type-safe development
- **Tailwind CSS** - Utility-first CSS framework
- **Radix UI** - Accessible component primitives
- **Framer Motion** - Smooth animations
- **React Hook Form** - Form handling with Zod validation

### **Backend**
- **Next.js API Routes** - Serverless backend functions
- **Prisma** - Type-safe database ORM
- **MongoDB** - NoSQL database
- **NextAuth** - Authentication library

### **Integrations**
- **Stripe** - Payment processing
- **Pusher** - Real-time communications
- **Cloudinary** - Image and file management
- **AWS S3** - File storage
- **Upstash Redis** - Caching and rate limiting
- **Nodemailer** - Email services

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- npm/yarn/pnpm
- MongoDB database
- Redis instance (Upstash recommended)

### Installation

1. **Clone the repository**
```bash
git clone <repository-url>
cd uenji
```

2. **Install dependencies**
```bash
npm install
# or
yarn install
# or
pnpm install
```

3. **Environment Setup**
Create a `.env.local` file with the following variables:
```env
# Database
DATABASE_URL="your-mongodb-connection-string"

# NextAuth
NEXTAUTH_SECRET="your-nextauth-secret"
NEXTAUTH_URL="http://localhost:3000"

# Stripe
STRIPE_SECRET_KEY="your-stripe-secret-key"
STRIPE_PUBLISHABLE_KEY="your-stripe-publishable-key"

# Pusher
PUSHER_APP_ID="your-pusher-app-id"
PUSHER_KEY="your-pusher-key"
PUSHER_SECRET="your-pusher-secret"
PUSHER_CLUSTER="your-pusher-cluster"

# Upstash Redis
UPSTASH_REDIS_REST_URL="your-upstash-url"
UPSTASH_REDIS_REST_TOKEN="your-upstash-token"

# Email
EMAIL_FROM="your-email"
EMAIL_SERVER_HOST="your-smtp-host"
EMAIL_SERVER_PORT="587"
EMAIL_SERVER_USER="your-email-user"
EMAIL_SERVER_PASSWORD="your-email-password"

# File Storage
CLOUDINARY_CLOUD_NAME="your-cloudinary-name"
CLOUDINARY_API_KEY="your-cloudinary-key"
CLOUDINARY_API_SECRET="your-cloudinary-secret"
```

4. **Database Setup**
```bash
npx prisma generate
npx prisma db push
```

5. **Run the development server**
```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) to view the application.

## 📁 Project Structure

```
uenji/
├── app/                    # Next.js App Router
│   ├── [locale]/          # Internationalized routes
│   │   ├── [username]/    # User profiles
│   │   ├── categorias/    # Categories
│   │   ├── checkout/      # Payment flow
│   │   ├── inbox/         # Messaging
│   │   ├── orders/        # Order management
│   │   └── search/        # Search functionality
│   └── api/               # API routes
├── components/             # Reusable UI components
│   ├── auth/              # Authentication components
│   ├── dashboard/         # Buyer/Seller dashboards
│   ├── gigs/              # Gig-related components
│   ├── orders/            # Order management
│   ├── ui/                # Base UI components
│   └── ...
├── lib/                   # Utility functions and configurations
├── prisma/                # Database schema and migrations
├── i18n/                  # Internationalization config
├── types/                 # TypeScript type definitions
└── constants/             # Application constants
```

## 🧪 Scripts

- `npm run dev` - Start development server
- `npm run build` - Build production application
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm run analyze` - Analyze bundle size

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is private and proprietary.

---

Built with ❤️ using Next.js and modern web technologies.
