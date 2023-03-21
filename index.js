import mongoose from "mongoose";
import { server } from "./app.js";
import { DB_HOST, DB_PASSWORD, DB_USER, IP_SERVER, PORT } from "./constants.js";
import { io } from "./util/index.js";

const mongoDbUrl = `mongodb+srv://${DB_USER}:${DB_PASSWORD}@${DB_HOST}`;
mongoose.connect(
	mongoDbUrl,
	{ useNewUrlParser: true, useUnifiedTopology: true },
	(error) => {
		if (error) throw error;

		server.listen(PORT, () => {
			console.log("");
			console.log("######################################");
			console.log("######### EFIGEN API CHATAPP #########");
			console.log("######################################");
			console.log("");
			console.log(
				`RUN EFIGEN SERVERS CHATAPP PORT > http://${IP_SERVER}:${PORT}/api`,
			);

			io.sockets.on("connection", (socket) => {
				console.log("NUEVO USUARIO CONECTADO");

				socket.on("disconnect", () => {
					console.log("USUARIO DESCONECTADO");
				});

				socket.on("subscribe", (room) => {
					socket.join(room);
				});

				socket.on("unsubscribe", (room) => {
					socket.leave(room);
				});
			});
		});
	},
);
