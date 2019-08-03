import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import bcrypt from 'bcrypt-nodejs';
import knex from 'knex';

import {Questions} from './Questions/Questions';

import Signin from './Components/Signin';
import Register from './Components/Register';


const PORT = process.env.HTTP_PORT || 4001;
const app = express();

const db = knex({
	client: 'pg',
	connection: {
		host: '127.0.0.1',
		user: 'liamfudge',
		password: '',
		database: 'hpquizdb'
	}
});

app.use(bodyParser.json());
app.use(cors());

app.get('/', (req, res) => {
	res.json('this is the ultimate harry potter quiz server server');
})

app.get('/questions', (req, res) => {
	res.json(Questions);
})


app.post('/register', (req,res) => {Register.Register(req, res, bcrypt, db) });

app.post('/signin', (req, res) => {Signin.Signin(req, res, bcrypt, db) });

app.post('/house', (req, res) => {
	const { id, house } = req.body;
	db('users')
		.where({id: id})
		.update({house: house}).returning('*')
		.then(response => {
			res.json(response)
		})
})

app.post('/scoreupdate', (req, res) => {
	const { id, score, completed } = req.body;
	db('users')
		.where({id: id})
		.update({score: score, completedquestions: completed}).returning('*')
		.then(response => {
			res.json(response);
		})
		.catch(err => res.status(400).json('error'));
})

app.listen(PORT, () => {
	console.log(`Server listening at port ${PORT}.`);
});




