#!/usr/bin/env node
import { existsSync, readFileSync, writeFileSync } from 'node:fs';
import { copyFile, mkdir, readdir } from 'node:fs/promises';
import { join } from 'node:path';

async function copyIcons() {
  const publicDir = 'public';
  const nodeDestination = 'dist/nodes';
  const credDestination = 'dist/credentials';

  // Create destination directories if they don't exist
  if (!existsSync(nodeDestination)) {
    await mkdir(nodeDestination, { recursive: true });
  }
  if (!existsSync(credDestination)) {
    await mkdir(credDestination, { recursive: true });
  }

  // Copy all images from public to both nodes and credentials dist folders
  const files = await readdir(publicDir, { recursive: true });
  const imageFiles = files.filter((file) => file.endsWith('.png') || file.endsWith('.svg'));

  for (const file of imageFiles) {
    const sourcePath = join(publicDir, file);
    const nodeDestPath = join(nodeDestination, file);
    const credDestPath = join(credDestination, file);

    // Create subdirectories if they don't exist
    const nodeDestDir = join(nodeDestination, file.split('/').slice(0, -1).join('/'));
    const credDestDir = join(credDestination, file.split('/').slice(0, -1).join('/'));

    if (file.includes('/')) {
      if (!existsSync(nodeDestDir)) {
        await mkdir(nodeDestDir, { recursive: true });
      }
      if (!existsSync(credDestDir)) {
        await mkdir(credDestDir, { recursive: true });
      }
    }

    await copyFile(sourcePath, nodeDestPath);
    await copyFile(sourcePath, credDestPath);
  }

  console.log(`Copied ${imageFiles.length} image files to dist folders`);
}

async function copyIndex() {
  // Copy index.js to dist folder
  const sourcePath = 'index.js';
  const destPath = 'dist/index.js';

  if (existsSync(sourcePath)) {
    await copyFile(sourcePath, destPath);
    console.log('Copied index.js to dist folder');
  }
}

async function createDistPackageJson() {
  // Read the source package.json
  const sourcePackagePath = 'package.json';
  const destPackagePath = 'dist/package.json';

  if (existsSync(sourcePackagePath)) {
    const packageJson = JSON.parse(readFileSync(sourcePackagePath, 'utf8'));

    // Remove the "type": "module" field for n8n compatibility
    delete packageJson.type;

    // Write the modified package.json to dist folder
    writeFileSync(destPackagePath, JSON.stringify(packageJson, null, 2));
    console.log('Created dist package.json without type: module');
  }
}

async function main() {
  await copyIcons();
  await copyIndex();
  await createDistPackageJson();
}

main().catch(console.error);
