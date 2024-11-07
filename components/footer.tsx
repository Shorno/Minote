import {Notebook} from "lucide-react";

export default function Footer() {
    return (
        <footer className="bg-gray-100 py-8">
            <div className="max-w-5xl mx-auto px-4 flex flex-col md:flex-row justify-between items-center">
                <div className="flex items-center space-x-2 mb-4 md:mb-0">
                    <Notebook className="h-6 w-6"/>
                    <span className="text-xl font-semibold">Minote</span>
                </div>
                <div className="flex space-x-4">
                    <a href="#" className="text-gray-600 hover:text-gray-900">Privacy</a>
                    <a href="#" className="text-gray-600 hover:text-gray-900">Terms</a>
                    <a href="#" className="text-gray-600 hover:text-gray-900">Contact</a>
                </div>
            </div>
        </footer>
    )
}