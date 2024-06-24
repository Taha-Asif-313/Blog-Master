import jwt from 'jsonwebtoken'

// JWT token generator
export const generateToken= (userid,res)=>{

    // Sign payload with secret key
    const token = jwt.sign({id:userid},process.env.SECRET)

    // Responce
    return res.status(200).cookie('token',token, {
        httpOnly: true,
        secure: true,  // Set to true if using HTTPS
        sameSite: 'None', // Adjust based on your needs
        maxAge: 3600000, // 1 hour
      });
}
