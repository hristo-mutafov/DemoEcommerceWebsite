# Use the official PostgreSQL base image
FROM postgres:latest

# Environment variables for PostgreSQL
ENV POSTGRES_DB=OnlineShop
ENV POSTGRES_USER=postgres
ENV POSTGRES_PASSWORD=mypassword

# Expose the PostgreSQL port
EXPOSE 5432