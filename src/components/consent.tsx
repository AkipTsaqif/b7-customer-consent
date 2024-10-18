"use client";

import { useEffect, useState } from "react";
import { useForm, useFormState } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Checkbox } from "./ui/checkbox";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Form, FormControl, FormField, FormItem, FormLabel } from "./ui/form";
import { Button } from "./ui/button";
import { saveConsent, sendEmail } from "@/app/actions/sql";
import { useSearchParams } from "next/navigation";

interface ConsentProps {
	isDisabled: boolean;
	referer: string | null;
	setFormSubmitSuccess: (value: boolean) => void | undefined;
}

const FormSchema = z.object({
	name: z
		.string({
			required_error: "Nama harus diisi",
		})
		.min(2),
	email: z.string().email(),
	phone: z.string().min(6),
	address: z.string(),
	other_info: z.string(),
	agreeTerms: z.boolean().refine((val) => val === true, {
		message: "You must agree to the terms",
	}),
});

const Consent = ({
	isDisabled,
	referer,
	setFormSubmitSuccess,
}: ConsentProps) => {
	const form = useForm<z.infer<typeof FormSchema>>({
		resolver: zodResolver(FormSchema),
		defaultValues: {
			name: "",
			email: "",
			phone: "",
			address: "",
			other_info: "",
			agreeTerms: false,
		},
		mode: "onChange",
	});

	const searchParams = useSearchParams();

	const { isValid } = useFormState({ control: form.control });
	const [isLoading, setIsLoading] = useState(false);
	const [uniqueIdentifier, setUniqueIdentifier] = useState<string | null>(
		null
	);

	useEffect(() => {
		if (typeof window !== "undefined") {
			const uid = new URLSearchParams(window.location.search).get("uid");
			setUniqueIdentifier(uid);
		}
	}, []);

	const onSubmit = async (data: z.infer<typeof FormSchema>) => {
		setIsLoading(true);
		let user_data_json = "";

		const fetchJsonData = async () => {
			const response = await fetch(
				`/api/consent?uid=${uniqueIdentifier}`
			);
			const data = await response.json();
			user_data_json = data;
		};

		await fetchJsonData();

		const formData = new FormData();
		formData.append("name", data.name);
		formData.append("email", data.email);
		formData.append("phone", data.phone);
		formData.append("address", data.address);
		formData.append("other_info", data.other_info);
		formData.append("agreeTerms", data.agreeTerms.toString());

		// if (cookieData !== null)
		// 	formData.append("user_data_json", JSON.stringify(cookieData));
		// else

		formData.append("user_data_json", JSON.stringify(user_data_json) || "");
		formData.append(
			"referer",
			searchParams.get("referer") || referer || ""
		);

		const result = await saveConsent(formData);
		await sendEmail(formData);
		if (result.status === 201) {
			form.reset();
			setIsLoading(false);
			setFormSubmitSuccess(true);
		}
	};

	return (
		<div className="grid py-2">
			<Form {...form}>
				<form onSubmit={form.handleSubmit(onSubmit)}>
					<FormField
						control={form.control}
						name="name"
						render={({ field }) => (
							<FormItem className="grid grid-cols-12 items-center gap-2">
								<FormLabel className="col-span-3 lg:col-span-2 font-bold text-sm md:text-md">
									Nama:<span className="text-red-600">*</span>
								</FormLabel>
								<FormControl>
									<Input
										{...field}
										className="col-span-9 lg:col-span-10 disabled:bg-neutral-400 focus-visible:ring-green-600 focus-visible:ring-offset-0"
										disabled={isDisabled}
										autoComplete="off"
									/>
								</FormControl>
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name="email"
						render={({ field }) => (
							<FormItem className="grid grid-cols-12 items-center gap-2">
								<FormLabel className="col-span-3 lg:col-span-2 font-bold text-sm md:text-md">
									Email:
									<span className="text-red-600">*</span>
								</FormLabel>
								<FormControl>
									<Input
										{...field}
										className="col-span-9 lg:col-span-10 disabled:bg-neutral-400 focus-visible:ring-green-600 focus-visible:ring-offset-0"
										type="email"
										disabled={isDisabled}
										autoComplete="off"
									/>
								</FormControl>
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name="phone"
						render={({ field }) => (
							<FormItem className="grid grid-cols-12 items-center gap-2">
								<FormLabel className="col-span-3 lg:col-span-2 font-bold text-sm md:text-md">
									Nomor HP:
									<span className="text-red-600">*</span>
								</FormLabel>
								<FormControl>
									<Input
										{...field}
										className="col-span-9 lg:col-span-10 disabled:bg-neutral-400 focus-visible:ring-green-600 focus-visible:ring-offset-0"
										disabled={isDisabled}
									/>
								</FormControl>
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name="address"
						render={({ field }) => (
							<FormItem className="grid grid-cols-12 items-center gap-2">
								<FormLabel className="col-span-3 lg:col-span-2 text-sm md:text-md">
									Alamat:
								</FormLabel>
								<FormControl>
									<Input
										{...field}
										className="col-span-9 lg:col-span-10 disabled:bg-neutral-400 focus-visible:ring-green-600 focus-visible:ring-offset-0"
										disabled={isDisabled}
									/>
								</FormControl>
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name="other_info"
						render={({ field }) => (
							<FormItem className="grid grid-cols-12 items-center gap-2">
								<FormLabel className="col-span-3 lg:col-span-2 text-sm md:text-md">
									Info tambahan:
								</FormLabel>
								<FormControl>
									<Input
										{...field}
										className="col-span-9 lg:col-span-10 disabled:bg-neutral-400 focus-visible:ring-green-600 focus-visible:ring-offset-0"
										disabled={isDisabled}
									/>
								</FormControl>
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name="agreeTerms"
						render={({ field }) => (
							<FormItem>
								<label className="flex gap-4 cursor-pointer items-center mt-4">
									<FormControl>
										<Checkbox
											id="terms"
											className="w-5 h-5"
											disabled={isDisabled}
											checked={field.value}
											onCheckedChange={field.onChange}
										/>
									</FormControl>
									<Label
										htmlFor="terms"
										className="text-sm md:text-md leading-none cursor-pointer peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
									>
										Dengan mengisi tanda centang pada box
										ini, saya mengakui bahwa saya telah
										membaca dan memahami isi Formulir ini,
										serta memberikan persetujuan kepada PT
										Bintang Toedjoe, yang merupakan satu
										kesatuan dalam Grup Kalbe dan/atau
										perusahaan-perusahaan dalam Grup Kalbe
										dan/atau afiliasi dan/atau partner yang
										ditunjuk untuk melakukan kegiatan
										pemrosesan Data Pribadi yang saya
										berikan sebagaimana yang dijelaskan
										dan/atau diinformasikan pada{" "}
										<span className="italic">
											Privacy Policy
										</span>{" "}
										dan{" "}
										<span className="italic">
											Cookies Consent
										</span>
										.
									</Label>
								</label>
							</FormItem>
						)}
					/>
					{/* <FormField
						control={form.control}
						name="agreeData"
						render={({ field }) => (
							<FormItem className="">
								<label className="flex gap-4 cursor-pointer items-center mt-4">
									<FormControl>
										<Checkbox
											id="agreeData"
											className="w-5 h-5"
											disabled={isDisabled}
											checked={field.value}
											onCheckedChange={field.onChange}
										/>
									</FormControl>
									<Label
										htmlFor="agreeData"
										className="text-md font-bold leading-none cursor-pointer peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
									>
										Saya menyetujui pengumpulan dan
										pemrosesan data saya sesuai tujuan yang
										telah disebutkan dalam formulir ini.
									</Label>
								</label>
							</FormItem>
						)}
					/> */}
					<Button
						type="submit"
						className="mt-4 w-full bg-green-600 font-bold text-lg disabled:bg-neutral-400 disabled:cursor-not-allowed"
						disabled={isDisabled || !isValid || isLoading}
					>
						Submit
					</Button>
				</form>
			</Form>
		</div>
	);
};

export default Consent;
