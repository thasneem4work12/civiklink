"""
Database seeding script for CivikLink SL
Run this after starting MongoDB to populate initial data
"""
from pymongo import MongoClient
from datetime import datetime
import os
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

# Connect to MongoDB
mongo_uri = os.getenv('MONGO_URI', 'mongodb://localhost:27017/civiklink')
client = MongoClient(mongo_uri)
db = client.get_database()

print("🌱 Seeding CivikLink Database...")

# Clear existing data (optional - comment out if you want to keep existing data)
# db.ministries.delete_many({})
# print("✓ Cleared existing ministries")

# Seed Ministries
ministries = [
    {
        "name_en": "Ministry of Power and Energy",
        "name_si": "බලශක්ති අමාත්‍යාංශය",
        "name_ta": "மின்சாரம் மற்றும் ஆற்றல் அமைச்சு",
        "category": ["electricity"],
        "contact_email": "info@powermin.gov.lk",
        "contact_phone": "+94112345678",
        "performance_stats": {
            "total_issues": 0,
            "solved": 0,
            "pending": 0,
            "avg_response_time": 0
        },
        "created_at": datetime.utcnow()
    },
    {
        "name_en": "Ministry of Water Supply",
        "name_si": "ජල සම්පාදන අමාත්‍යාංශය",
        "name_ta": "நீர் வழங்கல் அமைச்சு",
        "category": ["water"],
        "contact_email": "info@waterboard.gov.lk",
        "contact_phone": "+94112345679",
        "performance_stats": {
            "total_issues": 0,
            "solved": 0,
            "pending": 0,
            "avg_response_time": 0
        },
        "created_at": datetime.utcnow()
    },
    {
        "name_en": "Ministry of Highways",
        "name_si": "මහාමාර්ග අමාත්‍යාංශය",
        "name_ta": "நெடுஞ்சாலைகள் அமைச்சு",
        "category": ["road"],
        "contact_email": "info@rda.gov.lk",
        "contact_phone": "+94112345680",
        "performance_stats": {
            "total_issues": 0,
            "solved": 0,
            "pending": 0,
            "avg_response_time": 0
        },
        "created_at": datetime.utcnow()
    },
    {
        "name_en": "Ministry of Disaster Management",
        "name_si": "ආපදා කළමනාකරණ අමාත්‍යාංශය",
        "name_ta": "பேரிடர் மேலாண்மை அமைச்சு",
        "category": ["flood", "disaster"],
        "contact_email": "info@dmc.gov.lk",
        "contact_phone": "+94112345681",
        "performance_stats": {
            "total_issues": 0,
            "solved": 0,
            "pending": 0,
            "avg_response_time": 0
        },
        "created_at": datetime.utcnow()
    },
    {
        "name_en": "Ministry of Local Government",
        "name_si": "පළාත් පාලන අමාත්‍යාංශය",
        "name_ta": "உள்ளூராட்சி அமைச்சு",
        "category": ["garbage", "drainage"],
        "contact_email": "info@localgovt.gov.lk",
        "contact_phone": "+94112345682",
        "performance_stats": {
            "total_issues": 0,
            "solved": 0,
            "pending": 0,
            "avg_response_time": 0
        },
        "created_at": datetime.utcnow()
    },
    {
        "name_en": "Ceylon Electricity Board",
        "name_si": "ලංකා විදුලිබල මණ්ඩලය",
        "name_ta": "இலங்கை மின்சார சபை",
        "category": ["electricity"],
        "contact_email": "info@ceb.lk",
        "contact_phone": "+94112345683",
        "performance_stats": {
            "total_issues": 0,
            "solved": 0,
            "pending": 0,
            "avg_response_time": 0
        },
        "created_at": datetime.utcnow()
    },
    {
        "name_en": "National Water Supply and Drainage Board",
        "name_si": "ජාතික ජල සම්පාදන හා ජලාපවහන මණ්ඩලය",
        "name_ta": "தேசிய நீர் வழங்கல் மற்றும் வடிகால் வாரியம்",
        "category": ["water", "drainage"],
        "contact_email": "info@waterboard.lk",
        "contact_phone": "+94112345684",
        "performance_stats": {
            "total_issues": 0,
            "solved": 0,
            "pending": 0,
            "avg_response_time": 0
        },
        "created_at": datetime.utcnow()
    }
]

# Check if ministries already exist
existing_count = db.ministries.count_documents({})
if existing_count == 0:
    result = db.ministries.insert_many(ministries)
    print(f"✓ Inserted {len(result.inserted_ids)} ministries")
else:
    print(f"⚠ Database already has {existing_count} ministries. Skipping ministry seed.")

# Create indexes for performance
db.issues.create_index([("location", "2dsphere")])
db.issues.create_index([("category", 1)])
db.issues.create_index([("status", 1)])
db.issues.create_index([("created_at", -1)])
db.users.create_index([("email", 1)], unique=True)
db.users.create_index([("phone", 1)], sparse=True)
print("✓ Created database indexes")

# Display database stats
print("\n📊 Database Statistics:")
print(f"   Ministries: {db.ministries.count_documents({})}")
print(f"   Users: {db.users.count_documents({})}")
print(f"   Issues: {db.issues.count_documents({})}")
print(f"   NGOs: {db.ngos.count_documents({})}")

print("\n✅ Database seeding complete!")
print("\n🚀 You can now start the Flask backend:")
print("   cd backend")
print("   python run.py")

client.close()
