import { transform } from '@svgr/core'

const svgToReact = async (svg, options) => {
  const { componentName, ...rest } = options;
  const code = await transform(svg, {
    replaceAttrValues: {
      '#4B515B': 'currentColor',
      '#000000': 'currentColor',
    },
    expandProps: 'end',
    icon: true,
    prettier: true,
    prettierConfig: {
      "printWidth": 60,
      "tabWidth": 2,
      "singleQuote": true,
      "trailingComma": "all",
      "bracketSpacing": true,
      "semi": false,
      "useTabs": false,
      "arrowParens": "avoid",
      "endOfLine": "lf"
    },
    typescript: true,
    ...rest,
  }, {
    componentName,
  });
  return code;
}

export default svgToReact;