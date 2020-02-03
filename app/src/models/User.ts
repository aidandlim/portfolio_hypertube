class User {
    id: number;
    userName: string;
    password: string;
    email: string;
    firstName: string;
    lastName: string;
    picture: string;

    constructor(
        id: number,
        userName: string,
        password: string,
        email: string,
        firstName: string,
        lastName: string,
        picture: string,
        
    ) {
        this.id = id;
        this.userName = userName;
        this.password = password;
        this.email = email;
        this.firstName = firstName;
        this.lastName = lastName;
        this.picture = picture;
    }
}

export default User;