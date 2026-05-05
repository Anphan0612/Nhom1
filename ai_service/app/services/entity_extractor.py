import re
from typing import Dict, Any, Optional

class EntityExtractor:
    def __init__(self):
        # Basic keyword list for Vietnamese destinations
        self.destinations = ["đà lạt", "phú quốc", "nha trang", "hà nội", "sài gòn", "đà nẵng", "hội an"]
        self.vibes = ["chill", "khám phá", "nghỉ dưỡng", "sang chảnh", "phượt"]
        self.times = ["cuối tuần", "tháng sau", "tháng trước", "tuần tới", "ngày mai", "ngày mốt", "ngày kia", "ngày kìa"]

    def normalize_text(self, text: str) -> str:
        """Normalize Vietnamese text for better matching."""
        text = text.lower().strip()
        text = re.sub(r'\s+', ' ', text)
        return text

    def extract_budget(self, text: str) -> Optional[int]:
        """Extract budget from text (e.g., 2tr, 2 triệu, 2000000)."""
        # Handle "tr" or "triệu"
        million_match = re.search(r'(\d+)\s*(tr|triệu)', text)
        if million_match:
            return int(million_match.group(1)) * 1_000_000
        
        # Handle raw numbers (at least 5 digits to avoid confusion with days)
        raw_match = re.search(r'(\d{5,})', text)
        if raw_match:
            return int(raw_match.group(1))
            
        return None

    def extract_duration(self, text: str) -> Optional[int]:
        """Extract duration in days (e.g., 3 ngày, 3 ngày 2 đêm)."""
        duration_match = re.search(r'(\d+)\s*ngày', text)
        if duration_match:
            return int(duration_match.group(1))
        return None

    def extract_origin(self, text: str) -> Optional[str]:
        """Extract origin (starting point) from text."""
        # Patterns: "từ Hà Nội", "khởi hành từ Sài Gòn", "xuất phát từ Đà Nẵng"
        match = re.search(r'(?:từ|khởi hành từ|xuất phát từ)\s+([a-zà-ỹ\s]+)', text)
        if match:
             # Avoid capturing the entire rest of string if it contains "đi" or "đến"
             location = re.split(r'\s+(?:đi|đến|tới|vào)\s+', match.group(1))[0].strip()
             return location.title()
        return None

    def extract(self, text: str) -> Dict[str, Any]:
        normalized = self.normalize_text(text)
        
        entities = {
            "destination": None,
            "origin": self.extract_origin(normalized),
            "duration_days": self.extract_duration(normalized),
            "budget": self.extract_budget(normalized),
            "vibe": None,
            "time": None
        }

        # Match keyword lists
        for d in self.destinations:
            if d in normalized:
                entities["destination"] = d.title()
                break
        
        for v in self.vibes:
            if v in normalized:
                entities["vibe"] = v
                break

        for t in self.times:
            if t in normalized:
                entities["time"] = t
                break

        return entities

entity_extractor = EntityExtractor()
