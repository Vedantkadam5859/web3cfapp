'use client';
import { client } from "@/app/client";
import  TierCard from "@/app/components/TierCard";
import { getContract, prepareContractCall, ThirdwebContract } from "thirdweb";
import { sepolia } from "thirdweb/chains";
import { useParams } from "next/navigation";
import { useState } from "react";
import { lightTheme, TransactionButton, useActiveAccount, useReadContract } from "thirdweb/react";

export default function CampaignPage() {
    const account = useActiveAccount();
    const { campaignAddress } = useParams();
    const [isEditing, setIsEditing] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const contract = getContract({
        client: client,
        chain: sepolia,
        address: campaignAddress as string,
    });

    const { data: name, isLoading: isLoadingName } = useReadContract({
        contract: contract,
        method: "function name() view returns (string)",
        params: [],
    });

    const { data: description } = useReadContract({ 
        contract, 
        method: "function description() view returns (string)", 
        params: [] 
      });

    
    const { data: deadline, isLoading: isLoadingDeadline } = useReadContract({
        contract: contract,
        method: "function deadline() view returns (uint256)",
        params: [],
    });

    const deadlineDate = new Date(parseInt(deadline?.toString() as string) * 1000);
    const deadlineDatePassed = deadlineDate < new Date();

    const { data: goal, isLoading: isLoadingGoal } = useReadContract({
        contract: contract,
        method: "function goal() view returns (uint256)",
        params: [],
    });
    
    const { data: balance, isLoading: isLoadingBalance } = useReadContract({
        contract: contract,
        method: "function getContractBalance() view returns (uint256)",
        params: [],
    });

    
    const totalBalance = balance?.toString();
    const totalGoal = goal?.toString();
    let balancePercentage = (parseInt(totalBalance as string) / parseInt(totalGoal as string)) * 100;

    if (balancePercentage >= 100) {
        balancePercentage = 100;
    }

    const { data: tiers, isLoading: isLoadingTiers } = useReadContract({
        contract: contract,
        method: "function getTiers() view returns ((string name, uint256 amount, uint256 backers)[])",
        params: [],
    });

    const { data: owner, isLoading: isLoadingOwner } = useReadContract({
        contract: contract,
        method: "function owner() view returns (address)",
        params: [],
    });

    const { data: status } = useReadContract({ 
        contract, 
        method: "function state() view returns (uint8)", 
        params: [] 
      });

      return (
        <main className="min-h-screen w-full bg-gradient-to-r from-blue-900 via-gray-800 to-gray-900 px-6 sm:px-12 lg:px-24 py-12 relative">
            <div className="mx-auto max-w-7xl px-4 mt-6 sm:px-6 lg:px-8 bg-[#1C294A] backdrop-blur-lg shadow-2xl rounded-2xl p-8 border border-white/20">
                <div className="flex flex-row justify-between items-center border-b pb-4 border-gray-400/30">
                    {!isLoadingName && (
                        <p className="text-3xl font-bold text-white">{name}</p>
                    )}
                    {owner === account?.address && (
                        <button
                            className="px-4 py-2 bg-blue-600 text-white rounded-lg shadow-md hover:scale-105 transition-transform"
                            onClick={() => setIsEditing(!isEditing)}
                        >
                            {isEditing ? "Done" : "Edit"}
                        </button>
                    )}
                </div>
    
                {/* Description Section */}
                <div className="my-6">
                    <p className="text-lg font-bold text-white">Description:</p>
                    <p className="text-gray-200 font-semibold">{description}</p>
                </div>
    
                <div className="mb-6">
                    <p className="text-lg font-bold text-white">Deadline:</p>
                    {!isLoadingDeadline && (
                        <p className="text-gray-200 font-semibold">{deadlineDate.toDateString()}</p>
                    )}
                </div>
    
                {!isLoadingBalance && !isLoadingGoal && (
                    <div className="mb-6">
                        <p className="text-lg font-semibold text-white">Campaign Goal: ${goal?.toString()}</p>
                        <div className="relative w-full h-6 bg-gray-700 rounded-full">
                            <div
                                className="h-6 bg-green-500 rounded-full text-right px-2"
                                style={{ width: `${balancePercentage?.toString()}%` }}
                            >
                                <p className="text-white text-xs font-semibold">${balance?.toString()}</p>
                            </div>
                            <p className="absolute top-0 right-0 text-xs font-semibold text-gray-300 p-1">
                                {balancePercentage >= 100 ? "" : `${balancePercentage?.toString()}%`}
                            </p>
                        </div>
                    </div>
                )}
    
                <div>
                    <p className="text-lg font-semibold text-white">Tiers:</p>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-4">
                        {isLoadingTiers ? (
                            <p className="text-gray-200">Loading...</p>
                        ) : (
                            tiers && tiers.length > 0 ? (
                                tiers.map((tier, index) => (
                                    <div key={index} className="transform transition-all duration-300 hover:scale-105">
                                        <TierCard tier={tier} index={index} contract={contract} isEditing={isEditing} />
                                    </div>
                                ))
                            ) : (
                                !isEditing && <p className="text-gray-200">No tiers available</p>
                            )
                        )}
                        {isEditing && (
                            <button
                                className="max-w-sm flex flex-col text-center justify-center items-center font-semibold p-6 bg-blue-500 text-white border border-gray-200 rounded-lg shadow-md hover:scale-105 transition-transform"
                                onClick={() => setIsModalOpen(true)}
                            >
                                + Add Tier
                            </button>
                        )}
                    </div>
                </div>
    
                {isModalOpen && (
                    <CreateCampaignModal setIsModalOpen={setIsModalOpen} contract={contract} />
                )}
            </div>
        </main>
    );
    
}

type CreateTierModalProps = {
    setIsModalOpen: (value: boolean) => void
    contract: ThirdwebContract
}

const CreateCampaignModal = (
    { setIsModalOpen, contract }: CreateTierModalProps
) => {
    const [tierName, setTierName] = useState<string>("");
    const [tierAmount, setTierAmount] = useState<bigint>(1n);

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center backdrop-blur-md">
            <div className="w-full max-w-md bg-white p-6 rounded-2xl shadow-lg">
                <div className="flex justify-between items-center mb-4">
                    <p className="text-xl font-semibold text-gray-800">Create a Funding Tier</p>
                    <button
                        className="text-sm px-3 py-1 bg-gray-700 text-white rounded-md hover:bg-gray-800 transition"
                        onClick={() => setIsModalOpen(false)}
                    >
                        Close
                    </button>
                </div>
                <div className="flex flex-col space-y-4">
                    <div>
                        <label className="text-gray-600 text-sm">Tier Name:</label>
                        <input 
                            type="text" 
                            value={tierName}
                            onChange={(e) => setTierName(e.target.value)}
                            placeholder="Enter tier name"
                            className="w-full px-4 py-2 mt-1 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                        />
                    </div>
                    <div>
                        <label className="text-gray-600 text-sm">Tier Cost:</label>
                        <input 
                            type="number"
                            value={parseInt(tierAmount.toString())}
                            onChange={(e) => setTierAmount(BigInt(e.target.value))}
                            className="w-full px-4 py-2 mt-1 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                        />
                    </div>
                    <TransactionButton
                        transaction={() => prepareContractCall({
                            contract: contract,
                            method: "function addTier(string _name, uint256 _amount)",
                            params: [tierName, tierAmount]
                        })}
                        onTransactionConfirmed={async () => {
                            alert("Tier added successfully!");
                            setIsModalOpen(false);
                        }}
                        onError={(error) => alert(`Error: ${error.message}`)}
                        theme={lightTheme()}
                        className="w-full py-2 bg-blue-500 text-white font-medium rounded-lg hover:bg-blue-600 transition"
                    >
                        Add Tier
                    </TransactionButton>
                </div>
            </div>
        </div>
    );
}