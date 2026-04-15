#!/bin/bash
# ==============================================================================
# Git History Cleanup Script
# Removes hardcoded secrets from all git commits using git-filter-repo
# ==============================================================================
#
# Prerequisites:
#   pip install git-filter-repo
#
# Usage:
#   1. Make a backup of your repo first!
#   2. Run: bash scripts/cleanup-git-history.sh
#   3. After cleanup: git push --force
#   4. All collaborators must re-clone the repo
#
# ==============================================================================

set -e

echo "⚠️  This will rewrite ALL git history. Make sure you have a backup!"
echo "Press Ctrl+C to cancel, or Enter to continue..."
read

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"

echo "🔍 Running git-filter-repo to scrub secrets..."
git filter-repo --replace-text "$SCRIPT_DIR/secrets-to-scrub.txt" --force

echo "🧹 Cleaning up..."
git reflog expire --expire=now --all
git gc --prune=now --aggressive

echo "✅ Git history has been rewritten."
echo ""
echo "Next steps:"
echo "  1. Verify the repo looks correct"
echo "  2. Run: git push --force"
echo "  3. Tell all collaborators to re-clone"
echo "  4. Delete scripts/secrets-to-scrub.txt"
