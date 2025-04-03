import { prepareContractCall, ThirdwebContract } from "thirdweb";
import { TransactionButton } from "thirdweb/react";

type Tier = {
    name: string;
    amount: bigint;
    backers: bigint;
};

type TierCardProps = {
    tier: Tier;
    index: number;
    contract: ThirdwebContract;
    isEditing: boolean;
};

export default function TierCard({ tier, index, contract, isEditing }: TierCardProps) {
    return (
        <div className="max-w-sm flex flex-col justify-between p-6 bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl shadow-2xl transition-transform hover:scale-105 hover:shadow-xl">
            <div>
                <div className="flex flex-row justify-between items-center mb-3">
                    <p className="text-lg font-semibold text-white drop-shadow-md">{tier.name}</p>
                    <p className="text-lg font-semibold text-blue-400">${tier.amount.toString()}</p>
                </div>
                <p className="text-sm text-gray-300 font-medium">Total Backers: {tier.backers.toString()}</p>
            </div>
    
            <div className="flex flex-row justify-between items-center mt-4">
                <TransactionButton
                    transaction={() =>
                        prepareContractCall({
                            contract: contract,
                            method: "function fund(uint256 _tierIndex) payable",
                            params: [BigInt(index)],
                            value: tier.amount,
                        })
                    }
                    onTransactionConfirmed={async () => alert("Funded successfully!")}
                    className="px-4 py-2 text-sm font-medium text-white bg-blue-500 rounded-lg hover:bg-blue-600 transition focus:ring-2 focus:ring-blue-300 focus:outline-none"
                >
                    Select
                </TransactionButton>
    
                {isEditing && (
                    <TransactionButton
                        transaction={() =>
                            prepareContractCall({
                                contract: contract,
                                method: "function removeTier(uint256 _index)",
                                params: [BigInt(index)],
                            })
                        }
                        onError={(error) => alert(`Error: ${error.message}`)}
                        onTransactionConfirmed={async () => alert("Removed successfully!")}
                        className="px-4 py-2 text-sm font-medium text-white bg-red-500 rounded-lg hover:bg-red-600 transition focus:ring-2 focus:ring-red-300 focus:outline-none"
                    >
                        Remove
                    </TransactionButton>
                )}
            </div>
        </div>
    );
    
}
