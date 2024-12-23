"use client"
import {Notebook} from "lucide-react";
import Link from "next/link";
import {Button} from "@/components/ui/button";
import {UserButton, useUser} from "@clerk/nextjs";
import {Avatar, AvatarFallback} from "@/components/ui/avatar";

export default function Navbar() {
    const {isLoaded, isSignedIn} = useUser()

    return (
        <nav className="flex items-center justify-between p-4 md:p-6">
            <Link href={"/"} className="flex items-center space-x-2">
                <Notebook className="h-6 w-6"/>
                <span className="text-xl font-semibold">Minote</span>
            </Link>
            {
                !isLoaded ? (
                    <Avatar className="h-8 w-8">
                        <AvatarFallback className="h-8 w-8"></AvatarFallback>
                    </Avatar>
                ) : isSignedIn ? (

                    <div className="h-8 w-8">
                        <UserButton/>
                    </div>
                ) : (
                    <div className="flex items-center gap-4">
                        <Link href="/sign-in">Sign In</Link>
                        <Button asChild className="bg-blue-600 hover:bg-blue-700 text-white">
                            <Link href="/sign-up">Get Started</Link>
                        </Button>
                    </div>
                )
            }


        </nav>
    )
}