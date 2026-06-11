@echo off
REM E2E Tests Local CI Script for Windows
REM Run this script to test the entire application locally before pushing

setlocal enabledelayedexpansion

echo.
echo ================================
echo LabWeb E2E Tests Local CI
echo ================================
echo.

REM Check prerequisites
echo Checking prerequisites...
docker --version >nul 2>&1
if errorlevel 1 (
    echo ERROR: Docker is not installed!
    exit /b 1
)

python --version >nul 2>&1
if errorlevel 1 (
    echo ERROR: Python is not installed!
    exit /b 1
)

echo [OK] Prerequisites verified
echo.

REM Start services
echo Starting services with Docker Compose...
docker-compose up --build -d
if errorlevel 1 (
    echo ERROR: Failed to start services!
    exit /b 1
)

echo Waiting for services to be healthy...
timeout /t 10 /nobreak

REM Check backend
echo Checking backend...
:check_backend
curl -s http://127.0.0.1:5000 >nul 2>&1
if errorlevel 1 (
    echo Backend not ready, retrying...
    timeout /t 2 /nobreak
    goto check_backend
)

REM Check frontend
echo Checking frontend...
:check_frontend
curl -s http://127.0.0.1:3000 >nul 2>&1
if errorlevel 1 (
    echo Frontend not ready, retrying...
    timeout /t 2 /nobreak
    goto check_frontend
)

echo [OK] All services are running
echo.

REM Setup Virtual Environment and Install Dependencies
echo Setting up Python Virtual Environment...
cd e2e_tests
if not exist .venv (
    python -m venv .venv
)
call .venv\Scripts\activate.bat

echo Installing Python dependencies...
pip install -r requirements.txt >nul 2>&1
if errorlevel 1 (
    echo ERROR: Failed to install Python dependencies!
    cd ..
    exit /b 1
)
echo [OK] Python dependencies installed
echo.

REM Run tests
echo Running E2E tests...
pytest -v --tb=short --html=report.html --self-contained-html
set TEST_EXIT_CODE=!errorlevel!

call deactivate
cd ..

echo.
echo ================================
if %TEST_EXIT_CODE% equ 0 (
    echo [OK] E2E Tests PASSED
) else (
    echo [FAIL] E2E Tests FAILED
    echo.
    echo View the report:
    echo   e2e_tests\report.html
)
echo ================================

exit /b %TEST_EXIT_CODE%
