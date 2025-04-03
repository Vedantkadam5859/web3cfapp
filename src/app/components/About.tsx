export default function About() {
    return (
        <div className="min-h-screen flex flex-col bg-gradient-to-r from-blue-900 via-gray-800 to-gray-900 text-white px-6 sm:px-12 lg:px-24 py-12">
            <h1 className="text-4xl font-extrabold text-center mb-6 text-white drop-shadow-lg">About CrowdChain</h1>
            <p className="text-lg leading-relaxed text-gray-300 text-center">
                Welcome to <span className="font-semibold text-white">CrowdChain</span>, the revolutionary blockchain-based crowdfunding platform.
                We empower individuals and organizations to raise funds for their dreams, ventures, and causes with transparency, security, and efficiency.
            </p>

            <h2 className="text-2xl font-semibold text-white mt-8 mb-4">🚀 Our Mission</h2>
            <p className="text-gray-300">
                CrowdChain is dedicated to seamless fundraising, offering donors and backers the confidence that their contributions are securely managed.  
                <span className="block mt-2 font-semibold text-white">Empowering Dreams, One Block at a Time.</span>
            </p>

            <h2 className="text-2xl font-semibold text-white mt-8 mb-4">✨ Key Features</h2>
            <ul className="list-disc list-inside space-y-3 text-gray-300">
                <li><span className="font-medium text-white">🔹 Create & Manage Campaigns:</span> Set up and track fundraising goals effortlessly.</li>
                <li><span className="font-medium text-white">🎁 Milestone-Based Rewards:</span> Reward donors based on campaign success.</li>
                <li><span className="font-medium text-white">🔒 Blockchain Security:</span> Ensure trust with transparent transactions.</li>
                <li><span className="font-medium text-white">🌎 Community Support:</span> Engage with a passionate network of backers.</li>
            </ul>

            <h2 className="text-2xl font-semibold text-white mt-8 mb-4">🌟 Why Choose CrowdChain?</h2>
            <p className="text-gray-300">
                Unlike traditional crowdfunding platforms with high fees and transparency issues, CrowdChain leverages blockchain technology to ensure fairness, security, and efficiency.
            </p>

            {/* Footer (stays at bottom) */}
            <footer className="w-full bg-gray-900 text-gray-300 text-center py-4 mt-12">
                CrowdChain - Empowering Dreams, One Block at a Time
            </footer>
        </div>
    );
}