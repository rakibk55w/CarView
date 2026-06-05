class RegisterRequestDto {
    constructor(name, email, password) {
        this.name = name;
        this.email = email;
        this.password = password;
    }

    static fromRequest(reqBody){
        return new RegisterRequestDto(
            reqBody.name,
            reqBody.email,
            reqBody.password
        );
    }
}

module.exports = RegisterRequestDto;