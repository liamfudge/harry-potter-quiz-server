import { InjectionTest } from '../Tools/InjectionTest';

const Signin = (req, res, bcrypt, db) => {
	const { email, password} = req.body;
	let emailResponse = InjectionTest(email);
	let passwordResponse = InjectionTest(password);

	let isValid = false;
	if(emailResponse === 'success' && passwordResponse === 'success'){
		db.select('email', 'hash', 'salt').from('login')
			.where({email: email})
			.then(data => {
				isValid = bcrypt.compareSync((password + data[0].salt), data[0].hash);
				if(data.length > 0 && isValid === true){
					return db.select('*').from('users')
						.where('email', '=', email)
						.then(user => {
							res.json(user);
						})
						.catch(err => res.status(400).json('error'));
				} else {
					res.json('error')
				}
			})
			.catch(err => res.status(400).json('error'));
	} else {
		res.json('error');
	}
}

module.exports = {
	Signin: Signin
};