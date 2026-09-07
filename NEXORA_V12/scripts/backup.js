const fs=require('fs');const path=require('path');
const src=path.join(__dirname,'..','server','data','db.json');
const out=path.join(__dirname,'..','server','data','backups');
fs.mkdirSync(out,{recursive:true});
if(!fs.existsSync(src)) throw new Error('Database file not found');
const stamp=new Date().toISOString().replace(/[:.]/g,'-');
const dest=path.join(out,`db-${stamp}.json`);fs.copyFileSync(src,dest);console.log(`Backup created: ${dest}`);
