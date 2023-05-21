import { Chat } from "../models/index.js";

//funtion...
const create = async (req, res) => {
	const { participant_id_one, participant_id_two } = req.body;

	const foundOne = await Chat.findOne({
		participant_one: participant_id_one,
		participant_two: participant_id_two,
	});
	const foundTwo = await Chat.findOne({
		participant_one: participant_id_two,
		participant_two: participant_id_one,
	});

	if (foundOne || foundTwo) {
		res.status(200).send({ msg: "Ya tienes un chat creado con este user" });
		return res;
	}

	const chat = new Chat({
		participant_one: participant_id_one,
		participant_two: participant_id_two,
	});

	chat.save((error, chatStorage) => {
		error
			? res.status(400).send({ msg: "Error al crear el chat " })
			: res.status(201).send(chatStorage);
	});
	return res;
};

export const ChatController = {
	create,
};
