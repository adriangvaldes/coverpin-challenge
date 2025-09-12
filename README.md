Mini Seller Console
A lightweight, responsive, and performant front-end application built with React and Tailwind CSS to triage and manage sales leads. This project was developed as a technical challenge to demonstrate best practices in React development, state management, and component architecture.

✨ Features
This application provides a comprehensive set of features to manage a sales pipeline efficiently.

Core Requirements (MVP)
Leads List:

Loads and displays a list of leads from a local JSON file.

Search: Dynamically search for leads by name or company.

Filter: Filter the list by lead status (New, Contacted, Qualified, etc.).

Sort: The list is automatically sorted by the lead's score in descending order.

Lead Detail Panel:

Clicking on any lead in the table opens a smooth slide-over panel with detailed information.

Inline Editing: The lead's status and email can be edited directly within the panel.

Email Validation: Includes real-time, client-side validation for the email format.

Save/Cancel Actions: Provides clear actions to save changes or cancel the operation.

Simulated Latency: All data operations (load, save) use a setTimeout to simulate real-world network latency.

Convert to Opportunity:

A "Convert Lead" button in the detail panel allows for easy conversion.

When a lead is converted, it is removed from the leads list and a new record is created in the "Opportunities" list.

UX & States:

Loading State: A spinner is displayed while the initial data is being loaded.

Empty State: A clear message is shown if no leads match the current search/filter criteria or if there are no opportunities.

Error Handling: A basic error state is implemented to handle simulated API failures during save operations.

Nice-to-Haves Implemented
✅ Persistent Filters: The search term and status filter are saved to localStorage, so your preferences are maintained even after refreshing the page.

✅ Responsive Layout: The application is fully responsive and provides an optimal viewing experience on both desktop and mobile devices.

🛠️ Tech Stack
React: Core library for building the user interface.

Vite: A modern and extremely fast build tool for front-end development.

Tailwind CSS: A utility-first CSS framework for rapid and responsive UI design.

React Hooks: Extensive use of useState, useEffect, useMemo, and useCallback for efficient and clean state management.

🚀 Getting Started
To run this project locally, follow these simple steps.

Prerequisites
Node.js (v18 or later recommended)

npm or yarn

Installation & Setup
Clone the repository:

git clone [https://github.com/your-username/mini-seller-console.git](https://github.com/your-username/mini-seller-console.git)
cd mini-seller-console

Install dependencies:

npm install

Run the development server:

npm run dev

The application will be available at http://localhost:5173.

🏛️ Architectural Notes & Decisions
As the goal of this challenge was to assess code structure and quality, here are some key architectural decisions made:

Component-Based Architecture: The application is broken down into logical and reusable components (e.g., DetailPanel, StatusBadge), even within a single file, to promote separation of concerns and maintainability.

Efficient State Management: Instead of using useEffect to manage the filtered list, useMemo is used. This is a more performant approach in React as it avoids unnecessary re-calculations on every render, only re-computing the list when leads, searchTerm, or statusFilter actually change. This demonstrates a deeper understanding of React's rendering lifecycle.

Custom Hooks: A custom hook, usePersistentState, was created to abstract the logic for interacting with localStorage. This makes the main App component cleaner and the persistence logic reusable.

Simulated Asynchronicity: All data operations are wrapped in Promises and use setTimeout to realistically simulate the asynchronous nature of working with a real-world backend API, including handling loading and error states correctly.