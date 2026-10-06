const fs = require('fs');
const content = fs.readFileSync('init.sql', 'utf8');

const insertRegex = /INSERT IGNORE INTO[\s\S]*?;/g;
const matches = content.match(insertRegex);

if (matches) {
  // H2 doesn't support INSERT IGNORE INTO in the same way, we can change it to INSERT INTO
  // but it might fail on duplicate, which is fine for initial setup. Or we can just use MERGE INTO (H2 specific)
  // Let's just change INSERT IGNORE to INSERT.
  let sql = matches.join('\n\n').replace(/INSERT IGNORE INTO/g, 'INSERT INTO');
  fs.writeFileSync('data.sql', sql);
} else {
  fs.writeFileSync('data.sql', '');
}
