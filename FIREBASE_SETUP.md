# Firebase Setup Instructions

This project uses Firebase Authentication for user management. Follow these steps to set up Firebase for your Tic Tac Toe application.

## Step 1: Create a Firebase Project

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Click "Add project"
3. Enter your project name
4. Follow the setup wizard

## Step 2: Enable Authentication Methods

1. In Firebase Console, go to **Authentication** > **Get started**
2. Enable the following sign-in methods:
   - **Email/Password**: Enable
   - **Google**: Enable (you'll need to configure OAuth consent screen in Google Cloud)

## Step 3: Get Your Firebase Configuration

1. In Firebase Console, go to **Project Settings** (gear icon)
2. Scroll down to "Your apps"
3. Click the **Web** icon (`</>`)
4. Register your app (give it a nickname)
5. Copy the Firebase configuration object

## Step 4: Set Up Environment Variables

1. In the project root, create a `.env` file:
   ```bash
   touch .env
   ```

2. Add your Firebase configuration:
   ```env
   VITE_FIREBASE_API_KEY=your-api-key
   VITE_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
   VITE_FIREBASE_PROJECT_ID=your-project-id
   VITE_FIREBASE_STORAGE_BUCKET=your-project.appspot.com
   VITE_FIREBASE_MESSAGING_SENDER_ID=your-messaging-sender-id
   VITE_FIREBASE_APP_ID=your-app-id
   ```

3. Replace all the placeholder values with your actual Firebase config values

## Step 5: Configure Google Sign-In (Optional but Recommended)

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Select your Firebase project
3. Go to **APIs & Services** > **Credentials**
4. Click **Create Credentials** > **OAuth client ID**
5. Configure the OAuth consent screen if prompted
6. Add authorized JavaScript origins and redirect URIs

## Step 6: Install Dependencies

Make sure you have all required packages:

```bash
npm install firebase
```

## Step 7: Run Your Application

```bash
npm run dev
```

## File Structure

```
src/
├── firebase.js              # Firebase initialization
├── context/
│   └── AuthContext.jsx      # Authentication context & hooks
├── pages/
│   ├── Login.jsx            # Login page (Email & Google)
│   └── Register.jsx          # Register page (Email & Google)
├── components/
│   └── ProtectedRoute.jsx    # Route protection component
└── routes/
    └── AppRoutes.jsx         # All application routes
```

## Features Included

✅ Email/Password Authentication  
✅ Google Sign-In  
✅ Protected Routes  
✅ User Profile Management  
✅ Persistent Sessions  
✅ Logout Functionality  

## Authentication Flow

1. **Unauthenticated users** see Login/Register buttons
2. **Clicking Login/Register** → Firebase Authentication
3. **After successful auth** → Redirect to dashboard
4. **All game pages** are protected - requires authentication
5. **User menu** in navbar shows profile and logout options

## Environment Variables Template

Create a `.env` file in the root directory with:

```env
# Firebase Configuration
VITE_FIREBASE_API_KEY=AIza...
VITE_FIREBASE_AUTH_DOMAIN=your-app.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your-project-id
VITE_FIREBASE_STORAGE_BUCKET=your-project.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=123456789
VITE_FIREBASE_APP_ID=1:123456789:web:abcdef
```

## Troubleshooting

### "Firebase App not initialized"
- Make sure your `.env` file is created and contains valid Firebase credentials
- Restart the dev server after adding environment variables

### Google Sign-In not working
- Ensure Google sign-in is enabled in Firebase Console
- Check OAuth consent screen configuration in Google Cloud Console

### Auth state not persisting
- Check browser console for errors
- Clear browser cache and localStorage

## Need Help?

Check the Firebase documentation:
- [Firebase Auth](https://firebase.google.com/docs/auth)
- [Firebase Web Setup](https://firebase.google.com/docs/web/setup)

