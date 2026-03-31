# AWS S3 Setup Guide for PowerGym

## Overview
This production-grade setup uses AWS S3 + CloudFront for scalable, cost-effective image storage with automatic optimization.

## Features
- **Automatic Image Optimization**: WebP format, multiple sizes (original, medium, thumbnail)
- **CDN Delivery**: CloudFront caching for fast global delivery
- **Cost Optimization**: Pay only for storage + bandwidth
- **High Availability**: S3 durability (99.999999999%)
- **Auto-cleanup**: Old images are automatically removed from S3

## Step 1: AWS Setup

### Create IAM User
1. Go to [AWS IAM Console](https://console.aws.amazon.com/iam/)
2. Create new user: `powergym-s3-user`
3. Attach policy: `AmazonS3FullAccess`
4. Generate access key:
   - Save `AWS_ACCESS_KEY_ID`
   - Save `AWS_SECRET_ACCESS_KEY`

### Create S3 Bucket
1. Go to [S3 Console](https://console.aws.amazon.com/s3/)
2. Create bucket: `powergym-uploads-prod` (make unique)
3. **IMPORTANT: Block public access settings**
   - ✓ Block all public access
4. Enable versioning (optional but recommended)

### Enable CloudFront Distribution
1. Go to CloudFront console (CDN)
2. Create new distribution:
   - Origin: Your S3 bucket
   - Viewer protocol: HTTPS only
   - Cache behaviors: Default 24 hours
   - Compress objects automatically: ✓
3. Get CloudFront domain: `d123abc.cloudfront.net`

## Step 2: Environment Variables

Update `.env` in backend:
```bash
# AWS S3 Configuration
AWS_REGION=us-east-1
AWS_ACCESS_KEY_ID=AKIA...
AWS_SECRET_ACCESS_KEY=wJal...
AWS_S3_BUCKET=powergym-uploads-prod
CLOUDFRONT_URL=https://d123abc.cloudfront.net
```

## Step 3: Install Dependencies

```bash
cd backend
npm install @aws-sdk/client-s3 @aws-sdk/s3-request-presigner sharp
```

**Package Details:**
- `@aws-sdk/client-s3`: AWS SDK for S3 operations
- `@aws-sdk/s3-request-presigner`: Generate signed URLs
- `sharp`: Image processing & optimization

## Step 4: Start Server

```bash
npm start
```

Expected output:
```
✓ AWS S3 configuration validated
✓ MongoDB connected successfully
✓ PowerGym API running on port 5000
```

## Step 5: Upload Images

### Admin Panel:
1. Open Admin Dashboard
2. Go to Manage Gallery
3. Click "Add Image"
4. Fill form and upload image
5. Image automatically:
   - Compressed to WebP
   - Resized to 3 sizes (original/medium/thumb)
   - Uploaded to S3
   - Served via CloudFront

## Cost Optimization

### Estimated Monthly Costs (100 images/month):
- **S3 Storage**: ~$0.50-$1 (1.5GB at $0.023/GB)
- **CloudFront**: ~$5-10 (depending on traffic)
- **Data transfer**: Included in CloudFront
- **Total**: ~$6-12/month

### How to Reduce Costs:
1. **Cache Strategy**: CloudFront caches for 24 hours
2. **Compression**: WebP reduces size by 30-40%
3. **Tiered deletion**: Archive old images quarterly
4. **Reserved capacity**: Buy compute for sustained traffic

## Production Checklist

- [ ] AWS account created
- [ ] IAM user with S3 access
- [ ] S3 bucket created (blocks public access)
- [ ] CloudFront distribution created
- [ ] Environment variables configured
- [ ] Dependencies installed
- [ ] Server tested locally
- [ ] Upload tested via admin panel
- [ ] Images visible on CDN
- [ ] CloudFront caching verified
- [ ] Backup S3 bucket enabled
- [ ] Monitor AWS costs in Billing dashboard

## Monitoring & Maintenance

### CloudWatch Dashboard:
```bash
# Monitor in AWS Console
- S3 Bucket size
- CloudFront requests
- Data transfer costs
- Error rates
```

### Clean Up Old Images:
```bash
# AWS CLI command (from terminal)
aws s3 ls s3://powergym-uploads-prod/gallery/original/
```

## Troubleshooting

### Images not uploading:
- Check AWS credentials in `.env`
- Verify S3 bucket exists
- Check IAM user has S3 permissions
- Review backend logs

### Images slow to load:
- Verify CloudFront distribution is active
- Check CloudFront caching rules
- Monitor CloudFront logs

### High AWS costs:
- Check data transfer logs
- Verify CloudFront compression enabled
- Consider S3 lifecycle policies for old objects

## Architecture Diagram

```
Admin Upload
     ↓
[Backend Express.js]
     ↓
(Image Optimization - Sharp)
     ↓
[AWS S3] ←→ [CloudFront CDN]
     ↓
Database stores URLs
     ↓
Frontend displays via CDN
```

## Security Best Practices

1. **IAM User Isolation**
   - Never use root AWS account
   - Rotate access keys annually

2. **S3 Bucket Security**
   - Block all public access
   - Enable versioning
   - Enable MFA delete

3. **CloudFront Security**
   - HTTPS only viewer protocol
   - Restrict to your domain
   - Add WAF rules

4. **Monitoring**
   - Enable S3 access logs
   - Set up CloudWatch alarms
   - Review monthly billing

## Support & Resources

- [AWS S3 Documentation](https://docs.aws.amazon.com/s3/)
- [CloudFront Documentation](https://docs.aws.amazon.com/cloudfront/)
- [Sharp Documentation](https://sharp.pixelplumbing.com/)
- [AWS Pricing Calculator](https://calculator.aws/)
