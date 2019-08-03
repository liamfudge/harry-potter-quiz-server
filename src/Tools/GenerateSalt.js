function GenerateSalt (length) {
	var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()";
	var text = "";
	for (var i = 0; i < length; i++){
		text += possible.charAt(Math.floor(Math.random() * possible.length));
	}
	return text;
}

module.exports = {
	GenerateSalt: GenerateSalt
};