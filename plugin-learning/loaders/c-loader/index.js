module.exports = function(content, map, meta){
    console.log('------ start -----')
    console.log(`map ${map};\nmeta ${meta};\n\ncontent\n${content};\n`)
    console.log('------ end -----\n')

    this.callback(null, content, '{c}', 'c');

    return;
}

module.exports.raw = true;