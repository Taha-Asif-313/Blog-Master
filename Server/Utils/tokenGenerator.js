import jwt from 'jsonwebtoken';

// JWT token generator
export const generateToken = (userId, res) => {
  try {
    // Sign payload with secret key
    const token = jwt.sign({ id: userId }, process.env.SECRET, { expiresIn: '1h' });

    // Set the token in a cookie
    res.cookie('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production', // Set to true if using HTTPS
      sameSite: 'None', // Adjust based on your needs
    });

    // Respond with a success status
    return res.status(200).json({
      success: true,
    });
  } catch (error) {
    console.error('Error generating token:', error);
    return res.status(500).json({
      success: false,
      message: 'Internal server error',
    });
  }
};
