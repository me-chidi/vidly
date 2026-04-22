import { User } from '#user/user.model';
import userQueue from '#queues/userQueue';
import bcrypt from 'bcrypt';
import _ from 'lodash';

export const getMe = async (id: string) => {
    return User.findById(id).select({ password: 0 });
}

export const createUser = async (data: CreateUserData) => {
    let user = await User.findOne({ email: data.email });
    if (user) return null;

    user = new User(_.pick(data, ['name', 'email', 'password']));
    const salt = await bcrypt.genSalt(10); // gens a diff salt each time its called
    user.password = await bcrypt.hash(user.password, salt);
    await user.save();

    const userObj = _.pick(user, ['_id', 'name']);
    await userQueue.add('userCreated', userObj);

    return _.pick(user, ['name', 'email']);
}

export const updateUser = async (id: string, data: UpdateUserData) => {
    const updateDocument = _.pick(data, ['name', 'email']);
    return User.findByIdAndUpdate(id, updateDocument, { new: true }).select({ password: 0 });
}

export const deleteUser = async (id: string) => {
    return User.findByIdAndDelete(id);
}

interface CreateUserData {
    name: string;
    email: string;
    password: string;
}

interface UpdateUserData {
    name?: string;
    email?: string;
}