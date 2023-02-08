class MyPlugin {
  constructor() {}
  apply(compiler) {
    // compiler.hooks.done.tap('MyPlugin', () => {
    //   console.log('编译完成');
    // });

    compiler.hooks.emit.tap('MyPlugin', (compilation) => {
      let assets = compilation.assets;
      let content = '士大夫撒地方';
      Object.entries(assets).forEach(([filename, sataObj]) => {
        content += `文件名 ${filename} 文件大小 ${sataObj.size()} \n`;
      });
      console.log('content: ', content);
    });
  }
}

module.exports = MyPlugin;
