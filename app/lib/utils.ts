import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const getENV = (env: keyof ImportMetaEnv): string | undefined => {
  return import.meta.env[env];
};

export const isClient = () => {
  return typeof window !== "undefined";
};
