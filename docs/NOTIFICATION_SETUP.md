# CI/CD Notification Setup Guide

This guide explains how to configure Slack and Email notifications for your CI/CD pipeline.

## 🔔 Slack Notifications Setup

### Step 1: Create a Slack Webhook

1. Go to your Slack workspace
2. Navigate to **Apps** → **Manage** → **Custom Integrations**
3. Click **Incoming WebHooks**
4. Click **Add to Slack**
5. Choose the channel where you want notifications
6. Click **Add Incoming WebHooks Integration**
7. Copy the **Webhook URL**

### Step 2: Add GitHub Secret

1. Go to your GitHub repository
2. Navigate to **Settings** → **Secrets and variables** → **Actions**
3. Click **New repository secret**
4. Name: `SLACK_WEBHOOK_URL`
5. Value: Paste your webhook URL
6. Click **Add secret**

### Step 3: Test Slack Notifications

Push a commit to trigger the pipeline and verify notifications appear in your Slack channel.

## 📧 Email Notifications Setup

### Step 1: Prepare Email Credentials

For Gmail (recommended):

1. Enable 2-Factor Authentication on your Google account
2. Generate an App Password:
   - Go to Google Account settings
   - Security → 2-Step Verification → App passwords
   - Generate password for "Mail"
   - Copy the 16-character password

### Step 2: Add GitHub Secrets

Add these secrets to your GitHub repository:

| Secret Name      | Description                                     | Example                         |
| ---------------- | ----------------------------------------------- | ------------------------------- |
| `EMAIL_USERNAME` | Your email address                              | `your.email@gmail.com`          |
| `EMAIL_PASSWORD` | App password (not your regular password)        | `abcd efgh ijkl mnop`           |
| `EMAIL_TO`       | Recipient email address                         | `notifications@yourcompany.com` |
| `EMAIL_FROM`     | Sender email address (usually same as username) | `your.email@gmail.com`          |

### Step 3: Test Email Notifications

Create a failing test and push to trigger email notifications.

## 🧪 Testing the Notification System

### Trigger a Successful Build

```bash
git add .
git commit -m "feat: add new feature"
git push origin main
```

**Expected notifications:**

- ✅ Slack: "CI/CD Pipeline completed successfully!"
- ✅ Email: No email (only sent on failures)

### Trigger a Failed Build

1. Edit `__tests__/index.test.ts`:

   ```typescript
   expect(message).toBe("This will fail!");
   ```

2. Push the change:
   ```bash
   git add .
   git commit -m "test: intentional failure for demo"
   git push origin main
   ```

**Expected notifications:**

- ❌ Slack: "CI/CD Pipeline failed! Please check the logs for details."
- ❌ Email: "CI/CD Pipeline Failed" with detailed information

### Fix the Failure

1. Revert the test:

   ```typescript
   expect(message).toBe("Hello World from TypeScript CI/CD Demo!");
   ```

2. Push the fix:
   ```bash
   git add .
   git commit -m "fix: correct the test expectation"
   git push origin main
   ```

**Expected notifications:**

- ✅ Slack: "CI/CD Pipeline completed successfully!"

## 🔧 Customizing Notifications

### Slack Message Customization

Edit `.github/workflows/ci-cd.yml` to customize Slack messages:

```yaml
- name: Slack Notification on Success
  uses: 8398a7/action-slack@v3
  with:
    status: success
    text: "🎉 Build ${{ github.run_number }} deployed successfully to production!"
    webhook_url: ${{ secrets.SLACK_WEBHOOK_URL }}
```

### Email Template Customization

Modify the email body in the workflow file:

```yaml
body: |
  🚨 CI/CD Pipeline Alert

  Status: FAILED ❌
  Repository: ${{ github.repository }}
  Branch: ${{ github.ref_name }}
  Commit: ${{ github.sha }}
  Author: ${{ github.actor }}

  View logs: ${{ github.server_url }}/${{ github.repository }}/actions/runs/${{ github.run_id }}
```

## 📊 Notification Channels Summary

| Event          | Slack | Email | GitHub |
| -------------- | ----- | ----- | ------ |
| Build Success  | ✅    | ❌    | ✅     |
| Build Failure  | ✅    | ✅    | ✅     |
| Deploy Success | ✅    | ❌    | ✅     |
| Deploy Failure | ✅    | ✅    | ✅     |

## 🚨 Troubleshooting

### Slack Notifications Not Working

- Verify the webhook URL is correct
- Check that the Slack app has permission to post to the channel
- Ensure the `SLACK_WEBHOOK_URL` secret is properly set in GitHub

### Email Notifications Not Working

- Verify all email secrets are set correctly
- For Gmail, ensure you're using an App Password, not your regular password
- Check that 2FA is enabled on your Google account
- Verify SMTP settings are correct for your email provider

### No Notifications at All

- Check that the workflow file syntax is correct
- Verify the workflow is triggered (check Actions tab in GitHub)
- Ensure secrets are accessible to the workflow (not in fork restrictions)

## 🎯 Best Practices

1. **Test notifications** during setup with intentional failures
2. **Use different channels** for different environments (dev/staging/prod)
3. **Include relevant information** in notifications (commit hash, author, logs link)
4. **Avoid spam** by configuring notifications only for important events
5. **Secure your secrets** and rotate them periodically

## 📞 Support

If you encounter issues:

1. Check the GitHub Actions logs
2. Verify your secrets are correctly configured
3. Test with a simple notification first
4. Consult the respective service documentation (Slack API, SMTP docs)
