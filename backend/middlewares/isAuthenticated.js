import jwt from "jsonwebtoken";

// Middleware to check if the user is authenticated
const isAuthenticated = (req, res, next) => {
  try {
    // Get token from cookies
    const token = req.cookies.token;

    // If no token is found, deny access
    if (!token) {
      return res.status(401).json({
        message: "Unauthorized Access",
        success: false,
      });
    }

    // Verify the token using the secret key
    const decode = jwt.verify(token, process.env.SECRET_KEY);

    // If token is invalid
    if (!decode) {
      return res.status(401).json({
        message: "Invalid Token",
        success: false,
      });
    }

    // Attach user ID from token to request object
    req.id = decode.userId;

    // Proceed to the next middleware or route handler
    next();
  } catch (error) {
    // Log any unexpected errors
    console.log(error);
  }
};

export default isAuthenticated;
