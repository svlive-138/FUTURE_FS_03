# Quick Reference - AWS S3 Production Setup

## TL;DR - Get Started in 5 Minutes

### 1. Install Packages
```bash
cd backend
npm install @aws-sdk/client-s3 @aws-sdk/s3-request-presigner sharp
```

### 2. Get AWS Credentials
1. Create AWS account (https://aws.amazon.com)
2. Create IAM user with S3 access
3. Save credentials securely

### 3. Create S3 Bucket & CloudFront
1. Create S3 bucket: `powergym-uploads-prod`
2. Set up CloudFront distribution (CDN)
3. Get CloudFront domain: `d123abc.cloudfront.net`

### 4. Configure `.env`
```bash
AWS_REGION=us-east-1
AWS_ACCESS_KEY_ID=AKIA...
AWS_SECRET_ACCESS_KEY=...
AWS_S3_BUCKET=powergym-uploads-prod
CLOUDFRONT_URL=https://d123abc.cloudfront.net
```

### 5. Start & Test
```bash
npm start
# Open http://localhost:5000/api/health
# Go to Admin → Gallery → Add Image
# Upload any image file
```

Done! ✅

---

## What Changed?

| File | Change |
|------|--------|
| Backend Routes | `/routes/gallery.js` - Now handles file uploads via S3 |
| Database Model | `/models/gallery.model.js` - Stores multiple image URLs |
| Frontend Form | `/pages/admin/ManageGallery.jsx` - File upload UI |
| Utilities | `/utils/s3.js` (NEW) - AWS S3 integration |
| Middleware | `/middleware/multerConfig.js` (NEW) - File handling |

---

## Expected Behavior

### Upload Flow
```
Choose image file
    ↓
(Validated & optimized)
    ↓
Uploaded to S3 (3 sizes: original, medium, thumbnail)
    ↓
Stored in database with CDN URLs
    ↓
Displayed via CloudFront (cached globally)
```

### Image Sizes Generated
- **Original**: 1920x1920 (90% quality WebP)
- **Medium**: 800x800 (85% quality WebP)
- **Thumbnail**: 400x400 (80% quality WebP)

Size reduction: ~35-40% smaller than original JPEGs

---

## AWS Costs

For small to medium usage (1-5GB/month):
- **S3**: ~$0.50-3/month (storage)
- **CloudFront**: ~$5-10/month (delivery)
- **Total**: ~$6-13/month ✅ Very affordable

---

## File Upload API

### Endpoint
```
POST /api/gallery
```

### Request (Multipart Form Data)
```javascript
const formData = new FormData();
formData.append('title', 'Gym Photo');
formData.append('description', 'New equipment');
formData.append('category', 'equipment');
formData.append('image', file); // File object

axios.post('/api/gallery', formData, {
  headers: { 'Content-Type': 'multipart/form-data' }
});
```

### Response
```json
{
  "gallery": {
    "_id": "123abc",
    "title": "Gym Photo",
    "imageUrl": {
      "original": "https://cdn.../gallery/original/123.webp",
      "medium": "https://cdn.../gallery/medium/123.webp",
      "thumbnail": "https://cdn.../gallery/thumbnail/123.webp"
    },
    "category": "equipment",
    "createdAt": "2024-03-30"
  }
}
```

---

## Troubleshooting

### ❌ "Module not found: @aws-sdk/client-s3"
```bash
npm install @aws-sdk/client-s3 @aws-sdk/s3-request-presigner sharp
```

### ❌ AWS Credentials Error
Check`.env` file has correct values:
- `AWS_ACCESS_KEY_ID` (starts with AKIA)
- `AWS_SECRET_ACCESS_KEY` (long string)
- `AWS_REGION` (e.g., us-east-1)

### ❌ Images Not Visible
- Verify CloudFront URL is correct in `.env`
- Check image uploaded to S3 (AWS Console)
- Wait 15 seconds for CloudFront to cache

### ❌ Upload Fails
1. Check file is JPEG/PNG/WebP/GIF
2. Check file size < 10MB
3. Review backend logs for errors
4. Test AWS credentials

### ❌ High AWS Costs
- Enable CloudFront compression (automatic)
- Set lifecycle policies to archive old images
- Delete unused images regularly

---

## Production Deployment

1. ✅ Code ready (setup above)
2. Deploy to your server (no special requirements)
3. Configure AWS in production `.env`
4. Monitor costs via AWS Billing dashboard
5. Set up CloudWatch alarms for unusual usage

---

## Files & Documentation

| Document | Purpose |
|----------|---------|
| `AWS_S3_SETUP.md` | Detailed AWS setup (50+ steps) |
| `PRODUCTION_S3_GUIDE.md` | Production deployment guide |
| `S3_IMPLEMENTATION_SUMMARY.md` | Full technical documentation |
| This file | Quick reference (you are here) |

---

## Key Endpoints

| Method | Endpoint | Purpose |
|--------|----------|---------|
| POST | `/api/gallery` | Upload image to S3 |
| GET | `/api/gallery` | Get all images |
| GET | `/api/gallery?category=equipment` | Filter by category |
| PUT | `/api/gallery/:id` | Update metadata |
| DELETE | `/api/gallery/:id` | Delete image (from S3 & DB) |

---

## Performance Benefits

- ✅ **30-40% smaller file sizes** (WebP optimization)
- ✅ **Global CDN delivery** (CloudFront)
- ✅ **24h caching** reduces bandwidth costs
- ✅ **No server storage** needed
- ✅ **Unlimited scalability** with AWS

---

## Environment Variables Reference

```bash
# AWS Configuration (REQUIRED for production)
AWS_REGION=us-east-1                      # AWS region
AWS_ACCESS_KEY_ID=AKIA...                 # IAM user key
AWS_SECRET_ACCESS_KEY=...                 # IAM user secret
AWS_S3_BUCKET=powergym-uploads-prod       # S3 bucket name
CLOUDFRONT_URL=https://d123.cloudfront.net # CloudFront domain

# Database
MONGODB_URI=...    # MongoDB connection string

# Server
PORT=5000          # Server port
FRONTEND_URL=...   # Frontend URL (for CORS)
```

---

## Next Steps

1. [ ] Create AWS account
2. [ ] Create S3 bucket
3. [ ] Set up CloudFront
4. [ ] Update `.env`
5. [ ] Install packages
6. [ ] Test upload
7. [ ] Deploy to production
8. [ ] Monitor costs

---

## Support

- AWS Documentation: https://docs.aws.amazon.com/s3/
- Sharp Library: https://sharp.pixelplumbing.com/
- Issues? Check backend logs: `npm start`

**Ready to upload production-grade images!** 🚀
