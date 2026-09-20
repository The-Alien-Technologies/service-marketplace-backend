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
        homeMarketId?: string | null;
        selectedMarketId?: string | null;
        adminMarketId?: string | null;
        isActive: boolean;
        createdAt: Date;
        updatedAt: Date;
      };
    }
  }
}

export {};
