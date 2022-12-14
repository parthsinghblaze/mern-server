import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import userModel from '../models/userModel.js';

//signup
export const signup = async (req, res) => {
    const { email, password, confirmPassword, firstName, lastName } = req.body;

    try {
        const existingUser = await userModel.findOne({ email })

        if (existingUser) {
            return res.status(400).json({ message: "User already exists" })
        }

        if (confirmPassword !== password) {
            return res.status(400).json({ message: "Password doesn't match" })
        }

        const hashPassword = await bcrypt.hash(password, 12)

        const result = await userModel.create({ email, password: hashPassword, name: `${firstName} ${lastName}` })

        const token = jwt.sign({ email: result.email, id: result._id }, 'testing', { expiresIn: '1h' })

        res.status(200).json({ result, token })

    } catch (error) {
        res.status(500).json({ message: "Something went wrong" })
    }

}

//signin
export const signin = async (req, res) => {
    const {email, password} = req.body;
    
    try{
        const existingUser = await userModel.findOne({email})

        if(!existingUser) {
            return res.status(404).json({ message: "User doesn't exists" })
        }

        const isPasswordCorrect = await bcrypt.compare(password, existingUser.password)

        if(!isPasswordCorrect) {
            return res.status(400).json({ message: "Password is incorrect" });
        }

        const token = jwt.sign( {email: existingUser.email, id: existingUser._id} ,'testing', {expiresIn: "1h"} )

        res.status(200).json({ result: existingUser, token })
    } catch (e) {
        
    }
}