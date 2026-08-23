# Pavodah Service Marketplace API

This is the backend API for the Service Marketplace application built with NestJS. The Service Marketplace connects service providers with customers, enabling them to offer and book various services.

## Features

- **Authentication & Authorization**: JWT-based authentication with role-based access control
- **User Management**: Complete user lifecycle management with social auth support
- **Email Service**: Multi-provider email service (AWS SES & Resend)
- **Database**: PostgreSQL with Prisma ORM
- **Logging**: Winston-based structured logging
- **Validation**: Request/response validation with class-validator
- **Error Handling**: Global exception filters

## Tech Stack

- **Framework**: NestJS
- **Database**: PostgreSQL
- **ORM**: Prisma
- **Authentication**: JWT with Passport
- **Email**: AWS SES / Resend
- **Validation**: class-validator & class-transformer
- **Logging**: Winston
- **Testing**: Jest

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- PostgreSQL database
- AWS account (for SES) or Resend account

### Installation

1. Clone the repository

```bash
git clone <repository-url>
cd service-marketplace-backend
```

2. Install dependencies

```bash
npm install
```

3. Set up environment variables

```bash
cp .env.example .env
```

Fill in your environment variables:

```env
DATABASE_URL="postgresql://username:password@localhost:5432/service_marketplace"
JWT_SECRET="your-jwt-secret"
JWT_EXPIRATION_TIME="1h"
JWT_REFRESH_EXPIRATION_TIME="30d"

# Email Configuration
EMAIL_PROVIDER="AWS" # or "RESEND"
AWS_REGION="us-east-1"
AWS_ACCESS_KEY_ID="your-aws-access-key"
AWS_SECRET_ACCESS_KEY="your-aws-secret-key"
AWS_BUCKET="your-aws-s3-bucket" # Optional: for file storage
FROM_EMAIL="noreply@servicemarketplace.com"

# Or for Resend
RESEND_API_KEY="your-resend-api-key"
RESEND_FROM_EMAIL="noreply@servicemarketplace.com"

# SMS Configuration
# HUBTEL | ARKESEL | AFRICASTALKING | TEST
SMS_PROVIDER="HUBTEL"
SMS_REQUEST_TIMEOUT_MS="10000"
HUBTEL_CLIENT_ID="your-hubtel-client-id"
HUBTEL_CLIENT_SECRET="your-hubtel-client-secret"
HUBTEL_SENDER_ID="your-approved-sender-id"

# Optional alternative providers
ARKESEL_API_KEY=""
ARKESEL_SENDER_ID=""
AFRICASTALKING_USERNAME=""
AFRICASTALKING_API_KEY=""
AFRICASTALKING_SENDER_ID=""
AFRICASTALKING_SANDBOX="false"
AFRICASTALKING_ENQUEUE="true"

# App Configuration
APP_NAME="Service Marketplace"
APP_URL="http://localhost:3000"
SUPPORT_EMAIL="support@servicemarketplace.com"

# Paystack hosted checkout
PAYSTACK_SECRET_KEY="sk_test_..."
PAYSTACK_BASE_URL="https://api.paystack.co"
PAYSTACK_CALLBACK_URL="http://localhost:3001/checkout/callback"
WEBSITE_URL="http://localhost:3001"
CORS_ORIGINS="http://localhost:3001"
# Keep false until Ghana Transfers and production payout operations are approved.
PAYOUTS_ENABLED="false"
PAYOUT_RECONCILIATION_ENABLED="true"
PAYOUT_RECONCILIATION_INTERVAL_MS="900000"
# Refund reconciliation is independent of provider payouts and should normally stay enabled.
REFUND_RECONCILIATION_ENABLED="true"
REFUND_RECONCILIATION_INTERVAL_MS="900000"
```

Configure the Paystack dashboard webhook URL as:

```text
https://<your-api-host>/api/payments/paystack/webhook
```

The same signed webhook handles charge, refund, transfer, and Paystack dispute
events. Before setting `PAYOUTS_ENABLED="true"`, enable Ghana Transfers on the
Paystack business, confirm the Paystack balance is funded by settlements, and
choose whether Transfers OTP remains enabled. When it is enabled, admins finish
approved payouts through the OTP prompt in the payout operations dashboard.
Refunds with an uncertain provider response are reconciled automatically and
also appear in the admin payout operations dashboard. A refund in
`NEEDS_ATTENTION` can be retried there with the customer's receiving-account
details once Paystack exposes its refund ID. The account is resolved with
Paystack and its returned account name must be confirmed before submission.
Failed automatic duplicate-charge refunds can be safely reattempted from the
same queue without changing the order balance or provider settlement.

Production startup fails when the Paystack key, HTTPS callback/web URL, or CORS
origin configuration is missing or invalid. Keep automatic refund and payout
reconciliation enabled so accepted provider outcomes are recovered after
network interruptions.

Use separate test and live credentials for staging and production. The
Paystack secret key is backend-only and must never be exposed through a
`NEXT_PUBLIC_` variable.

4. Set up the database

```bash
npx prisma migrate dev
npx prisma generate
```

5. Start the development server

```bash
npm run start:dev
```

The API will be available at `http://localhost:3000`

## Authentication with Refresh Tokens

This API implements JWT authentication with refresh tokens for enhanced security:

### Token Configuration

Set the following environment variables:

```bash
JWT_SECRET=your-secret-key-here
JWT_EXPIRATION_TIME=15m           # Access token expiry (15 minutes)
JWT_REFRESH_EXPIRATION_TIME=30d   # Refresh token expiry (30 days)
```

### Authentication Endpoints

- `POST /auth/register` - Register a new user
- `POST /auth/login` - Login with email/password
- `POST /auth/social` - Social authentication (Google, Apple, Facebook, Twitter)
- `POST /auth/forgot-password` - Request password reset
- `POST /auth/reset-password` - Reset password with OTP
- `POST /auth/verify-otp` - Verify password reset OTP
- `POST /auth/refresh` - Refresh JWT token
- `GET /auth/profile` - Get current user profile
- `PUT /auth/profile` - Update user profile
- `POST /auth/change-password` - Change password
- `DELETE /auth/account` - Soft delete account


   Summary of all WebSocket events for frontend
   CLIENT → SERVER
   
   support:join          { conversationId }  Join a room
   support:leave         { conversationId }   Leave a room
   support:send_message   { conversationId, content }
   support:escalate       conversationId     Request a human
   support:join_as_admin   conversationId     Admin claims conversation
   support:close      conversationId      End conversation

   SERVER → CLIENT
   
   support:message         { message }       New message (any sender)
   support:escalated        { conversation }     Status → WAITING
   support:admin_joined   { conversation }     Admin entered room
   support:admin_took_conversation { conversationId }  (admin room only)
   support:new_waiting    { conversation }     (admin room only)
   support:closed          { conversation }     Chat ended
   support:error       { message }       Something went wrong

   Summary of REST endpoints

   POST /api/support/conversations            Start conversation
   GET  /api/support/conversations/my         My conversations
   GET     /api/support/conversations/:id          Conversation + messages
   POST  /api/support/conversations/:id/messages Send message
   PATCH  /api/support/conversations/:id/escalate Request human
   PATCH /api/support/conversations/:id/close    Close

   GET    /api/support/admin/conversations        All chats (grouped)
   PATCH /api/support/admin/conversations/:id/join   Admin joins
   PATCH    /api/support/admin/conversations/:id/close  Admin closes

### Usage Example

```javascript
// Login response
{
  "data": {
    "userId": "user-id",
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...", // 15min access token
    "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..." // 30d refresh token
  }
}

// Refresh tokens
POST /auth/refresh
{
  "refreshToken": "your-refresh-token-here"
}
```

### Security Features

- Access tokens expire in 15 minutes (configurable)
- Refresh tokens expire in 30 days (configurable)
- Automatic token rotation on refresh
- User activity tracking on token refresh

## User Management

- User registration with email verification
- Social authentication (Google, Apple, Facebook, Twitter)
- Password reset with OTP via email
- Profile management
- Role-based access control (USER, ADMIN, SERVICE_PROVIDER)

## User Roles

- **USER**: Regular customers who can browse and book services
- **SERVICE_PROVIDER**: Users who can offer services to customers
- **ADMIN**: System administrators with full access

## Email Templates

The application includes responsive email templates for:

- Welcome emails
- Password reset OTP
- Email verification (future)

Templates are available in both HTML and plain text formats.

## Database Schema

The application uses PostgreSQL with the following main entities:

- **User**: Core user entity with authentication and profile data
- **Enums**: UserStatus, Role, SubscriptionStatus, ThemePreference, PreferredUnits

## Development

### Running Tests

```bash
# Unit tests
npm run test

# E2E tests
npm run test:e2e

# Test coverage
npm run test:cov
```

### Database Operations

```bash
# Create a new migration
npx prisma migrate dev --name migration-name

# Reset database
npx prisma migrate reset

# Generate Prisma client
npx prisma generate

# View database in Prisma Studio
npx prisma studio
```

### Linting and Formatting

```bash
# Lint code
npm run lint

# Format code
npm run format
```

## Deployment

### Production Build

```bash
npm run build
npm run start:prod
```

### Environment Variables for Production

Make sure to set all required environment variables in your production environment:

- Database connection string
- JWT secrets
- Email service credentials
- SMS provider credentials
- App configuration

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Run linting and tests
6. Submit a pull request

## License

This project is licensed under the UNLICENSED license.
