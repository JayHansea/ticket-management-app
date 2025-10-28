# TicketFlow React - Ticket Management System

A comprehensive ticket management application built with React, TypeScript, and Vite.

## Technology Stack

### Core Framework
- **React 18** - A JavaScript library for building user interfaces
- **TypeScript** - Type-safe JavaScript
- **Vite** - Next-generation frontend build tool

### State Management & Routing
- **Zustand** - A small, fast and scalable bearbones state-management solution
- **React Router** - Declarative routing for React

### Form Management & Validation
- **React Hook Form** - Performant, flexible and extensible forms with easy-to-use validation.
- **Zod/Yup** - Schema validation

### UI Components & Styling
- **shadcn/ui** - A collection of re-usable components built using Radix UI and Tailwind CSS.
- **Radix UI** - Unstyled, accessible components for building high‑quality design systems and web apps.
- **Tailwind CSS** - Utility-first CSS framework
- **PostCSS** - CSS transformations

### Utilities
- **date-fns** - Modern JavaScript date utility library
- **Lucide React** - A simply beautiful open-source icon set.

## Project Structure

```
react/
├── src/
│   ├── components/          # Reusable React components
│   │   ├── layout/
│   │   │   ├── Header.tsx
│   │   │   └── Footer.tsx
│   │   ├── ui/              # shadcn/ui components
│   │   ├── DecorativeCircle.tsx
│   │   ├── TicketCard.tsx
│   │   ├── TicketForm.tsx
│   │   └── WaveBackground.tsx
│   ├── pages/               # Page components
│   │   ├── Landing.tsx
│   │   ├── Login.tsx
│   │   ├── Signup.tsx
│   │   ├── Dashboard.tsx
│   │   ├── TicketManagement.tsx
│   │   └── NotFound.tsx
│   ├── store/               # Zustand stores
│   │   ├── authStore.ts
│   │   └── ticketStore.ts
│   ├── routes/              # React Router configuration
│   │   └── ProtectedRoute.tsx
│   ├── App.tsx              # Root component
│   ├── main.tsx             # Application entry point
│   └── index.css            # Global styles
├── index.html
├── tailwind.config.ts
├── vite.config.ts
└── package.json
```

## Setup Instructions

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn

### Installation

1. **Navigate to the React project directory:**
   ```bash
   cd react
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

### Development

**Start the development server:**
```bash
npm run dev
```

The application will be available at `http://localhost:8080`

### Build for Production

**Create production build:**
```bash
npm run build
```

**Preview production build:**
```bash
npm run preview
```

## Features

### 1. Landing Page
- Welcoming hero section with wavy SVG background
- Decorative circles for visual appeal
- Feature showcase in card-style boxes
- Call-to-action sections
- Fully responsive design
- Max-width 1440px centered layout

### 2. Authentication
- **Login Page**: Email and password authentication
- **Signup Page**: Account creation with name, email, password, and confirmation
- Form validation with React Hook Form and Zod/Yup
- Session management using localStorage
- Protected routes with React Router
- Automatic redirection after authentication

### 3. Dashboard
- Welcome message with user's name
- Statistics cards showing:
  - Total tickets
  - Open tickets
  - In-progress tickets
  - Closed tickets
- Quick action buttons
- Getting started section
- Responsive grid layout

### 4. Ticket Management (CRUD)
- **Create**: Form to add new tickets with validation
- **Read**: Display tickets in card layout with filtering and search
- **Update**: Edit existing tickets inline
- **Delete**: Remove tickets with confirmation dialog
- Search functionality across title and description
- Filter by status (open, in_progress, closed)
- Priority levels (low, medium, high)
- Real-time updates with Zustand state management

## Design System

### Colors (HSL-based)
- **Primary**: `262 83% 58%` (Purple)
- **Primary Glow**: `280 100% 70%` (Bright Purple)
- **Status Colors**:
  - Open: `142 71% 45%` (Green)
  - In Progress: `38 92% 50%` (Amber)
  - Closed: `215 16% 47%` (Gray)

### Layout
- Max container width: 1440px
- Centered horizontally
- Responsive breakpoints: mobile, tablet, desktop
- Consistent spacing with Tailwind utilities

### Components
- **Cards**: Rounded corners, shadows, hover effects
- **Buttons**: Primary, secondary, and destructive variants
- **Forms**: Inline validation, error messages
- **Dialogs**: Modal overlays for forms and confirmations

## State Management

### Auth Store (Zustand)
- User authentication state
- Login/signup/logout functions
- Session persistence
- Token management

### Ticket Store (Zustand)
- Ticket list management
- CRUD operations
- LocalStorage persistence
- Demo data initialization

## Form Validation

### Validation Rules
- **Email**: Valid email format, max 255 characters
- **Password**: Minimum 6 characters, max 100 characters
- **Name**: Required, max 100 characters
- **Title**: Required, max 200 characters
- **Description**: Max 1000 characters
- **Status**: Must be one of: open, in_progress, closed
- **Priority**: Must be one of: low, medium, high

## Routing

### Public Routes
- `/` - Landing page
- `/login` - Login page
- `/signup` - Signup page

### Protected Routes (requires authentication)
- `/dashboard` - Dashboard with statistics
- `/tickets` - Ticket management page

### Error Routes
- `*` - 404 Not Found page

## Security

- Session tokens stored in localStorage
- Protected routes with React Router
- Automatic redirection for unauthorized access
- Session validation on app initialization

## Accessibility

- Semantic HTML elements
- Proper heading hierarchy
- Focus states for interactive elements
- ARIA labels where appropriate
- Keyboard navigation support
- Sufficient color contrast

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Test User Credentials

For testing, you can use any email and password combination:
- **Email**: Any valid email format (e.g., `test@example.com`)
- **Password**: Minimum 6 characters

## Known Issues

- Authentication is simulated using localStorage (not production-ready)
- No backend integration (all data stored locally)
- No real-time collaboration features
- No email notifications

## Future Enhancements

- Backend API integration
- Real authentication system
- File attachments for tickets
- Comments and activity history
- Email notifications
- Team collaboration features
- Advanced filtering and sorting
- Export functionality
- Dark mode toggle

## License

MIT License - feel free to use this project for learning or as a starting point for your own applications.