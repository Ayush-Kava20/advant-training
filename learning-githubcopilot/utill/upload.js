import multer from 'multer';

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'public/images/'); // Set the destination folder for uploaded files
  },
  filename: (req, file, cb) => {    
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, file.fieldname + '-' + uniqueSuffix + '-' + file.originalname); // Set the filename with a unique suffix
  }
});

const upload = multer({ storage: storage });

export default upload;
