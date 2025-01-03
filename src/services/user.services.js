import User from '../models/userModel.js';

class UserService {
    static async createUser(user) {
        try {
            const newUser = await User.create(user);
            return newUser;
        } catch (error) {
            if (error.name === 'SequelizeUniqueConstraintError') {
                console.log('Error: El usuario ya existe.');
            }
        }
    }

    static async getAllUsers() {
        try {
            const users = await User.findAll();
            return users;
        } catch (error) {
            throw error;
        }
    }

    static async getUserById(id) {
        try {
            const user = await User.findByPk(id);
            return user;
        }catch (error) {
            throw error;
        }
    }

    static async getUserByName(username) {
        try {
            const user = await User.findOne({ where: { username } });
            return user;
        } catch (error) {
            throw error;
        }
    }
    
    static async getUserByEmail(email) {
        try {
            const user = await User.findOne({ where: { email } });
            return user;
        } catch (error) {
            throw error;
        }
    }   
}

export default UserService;
