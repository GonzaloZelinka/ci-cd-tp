# 🚀 TypeScript CI/CD Demo Project

A complete demonstration of Continuous Integration and Continuous Delivery (CI/CD) implementation using TypeScript, GitHub Actions, and automated testing.

**⏱️ Get your CI/CD pipeline running in under 5 minutes!**

## ✅ Prerequisites Checklist

- [ ] Node.js 18+ installed
- [ ] Git configured with your personal account
- [ ] GitHub account ready
- [ ] (Optional) Slack workspace for notifications

## 🎯 Quick Start (2 minutes)

### 1. Test Locally

```bash
# Verify everything works locally
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

### 2. Initialize Git Repository

```bash
git init
git add .
git commit -m "Initial CI/CD setup"
```

### 3. Create GitHub Repository

1. Go to [GitHub](https://github.com) → **New Repository**
2. Name: `typescript-ci-cd-demo` (or your preferred name)
3. Description: `TypeScript CI/CD Pipeline Demo`
4. Public repository ✅
5. **Do NOT initialize** with README, .gitignore, or license (we already have these files)
6. Click **Create repository**

### 4. Connect and Push

```bash
# Replace <username> and <repository-name> with your GitHub details
git remote add origin https://github.com/<username>/<repository-name>.git
git branch -M main
git push -u origin main
```

## 🔄 Verify CI/CD Pipeline (1 minute)

1. **Check GitHub Actions**: Go to your repo → **Actions** tab
2. **Verify workflow runs**: Should see "CI/CD Pipeline" running
3. **Check deployment**: After success, visit `https://<username>.github.io/<repository-name>/`

## 🧪 Demo the Pipeline (30 seconds)

### Trigger a Failure (for demo)

```bash
# Edit the test to fail
sed -i.bak 's/Hello World from TypeScript CI\/CD Demo!/This will fail!/' __tests__/index.test.ts

git add .
git commit -m "test: intentional failure for demo"
git push origin main
```

**Result**: ❌ Pipeline fails, notifications sent

### Fix the Failure

```bash
# Restore the correct test
mv __tests__/index.test.ts.bak __tests__/index.test.ts

git add .
git commit -m "fix: restore correct test"
git push origin main
```

**Result**: ✅ Pipeline passes, deployed to GitHub Pages

## 🏗️ Architecture Overview

This project demonstrates a complete CI/CD pipeline:

```
[Version Control] → [CI Server] → [Build & Test] → [Deploy Environment]
     (Git)           (GitHub Actions)    (Jest Tests)      (GitHub Pages)
                           ↓
                  [Feedback Mechanism]
                  (Slack + Email Notifications)
```

## 📋 Requirements Met

- ✅ **Version Control**: Git with GitHub repository
- ✅ **Programming Language**: TypeScript with "Hello World" script
- ✅ **Editor**: Cursor (IDE of choice)
- ✅ **CI/CD Server**: GitHub Actions
- ✅ **Local Build**: npm scripts for local development
- ✅ **Automated Tests**: Jest testing framework
- ✅ **Delivery Environment**: GitHub Pages deployment
- ✅ **Feedback Mechanism**: Slack and Email notifications
- ✅ **Personal Account**: Individual developer setup

## 📱 Access Your Live Demo

- **Application**: `https://<username>.github.io/<repository-name>/`
- **Repository**: `https://github.com/<username>/<repository-name>`
- **Actions**: `https://github.com/<username>/<repository-name>/actions`

---

## 📖 Detailed Documentation

### Project Structure

```
typescript-ci-cd-demo/
├── src/
│   └── index.ts                 # Main TypeScript application
├── __tests__/
│   └── index.test.ts           # Jest test files
├── .github/
│   └── workflows/
│       └── ci-cd.yml           # GitHub Actions CI/CD pipeline
├── public/
│   └── index.html              # Deployment page
├── dist/                       # Compiled JavaScript output
├── docs/
│   └── NOTIFICATION_SETUP.md   # Notification configuration guide
├── scripts/
│   └── setup.sh               # Automated setup script
├── package.json                # Project configuration
├── tsconfig.json              # TypeScript configuration
├── Dockerfile                 # Container configuration (optional)
└── README.md                  # This file
```

### 🔄 CI/CD Pipeline

#### Pipeline Stages

1. **Code Push** → Triggers GitHub Actions
2. **Install Dependencies** → `npm ci`
3. **Run Tests** → `npm test`
4. **Build Application** → `npm run build`
5. **Deploy** → Deploy to GitHub Pages (main branch only)
6. **Notify** → Send Slack/Email notifications

#### GitHub Actions Workflow

The CI/CD pipeline runs on:

- Push to `main` or `develop` branches
- Pull requests to `main` branch

#### Branches Strategy

- `main`: Production branch (triggers deployment)
- `develop`: Development branch (runs tests only)
- Feature branches: Create PR to `develop`

### 📧 Notification Setup

#### Quick Slack Setup

1. **Get webhook URL**:

   - Slack → Apps → Incoming WebHooks → Add to Slack
   - Copy the webhook URL

2. **Add to GitHub**:

   - Your repo → Settings → Secrets and variables → Actions
   - New secret: `SLACK_WEBHOOK_URL` = `your-webhook-url`

3. **Test**: Push any change and check Slack for notifications

#### Email Notifications

Add these secrets for email notifications:

- `EMAIL_USERNAME`: SMTP username (e.g., Gmail address)
- `EMAIL_PASSWORD`: SMTP password (use App Password for Gmail)
- `EMAIL_TO`: Recipient email address
- `EMAIL_FROM`: Sender email address

**📝 Detailed setup guide**: See `docs/NOTIFICATION_SETUP.md`

### 🧪 Testing Strategy

#### Test Types

1. **Unit Tests**: Function-level testing
2. **Integration Tests**: Component interaction testing
3. **Automated Pipeline Tests**: CI/CD validation

#### Running Tests

```bash
# Run all tests once
npm test

# Run tests in watch mode (development)
npm run test:watch

# Run tests with coverage
npm test -- --coverage
```

### 🚢 Deployment

#### GitHub Pages Deployment

The application automatically deploys to GitHub Pages when changes are pushed to the `main` branch.

#### Manual Deployment

```bash
npm run deploy
```

### 📊 Project Scripts Overview

| Script               | Description                          |
| -------------------- | ------------------------------------ |
| `npm run dev`        | Run in development mode with ts-node |
| `npm run build`      | Compile TypeScript to JavaScript     |
| `npm start`          | Run compiled JavaScript              |
| `npm test`           | Run Jest tests                       |
| `npm run test:watch` | Run tests in watch mode              |
| `npm run clean`      | Remove build artifacts               |
| `npm run deploy`     | Deploy application                   |
| `npm run setup`      | Run automated setup script           |

### 🛠️ Development Tools

- **TypeScript**: Type-safe JavaScript development
- **Jest**: Testing framework with TypeScript support
- **GitHub Actions**: CI/CD automation
- **Node.js**: Runtime environment
- **npm**: Package management

### 🎯 Next Steps

1. **Customize the application** in `src/index.ts`
2. **Add more tests** in `__tests__/`
3. **Configure email notifications** (see `docs/NOTIFICATION_SETUP.md`)
4. **Add Docker deployment** (Dockerfile included)
5. **Create feature branches** and practice the workflow

### 🆘 Troubleshooting

| Issue                         | Solution                                        |
| ----------------------------- | ----------------------------------------------- |
| Tests fail locally            | `npm install && npm test`                       |
| Build fails                   | `npm run clean && npm run build`                |
| GitHub Actions not triggering | Check `.github/workflows/ci-cd.yml` syntax      |
| Deployment not working        | Verify GitHub Pages is enabled in repo settings |
| No notifications              | Check secrets are configured correctly          |

### 📞 Need Help?

- 🔔 **Notification Setup**: See `docs/NOTIFICATION_SETUP.md`
- 🐛 **GitHub Actions Logs**: Repository → Actions → Click failed run
- 🔍 **Test Locally**: All commands should work before pushing

### 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Run tests: `npm test`
5. Create a pull request

### 📄 License

MIT License - see LICENSE file for details.

### 👨‍💻 Author

**Personal Account Demo** - Individual developer showcasing CI/CD implementation

---

**🎊 Congratulations!** You now have a complete CI/CD pipeline demonstrating automated build, test, and deployment workflow!

_Time to completion: ~5 minutes_ ⏱️
