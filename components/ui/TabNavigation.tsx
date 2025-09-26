"use client";

import { useState } from "react";
import { clsx } from "clsx";

interface Tab {
    id: string;
    label: string;
    count?: number;
}

interface TabNavigationProps {
    tabs: Tab[];
    defaultActiveTab?: string;
    onTabChange?: (tabId: string) => void;
    className?: string;
}

const TabNavigation = ({
    tabs,
    defaultActiveTab,
    onTabChange,
    className = ""
}: TabNavigationProps) => {
    const [activeTab, setActiveTab] = useState(defaultActiveTab || tabs[0]?.id);

    const handleTabClick = (tabId: string) => {
        setActiveTab(tabId);
        onTabChange?.(tabId);
    };

    return (
        <div className={clsx("flex w-1/2 bg-[#18212C] rounded-xl", className)}>
            {tabs.map((tab) => (
                <button
                    key={tab.id}
                    onClick={() => handleTabClick(tab.id)}
                    className={clsx(
                        "py-1 rounded-lg text-center cursor-pointer m-1 w-full transition-colors relative",
                        "text-sm font-semibold",
                        {
                            "text-primary bg-[#212B37]": activeTab === tab.id,
                            "text-slate-400 hover:text-white": activeTab !== tab.id
                        }
                    )}
                >
                    {tab.label}
                </button>
            ))}
        </div>
    );
};

export default TabNavigation;