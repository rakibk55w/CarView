class LoginRequestDto {
    constructor(email, password) {
        this.email = email;
        this.password = password
    }

    static fromRequest(reqBody){
        return new LoginRequestDto(
            reqBody.email,
            reqBody.password
        );
    }
}

module.exports = LoginRequestDto;