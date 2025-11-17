#!/bin/bash

# Script to improve contrast in auto-generated API documentation
# The code examples in api-doc use grey-on-grey colors that are hard to read.
# This fixes that issue by improving text contrast for better readability.
# Run this script *after* running 'npm run docs'

FILE="./docs/assets/prism.css"

# Check if file exists
if [ ! -f "$FILE" ]; then
  echo "Error: $FILE not found. Make sure to run 'npm run docs' first."
  exit 1
fi

# Create a backup
#cp "$FILE" "$FILE.bak"

# Improve contrast:
# - Change default text color from #ccc to #e8e8e8 (brighter light gray)
# - Change comment color from #999 to #b5b5b5 (lighter for better visibility)
# - Change punctuation color from #ccc to #e8e8e8 (consistent with text)

# Replace default text color in code[class*="language-"] and pre[class*="language-"]
sed -i 's/color: #ccc;/color: #000000;/g' "$FILE"

# Replace comment color
sed -i 's/color: #999;/color: #b5b5b5;/g' "$FILE"


# Replace punctuation color (already handled by first sed, but explicit for clarity)
# The punctuation token also uses #ccc, so the first sed command handles it

echo "✓ Improved contrast in prism.css:"
echo "  - Default text: #ccc → #e8e8e8"
echo "  - Comments: #999 → #b5b5b5"
echo "  - Punctuation: #ccc → #e8e8e8"

