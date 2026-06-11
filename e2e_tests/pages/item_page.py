from utils.helpers import extract_price
from components.quantity_block import QuantityBlock
from selenium.webdriver.common.by import By
from pages.base_page import BasePage

class ItemPage(BasePage):
    """
    Page Object representing an individual item/product page.
    """
    BASE_PRICE_TEXT = (By.CSS_SELECTOR, 'span.price')
    INCREASE_BUTTON = (By.CSS_SELECTOR, 'button.increase')
    DECREASE_BUTTON = (By.CSS_SELECTOR, 'button.decrease')
    ADD_TO_SHOP_BUTTON = (By.CSS_SELECTOR, 'button.btn.itemButton')
    ITEM_NAME = (By.CSS_SELECTOR, 'h2.name')
    ITEM_YEAR = (By.CSS_SELECTOR, "[name='year']")

    def __init__(self, driver):
        super().__init__(driver, page_url='/catalog/1')
        self.quantity = QuantityBlock(self.driver,self.INCREASE_BUTTON,self.DECREASE_BUTTON)

    def get_base_price(self):
        price_text = self.get_text(self.BASE_PRICE_TEXT)
        return extract_price(price_text)

    def add_to_shop(self):
        self.click(self.ADD_TO_SHOP_BUTTON)

    def get_item_name(self):
        return self.get_text(self.ITEM_NAME)

    def get_item_year(self):
        year = self.get_selected_dropdown_value(self.ITEM_YEAR)
        return year
