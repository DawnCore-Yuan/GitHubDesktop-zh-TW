// Draft converter: OpenCC forward S2T (phrase->char) + TWVariants.
// Ambiguous (one-to-many) mappings are NOT guessed: emitted as markers for manual review.
const fs = require('node:fs')

function loadDict(file, onAmbiguous) {
  const m = new Map()
  let ambiguous = 0
  for (const ln of fs.readFileSync(file, 'utf8').split('\n')) {
    if (!ln || ln.startsWith('#')) continue
    const t = ln.indexOf('\t')
    if (t < 0) continue
    const k = ln.slice(0, t)
    const vals = ln.slice(t + 1).trim().split(' ').filter(Boolean)
    if (vals.length > 1) { ambiguous++; if (onAmbiguous) onAmbiguous(k, vals); continue }
    m.set(k, vals[0])
  }
  return { m, ambiguous }
}

function makeConverter({ stChars, stPhrases, twVariants, maxPhrase = 8 }) {
  return function convert(text) {
    const unknown = []
    const out = []
    let i = 0
    while (i < text.length) {
      let hit = null, len = 0
      for (let L = Math.min(maxPhrase, text.length - i); L >= 1; L--) {
        const sub = text.slice(i, i + L)
        if (stPhrases.has(sub)) { hit = stPhrases.get(sub); len = L; break }
      }
      if (hit === null && stChars.has(text[i])) { hit = stChars.get(text[i]); len = 1 }
      if (hit === null) {
        // check ambiguity membership so callers can review instead of trusting output
        const ch = text[i]
        if (stChars.isAmbiguous?.(ch) || stPhrases.isAmbiguous?.(ch)) unknown.push({ at: i, ch })
        out.push(ch); i += 1; continue
      }
      out.push(hit); i += len
    }
    const joined = out.join('')
    const tw = [...joined].map(c => (twVariants.has(c) ? twVariants.get(c) : c)).join('')
    return { text: tw, untranslated: unknown }
  }
}

module.exports = { loadDict, makeConverter }
