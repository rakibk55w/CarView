class UploadCarImageResponseDto {
    constructor(images) {
        this.message = "Car images uploaded successfully";
        this.data = images.map((image) => ({
            id: image.id,
            image_url: image.image_url,
            cloudinary_public_id: image.cloudinary_public_id
        }));
    }
}

module.exports = UploadCarImageResponseDto;