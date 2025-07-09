# SafeLearn Junior

SafeLearn Junior is an interactive educational web application designed to make learning fun and engaging for children. The app features a variety of learning modules, including math games, quizzes, typing practice, and achievement tracking, all within a safe and user-friendly environment.

## Features

- **Math Zone:** Practice math skills with interactive games.
- **Quiz Corner:** Test knowledge with fun quizzes.
- **Typing Game:** Improve typing speed and accuracy.
- **Achievements:** Track progress and earn rewards.
- **Customizable Settings:** Personalize the learning experience.
- **Modern UI:** Built with React, Next.js, and Radix UI components.
- **Responsive Design:** Works on desktops, tablets, and mobile devices.

## Tech Stack

- **Framework:** Next.js (React)
- **Styling:** Tailwind CSS, Radix UI, Shadcn UI
- **State Management:** React Hooks, React Hook Form
- **Validation:** Zod
- **Other Libraries:** Embla Carousel, Recharts, Lucide Icons, Sonner, Vaul

## Getting Started

### Prerequisites

- Node.js (v18 or higher recommended)
- pnpm (preferred) or npm/yarn

### Installation

1. Clone the repository:
    ```sh
    git clone <repo-url>
    cd safelearn-junior
    ```

2. Install dependencies:
    ```sh
    pnpm install
    # or
    npm install
    # or
    yarn install
    ```

3. Run the development server:
    ```sh
    pnpm dev
    # or
    npm run dev
    # or
    yarn dev
    ```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

### Build for Production

```sh
pnpm build
pnpm start
```

## Scripts

- `pnpm dev` – Start the development server
- `pnpm build` – Build the app for production
- `pnpm start` – Start the production server
- `pnpm lint` – Lint the codebase

## Folder Structure

- `app/` – Main application pages and layout
- `components/` – Reusable UI components
- `hooks/` – Custom React hooks
- `lib/` – Utility functions
- `public/` – Static assets
- `styles/` – Global styles

