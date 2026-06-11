from pages.base_page import BasePage

class QuantityBlock(BasePage):
    """
    Component for managing item quantity controls (increase/decrease buttons).
    
    This component encapsulates the quantity manipulation logic for UI elements
    that allow incrementing or decrementing item counts.
    """
    def __init__(self, driver, increase_locator, decrease_locator):
        """
        Initializes the QuantityBlock component.
        
        Args:
            driver: Selenium WebDriver instance.
            increase_locator: Tuple locator for the increase button.
            decrease_locator: Tuple locator for the decrease button.
        """
        super().__init__(driver)
        self.increase_locator = increase_locator
        self.decrease_locator = decrease_locator

    def click_increase(self, clicks_count):
        self.click(self.increase_locator, clicks_count)

    def click_decrease(self, clicks_count):
        self.click(self.decrease_locator, clicks_count)