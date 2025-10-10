#!/bin/bash
set -e

# This script runs when the PostgreSQL container is first initialized
# Add any custom database initialization here

echo "🦫 BHVR Database initialized successfully!"
echo "Database: bhvr_dev"
echo "User: bhvr"
echo "Ready for Prisma migrations!"
