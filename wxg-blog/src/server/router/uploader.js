const fs = require('fs');
const path = require('path');
const md5 = require('md5');

module.exports = async ctx => {
    ctx.body = await new Promise((resolve, reject) => {
        const { file } = ctx.request.files;
        const suffix = file.name.split('.').pop();
        fs.readFile(file.path, (err, buffer) => {
            const md5str = md5(buffer);
            const imgdir = path.resolve(__dirname, '../../public/image');
            let _path = path.join(imgdir, `${md5str}.${suffix}`);

            fs.writeFile(_path, buffer, err => {
                !err ? resolve({url: `/image/${md5str}.${suffix}`}) : reject({msg: 'Failed!'});
            });
        });
    });
};