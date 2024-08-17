import customErrors from "../errors/customErrors.js";
import usersRepository from "../persistences/mongo/repositories/users.repository.js";
import { createHash, isValidPassword } from "../utils/hashPassword.js";
import { sendMail } from "../utils/sendMails.js";


const sendEmailResetPassword = async (email) =>{
    const message = "Must reset your password at the following link: https://www.google.com";
    await sendMail(email,"Reset Password", message);

    return "Email sent";
};

const resetPassword = async (email, password) =>{
    const user = usersRepository.getByEmail(email);
    if(!user) throw customErrors.notFoundError("User not found");

    const samePassword = isValidPassword(user,password);
    if(samePassword) throw customErrors.badRequestError("Password already used");

    return await usersRepository.update(user._id , {password: createHash(password)})

};

export default {
    sendEmailResetPassword,
    resetPassword
};