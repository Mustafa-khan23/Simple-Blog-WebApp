# Simple Blog Web App

A simple Express + EJS blog application built for learning CRUD operations. The app lets users view blogs, create new posts, edit existing ones, update full content, and delete posts using a JSON file as a lightweight data store.

## Project Flow

1. The server starts in [index.js](index.js) and serves the app on port 3000.
2. The landing page renders the home view and provides navigation to the blog list.
3. The blog listing page renders all posts from [data/blogs.json](data/blogs.json) in a polished card layout.
4. Clicking a blog opens the detail view where users can read the full content and choose to edit, update, or delete it.
5. Creating a blog writes the new entry back into the JSON file so it appears in the list instantly.

## Features

- View all blog posts
- Read a single blog in a dedicated detail screen
- Create a new blog post
- Edit existing blog content
- Update the full blog entry
- Delete a blog post
- Responsive card-based UI with a modern look

## Tech Stack

- Node.js
- Express.js
- EJS templating engine
- Bootstrap for UI helpers
- JSON file storage for blog data

## Project Structure

- [index.js](index.js) — Express server and route definitions
- [data/blogs.json](data/blogs.json) — blog data storage
- [views/](views/) — EJS templates for home, blogs, details, create, edit, and update pages
- [public/style/style.css](public/style/style.css) — custom styling for the app
- [public/images/](public/images/) — static image assets

## Installation

1. Install dependencies:
   ```bash
   npm install
   ```
2. Start the server:
   ```bash
   node index.js
   ```
3. Open your browser and visit:
   ```text
   http://localhost:3000
   ```

## Usage

- Visit the home page to explore the app.
- Go to the blog list to browse posts.
- Use the Create blog link to add a new post.
- Open a blog to edit or delete it.

## Notes

This project is a beginner-friendly CRUD example and is ideal for learning how Express routes, EJS views, and JSON-based persistence work together.

Created by Mustafa
