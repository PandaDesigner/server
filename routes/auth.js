import express from "express";
import { AuthController } from "../controllers/index.js";
// import { mdAuth } from "../middlewares/index.js";  <-- test middlewares

const api = express.Router();

//TODO: Definir endpoints...
api.post("/auth/register", AuthController.register);
api.post("/auth/login", AuthController.login);
api.post("/auth/refresh_access_token", AuthController.refresAccessToken);

/* api.get("/auth/test_md", [mdAuth.asureAuth], (req, res) => {
	console.log("");
	console.log("###################################");
	console.log("# Datos del usuario Autenticados #");
	console.log("###################################");
	console.log("");
	console.log(req.user);
	console.log("");
	res.status(200).send({ msg: "Todo Ok" });
});
 */
export const authRoutes = api;
