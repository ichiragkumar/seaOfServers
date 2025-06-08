import { Request, Response, NextFunction } from 'express';

const authMiddleware = (req: Request, res: Response, next: NextFunction):void => {
  const apiKey = req.headers['x-api-key'];
  if (!apiKey || apiKey !== process.env.API_KEY) {
    res.status(403).json({ error: 'Unauthorized: Invalid API key' });
  }
  next();
};

export default authMiddleware;