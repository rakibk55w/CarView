class UpdatePasswordRequestDto {
    constructor(currentPassword, newPassword) {
        this.currentPassword = currentPassword,
        this.newPassword = newPassword
    }

    static fromRequest(reqBody){
        return new UpdatePasswordRequestDto(
            reqBody.current_password,
            reqBody.new_password
        );
    }
}

module.exports = UpdatePasswordRequestDto;