🌿 Supabase Natural Hair Recipe App – Frontend
Project Overview
This is the frontend for a CRUD-based Natural Hair Recipe App. Users can add, view, update, and delete DIY natural hair care recipes such as masks, cleansers, and moisturizers.

The app is connected to a Supabase backend via RESTful edge functions and showcases real-time, user-driven interaction with recipe data. Users can filter recipes by category and preview image URLs.

1. Clone the Repository
git clone <your-frontend-repo-url>
cd <project-directory>

2. Install Dependencies
npm install

3. Configure Supabase
SUPABASE_URL=https://your-project.supabase.co
SUPABASE_ANON_KEY=your-anon-key
PORT=3000

4. Run the App Locally
node server.js

Database Management
This app uses Supabase as its backend database.

Your frontend connects to a companion backend hosted on Supabase Edge Functions, which handles the actual CRUD operations through the /api/recipes endpoint.

 Backend Repo

 Testing
You may test your application using:

✅ Manual testing: Try submitting forms, editing, and deleting recipes in the browser.

✅ Unit tests: Tests written using React Testing Library (see App.test.jsx)

✅ Error handling: Manual and automatic UI feedback for fetch failures.

Example command to run tests:
npm test

