class UploadProfileImageResponseDto {
    constructor(image) {
        this.message = "Profile picture uploaded successfully";
        this.data = {
            image_url: image.image_url,
            cloudinary_public_id: image.cloudinary_public_id,
        };
    }
}

module.exports = UploadProfileImageResponseDto;