const InjectionTest = (a) => {
	for(let i = 0; i < a.length; i++){
		if(a[i] === ";" || a[i] === "'"){
			return 'failure';
		}
		if(a[i] === "-" && a[i-1] ==="-"){
			return 'failure';
		}
	}
	return 'success';
}

module.exports = {
	InjectionTest: InjectionTest
};