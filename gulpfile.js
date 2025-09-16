const path = require('path');
const { task, src, dest } = require('gulp');

task('build:icons', copyIcons);

function copyIcons() {
    // Copy icon from public folder to nodes and credentials folders
    const iconSource = path.resolve('public', 'cogfy.svg');
    
    // Copy to each individual node folder
    src(iconSource).pipe(dest(path.resolve('dist', 'nodes', 'CogfyMessenger')));
    src(iconSource).pipe(dest(path.resolve('dist', 'nodes', 'CogfyTables')));
    
    // Copy to credentials folder
    return src(iconSource).pipe(dest(path.resolve('dist', 'credentials')));
}