import multer from "multer";
import path from "path";
import sharp from "sharp";
import fs from "fs";

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./public/data/uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

export const uploadImg = multer({
  storage: storage,
  limits: { fileSize: 10000000 },
  fileFilter(req, file, cb) {
    if (!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
      return cb(new Error("Please upload a valid image file"));
    }
    cb(null, true);
  },
});

export const resizeImg = async (file: Express.Multer.File) => {
  const uniquePrefix = Date.now() + "_" + Math.round(Math.random() * 1e9);
  const imgPath = path.join(
    file.destination,
    uniquePrefix + "_" + file.filename
  );
  await sharp(file.path)
    .resize({ width: 200, height: 200 })
    .png()
    .toFile(imgPath)
    .then((e) => {
      deleteImg(file.path);
    });

  return imgPath;
};

export const deleteImg = (path: string) => {
  fs.unlink(path, (e) => {
    if (e) {
      console.error("Error deleting original file:", e);
    }
  });
};
