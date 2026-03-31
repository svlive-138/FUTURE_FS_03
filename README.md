# PowerGym - Professional Fitness Center Website

A complete full-stack web application for a local gym business, built with React, Node.js, Express, and MongoDB.

## 🎯 Project Overview

PowerGym is a professional fitness center website designed to:
- **Attract new customers** with an engaging, modern interface
- **Build trust** through testimonials, trainer profiles, and transparent pricing
- **Convert visitors to members** with easy signup and free trial offers
- **Manage operations** with a comprehensive admin dashboard
- **Increase online presence** with SEO optimizations and fast load times

## 📋 Features

### Frontend Features
- ✅ **Responsive Design** - Mobile, tablet, and desktop optimized
- ✅ **Modern UI** - Dark theme with energetic orange/blue accent colors
- ✅ **Fast Performance** - Built with React and Vite for optimized bundling
- ✅ **SEO Ready** - Meta tags, structured content, and fast loading pages

### Pages & Sections
1. **Home** - Hero banner, benefits showcase, newsletter signup
2. **About** - Gym story, mission/vision, team profiles, achievements
3. **Membership Plans** - Pricing cards, comparison table, signup form
4. **Classes** - Class descriptions, weekly schedule, booking
5. **Trainers** - Trainer profiles, certifications, achievements
6. **Gallery** - Facility photos, equipment showcase
7. **Testimonials** - Member reviews, transformations, ratings
8. **Contact** - Contact form, location, WhatsApp integration, FAQs

### Backend Features
- ✅ **RESTful APIs** - Well-structured Express.js APIs
- ✅ **Database** - MongoDB for scalable data storage
- ✅ **Form Handling** - Membership, contact, testimonial submissions
- ✅ **Admin Dashboard** - Manage inquiries, testimonials, content
- ✅ **Authentication** - JWT-based admin authentication
- ✅ **Validation** - Input validation for all forms

### Admin Dashboard
- 📊 Dashboard with key statistics
- 👥 Manage membership inquiries
- 💬 Respond to contact messages
- ⭐ Approve and feature testimonials and reviews
- 🖼️ Manage gallery images
- 📈 View analytics and reports

## 🛠️ Tech Stack

### Frontend
- **React 19** - UI library
- **React Router DOM** - Client-side routing
- **Tailwind CSS 4** - Utility-first CSS
- **Lucide React** - Icon library
- **Axios** - HTTP client
- **Vite** - Build tool

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MongoDB** - NoSQL database
- **Mongoose** - MongoDB ODM
- **JWT** - Authentication
- **Bcryptjs** - Password hashing
- **Express Validator** - Input validation

## 📂 Project Structure

```
FUTURE_FS_03/
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Navbar.jsx
│   │   │   └── Footer.jsx
│   │   ├── pages/
│   │   │   ├── Home.jsx
│   │   │   ├── About.jsx
│   │   │   ├── Membership.jsx
│   │   │   ├── Classes.jsx
│   │   │   ├── Trainers.jsx
│   │   │   ├── Gallery.jsx
│   │   │   ├── Testimonials.jsx
│   │   │   ├── Contact.jsx
│   │   │   └── admin/
│   │   │       ├── AdminLogin.jsx
│   │   │       ├── AdminDashboard.jsx
│   │   │       ├── ManageMemberships.jsx
│   │   │       ├── ManageContacts.jsx
│   │   │       └── ManageTestimonials.jsx
│   │   ├── services/
│   │   │   └── api.js
│   │   ├── App.jsx
│   │   ├── App.css
│   │   ├── index.css
│   │   └── main.jsx
│   ├── package.json
│   ├── vite.config.js
│   └── index.html
│
└── backend/
    ├── models/
    │   ├── membership.model.js
    │   ├── contact.model.js
    │   ├── testimonial.model.js
    │   ├── gallery.model.js
    │   ├── class.model.js
    │   ├── trainer.model.js
    │   └── admin.model.js
    ├── routes/
    │   ├── membership.js
    │   ├── contact.js
    │   ├── testimonial.js
    │   ├── gallery.js
    │   ├── classes.js
    │   ├── trainer.js
    │   └── admin.js
    ├── server.js
    ├── .env
    ├── .gitignore
    └── package.json
```

## 🚀 Installation & Setup

### Prerequisites
- Node.js (v16 or higher)
- MongoDB (local or MongoDB Atlas)
- npm or yarn

### Frontend Setup

1. Navigate to frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Create `.env.local` file:
```env
VITE_API_URL=http://localhost:5000/api
```

4. Start development server:
```bash
npm run dev
```

Frontend will run on: `http://localhost:5173`

### Backend Setup

1. Navigate to backend directory:
```bash
cd backend
```

2. Install dependencies:
```bash
npm install
```

3. Configure MongoDB:
   - If using local MongoDB, ensure it's running
   - If using MongoDB Atlas, replace connection string in `.env`

4. Start backend server:
```bash
npm run dev
```

Backend will run on: `http://localhost:5000`

## 🔑 Admin Login

### Demo Credentials
- **Email**: admin@powergym.com
- **Password**: secure_password_change_this

### Access Admin Dashboard
Navigate to: `http://localhost:5173/admin/login`

## 📧 Email Configuration

To enable email notifications (optional):

1. Open `backend/.env`
2. Configure email service:
```env
EMAIL_SERVICE=gmail
EMAIL_USER=your-email@gmail.com
EMAIL_PASSWORD=your-app-specific-password
```

3. Use Gmail App Password:
   - Enable 2FA on your Google Account
   - Generate App Password for Gmail
   - Use the generated password

## 🌐 Deployment

### Frontend Deployment (Vercel/Netlify)

**Option 1: Vercel**
```bash
npm install -g vercel
cd frontend
vercel
```

**Option 2: Netlify**
1. Push code to GitHub
2. Connect repository to Netlify
3. Build command: `npm run build`
4. Publish directory: `dist`

### Backend Deployment (Render/Heroku)

**Option 1: Render.com**
1. Create new Web Service on Render
2. Connect GitHub repository
3. Set environment variables
4. Deploy

**Option 2: Heroku**
```bash
heroku create powergym-api
git push heroku main
```

### Environment Variables for Production

Update `.env` in backend with:
```env
PORT=5000
NODE_ENV=production
MONGODB_URI=your_mongodb_atlas_uri
JWT_SECRET=your_strong_secret_key
FRONTEND_URL=https://your-domain.com
```

## 📱 Converting to PWA (Optional)

To make the website installable as an app:

1. Add manifest.json to public folder
2. Configure service worker
3. Update index.html with PWA meta tags

## 🔐 Security Checklist

- ✅ Change default admin credentials
- ✅ Set strong JWT_SECRET
- ✅ Enable HTTPS in production
- ✅ Configure CORS properly
- ✅ Use environment variables for sensitive data
- ✅ Implement rate limiting
- ✅ Add security headers

## 📊 Performance Optimization

- Image optimization with lazy loading
- Code splitting with React Router
- Minification with Vite
- Database indexing
- Caching strategies

## 📈 SEO Optimization

- Meta tags for all pages
- Open Graph tags for social sharing
- Semantic HTML structure
- Mobile-first responsive design
- Fast page load times
- XML sitemap (add manually)
- robots.txt (add to public folder)

## 🎨 Customization

### Change Gym Details
Update these files:
- Frontend: Navbar.jsx, Footer.jsx, Contact.jsx
- Backend: environment variables

### Change Colors
Edit `src/index.css` for Tailwind configuration and custom variables

### Add Features
- Classes scheduling system
- Member attendance tracking
- Payment integration (Stripe/Razorpay)
- SMS notifications
- Mobile app

## 🐛 Troubleshooting

### Backend connection issues
- Ensure MongoDB is running
- Check connection string in .env
- Verify network accessibility

### CORS errors
- Check FRONTEND_URL in backend .env
- Ensure correct API URL in frontend .env.local

### Admin login not working
- Verify JWT_SECRET is set
- Check admin credentials in database
- Clear browser localStorage and try again

## 📞 Support & Contact

For issues or questions:
1. Check documentation
2. Review console errors
3. Verify environment configuration
4. Check API responses in Network tab

## 📄 License

This project is built for PowerGym and can be customized for any local gym business.

## 🚀 Next Steps for Production

1. **SSL Certificate** - Get HTTPS certificate
2. **Domain Setup** - Configure custom domain
3. **CDN** - Set up CDN for static assets
4. **Backup** - Implement MongoDB backup strategy
5. **Monitoring** - Set up error tracking (Sentry)
6. **Analytics** - Add Google Analytics
7. **Payment Integration** - Add Stripe/Razorpay for online payments
8. **SMS Notifications** - Integrate Twilio for SMS alerts
9. **Email Campaigns** - Set up Mailchimp for newsletters
10. **Mobile App** - Consider React Native or Flutter app

## 💡 Future Features

- [ ] Online payment integration
- [ ] Member attendance tracking
- [ ] Workout tracking app
- [ ] Personal training booking system
- [ ] Meal planning feature
- [ ] Mobile app (iOS/Android)
- [ ] Video tutorials library
- [ ] Transformation challenges
- [ ] Referral rewards program
- [ ] Live class streaming

---

**Built with ❤️ for PowerGym | Making fitness accessible to everyone**