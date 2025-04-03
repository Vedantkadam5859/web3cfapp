'use client';
import { client } from "@/app/client";
import CampaignCard from "@/app/components/CampaignCard";
import { getContract } from "thirdweb";
import { useState } from "react";
import { sepolia } from "thirdweb/chains";
import { CROWDFUNDING_FACTORY } from "@/app/constants/contracts";
import { useActiveAccount, useReadContract } from "thirdweb/react";
import { deployPublishedContract } from "thirdweb/deploys";

export default function DashboardPage() {
    const account = useActiveAccount();
    const [isModalOpen, setIsModalOpen] = useState(false);

    const contract = getContract({
        client: client,
        chain: sepolia,
        address: CROWDFUNDING_FACTORY,
    });

    const { data, isLoading } = useReadContract({
        contract,
        method: "function getUserCampaigns(address _user) view returns ((address campaignAddress, address owner, string name, uint256 creationTime)[])",
        params: [account?.address as string]
    });

    return (
        <main className="min-h-screen w-full bg-gradient-to-r from-blue-900 via-gray-800 to-gray-900 px-6 sm:px-12 lg:px-24 py-12 relative">
            <div className="absolute top-[10px] left-1/2 transform -translate-x-1/2 w-full max-w-6xl px-6 sm:px-8 lg:px-12">
                <div className="flex flex-row justify-between items-center mb-10">
                    <h1 className="text-4xl font-extrabold text-gray-100 tracking-tight">Dashboard</h1>
                    <button
                        className="px-6 py-3 bg-gradient-to-r from-blue-500 to-indigo-600 text-white font-semibold rounded-xl shadow-md hover:scale-105 transition-transform"
                        onClick={() => setIsModalOpen(true)}
                    >
                        + New Campaign
                    </button>
                </div>
    
                <h2 className="text-2xl font-semibold text-gray-300 mb-6">Your Campaigns</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                    {isLoading ? (
                        <div className="flex justify-center items-center mt-10">
                            <div className="w-12 h-12 border-t-4 border-white border-solid rounded-full animate-spin"></div>
                        </div>
                    ) : data && data.length > 0 ? (
                        data.map((campaign, index) => (
                            <div 
                                key={index}
                                className="transform transition-all duration-300 hover:scale-105"
                            >
                                <CampaignCard campaignAddress={campaign.campaignAddress} />
                            </div>
                        ))
                    ) : (
                        <p className="text-gray-400 text-lg col-span-full text-center">
                            No campaigns found. Start by creating one!
                        </p>
                    )}
                </div>
    
                {isModalOpen && <CreateCampaignModal setIsModalOpen={setIsModalOpen} />}
            </div>
        </main>
    );
    
}
    

type CreateCampaignModalProps = {
    setIsModalOpen: (value: boolean) => void;
};

const CreateCampaignModal = ({ setIsModalOpen }: CreateCampaignModalProps) => {
    const account = useActiveAccount();
    const [campaignName, setCampaignName] = useState<string>("");
    const [campaignDescription, setCampaignDescription] = useState<string>("");
    const [campaignGoal, setCampaignGoal] = useState<number>(1);
    const [campaignDeadline, setCampaignDeadline] = useState<number>(1);
    const [isDeployingContract, setIsDeployingContract] = useState<boolean>(false);

    const handleDeployContract = async () => {
        setIsDeployingContract(true);
        try {
            console.log("Creating Campaign...");
            await deployPublishedContract({
                client: client,
                chain: sepolia,
                account: account!,
                contractId: "Crowdfunding",
                contractParams: {
                    name: campaignName,
                    description: campaignDescription,
                    goal: campaignGoal,
                    _durationInDays: campaignDeadline,
                },
                publisher: "0xF96aa2C0D285a519d07f35ff471107053847C70e",
                version: "1.0.0",
            });
            alert("Campaign created successfully!");
        } catch (error) {
            console.error(error);
        } finally {
            setIsDeployingContract(false);
            setIsModalOpen(false);
        }
    };

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm">
            <div className="w-full max-w-lg bg-white p-6 rounded-xl shadow-2xl transform transition-all scale-105">
                <div className="flex justify-between items-center mb-5">
                    <h2 className="text-lg font-bold text-gray-900">Create a New Campaign</h2>
                    <button
                        className="text-gray-500 hover:text-gray-700 transition"
                        onClick={() => setIsModalOpen(false)}
                    >
                        ✕
                    </button>
                </div>
                <div className="flex flex-col space-y-4">
                    <div>
                        <label className="text-gray-600 text-sm">Campaign Name</label>
                        <input
                            type="text"
                            value={campaignName}
                            onChange={(e) => setCampaignName(e.target.value)}
                            placeholder="Enter campaign name"
                            className="w-full px-4 py-2 mt-1 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-400"
                        />
                    </div>
                    <div>
                        <label className="text-gray-600 text-sm">Description</label>
                        <textarea
                            value={campaignDescription}
                            onChange={(e) => setCampaignDescription(e.target.value)}
                            placeholder="Describe your campaign"
                            className="w-full px-4 py-2 mt-1 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-400 resize-none"
                            rows={3}
                        ></textarea>
                    </div>
                    <div>
                        <label className="text-gray-600 text-sm">Goal Amount</label>
                        <input
                            type="number"
                            value={campaignGoal}
                            onChange={(e) => setCampaignGoal(Math.max(1, parseInt(e.target.value) || 1))}
                            className="w-full px-4 py-2 mt-1 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-400"
                        />
                    </div>
                    <div>
                        <label className="text-gray-600 text-sm">Campaign Length (Days)</label>
                        <input
                            type="number"
                            value={campaignDeadline}
                            onChange={(e) => setCampaignDeadline(Math.max(1, parseInt(e.target.value) || 1))}
                            className="w-full px-4 py-2 mt-1 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-400"
                        />
                    </div>
                    <button
                        className="w-full py-3 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-700 transition-all"
                        onClick={handleDeployContract}
                        disabled={isDeployingContract}
                    >
                        {isDeployingContract ? "Creating..." : "Create Campaign"}
                    </button>
                </div>
            </div>
        </div>
    );
};
