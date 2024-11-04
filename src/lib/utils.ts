import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

export const randomizeString = (str: string) => {
	const charArray = str.split("");

	for (let i = charArray.length - 1; i > 0; i--) {
		const j = Math.floor(Math.random() * (i + 1));

		[charArray[i], charArray[j]] = [charArray[j], charArray[i]];
	}

	return charArray.join("");
};
