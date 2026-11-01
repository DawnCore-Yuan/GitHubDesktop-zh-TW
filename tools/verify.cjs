const fs=require('fs'),path=require('path')
const root=path.resolve(__dirname,'..')
const {parse}=require('../engine/javascript.cjs')
const orig=process.argv[2]||process.env.GHD_APP||path.join(root,'.app');
const built=process.argv[3]||path.join(root,'build','final')
const files=['main.js','renderer.js','crash.js']
const out=[]
// normalize: compare AST after stripping literal VALUES (structure only)
const strip=v=>{
  if(Array.isArray(v))return v.map(strip)
  if(v&&typeof v==='object'){const o={};for(const k of Object.keys(v)){if(['start','end','loc','raw','value','cooked','name','label','regex'].includes(k))continue;o[k]=strip(v[k])}return o}
  return v
}
for(const f of files){
  const a=fs.readFileSync(path.join(orig,f),'utf8')
  const b=fs.readFileSync(path.join(built,f),'utf8')
  let syntaxOk=true, syntaxErr=''
  try{parse(b)}catch(e){syntaxOk=false;syntaxErr=e.message}
  const sameStructure = syntaxOk ? JSON.stringify(strip(parse(a)))===JSON.stringify(strip(parse(b))) : false
  // placeholder check on applied strings
  const ph=/\$\{[^}]*\}|\{[0-9]+\}|%[sd]/g
  const dict=JSON.parse(fs.readFileSync(path.join(root,'zh-TW','dictionary.json'),'utf8'))
  let phBad=0;const phSamples=[]
  for(const e of dict.entries){
    const a1=(e.text.match(ph)||[]).sort().join(',')
    const b1=(e.translation.match(ph)||[]).sort().join(',')
    if(a1!==b1){phBad++; if(phSamples.length<5)phSamples.push([e.text,e.translation])}
  }
  out.push({file:f,syntaxOk,syntaxErr,sameStructure,placeholderMismatch:phBad,phSamples})
}
fs.writeFileSync(path.join(root,'work','verify-report.json'),JSON.stringify(out,null,2))
for(const o of out)console.log(o.file,'syntax',o.syntaxOk,'structureSame',o.sameStructure,'phMismatch',o.placeholderMismatch)
for(const o of out)for(const s of o.phSamples)console.log('  PH:',JSON.stringify(s[0]).slice(0,70),'|',s[1].slice(0,50))
