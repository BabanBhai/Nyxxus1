# 🎮 Nyxxus Esports Tournament Platform

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/yourusername/nyxxus-esports&env=NEXTAUTH_SECRET,GOOGLE_CLIENT_ID,GOOGLE_CLIENT_SECRET,ADMIN_EMAIL&envDescription=Required%20environment%20variables%20for%20Nyxxus%20Esports&envLink=https://github.com/yourusername/nyxxus-esports#environment-variables)

A complete esports tournament registration platform with admin panel and Google OAuth authentication.

## 🚀 One-Click Deploy

1. Click the "Deploy with Vercel" button above
2. Fork/clone the repository to your GitHub
3. Add required environment variables in Vercel
4. Deploy automatically!

## 🔑 Environment Variables

Set these in your Vercel project settings:

```env
NEXTAUTH_SECRET=your-secret-here
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret
ADMIN_EMAIL=babanofficalgaming@gmail.com
NEXTAUTH_URL=https://your-app.vercel.app
```

## 🎯 Features

- ✅ Tournament Registration System
- ✅ User Management with Google OAuth
- ✅ Admin Panel (babanofficalgaming@gmail.com)
- ✅ Registration Codes (NY## format)
- ✅ Discord Integration
- ✅ Mobile Responsive Design
- ✅ PostgreSQL Database
- ✅ Secure Authentication

## 🛠️ Tech Stack

- **Frontend**: Next.js 15, React 18, TypeScript, Tailwind CSS
- **Backend**: Next.js API Routes, Prisma ORM
- **Database**: PostgreSQL (Vercel Postgres)
- **Auth**: NextAuth.js v5 with Google OAuth
- **Deployment**: Vercel

## 📋 Setup Instructions

### 1. Google OAuth Setup

1. Go to [Google Cloud Console](https://console.cloud.google.com)
2. Create a new project: "Nyxxus Esports"
3. Enable Google+ API
4. Create OAuth credentials:
   - Type: Web application
   - Authorized origins: `https://your-app.vercel.app`
   - Redirect URIs: `https://your-app.vercel.app/api/auth/callback/google`

### 2. Environment Variables

In Vercel dashboard → Settings → Environment Variables:

| Variable | Value | Description |
|----------|-------|-------------|
| `NEXTAUTH_SECRET` | Generate with: `openssl rand -base64 32` | Auth encryption key |
| `GOOGLE_CLIENT_ID` | From Google Cloud Console | OAuth client ID |
| `GOOGLE_CLIENT_SECRET` | From Google Cloud Console | OAuth client secret |
| `ADMIN_EMAIL` | `babanofficalgaming@gmail.com` | Admin user email |
| `NEXTAUTH_URL` | `https://your-app.vercel.app` | Your app URL |

### 3. Database Setup

After deployment:
```bash
# Install Vercel CLI
npm i -g vercel@latest

# Link project and setup database
vercel link
vercel env pull .env.local
npx prisma db push
npx prisma db seed
```

## 🏆 Admin Features

Login with `babanofficalgaming@gmail.com` to access:
- Create/edit tournaments
- View all registrations
- Manage registration status
- Delete registrations
- Export data

## 👥 User Features

- Google OAuth authentication
- Browse tournaments
- Register for tournaments
- Team management
- Registration tracking
- Discord integration

## 📱 Mobile Ready

Fully responsive design works on:
- Desktop browsers
- Mobile devices
- Tablets

## 🔐 Security

- Google OAuth only (no passwords)
- Environment-based configuration
- Input sanitization
- CSRF protection
- Session management

## 🚀 Development

```bash
# Install dependencies
npm install

# Copy environment template
cp .env.example .env.local

# Run development server
npm run dev

# Setup database
npx prisma db push
npx prisma db seed
```

## 📞 Support

- Check Vercel deployment logs for errors
- Verify environment variables are set
- Ensure Google OAuth URLs match your domain

## 📄 License

MIT License - feel free to use for your tournaments!
