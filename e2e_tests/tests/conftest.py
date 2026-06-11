from selenium import webdriver
import pytest
import requests

@pytest.fixture(scope="function")
def driver():
    """
    Provides a Chrome WebDriver instance in headless mode.
    
    Yields:
        Selenium WebDriver instance configured for Chrome in headless mode.
    """
    options = webdriver.ChromeOptions()
    options.add_argument("headless")

    driver = webdriver.Chrome(options=options)
    driver.maximize_window()

    yield driver

    driver.quit()


@pytest.fixture(scope="function")
def add_items_to_cart_api():
    """
    Fixture for adding items to the cart due to API with automatic cleanup.
    
    Provides a callable that accepts a list of item dictionaries and posts them
    to the cart API. Optionally tracks created cart IDs for teardown deletion.
    
    Yields:
        Callable function that accepts items_list and optional cleanup flag.
        
    Raises:
        AssertionError: If API response status is not 200 or 201.
    """
    ids_to_delete = []

    def _add_items(items_list, cleanup=True):
        """
        Adds items to the cart via POST request.

        Args:
            items_list: List of dictionaries containing item data (insect_id, count, year).
            cleanup: If True, tracks cart IDs for automatic deletion (default: True).
        """
        api_url = "http://localhost:5000/api/carts"

        for item in items_list:
            response = requests.post(api_url, json=item, timeout=5)
            assert response.status_code in [200, 201], f"Помилка створення: {response.text}"

            cart_id = response.json().get("id")

            if cart_id and cleanup:
                ids_to_delete.append(cart_id)

    yield _add_items

    if ids_to_delete:
        unique_ids = set(ids_to_delete)

        print(f"\n[API Teardown] Видаляємо {len(unique_ids)} унікальних записів...")
        for c_id in unique_ids:
            try:
                requests.delete(f"http://localhost:5000/api/carts/{c_id}", timeout=5)
            except Exception as e:
                print(f"[Увага] Не вдалося видалити ID {c_id}: {e}")