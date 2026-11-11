#!/usr/bin/env node
import { readFileSync, writeFileSync } from 'fs';
import { Resvg } from '@resvg/resvg-js';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));

const sizes = [
  { size: 192, input: 'icon-192.svg', output: 'icon-192.png' },
  { size: 512, input: 'icon-512.svg', output: 'icon-512.png' },
];

console.log('🎨 Generando iconos PWA en formato PNG...\n');

for (const { size, input, output } of sizes) {
  try {
    const svgPath = join(__dirname, '../public/icons', input);
    const pngPath = join(__dirname, '../public/icons', output);

    console.log(`📄 Leyendo: ${input}`);
    const svg = readFileSync(svgPath);

    console.log(`🔄 Renderizando ${size}×${size}px...`);
    const resvg = new Resvg(svg, {
      fitTo: {
        mode: 'width',
        value: size,
      },
    });

    const pngData = resvg.render();
    const pngBuffer = pngData.asPng();

    console.log(`💾 Guardando: ${output}`);
    writeFileSync(pngPath, pngBuffer);

    console.log(`✅ ${output} generado (${(pngBuffer.length / 1024).toFixed(2)} KB)\n`);
  } catch (error) {
    console.error(`❌ Error procesando ${input}:`, error.message);
    process.exit(1);
  }
}

console.log('🎉 Iconos PWA generados exitosamente!');
