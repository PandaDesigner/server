import { User } from "../models/index.js";

function register(req, res) {
	const { email, passwordUser } = req.body;

	const user = new User({
		email: email.toLowerCase(),
		passwordUser: passwordUser,
	});

	user.save((error, userStorage) => {
		if (error) {
			console.log(error);
			res.status(400).send({ msg: "Error al registrar el usuario" });
		} else {
			res.status(201).send(userStorage);
		}
	});
}

export const AuthController = {
	register,
};
