import fs from 'fs'
import path from 'path'
import svgToReact from './svgToReact.js'
import _ from 'lodash-es'
import fp from 'lodash/fp.js'
import f__dirname from './__dirname.js'

const __dirname = f__dirname(import.meta.url)

// const file = fs.readFileSync(`${__dirname}/assets/cloud-blank-02.svg`, {encoding: 'utf8', flag: 'r'});
const files = fs.readdirSync(path.join(__dirname, `../assets/`));

/**
 * @returns [
 *  {
 *    type: 'add',
 *    path: path.join(__dirname, '../src/components/파일이름'),
 *    templateFile: 'templates/icons.hbs',
 *    data: {
 *      code: 'export const Icon = () => <svg>...</svg>'
 *    }
 *  }
 * ]
 */
const icons = (ov) => {
  const icons = fp.compose(
    fp.map(async v => {
      const componentName = fp.compose(fp.replace(/\s+/g, ''), fp.startCase, fp.replace('.svg', ''))(v);
      const componentFileName = fp.compose(fp.replace('.svg', '.tsx'))(v);
      const svgFile = await fs.readFileSync(path.join(__dirname, `../assets/${v}`), {encoding: 'utf8', flag: 'r'});
      return {
        ..._.mapValues(ov, ovv => {
          ovv = ovv.replace('[[filename]]', componentFileName);
          return ovv;
        }),
        data: {
          code: _.replace(await svgToReact(svgFile, {componentName}), 'const ', 'export const ')
        }
      }
    }),
    // actions
  )(files)

  const index = {
    ..._.mapValues(ov, ovv => {
      ovv = ovv.replace('[[filename]]', '_index.ts');
      return ovv;
    }),
    data: {
      code: fp.compose(
        fp.map(v => `export * from './${v.replace('.svg', '')}'`),
      )(files).join('\n')
    }
  };

  return [...icons, index]
}

export default icons;