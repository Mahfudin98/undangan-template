import Image from "next/image";
import {
  MdAccessTimeFilled,
  MdCalendarMonth,
  MdCameraEnhance,
  MdCelebration,
  MdMap,
  MdOutlineCheckroom,
  MdOutlineHistoryEdu,
  MdOutlineVerified,
  MdShare,
} from "react-icons/md";

export default function Home() {
  return (
    <div className="font-sans text-slate-900 overflow-x-hidden">
      <header className="fixed top-0 w-full z-50 bg-white/80 backdrop-blur-md border-b border-burgundy/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-2xl font-serif font-bold text-burgundy">
              B&amp;A
            </span>
          </div>
          <nav className="hidden md:flex items-center gap-8">
            <a
              className="text-xs font-bold uppercase tracking-widest hover:text-burgundy transition-colors"
              href="#beranda"
            >
              Beranda
            </a>
            <a
              className="text-xs font-bold uppercase tracking-widest hover:text-burgundy transition-colors"
              href="#acara"
            >
              Detail Acara
            </a>
            <a
              className="text-xs font-bold uppercase tracking-widest hover:text-burgundy transition-colors"
              href="#lokasi"
            >
              Lokasi
            </a>
            <a
              className="text-xs font-bold uppercase tracking-widest hover:text-burgundy transition-colors"
              href="#dresscode"
            >
              Dresscode
            </a>
            <a
              className="text-xs font-bold uppercase tracking-widest hover:text-burgundy transition-colors"
              href="#ucapan"
            >
              Ucapan
            </a>
          </nav>
          <a
            className="bg-burgundy text-white px-6 py-2.5 rounded-full text-xs font-bold uppercase tracking-tighter hover:bg-burgundy/90 transition-all shadow-lg shadow-burgundy/20"
            href="#ucapan"
          >
            RSVP
          </a>
        </div>
      </header>

      {/* main */}
      <main>
        {/* breadcrumb */}
        <section
          className="relative min-h-screen flex flex-col md:flex-row pt-16"
          id="beranda"
        >
          <div className="relative flex-1 group overflow-hidden border-r border-white/10">
            <Image
              src={
                "https://lh3.googleusercontent.com/aida-public/AB6AXuBmIbaqoiOFOezRG_y42ChDvdhjwlXZNsQx6S6Mrt-yItxFcFvXTaVZe59UOXw122mOFc1sbMNke3d3tYP5FqwwBbhuepmFEZ2JH51TY8d7OFLjmZj3YvKXQynZ4P0o1dKMBhVtrILkX6lQHO8ZE_3Av-frAkFAaAG51Xj5LJhZkf47vDFJMRlIawLWm1VMshHgXLug9AEbtXEJFoSLqsuikAh-wZwPjeZcD4q3TXRPLnuneVRj4nt0Ebclpg02iRln5PLcXdnhu0Y"
              }
              width={1080}
              height={1080}
              className="absolute inset-0 w-full h-full object-cover grayscale-30 group-hover:grayscale-0 transition-all duration-700"
              alt="Babang"
            />
            <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors"></div>
            <div className="absolute inset-x-0 bottom-0 p-8 md:p-12 z-10 text-white translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
              <span className="inline-block px-3 py-1 rounded bg-rose-gold text-[10px] font-bold uppercase tracking-widest mb-4">
                Khitanan
              </span>
              <h2 className="text-5xl md:text-7xl font-serif font-bold mb-2">
                Babang
              </h2>
              <p className="text-white/80 max-w-xs text-sm leading-relaxed">
                Melangkah penuh keberanian dalam babak baru kehidupan.
              </p>
            </div>
          </div>
          <div className="hidden lg:flex absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20 flex-col items-center">
            <div className="size-20 bg-burgundy rounded-full flex items-center justify-center border-4 border-cream shadow-2xl">
              <span className="text-white font-serif text-2xl italic">
                &amp;
              </span>
            </div>
          </div>
          <div className="relative flex-1 group overflow-hidden">
            <Image
              src={
                "https://lh3.googleusercontent.com/aida-public/AB6AXuAF0PWoQoCuZii8U4EOjEB1yLoY7oTTuhhwBQrHCOVONhEbdXoSYLgR3iMYW8N-twBJSL0NfQyifUTosCJwHk32XtOVk69TObSoE267__PMh41iL0qCiOlgbga4g74bgQusvdePru-AIpk5JIQEGqDwJTnsjvQWRm5pc-VpappXZcbdPs93UGrQZ93PtFaLZu-wS7uQLstbveTv5qm-1Hwhwc2BT2CxCH2iZkdizM4FV_f0D52Ka5MKZh8zvDvMkGr8jHdSXao_Y7E"
              }
              width={1080}
              height={1080}
              className="absolute inset-0 w-full h-full object-cover grayscale-30 group-hover:grayscale-0 transition-all duration-700"
              alt="Aa"
            />
            <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors"></div>
            <div className="absolute inset-x-0 bottom-0 p-8 md:p-12 z-10 text-white translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
              <span className="inline-block px-3 py-1 rounded bg-burgundy text-[10px] font-bold uppercase tracking-widest mb-4">
                Ulang Tahun
              </span>
              <h2 className="text-5xl md:text-7xl font-serif font-bold mb-2 text-rose-gold">
                Aa
              </h2>
              <p className="text-white/80 max-w-xs text-sm leading-relaxed">
                Merayakan satu tahun kebahagiaan dan tawa yang ceria.
              </p>
            </div>
          </div>
        </section>
        {/* about */}
        <section className="py-24 px-6 bg-white">
          <div className="max-w-3xl mx-auto text-center">
            <span className="grid place-items-center">
              <MdCelebration className="text-burgundy text-4xl mb-6" />
            </span>
            <h3 className="text-3xl md:text-4xl font-serif font-bold text-burgundy mb-6">
              Syukuran Khitanan &amp; Hari Ulang Tahun
            </h3>
            <p className="text-slate-600 leading-relaxed text-lg italic">
              &quot;Segala puji bagi Tuhan atas limpahan rahmat-Nya. Kami
              mengundang Bapak/Ibu/Saudara/i untuk turut serta merayakan momen
              istimewa putra-putra kami.&quot;
            </p>
          </div>
        </section>
        {/* schedule */}
        <section className="py-24 bg-cream px-6" id="acara">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="bg-white p-10 rounded-3xl shadow-sm border border-slate-100 flex flex-col items-center text-center">
                <div className="size-16 rounded-2xl bg-burgundy/5 flex items-center justify-center mb-6">
                  <span className="grid place-items-center">
                    <MdCalendarMonth className="text-burgundy text-3xl" />
                  </span>
                </div>
                <h4 className="text-xs font-black uppercase tracking-widest text-slate-400 mb-2">
                  Tanggal
                </h4>
                <p className="text-2xl font-serif font-bold text-burgundy">
                  Minggu, 25 Januari 2026
                </p>
              </div>
              <div className="bg-white p-10 rounded-3xl shadow-sm border border-slate-100 flex flex-col items-center text-center">
                <div className="size-16 rounded-2xl bg-burgundy/5 flex items-center justify-center mb-6">
                  <span className="grid place-items-center">
                    <MdAccessTimeFilled className="text-burgundy text-3xl" />
                  </span>
                </div>
                <h4 className="text-xs font-black uppercase tracking-widest text-slate-400 mb-2">
                  Waktu
                </h4>
                <p className="text-2xl font-serif font-bold text-burgundy">
                  Pukul 19.00 WIB
                </p>
                <p className="text-sm text-slate-500 mt-1">Sampai Selesai</p>
              </div>
              <div className="bg-burgundy p-10 rounded-3xl shadow-2xl flex flex-col items-center text-center text-white">
                <div className="size-16 rounded-2xl bg-white/10 flex items-center justify-center mb-6">
                  <span className="grid place-items-center">
                    <MdOutlineCheckroom className="text-white text-3xl" />
                  </span>
                </div>
                <h4 className="text-xs font-black uppercase tracking-widest text-white/60 mb-2">
                  Nuansa
                </h4>
                <p className="text-2xl font-serif font-bold text-rose-gold">
                  Burgundy &amp; Rose Gold
                </p>
              </div>
            </div>
          </div>
        </section>
        {/* locations */}
        <section className="py-24 px-6 bg-soft-gray" id="lokasi">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col lg:flex-row gap-16 items-center">
              <div className="flex-1 w-full">
                <span className="text-burgundy font-bold text-sm tracking-widest uppercase mb-4 block">
                  Lokasi Perayaan
                </span>
                <h3 className="text-4xl font-serif font-bold mb-6">
                  Grand Ballroom Majestic
                </h3>
                <p className="text-slate-600 mb-8 leading-relaxed">
                  Jl. Kemakmuran No. 88, Jakarta Pusat.
                  <br />
                  Gedung dengan parkir luas dan fasilitas nyaman untuk keluarga.
                </p>
                <a
                  className="inline-flex items-center gap-2 bg-burgundy text-white px-8 py-4 rounded-xl font-bold hover:scale-105 transition-transform"
                  href="#"
                >
                  <MdMap />
                  Petunjuk Lokasi
                </a>
              </div>
              <div className="flex-1 w-full">
                <div className="aspect-video bg-slate-200 rounded-4xl overflow-hidden shadow-2xl relative border-8 border-white">
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d21726.939960785334!2d108.2676332483104!3d-6.8540629970323526!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e6f25edae6d4345%3A0xd1db95b910b057d2!2sLS%20Skincare%20Official%2002!5e1!3m2!1sid!2sid!4v1769152362356!5m2!1sid!2sid"
                    width="400"
                    height="400"
                    className="w-full h-full object-cover"
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>
        {/* dresscod */}
        <section className="py-24 bg-cream px-6" id="dresscode">
          <div className="max-w-4xl mx-auto text-center">
            <h3 className="text-4xl font-serif font-bold text-burgundy mb-4">
              Aturan Berpakaian
            </h3>
            <p className="text-slate-600 mb-16">
              Kehadiran Anda adalah kado terindah, namun keselarasan warna akan
              mempercantik kenangan kita.
            </p>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-12 items-center justify-center mb-20">
              <div className="group">
                <div className="size-32 mx-auto rounded-full bg-burgundy ring-offset-4 ring-4 ring-burgundy shadow-[0_20px_50px_rgba(128,0,32,0.3)] transition-transform group-hover:scale-110"></div>
                <p className="mt-8 font-bold text-burgundy tracking-widest uppercase text-xs">
                  Burgundy
                </p>
              </div>
              <div className="group">
                <div className="size-32 mx-auto rounded-full bg-rose-gold ring-offset-4 ring-4 ring-rose-gold shadow-[0_20px_50px_rgba(183,110,121,0.3)] transition-transform group-hover:scale-110"></div>
                <p className="mt-8 font-bold text-rose-gold tracking-widest uppercase text-xs">
                  Rose Gold
                </p>
              </div>
              <div className="group col-span-2 md:col-span-1">
                <div className="size-32 mx-auto rounded-full bg-slate-400 ring-offset-4 ring-4 ring-slate-400 shadow-[0_20px_50px_rgba(148,163,184,0.3)] transition-transform group-hover:scale-110"></div>
                <p className="mt-8 font-bold text-slate-500 tracking-widest uppercase text-xs">
                  Soft Gray
                </p>
              </div>
            </div>
            <div className="bg-white p-8 md:p-12 rounded-3xl border border-burgundy/10 shadow-xl max-w-2xl mx-auto">
              <p className="text-sm text-slate-600 mb-0">
                &quot; Mohon mengenakan pakaian bernuansa{" "}
                <strong className="text-burgundy">Burgundy</strong> atau warna
                senada agar suasana perayaan terasa lebih hangat dan
                elegan.&quot;
              </p>
            </div>
          </div>
        </section>
        {/* pesan */}
        <section className="py-24 px-6 bg-soft-gray" id="ucapan">
          <div className="max-w-5xl mx-auto">
            <div className="bg-white rounded-3xl lg:rounded-[3rem] shadow-2xl overflow-hidden flex flex-col lg:flex-row">
              <div className="lg:w-1/3 bg-burgundy p-6 lg:p-12 text-white">
                <h3 className="text-4xl font-serif font-bold mb-6">
                  Pesan &amp; Harapan
                </h3>
                <p className="text-white/70 leading-relaxed mb-8">
                  Bagikan doa dan ucapan terbaik Anda untuk Babang dan Aa di
                  hari yang berbahagia ini.
                </p>
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <MdOutlineVerified className="text-rose-gold size-6" />
                    <span className="text-sm font-medium">
                      Konfirmasi Kehadiran
                    </span>
                  </div>
                  <div className="flex items-center gap-3">
                    <MdOutlineHistoryEdu className="text-rose-gold size-6" />
                    <span className="text-sm font-medium">Tinggalkan Doa</span>
                  </div>
                </div>
              </div>
              <div className="lg:w-2/3 p-6 lg:p-12">
                <form className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-xs font-black uppercase tracking-widest text-slate-400 mb-2">
                        Nama Lengkap
                      </label>
                      <input
                        className="w-full border-slate-200 focus:ring-burgundy focus:border-burgundy rounded-xl p-4 bg-slate-50"
                        placeholder="Masukkan nama Anda"
                        type="text"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-black uppercase tracking-widest text-slate-400 mb-2">
                        Kehadiran
                      </label>
                      <select className="w-full border-slate-200 focus:ring-burgundy focus:border-burgundy rounded-xl p-4 bg-slate-50">
                        <option>Akan Hadir</option>
                        <option>Maaf, Berhalangan</option>
                        <option>Masih Ragu</option>
                      </select>
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs font-black uppercase tracking-widest text-slate-400 mb-2">
                      Pesan Untuk Babang &amp; Aa
                    </label>
                    <textarea
                      className="w-full border-slate-200 focus:ring-burgundy focus:border-burgundy rounded-xl p-4 bg-slate-50 min-h-30"
                      placeholder="Tuliskan doa terbaik..."
                    ></textarea>
                  </div>
                  <button className="w-full bg-burgundy text-white py-5 rounded-xl font-bold uppercase tracking-widest hover:bg-black transition-colors shadow-xl shadow-burgundy/10">
                    Kirim Ucapan
                  </button>
                </form>
              </div>
            </div>
          </div>
        </section>
      </main>
      {/* end main */}

      <footer className="bg-white py-16 px-6 border-t border-slate-100">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-2xl font-serif font-bold text-burgundy mb-4">
            Babang &amp; Aa
          </h2>
          <p className="text-slate-400 text-sm mb-8">
            Merayakan Pertumbuhan &amp; Rasa Syukur
          </p>
          <div className="flex justify-center gap-4 mb-12">
            <a
              className="size-10 rounded-full bg-soft-gray flex items-center justify-center text-slate-600 hover:bg-burgundy hover:text-white transition-all"
              href="#"
            >
              <MdShare className="size-6" />
            </a>
            <a
              className="size-10 rounded-full bg-soft-gray flex items-center justify-center text-slate-600 hover:bg-burgundy hover:text-white transition-all"
              href="#"
            >
              <MdCameraEnhance className="size-6" />
            </a>
          </div>
          <div className="text-[10px] text-slate-300 uppercase tracking-[0.3em]">
            © 2026 Syukuran Babang &amp; Aa • All Rights Reserved
          </div>
        </div>
      </footer>
    </div>
  );
}
