import { useState } from 'react';
import { ApiUsage } from '../../types/api-keys';

interface CurrentPlanProps {
  usage: ApiUsage;
}

export default function CurrentPlan({ usage }: CurrentPlanProps) {
  const [isPayAsYouGo, setIsPayAsYouGo] = useState(false);
  const usagePercentage = (usage.used / usage.total) * 100;

  return (
    <div className="mb-8 rounded-lg overflow-hidden bg-gradient-to-r from-rose-200 via-purple-200 to-blue-200 p-8">
      <div className="flex justify-between items-center mb-6">
        <div>
          <p className="text-gray-700 font-medium mb-2">CURRENT PLAN</p>
          <h1 className="text-4xl font-bold text-gray-800">Researcher</h1>
        </div>
        <button className="bg-white px-4 py-2 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors">
          Manage Plan
        </button>
      </div>

      <div className="space-y-4">
        <div>
          <div className="flex justify-between items-center mb-2">
            <p className="text-gray-700 font-medium">API Usage</p>
            <span className="text-gray-600">{usage.used} / {usage.total} Credits</span>
          </div>
          <div className="w-full bg-white/50 rounded-full h-2">
            <div 
              className="bg-blue-500 h-2 rounded-full" 
              style={{ width: `${usagePercentage}%` }}
            ></div>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <div className="relative inline-block w-10 mr-2 align-middle select-none">
            <input
              type="checkbox"
              checked={isPayAsYouGo}
              onChange={() => setIsPayAsYouGo(!isPayAsYouGo)}
              className="toggle-checkbox absolute block w-6 h-6 rounded-full bg-white border-4 appearance-none cursor-pointer"
            />
            <label className="toggle-label block overflow-hidden h-6 rounded-full bg-gray-300 cursor-pointer"></label>
          </div>
          <span className="text-gray-700">Pay as you go</span>
        </div>
      </div>
    </div>
  );
} 