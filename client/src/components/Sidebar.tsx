"use client";

import { useAppContext } from "@/context/AppContext";
import { LogOut, MessageSquare, PanelRightOpen, Plus } from "lucide-react";
import { useState } from "react";

export const Sidebar = () => {
  const [activeTab, setActiveTab] = useState<number | null>(0);
  const { sidebarOpen, toggleSidebar } = useAppContext();

  const tabs = [
    "Understanding Arrays in JavaScript",
    "React Hooks Explained",
    "CSS Grid vs Flexbox",
    "TypeScript Best Practices",
    "API Integration Guide",
    "Node.js Performance Tips",
    "Database Design Patterns",
    "Authentication Methods",
    "State Management Solutions",
    "Testing Strategies",
    "Deployment Workflows",
    "Security Best Practices",
    "Code Review Process",
    "Git Workflow Tips",
    "Performance Optimization",
  ];

  return (
    <aside
      className={`fixed z-50 transform ${sidebarOpen ? "translate-x-0" : "-translate-x-full"} transition lg:translate-0 lg:static lg:col-span-2 border-r border-gray-800 shadow overflow-y-auto h-full flex flex-col bg-zinc-900 text-white`}
    >
      <div className="p-4 border-b border-zinc-800 flex items-center justify-between gap-4">
        <h1 className="text-xl font-bold ">DSA Agent</h1>
        <button onClick={toggleSidebar} className="lg:hidden">
          <PanelRightOpen className="w-6 h-6" />
        </button>
      </div>

      <div className="p-2 border-b border-zinc-800">
        <button className="flex items-center justify-center gap-2 bg-zinc-800 w-full py-2.5 rounded-lg hover:bg-zinc-700 transition cursor-pointer">
          <Plus className="w-5 h-5" />
          <span className="text-sm font-semibold">New Chat</span>
        </button>
      </div>

      <div className="flex-1 overflow-y-auto px-2 py-2">
        <div className="flex flex-col gap-1">
          {tabs.map((tab, index) => (
            <button
              key={index}
              onClick={() => setActiveTab(index)}
              className={`group relative text-left text-sm font-medium py-2.5 px-3 rounded-lg transition-all duration-200 ${
                activeTab === index ? "bg-zinc-800 text-white" : "text-zinc-400 hover:bg-zinc-800/50 hover:text-white"
              }`}
            >
              <div className="flex items-center gap-2">
                <MessageSquare className="w-4 h-4" />
                <span className="truncate flex-1">{tab}</span>
              </div>
            </button>
          ))}
        </div>
      </div>

      <div className="p-4 border-t border-zinc-800 space-y-2">
        <button className="flex items-center justify-center gap-2 bg-red-600 w-full py-2 rounded-lg hover:bg-red-700 transition cursor-pointer">
          <LogOut className="w-4 h-4" />
          <span className="text-sm font-semibold">Logout</span>
        </button>
      </div>
    </aside>
  );
};
