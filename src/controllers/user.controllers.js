import UserService from "../services/user.services.js";
import User from "../models/userModel.js";

class UserController {
    static async createUser(req, res) {
        try {
            const user = await UserService.getUserByName(req.body.username);

            if(user instanceof User) {
                return res.status(400).send({
                    "success": false,
                    "message": "User has already been created"
                });
            }

            const newUser = await UserService.createUser(req.body);

            return res.status(201).send({
                "success": true,
                "message": "User created successfully",
                "data": newUser
            });
        } catch (error) {
            console.log(error);
        }
    }

    static async getAllUsers(req, res) {
        try {
            const users = await UserService.getAllUsers();

            if(!Array.isArray(users) || users.length === 0) {
                return res.status(404).send({
                    "success": false,
                    "message": "No users found"
                });
            }

            return res.status(200).send({
                "success": true,
                "message": "Users retrieved successfully",
                "data": users
            });
        } catch (error) {
            console.log(error);
        }
    }

    static async getUserById(req, res) {
        try {
            const id = req.params.userId;
            const user = await UserService.getUserById(id);

            if(!user) {
                return res.status(404).send({
                    "success": false,
                    "message": `User with id: ${id} not found`
                });
            }

            res.status(200).send({
                "success": true,
                "message": "User retrieved successfully",
                "data": user
            });
        }catch (error) {
            console.log(error);
        }
    }

    static async getUserByName(req, res) {
        try {
            const name = req.params.userName;
            const user = await UserService.getUserByName(name);

            if(!user) {
                return res.status(404).send({
                    "success": false,
                    "message": `User with name: ${name} not found`,
                });
            }

            res.status(200).send({
                "success": true,
                "message": "User retrieved successfully",
                "data": user
            });
        } catch (error) {
            console.log(error);
        }
    }

    static async getUserByEmail(req, res) {
        try {
            const email = req.params.email;
            const user = await UserService.getUserByEmail(email);

            if(!user) {
                return res.status(404).send({
                    "success": false,
                    "message": `User with email: ${email} not found`
                });
            }

            res.status(200).send({
                "success": true,
                "message": "User retrieved successfully ",
                "data": user
            });
        } catch (error) {
            console.log(error);
        }
    }

    static async getUsersByRole(req, res) {
        try {
            const userRole = req.params.role;
            const users = await UserService.getUsersByRole(userRole);

            if(!Array.isArray(users) || users.length === 0) {
                return res.status(404).send({
                    "success": false,
                    "message": `No users found with the specified role: ${userRole}`
                });
            }

            res.status(200).send({
                "success": true,
                "message": "Users retrieved successfully",
                "data": users
            });
        } catch (error) {
            console.log(error);
        }
    }

    static async updateUserRole(req, res) {
        try {
            const { requestUser, updateUser, newRole } = req.body;
            const admin = await UserService.getUserByName(requestUser);

            if(!admin) {
                return res.status(404).send({
                    "success": false,
                    "message": `User with name: ${requestUser} not found`
                });
            }

            if(admin.role !== "admin") {
                return res.status(403).send({
                    "success": false,
                    "message": "You are not authorized to perform this operation"
                });
            }

            const user = await UserService.getUserByName(updateUser);

            if(!user) {
                return res.status(404).send({
                    "success": false,
                    "message": `User with name: ${updateUser} not found`
                });
            }

            if(user.role === newRole) {
                return res.status(200).send({
                    "success": true,
                    "message": `User role has already been updated successfully`,
                    "data": user
                });
            };

            await UserService.updateUserRole(user.id, newRole);
            user.role = newRole;

            res.status(200).send({
                "success": true,
                "message": "User role updated successfully",
                "data": user
            });
        } catch (error) {
            console.log(error);
        }
    }

    static async updateUserEmail(req, res) {
        try {
            const { userName, email } = req.body;
            const user = await UserService.getUserByName(userName);

            if(!user) {
                return res.status(404).send({
                    "success": false,
                    "message": `User with name: ${userName} not found`
                });
            }

            if(user.email === email) {
                return res.status(200).send({
                    "success": true,
                    "message": `User email has already been updated succesfully`,
                    "data": user
                });
            }

            await UserService.updateUserEmail(user.id, email);
            user.email = email;
            
            res.status(200).send({
                "success": true,
                "message": "User email updated successfully",
                "data": user
            });

        } catch (error) {
            console.log(error);
        }
    }

    static async deleteUser(req, res) {
        try {
            const { requestUser, deleteUser } = req.body;
            const admin = await UserService.getUserByName(requestUser);
            
            if(!admin) {
                return res.status(404).send({
                    "success": false,
                    "message": `User with name: ${requestUser} not found`
                });
            }

            if(admin.role !== "admin") {
                return res.status(403).send({
                    "success": false,
                    "message": "You are not authorized to perform this operation"
                });
            }
            
            const user = await UserService.getUserByName(deleteUser);
            
            if(!user) {
                return res.status(404).send({
                    "success": false,
                    "message": `User with name: ${deleteUser} not found`
                });
            }
            
            await UserService.deleteUser(user.id);

            res.status(200).send({
                "success": true,
                "message": `User ${user.username} deleted successfully`
            });
        } catch (error) {
            console.log(error);
        }
    }
}

export default UserController;