import jwt from 'jsonwebtoken'

// JWT token generator
export const generateToken= (userid,res)=>{

    // Sign payload with secret key
    const token = jwt.sign({id:userid},process.env.SECRET)

    // Responce
    return res.status(401).cookie('jwt',token)
}
