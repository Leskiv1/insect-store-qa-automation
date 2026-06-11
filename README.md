# 🐞 Insect Store - AQA Portfolio Project

## 🎯 Project Overview

This repository showcases a complete **End-to-End (E2E) Test Automation Framework** built from scratch.

To demonstrate testing capabilities on a realistic application, I developed a custom Full-Stack e-commerce platform that simulates a store selling beneficial insects (butterflies, bees, ladybugs). The application itself was originally created as part of a **University Web Technologies course**, and later extended and adapted to serve as the System Under Test (SUT) for this automation project.

The entire application and its database are fully containerized, allowing anyone to deploy the SUT and run the test suite with minimal setup.

## 🏗️ The Application (System Under Test)

The application is a fully functional web store structured into three main layers:

### Frontend (Client)

* Single Page Application (SPA) built with **React 18**
* **React Router** for navigation
* **Ant Design** and custom CSS for the user interface

### Backend (API)

* RESTful API built with **Node.js** and **Express.js**
* Handles business logic, routing, and communication with the database

### Database

* **MySQL 8.0** relational database
* Managed through **Sequelize ORM**

### Core Features

Users can:

* Browse a catalog of beneficial insects
* View detailed information about products
* Add products to a shopping cart
* Update quantities in the cart
* Remove products from the cart
* Perform complete CRUD operations on cart data

## 🌟 Key QA Highlights

### Test Automation Framework

* Python
* Pytest
* Selenium WebDriver

### Design Patterns

* Strict implementation of the **Page Object Model (POM)**
* High maintainability and code reusability

### CI/CD Integration

* Automated test execution on every Push and Pull Request
* Implemented with **GitHub Actions**

### Reporting

* Automatic generation of HTML reports using **pytest-html**

---

# 🚀 Quick Start (1-Click Run)

You do not need to manually configure Node.js, databases, or Python environments.

## Prerequisites

* Docker Desktop installed and running
* Python 3.10+

## Run Automated Tests

### Windows

```cmd
run-e2e-tests.bat
```

### macOS / Linux

```bash
./run-e2e-tests.sh
```

The script will:

1. Build all Docker containers
2. Start the application stack
3. Create a Python virtual environment
4. Install all required dependencies
5. Execute the E2E test suite
6. Generate an HTML report

After execution, a detailed report will be available at:

```text
e2e_tests/report.html
```

---

# 📂 Repository Structure

The most important directories are:

```text
.github/workflows/
```

CI/CD pipeline configuration.

```text
e2e_tests/
```

Core automation framework.

Inside:

```text
e2e_tests/tests/
```

Pytest test suites.

Examples:

* Cart functionality
* Product catalog
* Sorting and filtering
* CRUD operations

```text
e2e_tests/pages/
```

Page Object classes containing:

* Locators
* UI interactions
* Business actions

```text
e2e_tests/conftest.py
```

Shared Pytest fixtures:

* WebDriver setup
* Test configuration
* Environment initialization

```text
QA_Documentation/
```

Manual QA artifacts(available in both **English** and **Ukrainian**):

* 📄 **Test Plans** 
* 🧪 **Test Cases** 
* ✅ **Checklists** 
* 🐛 **Bug Reports** 

```text
app/
back/
```

Source code of the React frontend and Node.js backend.

---

# 🛠️ Manual Launch & Interaction

If you want to manually explore the application or develop additional tests:

## 1. Start the Application

```bash
docker-compose up --build -d
```

This command starts:

* Frontend
* Backend
* MySQL database with pre-populated test data

## 2. Access the Application

### Frontend

```text
http://localhost:3000
```

### Backend API

```text
http://localhost:5000
```

## 3. Stop and Clean Up

```bash
docker-compose down -v
```

---

# ⚙️ Tech Stack Summary

## QA & Automation

* Python 3
* Pytest
* Selenium WebDriver
* GitHub Actions
* pytest-html

## Frontend

* React 18
* React Router
* Axios
* Ant Design

## Backend & Database

* Node.js
* Express.js
* Sequelize ORM
* MySQL 8.0

## DevOps

* Docker
* Docker Compose

---

## 🎓 Academic Background

The web application used in this project was initially developed during a **University Web Technologies course**, where the primary objective was to design and implement a full-stack web application.

The project was later enhanced and containerized to become a realistic testing environment for building and demonstrating a QA automation framework using Selenium, Pytest, and GitHub Actions.
