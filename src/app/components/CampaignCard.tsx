import { getContract } from "thirdweb";
import { client } from "@/app/client";
import { sepolia } from "thirdweb/chains";
import { useReadContract } from "thirdweb/react";
import Link from "next/link";

type CampaignCardProps = {
    campaignAddress: string;
};

export default function CampaignCard({ campaignAddress }: CampaignCardProps) {
    const contract = getContract({
        client: client,
        chain: sepolia,
        address: campaignAddress,
    });

    const { data: campaignName } = useReadContract({
        contract,
        method: "function name() view returns (string)",
        params: []
    });

    const { data: campaignDescription } = useReadContract({
        contract,
        method: "function description() view returns (string)",
        params: []
    });

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

    return (
        <div className="flex flex-col justify-between h-full p-6 bg-[#1E2A47] border border-gray-600 rounded-xl shadow-lg transition hover:shadow-xl">
            <div className="flex-grow">
                {!isLoadingBalance && !isLoadingGoal && (
                    <div className="mb-4">
                        <div className="relative w-full h-7 bg-gray-500 rounded-full overflow-hidden">
                            <div
                                className="h-7 bg-gradient-to-r from-blue-500 to-blue-700 text-sm font-semibold text-white flex items-center justify-end pr-2"
                                style={{ width: `${balancePercentage?.toFixed(2)}%` }}
                            />
                        </div>
                        {balancePercentage < 100 && (
                            <p className="mt-1 text-base text-gray-300 font-medium text-right">
                                {balancePercentage?.toFixed(2)}% funded
                            </p>
                        )}
                    </div>
                )}
                <h5 className="mb-2 text-2xl font-semibold text-white">
                    {campaignName || "Loading campaign..."}
                </h5>
                <p className="mb-3 text-base text-gray-300">
                    {campaignDescription || "Fetching details..."}
                </p>
            </div>
            <Link href={`/campaign/${campaignAddress}`} passHref>
                <p className="mt-auto inline-flex items-center justify-center px-5 py-3 text-base font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition focus:ring-2 focus:ring-blue-300 focus:outline-none">
                    View Campaign
                    <svg className="ml-2 w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 5h12m0 0L9 1m4 4L9 9"/>
                    </svg>
                </p>
            </Link>
        </div>
    );
}
