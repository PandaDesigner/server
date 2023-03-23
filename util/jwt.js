import jsonwebtoken from "jsonwebtoken";
import { JWT_SECRT_KEY } from "../constants.js";

function createAccessToken(user) {
	const expToken = new Date();
	expToken.setHours(expToken.getHours() + 24);

	const payload = {
		token_rype: "access",
		user_id: user._id,
		iat: Date.now(),
		exp: expToken.getTime(),
	};

	return jsonwebtoken.sign(payload, JWT_SECRT_KEY);
}

function creataRefreshToken(user) {
	const expToken = new Date();
	expToken.setMonth(expToken.getMonth() + 1);

	const payload = {
		token_rype: "refresh",
		user_id: user._id,
		iat: Date.now(),
		exp: expToken.getTime(),
	};

	return jsonwebtoken.sign(payload, JWT_SECRT_KEY);
}

function decoded(token) {
	return jsonwebtoken.decode(token, JWT_SECRT_KEY, true);
}

function hasEsxpriredToken(token) {
	const { exp } = decoded(token);
	const currentDate = new Date().getTime();
	return exp <= currentDate ? true : false;
}

export const jwt = {
	createAccessToken,
	creataRefreshToken,
	decoded,
	hasEsxpriredToken,
};
