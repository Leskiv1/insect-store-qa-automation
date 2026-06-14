import pytest
from pages.catalog_page import CatalogPage


def test_sort_by_price_ascending(driver):
    catalog_page = CatalogPage(driver)
    catalog_page.open()

    catalog_page.sort_by_price("not")
    no_sorted_prices = catalog_page.get_list_of_prices_items(catalog_page.ITEMS_PRICES)

    catalog_page.sort_by_price("ascending")
    sorted_prices = catalog_page.get_list_of_prices_items(catalog_page.ITEMS_PRICES)

    assert sorted(no_sorted_prices) == sorted_prices


def test_sort_by_price_descending(driver):
    catalog_page = CatalogPage(driver)
    catalog_page.open()

    catalog_page.sort_by_price("not")
    no_sorted_prices = catalog_page.get_list_of_prices_items(catalog_page.ITEMS_PRICES)

    catalog_page.sort_by_price("descending")
    sorted_prices = catalog_page.get_list_of_prices_items(catalog_page.ITEMS_PRICES)

    assert sorted(no_sorted_prices, reverse=True) == sorted_prices

def test_type_any_exist_full_name(driver):
    name = "Павичеве око"
    catalog_page = CatalogPage(driver)
    catalog_page.open()

    catalog_page.find_item_by_text_search(name)

    catalog_page.wait_for_item_name_to_load(name)

    item_name = catalog_page.get_item_name()

    assert item_name == name

def test_type_any_no_exist_item_name(driver):
    name = "Мураха"
    catalog_page = CatalogPage(driver)
    catalog_page.open()

    catalog_page.find_item_by_text_search(name)
    item = catalog_page.is_item_exist(name)

    assert not item

@pytest.mark.xfail(reason="Bug Report #2: [Catalog Page] Text Search Does Not Filter by Cyrillic Input.")
def test_type_any_ukrainian_letter(driver):
    letter = "П"
    catalog_page = CatalogPage(driver)
    catalog_page.open()

    catalog_page.find_item_by_text_search(letter)

    item_name = catalog_page.get_item_name()

    assert item_name[0] == letter

def test_clear_button(driver):
    text = "Сонечко"
    catalog_page = CatalogPage(driver)
    catalog_page.open()

    catalog_page.sort_by_price("descending")
    catalog_page.find_item_by_text_search(text)

    list_about_sorted_catalog = catalog_page.get_information_about_catalog()
    catalog_page.clear_sorting()
    list_about_catalog = catalog_page.get_information_about_catalog()

    assert list_about_sorted_catalog != list_about_catalog
