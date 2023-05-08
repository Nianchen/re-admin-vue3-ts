const express = require('express');const app = express();
const multer = require('multer');
const path = require('path');
const fs = require('fs');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/')
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname)
  }
})

const upload = multer({ storage: storage });

app.post('/upload', upload.single('file'), (req, res) => {
  if (!req.file) {
    res.status(400).send('No file uploaded.');
  } else {
    // 将上传的文件保存到 uploads 目录
    const fileStream = fs.createReadStream(req.file.path);
    const destinationPath = path.join('uploads', 'original', req.file.originalname);
    const destStream = fs.createWriteStream(destinationPath);
    fileStream.pipe(destStream);

    // 返回成功信息
    res.send('File uploaded!');
  }
});


// 启动服务器
const port = 3000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
