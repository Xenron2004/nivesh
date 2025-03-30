import exress from 'express';
import { connectDb } from './database/mongodb';
const app=exress();
const PORT=8080;
const route=exress.Router();

app.use(exress.json());
route.use('/api/nivesh');

// database connection
connectDb();
app.listen(PORT,()=>{
console.log(`server is running on PORT ${PORT}`);
});