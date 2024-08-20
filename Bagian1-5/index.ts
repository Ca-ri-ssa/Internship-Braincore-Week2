import { sum, prod } from './calculate.ts';
import { watch} from 'node:fs';

let a: number = 5;
let b: number = 6;
const ansSum = sum(5, 6);
const ansProd = prod(5, 6);

const content = `Terdapat ${a} dan ${b}:
- Jika kedua angka tersebut ditambah, maka menghasilkan ${ansSum}.
- Jika kedua angka tersebut dikalikan, maka menghasilkan ${ansProd}.`;

Bun.write('./file.txt', content);
console.log(`file.txt telah tercatat`);

watch(import.meta.dir + "/file.txt", async (event, filename) => {
    if(event === "change") {
        const content = await Bun.file(`./${filename}`).text();
        Bun.write('./copy.txt', content);
        console.log(`${filename} telah berhasil diperbarui`);
    }
});