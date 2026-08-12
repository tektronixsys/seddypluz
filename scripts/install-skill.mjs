import fs from 'fs';
import path from 'path';

const skillsDir = 'd:/15K/seddypluz/.agents/skills';
const sourceBase = path.join(skillsDir, 'ui-ux-pro-max/.claude/skills');

if (fs.existsSync(sourceBase)) {
  const entries = fs.readdirSync(sourceBase);
  for (const entry of entries) {
    const srcPath = path.join(sourceBase, entry);
    const destPath = path.join(skillsDir, entry === 'ui-ux-pro-max' ? '__temp_ui_ux' : entry);
    if (fs.statSync(srcPath).isDirectory()) {
      fs.cpSync(srcPath, destPath, { recursive: true, force: true });
      console.log(`Copied ${entry} to ${destPath}`);
    }
  }

  // Remove the old ui-ux-pro-max clone
  fs.rmSync(path.join(skillsDir, 'ui-ux-pro-max'), { recursive: true, force: true });

  // Rename temp to ui-ux-pro-max
  fs.renameSync(path.join(skillsDir, '__temp_ui_ux'), path.join(skillsDir, 'ui-ux-pro-max'));
  console.log('Successfully structured UI/UX Pro Max skill');
} else {
  console.log('Source base not found:', sourceBase);
}
