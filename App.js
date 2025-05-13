import exress from 'express';
import { connectDb } from './database/mongodb';
import { authRoute } from './router/userAuth';
import { userRoute } from './router/getUserDetail';

const app=exress();
const PORT=8080;
const route=exress.Router();

// token verify

export const authenticateToken = (req, res, next) => {
    const token = req.header("Authorization")?.split(" ")[1]; // Extract Bearer token
  
    if (!token) {
      return res.status(403).json({ success: false, message: "Access denied. No token provided." });
    }
  
    jwt.verify(token, SECRET_KEY, (err, user) => {
      if (err) {
        return res.status(403).json({ success: false, message: "Invalid token" });
      }
      req.user = user; // Attach user data to request
      next();
    });
  };
 
app.use(exress.json());
route.use('/api/auth',authenticateToken,authRoute);
route.use('/api/user',userRoute);


// database connection
connectDb();
app.listen(PORT,()=>{
console.log(`server is running on PORT ${PORT}`);
});