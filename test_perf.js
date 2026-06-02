const fs = require('fs');
const { SKILLS, CATS } = require('./skills-data.js');

// Benchmark the filter code
const iterations = 100000;

const start1 = performance.now();
for (let i = 0; i < iterations; i++) {
  let searchQ = 'SEO';
  let catFilter = 'All';
  const q = searchQ.toLowerCase();

  const filtered = SKILLS.filter(s => {
    const matchCat = catFilter === 'All' || s.cat === catFilter;
    const matchQ = !q || s.name.toLowerCase().includes(q) || s.tagline.toLowerCase().includes(q) || s.desc.toLowerCase().includes(q);
    return matchCat && matchQ;
  });
}
const end1 = performance.now();

const start2 = performance.now();
for (let i = 0; i < iterations; i++) {
  let searchQ = 'SEO';
  let catFilter = 'All';
  const q = searchQ.toLowerCase();

  const filtered = SKILLS.filter(s => {
    if (catFilter !== 'All' && s.cat !== catFilter) return false;
    if (!q) return true;
    return s.name.toLowerCase().includes(q) ||
           s.tagline.toLowerCase().includes(q) ||
           s.desc.toLowerCase().includes(q);
  });
}
const end2 = performance.now();

console.log(`Current filter time: ${end1 - start1}ms`);
console.log(`Optimized filter time: ${end2 - start2}ms`);
