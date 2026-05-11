import asyncio
import logging
import sys
from app.services.llm_service import llm_service

# Setup logging to see the API calls
logging.basicConfig(level=logging.INFO, stream=sys.stdout)

async def verify_llm():
    print("\n" + "="*50)
    print("STARTING REAL LLM CONNECTION TEST")
    print("="*50 + "\n")
    
    # Test 1: Entity Repair
    print("[TEST 1] Repairing entities...")
    text = "tôi muốn đi đâu đó lạ lạ, có 10 triệu"
    current_entities = {"destination": None, "budget": 10000000, "vibe": None}
    
    repaired = await llm_service.repair_entities(text, current_entities)
    
    print("\n[RESULT 1]")
    print(f"Destination: {repaired.get('destination')}")
    print(f"Vibe       : {repaired.get('vibe')}")
    
    if "[LLM Repaired]" in str(repaired.get('destination')):
        print("\nFAIL: LLM failed or used mock fallback.")
    else:
        print("\nSUCCESS: LLM call successful! (Real data received)")

    print("\n" + "-"*50 + "\n")

    # Test 2: Itinerary Generation
    print("[TEST 2] Generating itinerary...")
    itin = await llm_service.generate_itinerary(
        destination="Sapa",
        duration_days=2,
        budget=5000000,
        vibe="adventure",
        group_type="friends"
    )
    
    print("\n[RESULT 2]")
    if itin and "days" in itin and len(itin["days"]) > 0:
        first_activity = itin["days"][0]["activities"][0]
        if "Khám phá địa điểm nổi tiếng" in first_activity:
            print("⚠️ Received mock itinerary (API failed or mock logic triggered).")
        else:
            print("✅ Real AI Itinerary received!")
            print(f"Sample Activity: {first_activity}")
    else:
        print("❌ Failed to generate itinerary.")

if __name__ == "__main__":
    asyncio.run(verify_llm())
