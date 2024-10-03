"use client";

import { useEffect, useRef, useState } from "react";
import Consent from "./consent";
import ThankYou from "./thank-you";
import { usePathname } from "next/navigation";

interface ScrollManagerProps {
	children: React.ReactNode;
}

export default function ScrollManager({ children }: ScrollManagerProps) {
	const [isScrolledToBottom, setIsScrolledToBottom] = useState(false);
	const [isFormSubmitSuccess, setFormSubmitSuccess] = useState(false);

	const path = usePathname();
	const contentRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		let scrollTimeout: NodeJS.Timeout | null = null;

		const handleScroll = () => {
			console.log("positions before timeout:");
			if (contentRef.current) {
				if (scrollTimeout) {
					clearTimeout(scrollTimeout);
				}

				scrollTimeout = setTimeout(() => {
					const { scrollTop, scrollHeight, clientHeight } =
						contentRef.current!;
					const paddingBottom = 200;

					setIsScrolledToBottom(
						scrollTop + clientHeight >= scrollHeight - paddingBottom
					);
					console.log("positions after timeout:", {
						scrollTop,
						scrollHeight,
						clientHeight,
					});
				}, 500);
			}
		};

		const contentElement = contentRef.current;
		contentElement?.addEventListener("wheel", handleScroll);

		return () => {
			contentElement?.removeEventListener("wheel", handleScroll);
			if (scrollTimeout) {
				clearTimeout(scrollTimeout);
			}
		};
	}, []);

	return (
		<>
			<div
				ref={contentRef}
				className={`flex flex-col gap-20 max-w-5xl p-5 ${
					isFormSubmitSuccess
						? "overflow-hidden h-[calc(95vh-8rem)]"
						: "overflow-y-auto pb-[16rem] h-auto"
				}`}
			>
				{isFormSubmitSuccess ? <ThankYou /> : children}
			</div>
			{!isFormSubmitSuccess && path === "/" && (
				<footer className="fixed inset-x-0 bottom-0 w-full flex items-center justify-center border-t border-t-foreground/10 px-4 pb-4 bg-white">
					<Consent
						isDisabled={!isScrolledToBottom}
						setFormSubmitSuccess={setFormSubmitSuccess}
					/>
				</footer>
			)}
		</>
	);
}
