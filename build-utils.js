#!/usr/bin/env node
import { existsSync } from 'node:fs';
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

copyIcons().catch(console.error);
