import UserService from "../services/user.services.js";
import User from "../models/userModel.js";

import NotFoundError from "../utils/errors.js";
import { UnauthorizedError } from "../utils/errors.js";

class UserController {
    static async createUser(req, res) {
        try {
            const user = await UserService.getUserByName(req.body.username);

            if(user instanceof User) {
                return res.status(200).send({
                    "success": false,
                    "status": 200,
                    "message": "User has already been created"
                });
            }

            const newUser = await UserService.createUser(req.body);

            return res.status(201).send({
                "success": true,
                "status": 201,
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

            if(!Array.isArray(users) || users.length === 0) throw new NotFoundError("No users found", "No user has been created yet");

            return res.status(200).send({
                "success": true,
                "status": 200,
                "message": "Users retrieved successfully",
                "data": users
            });
        } catch (error) {
            if(error.name === "NotFoundError") return res.status(404).send(error.response);
        }
    }

    static async getUserById(req, res) {
        try {
            const id = req.params.userId;
            const user = await UserService.getUserById(id);

            if(!user) throw new NotFoundError("User not found", `User with id ${id} not found`);
            
            res.status(200).send({
                "success": true,
                "status": 200,
                "message": "User retrieved successfully",
                "data": user
            });
        }catch (error) {
            if(error.name === "NotFoundError") return res.status(404).send(error.response);
        }
    }

    static async getUserByName(req, res) {
        try {
            const name = req.params.userName;
            const user = await UserService.getUserByName(name);

            if(!user) throw new NotFoundError("User not found", `User with name ${name} not found`);

            res.status(200).send({
                "success": true,
                "status": 200,
                "message": "User retrieved successfully",
                "data": user
            });
        } catch (error) {
            if(error.name === "NotFoundError") return res.status(404).send(error.response);
        }
    }

    static async getUserByEmail(req, res) {
        try {
            const email = req.params.email;
            const user = await UserService.getUserByEmail(email);

            if(!user) throw new NotFoundError("User not found", `User with email ${email} not found`);

            res.status(200).send({
                "success": true,
                "status": 200,
                "message": "User retrieved successfully ",
                "data": user
            });
        } catch (error) {
            if(error.name === "NotFoundError") return res.status(404).send(error.response);
        }
    }

    static async getUsersByRole(req, res) {
        try {
            const userRole = req.params.role;
            const users = await UserService.getUsersByRole(userRole);

            if(!Array.isArray(users) || users.length === 0) throw new NotFoundError("Not users found", `No users found with the specified role ${userRole}`);

            res.status(200).send({
                "success": true,
                "status": 200,
                "message": "Users retrieved successfully",
                "data": users
            });
        } catch (error) {
            if(error.name === "NotFoundError") return res.status(404).send(error.response);
        }
    }

    static async updateUserRole(req, res) {
        try {
            const { requestUser, updateUser, newRole } = req.body;
            const admin = await UserService.getUserByName(requestUser);

            if(!admin) throw new NotFoundError("User not found", `User with name ${requestUser} not found`);

            if(admin.role !== "admin") throw new UnauthorizedError("Unauthorized", "You are not authorized to perform this operation")

            const user = await UserService.getUserByName(updateUser);

            if(!user) throw new NotFoundError("User not found", `User with name ${updateUser} not found`);

            if(user.role === newRole) {
                return res.status(200).send({
                    "success": true,
                    "status": 200,
                    "message": `User role has already been updated successfully`,
                    "data": user
                });
            };

            await UserService.updateUserRole(user.id, newRole);
            user.role = newRole;

            res.status(200).send({
                "success": true,
                "status": 200,
                "message": "User role updated successfully",
                "data": user
            });
        } catch (error) {
            let statusCode;

            if(error.name === "NotFoundError") statusCode = 404;
            if(error.name === "Unauthorized") statusCode = 403;

            return res.status(statusCode).send(error.response);
        }
    }

    static async updateUserEmail(req, res) {
        try {
            const { userName, email } = req.body;
            const user = await UserService.getUserByName(userName);

            if(!user) throw new NotFoundError("User not found", `User with name: ${userName} dosn't exists`);

            if(user.email === email) {
                return res.status(200).send({
                    "success": true,
                    "status": 200,
                    "message": `User email has already been updated succesfully`,
                    "data": user
                });
            }

            await UserService.updateUserEmail(user.id, email);
            user.email = email;
            
            res.status(200).send({
                "success": true,
                "status": 200,
                "message": "User email updated successfully",
                "data": user
            });
        } catch (error) {
            if(error.name === "NotFoundError") return res.status(404).send(error.response);
        }
    }

    static async deleteUser(req, res) {
        try {
            const { requestUser, deleteUser } = req.body;
            const admin = await UserService.getUserByName(requestUser);

            if(!admin) throw new NotFoundError("Admin not found", `The admin with name ${requestUser} dosn't exists`);

            if(admin.role !== "admin") throw new UnauthorizedError("Unauthorized", "You are not authorized to perform this operation")
            
            const user = await UserService.getUserByName(deleteUser);
            
            if(!user) throw new NotFoundError("User not found", `User with name ${deleteUser} dosn't exists`);
            
            await UserService.deleteUser(user.id);

            res.status(200).send({
                "success": true,
                "status": 200,
                "message": `User ${user.username} deleted successfully`
            });
        } catch (error) {
            let statusCode;

            if(error.name === "NotFoundError") statusCode = 404;
            if(error.name === "Unauthorized") statusCode = 403;

            return res.status(statusCode).send(error.response);
        }
    }
}

export default UserController;