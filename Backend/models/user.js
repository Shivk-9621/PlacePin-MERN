const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema({
    name: { type: String, required: true },
    email: {
        type: String,
        required: true,
        validate: {
            validator: async function (email) {
                const count = await mongoose.models.User.countDocuments({ email });
                return count === 0; // Ensures no other user has the same email
            },
            message: 'Email must be unique',
        },
    },
    password: { type: String, required: true, minlength: 6 },
    image: { type: String, required: true },
    places: [{ type: mongoose.Types.ObjectId, required: true, ref: 'Place' }]
});

module.exports = mongoose.model('User', userSchema);