"""Fix MongoDB indexes for GeoJSON"""
from pymongo import MongoClient

client = MongoClient('mongodb://localhost:27017/')
db = client.civiklink

print("🔧 Fixing MongoDB indexes...")

# Drop old coordinate index if exists
try:
    db.issues.drop_index('location.coordinates_2d')
    print("✅ Dropped old 2d index")
except:
    print("ℹ️  No old 2d index to drop")

# Create new 2dsphere index for GeoJSON
try:
    db.issues.create_index([('location', '2dsphere')])
    print("✅ Created 2dsphere index for GeoJSON")
except Exception as e:
    print(f"⚠️  Error creating index: {e}")

print("\n📋 Current indexes on issues collection:")
for idx in db.issues.list_indexes():
    print(f"   - {idx['name']}: {idx.get('key', {})}")

print("\n✅ Index fix complete!")
