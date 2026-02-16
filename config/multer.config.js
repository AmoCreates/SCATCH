const multer = require('multer');


const storage = multer.memoryStorage();

const upload = multer({ 
  storage: storage,
  limits: { 
    fileSize: 1024 * 1024 * 5 // Limit to 2MB to protect memory
  }
});

module.exports = upload;