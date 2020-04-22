function APlugin(options) {
    // 使用 options 设置插件实例……
}

APlugin.prototype.apply = function (compiler) {
    compiler.hooks.entryOption.tap('APlugin', arg => {
        console.log(`<--------------------------------------------> ${arg}`)
    });
    compiler.hooks.done.tap('APlugin', stats => {
        console.log('<---------------------------------------------> Hello World!', stats);
    });
};

module.exports = APlugin;