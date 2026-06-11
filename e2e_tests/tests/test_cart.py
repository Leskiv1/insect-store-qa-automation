import pytest
from pages.cart_page import CartPage
import time

@pytest.mark.xfail(reason="Bug Report #5: Ability to Proceed to Checkout with an Empty Cart.")
def test_checkout_empty_cart(driver):
    cart_page = CartPage(driver)

    cart_page.open()

    cart_page.go_to_checkout_form_page()

    assert cart_page.is_error_message_visible() == True, "The empty cart error did not appear!"


def test_delete_button(add_items_to_cart_api, driver):
    add_items_to_cart_api([{"insect_id": 1, "count": 2, "year": "2024"}],cleanup=False)

    cart_page = CartPage(driver)

    cart_page.open()
    cart_page.delete_all_item()
    result = cart_page.check_if_cart_empty()

    assert result == True, "The cart should be empty!"

def test_total_price(add_items_to_cart_api, driver):
    add_items_to_cart_api([{"insect_id": 1, "count": 2, "year": "2024"},{"insect_id": 2, "count": 4, "year": "2023"}])

    cart_page = CartPage(driver)
    cart_page.open()

    list_of_prices = cart_page.get_list_of_prices_items(cart_page.ITEMS_PRICE)
    print(list_of_prices)
    total_price = cart_page.get_total_price()

    assert sum(list_of_prices) == total_price


@pytest.mark.xfail(reason="Bug Report #4: [Item Page][Shopping Cart] Incorrect Quantity Update for Existing Item in Cart Upon Re-addition.")
def test_add_the_same_item(add_items_to_cart_api, driver):
    insect_name = "Бджола медоносна"
    insect_year = 2023
    number_quantity_at_first = 3
    number_quantity_at_second = 2

    add_items_to_cart_api([{"insect_id": 2, "count": str(number_quantity_at_first), "year": str(insect_year)}])
    add_items_to_cart_api([{"insect_id": 2, "count": str(number_quantity_at_second), "year": str(insect_year)}])
    cart_page = CartPage(driver)
    cart_page.open()

    item_quantity = cart_page.get_item_quantity_by_name(insect_name)

    assert item_quantity == (number_quantity_at_first + number_quantity_at_second)


