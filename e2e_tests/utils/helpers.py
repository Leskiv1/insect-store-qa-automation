import re

def extract_price(price_text: str) -> float:
    """
    Extracts a numeric price value from a string containing price information.
    
    Uses regex to find the first occurrence of a number (integer or float)
    within the provided text.
    
    Args:
        price_text: String containing price information (e.g., "$19.99", "Price: 25").
        
    Returns:
        Float representation of the extracted price.
        
    Raises:
        ValueError: If no numeric price pattern is found in the input text.
    """
    try:
        price = re.search(r"\d+(\.\d+)?", price_text).group()
        return float(price)
    except AttributeError:
        raise ValueError(f"Could not find the price in the text: '{price_text}'")