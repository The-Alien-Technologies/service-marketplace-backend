declare global {
  namespace Express {
    interface Request {
      currentUser?: {
        id: string;
        email: string;
        firstName: string;
        lastName: string;
        username?: string;
        role: string;
        status: string;
        isActive: boolean;
        createdAt: Date;
        updatedAt: Date;
      };
    }
  }
}

export {};
