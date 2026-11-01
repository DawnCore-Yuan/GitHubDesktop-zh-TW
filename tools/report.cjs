const fs=require('fs'),path=require('path'),crypto=require('crypto')
const root=path.resolve(__dirname,'..')
const {patch,loadDictionary}=require('../engine/generate.cjs')
const dict=JSON.parse(fs.readFileSync(path.join(root,'zh-TW','dictionary.json'),'utf8'))
const entries=loadDictionary(path.join(root,'zh-TW','dictionary.json'))
const app='/tmp/ghdwork/app'
const report={version:'3.6.10',locale:'zh-TW',dictionaryEntries:entries.size,files:{},applied:[],pending:[]}
for(const f of ['main.js','renderer.js','crash.js']){
  const src=fs.readFileSync(path.join(app,f),'utf8')
  const r=patch(src,path.join(app,f+'.map'),entries)
  report.files[f]={occurrences:r.occurrences,unique:new Set(r.applied.map(x=>x.text)).size,applied:r.applied.length}
  report.applied.push(...r.applied.map(x=>({file:f,...x})))
  report.pending.push(...r.pending.map(x=>({file:f,...x})))
}
report.dictionary={
  total:dict.entries.length,

}
fs.writeFileSync(path.join(root,'zh-TW','translation-report.json'),JSON.stringify(report,null,2))
console.log('applied',report.applied.length,'pending',report.pending.length)
for(const k of Object.keys(report.files))console.log(' ',k,JSON.stringify(report.files[k]))
