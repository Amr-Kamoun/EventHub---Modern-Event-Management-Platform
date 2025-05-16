# EventHub - Modern Event Management Platform

EventHub is a full-featured event management platform built with React, Tailwind CSS, and Supabase. It enables users to discover, register for, and manage events while providing organizers with powerful tools to create and manage their events.

🎥 [Watch Demo Video](https://drive.google.com/file/d/1DyZXsMKkv_15FctrKz7IUm6BS2ASbNMJ/view?usp=sharing)

## Features

- 🔐 **User Authentication**
  - Email/password sign up and login
  - Protected routes for authenticated users
  - Role-based access control

- 📅 **Event Management**
  - Browse and search events
  - Advanced filtering options
  - Detailed event pages
  - Event registration and ticketing
  - Categories and tags

- 👤 **User Profiles**
  - Personal information management
  - Event registration history
  - Saved events
  - User preferences

- 🛠 **Admin Dashboard**
  - Event creation and management
  - User management
  - Analytics and reporting
  - Role assignment

## Tech Stack

- **Frontend**: React, React Router, Tailwind CSS
- **Backend**: Supabase (Authentication, Database, Storage)
- **State Management**: React Context
- **Forms**: Native React forms
- **Styling**: Tailwind CSS with custom configuration
- **Icons**: React Icons
- **Date Handling**: date-fns
- **Notifications**: react-hot-toast

## Getting Started

1. Clone the repository:
   ```bash
   git clone git clone https://github.com/amrkamoun/ATC_01099011493.git
   cd eventhub
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

> **Note**: For the smoothest experience, it's recommended to use incognito mode when testing the application.

3. Set up environment variables:
   Create a `.env` file in the root directory with your Supabase credentials:
   ```
   VITE_SUPABASE_URL=your_supabase_url
   VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
   ```

4. Start the development server:
   ```bash
   npm run dev
   ```

5. Set up your Supabase database:
   ```
   Ensure your Supabase project contains the required tables and RLS policies.
   SQL schema/migration files are located in:
   /supabase/migrations/
   ```
   See the [Backend Setup](#backend-setup-supabase) section for detailed instructions.

## 🔐 Demo Accounts

Use the following demo accounts to test the app:

| Role  | Email              | Password  |
|-------|-------------------|-----------|
| Admin | admin@example.com | Admin123! |
| User  | user@example.com  | User123!  |

## Project Structure

```
ATC_01099011493/
├── src/
│   ├── components/      # Reusable UI components
│   ├── contexts/        # React Context providers
│   ├── lib/            # Utility functions and API clients
│   ├── pages/          # Page components
│   └── styles/         # Global styles and Tailwind config
├── public/             # Static assets
└── supabase/          # Database migrations and seed data
```

## Database Schema

- **profiles**: User profiles and roles
- **events**: Event details and metadata
- **registrations**: Event registrations and tickets

## Backend Setup (Supabase)

This project uses Supabase as the backend platform. Follow these instructions to set up the backend:

1. Create a new project on [supabase.com](https://supabase.com/)
2. Create the required tables:
   - `profiles`
   - `events`
   - `registrations`

3. Apply RLS (Row-Level Security) policies:
   - Enable RLS on all tables
   - Create policies to restrict access to authenticated users only

4. Run SQL setup files (optional):
   SQL files are located in:
   `/supabase/migrations/`

### Tables Overview

| Table        | Purpose                              |
|--------------|---------------------------------------|
| `profiles`   | User info and role (admin/user)       |
| `events`     | Event data (title, date, location…)   |
| `registrations` | Bookings linked to user + event     |

### Environment Variables

For the application to connect to your Supabase backend, you'll need to set up the following environment variables in your `.env` file:

```
VITE_SUPABASE_URL=your-supabase-url
VITE_SUPABASE_ANON_KEY=your-anon-key
```

## Security

- Row Level Security (RLS) policies protect data access
- Role-based access control for admin features
- Secure authentication via Supabase Auth

## Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Open a Pull Request

## 📝 Areeb Technology Competition Submission

- **Student Name**: Amr Kamoun
- **Graduation Year**: 2025
- **GitHub Repository Format**: `ATC_01099011493`
- **Public Repository**: ✅
- **README Included**: ✅
- **Setup Instructions**: ✅
- **Supabase SQL Files**: Located in `supabase/migrations/`

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- [Supabase](https://supabase.com/) for the backend infrastructure
- [Tailwind CSS](https://tailwindcss.com/) for the styling system
- [React Icons](https://react-icons.github.io/react-icons/) for the icon set
- [Pexels](https://www.pexels.com/) for the stock photos


