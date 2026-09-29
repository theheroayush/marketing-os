## $(date +%Y-%m-%d) - Pre-computing Search Strings for List Filtering
**Learning:** In vanilla JavaScript list filtering (like search bars), running dynamic string allocations or `.toLowerCase()` on multiple properties inside the filter loop is inefficient.
**Action:** Pre-compute a concatenated, lowercased search string property (e.g., `_searchString = \`\${a} | \${b}\`.toLowerCase()`) during initialization, reducing the filter loop to a single `.includes()` check.
