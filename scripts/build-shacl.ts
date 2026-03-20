/**
 * Build script: generates SHACL JSON from TypeScript Ad4mModel classes.
 *
 * Usage: npx tsx scripts/build-shacl.ts <path-to-ts-file> <output-json>
 *
 * Example:
 *   npx tsx scripts/build-shacl.ts soa/v1/StateOfAffair.ts soa/v1/StateOfAffair.json
 */
import { writeFileSync } from 'fs';
import { resolve } from 'path';

const [, , inputPath, outputPath] = process.argv;

if (!inputPath || !outputPath) {
  console.error('Usage: npx tsx scripts/build-shacl.ts <input.ts> <output.json>');
  process.exit(1);
}

async function main() {
  const modulePath = resolve(inputPath);
  const mod = await import(modulePath);

  // Find the Ad4mModel subclass export
  const ModelClass = mod.default || Object.values(mod).find((v: any) => v?.generateSHACL);

  if (!ModelClass || typeof (ModelClass as any).generateSHACL !== 'function') {
    console.error(`No Ad4mModel class with generateSHACL() found in ${inputPath}`);
    process.exit(1);
  }

  const { shape, name } = (ModelClass as any).generateSHACL();

  if (!shape) {
    console.error(`generateSHACL() returned null shape for ${name || inputPath}`);
    process.exit(1);
  }

  const json = JSON.stringify(shape, null, 2);
  writeFileSync(resolve(outputPath), json + '\n');
  console.log(`✅ ${name}: ${outputPath} (${json.length} bytes)`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
