# Docker — Run the static portfolio

Build the Docker image from the project root (where `index.html` lives):

```bash
docker build -t jetti-portfolio:latest .
```

Run a container mapping port 8080 on your machine to port 80 in the container:

```bash
docker run --rm -p 8080:80 jetti-portfolio:latest
```

Open http://localhost:8080 to preview the site.

Notes:
- The image uses `nginx:stable-alpine` and serves the files copied into `/usr/share/nginx/html`.
- The repository includes `profile.jpeg` used by the site — keep it in the root so it is copied into the image.
- To rebuild after edits, re-run the `docker build` command above.
