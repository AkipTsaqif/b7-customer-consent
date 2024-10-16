import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import ScrollManager from "@/components/scroll";
import { CookiesProvider } from "next-client-cookies/server";
import { cookies, headers } from "next/headers";
import { AnyUserData } from "@/types/userdata";

const geistSans = localFont({
	src: "./fonts/GeistVF.woff",
	variable: "--font-geist-sans",
	weight: "100 900",
});
const geistMono = localFont({
	src: "./fonts/GeistMonoVF.woff",
	variable: "--font-geist-mono",
	weight: "100 900",
});

export const metadata: Metadata = {
	title: "Customer Consent Bintang Toedjoe",
	description: "Formulir persetujuan pelanggan PT Bintang Toedjoe",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	const cookieStore = cookies();
	const userData = cookieStore.get("userData")?.value;

	let parsedData: AnyUserData | null = null;
	if (userData) {
		try {
			parsedData = JSON.parse(decodeURIComponent(userData));
		} catch (error) {
			console.error("Error parsing cookie data:", error);
		}
	}

	const referer = headers().get("referer") || null;

	return (
		<html lang="en">
			<body
				className={`${geistSans.variable} ${geistMono.variable} antialiased`}
			>
				<CookiesProvider>
					<main className="flex flex-col items-center relative">
						<nav className="sticky top-0 w-full flex justify-center border-b border-b-foreground/10 h-16 bg-white">
							<div className="w-full max-w-5xl flex justify-center items-center p-3 px-5 text-xl font-semibold">
								User Consent
							</div>
						</nav>
						<ScrollManager
							cookieData={parsedData}
							referer={referer}
						>
							{children}
						</ScrollManager>
					</main>
				</CookiesProvider>
			</body>
		</html>
	);
}
