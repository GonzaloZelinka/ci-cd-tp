# 🚀 TypeScript CI/CD Demo Project

Complete CI/CD implementation with TypeScript, GitHub Actions, and automated testing.

## ✅ Prerequisites

- Node.js 18+
- Git configured with your personal account
- GitHub account
- Access to this repository

## 🎯 Quick Start

### 1. Clone and Test

```bash
git clone <repository-url>
cd <repository-name>
npm install
npm test
npm run build
npm start
```

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

**Result**: ❌ Pipeline fails, notifications sent

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
- ✅ **Slack/Email** notifications
- ✅ **Docker** support (optional)

## 📁 Project Structure

```
├── src/index.ts              # Main application
├── __tests__/index.test.ts   # Tests
├── .github/workflows/        # CI/CD pipeline
├── public/index.html         # Deployment page
└── docs/                     # Documentation
```

## 🔄 CI/CD Pipeline

**Triggers**: Push to `main` or `develop` branches
**Steps**: Install → Test → Build → Deploy → Notify

## 📧 Setup Notifications

**Slack**: Add `SLACK_WEBHOOK_URL` secret to your GitHub repo
**Email**: Add `EMAIL_USERNAME`, `EMAIL_PASSWORD`, `EMAIL_TO`, `EMAIL_FROM` secrets

📝 **Detailed guide**: `docs/NOTIFICATION_SETUP.md`

## 📊 Commands

| Command         | Description      |
| --------------- | ---------------- |
| `npm test`      | Run tests        |
| `npm run build` | Build project    |
| `npm start`     | Run application  |
| `npm run dev`   | Development mode |

## 🆘 Troubleshooting

- **Tests fail**: `npm install && npm test`
- **Build fails**: `npm run clean && npm run build`
- **No notifications**: Check GitHub secrets are configured
- **Deployment issues**: Verify GitHub Pages is enabled

---
