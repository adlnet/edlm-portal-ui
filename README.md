# EDLM Portal

A Next.js-based web portal for enterprise digital learning management, built with React, Tailwind CSS, and integrated with xAPI for learning analytics.

## Prerequisites

Before you begin, ensure you have the following installed:
- [Node.js](https://nodejs.org/) (version 14.x or higher)
- [Yarn](https://yarnpkg.com/) package manager

## Getting Started

## Adjacent Applications 

The EDLM portal connects to two backend applications that can also be run and connected locally.
Without these applications running there will be no user signed in and most of the functionality will not work.

- [Portal Backend](https://github.com/adlnet/edlm-portal-backend) strictly for the edlm portal
- [XDS Backend](https://github.com/adlnet/ecc-openlxp-xds) for both the portal and XDS UI 

See how to run these applications in their respective readme files.

## Environment Configuration

The application requires environment variables to connect to backend services. 

1. Copy the example environment file:
```bash
cp .env.example .env.local
```

2. Configure the following variables in `.env.local`:

| Variable | Description | 
|----------|-------------|
| `NEXT_PUBLIC_PORTAL_BACKEND_HOST` | EDLM Portal Backend API URL |
| `NEXT_PUBLIC_XDS_BACKEND` | XDS Backend API URL |
| `NEXT_PUBLIC_ECCR_API` | ECCR (CASS) API endpoint |
| `NEXT_PUBLIC_ECCR_DOTE_UUID` | ECCR (CASS) DOTE UUID identifier |
| `NEXT_PUBLIC_ECCR_TYPE` | ECCR (CASS) integration type |
| `NEXT_PUBLIC_MOODLE_LEADER_REPORT_URL` | Moodle leader report URL |
| `NEXT_PUBLIC_MOODLE_ALL_COURSES` | Moodle all courses URL |
| `NEXT_PUBLIC_LRS_API` | LRS API |


### Installation

First, install all project dependencies using Yarn:

```bash
yarn install
```

This command will:
- Install all dependencies listed in `package.json`
- Create a `node_modules` directory with all required packages
- Generate a `yarn.lock` file to ensure consistent dependency versions across different environments

### Development

To start the development server:

```bash
yarn dev
```

This will:
- Start the Next.js development server
- Open the application at [http://localhost:3000](http://localhost:3000)
- Enable hot-reloading - the page will automatically reload when you make changes
- Display lint errors and warnings in the console

### Production Build

To create an optimized production build:

```bash
yarn build
```

Then start the production server:

```bash
yarn start
```

## Available Scripts

### `yarn dev`
Runs the Next.js app in development mode with hot-reloading enabled.

### `yarn build`
Builds the app for production to the `.next` folder with optimized bundles.

### `yarn start`
Starts the production server using the custom `server.js` configuration.

### `yarn lint`
Runs Next.js linting to check for code quality issues.

### `yarn test`
Launches Jest test runner with coverage reporting (single worker mode).

### `yarn coverage`
Runs tests in watch mode with detailed coverage reporting.

### `yarn test:e2e-ci`
Runs Cypress end-to-end tests in CI mode using Chrome browser.

## Project Structure

```
edlm-portal/
├── src/
│   ├── components/       # Reusable React components
│   │   ├── buttons/      # Button components
│   │   ├── cards/        # Card components
│   │   ├── inputs/       # Form input components
│   │   ├── layouts/      # Layout components
│   │   ├── menus/        # Menu and navigation components
│   │   ├── modals/       # Modal dialog components
│   │   └── tables/       # Table components
│   ├── config/           # Configuration files
│   │   ├── axiosConfig.js    # Axios HTTP client setup
│   │   ├── endpoints.js      # API endpoint definitions
│   │   ├── timeConstants.js  # Time-related constants
│   │   └── xAPIConfig.js     # xAPI learning analytics config
│   ├── contexts/         # React Context providers
│   │   ├── ApplicationContext.js  # Application state management
│   │   ├── AuthContext.js         # Authentication state
│   │   └── CompetencyContext.js   # Competency data management
│   ├── hooks/            # Custom React hooks
│   │   ├── useCompetencySearch.js # Competency search functionality
│   │   ├── useCourseSearch.js     # Course search functionality
│   │   ├── useMoodleSession.js    # Moodle integration
│   │   └── ...                    # Many more custom hooks
│   ├── pages/            # Next.js page components (file-based routing)
│   │   ├── _app.js       # Custom App component
│   │   └── index.js      # Home page
│   ├── utils/            # Utility functions and helpers
│   └── __tests__/        # Jest test files
│       ├── components/   # Component tests
│       ├── contexts/     # Context tests
│       ├── hooks/        # Hook tests
│       └── pages/        # Page tests
├── cypress/              # Cypress E2E tests
│   ├── e2e/              # E2E test specs
│   └── fixtures/         # Test fixtures
├── public/               # Static assets
├── coverage/             # Test coverage reports
└── config files          # Various configuration files

```

## Tech Stack

- **Framework**: [Next.js 15.4](https://nextjs.org/) - React framework with SSR and routing
- **UI Library**: [React 18.3](https://reactjs.org/) - Component-based UI library
- **Styling**: [Tailwind CSS 3.4](https://tailwindcss.com/) - Utility-first CSS framework
- **Component Library**: [Flowbite React](https://flowbite-react.com/) - UI components built on Tailwind
- **State Management**: React Query - Server state management
- **Forms**: React Hook Form - Form validation and handling
- **HTTP Client**: Axios - Promise-based HTTP client with retry logic
- **Charts**: ApexCharts - Data visualization
- **Learning Analytics**: xAPI - Experience API for learning data tracking
- **Testing**: Jest & Cypress - Unit and E2E testing
- **Icons**: Heroicons - SVG icon library

## Key Features

### Authentication & Context
- `AuthContext` - Manages user authentication state and permissions
- `ApplicationContext` - Global application state management
- `CompetencyContext` - Handles competency framework data

### Course Management
- Course search and filtering
- Course progress tracking
- Saved course collections
- Course recommendations ("More Courses Like This")
- Spotlight courses

### Competency Framework
- Competency search and tracking
- Competency development plans
- Competency charting and visualization
- Knowledge, Skills, and Abilities (KSA) descriptions

### User Features
- Interest lists management
- Saved searches
- User collections
- List subscriptions

### Analytics & Reporting
- xAPI integration for learning analytics
- Course progress details
- Competency charts

## Configuration

- **Next.js**: [next.config.js](next.config.js)
- **Tailwind CSS**: [tailwind.config.js](tailwind.config.js)
- **Jest**: [jest.config.js](jest.config.js)
- **Cypress**: [cypress.config.js](cypress.config.js)
- **PostCSS**: [postcss.config.js](postcss.config.js)

## Docker Support

The project includes a [Dockerfile](Dockerfile) for containerized deployment.

## Learn More

- [Next.js Documentation](https://nextjs.org/docs)
- [React Documentation](https://reactjs.org/)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [Yarn Documentation](https://yarnpkg.com/getting-started)

## Helpful Notes 

- The application tab was not fully developed. Some functionality is there but it is not fully connected to the backend api's. 

