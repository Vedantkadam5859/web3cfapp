'use client';
import { useReadContract } from "thirdweb/react";
import { client } from "./client";
import { sepolia } from "thirdweb/chains";
import { getContract } from "thirdweb";
import { CROWDFUNDING_FACTORY } from "./constants/contracts";
import CampaignCard from "./components/CampaignCard";

export default function Home() {
  const contract = getContract({
    client: client,
    chain: sepolia,
    address: CROWDFUNDING_FACTORY,
  });

  // Get all campaigns deployed with CrowdfundingFactory
  const { data: campaigns, isLoading } = useReadContract({
    contract,
    method: "function getAllCampaigns() view returns ((address campaignAddress, address owner, string name)[])",
    params: []
  });

  return (
    <main className="min-h-screen flex flex-col items-center bg-gradient-to-r from-blue-900 via-gray-800 to-gray-900 px-6 sm:px-12 lg:px-24 py-12 relative">
      
      {/* Title Positioned at the Top Center */}
      <h1 className="text-4xl font-extrabold text-white drop-shadow-lg absolute top-6 text-center">
        🚀 Active Campaigns
      </h1>
  
      {/* Adjusted margin to bring the campaign section upwards */}
      <div className="max-w-6xl w-full bg-white/10 backdrop-blur-lg shadow-2xl rounded-2xl p-8 border border-white/20 mt-16">
        
        {isLoading ? (
          <div className="flex justify-center items-center mt-10">
            <div className="w-12 h-12 border-t-4 border-white border-solid rounded-full animate-spin"></div>
          </div>
        ) : campaigns && campaigns.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {campaigns.map((campaign) => (
              <div 
                key={campaign.campaignAddress}
                className="transform transition-all duration-300 hover:scale-105"
              >
                <CampaignCard campaignAddress={campaign.campaignAddress} />
              </div>
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-300 mt-6">🚫 No active campaigns found.</p>
        )}
  
      </div>
    </main>
  );
  
  

}
