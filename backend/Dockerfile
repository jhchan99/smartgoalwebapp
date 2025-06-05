FROM ghcr.io/astral-sh/uv:python3.12-bookworm

WORKDIR /app

# Copy dependency files first for better caching
COPY pyproject.toml uv.lock ./
RUN uv sync --locked

# Copy the rest of your code
COPY . .

# Expose the port your app runs on
EXPOSE 8080

# Start your FastAPI app - use Cloud Run's PORT environment variable
CMD ["sh", "-c", "uvicorn main:app --host 0.0.0.0 --port ${PORT:-8080}"]
