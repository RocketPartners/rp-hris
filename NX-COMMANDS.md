# Nx Commands Reference Guide

A comprehensive guide to commonly used Nx commands in the RP-HRIS workspace.

## 📑 Table of Contents

- [Running Applications](#running-applications)
- [Building Projects](#building-projects)
- [Testing](#testing)
- [Linting](#linting)
- [Code Generation](#code-generation)
- [Project Information](#project-information)
- [Dependency Graph](#dependency-graph)
- [Cache Management](#cache-management)
- [Running Multiple Targets](#running-multiple-targets)
- [Affected Commands](#affected-commands)
- [Deployment](#-deployment)
- [CI/CD Setup](#-cicd-setup)
- [Workspace Management](#workspace-management)

---

## 🚀 Running Applications

### Start Development Servers

```bash
# Run web app in development mode
npx nx dev web

# Run API server
npx nx serve api

# Run with specific configuration
npx nx serve api --configuration=production
```

### Preview Production Build

```bash
# Preview web app production build
npx nx preview web

# Preview API production build
npx nx preview api
```

---

## 🔨 Building Projects

### Build Single Project

```bash
# Build web application
npx nx build web

# Build API
npx nx build api

# Build with specific configuration
npx nx build web --configuration=production
npx nx build api --configuration=development
```

### Build Multiple Projects

```bash
# Build all apps
npx nx run-many -t build

# Build specific projects
npx nx run-many -t build --projects=web,api

# Build all buildable projects
npx nx run-many -t build --all
```

### Build with Dependencies

```bash
# Build project and its dependencies
npx nx build web --with-deps
```

---

## 🧪 Testing

### Run Unit Tests

```bash
# Test specific project
npx nx test web
npx nx test api

# Test with coverage
npx nx test web --coverage
npx nx test api --coverage

# Test in watch mode
npx nx test web --watch

# Run tests matching pattern
npx nx test web --testPathPattern=app.spec
```

### Run E2E Tests

```bash
# Run web e2e tests
npx nx e2e web-e2e

# Run API e2e tests
npx nx e2e api-e2e

# Run e2e with specific browser (Playwright)
npx nx e2e web-e2e --headed
npx nx e2e web-e2e --browser=chromium
```

### Test All Projects

```bash
# Run all tests
npx nx run-many -t test

# Test all with coverage
npx nx run-many -t test --coverage

# Test specific projects
npx nx run-many -t test --projects=web,api
```

---

## ✅ Linting

### Lint Single Project

```bash
# Lint web app
npx nx lint web

# Lint API
npx nx lint api

# Lint with auto-fix
npx nx lint web --fix
npx nx lint api --fix
```

### Lint Multiple Projects

```bash
# Lint all projects
npx nx run-many -t lint --all

# Lint specific projects
npx nx run-many -t lint --projects=web,api,shared

# Lint with fix for all
npx nx run-many -t lint --all --fix
```

---

## 🎨 Code Generation

### Generate Applications

```bash
# Generate React app
npx nx g @nx/react:app my-app

# Generate NestJS app
npx nx g @nx/nest:app my-api

# Generate with specific options
npx nx g @nx/react:app my-app --style=tailwind --bundler=vite
```

### Generate Libraries

```bash
# Generate React library
npx nx g @nx/react:lib my-lib

# Generate TypeScript library
npx nx g @nx/js:lib my-lib

# Generate library in specific directory
npx nx g @nx/react:lib my-lib --directory=libs/features
```

### Generate Components & Services

```bash
# Generate React component in web app
npx nx g @nx/react:component my-component --project=web

# Generate NestJS service
npx nx g @nx/nest:service my-service --project=api

# Generate NestJS controller
npx nx g @nx/nest:controller my-controller --project=api

# Generate NestJS module
npx nx g @nx/nest:module my-module --project=api

# Generate NestJS resource (CRUD)
npx nx g @nx/nest:resource my-resource --project=api
```

### Generate React Features

```bash
# Generate Redux slice
npx nx g @nx/react:redux my-slice --project=web

# Generate custom hook
npx nx g @nx/react:hook my-hook --project=web
```

### List Available Generators

```bash
# List all installed plugins
npx nx list

# List generators for specific plugin
npx nx list @nx/react
npx nx list @nx/nest
npx nx list @nx/js
```

---

## 📊 Project Information

### Show Project Details

```bash
# Show web project configuration
npx nx show project web

# Show API project details
npx nx show project api

# Show with JSON output
npx nx show project web --json
```

### List Projects

```bash
# List all projects
npx nx show projects

# List projects matching pattern
npx nx show projects --with-target=build
npx nx show projects --with-target=test

# List affected projects
npx nx show projects --affected
```

### Show Project Graph

```bash
# Show dependency graph for specific project
npx nx graph --focus=web
npx nx graph --focus=api

# Show affected project graph
npx nx graph --affected
```

---

## 🕸️ Dependency Graph

### Visualize Dependencies

```bash
# Open interactive dependency graph
npx nx graph

# Focus on specific project
npx nx graph --focus=web

# Show only affected projects
npx nx graph --affected

# Export graph as JSON
npx nx graph --file=graph.json

# Show graph in browser
npx nx graph --open
```

### Analyze Dependencies

```bash
# Check circular dependencies
npx nx graph --file=graph.html

# View project dependencies
npx nx show project web --json | grep -A 10 "implicitDependencies"
```

---

## 🗑️ Cache Management

### Clear Cache

```bash
# Reset Nx cache and daemon
npx nx reset

# Clear specific cache
rm -rf .nx/cache

# Clear workspace cache
rm -rf node_modules/.cache
```

### Cache Configuration

```bash
# Check cache status
npx nx show projects --with-target=build

# Run without cache
npx nx build web --skip-nx-cache
```

---

## 🔄 Running Multiple Targets

### Run Many

```bash
# Run target for all projects
npx nx run-many -t build
npx nx run-many -t test
npx nx run-many -t lint

# Run multiple targets
npx nx run-many -t build,test,lint

# Run for specific projects
npx nx run-many -t build --projects=web,api

# Run with all projects explicitly
npx nx run-many -t test --all

# Exclude specific projects
npx nx run-many -t test --all --exclude=api-e2e,web-e2e
```

### Parallel Execution

```bash
# Run with specific number of parallel processes
npx nx run-many -t test --parallel=3

# Run serially (no parallelization)
npx nx run-many -t build --parallel=1

# Max parallelization
npx nx run-many -t lint --parallel=10
```

### With Configuration

```bash
# Run with specific configuration
npx nx run-many -t build --configuration=production

# Run with different configs per project
npx nx build web --configuration=production
npx nx build api --configuration=staging
```

---

## 🎯 Affected Commands

### What is Affected?

Nx can determine which projects are affected by your changes and only run tasks for those projects.

### Run Affected Tasks

```bash
# Build only affected projects
npx nx affected -t build

# Test only affected projects
npx nx affected -t test

# Lint only affected projects
npx nx affected -t lint

# Run multiple targets for affected
npx nx affected -t build,test,lint

# Compare against specific base
npx nx affected -t test --base=main
npx nx affected -t build --base=origin/main --head=HEAD
```

### Show Affected Projects

```bash
# List affected projects
npx nx show projects --affected

# Show affected graph
npx nx graph --affected

# See which projects would be affected
npx nx affected:graph
```

### Common Affected Workflows

```bash
# CI/CD: Test and lint affected
npx nx affected -t test,lint --base=origin/main --head=HEAD

# Before commit: Check affected
npx nx affected -t test,lint --base=HEAD~1

# Since last tag
npx nx affected -t build --base=last-release
```

---

## 🚀 Deployment

### Deploy Web Application

```bash
# Build for production
npx nx build web --configuration=production

# Preview production build
npx nx preview web

# Deploy to Vercel
npx nx build web --configuration=production
cd dist/apps/web
vercel --prod

# Deploy to Netlify
npx nx build web --configuration=production
cd dist/apps/web
netlify deploy --prod

# Deploy to AWS S3
npx nx build web --configuration=production
aws s3 sync dist/apps/web s3://your-bucket-name --delete
aws cloudfront create-invalidation --distribution-id YOUR_DIST_ID --paths "/*"
```

### Deploy API Application

```bash
# Build for production
npx nx build api --configuration=production

# Deploy to AWS Elastic Beanstalk
npx nx build api --configuration=production
eb deploy

# Deploy to Heroku
npx nx build api --configuration=production
git push heroku main

# Deploy to Docker
npx nx build api --configuration=production
docker build -t rp-hris-api -f apps/api/Dockerfile .
docker push your-registry/rp-hris-api:latest

# Deploy to AWS ECS
npx nx build api --configuration=production
aws ecs update-service --cluster rp-hris --service api --force-new-deployment
```

### Environment-Specific Deployments

```bash
# Deploy to staging
npx nx build web --configuration=staging
npx nx build api --configuration=staging

# Deploy to production
npx nx build web --configuration=production
npx nx build api --configuration=production

# Deploy specific app only
npx nx affected -t build --configuration=production --select=web
npx nx affected -t build --configuration=production --select=api
```

---

## 🔄 CI/CD Setup

### Affected-Based CI/CD Strategy

The key to efficient CI/CD in a monorepo is only building and deploying what has changed.

### GitHub Actions - Affected Only

Create `.github/workflows/ci.yml`:

```yaml
name: CI

on:
  push:
    branches: [main]
  pull_request:
    branches: [main]

jobs:
  # Determine what has changed
  affected:
    runs-on: ubuntu-latest
    outputs:
      web-affected: ${{ steps.check-web.outputs.affected }}
      api-affected: ${{ steps.check-api.outputs.affected }}
    steps:
      - uses: actions/checkout@v4
        with:
          fetch-depth: 0
      
      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: '20'
          cache: 'npm'
      
      - name: Install dependencies
        run: npm ci
      
      - name: Check if web is affected
        id: check-web
        run: |
          if npx nx show projects --affected --base=origin/main | grep -q 'web'; then
            echo "affected=true" >> $GITHUB_OUTPUT
          else
            echo "affected=false" >> $GITHUB_OUTPUT
          fi
      
      - name: Check if api is affected
        id: check-api
        run: |
          if npx nx show projects --affected --base=origin/main | grep -q 'api'; then
            echo "affected=true" >> $GITHUB_OUTPUT
          else
            echo "affected=false" >> $GITHUB_OUTPUT
          fi

  # Test and Build Web (only if affected)
  web:
    needs: affected
    if: needs.affected.outputs.web-affected == 'true'
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
        with:
          fetch-depth: 0
      
      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: '20'
          cache: 'npm'
      
      - name: Install dependencies
        run: npm ci
      
      - name: Lint web
        run: npx nx lint web
      
      - name: Test web
        run: npx nx test web --coverage
      
      - name: Build web
        run: npx nx build web --configuration=production
      
      - name: E2E tests
        run: npx nx e2e web-e2e
      
      - name: Upload build artifacts
        uses: actions/upload-artifact@v4
        with:
          name: web-dist
          path: dist/apps/web

  # Test and Build API (only if affected)
  api:
    needs: affected
    if: needs.affected.outputs.api-affected == 'true'
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
        with:
          fetch-depth: 0
      
      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: '20'
          cache: 'npm'
      
      - name: Install dependencies
        run: npm ci
      
      - name: Lint api
        run: npx nx lint api
      
      - name: Test api
        run: npx nx test api --coverage
      
      - name: Build api
        run: npx nx build api --configuration=production
      
      - name: E2E tests
        run: npx nx e2e api-e2e
      
      - name: Upload build artifacts
        uses: actions/upload-artifact@v4
        with:
          name: api-dist
          path: dist/apps/api

  # Deploy Web (only if affected)
  deploy-web:
    needs: [affected, web]
    if: needs.affected.outputs.web-affected == 'true' && github.ref == 'refs/heads/main'
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      
      - name: Download build artifacts
        uses: actions/download-artifact@v4
        with:
          name: web-dist
          path: dist/apps/web
      
      - name: Deploy to Vercel
        uses: amondnet/vercel-action@v25
        with:
          vercel-token: ${{ secrets.VERCEL_TOKEN }}
          vercel-org-id: ${{ secrets.VERCEL_ORG_ID }}
          vercel-project-id: ${{ secrets.VERCEL_PROJECT_ID }}
          vercel-args: '--prod'
          working-directory: dist/apps/web

  # Deploy API (only if affected)
  deploy-api:
    needs: [affected, api]
    if: needs.affected.outputs.api-affected == 'true' && github.ref == 'refs/heads/main'
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      
      - name: Download build artifacts
        uses: actions/download-artifact@v4
        with:
          name: api-dist
          path: dist/apps/api
      
      - name: Configure AWS credentials
        uses: aws-actions/configure-aws-credentials@v4
        with:
          aws-access-key-id: ${{ secrets.AWS_ACCESS_KEY_ID }}
          aws-secret-access-key: ${{ secrets.AWS_SECRET_ACCESS_KEY }}
          aws-region: us-east-1
      
      - name: Deploy to AWS ECS
        run: |
          aws ecs update-service \
            --cluster rp-hris \
            --service api \
            --force-new-deployment
```

### GitLab CI/CD - Affected Only

Create `.gitlab-ci.yml`:

```yaml
stages:
  - install
  - check
  - test
  - build
  - deploy

variables:
  NX_BRANCH: $CI_COMMIT_REF_NAME
  NX_CLOUD_DISTRIBUTED_EXECUTION: 'true'

install:
  stage: install
  script:
    - npm ci
  cache:
    key: $CI_COMMIT_REF_SLUG
    paths:
      - node_modules/

check-affected:
  stage: check
  script:
    - npx nx show projects --affected --base=origin/main > affected.txt
    - cat affected.txt
  artifacts:
    paths:
      - affected.txt

test-web:
  stage: test
  rules:
    - if: $CI_COMMIT_BRANCH == "main"
      changes:
        - apps/web/**/*
        - libs/**/*
  script:
    - npx nx affected -t test,lint --base=origin/main --head=HEAD --parallel=3
  dependencies:
    - install

test-api:
  stage: test
  rules:
    - if: $CI_COMMIT_BRANCH == "main"
      changes:
        - apps/api/**/*
        - libs/**/*
  script:
    - npx nx affected -t test,lint --base=origin/main --head=HEAD --parallel=3
  dependencies:
    - install

build-web:
  stage: build
  rules:
    - if: $CI_COMMIT_BRANCH == "main"
      changes:
        - apps/web/**/*
        - libs/**/*
  script:
    - npx nx build web --configuration=production
  artifacts:
    paths:
      - dist/apps/web
  dependencies:
    - install

build-api:
  stage: build
  rules:
    - if: $CI_COMMIT_BRANCH == "main"
      changes:
        - apps/api/**/*
        - libs/**/*
  script:
    - npx nx build api --configuration=production
  artifacts:
    paths:
      - dist/apps/api
  dependencies:
    - install

deploy-web:
  stage: deploy
  rules:
    - if: $CI_COMMIT_BRANCH == "main"
      changes:
        - apps/web/**/*
        - libs/**/*
  script:
    - npx vercel --prod --token=$VERCEL_TOKEN
  dependencies:
    - build-web
  environment:
    name: production-web
    url: https://rp-hris.vercel.app

deploy-api:
  stage: deploy
  rules:
    - if: $CI_COMMIT_BRANCH == "main"
      changes:
        - apps/api/**/*
        - libs/**/*
  script:
    - aws ecs update-service --cluster rp-hris --service api --force-new-deployment
  dependencies:
    - build-api
  environment:
    name: production-api
    url: https://api.rp-hris.com
```

### Nx Cloud Integration

Enable distributed caching and task execution:

```bash
# Connect to Nx Cloud
npx nx connect-to-nx-cloud

# Add to CI
export NX_CLOUD_ACCESS_TOKEN=your-token
npx nx affected -t build,test,lint --base=origin/main --parallel=3
```

### Manual Deployment Commands

```bash
# Check what would be affected
npx nx show projects --affected --base=origin/main

# Build only affected apps
npx nx affected -t build --base=origin/main --configuration=production

# Deploy only web if affected
if npx nx show projects --affected --base=origin/main | grep -q 'web'; then
  npx nx build web --configuration=production
  # deploy web...
fi

# Deploy only API if affected
if npx nx show projects --affected --base=origin/main | grep -q 'api'; then
  npx nx build api --configuration=production
  # deploy api...
fi
```

### Pre-Deployment Checklist

```bash
# 1. Run affected tests
npx nx affected -t test --base=origin/main --parallel=3

# 2. Run affected linting
npx nx affected -t lint --base=origin/main --parallel=3

# 3. Run affected e2e
npx nx affected -t e2e --base=origin/main

# 4. Build affected apps
npx nx affected -t build --base=origin/main --configuration=production

# 5. Check for type errors
npx nx affected -t typecheck --base=origin/main
```

---

## 🛠️ Workspace Management

### Workspace Information

```bash
# Show Nx version
npx nx --version

# Report workspace info
npx nx report

# Show workspace configuration
cat nx.json
```

### Update Nx

```bash
# Update Nx to latest
npx nx migrate latest

# Apply migrations
npx nx migrate --run-migrations

# Update specific package
npx nx migrate @nx/react@latest
```

### Format Code

```bash
# Format all files
npx nx format:write

# Check formatting
npx nx format:check

# Format specific files
npx nx format:write --files=apps/web/src/**/*.ts
```

### Workspace Lint

```bash
# Check workspace consistency
npx nx workspace-lint

# Auto-fix workspace issues
npx nx format:write
```

---

## 💡 Pro Tips

### 1. Use Nx Console Extension
Install the Nx Console extension for VS Code or IntelliJ for a GUI to run commands.

### 2. Create Nx Aliases
Add to your shell profile (~/.zshrc or ~/.bashrc):

```bash
alias nxb="npx nx build"
alias nxt="npx nx test"
alias nxl="npx nx lint"
alias nxs="npx nx serve"
alias nxg="npx nx graph"
```

### 3. Use Configuration Files
Store common command options in `nx.json` under `targetDefaults`.

### 4. Nx Cloud
Connect to Nx Cloud for distributed caching and CI analytics:
```bash
npx nx connect-to-nx-cloud
```

### 5. Watch Mode
Many commands support watch mode for development:
```bash
npx nx test web --watch
npx nx build api --watch
```

### 6. Verbose Output
Add `--verbose` to any command for detailed output:
```bash
npx nx build web --verbose
```

### 7. Skip NX Cache
When debugging, skip cache:
```bash
npx nx test web --skip-nx-cache
```

### 8. DRY_RUN
Preview what will happen without executing:
```bash
npx nx g @nx/react:component my-comp --project=web --dry-run
```

---

## 🔗 Useful Commands Cheatsheet

```bash
# Daily Development
npx nx dev web                          # Start web dev server
npx nx serve api                        # Start API server
npx nx test web --watch                 # Test in watch mode
npx nx lint web --fix                   # Lint and fix

# Before Commit
npx nx affected -t test,lint            # Test & lint affected
npx nx format:write                     # Format code

# CI/CD
npx nx affected -t build,test,lint --base=origin/main
npx nx run-many -t build --all          # Build everything

# Project Management
npx nx graph                            # View dependency graph
npx nx show projects                    # List all projects
npx nx list                             # List available plugins

# Troubleshooting
npx nx reset                            # Clear cache
npx nx report                           # Show workspace info
npx nx --verbose                        # Add to any command for details
```

---

## 📚 Additional Resources

- [Nx Documentation](https://nx.dev)
- [Nx CLI Reference](https://nx.dev/nx-api/nx/documents/run)
- [Nx Recipes](https://nx.dev/recipes)
- [Project README](./README.md)
- [Shared Utils Guide](./libs/shared/QUICK-REFERENCE.md)

---

**Questions?** Check the [Nx Discord](https://go.nx.dev/community) or consult with the team!
