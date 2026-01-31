"use client";

import { useAppContext } from "@/context/AppContext";
import { PanelRightClose } from "lucide-react";

export const Header = () => {
    const { toggleSidebar } = useAppContext()

  return (
    <div className="flex items-center gap-4 lg:hidden py-4 px-4">
      <button onClick={toggleSidebar}>
        <PanelRightClose className="w-6 h-6" />
      </button>
      <h1 className="text-lg font-bold">DSA Agent</h1>
    </div>
  );
};
