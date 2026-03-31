# PowerGym - Quick Start Guide

Get the PowerGym website up and running in 5 minutes!

## ⚡ Quick Setup

### 1️⃣ Prerequisites Check
```bash
node --version        # Should be v16 or higher
npm --version         # Should be v7 or higher
mongo --version       # If using local MongoDB
```

### 2️⃣ Clone & Navigate
```bash
cd FUTURE_FS_03
```

### 3️⃣ Setup Frontend (Terminal 1)
```bash
cd frontend
npm install
cp .env.example .env.local
npm run dev
```
✅ Frontend running at: http://localhost:5173

### 4️⃣ Setup Backend (Terminal 2)
```bash
cd backend
npm install
cp .env.example .env
npm run seed          # Seed initial data (optional)
npm run dev
```
✅ Backend running at: http://localhost:5000

### 5️⃣ Access Admin Dashboard
- **URL**: http://localhost:5173/admin/login
- **Email**: admin@powergym.com
- **Password**: secure_password_change_this

## 📱 Test the Website

1. **Home Page**: http://localhost:5173
2. **Sign Up**: http://localhost:5173/membership
3. **Submit Contact Form**: http://localhost:5173/contact
4. **Admin Dashboard**: http://localhost:5173/admin/login

## 🔧 Common Commands

### Frontend
```bash
npm run dev        # Start development server
npm run build      # Build for production
npm run preview    # Preview production build
npm run lint       # Run ESLint
```

### Backend
```bash
npm run dev        # Start with auto-reload
npm start          # Start normally
npm run seed       # Seed database with sample data
```

## 📁 File Structure Quick Reference

```
Frontend:
src/pages/          ← Page components
src/components/     ← Reusable components
src/services/api.js ← API calls
src/App.jsx        ← Main routing

Backend:
routes/            ← API endpoints
models/            ← Database schemas
server.js          ← Main server file
.env               ← Environment variables
```

## 🚀 First Development Task

### Add a New Service (e.g., Nutrition Consultation)

**1. Create Frontend Page**:
Create `src/pages/Nutrition.jsx`

**2. Add to Navbar**:
Edit `src/components/Navbar.jsx` - add link

**3. Add to App Routes**:
Edit `src/App.jsx` - add Route

**4. Create Backend Model**:
Create `models/nutrition.model.js`

**5. Create API Route**:
Create `routes/nutrition.js`

**6. Update Server**:
Edit `server.js` - import and use route

## 🔑 Important Credentials

### Admin Login
```
Email: admin@powergym.com
Password: secure_password_change_this
```

### MongoDB (Local)
```
URI: mongodb://localhost:27017/powergym
```

## 🆘 Quick Fixes

**Problem**: Port already in use
```bash
# Kill process on port 5000 or 5173
Windows:  netstat -ano | findstr :5000
Mac/Linux: lsof -ti:5000 | xargs kill -9
```

**Problem**: Dependencies error
```bash
rm -rf node_modules package-lock.json
npm install
```

**Problem**: MongoDB connection fails
```bash
# Make sure MongoDB is running
mongod              # Mac/Linux
mongo              # Windows (in another terminal)
```

**Problem**: CORS error
- Check `FRONTEND_URL` in backend `.env`
- Check `VITE_API_URL` in frontend `.env.local`

## 📚 Documentation Files

- **README.md** - Full project documentation
- **DEPLOYMENT.md** - Production deployment guide
- **This File** - Quick start guide

## 🎯 Next Steps

1. ✅ Get app running (you just did!)
2. 📚 Read README.md for features
3. 🔧 Make your first changes
4. 📤 Test frontend & backend together
5. 🚀 Deploy to production

## 💡 Pro Tips

- Use API inspector in browser DevTools to debug
- Check browser Console for frontend errors
- Use Postman or Insomnia to test API endpoints
- Enable auto-save in your code editor
- Use `git` to track your changes

## 🎓 Learning Resources

### Frontend
- React Docs: https://react.dev
- Tailwind CSS: https://tailwindcss.com
- React Router: https://reactrouter.com

### Backend
- Express.js: https://expressjs.com
- MongoDB: https://docs.mongodb.com
- JWT Auth: https://jwt.io

### Tools
- Postman: https://www.postman.com
- MongoDB Compass: https://www.mongodb.com/products/compass

## 🔐 Security Checklist

Before going to production:

- [ ] Change admin password
- [ ] Update JWT_SECRET to random 32+ char string
- [ ] Update all email credentials
- [ ] Remove console.logs for sensitive data
- [ ] Enable HTTPS
- [ ] Configure proper CORS settings
- [ ] Set NODE_ENV=production on backend
- [ ] Use environment variables for all secrets

## 📞 Need Help?

**Frontend Issues**:
- Check browser console
- Check Network tab
- Clear cache and reload

**Backend Issues**:
- Check terminal logs
- Test endpoint with Postman
- Check MongoDB connection

**Database Issues**:
- Use MongoDB Compass to inspect
- Check connection string
- Verify IP whitelist (if using Atlas)

## 🎉 Great! You're Ready!

Start building features, test thoroughly, and deploy with confidence!

---

**Built with ❤️ for PowerGym | Questions? Read README.md or DEPLOYMENT.md**