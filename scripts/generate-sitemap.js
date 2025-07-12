import { SitemapStream, streamToPromise } from 'sitemap';
import { createWriteStream } from 'fs';
// scripts/generate-sitemap.js

const smStream = new SitemapStream({ hostname: 'https://array-psi.vercel.app' })
const writeStream = createWriteStream('public/sitemap.xml')
smStream.pipe(writeStream)
// add your URLs
smStream.write({ url: '/',  changefreq: 'daily',  priority: 1.0 })
smStream.write({ url: '/home', changefreq: 'weekly', priority: 0.8 })
// …etc
smStream.end()

