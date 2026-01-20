Organa

A modular, enterprise‑grade workspace platform designed for organizations that need clean access management, dynamic data tools, and a unified UI for daily operations. Organa is built with a scalable React/Next.js architecture and a tab‑driven workspace inspired by professional systems like Genesys Workspace.

🌐 Overview
Organa centralizes organizational workflows into a single, intuitive interface. It provides:
- Secure sign‑in and registration flows
- Role‑based access management
- Dynamic tab‑driven navigation
- Modular admin tools
- JSON‑driven form and table creation
- Dashboard building
- Knowledge base management
- Profile and status controls
This README outlines the current features, how to run the project, and how to test each module.

📦 Dependencies
Organa is built using a modern, lightweight stack:
|  |  | 
|  |  | 
|  |  | 
|  |  | 
|  |  | 
|  |  | 
|  |  | 


Install dependencies
npm install



🔐 Sign In & Registration
Organa includes a secure authentication flow designed for multi‑tenant organizations.
Sign In
Users must provide:
- Organization Code
- Organization Email
- Password
The sign‑in component validates credentials and loads the user’s workspace based on their assigned roles.
Registration
Organization registration requires:
- At least one Organization Manager
- Organization details
- Automatic billing setup (Stripe integration planned)
Testing Authentication
- Start the dev server:
npm run dev
- Navigate to /signin
- Use test credentials from your local Supabase or mock API
- Confirm:
- Invalid credentials show proper errors
- Valid credentials route to /home
- Role‑based UI loads correctly

🧭 Navigation Structure
Organa uses a workspace‑within‑a‑workspace model:
/pages
  index.js        → Landing page
  signin.js       → User login
  register.js     → Organization registration
  home.js         → Main workspace
  howto.js        → Public knowledge base
  knowledge.js    → Private knowledge base

/components
  /layout
    navbar.js
    sidebar.js
    footer.js
    workspace.js  → Dynamic tab container

  /tabs
    tables.js
    dashboards.js
    admin.js

  /tabcomponents
    /tables
      search.js
      create.js
    /dashboards
      grid.js
      gridedit.js
    /admin
      nav.js
      users.js
      roles.js

/profile
  profile.js

/knowledge
  nav.js
  sidenav.js
  create.js
  edit.js
  retire.js


Testing Navigation
- Open /home after signing in
- Click through tabs (Tables, Dashboards, Admin)
- Confirm:
- Tabs open inside the workspace container
- Closing a tab removes its state
- Sidebar and navbar update based on role

📊 Current Features & How to Test Them
1. Tables (Forms + Data Viewer)
- Create new forms
- Render fields dynamically from JSON schema
- View table data
- Delete forms/tables safely
Test:
- Create a form → verify fields render
- Submit data → confirm table updates
- Delete form → ensure UI refreshes without errors

2. Dashboards
- Add grid blocks
- Edit grid contents
- Attach tables/charts to blocks
Test:
- Add a grid block
- Edit it and attach a table
- Confirm layout updates instantly

3. Admin Panel
Includes:
- User management
- Role creation
- Role assignment
- Access control for pages, tabs, and data
Test:
- Create a role
- Assign it to a user
- Log in as that user
- Confirm restricted tabs/pages are hidden or disabled

4. Knowledge Base
Two modes:
- Public How‑To (no login required)
- Private Knowledge Base (requires Knowledge Admin role)
Test:
- Create an article
- Edit it
- Retire it
- Confirm visibility rules

5. Profile Popup
- Clock in/out
- Change status
- Access settings
- View workload (coming soon)
Test:
- Open profile
- Change status
- Confirm UI updates globally

🧪 Testing Checklist
|  |  | 
|  |  | 
|  |  | 
|  |  | 
|  |  | 
|  |  | 
|  |  | 
|  |  | 



🚀 Running the Project
npm run dev


Visit:
http://localhost:3000



🛠️ Development Notes
- All types are inline (no external type folders)
- Architecture prioritizes clarity and momentum
- Dead code is removed aggressively
- UI logic is unified and modular
- Forms and tables are JSON‑driven for maximum flexibility

If you want, I can also generate a badge section, screenshots section, or a roadmap to make the README feel even more polished for your portfolio.
