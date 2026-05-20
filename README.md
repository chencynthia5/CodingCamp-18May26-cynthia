# My Dashboard

A simple web dashboard with focus timer, to-do list, and quick links.

## Features

- **Greeting** - Shows current time/date with time-based greeting
- **Custom Name** - Enter your name for a personalized greeting
- **Focus Timer** - 25-minute Pomodoro timer with start/stop/reset
- **Custom Timer Duration** - Change timer duration from 1-60 minutes
- **To-Do List** - Add, edit, complete, and delete tasks
- **Quick Links** - Save and open favorite websites
- **Light/Dark Mode** - Toggle between themes

## Tech Stack

- HTML5
- CSS3 (Vanilla)
- JavaScript (Vanilla - no frameworks)
- Local Storage for data persistence

## File Structure

```
index.html          # Main HTML file
css/
  styles.css        # All styles
js/
  app.js            # All JavaScript logic
```

## Local Storage Keys

- `userName` - User's custom name
- `tasks` - Array of to-do items
- `links` - Array of quick links
- `theme` - Current theme (light/dark)

## Deployment

1. Push code to GitHub
2. Go to Settings → Pages
3. Select main branch as source
4. Your site will be live at `https://username.github.io/repo-name/`
