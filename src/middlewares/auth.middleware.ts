import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

export class AuthMiddleware {
    authenticateUser(req: Request, res: Response, next: NextFunction) {
        const token = req.headers.authorization?.split(' ')[1];
        if (!token) return res.status(401).json({ message: 'Unauthorized' });

        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET as string);
            (req as any).user = decoded;
            next();
        } catch (error) {
            return res.status(401).json({ message: 'Invalid token' });
        }
    }

    authorizeRole(role: string) {
        return (req: Request, res: Response, next: NextFunction) => {
            if ((req as any).user?.role !== role) {
                return res.status(403).json({ message: 'Forbidden: Access denied' });
            }
            next();
        };
    }
}
