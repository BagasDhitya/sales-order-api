import { Request, Response } from 'express';
import AuthService from '../services/auth.service';

export class AuthController {
    async register(req: Request, res: Response) {
        try {
            const { username, password, role } = req.body;
            const user = await AuthService.register(username, password, role);
            res.status(201).json(user);
        } catch (error) {
            res.status(400).json({ message: error });
        }
    }

    async login(req: Request, res: Response) {
        try {
            const { username, password } = req.body;
            const result = await AuthService.login(username, password);
            res.status(200).json(result);
        } catch (error) {
            res.status(400).json({ message: error });
        }
    }
}
