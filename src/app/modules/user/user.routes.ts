import express, { NextFunction, Request, Response } from "express";
// import validateRequest from "../../utils/validateRequests";
import { userValidation } from "./user.validation";
import { UserController } from "./user.controller";
import { AnyZodObject } from "zod";
import validateRequest from "../../utils/validateRequests";
const router = express.Router();

// const validateRequest = (schema: AnyZodObject) => {
//   return async (req: Request, res: Response, next: NextFunction) => {
//     console.log(req.body);
//     // console.log("I am shena bahini");
//     console.log(`I am ${name} shena bahini`);

//     try {
//       //  validateion
//       // if everything alright  next()
//       await schema.parseAsync({
//         body: req.body,
//       });

//       next();
//     } catch (error) {
//       console.log(error);
//     }
//   };
// };

router.post(
  "/signup",
  validateRequest(userValidation.createUserSchema),
  //   validateRequest(userValidation.createUserSchema),
  UserController.createUser
);

router.post(
  "/login",
   UserController.loginUser
  );

export const UserRoutes = router;
