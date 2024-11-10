export default function AuthBanner() {
    return (
        <div className="hidden w-1/2 lg:block bg-gradient-to-b from-white to-gray-200 p-12">
            <div className="h-full flex flex-col">
                <div className="flex-grow flex flex-col justify-center">
                    <h1 className="text-4xl font-bold mb-6 text-gray-900">Capture your thoughts, simply.</h1>
                    <p className="text-xl text-gray-600 mb-12">The minimalist note-taking app for modern
                        thinkers.</p>
                </div>
            </div>
        </div>
    )
}