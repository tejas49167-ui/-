# Deployment

This project has three deployable apps:

- `frontend`: customer React app
- `admin`: admin React app
- `backend`: Express API

## Recommended Hosting

Use Vercel for `frontend` and `admin`.

The backend has a Vercel config, but this tutorial stores uploaded food images on server disk. Vercel serverless storage is temporary, so uploaded images can disappear after a function restart. For a production backend, Render/Railway is better unless images are moved to Cloudinary/S3.

## Frontend on Vercel

Create a Vercel project with:

- Root Directory: `frontend`
- Build Command: `npm run build`
- Output Directory: `dist`

Environment variable:

```txt
VITE_BACKEND_URL=https://your-backend-url
```

## Admin on Vercel

Create another Vercel project with:

- Root Directory: `admin`
- Build Command: `npm run build`
- Output Directory: `dist`

Environment variable:

```txt
VITE_BACKEND_URL=https://your-backend-url
```

## Backend on Vercel

Create another Vercel project with:

- Root Directory: `backend`
- Build Command: `npm install`
- Output Directory: leave empty

Environment variables:

```txt
MONGODB_URI=your_mongodb_atlas_connection_string
JWT_SECRET=your_jwt_secret
STRIPE_SECRET_KEY=your_stripe_secret_key
FRONTEND_URL=https://your-frontend-url.vercel.app
STRIPE_CURRENCY=inr
STRIPE_PRICE_MULTIPLIER=80
```

After frontend deployment, update `FRONTEND_URL` in the backend project and redeploy backend.
