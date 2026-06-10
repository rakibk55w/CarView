const cloudinary = require("../config/cloudinary");
const streamifier = require("streamifier");

const uploadImages = async (files, carId) => {
    const uploadPromises = files.map((file) => {
        return new Promise((resolve, reject) => {
            const stream = cloudinary.uploader.upload_stream({
                folder: `car-images/${carId}`
            },
            (error, result) => {
                if (error) {
                    reject(error);
                } else {
                    resolve(result);
                }
            });

            streamifier
                .createReadStream(file.buffer)
                .pipe(stream);
        });
    });

    const results = await Promise.all(uploadPromises);

    return results.map((result) => ({
        imageUrl: result.secure_url,
        publicId: result.public_id
    }));
};

const deleteImage = async (publicId) => {
    const result = await cloudinary.uploader.destroy(
        publicId
    );

    if (result.result !== "ok") {
        throw new Error(
            "Failed to delete image from Cloudinary"
        );
    }
};

module.exports = {
    uploadImages,
    deleteImage
};