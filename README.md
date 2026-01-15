# BetterPlugins Hub - Minecraft Plugin Marketplace

A modern, full-featured Minecraft plugin marketplace built with Next.js, Firebase, and TypeScript.

## Features

✅ **Google Authentication** - Admin login with Google accounts  
✅ **Plugin Management** - Create, edit, and delete plugins  
✅ **JAR File Upload** - Upload plugin JAR files to Firebase Storage  
✅ **Plugin Showcase** - Browse, search, and view plugin details  
✅ **Responsive Design** - Mobile-friendly UI with Tailwind CSS  
✅ **Admin Dashboard** - Full CRUD operations for plugins  
✅ **Modern UI Components** - Shadcn UI components with Radix UI  

## Tech Stack

- **Framework**: Next.js 15 with TypeScript
- **Database**: Firebase Firestore
- **Authentication**: Firebase Auth (Google Sign-In)
- **File Storage**: Firebase Storage
- **Styling**: Tailwind CSS + Shadcn UI
- **State Management**: React Hooks
- **Icons**: Lucide React

## Getting Started

### Prerequisites

- Node.js 18+ and npm
- Firebase Account
- Google Cloud Project

### 1. Clone the Repository

```bash
git clone <your-repo-url>
cd studio
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Setup Firebase

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Create a new project or use an existing one
3. Enable the following services:
   - **Authentication** → Google provider
   - **Firestore Database** (Start in test mode for development)
   - **Cloud Storage**

4. Get your Firebase config:
   - Go to Project Settings → General
   - Copy your Firebase config values

### 4. Configure Environment Variables

1. Copy `.env.example` to `.env.local`:

```bash
cp .env.example .env.local
```

2. Fill in your Firebase credentials in `.env.local`:

```env
NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id
NEXT_PUBLIC_ADMIN_EMAILS=your_email@gmail.com,other_admin@gmail.com
```

### 5. Setup Firestore Database

Create a `plugins` collection in Firestore with the following document structure:

```json
{
  "name": "Plugin Name",
  "slug": "plugin-name",
  "description": "Short description",
  "longDescription": "Detailed description",
  "category": "Gameplay",
  "author": "Author Name",
  "iconUrl": "https://...",
  "downloads": 0,
  "minecraftVersions": ["1.20.1"],
  "gallery": [],
  "overview": "<html>...</html>",
  "changelog": [],
  "versions": []
}
```

### 6. Setup Firebase Storage Rules

Update your Firebase Storage rules for security:

```
rules_version = '2';
service firebase.storage {
  match /b/{bucket}/o {
    match /plugins/{allPaths=**} {
      allow read: if request.auth != null;
      allow write: if request.auth != null && request.auth.token.email in resource.metadata.allowedEmails;
    }
  }
}
```

### 7. Run Development Server

```bash
npm run dev
```

Open [http://localhost:9002](http://localhost:9002) in your browser.

## Usage

### For Users

- Visit the homepage to see featured plugins
- Click "Browse Plugins" to view all plugins
- Click on a plugin to see details and download

### For Admins

1. Go to `/admin/login`
2. Sign in with your Google account (must be in `NEXT_PUBLIC_ADMIN_EMAILS`)
3. **Create Plugin**: Click "Add New Plugin" button
4. **Edit Plugin**: Click "Edit" button on any plugin
5. **Delete Plugin**: Click trash icon (with confirmation)
6. **Upload JAR**: Click "JAR" button to upload plugin files

## Project Structure

```
src/
├── app/
│   ├── admin/              # Admin dashboard & login
│   ├── api/                # API routes
│   ├── plugins/            # Plugin pages
│   ├── layout.tsx          # Root layout with AuthProvider
│   └── page.tsx            # Homepage
├── components/
│   ├── ui/                 # Shadcn UI components
│   ├── layout/             # Header & footer
│   └── *.tsx               # Feature components
├── context/
│   └── AuthContext.tsx     # Firebase auth context
├── lib/
│   ├── firebase.ts         # Firebase config
│   ├── types.ts            # TypeScript types
│   └── utils.ts            # Helper functions
└── hooks/
    └── use-toast.ts        # Toast notifications
```

## API Routes

### GET `/api/plugins`
Fetch all plugins

### POST `/api/plugins`
Create a new plugin

### GET `/api/plugins/[id]`
Get a specific plugin

### PATCH `/api/plugins/[id]`
Update a plugin

### DELETE `/api/plugins/[id]`
Delete a plugin

### POST `/api/upload`
Upload a JAR file (multipart form data)

## Deployment

### Deploy to Vercel (Recommended)

1. Push code to GitHub
2. Import project in [Vercel](https://vercel.com)
3. Add environment variables
4. Deploy!

### Deploy to Firebase Hosting

```bash
npm install -g firebase-tools
firebase init hosting
npm run build
firebase deploy
```

## Security Considerations

- ⚠️ Replace Firebase config with your production credentials before deploying
- Keep admin emails in `NEXT_PUBLIC_ADMIN_EMAILS` updated
- Setup proper Firestore security rules
- Use environment variables for sensitive data
- Enable HTTPS in production
- Implement rate limiting for file uploads

## Troubleshooting

### "Access Denied" on Admin Login
- Ensure your email is in `NEXT_PUBLIC_ADMIN_EMAILS`
- Check Firebase Authentication is enabled
- Verify Google provider is configured in Firebase

### File Upload Fails
- Check file is a valid JAR (`.jar` extension)
- File size must be under 100MB
- Verify Firebase Storage is enabled
- Check storage rules allow your user

### Plugins Not Showing
- Verify Firestore collection is named `plugins`
- Check document structure matches expected schema
- Ensure Firestore security rules allow reads

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see LICENSE file for details.

## Support

For issues and questions:
- Check the [Docs](./docs/blueprint.md)
- Create an issue on GitHub
- Visit the [Support](https://localhost:9002/support) page

---

**Built with ❤️ using Next.js and Firebase**
