from pydantic import BaseModel, Field
from typing import Optional, Dict, Any, List

class ParseRequest(BaseModel):
    text: str = Field(..., example="đi đà lạt 3 ngày 2 đêm budget 2tr chill")
    user_id: Optional[str] = None

class EntityResponse(BaseModel):
    destination: Optional[str] = None
    duration_days: Optional[int] = None
    budget: Optional[int] = None
    vibe: Optional[str] = None
    time: Optional[str] = None
    group_type: Optional[str] = None
    travelers: Optional[int] = None
    start_date: Optional[str] = None
    end_date: Optional[str] = None

class ParseResponse(BaseModel):
    intent: str
    entities: EntityResponse
    confidence: float
    source: str

class PlaceItem(BaseModel):
    name: str
    type: str

class HotelItem(BaseModel):
    name: str
    price_level: str

class RecommendationResponse(BaseModel):
    places: List[PlaceItem]
    hotels: List[HotelItem]

class DailyItinerary(BaseModel):
    day: int
    activities: List[str]

class ItineraryResponse(BaseModel):
    days: List[DailyItinerary]

class TripPlanResponse(BaseModel):
    intent: str
    entities: EntityResponse
    recommendations: RecommendationResponse
    itinerary: ItineraryResponse
    personalized: bool = False
