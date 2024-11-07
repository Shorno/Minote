import {Notebook} from "lucide-react";
import Link from "next/link";

export default function AuthBanner() {
    return (
        <div className="hidden w-1/2 lg:block bg-gray-50 p-12">
            <div className="h-full flex flex-col">
                <div className="flex items-center space-x-2 mb-12">
                    <Notebook className="h-8 w-8 text-blue-600"/>
                    <Link href={"/"} className="text-2xl font-semibold text-gray-900">Minote</Link>
                </div>
                <div className="flex-grow flex flex-col justify-center">
                    <h1 className="text-4xl font-bold mb-6 text-gray-900">Capture your thoughts, simply.</h1>
                    <p className="text-xl text-gray-600 mb-12">The minimalist note-taking app for modern
                        thinkers.</p>
                </div>
            </div>
        </div>
    )
}