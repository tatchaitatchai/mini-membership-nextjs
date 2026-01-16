# Membership Backoffice

Modern membership management backoffice system built with Next.js 14, TypeScript, Zustand, and ky.

## 🚀 Tech Stack

- **Framework:** Next.js 14 (App Router)
- **Language:** TypeScript
- **State Management:** Zustand
- **HTTP Client:** ky
- **Styling:** TailwindCSS
- **UI Components:** shadcn/ui
- **Form Handling:** React Hook Form + Zod
- **Icons:** Lucide React
- **Notifications:** Sonner

## 🎨 Features

- ✅ Modern & Beautiful UI with gradient backgrounds
- ✅ Secure authentication with JWT
- ✅ Type-safe API client with ky
- ✅ Global state management with Zustand
- ✅ Form validation with Zod
- ✅ Toast notifications
- ✅ Protected routes
- ✅ Responsive design
- ✅ Dark mode support

## 📦 Installation

```bash
# Install dependencies
npm install

# Create environment file
cp .env.example .env.local

# Update .env.local with your API URL
NEXT_PUBLIC_API_BASE_URL=http://localhost:8085/api/v1
```

## 🏃‍♂️ Running the Application

```bash
# Development mode
npm run dev

# Production build
npm run build
npm start
```

The application will be available at `http://localhost:3000`

## 🔐 Authentication

The system connects to your backend API at:
- **Login Endpoint:** `POST /api/v1/auth/login`

**Login Request:**
```json
{
  "email": "your@email.com",
  "password": "yourpassword"
}
```

**Expected Response:**
```json
{
  "token": "jwt_token_here",
  "user": {
    "id": "user_id",
    "email": "user@email.com",
    "name": "User Name",
    "role": "admin"
  }
}
```

## 📁 Project Structure

```
bf/
├── src/
│   ├── app/                    # Next.js app router
│   │   ├── login/             # Login page
│   │   ├── dashboard/         # Dashboard page
│   │   ├── globals.css        # Global styles
│   │   ├── layout.tsx         # Root layout
│   │   └── page.tsx           # Home page
│   ├── components/
│   │   └── ui/                # UI components (shadcn)
│   ├── lib/
│   │   ├── api-client.ts      # ky HTTP client
│   │   └── utils.ts           # Utility functions
│   └── stores/
│       └── auth-store.ts      # Zustand auth store
├── public/                     # Static files
├── tailwind.config.ts         # Tailwind configuration
├── tsconfig.json              # TypeScript configuration
└── package.json               # Dependencies
```

## 🛠️ Key Components

### API Client (`src/lib/api-client.ts`)
- Built with ky for modern HTTP requests
- Automatic token injection
- Request/response interceptors
- Error handling
- Auto-redirect on 401

### Auth Store (`src/stores/auth-store.ts`)
- Zustand state management
- Persistent authentication
- Login/logout functionality
- User data management

### Login Page (`src/app/login/page.tsx`)
- Modern gradient design
- Form validation with Zod
- Thai language support
- Loading states
- Error handling

## 🎨 Customization

### Colors
Edit CSS variables in `src/app/globals.css`:
```css
:root {
  --primary: 221.2 83.2% 53.3%;
  --secondary: 210 40% 96.1%;
  /* ... more colors */
}
```

### API URL
Update in `.env.local`:
```bash
NEXT_PUBLIC_API_BASE_URL=http://your-api-url/api/v1
```

## 📝 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm start` - Start production server
- `npm run lint` - Run ESLint

## 🔒 Security Best Practices

- JWT tokens stored in localStorage
- Automatic token cleanup on logout
- Protected routes with authentication checks
- HTTP-only cookies recommended for production
- HTTPS required in production

## 🤝 Contributing

Feel free to submit issues and enhancement requests!

## 📄 License

MIT License - feel free to use this project for your needs.
