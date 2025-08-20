# Joton (যত্ন)

### Healthcare with hope.

[![Vercel Deployment](https://vercel.com/button)](https://joton.vercel.app/)

**Joton** is a comprehensive, full-stack Hospital Management System (HMS) designed as a portfolio piece to showcase modern web development practices. The name "Joton" (যতন) means **"Care"** in Bangla, reflecting the project's core mission to provide a seamless, intuitive, and hopeful healthcare management experience.

This application is built with a modern architecture, featuring a Next.js frontend and a NestJS backend, and is designed to be scalable, maintainable, and user-friendly.

---

## ✨ Features

-   **Multi-Role Authentication:** Secure login and registration for different user roles (Admin, Doctor, Patient) using Google OAuth.
-   **Dynamic, Role-Based Dashboards:** Customized dashboards that provide relevant information and actions based on the user's role.
-   **Appointment Scheduling:** An intuitive system for patients to book appointments and for doctors to manage their schedules.
-   **Profile Management:** Users can view and update their personal and professional information.
-   **Inventory Systems:** (In Development) Modules for managing pharmacy and blood bank inventories.
-   **Notification System:** (In Development) Real-time announcements and notifications for users.

---

## 🛠️ Tech Stack

-   **Frontend:** [Next.js](https://nextjs.org/) (with App Router), [TypeScript](https://www.typescriptlang.org/), [Tailwind CSS](https://tailwindcss.com/)
-   **Backend:** [NestJS](https://nestjs.com/), [TypeScript](https://www.typescriptlang.org/)
-   **Database:** [MongoDB](https://www.mongodb.com/)
-   **Authentication:** [NextAuth.js](https://next-auth.js.org/)
-   **Deployment:** [Vercel](https://vercel.com/)

---

## 🚀 Getting Started

To get a local copy up and running, follow these simple steps.

### Prerequisites

-   Node.js (v18 or later)
-   pnpm (or npm/yarn/bun)
-   A MongoDB database instance (local or from Atlas)

### Installation

1.  **Clone the repository:**
    ```sh
    git clone https://github.com/sheikhmahmudulhasanshium/joton.git
    ```
2.  **Navigate to the project directory:**
    ```sh
    cd joton
    ```
3.  **Install dependencies:**
    ```sh
    pnpm install
    ```
4.  **Set up environment variables:**
    Create a `.env.local` file in the root of the project by copying the example file:
    ```sh
    cp .env.example .env.local
    ```
    Then, fill in the necessary variables (e.g., `DATABASE_URL`, `NEXTAUTH_SECRET`, `GOOGLE_CLIENT_ID`, `GOOGLE_CLIENT_SECRET`).

5.  **Run the development server:**
    ```sh
    pnpm dev
    ```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

---

## 🚀 Deployment

The easiest way to deploy this Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out the [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

---

## 📜 License

Distributed under the MIT License. See `LICENSE` for more information.