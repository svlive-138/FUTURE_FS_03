# PowerGym Deployment Guide

This guide provides step-by-step instructions for deploying PowerGym to production.

## Table of Contents
1. [Pre-Deployment Checklist](#pre-deployment-checklist)
2. [Frontend Deployment](#frontend-deployment)
3. [Backend Deployment](#backend-deployment)
4. [Database Setup](#database-setup)
5. [Domain & SSL](#domain--ssl)
6. [Post-Deployment](#post-deployment)

## Pre-Deployment Checklist

- [ ] Update all environment variables
- [ ] Change default admin credentials
- [ ] Set strong JWT_SECRET
- [ ] Review security settings
- [ ] Test all forms and APIs
- [ ] Verify mobile responsiveness
- [ ] Test all payment integrations
- [ ] Set up email notifications
- [ ] Create backup strategy
- [ ] Set up monitoring

## Frontend Deployment

### Option 1: Vercel (Recommended for React/Vite)

**Advantages**: Fast deployment, automatic HTTPS, great for React apps

**Steps:**

1. Push code to GitHub:
```bash
cd frontend
git init
git add .
git commit -m "Initial commit"
git remote add origin https://github.com/yourusername/powergym.git
git push -u origin main
```

2. Install Vercel CLI:
```bash
npm install -g vercel
```

3. Deploy:
```bash
vercel --prod
```

4. Set environment variables:
   - Go to Vercel dashboard
   - Project settings → Environment Variables
   - Add `VITE_API_URL=https://your-backend-domain.com/api`

### Option 2: Netlify

**Steps:**

1. Connect GitHub repository:
   - Go to netlify.com
   - Connect GitHub account
   - Select repository

2. Build settings:
   - Build command: `npm run build`
   - Publish directory: `dist`
   - Environment variables: `VITE_API_URL`

3. Deploy:
   - Netlify automatically builds and deploys on push

### Option 3: AWS S3 + CloudFront

**Steps:**

1. Build production bundle:
```bash
npm run build
```

2. Upload to S3:
```bash
aws s3 sync dist/ s3://your-bucket-name/
```

3. Configure CloudFront for CDN and HTTPS

## Backend Deployment

### Option 1: Render.com (Recommended)

**Steps:**

1. Connect GitHub to Render
2. Create new Web Service
3. Select your backend repository
4. Configure:
   - **Name**: powergym-api
   - **Root Directory**: backend
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
   - **Environment**: Node

5. Set environment variables:
   - Go to Environment
   - Add all variables from `.env`:
   ```
   PORT=5000
   NODE_ENV=production
   MONGODB_URI=your_mongodb_uri
   JWT_SECRET=your_strong_secret_key
   FRONTEND_URL=https://your-frontend-domain.com
   EMAIL_SERVICE=gmail
   EMAIL_USER=your_email
   EMAIL_PASSWORD=your_app_password
   ```

6. Deploy (automatic on push)

### Option 2: Heroku (Deprecated, but still available)

**Steps:**

1. Install Heroku CLI:
```bash
npm install -g heroku
```

2. Login to Heroku:
```bash
heroku login
```

3. Create app:
```bash
heroku create powergym-api
```

4. Set environment variables:
```bash
heroku config:set MONGODB_URI=your_mongodb_uri
heroku config:set JWT_SECRET=your_secret_key
heroku config:set NODE_ENV=production
heroku config:set FRONTEND_URL=https://your-domain.com
```

5. Deploy:
```bash
git push heroku main
```

### Option 3: AWS EC2

**Steps:**

1. Launch EC2 instance (Ubuntu 20.04)
2. SSH into instance:
```bash
ssh -i your-key.pem ec2-user@your-instance-ip
```

3. Install Node.js:
```bash
curl -fsSL https://deb.nodesource.com/setup_16.x | sudo -E bash -
sudo apt-get install -y nodejs
```

4. Install MongoDB (or use MongoDB Atlas)

5. Clone repository:
```bash
git clone your-repo-url
cd powergymbeta/backend
npm install
```

6. Install PM2:
```bash
sudo npm install -g pm2
```

7. Start app with PM2:
```bash
pm2 start server.js --name "powergym-api"
pm2 startup
pm2 save
```

8. Install Nginx as reverse proxy:
```bash
sudo apt-get install nginx
```

9. Configure Nginx:
```nginx
server {
    listen 80;
    server_name api.yourdomain.com;

    location / {
        proxy_pass http://localhost:5000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

## Database Setup

### Option 1: MongoDB Atlas (Cloud - Recommended)

**Steps:**

1. Go to mongodb.com/cloud/atlas
2. Create account and login
3. Create new cluster:
   - Choose cloud provider (AWS recommended)
   - Select region closest to your users
   - Choose M0 (free) or M2/M5 for production

4. Configure network access:
   - Add IP whitelist (0.0.0.0/0 for development, restrict for production)
   - Create database user
   - Get connection string

5. Update `.env`:
```env
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/powergym?retryWrites=true&w=majority
```

6. Seed database:
```bash
npm run seed
```

### Option 2: Self-Hosted MongoDB

1. Install MongoDB on your server
2. Configure authentication and backups
3. Use connection string: `mongodb://localhost:27017/powergym`

## Domain & SSL

### Setup Custom Domain

1. **Register Domain** (GoDaddy, Namecheap, Route 53, etc.)

2. **For Vercel/Netlify**:
   - Add domain in platform settings
   - Update DNS records as instructed
   - SSL auto-generated

3. **For custom servers**:
   - Update DNS A records to point to your server IP
   - Use Let's Encrypt for free SSL:
   ```bash
   sudo apt-get install certbot python3-certbot-nginx
   sudo certbot certonly --nginx -d yourdomain.com
   ```

### Update API URLs

Once domain is set up, update:

**Frontend**:
```env
VITE_API_URL=https://api.yourdomain.com/api
```

**Backend**:
```env
FRONTEND_URL=https://yourdomain.com
```

## Post-Deployment

### 1. Verify Everything Works

```bash
# Test frontend
curl https://yourdomain.com

# Test backend
curl https://api.yourdomain.com/api/health

# Test membership form
curl -X POST https://api.yourdomain.com/api/membership \
  -H "Content-Type: application/json" \
  -d '{"name":"John","email":"john@example.com","phone":"1234567890","plan":"monthly"}'
```

### 2. Setup HTTPS Redirect

For Nginx:
```nginx
server {
    listen 80;
    server_name yourdomain.com;
    return 301 https://$server_name$request_uri;
}
```

### 3. Enable Monitoring

**Sentry (Error Tracking)**:
```bash
npm install @sentry/node
```

**LogRocket (Session Replay)**:
- Add to frontend for debugging
- Understand user behavior

**Status Page**:
- Use statuspage.io
- Communicate outages to members

### 4. Setup Backups

**MongoDB Atlas**: Automatic backups (built-in)

**Custom MongoDB**:
```bash
# Daily backup script
0 2 * * * mongodump --db powergym --out /backups/$(date +\%Y\%m\%d)
```

### 5. Setup Security Headers

For nginx:
```nginx
add_header X-Frame-Options "SAMEORIGIN" always;
add_header X-Content-Type-Options "nosniff" always;
add_header X-XSS-Protection "1; mode=block" always;
add_header Referrer-Policy "no-referrer-when-downgrade" always;
```

### 6. Analytics Setup

**Google Analytics**:
- Add GA4 tracking code to frontend
- Monitor user behavior

**Google Search Console**:
- Verify domain ownership
- Submit sitemap
- Monitor search performance

## Performance Optimization

### Frontend
- Enable gzip compression
- Use CloudFlare CDN
- Optimize images
- Cache static assets

### Backend
- Enable database indexing
- Use Redis for caching
- Implement rate limiting
- Add pagination to list endpoints

## Scaling (When Needed)

1. **Add Load Balancer**: Use Nginx or AWS ELB
2. **Database Replication**: Set up MongoDB replica set
3. **Cache Layer**: Add Redis
4. **Static CDN**: Use CloudFlare or AWS CloudFront
5. **Multiple Servers**: Deploy backend to multiple instances

## Troubleshooting

### CORS Error
- Check FRONTEND_URL in backend .env
- Ensure correct headers in API responses

### Connection Refused
- Verify backend is running
- Check firewall rules
- Verify port accessibility

### Database Connection Failed
- Check MONGODB_URI
- Verify IP whitelist in MongoDB Atlas
- Test connection string locally

### SSL Certificate Issues
- Verify domain points to server
- Check Let's Encrypt renewal
- Clear CDN cache

## Maintenance

- **Weekly**: Check error logs
- **Monthly**: Review analytics and user feedback
- **Quarterly**: Update dependencies and security patches
- **Annually**: Review and plan improvements

## Emergency Recovery

### Website Down
1. Check server status
2. Review error logs
3. Restart services: `pm2 restart powergym-api`
4. Verify database connection

### Database Corruption
1. Restore from latest backup
2. Verify data integrity
3. Update website status
4. Notify team

### Security Breach
1. Isolate affected systems
2. Review access logs from past 30 days
3. Reset admin credentials
4. Update all API keys
5. Run security audit

---

**For questions or issues, refer to the main README.md or contact your hosting provider support.**