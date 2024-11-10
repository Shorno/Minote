import {SignIn} from '@clerk/nextjs'
import AuthBanner from "@/components/auth-banner";

export default function Page() {
    return (
        <div className="flex h-[calc(100vh-84px)] bg-background">
            <AuthBanner/>
            <div className="w-full lg:w-1/2 flex flex-col items-center justify-center p-8">
                <div className="w-full max-w-md space-y-8">
                    <div className="text-center">
                        <h2 className="mt-6 text-3xl font-bold tracking-tight text-gray-900">
                            Welcome back to Minote
                        </h2>
                        <p className="mt-2 text-sm text-gray-600">
                            Please sign in to your account to continue your note-taking journey
                        </p>
                    </div>
                    <div className={"flex justify-center"}>
                        <SignIn/>
                    </div>
                </div>
            </div>
        </div>
    )
}