# Testing Guide - E-Commerce Application

## Authentication Testing

### Login Test
1. Navigate to `/login`
2. Use demo credentials:
   - Username: `emilys`
   - Password: `emilyspass`
3. Click "Login" button
4. Should redirect to `/products`

### After Login - Check Protected Routes
After successful login, you should be able to access:
- ✅ `/cart` - Shopping cart page
- ✅ `/profile` - User profile page
- ✅ `/orders` - Order history page
- ✅ `/checkout` - Checkout page

### Debugging Steps

If you can't access protected routes after login:

1. **Check Browser Console:**
   - Open DevTools (F12)
   - Look for errors in Console tab

2. **Check LocalStorage:**
   - Open DevTools → Application → Local Storage
   - Look for `auth-storage` key
   - Should contain: `{ user, token, tokenExpiry }`

3. **Check Network Tab:**
   - Open DevTools → Network tab
   - Login again
   - Check if login API call succeeds
   - Response should contain user data and token

4. **Clear Cache:**
   - Clear browser cache
   - Clear localStorage: `localStorage.clear()`
   - Refresh page
   - Try login again

### Expected Behavior

**Before Login:**
- Accessing `/cart`, `/profile`, `/orders`, `/checkout` → Redirects to `/login`

**After Login:**
- All protected routes should be accessible
- Header shows user name and "Logout" button
- Cart button is visible

### Token Expiry
- Token expires after 1 hour
- After expiry, you'll be auto-logged out
- Need to login again

## Common Issues

### Issue 1: Infinite Redirect Loop
**Symptom:** Page keeps redirecting between `/login` and protected route
**Solution:** Clear localStorage and cookies, then login again

### Issue 2: "Loading..." Forever
**Symptom:** Protected route shows loading spinner forever
**Solution:** 
- Check if `auth-storage` exists in localStorage
- If not, login again
- If yes, check if token is expired

### Issue 3: Can't Login
**Symptom:** Login button doesn't work or shows error
**Solution:**
- Check if DummyJSON API is accessible
- Try demo credentials exactly as shown
- Check browser console for errors

## Manual Testing Checklist

- [ ] Can login with demo credentials
- [ ] After login, redirects to `/products`
- [ ] Can access `/cart` page
- [ ] Can access `/profile` page
- [ ] Can access `/orders` page
- [ ] Can access `/checkout` page (with items in cart)
- [ ] Header shows user name
- [ ] Logout button works
- [ ] After logout, can't access protected routes
- [ ] After logout, redirects to `/login`

## Development Mode Testing

```bash
# Start dev server
npm run dev

# Open browser
http://localhost:3000

# Test login flow
1. Go to /login
2. Login with emilys/emilyspass
3. Try accessing /cart
4. Try accessing /profile
```

## Production Build Testing

```bash
# Build
npm run build

# Start production server
npm start

# Test same flow as development
```

## Debug Mode

To enable debug logging, add to `ProtectedRoute`:

```typescript
useEffect(() => {
  console.log('Auth State:', { user, token, tokenExpiry })
  console.log('Is Authenticated:', isAuthenticated)
}, [user, token, tokenExpiry, isAuthenticated])
```

This will log auth state to console for debugging.
