import bscryptj from "bcryptjs";
import { User } from "../models/index.js";
import { jwt } from "../util/index.js";

const register = (req, res) => {
	const { email, passwordUser } = req.body;

	const user = new User({
		email: email.toLowerCase(),
	});

	const salt = bscryptj.genSaltSync(10);
	const hashPassword = bscryptj.hashSync(passwordUser, salt);
	user.passwordUser = hashPassword;

	user.save((error, userStorage) => {
		error
			? (console.log(error),
			  res.status(400).send({ msg: "Error al registrar el usuario" }))
			: res.status(201).send(userStorage);
	});
};

const login = (req, res) => {
	const { email, passwordUser } = req.body;

	const emailLowerCase = email.toLowerCase();

	User.findOne({ email: emailLowerCase }, (error, userStorage) => {
		error
			? res.status(500).send({ msg: "Error del servidor" })
			: bscryptj.compare(
					passwordUser,
					userStorage.passwordUser,
					(bcryptError, check) => {
						bcryptError
							? (console.log("Pedro este es el error >", bcryptErro),
							  res.status(500).send({ msg: "Error del Servidor" }))
							: !check
							? res.status(400).send({ msg: "Contraseña incorrecta" })
							: res.status(200).send({
									access: jwt.createAccessToken(userStorage),
									refresh: jwt.creataRefreshToken(userStorage),
							  });
					},
			  );
	});
};

const refresAccessToken = (req, res) => {
	const { refresToken } = req.body;
	const { user_id } = jwt.decoded(refresToken);
	const hasExpired = jwt.hasEsxpriredToken(refresToken);
	!refresToken ? res.status(400).send({ msg: "Token Requerido" }) : hasExpired;

	User.findById(user_id, (error, userStorage) => {
		error
			? res.status(500).send({ msg: "Error del Servidor" })
			: res.status(200).send({
					accessToken: jwt.createAccessToken(userStorage),
			  });
	});

	console.log(refresToken, hasExpired);
};

export const AuthController = {
	register,
	login,
	refresAccessToken,
};
