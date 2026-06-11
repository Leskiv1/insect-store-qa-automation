from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.common.exceptions import TimeoutException
from pages.base_page import BasePage
from utils.helpers import extract_price

class CartPage(BasePage):
    """
    Page Object representing the shopping cart page.
    """

    CONTINUE_BUTTON = (By.CSS_SELECTOR, 'a.continue-button')
    ERROR_MESSAGE = (By.CSS_SELECTOR, '.empty-cart-error')
    DELETE_BUTTONS = (By.CSS_SELECTOR, 'button.delete')
    ITEMS_CONTAINER = (By.CSS_SELECTOR, 'div.items-container')
    ITEMS = (By.XPATH, './*')
    ITEMS_PRICE = (By.CSS_SELECTOR, 'span.price')
    TOTAL_PRICE = (By.CSS_SELECTOR, 'p.totalPrice')
    ITEM_VALUE = (By.CSS_SELECTOR, 'span.value')

    def __init__(self, driver):
        super().__init__(driver, page_url="/cart")

    def go_to_checkout_form_page(self):
        self.click(self.CONTINUE_BUTTON)

    def is_error_message_visible(self):
        element = self.find_element(self.ERROR_MESSAGE)
        return element.is_displayed()

    def delete_all_item(self):
        """
        Deletes all items from the cart by clicking all delete buttons.
        
        Iterates through all delete button elements and clicks each one sequentially.
        """
        delete_buttons = self.find_elements(self.DELETE_BUTTONS)
        for button in delete_buttons:
            button.click()

    def check_if_cart_empty(self, timeout=5):
        """
        Checks whether the cart contains any items, waiting up to `timeout` seconds.
        
        Returns:
            True if the cart is empty, False otherwise.
        """
        try:
            WebDriverWait(self.driver, timeout).until(
                lambda driver: len(driver.find_element(*self.ITEMS_CONTAINER).find_elements(*self.ITEMS)) == 0
            )
            return True
        except TimeoutException:
            return False

    def get_total_price(self):
        total_price = self.find_element(self.TOTAL_PRICE)
        return extract_price(total_price.text)

    def is_item_in_cart_iterative(self, item_name, item_year):
        """
        Checks if a specific item exists in the cart by name and year.
        
        Iterates through all cart items and searches for matching name and year in text.
        
        Args:
            item_name: Name of the item to search for.
            item_year: Year of the item to search for.
            
        Returns:
            True if the item is found, False otherwise.
        """
        items = self.find_elements(self.ITEMS_CONTAINER)

        for item in items:
            item_text = item.text

            if str(item_name) in item_text and str(item_year) in item_text:
                return True

        return False

    def get_item_quantity_by_name(self, item_name):
        """
        Retrieves the quantity of a specific item in the cart by its name.
        
        Constructs a dynamic XPath to locate the quantity input field associated
        with the specified item name.
        
        Args:
            item_name: Name of the item whose quantity should be retrieved.
            
        Returns:
            Integer representing the item quantity.
        """
        xpath = f"//div[@class='cart'][.//h2[contains(., '{item_name}')]]//input[@type='number']"
        locator = (By.XPATH, xpath)

        input_element = self.find_element(locator)
        quantity_str = input_element.get_attribute("value")

        return int(quantity_str)


