#!/usr/bin/env node

// Test script to validate the unified skill schema
import fs from 'fs';
import path from 'path';

const contentIndexPath = './static/data/content-index.json';

if (!fs.existsSync(contentIndexPath)) {
  console.error('❌ Content index not found. Run npm run build:index first.');
  process.exit(1);
}

const index = JSON.parse(fs.readFileSync(contentIndexPath, 'utf8'));
const skills = index.skills || [];

console.log('🔍 Validating Unified Skill Schema\n');

// Test 1: Check that JS skills are included
const jsSkills = skills.filter(s => s.source === 'javascript');
const mdSkills = skills.filter(s => s.source === 'markdown');
const catalogSkills = skills.filter(s => s.source === 'catalog');

console.log(`✅ Skills by source:`);
console.log(`   JavaScript: ${jsSkills.length}`);
console.log(`   Markdown: ${mdSkills.length}`);
console.log(`   Catalog: ${catalogSkills.length}`);
console.log(`   Total: ${skills.length}\n`);

// Test 2: Check specific skills exist
const expectedJSSkills = ['math/modular-arithmetic', 'ai/reinforcement-learning'];
const expectedMDSkills = ['programming/conditionals', 'programming/arrays'];

console.log(`✅ Checking expected skills:`);
for (const skillId of expectedJSSkills) {
  const skill = skills.find(s => s.id === skillId);
  if (skill && skill.source === 'javascript') {
    console.log(`   ✓ ${skillId} (JS) - ${skill.title}`);
  } else {
    console.log(`   ❌ ${skillId} (JS) - missing or wrong source`);
  }
}

for (const skillId of expectedMDSkills) {
  const skill = skills.find(s => s.id === skillId);
  if (skill && skill.source === 'markdown') {
    console.log(`   ✓ ${skillId} (MD) - ${skill.title}`);
  } else {
    console.log(`   ❌ ${skillId} (MD) - missing or wrong source`);
  }
}

// Test 3: Check JS skills have rich content
console.log(`\n✅ Checking JS skills have rich content:`);
for (const skill of jsSkills) {
  const hasLearn = skill.learn && (skill.learn.explainer || skill.learn.references);
  const hasPractice = skill.practice && (skill.practice.shortDrill || skill.practice.apStyle);
  const hasProjects = skill.projectsUsing && skill.projectsUsing.length > 0;
  
  console.log(`   ${skill.id}:`);
  console.log(`     Learn section: ${hasLearn ? '✓' : '❌'}`);
  console.log(`     Practice section: ${hasPractice ? '✓' : '❌'}`);
  console.log(`     Projects using: ${hasProjects ? '✓' : '❌'}`);
}

// Test 4: Check level normalization
console.log(`\n✅ Checking level normalization:`);
const skillsWithLevels = skills.filter(s => s.levels && Object.keys(s.levels).length > 0);
console.log(`   Skills with levels: ${skillsWithLevels.length}/${skills.length}`);

for (const skill of skillsWithLevels.slice(0, 3)) { // Check first 3
  const levelKeys = Object.keys(skill.levels);
  console.log(`   ${skill.id}: [${levelKeys.join(', ')}] (${skill.source})`);
}

// Test 5: Check all skills have required fields
console.log(`\n✅ Checking required fields:`);
const requiredFields = ['id', 'title', 'category', 'path', 'status', 'source'];
let validSkills = 0;

for (const skill of skills) {
  const hasAllRequired = requiredFields.every(field => skill[field] !== undefined);
  if (hasAllRequired) {
    validSkills++;
  } else {
    const missing = requiredFields.filter(field => skill[field] === undefined);
    console.log(`   ❌ ${skill.id || 'unknown'} missing: ${missing.join(', ')}`);
  }
}

console.log(`   Valid skills: ${validSkills}/${skills.length}`);

// Summary
console.log(`\n📊 Summary:`);
console.log(`   Total skills processed: ${skills.length}`);
console.log(`   JavaScript skills with rich content: ${jsSkills.length}`);
console.log(`   Markdown skills: ${mdSkills.length}`);
console.log(`   Missing skills from catalog: ${catalogSkills.length}`);
console.log(`   Schema validation: ${validSkills === skills.length ? '✅ PASSED' : '❌ FAILED'}`);

if (jsSkills.length >= 2 && mdSkills.length >= 8) {
  console.log(`\n🎉 Unified skill schema is working correctly!`);
  process.exit(0);
} else {
  console.log(`\n❌ Some skills are missing from the unified schema.`);
  process.exit(1);
}