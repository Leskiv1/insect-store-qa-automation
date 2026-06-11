import pytest
from pages.cart_page import CartPage
from pages.item_page import ItemPage

@pytest.mark.xfail(reason="Bug Report #3: [Item Page] Product Price Does Not Update According to Quantity.")
def test_item_price(driver):
    number_of_item_increase_to = 5

    item_page = ItemPage(driver)
    item_page.open()

    price_before = item_page.get_base_price()
    item_page.quantity.click_increase(number_of_item_increase_to - 1)
    price_after = item_page.get_base_price()

    assert price_before * number_of_item_increase_to == price_after

def test_add_to_shop(driver):
    cart_page = CartPage(driver)
    item_page = ItemPage(driver)
    item_page.open()

    item_name = item_page.get_item_name()
    item_year = item_page.get_item_year()

    item_page.add_to_shop()

    result = cart_page.is_item_in_cart_iterative(item_name, item_year)

    assert result == True



