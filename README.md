# Event Scheduler Application

This Event Scheduler Application allows users to manage their events and schedules effectively. It provides functionalities for creating, updating, deleting, and viewing events. Users can personalize their scheduling page with specific time slots and view them in an organized manner.

## Features

- **User Authentication**: Utilize Clerk for secure user authentication.
- **Dynamic Event Management**: Create, update, and delete events with real-time form validations.
- **Responsive Event Cards**: Display events in a grid layout, with responsive cards that adapt to different screen sizes.
- **Timezone Adjustments**: Automatically adjust event times based on user-specific timezones.
- **Clipboard Integration**: Copy event links to the clipboard for easy sharing.
- **Real-time Feedback**: Provide real-time feedback with custom alert dialogs for actions like deleting events.

## Technology Stack

- **React**: For building the user interface.
- **Next.js**: A React framework for server-rendered applications.
- **TypeScript**: For type-safe code and scalable architecture.
- **Tailwind CSS**: For styling and responsive design.
- **React Hook Form**: For efficient form handling.
- **Zod**: For schema validation to ensure data integrity.
- **Drizzle ORM**: To interact with the database more intuitively.
- **PostgreSQL**: As the backend database.
- **Clerk**: For handling user authentication and management.

## Project Structure

- `components/`: Contains all UI components like buttons, inputs, cards, etc.
- `schema/`: Defines the data models and validation schemas.
- `pages/`: React components for each page.
- `lib/`: Utility functions and helpers like time conversion and formatting.
- `actions/`: Functions to interact with the database and handle CRUD operations.

Run the development server: npm run dev