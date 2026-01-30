"""
Ministry tagging service - Auto-tag ministries based on issue category.
"""
from app.models.ministry import Ministry

class TaggingService:
    """Service for automatic ministry tagging."""
    
    # Category to ministry mapping
    CATEGORY_MINISTRY_MAP = {
        'water': ['water_supply', 'irrigation'],
        'electricity': ['power_energy'],
        'road': ['highways', 'transport'],
        'flood': ['disaster_management', 'irrigation'],
        'waste': ['urban_development', 'local_government'],
        'other': []
    }
    
    @staticmethod
    def tag_ministries_by_category(category):
        """
        Auto-tag relevant ministries based on issue category.
        Returns list of ministry IDs.
        """
        # Get ministries that handle this category
        ministries = Ministry.find_by_category(category)
        
        return [ministry['_id'] for ministry in ministries]
    
    @staticmethod
    def tag_by_location(district, category):
        """
        Tag ministries based on location and category.
        Can be extended for district-specific tagging.
        """
        # For now, use category-based tagging
        # In future, can add district-specific ministry offices
        return TaggingService.tag_ministries_by_category(category)
    
    @staticmethod
    def suggest_ministries(issue_title, issue_description, category):
        """
        Use keyword analysis to suggest additional ministries.
        Can be enhanced with ML/NLP in the future.
        """
        ministries = TaggingService.tag_ministries_by_category(category)
        
        # Keywords for additional tagging
        keywords = {
            'health': ['health'],
            'education': ['education'],
            'police': ['law_enforcement'],
            'environment': ['environment']
        }
        
        text = f"{issue_title} {issue_description}".lower()
        
        for keyword, ministry_categories in keywords.items():
            if keyword in text:
                for cat in ministry_categories:
                    additional = Ministry.find_by_category(cat)
                    ministries.extend([m['_id'] for m in additional])
        
        # Remove duplicates
        return list(set(ministries))
