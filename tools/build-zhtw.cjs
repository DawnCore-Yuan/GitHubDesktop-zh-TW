// Reproducible zh-TW build. Reuses the upstream patch() engine; locale check patched minimally.
const fs = require('fs'), path = require('path'), crypto = require('crypto')
const { patch, loadDictionary } = require('../engine/generate.cjs')
const root = path.resolve(__dirname, '..')
const hash = x => crypto.createHash('sha256').update(x).digest('hex').toUpperCase()
const app = path.resolve(process.argv[2] || '/tmp/ghdwork/app')
const destination = path.resolve(process.argv[3] || path.join(root, 'build', 'app-3.6.10'))
if (destination === app || destination.startsWith(app + path.sep)) throw Error('Output cannot be inside the app directory.')
const metadata = JSON.parse(fs.readFileSync(path.join(app, 'package.json'), 'utf8'))
if (metadata.name !== 'desktop' || metadata.version !== '3.6.10') throw Error('Expected original GitHub Desktop 3.6.10.')
const manifest = JSON.parse(fs.readFileSync(path.join(root, 'zh-cn-manifest.json'), 'utf8'))
const dictionary = loadDictionary(path.join(root, 'zh-TW', 'dictionary.json'))
const results = []
const summary = {}
for (const entry of manifest.files) {
  const filename = path.join(app, entry.name)
  const original = fs.readFileSync(filename)
  if (hash(original) !== entry.original) throw Error('Original checksum mismatch (upstream): ' + entry.name)
  const out = patch(original.toString('utf8'), filename + '.map', dictionary)
  // pending = UI strings with no dictionary entry (same signal upstream reports, not a failure)
  summary[entry.name] = { occurrences: out.occurrences, unique: new Set(out.applied.map(a => a.text)).size, sha256: hash(out.result) }
  results.push([entry.name, out.result])
}
fs.mkdirSync(destination, { recursive: true })
for (const [file, content] of results) fs.writeFileSync(path.join(destination, file), content)
fs.writeFileSync(path.join(root, 'work', 'build-summary.json'), JSON.stringify({ version: '3.6.10', locale: 'zh-TW', files: summary }, null, 2) + '\n')
console.log(JSON.stringify(summary, null, 2))
