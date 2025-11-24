# RP-HRIS

<a alt="Nx logo" href="https://nx.dev" target="_blank" rel="noreferrer"><img src="https://raw.githubusercontent.com/nrwl/nx/master/images/nx-logo.png" width="45"></a>

A modern Human Resources Information System built with Nx monorepo architecture.

## 📦 Project Structure

This workspace contains the following applications and libraries:

### Applications

- **`@rp-hris/web`** - React web application built with Vite and TailwindCSS
- **`@rp-hris/api`** - NestJS API server built with Webpack
- **`@rp-hris/web-e2e`** - Playwright end-to-end tests for the web app
- **`@rp-hris/api-e2e`** - Jest end-to-end tests for the API

### Libraries

- **`@rp-hris/models`** - Shared models, utilities, types, and constants used across applications
  - Types (User types, etc.)
  - Constants (Philippine constants, Leave constants, App constants)
  - Utilities (String, Date, Array, Validation, Number utils)

## 🚀 Getting Started

### Development

Run the web application in development mode:

```sh
npx nx dev web
```

Run the API server in development mode:

```sh
npx nx serve api
```

### Building

Create a production bundle for the web app:

```sh
npx nx build web
```

Build the API for production:

```sh
npx nx build api
```

### Testing

Run unit tests for a specific project:

```sh
npx nx test web
npx nx test api
```

Run all tests in the workspace:

```sh
npx nx run-many -t test
```

Run end-to-end tests:

```sh
npx nx e2e web-e2e
npx nx e2e api-e2e
```

### Linting

Lint a specific project:

```sh
npx nx lint web
npx nx lint api
```

Lint all projects:

```sh
npx nx run-many -t lint --all
```

## 📚 Using Shared Libraries

Import from the shared library in your applications:

```typescript
// In web or api applications
import { 
  formatCurrency, 
  formatDate, 
  isValidEmail,
  PHILIPPINE_REGIONS 
} from '@rp-hris/models';
```

## 🔍 Explore the Workspace

To see all available targets for a project:

```sh
npx nx show project web
npx nx show project api
```

Visualize the project dependency graph:

```sh
npx nx graph
```

List all projects in the workspace:

```sh
npx nx show projects
```

## ➕ Add New Projects

Generate a new library:

```sh
npx nx g @nx/react:lib my-lib
npx nx g @nx/js:lib my-lib
```

Generate a new NestJS module in the API:

```sh
npx nx g @nx/nest:module my-module --project=api
```

Generate a new React component in the web app:

```sh
npx nx g @nx/react:component my-component --project=web
```

You can use `npx nx list` to get a list of installed plugins, then run `npx nx list <plugin-name>` to see available generators.

## 🛠️ Tech Stack

- **Frontend**: React, Vite, TailwindCSS
- **Backend**: NestJS, TypeScript, Webpack
- **Testing**: Jest, Playwright
- **Build System**: Nx
- **Package Manager**: npm

## 📖 Documentation

- [Nx Documentation](https://nx.dev)
- [Learn about Nx on CI](https://nx.dev/ci/intro/ci-with-nx)
- [Shared Utilities Guide](./libs/shared/QUICK-REFERENCE.md)
- [Utility Examples](./libs/shared/src/lib/utils/EXAMPLES.md)

## 🔗 CI/CD Setup

[Click here to finish setting up your workspace with Nx Cloud!](https://cloud.nx.app/connect/RFH7Zatavz)

[Learn more about Nx on CI](https://nx.dev/ci/intro/ci-with-nx#ready-get-started-with-your-provider)

## 💡 Nx Console

Install Nx Console for a better developer experience in your IDE:

[Install Nx Console &raquo;](https://nx.dev/getting-started/editor-setup)

Nx Console lets you:
- Run tasks with a GUI
- Generate code easily
- Get better autocompletion
- Available for VSCode and IntelliJ

## 🌐 Community & Support

- [Discord](https://go.nx.dev/community)
- [Follow us on X](https://twitter.com/nxdevtools) or [LinkedIn](https://www.linkedin.com/company/nrwl)
- [Youtube channel](https://www.youtube.com/@nxdevtools)
- [Nx blog](https://nx.dev/blog)

## 📝 License

Private - RocketPartners
