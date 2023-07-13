import { Schema, models, model } from 'mongoose';

const UserSchema = new Schema({
    email: {
        type: String,
        unique: [true, 'Email address is already taken!'],
        required: [true, 'Email address is required...']
    },
    username: {
        type: String,
        required: [true, 'Username is required...']
        // match: [
        //     /^(?=.{8,30}$)(?![_.])(?!.*[_.]{2})[a-zA-Z0-9._]+(?<![_.])$/,
        //     'Username invalid, it should contain 8-30 alphanumeric letters and be unique!'
        // ]
    },
    image: String
});

const User = models.User || model('User', UserSchema);

export default User;
