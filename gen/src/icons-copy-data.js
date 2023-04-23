import fs from 'fs'
import path from 'path'
import svgToReact from './svgToReact.js'
import _ from 'lodash-es'
import fp from 'lodash/fp.js'
import f__dirname from './__dirname.js'

const __dirname = f__dirname(import.meta.url)
const files = fs.readdirSync(path.join(__dirname, `../assets/`));

const template = (variables, { tpl }) => {
  return tpl`
${variables.jsx}
`
}

/**
 * @returns [
 *  {
 *    type: 'add',
 *    path: path.join(__dirname, '../src/components/파일이름'),
 *    templateFile: 'templates/icons.hbs',
 *    data: {
 *      svg: 'export const Icon = () => <svg>...</svg>',
 *      jsx: '',
 *    }
 *  }
 * ]
 */
const iconsCopyData = (ov) => {
  const icons = fp.compose(
    fp.map(async v => {
      const componentName = fp.compose(fp.replace(/\s+/g, ''), fp.startCase, fp.replace('.svg', ''))(v);
      const componentFileName = fp.compose(fp.replace('.svg', '-data.ts'))(v);
      const svgFile = await fs.readFileSync(path.join(__dirname, `../assets/${v}`), {encoding: 'utf8', flag: 'r'});
      return {
        ..._.mapValues(ov, ovv => {
          ovv = ovv.replace('[[filename]]', componentFileName);
          return ovv;
        }),
        data: {
          var_name: componentName,
          jsx: await svgToReact(svgFile, {componentName, template}),
          svg: svgFile.replace('#4B515B', 'currentColor').replace('#000000', 'currentColor'),
          import: `import { ${componentName} } from '@hyeon/icon'\n<${componentName} />`,
        }
      }
    }),
    // actions
  )(files)

  const index = {
    ..._.mapValues(ov, ovv => {
      ovv = ovv.replace('[[filename]]', '_index-data.ts');
      return ovv;
    }),
    templateFile: 'templates/icons.hbs',
    data: {
      code: fp.compose(
        fp.map(v => `export * from './${v.replace('.svg', '-data')}'`),
      )(files).join('\n')
    }
  };

  return [...icons, index]
}

export default iconsCopyData;