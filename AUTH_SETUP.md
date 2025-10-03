# Authentication Setup

This document explains how to set up and use the authentication system in the Overleveraged webapp.

## Features

### Email Authentication

- **Sign Up**: Users can create accounts with email and password
- **Sign In**: Existing users can sign in with email and password
- **Password Confirmation**: Sign up requires password confirmation
- **Form Validation**: Client-side validation with Formik and Yup

### Wallet Authentication

- **Wallet Connection**: Support for MetaMask, WalletConnect, and Phantom
- **Nonce-based Authentication**: Secure wallet authentication using nonces
- **Auto Sign Up/Sign In**: Automatically creates account or signs in existing users
- **Signature Verification**: Uses wallet signatures for authentication

## API Endpoints

The authentication system integrates with the following backend endpoints:

### Email Authentication

- `POST /auth/signup` - Create new account with email/password
- `POST /auth/signin` - Sign in with email/password

### Wallet Authentication

- `POST /auth/wallet/nonce` - Request nonce for wallet address
- `POST /auth/wallet/verify` - Verify wallet signature (sign in)
- `POST /auth/wallet/signup` - Create account with wallet signature

## Environment Variables

Create a `.env.local` file with:

```env
NEXT_PUBLIC_API_URL=http://localhost:3000
```

## Usage

### 1. Wrap your app with AuthProvider

```tsx
import { AuthProvider } from "@/contexts/AuthContext";

function App() {
  return <AuthProvider>{/* Your app components */}</AuthProvider>;
}
```

### 2. Use authentication in components

```tsx
import { useAuth } from "@/contexts/AuthContext";

function MyComponent() {
  const { isAuthenticated, isLoading, login, logout } = useAuth();

  if (isLoading) return <div>Loading...</div>;

  return (
    <div>
      {isAuthenticated ? (
        <button onClick={logout}>Logout</button>
      ) : (
        <button onClick={() => setShowSignIn(true)}>Sign In</button>
      )}
    </div>
  );
}
```

### 3. Open sign-in modal

```tsx
import SignInModal from "@/components/modals/SignInModal";

function MyComponent() {
  const [showSignIn, setShowSignIn] = useState(false);

  return (
    <>
      <button onClick={() => setShowSignIn(true)}>Sign In</button>
      <SignInModal isOpen={showSignIn} onClose={() => setShowSignIn(false)} />
    </>
  );
}
```

## Token Management

Tokens are automatically stored in localStorage and managed by the auth context:

- `access_token`: Used for API requests
- `refresh_token`: Used to refresh expired access tokens

## Error Handling

The system includes comprehensive error handling:

- **Form Validation**: Client-side validation with specific error messages
- **API Errors**: Server errors are caught and displayed appropriately
- **Network Errors**: Handles network failures gracefully
- **Wallet Errors**: Handles wallet connection and signing errors

## Security Features

- **Nonce-based Wallet Auth**: Prevents replay attacks
- **Token Storage**: Secure token management
- **Input Validation**: Both client and server-side validation
- **Error Sanitization**: Prevents sensitive information leakage

## Customization

### Styling

All components use your global CSS variables and can be customized by modifying the Tailwind classes.

### Validation Rules

Modify validation rules in the `EmailSignInModal` component:

```tsx
const validationSchema = Yup.object({
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
  password: Yup.string()
    .min(8, "Password must be at least 8 characters")
    .required("Password is required"),
  // Add more validation rules as needed
});
```

### API Configuration

Modify the API base URL in `lib/auth.ts`:

```tsx
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";
```
