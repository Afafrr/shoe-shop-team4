# Contributing to Shoe-shop-team-4

## Table of Contents

1. [How to Contribute](#how-to-contribute)
2. [Getting Started](#getting-started)
3. [Coding Standards](#coding-standards)
4. [Commit Messages](#commit-messages)
5. [Pull Request Process](#pull-request-process)

## How to Contribute

- Clone the repository
- Create a new branch from the `develop` branch for your feature or bugfix (`git checkout -b feature-name`).
- Make your changes.
- Submit a pull request with a description of your changes from your branch into `develop` branch.

## Getting Started

1. **Clone the Repository**: Use the following command to clone the repository to your local machine:

   ```bash
   git clone https://github.com/AlexMaderaP/shoe-shop-team-4.git
   cd project-name
   ```

2. **Install Dependencies**: Install the required dependencies by running:

   ```bash
   npm install
   ```

3. **Run the Project**: Start the project locally:

   ```bash
   npm run dev
   ```

## Coding Standards

- Use meaningful variable and function names.

- Use `camelCase` for variable and function names, and `PascalCase` for component names. This helps to distinguish between different types of code entities.

- **Mobile View Breakpoints**: Design the mobile view using the `MD` breakpoint from Material UI library.

- **Component Organization**: Place components related to a specific page inside a `_components` folder within the route where they will be used. This helps keep the project organized and modular. Example structure:

  ```
  app/
  ├── some-page/
  │   ├── _components/
  │   │   ├── SomeComponent.tsx
  ├── another-page/
  │   ├── _components/
  │   │   ├── SpecificComponent.tsx
  │   └── page.tsx
  ```

- **Shared Components**: If a component is used across multiple pages or throughout the application, place it in a common `components/` directory at the root level of the project. This directory should contain only reusable components.

- **Default Exports**: Use `export default` for components. This allows for consistent and predictable imports across the codebase. For example:

  ```typescript
  export default function MyComponent() {
    // component logic
  }

  // Import
  import MyComponent from "./MyComponent";
  ```

- **Type Definitions for Component Props**: Define the types for component props using TypeScript's `type` keyword. Define the type directly above the component definition for clarity. Here's an example:

  ```typescript
  // Define the props type
  type MyComponentProps = {
    title: string;
    isActive: boolean;
    onClick: () => void;
  };

  export default function MyComponent({
    title,
    isActive,
    onClick,
  }: MyComponentProps) {
    // component logic
  }
  ```

## Commit Messages

Please use clear and concise commit messages. A good commit message should be structured as follows:

- `feat`: A new feature
- `fix`: A bug fix
- `docs`: Documentation updates
- `style`: Code style changes (formatting, etc.)
- `refactor`: Refactoring existing code
- `test`: Adding or updating tests
- `chore`: Maintenance or minor updates

# Pull Request Process

All individual pull requests should be directed to the `develop` branch. Once a feature is fully implemented, a pull request to the `main` branch will be made, which will be checked by our mentors.

Please follow these steps when submitting a pull request:

1. **Ensure your code is up-to-date**: Before you start working on a new feature or bugfix, make sure your local repository is synchronized with the latest changes from the remote `develop` branch. This helps to avoid merge conflicts later on.

   ```bash
   git checkout develop
   git pull origin develop
   ```

2. **Create a Feature Branch**: Create a new branch for your feature or bugfix. Use a naming convention that includes your initials and the feature name. For example, `am-navbar`.

   ```bash
   git checkout -b your-branch-name
   ```

3. **Make Your Changes**: Implement your feature or fix the bug in your newly created branch. Make sure to test your changes locally before proceeding to the next steps.

4. **Run a Build**: Before pushing your code to the repository, run a build of the application to ensure that everything is working fine and there are no build errors. This step helps catch any issues early and maintain the stability of the codebase.

   ```bash
   npm run build
   ```

5. **Commit Your Changes**: Write clear and concise commit messages that describe your changes.

6. **Push to Your Fork**: Push your changes to the repo:

   ```bash
   git push origin your-branch-name
   ```

7. **Create a Pull Request**: Navigate to the original repository on GitHub and create a pull request from your fork to the `develop` branch. Make sure to add a descriptive title and include any relevant information or context in the description of the pull request. If necessary, mention specific changes or areas that require attention. Also, add reviewers who can help review your changes.

8. **Review Process**: A minimum of two project maintainers must review and approve your pull request before it is merged. Maintain communication with the reviewers if further clarifications or changes are needed.

9. **Respond to Feedback**: Be prepared to make changes based on the feedback received during the review process. Update your branch with the requested changes and push the updates. The pull request will be updated automatically with your changes. Continue the cycle of feedback and updates until your pull request is approved.

10. **Merge the Pull Request**: Once the pull request has received the necessary approvals, a project maintainer will merge it into the `develop` branch.
