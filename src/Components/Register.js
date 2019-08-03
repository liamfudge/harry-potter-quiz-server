import { InjectionTest } from '../Tools/InjectionTest';
import { GenerateSalt } from '../Tools/GenerateSalt';

const Register = (req, res, bcrypt, db) => {
	const { email, password, firstname, surname} = req.body;
	let emailResponse = InjectionTest(email);
	let passwordResponse = InjectionTest(password);
	let firstnameResponse = InjectionTest(firstname);
	let surnameResponse = InjectionTest(surname);
	if(emailResponse === 'success' && passwordResponse === 'success' &&
		firstnameResponse === 'success' && surnameResponse === 'success'){
		let salt = GenerateSalt(7);
		const hash = bcrypt.hashSync(password + salt);
		db.transaction(trx => {
			trx.insert({
				hash: hash,
				email: email,
				salt: salt
			})
			.into('login')
			.returning('email')
			.then(loginEmail => {
				return trx('users')
					.returning('*')
					.insert({
						firstname: firstname,
						surname: surname,
						email: loginEmail[0],
						joined: new Date(),
					}).then(user => {
						res.json(user);
					})
			})
			.then(trx.commit).catch(trx.rollback)
		})

		.catch(err => res.status(400).json('error'))
	} else {
		res.json('error');
	}
}

module.exports = {
	Register: Register
}