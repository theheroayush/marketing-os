
## 2025-05-19 - In-memory Caching vs Structured Clone
**Learning:** Returning `structuredClone` after caching `JSON.parse` adds overhead, meaning caching raw JSON strings might be faster for simple reads, and caching direct references risks mutation.
**Action:** When creating in-memory caches to prevent `JSON.parse` overhead, consider caching the raw string when mutation risk is high, or fully documenting `structuredClone` trade-offs when enforcing deep copies to prevent cache poisoning.
