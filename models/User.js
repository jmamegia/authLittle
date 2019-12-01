const { Schema, model } = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new Schema({
	provider_id: { type: String, unique: true },

	name: {
		type: String,
		required: true,
		trim: true,
		unique: false,
		lowercase: true,
	},
	photo: String,
	email: {
		type: String,
		required: false,
		unique: false,
	},
	password: {
		type: String,
		required: false
	},
	role: String
}, {
		timestamps: true
	})

userSchema.methods.encryptPassword = async (password) => {
	const hash = await bcrypt.hash(password, await bcrypt.genSalt(10))
	return hash
}

userSchema.methods.passwordValidate = function (password) {
	return bcrypt.compareSync(password, this.password)
}

module.exports = model('User', userSchema)