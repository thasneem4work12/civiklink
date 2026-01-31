"""
CivikLink System Testing Script
Tests the complete flow with 2 different user types
"""
import requests
import json
from datetime import datetime

BASE_URL = "http://localhost:5000/api"

print("=" * 60)
print("🧪 CivikLink System Test")
print("=" * 60)

# Store tokens
tokens = {}

def print_result(title, response):
    """Print formatted test result"""
    status_icon = "✅" if response.status_code < 400 else "❌"
    print(f"\n{status_icon} {title}")
    print(f"   Status: {response.status_code}")
    if response.status_code < 400:
        try:
            data = response.json()
            print(f"   Response: {json.dumps(data, indent=2)[:200]}...")
        except:
            print(f"   Response: {response.text[:100]}")
    else:
        print(f"   Error: {response.text}")

# ============ TEST USER 1: CITIZEN ============
print("\n" + "=" * 60)
print("👤 TEST USER 1: CITIZEN (Kasun Silva)")
print("=" * 60)

# 1. Register Citizen
print("\n📝 Step 1: Register Citizen Account")
citizen_data = {
    "email": "kasun.silva@test.com",
    "password": "Citizen@123",
    "full_name": "Kasun Silva",
    "phone": "0771234567",
    "role": "citizen"
}

response = requests.post(f"{BASE_URL}/auth/register", json=citizen_data)
print_result("Register Citizen", response)

if response.status_code == 201:
    tokens['citizen'] = response.json().get('access_token')
    print(f"   🔑 Citizen Token: {tokens['citizen'][:30]}...")

# 2. Login Citizen (if registration failed because user exists)
if response.status_code != 201:
    print("\n🔐 Attempting Login Instead")
    login_data = {
        "email": "kasun.silva@test.com",
        "password": "Citizen@123"
    }
    response = requests.post(f"{BASE_URL}/auth/login", json=login_data)
    print_result("Login Citizen", response)
    if response.status_code == 200:
        tokens['citizen'] = response.json().get('access_token')

# 3. Get Citizen Profile
if 'citizen' in tokens:
    print("\n👤 Step 2: Get Citizen Profile")
    headers = {"Authorization": f"Bearer {tokens['citizen']}"}
    response = requests.get(f"{BASE_URL}/auth/profile", headers=headers)
    print_result("Get Profile", response)

# 4. Post an Issue
if 'citizen' in tokens:
    print("\n📋 Step 3: Post an Issue")
    headers = {"Authorization": f"Bearer {tokens['citizen']}"}
    issue_data = {
        "title": "Water Pipeline Burst on Main Road",
        "description": "Major water pipeline has burst near the market area, causing severe flooding. Urgent attention needed.",
        "category": "water",
        "location": {
            "address": "Market Road, Colombo 03",
            "district": "Colombo",
            "coordinates": [6.9271, 79.8612]
        },
        "priority": "high",
        "images": ["https://example.com/image1.jpg"]
    }
    response = requests.post(f"{BASE_URL}/issues", json=issue_data, headers=headers)
    print_result("Post Issue", response)
    
    if response.status_code == 201:
        issue_id = response.json().get('issue', {}).get('id')
        print(f"   📌 Issue ID: {issue_id}")
        tokens['issue_id'] = issue_id

# 5. Get My Issues
if 'citizen' in tokens:
    print("\n📜 Step 4: Get My Issues")
    headers = {"Authorization": f"Bearer {tokens['citizen']}"}
    response = requests.get(f"{BASE_URL}/issues/my-issues", headers=headers)
    print_result("Get My Issues", response)

# ============ TEST USER 2: GOVERNMENT OFFICIAL ============
print("\n" + "=" * 60)
print("🏛️  TEST USER 2: GOVERNMENT OFFICIAL (Nimal Perera)")
print("=" * 60)

# 1. Register Government User
print("\n📝 Step 1: Register Government Account")

# First, get a ministry ID
response = requests.get(f"{BASE_URL}/ministries")
ministries = response.json().get('ministries', [])
water_ministry = next((m for m in ministries if 'Water' in m['name_en']), ministries[0] if ministries else None)

gov_data = {
    "email": "nimal.gov@ministry.lk",
    "password": "Gov@123456",
    "full_name": "Nimal Perera",
    "phone": "0771234568",
    "role": "government",
    "ministry_id": water_ministry['id'] if water_ministry else None
}

response = requests.post(f"{BASE_URL}/auth/register", json=gov_data)
print_result("Register Government", response)

if response.status_code == 201:
    tokens['government'] = response.json().get('access_token')
    print(f"   🔑 Government Token: {tokens['government'][:30]}...")

# 2. Login Government (if registration failed)
if response.status_code != 201:
    print("\n🔐 Attempting Login Instead")
    login_data = {
        "email": "nimal.gov@ministry.lk",
        "password": "Gov@123456"
    }
    response = requests.post(f"{BASE_URL}/auth/login", json=login_data)
    print_result("Login Government", response)
    if response.status_code == 200:
        tokens['government'] = response.json().get('access_token')

# 3. Get Government Dashboard
if 'government' in tokens:
    print("\n📊 Step 2: Get Government Dashboard")
    headers = {"Authorization": f"Bearer {tokens['government']}"}
    response = requests.get(f"{BASE_URL}/government/dashboard", headers=headers)
    print_result("Get Dashboard", response)

# 4. Get Tagged Issues
if 'government' in tokens:
    print("\n📋 Step 3: Get Issues Tagged to Ministry")
    headers = {"Authorization": f"Bearer {tokens['government']}"}
    response = requests.get(f"{BASE_URL}/government/tagged-issues", headers=headers)
    print_result("Get Tagged Issues", response)

# 5. Respond to Issue (if we have an issue)
if 'government' in tokens and 'issue_id' in tokens:
    print("\n💬 Step 4: Respond to Citizen's Issue")
    headers = {"Authorization": f"Bearer {tokens['government']}"}
    response_data = {
        "message": "We have received your complaint and dispatched our maintenance team to investigate. Expected resolution within 24-48 hours.",
        "action_taken": "Maintenance team assigned to the location"
    }
    response = requests.post(
        f"{BASE_URL}/government/issues/{tokens['issue_id']}/respond",
        json=response_data,
        headers=headers
    )
    print_result("Respond to Issue", response)

# ============ PUBLIC TESTS ============
print("\n" + "=" * 60)
print("🌐 PUBLIC API TESTS (No Authentication)")
print("=" * 60)

# 1. Get Public Feed
print("\n📰 Test 1: Get Public Feed")
response = requests.get(f"{BASE_URL}/issues")
print_result("Get Public Feed", response)

# 2. Get Statistics
print("\n📊 Test 2: Get Platform Statistics")
response = requests.get(f"{BASE_URL}/stats")
print_result("Get Statistics", response)

# 3. Get Categories
print("\n🏷️  Test 3: Get Issue Categories")
response = requests.get(f"{BASE_URL}/categories")
print_result("Get Categories", response)

# 4. Get Districts
print("\n🗺️  Test 4: Get Districts List")
response = requests.get(f"{BASE_URL}/districts")
print_result("Get Districts", response)

# 5. Get Leaderboard
print("\n🏆 Test 5: Get Leaderboard")
response = requests.get(f"{BASE_URL}/leaderboard")
print_result("Get Leaderboard", response)

# ============ SUMMARY ============
print("\n" + "=" * 60)
print("📝 TEST SUMMARY")
print("=" * 60)
print("\n✅ Tested Features:")
print("   • User Registration (Citizen & Government)")
print("   • User Login & Authentication")
print("   • Profile Management")
print("   • Issue Creation & Management")
print("   • Government Response System")
print("   • Public API Endpoints")
print("\n🔑 Test Credentials Created:")
print("   Citizen:    kasun.silva@test.com / Citizen@123")
print("   Government: nimal.gov@ministry.lk / Gov@123456")
print("\n" + "=" * 60)
print("✅ SYSTEM TEST COMPLETE!")
print("=" * 60)
