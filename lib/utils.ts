import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import { Competition } from "@/types/competitions";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const formatAddress = (addr: string) => {
  return `${addr.slice(0, 6)}...${addr.slice(-4)}`;
};

export const generateUsername = (addr: string) => {
  return `User${addr.slice(-3)}`;
};

export const formatPrizePool = (amount: number) => {
  return `$${amount.toLocaleString()}`;
};

export const formatEntryFee = (amount: number) => {
  return amount === 0 ? "Free" : `$${amount}`;
};

export const formatLeverage = (size: number) => {
  return `${size}x`;
};

export const formatParticipants = (competition: Competition) => {
  const current = competition._count.participants;
  return `${current}/${competition.maxParticipants}`;
};

export const calculateTimeRemaining = (competition: Competition) => {
  const now = new Date();
  const end = new Date(competition.endDate);
  const diff = end.getTime() - now.getTime();

  if (diff <= 0) return null;

  const hours = Math.floor(diff / (1000 * 60 * 60));
  const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));

  return `${hours}h ${minutes}m`;
};

export const calculateTimeToStart = (competition: Competition) => {
  const now = new Date();
  const start = new Date(competition.startDate);
  const diff = start.getTime() - now.getTime();

  if (diff <= 0) return null;

  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));

  if (days > 0) {
    return `${days}d ${hours}h`;
  }
  return `${hours}h ${minutes}m`;
};