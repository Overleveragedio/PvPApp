export type Competition = {
    id: number;
    name: string;
    description: string;
    startDate: string; // ISO date string
    endDate: string; // ISO date string
    entryFee: number;
    prizePool: number;
    maxParticipants: number;
    leverageSize: number;
    symbol: string;
    isFeatured: boolean;
    status: CompetitionStatus;
    payoutStructure: PayoutStructure[];
    createdAt: string; // ISO date string
    updatedAt: string; // ISO date string
    _count: {
        participants: number;
    };
    participants?: Participant[]; // Add this
};

export type Participant = {
    id: number;
    userId: number;
    competitionId: number;
    user: User;
};

export type User = {
    id: number;
    email: string;
    passwordHash: string | null;
    walletAddress: string | null;
    username: string;
    profilePicture: string | null;
    nonce: string | null;
    createdAt: string;
    updatedAt: string;
    authProvider: "EMAIL" | "WALLET";
    roles: string;
};

export type PayoutStructure = {
    position: number;
    amount: string;
};

export enum CompetitionStatus {
    PENDING = "PENDING",
    LIVE = "LIVE",
    ENDED = "ENDED",
    ALL = ""
}