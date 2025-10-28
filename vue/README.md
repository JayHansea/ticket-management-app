# TicketFlow Vue.js - Ticket Management System

A comprehensive ticket management application built with Vue.js, TypeScript, and Vite.

## Technology Stack

### Core Framework
- **Vue.js 3** - Progressive JavaScript framework with Composition API
- **TypeScript** - Type-safe JavaScript
- **Vite** - Next-generation frontend build tool

### State Management & Routing
- **Pinia** - Official state management for Vue
- **Vue Router** - Official router for Vue.js

### Form Management & Validation
- **VeeValidate** - Form validation library for Vue
- **Yup** - Schema validation

### Styling
- **Tailwind CSS** - Utility-first CSS framework
- **PostCSS** - CSS transformations

### Utilities
- **date-fns** - Modern JavaScript date utility library

## Project Structure

```
vue-ticket-app/
├── src/
│   ├── components/          # Reusable Vue components
│   │   ├── Header.vue
│   │   ├── Footer.vue
│   │   ├── WaveBackground.vue
│   │   ├── DecorativeCircle.vue
│   │   ├── TicketCard.vue
│   │   └── TicketForm.vue
│   ├── views/              # Page components
│   │   ├── Landing.vue
│   │   ├── Login.vue
│   │   ├── Signup.vue
│   │   ├── Dashboard.vue
│   │   ├── TicketManagement.vue
│   │   └── NotFound.vue
│   ├── stores/             # Pinia stores
│   │   ├── authStore.ts
│   │   └── ticketStore.ts
│   ├── router/             # Vue Router configuration
│   │   └── index.ts
│   ├── App.vue             # Root component
│   ├── main.ts             # Application entry point
│   └── style.css           # Global styles
├── index.html
├── tailwind.config.js
├── vite.config.ts
└── package.json
```

## Setup Instructions

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn

### Installation

1. **Navigate to the Vue project directory:**
   ```bash
   cd vue
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Install required packages:**
   ```bash
   npm install vue-router pinia yup vee-validate @vee-validate/yup date-fns
   npm install -D tailwindcss postcss autoprefixer
   npx tailwindcss init -p
   ```

### Development

**Start the development server:**
```bash
npm run dev
```

The application will be available at `http://localhost:5173`

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
- Form validation with VeeValidate and Yup
- Session management using localStorage
- Protected routes with navigation guards
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
- Real-time updates with Pinia state management

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

### Auth Store (Pinia)
- User authentication state
- Login/signup/logout functions
- Session persistence
- Token management

### Ticket Store (Pinia)
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
- Protected routes with navigation guards
- Automatic redirection for unauthorized access
- Session validation on app initialization
- XSS protection through Vue's template system

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
