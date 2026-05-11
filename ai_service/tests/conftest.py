import pytest
import os
import sys

# Thêm thư mục app vào sys.path để pytest có thể import được các module
sys.path.insert(0, os.path.abspath(os.path.join(os.path.dirname(__file__), '..')))

@pytest.fixture(autouse=True)
def mock_env(monkeypatch):
    """Giả lập các biến môi trường cần thiết."""
    monkeypatch.setenv("LLM_API_KEY", "test-key")
    monkeypatch.setenv("LLM_API_URL", "http://test-url")
    monkeypatch.setenv("LLM_MODELS", "test-model")
