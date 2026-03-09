import argon2 from 'argon2'
import { Customer } from '../../db/models/userModel.js';
import jwt from 'jsonwebtoken'

//hashing password function
export const hashedPassword = async (password) => {
    try {
        const hash = await argon2.hash(password);
        return hash
    } catch (err) {
        console.log("Password hashing function didnt work");
        return res.status(400).json({ error: err.message })
    }
}

//verifying password entered with hashed password in the database
export const verifyPassword = async (hashedPassword, password) => {
    try {
        if (await argon2.verify(hashedPassword, password)) {
            return true
        } else {
            return false
        }
    } catch (err) {
        console.log(err.message);
        return new Error({ error: err.message })
    }

}

//this creates a user in the database and returns the created user json
export const createUser = async (req, res) => {
    try {
        const { name, email, password } = req.body
        const hashPassword = await hashedPassword(password)
        const newUser = {
            name,
            email,
            passwordHash: hashPassword
        }

        const user = new Customer(newUser)
        await user.save()
        return res.status(201).json(newUser)
    } catch (error) {
        console.log("error in creating user");
        return res.status(500).json({ error: error.message })
    }

}

//create login route for user
// for this we need first to verify that the password entered is correct

export const userLogin = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await Customer.findOne({ email })

        //verify the password
        if (!verifyPassword(user.passwordHash, password)) {
            console.log("password does not matchŸ");
            return new Error("Password entered is incorrect or user does not exist")
        }

        //create a jwt token and attach it to a cookie. This cookie will be attached to the response object and will be checked
        //to see if a cookie exists (user is authenticated)
        const payload = { user: user._id }
        const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "1h" })
        res.cookie("token", token, {
            httpOnly: true
        })
        return res.status(200).json({ message: "Signed in successfully" })

        //return res.status(200).json(user);
    } catch (error) {
        console.log("Error logging in");
        return res.status(500).json({ error: error.message })
    }

}

