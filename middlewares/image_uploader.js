const multer = require("multer");

const storage = multer.memoryStorage();

const uploadImage = multer({
    storage,
    limits: {
        fileSize: 10 * 1024 * 1024
    },
    fileFilter: (req, file, cb) => {
        const allowedMimeTypes = [
            "image/jpeg",
            "image/jpg",
            "image/png",
            "image/webp"
        ];

        if (!allowedMimeTypes.includes(file.mimetype)) {
            return cb(
                new Error(
                    "Only JPEG, PNG and WEBP images are allowed"
                )
            );
        }

        cb(null, true);
    }
});

module.exports = uploadImage;