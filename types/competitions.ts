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