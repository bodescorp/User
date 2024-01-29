// import * as multer from "multer";
import multer, { Multer, StorageEngine } from "multer";
import * as path from "path";

const storage: StorageEngine = multer.diskStorage({
  destination: "./uploads",
  filename: function (req, file, callback) {
    callback(
      null,
      file.fieldname + "-" + Date.now() + path.extname(file.originalname)
    );
  },
});
const fileFilter = function (request, file, callback) {
  const allowedMimes = [
    "application/pdf",
    "image/png",
    "image/jpg",
    "image/jpeg",
  ];

  if (allowedMimes.includes(file.mimetype)) {
    callback(null, true);
  } else {
    callback(new Error("Invalid file type."));
  }
};

const limits = {
  fileSize: 64 * 1024 * 1024,
  fieldNameSize: 100,
};

const upload: Multer = multer({
  storage: storage,
  limits: limits,
  fileFilter: fileFilter,
});
export { upload };
