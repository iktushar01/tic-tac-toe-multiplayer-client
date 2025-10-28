# Troubleshooting Firebase API Key Error

If you're getting `auth/api-key-not-valid` error, follow these steps:

## Step 1: Check API Key Restrictions

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Select your project: **tic-tac-toe-online-dbf10**
3. Go to **APIs & Services** > **Credentials**
4. Find your API key: **AIzaSyAMSsIlseHlHkzGj8D7InD3ub0rPt7gK7w**
5. Click on the API key to edit it

### Option A: Remove All Restrictions (Easiest for Development)
- Scroll down to **API restrictions**
- Select **Don't restrict key**
- Click **Save**

### Option B: Allow Specific APIs (Recommended for Production)
- Under **API restrictions**, select **Restrict key**
- Add these APIs:
  - Identity Toolkit API
  - Cloud Firestore API
  - Cloud Storage API

## Step 2: Enable Firebase Authentication

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Select your project: **tic-tac-toe-online-dbf10**
3. Click **Authentication** in the left sidebar
4. Click **Get started**
5. Go to **Sign-in method** tab
6. Enable these providers:
   - ✅ **Email/Password**: 
     - Click "Email/Password"
     - Enable it
     - Click **Save**
   - ✅ **Google**:
     - Click "Google"
     - Enable it
     - Click **Save**

## Step 3: Enable Required APIs

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Select your project: **tic-tac-toe-online-dbf10**
3. Go to **APIs & Services** > **Library**
4. Search and enable these APIs:
   - ✅ **Identity Toolkit API**
   - ✅ **Cloud Firestore API**
   - ✅ **Cloud Storage API**

## Step 4: Check Billing (Optional)

Firebase has a generous free tier, but you need to enable billing in some cases:
1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Select your project
3. Click the ⚙️ **Settings** icon
4. Click **Project settings**
5. Go to **Usage and billing**
6. Make sure billing is enabled (free tier is sufficient)

## Step 5: Restart Dev Server

After making changes:
```bash
# Stop the current server (Ctrl+C)
npm run dev
```

## Verify Configuration

Test your setup by checking the browser console. You should NOT see the error anymore.

## Still Having Issues?

1. Check the browser console for detailed error messages
2. Verify the Firebase config in `src/firebase.js` matches your project
3. Make sure you're using the correct project ID: `tic-tac-toe-online-dbf10`
4. Try creating a new API key if the current one doesn't work

## Quick Test

After setup, try to:
1. Navigate to `/register`
2. Create a test account
3. Check Firebase Console > Authentication to see if the user appears


