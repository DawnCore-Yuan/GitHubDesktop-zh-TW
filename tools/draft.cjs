const fs = require('node:fs')
const path = require('node:path')
const { loadDict, makeConverter } = require('./convert.cjs')

const tmp = '/tmp'
const stChars = loadDict(path.join(tmp, 'STCharacters.txt'))
const stPhrases = loadDict(path.join(tmp, 'STPhrases.txt'))
const twVariants = loadDict(path.join(tmp, 'TWVariants.txt')).m
const convert = makeConverter({ stChars: stChars.m, stPhrases: stPhrases.m, twVariants })

const src = JSON.parse(fs.readFileSync('/tmp/ghdwork/zh-cn-source-dict.json', 'utf8'))
const out = []
let converted = 0
for (const e of src.entries) {
  const r = convert(e.translation)
  out.push({ text: e.text, translation: r.text, sources: e.sources })
  if (r.text !== e.translation) converted++
}
fs.writeFileSync(path.join(__dirname, '..', 'work', 'draft-zh-TW.json'), JSON.stringify({ locale: 'zh-TW', draftFrom: 'zh-CN', entries: out }, null, 1))
console.log('entries', out.length, 'changedByConversion', converted)
