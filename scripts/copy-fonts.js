#!/usr/bin/env node

/**
 * Script to copy font files from react-native-vector-icons to Android assets
 * This ensures icons work properly on Android
 */

const fs = require('fs');
const path = require('path');

const projectRoot = path.resolve(__dirname, '..');
const fontsSource = path.join(projectRoot, 'node_modules', 'react-native-vector-icons', 'Fonts');
const fontsDest = path.join(projectRoot, 'android', 'app', 'src', 'main', 'assets', 'fonts');

// Create destination directory if it doesn't exist
if (!fs.existsSync(fontsDest)) {
    fs.mkdirSync(fontsDest, { recursive: true });
}

// Copy all font files
if (fs.existsSync(fontsSource)) {
    const fontFiles = fs.readdirSync(fontsSource).filter(file => file.endsWith('.ttf'));

    fontFiles.forEach(file => {
        const sourcePath = path.join(fontsSource, file);
        const destPath = path.join(fontsDest, file);
        fs.copyFileSync(sourcePath, destPath);
        console.log(`Copied ${file} to assets/fonts`);
    });

    console.log(`✓ Copied ${fontFiles.length} font files successfully`);
} else {
    console.warn(`Warning: Font source directory not found: ${fontsSource}`);
}

