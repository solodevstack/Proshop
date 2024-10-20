import bcryptjs from "bcryptjs";

const users = [
    {
        name: "Admin User",
        email: "admin@email.com",
        password: bcryptjs.hashSync("123456", 10),
        isAdmin: true
    },
    {
        name: "John Doe",
        email: "john@email.com",
        password: bcryptjs.hashSync("123456", 10),
        isAdmin: true
    },
    {
        name: "jane Dao",
        email: "jane@email.com",
        password: bcryptjs.hashSync("123456", 10),
        isAdmin: false
    }
]
export default users;