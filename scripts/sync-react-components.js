#!/usr/bin/env node
/**
 * Sync @lucitra/react-components to latest version
 */

const fs = require('fs');
const { execSync } = require('child_process');
const path = require('path');

console.log('🔍 Checking for latest @lucitra/react-components version...');

try {
  // Get current version
  const packagePath = path.join(__dirname, '..', 'package.json');
  const packageJson = JSON.parse(fs.readFileSync(packagePath, 'utf8'));
  const currentVersion = packageJson.dependencies['@lucitra/react-components'];
  
  // Get latest version from npm
  const latestVersion = execSync('npm view @lucitra/react-components version', { encoding: 'utf8' }).trim();
  
  console.log(`📌 Current version: ${currentVersion}`);
  console.log(`🚀 Latest version:  ${latestVersion}`);
  
  // Update if needed
  if (currentVersion !== `^${latestVersion}`) {
    packageJson.dependencies['@lucitra/react-components'] = `^${latestVersion}`;
    fs.writeFileSync(packagePath, JSON.stringify(packageJson, null, 2) + '\n');
    
    console.log(`✅ Updated package.json to use ^${latestVersion}`);
    console.log('📦 Running npm install...');
    
    execSync('npm install', { stdio: 'inherit' });
    console.log('✅ Dependencies updated!');
    
    // Create commit message
    console.log('\n💡 Suggested commit message:');
    console.log(`chore(deps): update @lucitra/react-components to ${latestVersion}`);
  } else {
    console.log('✅ Already using the latest version!');
  }
} catch (error) {
  console.error('❌ Error syncing versions:', error.message);
  process.exit(1);
}