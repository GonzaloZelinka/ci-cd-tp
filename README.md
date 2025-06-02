# 🚀 TypeScript CI/CD Demo Project

Complete CI/CD implementation with TypeScript, GitHub Actions, and automated testing.

## ✅ Prerequisites

- Node.js 18+
- Git configured with your personal account
- GitHub account
- Access to this repository

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

**Expected output:**

```
Hello World from TypeScript CI/CD Demo!
Version: 1.0.0
🚀 CI/CD Pipeline Demo - Running successfully!
```

### 2. Create Your Own Repository

1. Fork this repository OR create a new GitHub repository
2. Push your code to your repository
3. Go to **Actions** tab to see the CI/CD pipeline running
4. After success, visit: `https://<your-username>.github.io/<your-repo>/`

## 🧪 Demo the Pipeline

### Trigger a Failure

```bash
# Edit test to fail
sed -i.bak 's/Hello World from TypeScript CI\/CD Demo!/This will fail!/' __tests__/index.test.ts
git add . && git commit -m "test: intentional failure" && git push
```

**Result**: ❌ Pipeline fails, Slack notification sent

### Fix the Failure

```bash
# Restore correct test
mv __tests__/index.test.ts.bak __tests__/index.test.ts
git add . && git commit -m "fix: restore test" && git push
```

**Result**: ✅ Pipeline passes, deploys to GitHub Pages

## 🏗️ What's Included

- ✅ **TypeScript** application with "Hello World"
- ✅ **Jest** automated tests
- ✅ **GitHub Actions** CI/CD pipeline
- ✅ **GitHub Pages** deployment
- ✅ **Slack** notifications

## 📁 Project Structure

```
├── src/index.ts              # Main application
├── __tests__/index.test.ts   # Tests
├── .github/workflows/        # CI/CD pipeline
├── public/index.html         # Deployment page
└── scripts/setup.sh          # Automated setup script
```

## 🔄 CI/CD Pipeline

**Triggers**: Push to `main` branch or Pull Request to `main`
**Steps**: Install → Test → Build → Deploy → Notify

## 📧 Setup Slack Notifications

1. **Get webhook URL**: Slack → Apps → Incoming WebHooks → Add to Slack
2. **Add to GitHub**: Your repo → Settings → Secrets → New secret: `SLACK_WEBHOOK_URL`
3. **Test**: Push any change and check Slack for notifications

You can follow this [youtube video](https://www.youtube.com/watch?v=dQw4w9WgXcQ) to setup slack notifications.

## 🚀 Enable GitHub Pages

**Important**: You need to enable GitHub Pages for deployment to work:

1. Go to your repository on GitHub
2. Click **Settings** → **Pages**
3. Under **Source**, select **GitHub Actions**
4. Save the settings

After this setup, pushes to `main` branch will automatically deploy to: `https://<your-username>.github.io/<your-repo>/`

## 📊 Commands

| Command         | Description                    |
| --------------- | ------------------------------ |
| `npm run setup` | **Run automated setup script** |
| `npm test`      | Run tests                      |
| `npm run build` | Build project                  |
| `npm start`     | Run application                |
| `npm run dev`   | Development mode               |
