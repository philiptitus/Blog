# Modern Next.js Blog Application

A modern, full-featured blog application built with Next.js 15, TypeScript, and a comprehensive UI component library.

## 🚀 Features

- **Modern Tech Stack**
  - Next.js 15 with App Router
  - TypeScript for type safety
  - Tailwind CSS for styling
  - Radix UI for accessible components
  - Redux Toolkit for state management

- **UI Components**
  - Rich set of accessible components from Radix UI
  - Responsive design
  - Dark/Light theme support
  - Toast notifications
  - Form handling with react-hook-form and zod validation
  - Interactive components (accordions, dialogs, menus, etc.)

## 🛠️ Prerequisites

Before you begin, ensure you have the following installed:
- Node.js (Latest LTS version recommended)
- npm, yarn, or pnpm (package manager)

## 📦 Installation

1. Clone the repository:
```bash
git clone [your-repository-url]
cd [your-project-name]
```

2. Install dependencies:
```bash
# Using npm
npm install

# Using yarn
yarn install

# Using pnpm
pnpm install
```

3. Start the development server:
```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

The application will be available at `http://localhost:3000`

## 🏗️ Project Structure

```
├── app/              # Next.js app directory (pages and layouts)
├── components/       # Reusable UI components
├── context/         # React context providers
├── hooks/           # Custom React hooks
├── lib/             # Utility functions and configurations
├── public/          # Static assets
├── store/           # Redux store configuration
└── styles/          # Global styles and Tailwind configurations
```

## 🚀 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build production application
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

## 🛠️ Built With

- [Next.js](https://nextjs.org/) - React framework
- [TypeScript](https://www.typescriptlang.org/) - Type safety
- [Tailwind CSS](https://tailwindcss.com/) - Utility-first CSS framework
- [Radix UI](https://www.radix-ui.com/) - Unstyled, accessible components
- [Redux Toolkit](https://redux-toolkit.js.org/) - State management
- [React Hook Form](https://react-hook-form.com/) - Form handling
- [Zod](https://zod.dev/) - Schema validation

## 📝 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🤝 Contributing

Contributions, issues, and feature requests are welcome! Feel free to check the issues page.

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request 