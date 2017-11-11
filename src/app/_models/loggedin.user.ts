export class LoggedInUser {
    constructor(access_token: string, username: string, email: string
    ) {
        this.access_token = access_token;
        this.username = username;
        this.email = email;

    }
    public id: string;
    public access_token: string;
    public username: string;
    public email: string;
}
