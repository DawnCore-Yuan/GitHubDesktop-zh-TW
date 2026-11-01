const fs=require('fs')
const d=JSON.parse(fs.readFileSync('zh-TW/dictionary.json','utf8'))
const cn=JSON.parse(fs.readFileSync('/tmp/ghdwork/zh-cn-source-dict.json','utf8'))
const cnMap=new Map(cn.entries.map(e=>[e.text,e.translation]))
// curated review sets (explicitly reviewed against English by this session)
const stashKeys=d.entries.filter(e=>/(stash|stashing)/i.test(e.text)).map(e=>e.text)
const highRisk=d.entries.filter(e=>/^(Discard|Are you sure you want to discard|Confirm discard|Permanently discard|This will discard|Force P|Force push|Are you sure you want to force|Delete branch|Reset to commit|You have changes in progress\. Resetting)/.test(e.text)).map(e=>e.text)
const reviewed=new Set([...stashKeys,...highRisk])
const auto=[],review=[],rewrite=[]
for(const e of d.entries){
  const before=cnMap.get(e.text)
  if(!reviewed.has(e.text)) auto.push(e)
  else if(e.translation===before) review.push(e)
  else rewrite.push(e)
}
console.log(JSON.stringify({total:d.entries.length, reviewed:reviewed.size, sameAsCn:review.length, rewritten:rewrite.length, unreviewed:auto.length},null,1))
fs.writeFileSync('work/review-status.json',JSON.stringify({reviewedAgainstEnglish:[...reviewed],counts:{total:d.entries.length,reviewedCount:reviewed.size,rewritten:rewrite.length,sameAsCn:review.length,unreviewed:auto.length}},null,2))
