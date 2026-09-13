const fs = require('fs');
const path = require('path');

function walk(dir) {
    let results = [];
    const list = fs.readdirSync(dir);
    list.forEach(file => {
        file = path.join(dir, file);
        const stat = fs.statSync(file);
        if (stat && stat.isDirectory()) { 
            results = results.concat(walk(file));
        } else if (file.endsWith('.js') || file.endsWith('.jsx')) {
            results.push(file);
        }
    });
    return results;
}

const files = walk('c:/Users/namit/OneDrive/Desktop/conekt/AUGUST-BLACK/CGMWTAUGUST2025/terrene/src');

files.forEach(file => {
    let content = fs.readFileSync(file, 'utf8');
    let changed = false;
    
    content = content.replace(/(["'`])(\/[^"'`\s]+?\.(?:jpg|jpeg|png))\1/g, (match, quote, originalPath) => {
        // Exclude hero, logos, and spotlight images from replacement
        if (
            originalPath.startsWith('/home/') ||
            originalPath.startsWith('/spotlight/') ||
            originalPath.startsWith('/logos/') ||
            originalPath === '/studio/about-hero.png'
        ) {
            return match; // keep original
        }
        
        // For dynamic archive images, just replace the path
        if (originalPath === '/archive/archive-${itemNum}.jpg') {
            changed = true;
            return quote + '/spotlight/${(itemNum % 10) + 1}.jpg.jpeg' + quote;
        }
        
        const randomNum = Math.floor(Math.random() * 10) + 1;
        changed = true;
        return `${quote}/spotlight/${randomNum}.jpg.jpeg${quote}`;
    });
    
    // Quick fix for the archive template literal in case regex missed it
    if (content.includes('`/archive/archive-${itemNum}.jpg`')) {
        content = content.replace('`/archive/archive-${itemNum}.jpg`', '`/spotlight/${(itemNum % 10) + 1}.jpg.jpeg`');
        changed = true;
    }

    if (changed) {
        fs.writeFileSync(file, content, 'utf8');
        console.log(`Updated images in ${file}`);
    }
});
