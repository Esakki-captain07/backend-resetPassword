import userModel from "../model/userModel.js";
import auth from '../common/auth.js'; 

const createUser = async (req, res) => {
    try {
        let user = await userModel.findOne({ email: req.body.email })

        if (!user) {
            req.body.password = await auth.hashPassword(req.body.password)
            await userModel.create(req.body);
            res.status(201).send({
                message: 'User created successfully'
            });
        } else {
            res.status(200).send({
                message: 'User already exists'
            });
        }
    } catch (error) {
        console.log(error);
        res.status(500).send({
            message: error.message || 'Internal Server Error',
            error
        });
    }
};

const loginUser = async(req,res)=>{
    try {
        let user = await userModel.findOne({email:req.body.email})
        if(user)
        {
            if(await auth.hashCompare(req.body.password,user.password))
            {
                res.status(200).send({
                    message:"Login Successfull"
                })
            }
            else
            {
                res.status(400).send({
                    message:"Incorrect Password"
                })
            }

        }
        else
        {
            res.status(400).send({
                message:`User does not exists`
            })
        }
       
    } catch (error) {
        res.status(500).send({
            message:error.message || "Internal Server Error",
            error
        })
    }
}

export default {
    createUser,
    loginUser
}
