# Victula: A Revolutionary Nutrition Tracking Web Application

Victula is a cutting-edge web application that allows users to track their nutrition by analyzing their natural language descriptions of meals. By leveraging the power of AI, Victula estimates macronutrient values for each meal, enabling users to monitor their nutritional intake over time. Additionally, the application offers a tool for users to estimate their nutrition goals based on factors such as age, height, gender, body fat percentage, activity level, and more.

## Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
- [Usage](#usage)
- [Contributing](#contributing)
- [Roadmap](#roadmap)
- [License](#license)
- [Contact](#contact)

## Features

- LLM-powered natural language processing for meal descriptions
- Estimation of macronutrient values for meals
- Tracking of nutritional intake over time
- Nutrition goal estimation based on user-specific factors
- Responsive design for seamless user experience on various devices

## Tech Stack

Victula is built using the following technologies:

- [Next.js](https://nextjs.org/) - A React framework for server-rendered applications
- [Tailwind CSS](https://tailwindcss.com/) - A utility-first CSS framework for rapid UI development
- [Prisma](https://www.prisma.io/) - A next-generation ORM for Node.js and TypeScript
- [Mongo Atlas](https://www.mongodb.com/cloud/atlas) - A fully managed cloud database service
- [Clerk](https://clerk.dev/) - A complete user authentication and management solution
- [Vercel](https://vercel.com/) - A platform for deploying, scaling, and monitoring web applications

## Getting Started

To set up a local copy of Victula, follow these steps:

### Prerequisites

- [Node.js](https://nodejs.org/) (v12 or higher)
- [npm](https://www.npmjs.com/) (v6 or higher)
- [MongoDB Atlas account](https://www.mongodb.com/cloud/atlas/register)

### Installation

1. Clone the repository:

   ```
   git clone https://github.com/finnelliott/victula.git
   ```

2. Change to the project directory:

   ```
   cd victula
   ```

3. Install dependencies:

   ```
   npm install
   ```

4. Update .env.example with your API keys and database URI, and rename the file to .env.local.

5. Start the development server:

   ```
   npm run dev
   ```

6. Open your browser and navigate to `http://localhost:3000` to view the application.

## Usage

1. Sign up for an account or log in using your existing credentials.
2. Add meals by providing a natural language description of what you've eaten.
3. View the estimated macronutrient values for each meal.
4. Track your nutritional intake over time.
5. Use the nutrition goal estimation tool to set personalized goals based on your age, height, gender, body fat percentage, activity level, and more.

## Contributing

I'm not currently accepting contributions, but feel free to fork the repository and make your own version!

## Roadmap

In the near future, we plan to expand Victula's availability to mobile devices using React Native. Stay tuned for updates!

## Contact

If you have any questions or feedback, feel free to reach out to me:

- Email: [finn@finnelliott.com](mailto:finn@finnelliott.com)
- Twitter: [@finnelliott0](https://twitter.com/finnelliott0)

We appreciate your interest in Victula!