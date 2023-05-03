import { User } from "../models/index.js";
import { getFilePath } from "../util/index.js";

// Funciones del controlador
const getMe = async (req, res) => {
	const { user_id } = req.user;

	try {
		const response = await User.findById(user_id).select(["-passwordUser"]);

		!response
			? res.status(400).send({ msg: "No se ha encontrado el usuario" })
			: res.status(200).send(response);
	} catch (error) {
		res.status(500).send({ msg: "Error del Servidor" });
	}
};
const getUsers = async (req, res) => {
	const { user_id } = req.user;
	const users = await User.find({ _id: { $ne: user_id } }).select([
		"-passwordUser",
		"-__v",
		//"-_id",
	]);
	try {
		!users
			? res.status(400).send({ msg: "No se han encontrado Usuarios" })
			: res.status(200).send(users);
	} catch (error) {
		res.status(500).send({ msg: "Error del Servidor" });
	}
};
const getUser = async (req, res) => {
	const { id } = req.params;
	try {
		const response = await User.findById(id).select(["-passwordUser"]);
		!response
			? res.status(400).send({ msg: "No se ha encontrado el Usuario" })
			: res.status(200).send(response);
	} catch (error) {
		res.status(500).send({ msg: "Error del Servidor" });
	}
};
const updateUser = async (req, res) => {
	const { user_id } = req.user;
	//	const response = await User.findById(user_id);
	const userData = req.body;

	if (req.files.avatarUser) {
		const imagePath = getFilePath(req.files.avatarUser);
		userData.avatarUser = imagePath;
		console.log(userData);
	}
	User.findByIdAndUpdate({ _id: user_id }, userData, (error) => {
		if (error) {
			res.status(400).send({ msg: "Error al actualizar el usuario" });
		} else {
			res.status(200).send(userData);
		}
	});
};
export const UserController = {
	getMe,
	getUsers,
	getUser,
	updateUser,
};
