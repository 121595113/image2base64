const fs = require('fs')
const { getImageFiles } = require('./utils')

const entry = './images/'
const output = 'dist'

const images = getImageFiles(entry);
const result = {};
images.forEach(item => {
  const bitmap = fs.readFileSync(item.path + item.filename);
  const base64str = Buffer.from(bitmap, 'binary').toString('base64'); // base64编码
  ''.lastIndexOf('.')
  result[item.filename.slice(0, item.filename.lastIndexOf('.'))] = `data:${item.mimeType};base64,${base64str}`
});

if (!fs.existsSync(output)) {
 fs.mkdirSync(output)
}

fs.writeFile(`${output}/base64.json`, JSON.stringify(result, null, 2),{ flag: 'w+' }, err => {
  if (err) {
    console.error(err)
    return
  }
  //文件写入成功。
})
