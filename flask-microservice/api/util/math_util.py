def div(divided, divisor):
    """ Perform safe division. """
    return divided / divisor if divisor != 0 else 0.0


def get_percent_below(value1, value2):
    """ Return how much percent value1 is lower than value2. """
    return round((1 - div(value1, value2)) * 100, 1)


def get_percent_change(value1, value2):
    """ Return the percent change from value2 to value1. """
    return round(div((value1 - value2), value2) * 100, 2)


if __name__ == "__main__":
    pass
