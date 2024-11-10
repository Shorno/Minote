import LandingUi from "@/components/landing-ui";
import {auth} from "@clerk/nextjs/server";
import {redirect} from "next/navigation";

export default async function Home() {
    const {userId} = await auth()

    if (userId) {
        redirect("/dashboard")
    }


    return (
        <main className={""}>
            <LandingUi/>
        </main>
    );
}
