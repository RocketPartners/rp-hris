# CI/CD Quick Reference

> **📚 Documentation Index**
> - 📖 [Complete Setup Guide](GITHUB-ACTIONS.md) - Detailed instructions for setup
> - 🏗️ [Architecture & Flow](ARCHITECTURE.md) - Visual diagrams and workflow architecture
> - 🎯 This file - Quick reference and examples

## 🎯 What This Does

GitHub Actions workflows that **only run CI/CD for files that actually changed**.

- Change only web files? → Only web gets tested & deployed
- Change only API files? → Only API gets tested & deployed  
- Change shared library? → Both web & API get tested & deployed
- Change only docs? → Nothing gets deployed (saves time & money)

## 📁 Files

- `.github/workflows/ci.yml` - Runs tests, linting, builds for affected projects
- `.github/workflows/cd.yml` - Deploys only affected apps to production
- `.github/GITHUB-ACTIONS.md` - Complete setup guide

## 🚀 How It Works

### 1. CI Workflow (on every push/PR)

```bash
# Automatically runs these commands on affected projects only:
npx nx affected -t lint --parallel=3
npx nx affected -t test --parallel=3 --coverage
npx nx affected -t typecheck --parallel=3
npx nx affected -t build --parallel=3
npx nx affected -t e2e --parallel=1
```

### 2. CD Workflow (on main branch only)

```bash
# Checks what changed
npx nx show projects --affected

# Deploys only affected apps
if web affected → deploy web
if api affected → deploy api
```

## 🔧 Setup Required

1. **Choose deployment platforms** in `.github/workflows/cd.yml`:
   - Uncomment your preferred service (Vercel, Netlify, Railway, etc.)
   
2. **Add GitHub Secrets**:
   - Go to repo Settings → Secrets and variables → Actions
   - Add tokens for your deployment platform
   
3. **Update URLs** in workflow files:
   - Change `https://your-web-app.com` to your actual URL
   - Change `https://api.your-domain.com` to your actual API URL

## 📊 Examples

### Scenario 1: You changed `apps/web/src/app.tsx`
```
✅ Lint web
✅ Test web  
✅ Build web
✅ Deploy web
⏭️ API skipped (no changes)
```

### Scenario 2: You changed `libs/models/src/employee.types.ts`
```
✅ Lint web, api
✅ Test web, api (both use this type)
✅ Build web, api
✅ Deploy web, api
```

### Scenario 3: You changed `README.md`
```
⏭️ Everything skipped (no code changes)
```

## 🧪 Test Locally

```bash
# See what would be affected
npx nx show projects --affected

# Run what CI would run
npx nx affected -t test,lint,build --parallel=3
```

## 📚 Full Documentation

- **GitHub Actions Setup**: [.github/GITHUB-ACTIONS.md](.github/GITHUB-ACTIONS.md)
- **Nx Commands Reference**: [NX-COMMANDS.md](NX-COMMANDS.md)

## 💡 Key Benefits

1. ⚡ **Faster CI/CD** - Only test/build what changed
2. 💰 **Save Resources** - Don't deploy unchanged apps
3. 🎯 **Smart Detection** - Nx knows the dependency graph
4. 🔒 **Safe Deployments** - Each app deploys independently
5. 📊 **Clear Reports** - See exactly what was deployed

---

**Next Steps:**
1. Read [.github/GITHUB-ACTIONS.md](.github/GITHUB-ACTIONS.md) for detailed setup
2. Configure your deployment platform in `.github/workflows/cd.yml`
3. Add required secrets to GitHub
4. Push to `main` and watch it work! 🚀

