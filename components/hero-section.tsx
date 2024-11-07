import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button";

export default function HeroSection(){
    return (
        <section className="py-20 text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">Capture your thoughts, simply.</h1>
            <p className="text-xl text-gray-600 mb-8">Minote: The minimalist note-taking app for modern thinkers.</p>
            <div className="flex flex-col md:flex-row justify-center items-center space-y-4 md:space-y-0 md:space-x-4">
                <Input type="email" placeholder="Enter your email" className="max-w-xs"/>
                <Button className="bg-blue-600 hover:bg-blue-700">Get Started - It&#39;s Free</Button>
            </div>
        </section>
    )
}