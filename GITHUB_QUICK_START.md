## 🎯 Quick Commands - Copy & Paste

After creating repository on GitHub, run these commands:

### Replace YOUR_USERNAME with your actual GitHub username

```bash
# Add remote repository
git remote add origin https://github.com/YOUR_USERNAME/civiklink.git

# Push code to GitHub
git branch -M main
git push -u origin main
```

### Example:
If your username is `johnsmith`, use:
```bash
git remote add origin https://github.com/johnsmith/civiklink.git
git branch -M main
git push -u origin main
```

---

## ✅ After Pushing Code

### Add Collaborators:
1. Go to: `https://github.com/YOUR_USERNAME/civiklink/settings/access`
2. Click **"Add people"**
3. Search and add:
   - **2001zaz**
   - **NuzrathR**

---

## 📋 Repository Settings (Recommended)

### Description:
```
Civic accountability platform for Sri Lanka - Report and track utility issues
```

### Topics/Tags:
```
civic-tech, flask, react, mongodb, accountability, sri-lanka
```

### About Section:
```
🇱🇰 CivikLink SL - Civic Accountability Platform

Citizens can report utility issues (water, electricity, roads, floods) 
and tag government officials for public accountability.

Tech Stack: Flask + MongoDB + React.js + Redux + Material-UI
```

---

## 🔗 Useful Links After Setup

- **Repository**: `https://github.com/YOUR_USERNAME/civiklink`
- **Issues**: `https://github.com/YOUR_USERNAME/civiklink/issues`
- **Projects**: `https://github.com/YOUR_USERNAME/civiklink/projects`
- **Wiki**: `https://github.com/YOUR_USERNAME/civiklink/wiki`
- **Collaborators**: `https://github.com/YOUR_USERNAME/civiklink/settings/access`

---

## 🐛 Troubleshooting

### Error: "remote origin already exists"
```bash
git remote remove origin
git remote add origin https://github.com/YOUR_USERNAME/civiklink.git
```

### Error: "authentication failed"
Use Personal Access Token instead of password:
1. Go to: https://github.com/settings/tokens
2. Generate new token (classic)
3. Select scopes: `repo`
4. Use token as password when prompted

### Or use GitHub CLI:
```bash
gh auth login
gh repo create civiklink --public --source=. --remote=origin --push
```
