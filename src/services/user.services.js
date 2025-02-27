import User from '../models/userModel.js'

class UserService {
  static async createUser (user) {
    try {
      return await User.create(user)
    } catch (error) {
      if (error.name === 'SequelizeUniqueConstraintError') {
        console.log('Error: User has already been created.')
      }
    }
  }

  static async getAllUsers () {
    try {
      return await User.findAll()
    } catch (error) {
      console.log(error.message)
    }
  }

  static async getUserById (id) {
    try {
      return await User.findByPk(id)
    } catch (error) {
      console.log(error.message)
    }
  }

  static async getUserByName (username) {
    try {
      return await User.findOne({ where: { username } })
    } catch (error) {
      console.log(error.message)
    }
  }

  static async getUserByEmail (email) {
    try {
      return await User.findOne({ where: { email } })
    } catch (error) {
      console.log(error.message)
    }
  }

  static async getUsersByRole (userRole) {
    try {
      return await User.findAll({ where: { role: userRole } })
    } catch (error) {
      console.log(error.message)
    }
  }

  static async updateUserRole (userId, newRole) {
    try {
      return await User.update({ role: newRole }, { where: { id: userId } })
    } catch (error) {
      console.log(error.message)
    }
  }

  static async updateUserEmail (userId, newEmail) {
    try {
      return await User.update({ email: newEmail }, { where: { id: userId } })
    } catch (error) {
      console.log(error.message)
    }
  }

  static async deleteUser (userId) {
    try {
      return await User.destroy({ where: { id: userId } })
    } catch (error) {
      console.log(error.message)
    }
  }

  static async verifyCredentials (username, email) {
    try {
      return await User.findOne({ where: { username, email } })
    } catch (error) {
      console.log(error.message)
    }
  }
}

export default UserService
