import FeaturesSection from "@/components/features-section";
import HeroSection from "@/components/hero-section";
import Footer from "@/components/footer";
import PricingSection from "@/components/pricing-section";

export default function LandingUi() {
    return (
        <div className="min-h-screen flex flex-col bg-white text-gray-900">

            <HeroSection/>
            <FeaturesSection/>
            <PricingSection/>
            <Footer/>
        </div>
    )
}