# Vendor Directory – Setup & Overview

## Setup Instructions

1. **Install dependencies**  
   Run the following command in your project root:

   ```bash
   npm install
   ```

2. **Start the development server**  
   Launch the app locally with:

   ```bash
   npm run dev
   ```

   This will start Vite’s development server. Open the provided local URL (usually `http://localhost:5173`) in your browser.

3. **Lint your code**  
   To check for code quality and style issues, run:

   ```bash
   npm run lint
   ```

4. **Build for production**  
   To create an optimized production build:

   ```bash
   npm run build
   ```

5. **Preview the production build**  
   After building, you can preview the production build locally:
   ```bash
   npm run preview
   ```

> **Requirements:**
>
> - Node.js (v18+ recommended)
> - npm (v9+ recommended)

---

## Project Overview & Approach

This project is a modern React + TypeScript application bootstrapped with Vite for fast development and hot module reloading. It uses Tailwind CSS for utility-first styling and includes a custom UI component library for consistent design. The main feature is a **Vendor Directory**: a searchable, filterable list of business partners, with each vendor displayed in a card format. Users can filter vendors by industry, search by company name, and toggle to show only verified vendors.

The codebase is organized for scalability and maintainability. Components are modular and reusable, with clear separation between UI, logic, and data. TypeScript ensures type safety across the app, and ESLint is configured for both JavaScript and React best practices. The project uses Vite’s aliasing for clean imports and includes sample data for immediate exploration. This setup provides a solid foundation for further extension, such as integrating a backend or expanding the UI.
