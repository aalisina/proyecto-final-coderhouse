const Grid = require('gridfs-stream');
const mongoose = require('mongoose');
const express = require('express');
const upload = require('../middlewares/upload');

const router = express.Router();

let gfs;

const conn = mongoose.connection;
conn.once('open', () => {
  gfs = Grid(conn.db, mongoose.mongo);
  gfs.collection('photos');
  console.log('Connected to Grid');
});

router.post('/upload', upload.single('file'), async (req, res) => {
  if (req.file === undefined) return res.send('you must select a file.');
  const imgUrl = `http://localhost:8080/file/${req.file.filename}`;
  return res.send(imgUrl);
});

// media routes
router.get('/:filename', async (req, res) => {
  try {
    const file = await gfs.files.findOne({ filename: req.params.filename });
    const readStream = gfs.createReadStream(file.filename);
    readStream.pipe(res);
  } catch (error) {
    res.send('not found');
  }
});

router.delete('/file/:filename', async (req, res) => {
  try {
    await gfs.files.deleteOne({ filename: req.params.filename });
    res.send('success');
  } catch (error) {
    console.log(error);
    res.send('An error occured.');
  }
});

module.exports = router;
