// import KhitananBurgundi from "./_templates/khitanan/burgundi";
import UltahUnicorn from "./_templates/ultah/unicorn";

export default function Home() {
  // ganti sesuai tema yang ingin dipakai
  const activeTheme = "ultah"; // atau "ultah"

  if (activeTheme === "ultah") {
    return <UltahUnicorn />;
  }

  // if (activeTheme === "khitanan") {
  //   return <KhitananBurgundi />;
  // }

  return <div>Tema tidak ditemukan</div>;
}
