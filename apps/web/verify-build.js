#!/usr/bin/env node

/**
 * Build Verification Script for CUREX Frontend
 * Checks if the build output is valid for deployment
 */

import { existsSync, readFileSync, readdirSync, statSync } from 'fs';
import { join } from 'path';

const DIST_DIR = './dist';
const REQUIRED_FILES = [
  'index.html',
];

console.log('🔍 Verifying build output for deployment...\n');

// Check if dist directory exists
if (!existsSync(DIST_DIR)) {
  console.error('❌ ERROR: dist directory not found!');
  console.error('   Run: npm run build\n');
  process.exit(1);
}

console.log('✅ dist directory exists');

// Check required files
let allFilesExist = true;
for (const file of REQUIRED_FILES) {
  const filePath = join(DIST_DIR, file);
  if (existsSync(filePath)) {
    console.log(`✅ ${file} exists`);
  } else {
    console.error(`❌ ${file} NOT FOUND`);
    allFilesExist = false;
  }
}

if (!allFilesExist) {
  console.error('\n❌ Build verification failed: Missing required files');
  process.exit(1);
}

// Check for assets directory
const assetsDir = join(DIST_DIR, 'assets');
if (existsSync(assetsDir)) {
  const assets = readdirSync(assetsDir);
  const jsFiles = assets.filter(f => f.endsWith('.js'));
  const cssFiles = assets.filter(f => f.endsWith('.css'));
  
  console.log(`✅ assets directory contains ${jsFiles.length} JS files and ${cssFiles.length} CSS files`);
} else {
  console.warn('⚠️  WARNING: assets directory not found');
}

// Check index.html content
const indexPath = join(DIST_DIR, 'index.html');
const indexContent = readFileSync(indexPath, 'utf-8');

if (indexContent.includes('/src/main.tsx')) {
  console.error('❌ ERROR: index.html still references source files!');
  console.error('   Build process may have failed. Check for errors.');
  process.exit(1);
} else {
  console.log('✅ index.html references built assets');
}

if (indexContent.includes('script') && indexContent.includes('assets/')) {
  console.log('✅ JavaScript bundle is linked correctly');
} else {
  console.warn('⚠️  WARNING: JavaScript bundle link not found in index.html');
}

// Calculate total size
let totalSize = 0;
function calculateSize(dir) {
  const files = readdirSync(dir);
  for (const file of files) {
    const filePath = join(dir, file);
    const stat = statSync(filePath);
    if (stat.isDirectory()) {
      calculateSize(filePath);
    } else {
      totalSize += stat.size;
    }
  }
}

calculateSize(DIST_DIR);
const sizeMB = (totalSize / 1024 / 1024).toFixed(2);
console.log(`📦 Total build size: ${sizeMB} MB`);

// Check for SPA routing configuration
const configFiles = [
  { file: 'vercel.json', name: 'Vercel' },
  { file: 'netlify.toml', name: 'Netlify' },
  { file: '_redirects', name: 'Generic SPA routing' }
];

console.log('\n🔧 Deployment Configuration:');
for (const { file, name } of configFiles) {
  if (existsSync(file)) {
    console.log(`✅ ${name} config (${file}) found`);
  } else {
    console.warn(`⚠️  ${name} config (${file}) NOT FOUND`);
  }
}

// Final verdict
console.log('\n' + '='.repeat(60));
console.log('✅ BUILD VERIFICATION PASSED!');
console.log('='.repeat(60));
console.log('\n📋 Deployment Checklist:');
console.log('   1. ✓ Build output is valid');
console.log('   2. ⚠️  Set Root Directory to "apps/web" on your platform');
console.log('   3. ⚠️  Ensure Build Command is "npm run build"');
console.log('   4. ⚠️  Ensure Output Directory is "dist"');
console.log('\n🚀 Ready to deploy!\n');
