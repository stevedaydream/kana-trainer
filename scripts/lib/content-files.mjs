import fs from 'node:fs';
import path from 'node:path';
import vm from 'node:vm';
import { randomUUID } from 'node:crypto';

export function readWindowData(file, key) {
  const sandbox = { window: {} };
  vm.runInNewContext(fs.readFileSync(file, 'utf8'), sandbox, { timeout: 1000 });
  if (sandbox.window[key] == null) throw Error(`Missing ${key} in ${path.basename(file)}`);
  return JSON.parse(JSON.stringify(sandbox.window[key]));
}
export function atomicWrite(file, content) {
  const temporary = file + '.' + randomUUID() + '.tmp';
  try { fs.writeFileSync(temporary, content, { flag: 'wx' }); fs.renameSync(temporary, file); }
  finally { if (fs.existsSync(temporary)) fs.unlinkSync(temporary); }
}
