import { Router } from "express";
import { create_user } from "../controller/user/CREATE";

const userRoutes = Router();

userRoutes.post('/user/create', create_user);

export { userRoutes };