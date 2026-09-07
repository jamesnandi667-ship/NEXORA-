const fs=require('fs');const path=require('path');
const dir=process.env.NEXORA_DATA_DIR ? path.resolve(process.env.NEXORA_DATA_DIR) : path.join(__dirname,'data'),file=path.join(dir,'db.json');
// Single source of truth for the DB schema. Every collection the server ever
// reads/writes must be listed here so normalization never drifts out of sync.
const ARRAY_KEYS=['users','posts','groups','messages','directMessages','payments','sessions','opportunities','listings','events','stories','notifications','applications','reports','supportTickets','orders','reviews','postReactions','carts','passwordResets','loginEvents','aiChats','twoFactor','checkins'];
const OBJECT_KEYS=['courseProgress'];
const empty={};for(const k of ARRAY_KEYS)empty[k]=[];for(const k of OBJECT_KEYS)empty[k]={};
if(!fs.existsSync(dir))fs.mkdirSync(dir,{recursive:true});
if(!fs.existsSync(file))fs.writeFileSync(file,JSON.stringify(empty,null,2));
function normalize(d){for(const k of ARRAY_KEYS)if(!Array.isArray(d[k]))d[k]=[];for(const k of OBJECT_KEYS)if(!d[k]||typeof d[k]!=='object'||Array.isArray(d[k]))d[k]={};return d}
function read(){return normalize(JSON.parse(fs.readFileSync(file,'utf8')))}
function write(db){const tmp=file+'.tmp';fs.writeFileSync(tmp,JSON.stringify(db,null,2));fs.renameSync(tmp,file)}
function id(prefix='id'){return `${prefix}_${Date.now()}_${Math.random().toString(36).slice(2,9)}`}
function now(){return new Date().toISOString()}
module.exports={read,write,id,now}
