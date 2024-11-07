import {Button} from "@/components/ui/button";

export default function PricingSection() {
    return (
        <main>
            <section id="pricing" className="py-20">
                <div className="max-w-4xl mx-auto px-4">
                    <h2 className="text-3xl font-bold text-center mb-12">Simple Pricing</h2>
                    <div className="grid md:grid-cols-2 gap-8">
                        <div className="border rounded-lg p-6 text-center">
                            <h3 className="text-2xl font-semibold mb-4">Free</h3>
                            <p className="text-4xl font-bold mb-6">$0<span
                                className="text-base font-normal">/month</span>
                            </p>
                            <ul className="text-left mb-6 space-y-2">
                                <li>✓ Unlimited notes</li>
                                <li>✓ Sync across 2 devices</li>
                                <li>✓ Basic search</li>
                            </ul>
                            <Button variant="outline" className="w-full">Get Started</Button>
                        </div>
                        <div className="border rounded-lg p-6 text-center bg-gray-50">
                            <h3 className="text-2xl font-semibold mb-4">Pro</h3>
                            <p className="text-4xl font-bold mb-6">$5<span
                                className="text-base font-normal">/month</span>
                            </p>
                            <ul className="text-left mb-6 space-y-2">
                                <li>✓ Everything in Free</li>
                                <li>✓ Unlimited device sync</li>
                                <li>✓ Advanced search</li>
                                <li>✓ Collaboration features</li>
                            </ul>
                            <Button className="w-full bg-blue-600 hover:bg-blue-700">Upgrade to Pro</Button>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    )
}