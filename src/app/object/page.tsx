"use client";

import Link from "next/link";
import { Suspense, useEffect } from "react";
import { updateConsent } from "../actions/sql";
import { useSearchParams, useRouter } from "next/navigation";

const ObjectionPage = () => {
	const params = useSearchParams();
	const router = useRouter();
	const email = params.get("email");

	const objectConsent = async (email: string) => {
		try {
			await updateConsent(email);
		} catch (error) {
			console.error("ERROR", error);
		}
	};

	useEffect(() => {
		if (!email) {
			router.push("/");
		} else objectConsent(email as string);
	}, [email, router]);

	return (
		<div className="flex h-[calc(95vh-12rem)] items-center justify-center overscroll-auto overflow-hidden">
			<div className="flex flex-col items-center justify-center">
				<h1 className="text-[3rem] font-bold">Terima Kasih!</h1>
				<p className="text-xl">
					Jika anda mau melihat formulir persetujuannya kembali
					silahkan klik link dibawah ini
				</p>
				<Link
					href="/"
					className="mt-4 font-bold text-xl text-blue-500 hover:text-blue-900 hover:underline"
				>
					Formulir Persetujuan Pelanggan
				</Link>
			</div>
		</div>
	);
};

const ObjectPageSuspense = () => {
	return (
		<Suspense>
			<ObjectionPage />
		</Suspense>
	);
};

export default ObjectPageSuspense;
