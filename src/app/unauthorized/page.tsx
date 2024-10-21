const Unauthorized = () => {
	return (
		<div className="flex h-[calc(95vh-12rem)] items-center justify-center overscroll-auto overflow-hidden">
			<div className="flex flex-col items-center justify-center">
				<h1 className="text-[3rem] font-bold">Ditolak!</h1>
				<p className="text-xl">
					Silahkan kontak admin untuk informasi lebih lanjut
				</p>
			</div>
		</div>
	);
};

export default Unauthorized;
