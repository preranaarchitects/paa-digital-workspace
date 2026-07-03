import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const routesToPrerender = [
  '/about',
  '/services',
  '/projects',
  '/3dstudio',
  '/contact'
];

async function runPrerenderEngine() {
  const distPath = path.resolve(__dirname, 'dist');
  
  if (!fs.existsSync(distPath)) {
    console.error('❌ Build directory "/dist" not found. Please run your production build first.');
    process.exit(1);
  }

  const template = fs.readFileSync(path.resolve(distPath, 'index.html'), 'utf-8');

  console.log('📐 Starting SEO Pre-rendering Engine...');

  for (const route of routesToPrerender) {
    const routeFolder = path.join(distPath, route);
    
    if (!fs.existsSync(routeFolder)) {
      fs.mkdirSync(routeFolder, { recursive: true });
    }

    fs.writeFileSync(path.join(routeFolder, 'index.html'), template);
    console.log(`  ✓ Pre-rendered: dist${route}/index.html`);
  }

  console.log('🚀 SEO Pre-render task complete!');
}

runPrerenderEngine();