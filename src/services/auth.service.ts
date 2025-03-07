import { Repository } from 'typeorm';
import { Users } from '../entities/Users';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import AppDataSource from '../config/data.source';

export class AuthService {
    private userRepository: Repository<Users>;

    constructor() {
        this.userRepository = AppDataSource.getRepository(Users);
    }

    async register(username: string, password: string, role: string) {
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = this.userRepository.create({ username, password: hashedPassword, role });
        await this.userRepository.save(user);
        return user;
    }

    async login(username: string, password: string) {
        const user = await this.userRepository.findOne({ where: { username } });
        if (!user) throw new Error('Invalid credentials');

        const isValidPassword = await bcrypt.compare(password, user.password);
        if (!isValidPassword) throw new Error('Invalid credentials');

        const token = jwt.sign({ id: user.id, role: user.role }, process.env.JWT_SECRET as string, { expiresIn: '1h' });

        return { token, user: { id: user.id, username: user.username, role: user.role } };
    }
}

export default new AuthService();
