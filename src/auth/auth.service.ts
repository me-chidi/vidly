import bcrypt from 'bcrypt';
import { User } from '#user/user.model';

async function loginUser(email: string, password: string): Promise<string | null> {
    let user = await User.findOne({ email });
        if (!user) return null;

        const validPassword = await bcrypt.compare(password, user.password);
        if (!validPassword) return null;

        return user.generateAuthToken();
}

export default loginUser;