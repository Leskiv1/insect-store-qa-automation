from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.support.ui import Select
from utils.helpers import extract_price

class BasePage:
    """
    Base Page Object class providing common web interaction methods.

    This class serves as the foundation for all page objects, encapsulating
    reusable Selenium operations like waiting, clicking, typing, and dropdown handling.
    """

    BASE_URL = "http://localhost:3000"

    def __init__(self, driver, page_url=""):
        """
        Initializes the BasePage with a WebDriver instance and optional page URL.

        Args:
            driver: Selenium WebDriver instance.
            page_url: Relative path to append to BASE_URL (default: "").
        """

        self.driver = driver
        self.wait = WebDriverWait(driver, 10)
        self.page_url = page_url


    def open(self):
        self.driver.get(f"{self.BASE_URL}{self.page_url}")

    def find_element(self, locator):
        return self.wait.until(EC.visibility_of_element_located(locator))

    def find_elements(self, locator):
        return self.wait.until(EC.presence_of_all_elements_located(locator))

    def find_element_clickable(self, locator):
        return self.wait.until(EC.element_to_be_clickable(locator))

    def click(self, locator, count=1):
        """
        Clicks on an element one or more times.

        Args:
            locator: Tuple representing the element locator (By, value).
            count: Number of times to click (default: 1).
        """

        for _ in range(count):
            self.find_element_clickable(locator).click()

    def get_text(self, locator):
        return self.find_element(locator).text

    def type_text(self, locator, text):
        element = self.find_element(locator)
        element.clear()
        element.send_keys(text)

    def dropdown_element(self, locator):
        element = self.find_element(locator)
        dropdown = Select(element)
        return dropdown

    def get_selected_dropdown_value(self, locator):
        dropdown = self.dropdown_element(locator)
        return dropdown.first_selected_option.text

    def dropdown_select_by_value(self, locator, value):
        dropdown = self.dropdown_element(locator)
        dropdown.select_by_value(value)

    def get_list_of_prices_items(self, items_price):
        """
        Extracts numerical prices from a list of web elements.

        Args:
            items_price: Tuple locator for elements containing price text.

        Returns:
                List of floats representing extracted prices.
        """

        prices_elements = self.find_elements(items_price)
        return [extract_price(element.text) for element in prices_elements]

    def get_direct_text(self, locator):
        """
        Retrieves the direct text content of an element, excluding child nodes.

        Uses JavaScript to extract only the first text node, ignoring nested elements.

        Args:
            locator: Tuple representing the element locator (By, value).

        Returns:
            Trimmed text content of the element's first child text node.
        """

        element = self.find_element(locator)
        script = "return arguments[0].childNodes[0].textContent.trim();"
        direct_text = self.driver.execute_script(script, element)
        return direct_text