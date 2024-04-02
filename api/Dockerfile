FROM registry.docker.com/library/ruby:3.1.4-slim as base

# Rails app lives here
WORKDIR /tag-api

# Set production environment
ENV BUNDLE_PATH="/usr/local/bundle" 
# Configure bundle path
RUN bundle config --local set path 'vendor/bundle'

# Throw-away build stage to reduce size of final image
FROM base as build

# Install packages needed to build gems
RUN apt-get update -qq && \
    apt-get install --no-install-recommends -y build-essential git libpq-dev

# Install application gems
COPY Gemfile Gemfile.lock ./
RUN bundle install && \
    rm -rf ~/.bundle/ "${BUNDLE_PATH}"/ruby/*/cache "${BUNDLE_PATH}"/ruby/*/bundler/gems/*/.git

# Copy application code
COPY . .

# Final stage for app image
FROM base

# Install packages needed for deployment
RUN apt-get update -qq && \
    apt-get install --no-install-recommends -y curl libvips postgresql-client && \
    rm -rf /var/lib/apt/lists /var/cache/apt/archives

# Copy built artifacts: gems, application
COPY --from=build /usr/local/bundle /usr/local/bundle
COPY --from=build /tag-api /tag-api

# Prepare the directory structure
RUN mkdir -p tmp/pids

# Run and own only the runtime files as a non-root user for security
RUN useradd rails --create-home --shell /bin/bash && \
    chown -R rails:rails db log storage tmp
USER rails:rails

# Entrypoint prepares the database.
ENTRYPOINT ["/tag-api/bin/docker-entrypoint"]

# Start the server by default, this can be overwritten at runtime
EXPOSE 4000
CMD ["./bin/rails", "server"]

