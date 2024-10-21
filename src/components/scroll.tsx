"use client";

import React, { useEffect, useState } from "react";
import ThankYou from "./thank-you";
import { usePathname } from "next/navigation";
import WholePage from "./whole-page";

interface ScrollManagerProps {
	referer: string | null;
	children: React.ReactNode;
}

const ScrollManager: React.FC<ScrollManagerProps> = ({
	referer,
	children,
}: ScrollManagerProps) => {
	const [isFormSubmitSuccess, setFormSubmitSuccess] = useState(false);

	const currentPath = usePathname();

	useEffect(() => {
		console.log("Selamat datang di web customer consent Bintang Toedjoe");
		console.log("Silahkan isi form persetujuan pelanggan");
	}, []);

	return (
		<div className={`flex flex-col gap-20 max-w-5xl p-5 h-screen`}>
			{isFormSubmitSuccess ? (
				<ThankYou />
			) : currentPath === "/" ? (
				<WholePage
					referer={referer}
					setFormSubmitSuccess={setFormSubmitSuccess}
				/>
			) : (
				children
			)}
		</div>
	);
};

export default ScrollManager;
