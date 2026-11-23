import 'dotenv/config';
import express from 'express';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import Database from 'better-sqlite3';
import path from 'node:path';
import fs from 'node:fs';
import {fileURLToPath} from 'node:url';
import crypto from 'node:crypto';
const here=path.dirname(fileURLToPath(import.meta.url));
const app=express();
app.disable('x-powered-by');
app.set('trust proxy', false);
app.use(helmet({contentSecurityPolicy:false,crossOriginEmbedderPolicy:false}));
app.use(express.json({limit:'12kb'}));
const configuredOrigin=process.env.FRONTEND_ORIGIN||'http://localhost:5173';
app.use((req,res,next)=>{res.header('Access-Control-Allow-Origin',configuredOrigin);res.header('Vary','Origin');res.header('Access-Control-Allow-Methods','GET,POST,OPTIONS');res.header('Access-Control-Allow-Headers','Content-Type,Authorization');if(req.method==='OPTIONS')return res.sendStatus(204);next()});
const dbFile=process.env.DATABASE_PATH||path.join(here,'data','portfolio.sqlite');
fs.mkdirSync(path.dirname(dbFile),{recursive:true});
const db=new Database(dbFile);
db.pragma('journal_mode = WAL');
db.exec(`CREATE TABLE IF NOT EXISTS contact_messages (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT NOT NULL, email TEXT NOT NULL, subject TEXT NOT NULL, message TEXT NOT NULL, received_at TEXT NOT NULL DEFAULT (datetime('now')), status TEXT NOT NULL DEFAULT 'unread');`);
const insert=db.prepare('INSERT INTO contact_messages (name,email,subject,message) VALUES (?,?,?,?)');
const limiter=rateLimit({windowMs:15*60*1000,limit:5,standardHeaders:'draft-7',legacyHeaders:false,message:{error:'Too many messages. Please try again later.'}});
const clean=(v)=>typeof v==='string'?v.trim():'';
app.get('/api/health',(req,res)=>res.json({ok:true,service:'Resandu Portfolio API'}));
app.post('/api/contact',limiter,(req,res)=>{
  const {name,email,subject,message,website}=req.body||{};
  if(website)return res.json({ok:true}); // honeypot
  const n=clean(name),e=clean(email),s=clean(subject),m=clean(message);
  if(n.length<2||n.length>100||e.length>180||!/^\S+@\S+\.\S+$/.test(e)||s.length<2||s.length>180||m.length<10||m.length>3000)return res.status(400).json({error:'Please complete all fields with valid information.'});
  insert.run(n,e,s,m);return res.status(201).json({ok:true,message:'Message received.'});
});
function secureAdmin(req,res,next){
 const token=process.env.ADMIN_TOKEN;
 if(!token||token==='REPLACE_WITH_A_LONG_RANDOM_SECRET')return res.status(503).json({error:'Admin access has not been configured.'});
 const auth=req.get('authorization')||'';const supplied=auth.startsWith('Bearer ')?auth.slice(7):'';
 const a=Buffer.from(supplied),b=Buffer.from(token);
 if(a.length!==b.length||!crypto.timingSafeEqual(a,b))return res.status(401).json({error:'Unauthorized'});
 next();
}
app.get('/api/admin/messages',secureAdmin,(req,res)=>res.json(db.prepare('SELECT id,name,email,subject,message,received_at,status FROM contact_messages ORDER BY id DESC LIMIT 200').all()));
const frontendDist=path.resolve(here,'../frontend/dist');
if(fs.existsSync(frontendDist)){app.use(express.static(frontendDist));app.get('*',(req,res)=>res.sendFile(path.join(frontendDist,'index.html')))}
const port=Number(process.env.PORT||4000);
app.listen(port,()=>console.log(`Portfolio API running on http://localhost:${port}`));
