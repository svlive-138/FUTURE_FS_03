# Production Deployment Guide - AWS S3 + CloudFront

## Quick Start for Production

### 1. Install Backend Dependencies
```bash
cd backend
npm install @aws-sdk/client-s3 @aws-sdk/s3-request-presigner sharp
```

### 2. Configure AWS Credentials
Create file: `/backend/.env`
```bash
# AWS S3 Configuration
AWS_REGION=us-east-1
AWS_ACCESS_KEY_ID=AKIA...
AWS_SECRET_ACCESS_KEY=wJal...
AWS_S3_BUCKET=powergym-uploads-prod
CLOUDFRONT_URL=https://d123abc.cloudfront.net

# Other vars
DATABASE_URL=...
JWT_SECRET=...
```

### 3. Start Backend
```bash
cd backend
npm start
```

### 4. Upload Test Image
- Open Admin Dashboard
- Go to Manage Gallery → Add Image
- Select image file
- Submit → Image uploads to S3 automatically

## Image Upload Flow

```
Frontend        Backend         Sharp           AWS S3
   ↓               ↓              ↓               ↓
[Image]  →   [Multer]  →  [Optimize]  →  [Original]
   ↓               ↓              ↓        [Medium]
                              [Resize]    [Thumbnail]
                                          [CloudFront CDN]
```

## Database Schema Changes

Gallery model now stores:
```javascript
{
  imageUrl: {
    original: "https://cdn.../gallery/original/...",
    medium: "https://cdn.../gallery/medium/...",
    thumbnail: "https://cdn.../gallery/thumbnail/..."
  },
  s3Keys: {
    original: "gallery/original/...",
    medium: "gallery/medium/...",
    thumbnail: "gallery/thumbnail/..."
  }
}
```

## Performance Optimizations Included

1. **Image Compression**
   - WebP format (-40% size vs JPEG)
   - Quality optimization per size

2. **Responsive Images**
   - Original: 1920x1920 (90% quality)
   - Medium: 800x800 (85% quality)
   - Thumbnail: 400x400 (80% quality)

3. **CDN Caching**
   - CloudFront: 24 hour cache
   - Cache-Control headers: 1 year

4. **Bandwidth Optimization**
   - Automatic compression
   - Regional caching

## Rollback Instructions

If you need to revert to URL-based uploads:
1. Restore previous gallery route from git
2. Revert gallery model to simple imageUrl string
3. Restart server

## Production Monitoring

### CloudWatch Metrics to Monitor:
- S3 bucket size
- CloudFront request count
- CloudFront data out
- Error rates (4xx, 5xx)

### Set Alerts For:
- Bucket size > 50GB
- Data transfer > $100/month
- Error rate > 1%

## Cost Estimation

| Component | Monthly Cost | Notes |
|-----------|------------|-------|
| S3 Storage | $0.50-2 | 1.5-10GB |
| CloudFront | $5-20 | 10-50GB transfer |
| Bandwidth | Included | In CloudFront pricing |
| **Total** | **$6-22** | Varies with usage |

## Troubleshooting

### Upload fails with "Cannot find module 'razorpay'"
```bash
npm install razorpay
```

### Images not appearing on CDN
1. Check AWS credentials are correct
2. Verify S3 bucket exists
3. Verify CloudFront domain is correct
4. Check browser developer tools for actual image URL

### High AWS costs?
- Set S3 lifecycle policy to archive old objects
- Configure CloudFront to compress all files
- Limit image sizes further if needed

## Next Steps

1. ✅ Backend S3 integration complete
2. ✅ Frontend upload UI updated
3. ⏭️ Deploy to production server
4. ⏭️ Set up AWS monitoring
5. ⏭️ Configure CloudFront SSL certificate

For detailed AWS setup, see [AWS_S3_SETUP.md](./AWS_S3_SETUP.md)
