import numpy as np


def _is_numpy(obj):
    """ Check if object is a NumPy object """
    return type(obj).__module__ == np.__name__


def numpy_to_native(value):
    """ Convert int64 numpy base to native Python int """
    return value.item() if _is_numpy(value) else value


def ndarray_to_list(arr):
    """ Convert NumPy array to a Python list if applicable. """
    return arr.tolist() if _is_numpy(arr) else arr


if __name__ == "__main__":
    pass
