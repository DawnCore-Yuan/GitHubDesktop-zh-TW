const fs=require('fs')
const d=JSON.parse(fs.readFileSync('zh-TW/dictionary.json','utf8'))
const stc=new Set()
for(const ln of fs.readFileSync('dicts/STCharacters.txt','utf8').split('\n')){
  if(!ln||ln.startsWith('#'))continue
  const t=ln.indexOf('\t'); if(t<0)continue
  stc.add(ln.slice(0,t))
}
// Only count chars that OpenCC maps to a DIFFERENT traditional form (i.e. truly simplified)
const simp=new Map()
for(const ln of fs.readFileSync('dicts/STCharacters.txt','utf8').split('\n')){
  if(!ln||ln.startsWith('#'))continue
  const t=ln.indexOf('\t'); if(t<0)continue
  const k=ln.slice(0,t), v=ln.slice(t+1).split(' ')[0]
  if([...k].length===1&&[...v].length===1&&k!==v) simp.set(k,v)
}
const bad=[]
for(const e of d.entries){
  const hits=[...new Set([...e.translation].filter(c=>simp.has(c)))]
  if(hits.length) bad.push({text:e.text, translation:e.translation, chars:hits.join('')})
}
console.log('true simplified chars remaining:', bad.length)
const byChar={}
for(const b of bad) for(const c of b.chars) byChar[c]=(byChar[c]||0)+1
console.log('by char:', JSON.stringify(Object.entries(byChar).sort((a,b)=>b[1]-a[1]).slice(0,30)))
fs.writeFileSync('work/residual-simplified.json', JSON.stringify(bad,null,2))
for(const b of bad.slice(0,15)) console.log('  ', JSON.stringify(b.text).slice(0,60), '|', b.translation.slice(0,40), '|', b.chars)
