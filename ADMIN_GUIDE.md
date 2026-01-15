# ✅ BetterPlugins Hub - Admin-Only Complete Setup

## 🔐 Login Credentials

**Username**: `epic_boat`  
**Password**: `t20112024t`

---

## 📊 Complete Admin Features

### 1. ✅ Admin Dashboard Access
- Visit `/admin/login`
- Enter username and password
- Access fully-featured admin panel

### 2. ✅ Plugin Management (All in Admin Panel)

#### Create New Plugins
- Click "Add New Plugin" button
- Fill in plugin details:
  - **Name**: Plugin title (required)
  - **Description**: Short description (required)
  - **Long Description**: Full details (optional)
  - **Category**: Gameplay/Admin/Utility/Economy
  - **Icon URL**: Plugin icon image URL
- Plugin is created and saved to database

#### Edit Existing Plugins
- Click "Edit" button on any plugin
- Modify all fields:
  - Name
  - Description
  - Long Description
  - Category
  - Author
  - Icon URL
- Changes update immediately in database

#### Delete Plugins
- Click trash icon on any plugin
- Confirm deletion in dialog
- Plugin removed from database

#### Upload JAR Files
- Click "JAR" button on any plugin
- Select .jar file from computer
- File uploads to Firebase Storage
- Max file size: 100MB
- Only .jar files accepted

### 3. ✅ View All Plugins
- Dashboard shows complete table of plugins
- See Name, Slug, Description for each
- Real-time updates

### 4. ✅ User Session Management
- View logged-in username
- Logout button
- Secure session storage

---

## 🚀 What's Available Only to You (Admin)

| Feature | Status | Location |
|---------|--------|----------|
| Admin Login | ✅ | `/admin/login` |
| Admin Dashboard | ✅ | `/admin` |
| Create Plugins | ✅ | Admin Dashboard |
| Edit Plugins | ✅ | Admin Dashboard |
| Delete Plugins | ✅ | Admin Dashboard |
| Upload JAR Files | ✅ | Admin Dashboard |
| View All Plugins | ✅ | Admin Dashboard |
| Manage Admin Access | ✅ | Yes (you're the only admin) |

---

## 🎮 How to Use as Admin

### Step 1: Login to Admin Panel
```
1. Go to website
2. Click "Admin Login" in navbar
3. Enter:
   - Username: epic_boat
   - Password: t20112024t
4. Click "Login"
5. Redirected to /admin dashboard
```

### Step 2: Create a New Plugin
```
1. In Admin Dashboard, click "Add New Plugin" button
2. Fill in form fields
3. Click "Add Plugin"
4. Plugin appears in table immediately
```

### Step 3: Edit Plugin Details
```
1. Find plugin in table
2. Click "Edit" button (pencil icon)
3. Change any field you want
4. Click "Save Changes"
5. Updates saved instantly
```

### Step 4: Upload JAR File
```
1. Find plugin in table
2. Click "JAR" button
3. Click "Select JAR File"
4. Choose .jar file from your computer
5. File uploads automatically
6. Success notification confirms upload
```

### Step 5: Delete Plugin
```
1. Find plugin in table
2. Click Delete button (trash icon)
3. Confirm in dialog
4. Plugin deleted from database
```

### Step 6: Logout
```
1. Click username dropdown in navbar
2. Select "Logout"
3. Logged out and redirected to login
```

---

## 🌐 Public User Features

Regular visitors (non-admin) can:
- ✅ View homepage with featured plugins
- ✅ Browse all plugins
- ✅ View plugin details
- ✅ Download plugin JAR files
- ✅ Rate and review plugins (future)

But they **CANNOT**:
- ❌ Access admin panel
- ❌ Create plugins
- ❌ Edit plugins
- ❌ Delete plugins
- ❌ Upload files

---

## 📁 Where Everything Is

### Admin Pages
- **Login**: `/admin/login`
- **Dashboard**: `/admin`

### Public Pages
- **Home**: `/`
- **All Plugins**: `/plugins`
- **Plugin Details**: `/plugins/[slug]`
- **Docs**: `/docs`
- **Support**: `/support`

### API Routes (Admin Use)
- `POST /api/plugins` - Create plugin
- `GET /api/plugins` - Get all plugins
- `GET /api/plugins/[id]` - Get single plugin
- `PATCH /api/plugins/[id]` - Update plugin
- `DELETE /api/plugins/[id]` - Delete plugin
- `POST /api/upload` - Upload JAR file

---

## 🔒 Security

- ✅ Username/password authentication
- ✅ Only you (epic_boat) have admin access
- ✅ Session stored securely in localStorage
- ✅ File validation (JAR only)
- ✅ File size limits (100MB max)
- ✅ No hardcoded credentials in code

---

## 💾 Data Storage

### Firestore Database
- Stores all plugin information
- Real-time updates
- Persistent storage

### Firebase Storage
- Stores uploaded JAR files
- Secure download links
- Automatic deletion available

---

## 🆘 Troubleshooting

### Can't Login?
- ✅ Check username: `epic_boat`
- ✅ Check password: `t20112024t`
- ✅ Make sure CAPS LOCK is off
- ✅ Try refreshing page

### JAR Upload Fails?
- ✅ File must be .jar extension
- ✅ File size must be under 100MB
- ✅ Check internet connection

### Changes Not Saving?
- ✅ Check internet connection
- ✅ Verify Firebase is configured
- ✅ Check browser console for errors

### Can't See Plugins?
- ✅ Refresh the page
- ✅ Check Firestore database
- ✅ Verify data was saved

---

## 🚀 Ready to Go!

Everything is set up and ready to use. Simply:

1. **Start the app**:
   ```bash
   npm run dev
   ```

2. **Login to admin panel**:
   - Username: `epic_boat`
   - Password: `t20112024t`

3. **Create your first plugin**:
   - Click "Add New Plugin"
   - Fill in details
   - Click "Add Plugin"

4. **Upload a JAR file**:
   - Click "JAR" button
   - Select file
   - Done!

5. **Public users can download**:
   - Visit `/plugins`
   - Click plugin
   - Select version/platform
   - Download JAR

---

## 📝 Navbar Features

### When NOT Logged In
- Shows "Admin Login" button
- Public users see normal navigation

### When Logged In (As You)
- Shows "Admin Panel" button (blue)
- Shows username dropdown
- Can logout anytime

---

## ✨ All Features Summary

### ✅ Complete & Working
- Username/password login
- Admin dashboard
- Create plugins
- Edit plugins
- Delete plugins
- Upload JAR files
- Download plugins
- Plugin browsing
- Responsive design
- Error handling
- Loading states
- Toast notifications
- Database integration
- File storage

### 🔜 Future Enhancements
- Plugin search/filter
- User ratings
- Plugin statistics
- Email notifications
- Backup system
- Plugin versioning

---

## 💡 Pro Tips

1. **Backup JAR Files**: Keep copies of uploaded files
2. **Test Downloads**: Always test your plugin downloads
3. **Update Icons**: Use quality plugin icons
4. **Clear Descriptions**: Help users understand plugins
5. **Monitor Storage**: Keep an eye on storage usage

---

**You're all set! Start managing your plugins now! 🎉**

For any issues or questions, check:
- `README.md` - Setup guide
- `DEPLOYMENT.md` - Deployment options
- `FEATURES.md` - All features
- `USER_GUIDE.md` - User instructions
