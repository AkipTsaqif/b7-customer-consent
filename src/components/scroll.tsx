"use client";

import { useEffect, useRef, useState } from "react";
import Consent from "./consent";
import ThankYou from "./thank-you";
import { usePathname } from "next/navigation";

interface ScrollManagerProps {
	children: React.ReactNode;
	cookieData: Record<string, unknown> | null;
	referer: string | null;
}

const ScrollManager: React.FC<ScrollManagerProps> = ({
	cookieData,
	referer,
	children,
}: ScrollManagerProps) => {
	const [isScrolledToBottom, setIsScrolledToBottom] = useState(false);
	const [isFormSubmitSuccess, setFormSubmitSuccess] = useState(false);

	const path = usePathname();
	const contentRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		let scrollTimeout: NodeJS.Timeout | null = null;

		const handleScroll = () => {
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

	useEffect(() => {
		if (isScrolledToBottom && contentRef.current) {
			const element = contentRef.current;

			setTimeout(() => {
				element.scrollIntoView({
					behavior: "smooth",

					block: "end",
				});
			}, 400);
		}
	}, [isScrolledToBottom]);

	return (
		<>
			<div
				ref={contentRef}
				className={`flex flex-col gap-20 max-w-5xl p-5 ${
					isFormSubmitSuccess
						? "overflow-hidden h-[calc(95vh-8rem)]"
						: "overflow-y-auto h-auto transition-all duration-500"
				}`}
				style={{
					paddingBottom: isScrolledToBottom ? "28rem" : "2rem",
				}}
			>
				{isFormSubmitSuccess ? <ThankYou /> : children}
			</div>
			{!isFormSubmitSuccess && path === "/" && (
				<div
					className={`fixed inset-x-0 bottom-0 w-full flex flex-col items-center border-t border-t-foreground/10 bg-white transition-transform duration-500 ${
						isScrolledToBottom
							? "translate-y-0"
							: "translate-y-full"
					}`}
				>
					<Consent
						isDisabled={!isScrolledToBottom}
						cookieData={cookieData}
						referer={referer}
						setFormSubmitSuccess={setFormSubmitSuccess}
					/>
				</div>
			)}
		</>
	);
};

export default ScrollManager;
