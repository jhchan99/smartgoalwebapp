FROM ghcr.io/astral-sh/uv:python3.12-bookworm

WORKDIR /app

# Copy dependency files first for better caching
COPY pyproject.toml uv.lock ./
RUN uv sync --locked

# Copy the rest of your code
COPY . .

# Expose the port your app runs on
EXPOSE 8080

# Start your FastAPI app
CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8080"]
