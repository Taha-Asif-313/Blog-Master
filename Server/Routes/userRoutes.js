import express from 'express'
import { register, login, update, deleteUser, logout } from "../Controllers/userController.js"

// Router
const router = express.Router();

// Register route as POST request
router.post("/register" , register)

// Login route as POST request
router.post("/login" , login)

// Login route as POST request
router.delete("/logout/:id" , logout)

// Update user route as PUT request
router.put("/update/:id" , update)

// Delete user route as DELETE request
router.delete("/delete/:id" , deleteUser)



export default router