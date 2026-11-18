from pathlib import Path
import json,re
ROOT=Path(__file__).resolve().parent
D=json.loads((ROOT/'heap-data.json').read_text())
assert len({p['slug'] for p in D['problems']})==len(D['problems'])
assert all(p['diff'] in ('Easy','Medium','Hard') and p['level'] in {l['id'] for l in D['levels']} for p in D['problems'])
tpl=(ROOT/'heap.template.html').read_text()
(ROOT/'heap.html').write_text(tpl.replace('__HEAP_DATA__',json.dumps(D,separators=(',',':')).replace('<','\\u003c')))
print(f"Built heap.html: {len(D['problems'])} problems, {len(D['levels'])} stages")
