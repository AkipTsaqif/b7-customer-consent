"use client";

import { useEffect, useState } from "react";
import { useForm, useFormState } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Checkbox } from "./ui/checkbox";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "./ui/form";
import { Button } from "./ui/button";
import { saveConsent } from "@/app/actions/sql";

interface ConsentProps {
	isDisabled: boolean;
	setFormSubmitSuccess: (value: boolean) => void;
}

const FormSchema = z.object({
	email: z.string().email(),
	agreeTerms: z.boolean().refine((val) => val === true, {
		message: "You must agree to the terms",
	}),
	agreeData: z.boolean().refine((val) => val === true, {
		message: "You must agree to data processing",
	}),
});

const Consent = ({ isDisabled, setFormSubmitSuccess }: ConsentProps) => {
	const form = useForm<z.infer<typeof FormSchema>>({
		resolver: zodResolver(FormSchema),
		defaultValues: {
			email: "",
			agreeTerms: false,
			agreeData: false,
		},
		mode: "onChange",
	});

	const { isValid } = useFormState({ control: form.control });
	const [isLoading, setIsLoading] = useState(false);

	const onSubmit = async (data: z.infer<typeof FormSchema>) => {
		const formData = new FormData();
		formData.append("email", data.email);
		formData.append("agreeTerms", data.agreeTerms.toString());
		formData.append("agreeData", data.agreeData.toString());

		const result = await saveConsent(formData);
		if (result.status === 201) {
			form.reset();
			setFormSubmitSuccess(true);
		}
	};

	return (
		<div className="w-[30rem] md:w-[40rem] lg:w-[50rem] grid py-2">
			<Form {...form}>
				<form onSubmit={form.handleSubmit(onSubmit)}>
					<FormField
						control={form.control}
						name="email"
						render={({ field }) => (
							<FormItem className="grid grid-cols-12 items-center gap-2">
								<FormLabel className="col-span-2 lg:col-span-1 font-bold text-md">
									Email:
								</FormLabel>
								<FormControl>
									<Input
										{...field}
										className="col-span-10 lg:col-span-11 disabled:bg-neutral-400 focus-visible:ring-green-600 focus-visible:ring-offset-0"
										type="email"
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
										className="text-md font-bold leading-none cursor-pointer peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
									>
										Saya membaca dan menyetujui syarat dan
										ketentuan yang berlaku sesuai dengan
										peraturan PT Bintang Toedjoe.
									</Label>
								</label>
							</FormItem>
						)}
					/>
					<FormField
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
					/>
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
