import path from 'path'
import icons from './src/icons.js'
import iconsCopyData from './src/icons-copy-data.js'
import f__dirname from './src/__dirname.js'
const __dirname = f__dirname(import.meta.url)

// plopfile.js
export default async function (
  /** @type {import('plop').NodePlopAPI} */
  plop
) {
  plop.setGenerator('svg-tsx', {
    description: 'svg convert typescript-react icon components',
    prompts: [],
    actions: await Promise.all(icons({
      type: 'add',
      path: path.join(__dirname, '../app','src/components/[[filename]]'),
      templateFile: 'templates/icons.hbs',
    }))
  })
  
  plop.setGenerator('svg-copy-data', {
    description: 'svg convert copy-data',
    prompts: [],
    actions: await Promise.all(iconsCopyData({
      type: 'add',
      path: path.join(__dirname, '../app','src/components/[[filename]]'),
      templateFile: 'templates/icons-copy-data.hbs',
    }))
  })
};
