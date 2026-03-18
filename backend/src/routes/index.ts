import { Router } from "express";
import authRoute from "./auth.route";


//const routes: Router[] = [];
const mainRouter: Router = Router();
mainRouter.use('/auth', authRoute);
export default mainRouter
