import { readFile, writeFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { transform } from 'esbuild';

// Only production inline assets are minified; the editable HTML stays readable.
const root = new URL('../', import.meta.url);
const source = (await readFile(new URL('src/index.html', root), 'utf8')).replace(/\r\n/g, '\n');
let output = source;
for (const match of source.matchAll(/<(style|script)>([\s\S]*?)<\/\1>/g)) {
  const [, tag, code] = match;
  const result = await transform(code, {
    loader: tag === 'style' ? 'css' : 'js',
    minify: true,
    legalComments: 'none',
    target: ['chrome100', 'edge100', 'firefox100', 'safari15.4'],
  });
  output = output.replace(match[0], `<${tag}>${result.code.trim()}</${tag}>`);
}
const target = new URL('index.html', root);
if (process.argv.includes('--check')) {
  const current = await readFile(target, 'utf8');
  if (current.replace(/\r\n/g, '\n') !== output) throw new Error('index.html is stale. Run npm --prefix tools run build.');
  console.log('Production HTML matches the readable source.');
} else {
  await writeFile(target, output);
  console.log(`Built ${fileURLToPath(target)} (${Buffer.byteLength(output)} bytes).`);
}
