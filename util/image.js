export const getFilePath = (file) => {
	const filePath = file.path;
	const fileSplit = filePath.split("/");
	return `${fileSplit.slice(1, 3).join("/")}`;
};
