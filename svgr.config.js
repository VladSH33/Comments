const path = require('path');

module.exports = {
  outDir: './src/shared/assets/icons',
  icon: true,
  typescript: true,
  jsxRuntime: 'automatic',
  replaceAttrValues: {
    '#000': 'currentColor',
  },
  template: (variables, { tpl }) => tpl`
${variables.imports};

${variables.interfaces};

const ${variables.componentName} = (${variables.props}) => (
  ${variables.jsx}
);
 
${variables.exports};
`,
  indexTemplate: (files) => {
    const compoundExportEntries = files.map((file) => {
      const componentName = path.basename(file.path, path.extname(file.path));
      return componentName;
    });

    const importEntries = compoundExportEntries.map(
      (componentName) => `import ${componentName} from './${componentName}';`
    );

    return `${importEntries.join('\n')}

export const Icons = {
  ${compoundExportEntries.join(',\n  ')}
};

export type IconName = keyof typeof Icons;
`;
  },
};
