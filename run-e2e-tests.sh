#!/bin/bash
# E2E Tests Local CI Script
# Run this script to test the entire application locally before pushing

set -e

echo "================================"
echo "LabWeb E2E Tests Local CI"
echo "================================"
echo ""

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Check prerequisites
echo -e "${YELLOW}Checking prerequisites...${NC}"
if ! command -v docker &> /dev/null; then
    echo -e "${RED}Docker is not installed!${NC}"
    exit 1
fi

if ! command -v python3 &> /dev/null; then
    echo -e "${RED}Python 3 is not installed!${NC}"
    exit 1
fi

echo -e "${GREEN}✓ Prerequisites OK${NC}"
echo ""

# Start services
echo -e "${YELLOW}Starting services with Docker Compose...${NC}"
docker-compose up --build -d

echo -e "${YELLOW}Waiting for services to be healthy...${NC}"
sleep 10

# Check if services are running
if ! curl -s http://127.0.0.1:5000 > /dev/null; then
    echo -e "${RED}Backend is not responding!${NC}"
    docker-compose logs backend
    exit 1
fi

if ! curl -s http://127.0.0.1:3000 > /dev/null; then
    echo -e "${RED}Frontend is not responding!${NC}"
    docker-compose logs frontend
    exit 1
fi

echo -e "${GREEN}✓ All services are healthy${NC}"
echo ""

# Setup Virtual Environment and Install Dependencies
echo -e "${YELLOW}Setting up Python Virtual Environment...${NC}"
cd e2e_tests
if [ ! -d ".venv" ]; then
    python3 -m venv .venv
fi
source .venv/bin/activate

echo -e "${YELLOW}Installing Python dependencies...${NC}"
pip install -r requirements.txt > /dev/null 2>&1
echo -e "${GREEN}✓ Python dependencies installed${NC}"
echo ""

# Run tests
echo -e "${YELLOW}Running E2E tests...${NC}"
pytest -v --tb=short --html=report.html --self-contained-html

TEST_EXIT_CODE=$?

deactivate
cd ..

echo ""
echo "================================"
if [ $TEST_EXIT_CODE -eq 0 ]; then
    echo -e "${GREEN}✓ E2E Tests PASSED${NC}"
else
    echo -e "${RED}✗ E2E Tests FAILED${NC}"
    echo ""
    echo "View the report:"
    echo "  e2e_tests/report.html"
fi
echo "================================"

exit $TEST_EXIT_CODE
