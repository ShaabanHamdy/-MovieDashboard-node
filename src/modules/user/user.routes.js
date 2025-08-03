import { Router } from "express";
import { asyncHandling } from "../../utils/error_handling.js";
import * as userController from "./user.controller.js";
import * as userValidation from "./user.validation.js";
const router = Router();

//=================================================signup===============
router.post(
  "/signup",
  userValidation.signupValidation,
  asyncHandling(userController.signUp)
);

//=================================================login===============
router.post("/login", asyncHandling(userController.login));
// =============================================================

router.get("/getAllUsers", asyncHandling(userController.getAllUsers));
// =============================================================

router.delete("/deleteUser/:_id", asyncHandling(userController.deleteOneUser));
// =============================================================

router.delete("/deleteAllUsers", asyncHandling(userController.deleteAllUsers));

export default router;
