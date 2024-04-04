# syntax = docker/dockerfile:1
FROM ruby:3.1.4

# Set working directory
WORKDIR /app

# Copy Gemfile and Gemfile.lock and install gems
COPY Gemfile Gemfile.lock ./
RUN bundle install

# Copy the rest of the application code
COPY . .

# Expose port 4000 to the Docker host, so it can be accessed from the outside
EXPOSE 4000

# Entrypoint prepares the database.
ENTRYPOINT ["/app/bin/docker-entrypoint"]

CMD ["bin/rails", "server", "-p", "4000", "-b", "0.0.0.0"]
