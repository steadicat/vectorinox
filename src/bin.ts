import * as fs from 'fs';
import {clean} from './index';
const files = process.argv.slice(2);

for (let f of files) {
  console.log(f);
  const data = fs.readFileSync(f);
  const cleaned = clean(data.toString());
  fs.writeFileSync(f, cleaned);
}