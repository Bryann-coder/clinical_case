import Image from "next/image";
import doctorImage from "@/app/assets/images/doctor.png";

interface AuthLayoutProps {
  children: React.ReactNode;
  title: string;
  subtitle: string;
}

const AuthPromo = ({ title, subtitle }: { title: string; subtitle: string }) => (
  <div className="relative hidden lg:flex flex-col w-1/2 bg-gradient-to-br from-[#A674FF] via-[#8C5BFF] to-[#7648FF] rounded-r-3xl overflow-hidden justify-between">
    
    {/* Fond avec courbes décoratives */}
    <div className="absolute inset-0 opacity-25">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 800 800"
        className="w-full h-full"
      >
        <path
          d="M0 100 Q200 200 400 100 T800 100"
          stroke="white"
          strokeWidth="40"
          fill="none"
        />
        <path
          d="M0 350 Q200 450 400 350 T800 350"
          stroke="white"
          strokeWidth="40"
          fill="none"
        />
        <path
          d="M0 600 Q200 700 400 600 T800 600"
          stroke="white"
          strokeWidth="40"
          fill="none"
        />
      </svg>
    </div>

    {/* Bloc texte translucide */}
    <div className="relative z-10 mt-20 mx-auto bg-white/15 backdrop-blur-lg border border-white/25 rounded-3xl p-10 text-center shadow-xl w-[80%]">
      <h1 className="text-3xl font-bold text-white leading-snug">
        {title}
      </h1>
      <p className="mt-3 text-white/90 text-base font-medium">{subtitle}</p>
    </div>

    {/* Image du docteur en bas */}
    <div className="relative z-10 flex justify-center items-end mt-10 pb-8">
      <Image
        src={doctorImage}
        alt="Doctor"
        width={380}
        height={500}
        quality={100}
        priority
        className="object-contain drop-shadow-2xl"
      />

      {/* Badge lumineux à gauche */}
      <div className="absolute bottom-10 left-16 bg-white rounded-full p-5 shadow-2xl flex items-center justify-center border border-white/40">
        <span className="text-3xl">✨</span>
      </div>
    </div>
  </div>
);

export default function AuthLayout({ children, title, subtitle }: AuthLayoutProps) {
  const getPromoContent = () => ({
    title: "Very good works are waiting for you",
    subtitle: "Login Now!!!",
  });

  const { title: promoTitle, subtitle: promoSubtitle } = getPromoContent();

  return (
    <main className="flex items-center justify-center min-h-screen bg-gray-50 p-4">
      <div className="w-full max-w-6xl mx-auto bg-white rounded-3xl shadow-2xl flex overflow-hidden min-h-[700px]">
        {/* Colonne gauche = contenu du login */}
        {children}

        {/* Colonne droite = visuel promo */}
        <AuthPromo title={promoTitle} subtitle={promoSubtitle} />
      </div>
    </main>
  );
}
