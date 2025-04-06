import React from "react";
import { LineChart, Globe } from "lucide-react";

const Sidebar = () => {
  return (
    <aside className="pt-4 text-base space-y-8 text-center">
      {/* Popular & Trending */}
      <div className="space-y-2">
        <h3 className="flex items-center gap-2 font-semibold justify-center">
          <LineChart size={16} />
          Popular
        </h3>
        <h3 className="flex items-center gap-2 font-semibold justify-center">
          <Globe size={16} />
          Trending
        </h3>
      </div>

      <hr className="border-gray-600" />

      {/* Recent Communities */}
      <div>
        <h4 className="font-semibold mb-2">Recent Communities</h4>
        <ul className="space-y-1 text-blue-300">
          <li>O/StableDiffusion</li>
          <li>O/announcements</li>
        </ul>
      </div>

      <hr className="border-gray-600" />

      {/* Your Communities */}
      <div>
        <h4 className="font-semibold mb-2">Your Communities</h4>
        <ul className="space-y-1 text-blue-300">
          <li>O/PositiveAffirmation</li>
          <li>O/InspiringStories</li>
          <li>O/SelfImprovementAndGrowth</li>
          <li>O/Mindfullness</li>
          <li>O/Meditation</li>
          <li>O/Gratitude</li>
        </ul>
      </div>
    </aside>
  );
};

export default Sidebar;
