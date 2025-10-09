"use client";
import MyCompetitionsTable from "@/components/my-competitions/MyCompetitionsTable";

// Sample data - replace with actual data from server
// Generate more data for pagination testing
const generateSampleCompetitions = () => {
    const baseCompetitions = [
        { name: "Winter Challenge", rank: 1, pnl: 2500, prize: "$500", status: "completed" as const },
        { name: "Bull Run Contest", rank: 8, pnl: 1200, prize: "$100", status: "completed" as const },
        { name: "New Year Showdown", rank: 25, pnl: -150, prize: "$0", status: "completed" as const },
        { name: "Spring Trading League", rank: 12, pnl: 850, prize: "TBD", status: "active" as const },
        { name: "Summer Championship", rank: 5, pnl: 1800, prize: "$250", status: "completed" as const },
        { name: "Fall Tournament", rank: 15, pnl: 600, prize: "$50", status: "completed" as const },
        { name: "Crypto Cup", rank: 3, pnl: 3200, prize: "$800", status: "completed" as const },
        { name: "Trading Masters", rank: 20, pnl: 400, prize: "$0", status: "completed" as const },
        { name: "Weekend Challenge", rank: 7, pnl: 950, prize: "$150", status: "completed" as const },
        { name: "Monthly League", rank: 4, pnl: 2100, prize: "$400", status: "active" as const },
        { name: "Monthly League", rank: 4, pnl: 2100, prize: "$400", status: "active" as const },
        { name: "Monthly League", rank: 4, pnl: 2100, prize: "$400", status: "active" as const },
        { name: "Monthly League", rank: 4, pnl: 2100, prize: "$400", status: "active" as const },
    ];

    return baseCompetitions.map((comp, index) => ({
        id: `${index + 1}`,
        name: `${comp.name} 2025`,
        date: index < 8 ? `Dec ${25 - index}, 2024` : "Ongoing",
        rank: comp.rank,
        totalParticipants: 150 + (index * 10),
        trades: 20 + (index * 5),
        pnl: comp.pnl,
        prize: comp.prize,
        status: comp.status
    }));
};

const sampleCompetitions = generateSampleCompetitions();

const MyCompetitions = () => {
    return (
        <div className="h-full flex flex-col pb-6 px-4 md:px-8 overflow-auto">
            <h2 className="text-xl font-semibold text-foreground">My Competitions</h2>
            <MyCompetitionsTable data={sampleCompetitions} />
        </div>
    );
};

export default MyCompetitions;
