import {Notebook} from "lucide-react";
import Link from "next/link";
import {Button} from "@/components/ui/button";

export default function Navbar() {
    return (
        <nav className="flex items-center justify-between p-4 md:p-6">
            <div className="flex items-center space-x-2">
                <Notebook className="h-6 w-6"/>
                <span className="text-xl font-semibold">Minote</span>
            </div>
            <div className="hidden md:flex space-x-4">
                <Link href={"#features"} className="hover:text-gray-600">Features</Link>
                <Link href={"#pricing"} className="hover:text-gray-600">Pricing</Link>
            </div>
            <div className={"flex items-center gap-4"}>
                <Link href={"/sign-in"}>Sign In</Link>
                <Button asChild className="bg-blue-600 hover:bg-blue-700 text-white">
                    <Link className={""} href={"/sign-up"}>Get Started</Link>
                </Button>

            </div>
        </nav>
    )
}