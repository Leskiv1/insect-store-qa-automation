# 🧪 E2E Testing Guide

This document describes the architecture, execution process, and development guidelines of the End-to-End (E2E) automation framework created for the **Insect Store** project.

The framework was designed to provide reliable validation of the complete application stack, including the frontend, backend API, and database layers.

---

# 📌 Overview

The automation framework simulates real user interactions through a web browser and verifies that all system components work together correctly.

## Testing Stack

| Component            | Technology              |
| -------------------- | ----------------------- |
| Test Framework       | Pytest                  |
| Browser Automation   | Selenium WebDriver 4    |
| Programming Language | Python 3.11+            |
| Design Pattern       | Page Object Model (POM) |
| Reporting            | pytest-html             |
| CI/CD                | GitHub Actions          |

---

# 🚀 Running Tests

## Option 1: One-Click Execution (Recommended)

The project includes helper scripts that automatically:

* Start the Docker environment
* Build all required containers
* Create a Python virtual environment
* Install dependencies
* Execute the test suite
* Generate an HTML report

### Windows

```cmd
run-e2e-tests.bat
```

### macOS / Linux

```bash
./run-e2e-tests.sh
```

---

## Option 2: Manual Execution

Useful for debugging or running specific tests during development.

### 1. Start the System Under Test (SUT)

```bash
docker-compose up --build -d
```

### 2. Configure the Python Environment

```bash
cd e2e_tests

python -m venv .venv

# Windows
.venv\Scripts\activate

# macOS/Linux
source .venv/bin/activate

pip install -r requirements.txt
```

### 3. Execute Tests

Run the entire suite:

```bash
pytest -v
```

Run a specific test file:

```bash
pytest tests/test_cart.py -v
```

Generate an HTML report:

```bash
pytest --html=report.html --self-contained-html
```

---

# 📂 Framework Structure

The framework follows the **Page Object Model (POM)** design pattern, ensuring a clear separation between test logic, page interactions, reusable UI components, and utility functions.

```text
e2e_tests/
├── components/
│   └── quantity_block.py
├── pages/
│   ├── base_page.py
│   ├── cart_page.py
│   ├── catalog_page.py
│   └── item_page.py
├── tests/
│   ├── conftest.py
│   ├── test_cart.py
│   ├── test_catalog.py
│   └── test_item.py
├── utils/
│   └── helpers.py
├── .gitignore
├── pytest.ini
├── requirements.txt
├── report.html
└── E2E_TESTING_GUIDE.md
```

## Component Description

### `pages/`

Contains Page Object classes responsible for:

* Storing locators
* Encapsulating UI interactions
* Providing reusable page actions

### `components/`

Contains reusable UI components that can appear on multiple pages.

Example:

* `quantity_block.py` – reusable logic for product quantity manipulation.

### `tests/`

Contains executable test scenarios and assertions.

* `test_catalog.py` – catalog functionality tests
* `test_item.py` – product page tests
* `test_cart.py` – shopping cart tests

### `tests/conftest.py`

Contains shared Pytest fixtures such as:

* Browser setup and teardown
* Test data preparation
* Reusable fixtures used across test modules

### `utils/`

Contains helper functions and utility methods used throughout the framework.

### `pytest.ini`

Stores Pytest configuration and custom markers.

### `requirements.txt`

Lists all Python dependencies required to run the framework.

---

# ✍️ Test Development Guidelines

## 1. Follow the Page Object Model

Tests should never directly interact with page elements using Selenium locators.

### Good Example

```python
def test_delete_button(add_items_to_cart_api, driver):
    add_items_to_cart_api(
        [{"insect_id": 1, "count": 2, "year": "2024"}],
        cleanup=False
    )

    cart_page = CartPage(driver)

    cart_page.open()
    cart_page.delete_all_item()

    assert cart_page.check_if_cart_empty() is True
```

Benefits:

* Better maintainability
* Reduced code duplication
* Easier UI updates

---

## 2. Use Explicit Waits

Avoid using:

```python
time.sleep()
```

Instead, use Selenium's explicit waits.

### Example

```python
from selenium.webdriver.support.ui import WebDriverWait

def check_if_cart_empty(self, timeout=5):
    try:
        WebDriverWait(self.driver, timeout).until(
            lambda d: len(
                d.find_element(*self.ITEMS_CONTAINER)
                .find_elements(*self.ITEMS)
            ) == 0
        )
        return True
    except TimeoutException:
        return False
```

Benefits:

* More reliable tests
* Faster execution
* Reduced CI/CD flakiness

---

## 3. Prepare Test Data via API

Whenever possible, test preconditions should be created through API requests instead of UI interactions.

Advantages:

* Faster execution
* Improved stability
* Reduced dependency on frontend workflows

This approach is heavily utilized through fixtures defined in `conftest.py`.

---

# 🤖 CI/CD Integration

The automation framework is fully integrated with GitHub Actions.

The pipeline automatically runs when:

* A push is made to the `main` branch
* A push is made to the `develop` branch
* A pull request is opened or updated

## Pipeline Workflow

1. Creates an Ubuntu runner environment
2. Installs Docker and Python 3.11
3. Builds the complete application stack
4. Waits until all services become available
5. Executes the E2E test suite
6. Generates an HTML report
7. Uploads the report as a workflow artifact
8. Publishes test execution results in the Pull Request

---

# 🎯 Testing Philosophy

The framework prioritizes:

* Readability
* Maintainability
* Reusability
* Fast feedback
* Stable CI/CD execution

By combining Selenium, Pytest, Page Object Model, Docker, and GitHub Actions, the project demonstrates a complete real-world approach to modern web application test automation.