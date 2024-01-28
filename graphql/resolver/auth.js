import { UserModel } from "../../models/user.js";
import jsonwebtoken from 'jsonwebtoken';
const {sign} = jsonwebtoken;
import bcrypt from 'bcryptjs';
const {hash, compare} = bcrypt;

export const authResolver = {
    login: async ({email, password}) => {
        const user = await UserModel.findOne({email: email});
        if(!user){
            throw new Error('User does not exist!');
        }
        const isEqual = await compare(password, user.password);
        if(!isEqual){
            throw new Error('Password is incorrect!');
        }
        const token = sign({userId:user.id, email:user.email}, 'somesupersecretkey', {
            expiresIn:'1hr'
        });
        return {
            userId: user.id,
            name: user.name,
            token: token,
            tokenExpiration: 1
        }
    },
    createUser: async (args) => {
        try {
            const existingUser = await UserModel.findOne({email: args.userInput.email});
            if(existingUser){
                throw new Error('User exists already.')
            }

            const hashedPassword = await hash(args.userInput.password, 12);

            const user = new UserModel({
                name: args.userInput.name,
                email: args.userInput.email,
                password: hashedPassword
            });

            const result = await user.save();
            return {...result._doc, password:null}
        } catch (error) {
            return error
        } 
    }
}