import Navbar from "@/components/navbar";
import FeaturesSection from "@/components/features-section";
import HeroSection from "@/components/hero-section";
import Footer from "@/components/footer";

export default function LandingUi() {
    return (
        <div className="min-h-screen flex flex-col bg-white text-gray-900">
            <Navbar/>
           <div className={"flex-grow"}>
               <HeroSection/>
               <FeaturesSection/>
           </div>
            <Footer/>
        </div>
    )
}