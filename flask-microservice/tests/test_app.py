import pytest
import os
import sys

# append src directory to system path in order to import tests
ROOT = os.path.join(os.path.dirname(os.path.abspath(__file__)), "..")
sys.path.append(os.path.join(ROOT, "src"))


if __name__ == "__main__":
    pytest.main(["test_app.py"])