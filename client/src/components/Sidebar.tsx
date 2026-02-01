"use client";

import { useAppContext } from "@/context/AppContext";
import { LogOut, MessageSquare, PanelRightOpen, Plus } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export const Sidebar = () => {
  const { sidebarOpen, toggleSidebar, logout, getUserTabs, messageTabs, createNewChatTab, selectTabContent, activeTab, setActiveTab } = useAppContext();
  const router = useRouter();

  const handleCreateNewTab = () => {
    if (selectTabContent.length && messageTabs[0].content.length) {
      createNewChatTab();
    } else {
      router.push(`/chat/${messageTabs[0]._id}`);
      setActiveTab(messageTabs[0]._id)
    }
  }

  useEffect(() => {
    getUserTabs();
  }, [getUserTabs]);

  useEffect(() => {
    if (messageTabs.length && !activeTab) setActiveTab(messageTabs[0]._id);
  }, [messageTabs, activeTab, setActiveTab]);

  return (
    <aside
      className={`fixed z-50 transform ${sidebarOpen ? "translate-x-0" : "-translate-x-full"} transition w-64 lg:w-full lg:translate-0 lg:static lg:col-span-2 border-r border-gray-800 shadow overflow-y-auto h-full flex flex-col bg-zinc-900 text-white`}
    >
      <div className="p-4 border-b border-zinc-800 flex items-center justify-between gap-4">
        <h1 className="text-xl font-bold ">DSA Agent</h1>
        <button onClick={toggleSidebar} className="lg:hidden">
          <PanelRightOpen className="w-6 h-6" />
        </button>
      </div>

      <div className="p-2 border-b border-zinc-800">
        <button 
          className="flex items-center justify-center gap-2 bg-zinc-800 w-full py-2.5 rounded-lg hover:bg-zinc-700 transition cursor-pointer"
          onClick={handleCreateNewTab}
        >
          <Plus className="w-5 h-5" />
          <span className="text-sm font-semibold">New Chat</span>
        </button>
      </div>

      <div className="flex-1 overflow-y-auto px-2 py-2">
        <div className="flex flex-col gap-1">
          {messageTabs.map((tab) => (
            <button
              key={tab._id}
              onClick={() => {
                setActiveTab(tab._id);
                router.push(`/chat/${tab._id}`);
              }}
              className={`group relative text-left text-sm font-medium py-2.5 px-3 rounded-lg transition-all duration-200 cursor-pointer ${
                activeTab === tab._id
                  ? "bg-zinc-800 text-white"
                  : "text-zinc-400 hover:bg-zinc-800/50 hover:text-white"
              }`}
            >
              <div className="flex items-center gap-2">
                <MessageSquare className="w-4 h-4" />
                <span className="truncate flex-1">
                  {tab.content[0]?.text || "New Chat"}
                </span>
              </div>
            </button>
          ))}
        </div>
      </div>

      <div className="p-4 border-t border-zinc-800 space-y-2">
        <button
          className="flex items-center justify-center gap-2 bg-red-600 w-full py-2 rounded-lg hover:bg-red-700 transition cursor-pointer"
          onClick={logout}
        >
          <LogOut className="w-4 h-4" />
          <span className="text-sm font-semibold">Logout</span>
        </button>
      </div>
    </aside>
  );
};
