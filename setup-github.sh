#!/bin/bash
# CivikLink SL - GitHub Setup Helper
# Run this after creating repository on GitHub

echo "==========================================="
echo "CivikLink SL - GitHub Setup"
echo "==========================================="
echo ""

# Get GitHub username
read -p "Enter your GitHub username: " GITHUB_USER

# Get repository name (default: civiklink)
read -p "Enter repository name [civiklink]: " REPO_NAME
REPO_NAME=${REPO_NAME:-civiklink}

echo ""
echo "==========================================="
echo "Commands to run:"
echo "==========================================="
echo ""
echo "# Add remote repository"
echo "git remote add origin https://github.com/$GITHUB_USER/$REPO_NAME.git"
echo ""
echo "# Push code to GitHub"
echo "git push -u origin main"
echo ""
echo "==========================================="
echo "After pushing, add collaborators at:"
echo "https://github.com/$GITHUB_USER/$REPO_NAME/settings/access"
echo "==========================================="
echo ""
echo "Collaborators to add:"
echo "  - 2001zaz"
echo "  - NuzrathR"
echo ""

# Ask if user wants to run commands now
read -p "Run these commands now? (y/n): " RUN_NOW

if [ "$RUN_NOW" = "y" ] || [ "$RUN_NOW" = "Y" ]; then
    echo ""
    echo "Adding remote..."
    git remote add origin https://github.com/$GITHUB_USER/$REPO_NAME.git
    
    echo ""
    echo "Pushing to GitHub..."
    git push -u origin main
    
    echo ""
    echo "✅ Done! Visit your repository:"
    echo "https://github.com/$GITHUB_USER/$REPO_NAME"
else
    echo ""
    echo "Copy the commands above and run them manually."
fi
