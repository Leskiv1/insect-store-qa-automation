from selenium.webdriver.common.by import By
from pages.base_page import BasePage
from selenium.common import NoSuchElementException
from selenium.webdriver.support import expected_conditions as EC

class CatalogPage(BasePage):
    """
    Page Object representing the product catalog page.
    """
    
    VIEW_MORE_BUTTON = (By.CSS_SELECTOR, 'a[href="/catalog/1"].buttonContainer')
    SORT_PRICE = (By.CSS_SELECTOR, '.sort.price')
    ITEMS_PRICES = (By.TAG_NAME, 'h3')
    NAME_FIND_FIELD = (By.CSS_SELECTOR, 'input.nameFind')
    ITEM_NAME = (By.XPATH, "//h2")
    CLEAR_BUTTON = (By.CSS_SELECTOR, 'button.btn')

    def __init__(self, driver):
        super().__init__(driver, page_url='/catalog')

    def go_to_item_page(self):
        self.click(self.VIEW_MORE_BUTTON)

    def sort_by_price(self, sort_order):
        return self.dropdown_select_by_value(self.SORT_PRICE, sort_order)

    def find_item_by_text_search(self, name):
        self.type_text(self.NAME_FIND_FIELD, name)

    def get_item_name(self):
        return self.get_direct_text(self.ITEM_NAME)

    def get_information_about_catalog(self):
        """
        Retrieves text content from all catalog item name elements.
        
        Returns:
            List of strings containing item information (names/prices).
        """
        names_with_price = self.find_elements(self.ITEM_NAME)
        return [information.text for information in names_with_price]

    def is_item_exist(self, name):
        """
        Checks if an item with the specified name exists in the catalog.
        
        Temporarily sets implicit wait to 1 second, attempts to find the element,
        then resets implicit wait to 0.
        
        Args:
            name: Exact name of the item to search for.
            
        Returns:
            True if the item exists, False otherwise.
            
        Raises:
            NoSuchElementException: Caught internally and returns False.
        """
        try:
            self.driver.implicitly_wait(1)
            self.driver.find_element(By.XPATH, f"//h2[text()='{name}']")
            return True
        except NoSuchElementException:
            return False
        finally:
            self.driver.implicitly_wait(0)

    def clear_sorting(self):
        """
        Clears sorting and filtering, waiting for the catalog to refresh.
        
        Captures a reference to the first old item element, clicks the clear button,
        and waits until the old element becomes stale (indicating page refresh).
        """
        old_items = self.find_elements(self.ITEM_NAME)
        first_old_item = old_items[0] if old_items else None

        self.click(self.CLEAR_BUTTON)

        if first_old_item:
            self.wait.until(EC.staleness_of(first_old_item))
