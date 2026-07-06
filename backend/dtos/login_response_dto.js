class LoginResponseDto {
    constructor(accessToken) {
        this.message = "Login successful";
        this.access_token = accessToken;
    }
}

module.exports = LoginResponseDto;