import pytest
import numpy as np

from api.util.np_util import ndarray_to_list, numpy_to_native


@pytest.mark.parametrize("arg", [(5), (np.int(5))])
def test_numpy_to_native(arg):
    assert numpy_to_native(arg) == arg


@pytest.mark.parametrize("arg", [([1, 2, 3]), (np.array([1, 2, 3]))])
def test_ndarray_to_list(arg):
    lst = [1, 2, 3]
    assert ndarray_to_list(lst) is lst

    np_lst = np.array(lst)
    assert ndarray_to_list(np_lst) == lst


if __name__ == "__main__":
    pytest.main(["test_np_util.py"])
