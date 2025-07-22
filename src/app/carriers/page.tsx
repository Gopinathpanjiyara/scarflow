import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { CarrierSection } from "@/components/sections/CarrierSection";

export const metadata = {
  title: "Carriers | Scarflow - Redefining Startup Hiring",
  description: "Discover verified job opportunities and internships from our network of trusted employers.",
};

export default function CarriersPage() {
  return (
    <>
      <Header />
      <main>
        <div className="pt-20 pb-8 bg-gradient-to-br from-blue-50 via-white to-purple-50">
          <div className="container mx-auto px-4 md:px-6">
            <h1 className="text-4xl md:text-5xl font-bold text-center">
              Our Carrier <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600">Network</span>
            </h1>
            <p className="mt-4 text-xl text-gray-600 text-center max-w-2xl mx-auto">
              Discover internships and job opportunities from our verified partners
            </p>
          </div>
        </div>
        <CarrierSection />
      </main>
      <Footer />
    </>
  );
} 