import { Separator } from "@/components/ui/separator";

export default function Home() {
	return (
		<div className="flex-1 w-[30rem] md:w-[40rem] lg:w-[50rem] flex flex-col gap-20 text-justify">
			<div className="flex flex-col gap-2">
				<span className="font-bold text-2xl text-center">
					Formulir Persetujuan Pelanggan
				</span>
				<Separator className="my-4" />
				<div className="flex flex-col gap-3">
					<p>Pelanggan yang terhormat,</p>
					<p>
						<span className="text-green-700 font-bold">
							[Extra Joss]
						</span>{" "}
						yang dikelola oleh{" "}
						<span className="text-green-700 font-bold">
							[PT Bintang Toedjoe]
						</span>{" "}
						merupakan bagian dari PT Kalbe Farma Tbk.
					</p>
					<p>
						Kami berkomitmen untuk melindungi kerahasiaan Anda dan
						memastikan keamanan data pribadi Anda, sekaligus sebagai
						bagian dari kepatuhan kami terhadap Undang-undang
						Republik Indonesia Nomor 27 Tahun 2022 tentang
						Perlindungan Data Pribadi (atau dikenal sebagai UU PDP).
						Melalui Formulir Persetujuan Pelanggan, kami secara
						khusus meminta persetujuan Anda terkait aktivitas kami
						untuk memperoleh dan memproses data pribadi Anda.
					</p>
					<p>
						Formulir ini berisikan informasi terkait tujuan
						pengumpulan data, tipe data yang dikumpulkan,
						penyimpanan dan keamanan data, pembagian data, dan
						penarikan persetujuan.
					</p>
				</div>
				<div className="pl-2 mt-4">
					<ol className="list-decimal pl-5 gap-4">
						<li className="text-lg font-bold mb-2">
							Tujuan Pengumpulan Data
						</li>
						<p>
							Data yang kami kumpulkan dapat digunakan untuk
							menyediakan produk/layanan kami untuk Anda,
							mengelola akun dan hubungan dengan Anda, memproses
							pembayaran dan transaksi, berkomunikasi dengan Anda
							mengenai produk/layanan maupun promosi kami,
							meningkatkan produk dan layanan kami berdasarkan
							umpan balik dan preferensi Anda, serta mematuhi
							persyaratan hukum dan peraturan yang berlaku
						</p>
						<li className="text-lg font-bold mt-4 mb-2">
							Penyimpanan dan Keamanan Data
						</li>
						<div className="flex flex-col gap-2">
							<p>
								Data Anda akan disimpan selama diperlukan untuk
								memenuhi tujuan pengumpulannya atau sebagaimana
								diwajibkan oleh undang-undang dan peraturan yang
								berlaku
							</p>
							<p>
								Data Anda akan disimpan dengan aman dan hanya
								dapat diakses oleh pihak yang berwenang. Kami
								mengambil tindakan teknis dan pengelolaan yang
								sesuai untuk melindungi data Anda dari akses,
								kehilangan, penyalahgunaan, atau pengubahan yang
								tidak sah.
							</p>
						</div>
						<li className="text-lg font-bold mt-4 mb-2">
							Tipe Data yang Dikumpulkan
						</li>
						<p>
							Data yang kami kumpulkan antara lain sebagaimana
							yang tertera di bawah ini, namun tidak terbatas
							pada:
						</p>
						<ul className="list-disc pl-6 font-normal text-base">
							<li>
								Identitas: Nama, jenis kelamin, tanggal lahir,
								kewarganegaraan, status perkawinan;
							</li>
							<li>Data dan informasi kesehatan dan genetika;</li>
							<li>Data biometrik;</li>
							<li>Data anak;</li>
							<li>Data keuangan pribadi; dan/atau</li>
							<li>
								Data pribadi yang dikombinasikan untuk
								mengidentifikasi seseorang.
							</li>
						</ul>
						<li className="text-lg font-bold mt-4 mb-2">
							Pembagian Data
						</li>
						<p>
							Kami dapat membagikan data Anda dengan penyedia
							layanan Pihak Ketiga yang membantu kami dalam
							menyediakan produk dan layanan kami kepada Anda.
							Namun, kami tidak akan menjual atau menyewakan data
							Anda kepada Pihak Ketiga manapun untuk tujuan
							pemasaran.
						</p>
						<li className="text-lg font-bold mt-4 mb-2">
							Penarikan Persetujuan
						</li>
						<p>
							Anda memiliki hak untuk menarik persetujuan Anda
							kapan saja. Jika Anda ingin menarik persetujuan
							Anda, silakan hubungi kami menggunakan informasi
							kontak yang disediakan di bawah ini. Namun, harap
							diperhatikan bahwa dengan menarik persetujuan, dapat
							memengaruhi kemampuan kami untuk menyediakan produk
							atau layanan tertentu kepada Anda.
						</p>
					</ol>
				</div>
				<div className="flex flex-col gap-3 mt-4">
					<p>
						Informasi lebih rinci mengenai Persetujuan Pelanggan
						dapat ditemukan pada Kebijakan Privasi (Privacy Policy)
						dengan mengunjungi website kami di https://kalbe.co.id
						atau dengan mengajukan permintaan kepada kami.
					</p>
					<p>
						Apabila Anda memiliki pertanyaan atau kekhawatiran
						terkait keamanan dan/atau pemeliharaan data Anda di masa
						mendatang, Anda dipersilakan menghubungi kami melalui:
					</p>
					<div className="flex flex-col pl-16 pr-6">
						<p className="text-green-700 font-bold">[Extra Joss]</p>
						<div className="grid grid-cols-12">
							<span className="col-span-2">Alamat</span>
							<span className="text-right pr-2">:</span>
							<span className="col-span-9 text-green-700 font-bold">
								Jl. Pulomas Selatan Kav. No.3, RT.3/RW.13, Kayu
								Putih, Kec. Pulo Gadung, Kota Jakarta Timur,
								Daerah Khusus Ibukota Jakarta 13210
							</span>
						</div>
						<div className="grid grid-cols-12">
							<span className="col-span-2">Nomor Telepon</span>
							<span className="text-right pr-2">:</span>
							<span className="col-span-9 text-green-700 font-bold">
								021 475-7777
							</span>
						</div>
						<div className="grid grid-cols-12">
							<span className="col-span-2">Email</span>
							<span className="text-right pr-2">:</span>
							<span className="col-span-9 text-green-700 font-bold">
								[Email Bintang 7]
							</span>
						</div>
					</div>
				</div>
				<p className="mt-4">
					Terima kasih atas kepercayaan Anda terhadap{" "}
					<span className="text-green-700 font-bold">
						[Nama Brand Anda]
					</span>
					. Kami menghargai privasi Anda dan berkomitmen untuk
					melindungi data pribadi Anda.
				</p>
			</div>
		</div>
	);
}
