const cloudinary = require("../config/cloudinary");
const streamifier = require("streamifier");

const uploadBatchImages = async (files, id, folderName) => {
    const uploadPromises = files.map((file) => {
        return new Promise((resolve, reject) => {
            const stream = cloudinary.uploader.upload_stream({
                folder: `${folderName}/${id}`
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

const uploadSingleImage = async (file, id, folderName) => {
    return new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream({
            folder: `${folderName}/${id}`
        },
        (error, result) => {
            if (error) {
                reject(error);
            } else {
                resolve({
                    imageUrl: result.secure_url,
                    publicId: result.public_id
                });
            }
        });

        streamifier
            .createReadStream(file.buffer)
            .pipe(stream);
    });
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
    uploadBatchImages,
    uploadSingleImage,
    deleteImage
};