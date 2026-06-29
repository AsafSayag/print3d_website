# Print3D Premium Website

A static multi-page website for Print3D, built with HTML and a custom design system.

## Pages

| Page | File |
|------|------|
| Home | `Home.dc.html` |
| About | `About.dc.html` |
| Portfolio | `Portfolio.dc.html` |
| Blog | `Blog.dc.html` |
| Article | `Article.dc.html` |
| Clients | `Clients.dc.html` |
| Contact | `Contact.dc.html` |

## Running the Website

Open a terminal and run:

```bash
cd "/Users/asafsayag/Downloads/Print3D Premium Website (1)" && python3 -m http.server 8080
```

Then open your browser and go to:

**http://localhost:8080/Home.dc.html**

To stop the server, press `Ctrl + C` in the terminal.

## Project Structure

```
.
├── Home.dc.html          # Main entry point
├── *.dc.html             # Additional pages
├── assets/               # Images and videos
│   ├── logo-print3d-transparent.png
│   ├── hero-model.png
│   └── hero-demo.mp4
├── _ds/                  # Design system (tokens, styles, components)
├── uploads/              # Uploaded media files
└── support.js            # Shared JS utilities
```
