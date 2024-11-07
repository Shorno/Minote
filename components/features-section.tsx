import {Feather, Lock, Zap} from "lucide-react";

export default function FeaturesSection(){
    return (
        <section id="features" className="py-20 bg-gray-50">
            <div className="max-w-5xl mx-auto px-4">
                <h2 className="text-3xl font-bold text-center mb-12">Why Minote?</h2>
                <div className="grid md:grid-cols-3 gap-8">
                    <div className="text-center">
                        <Feather className="h-12 w-12 mx-auto mb-4 text-blue-600"/>
                        <h3 className="text-xl font-semibold mb-2">Effortless Writing</h3>
                        <p className="text-gray-600">Clean interface for distraction-free note-taking.</p>
                    </div>
                    <div className="text-center">
                        <Zap className="h-12 w-12 mx-auto mb-4 text-blue-600"/>
                        <h3 className="text-xl font-semibold mb-2">Lightning Fast</h3>
                        <p className="text-gray-600">Instant sync across all your devices.</p>
                    </div>
                    <div className="text-center">
                        <Lock className="h-12 w-12 mx-auto mb-4 text-blue-600"/>
                        <h3 className="text-xl font-semibold mb-2">Secure & Private</h3>
                        <p className="text-gray-600">Your notes are encrypted and only accessible by you.</p>
                    </div>
                </div>
            </div>
        </section>
    )
}