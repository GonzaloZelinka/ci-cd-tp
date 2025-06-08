# 🚀 Dynamic Personal Dashboard

A live, interactive dashboard with real-time updates deployed via CI/CD to GitHub Pages.

## ✨ Dynamic Features

- 🕒 **Live Clock** - Updates every second with current time
- 💭 **Daily Quote** - Changes daily with inspirational quotes
- 👥 **Visitor Counter** - Tracks visits using localStorage
- 📊 **Real GitHub API** - Live repository stats from GitHub API
- 👤 **GitHub Profile** - User statistics and repository data
- ⚡ **System Status** - Live pipeline and deployment info
- 🎲 **Random Facts** - Interactive tech facts with refresh button

## 🚀 Real GitHub API Integration

The dashboard fetches **live data** from GitHub's public API:

- ⭐ **Repository stars, forks, watchers**
- 🐛 **Open issues count**
- 📅 **Last update timestamp**
- 👤 **User profile statistics**
- 📁 **Public repository count**

**Shows:** `GonzaloZelinka/ci-cd-tp` repository
**Features:** Real-time data, automatic updates, error handling

## 📁 Clean File Structure

```
├── public/
│   ├── index.html           # Main HTML structure
│   ├── styles.css          # All CSS styling
│   └── dashboard.js        # JavaScript functionality
├── src/index.ts            # TypeScript backend logic
├── __tests__/index.test.ts # Automated tests
└── dist/                   # Built files for deployment
```

**Benefits:**

- ✅ **Separated concerns** - HTML, CSS, JS in separate files
- ✅ **Easy maintenance** - Find and edit specific functionality
- ✅ **GitHub Pages ready** - All static files properly served
- ✅ **Simple deployment** - No containers, just static files

## ✅ Prerequisites

- Node.js 18+
- Git configured with your personal account
- GitHub account

## 🎯 Quick Start

### 1. Clone and Setup

```bash
git clone <repository-url>
cd <repository-name>
npm run setup
```

**The setup script will automatically:**

- ✅ Check Node.js version
- ✅ Install dependencies
- ✅ Run tests
- ✅ Build the project
- ✅ Prepare deployment files

### 2. Run Locally

```bash
npm run dev         # Development mode
npm run build       # Build for production
npm test           # Run tests
```

### 3. Deploy to GitHub Pages

1. Fork this repository OR create a new GitHub repository
2. Push your code to your repository
3. Go to **Actions** tab to see the CI/CD pipeline running
4. After success, visit: `https://<your-username>.github.io/<your-repo>/`

## 🏗️ What's Included

- ✅ **TypeScript** application with dynamic features
- ✅ **Jest** automated testing
- ✅ **GitHub Actions** CI/CD pipeline
- ✅ **GitHub Pages** deployment
- ✅ **Real GitHub API** integration
- ✅ **Real-time updates** with JavaScript
- ✅ **Responsive design** with CSS Grid
- ✅ **Slack** notifications

## 🔄 CI/CD Pipeline

**Triggers**: Push to `main` branch or Pull Request to `main`
**Steps**: Install → Test → Build → Deploy → Notify

The dashboard automatically updates with:

- ⏰ Current deployment timestamp
- 📈 Live system status
- 🔄 Real-time clock updates

## 📊 Commands

| Command         | Description                    |
| --------------- | ------------------------------ |
| `npm run setup` | **Run automated setup script** |
| `npm test`      | Run tests                      |
| `npm run build` | Build project                  |
| `npm start`     | Run application                |
| `npm run dev`   | Development mode               |
