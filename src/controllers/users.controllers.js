import customErrors from "../errors/customErrors.js";
import userServices from "../services/users.services.js"

const sendEmailResetPassword = async (req,res,next) => {

    try {
        const {email} = req.body;


        res.cookie("resetPassword", email, {httpOnly: true, maxAge: 10000})
        const response = await userServices.sendEmailResetPassword(email)
        res.status(200).json({ status: "success", response });

    } catch (error) {
        next(error);
    }

};

const resetPassword = async (req,res,next) => {

    try {

        const {email,password} = req.body;
        const emailCookie = req.cookies.resetPassword;
        if(!emailCookie) throw customErrors.badRequestError("Email link expired");


        await userServices.sendEmailResetPassword(email, password)
        
        res.status(200).json({ status: "success", response: "Password successfully updated" });
        

    } catch (error) {
        next(error);
    }

};

export default {
    sendEmailResetPassword,
    resetPassword
};