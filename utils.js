const fs = require('fs')
//引用imageinfo模块
const imageInfo = require("imageinfo");

function readFileList(filePath, filesList) {
    const files = fs.readdirSync(filePath);
    files.forEach(function (itm, index) {
      const stat = fs.statSync(filePath + itm);
        if (stat.isDirectory()) {
            //递归读取文件
            readFileList(filePath + itm + "/", filesList)
        } else {
            const obj = {
              path: filePath,//路径
              filename: itm,//名字
            };//定义一个对象存放文件的路径和名字等信息
            filesList.push(obj);
        }
    })
}

//获取文件夹下的所有文件
function getFileList (path) {
    const filesList = [];
    readFileList(path, filesList);
    return filesList;
}

/**
 * 获取文件夹下的所有图片
 *
 * @param {string} path
 * @return {*} object { path: string; filename: string; type: 'image'; format: 'PNG'; mimeType: 'image/png'; width: number; height: number }
 */
function getImageFiles (path) {
    const imageList = [];
    getFileList(path).forEach((item) => {
        const ms = imageInfo(fs.readFileSync(item.path + item.filename));
        ms.mimeType && (imageList.push({
          ...item,
          ...ms
        }))
    });
    return imageList;
}

module.exports = {
  getFileList,
  getImageFiles
};
