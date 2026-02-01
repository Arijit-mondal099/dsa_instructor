"use client";

import { axiosInstance } from "@/lib/axios";
import {
  IAppContext,
  IContent,
  ILoginResponse,
  ILogoutResponse,
  IMessageContentResponse,
  IMessageTabResponse,
  INewChatTabCreateResponse,
  IRegisterResponse,
  ITab,
} from "@/type";
import { AxiosError } from "axios";
import { useRouter } from "next/navigation";
import { createContext, useCallback, useContext, useState } from "react";
import { toast } from "sonner";

const AuthContext = createContext<IAppContext | undefined>(undefined);

export function AppContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [user, setUser] = useState<string | null>(null);
  const [accessToken, setAccessToken] = useState<string | null>(() =>
    typeof window !== "undefined" ? localStorage.getItem("accessToken") : null,
  );
  const [refreshToken, setRefreshToken] = useState<string | null>(() =>
    typeof window !== "undefined" ? localStorage.getItem("refreshToken") : null,
  );
  const [sidebarOpen, setSidebarOpen] = useState<boolean>(false);
  const [messageTabs, setMessageTabs] = useState<ITab[]>([]);
  const [selectTabContent, setSelectTabContent] = useState<IContent[]>([]);
  const [activeTab, setActiveTab] = useState<string | null>(null);
  const router = useRouter();

  const login = useCallback(
    async (payload: { email: string; password: string }): Promise<void> => {
      try {
        const { data } = await axiosInstance.post<ILoginResponse>(
          "/auth/login",
          payload,
        );

        if (data.success) {
          setAccessToken(data.data.accessToken);
          setRefreshToken(data.data.refreshToken);
          setUser(data.data.username);
          localStorage.setItem("accessToken", data.data.accessToken);
          localStorage.setItem("refreshToken", data.data.refreshToken);
          toast.success(data.message);
        }
      } catch (error: unknown) {
        if (error instanceof AxiosError) {
          toast.error(error.response?.data?.message || "Login failed");
        } else if (error instanceof Error) {
          toast.error(error.message);
        } else {
          toast.error("Something went wrong");
        }
      }
    },
    [],
  );

  const register = useCallback(
    async (payload: {
      username: string;
      email: string;
      password: string;
    }): Promise<void> => {
      try {
        const { data } = await axiosInstance.post<IRegisterResponse>(
          "/auth/register",
          payload,
        );
        if (data.success) {
          toast.success(data.message);
        }
      } catch (error: unknown) {
        if (error instanceof AxiosError) {
          toast.error(error.response?.data?.message || "Register failed");
        } else if (error instanceof Error) {
          toast.error(error.message);
        } else {
          toast.error("Something went wrong");
        }
      }
    },
    [],
  );

  const logout = useCallback(
    async (): Promise<void> => {
      try {
        const { data } = await axiosInstance.post<ILogoutResponse>(
          "/auth/logout",
          null,
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          },
        );
        if (data.success) {
          setAccessToken(null);
          setRefreshToken(null);
          setUser(null);
          localStorage.removeItem("accessToken");
          localStorage.removeItem("refreshToken");
        }
      } catch (error: unknown) {
        if (error instanceof AxiosError) {
          toast.error(error.response?.data?.message || "Logout failed");
        } else if (error instanceof Error) {
          toast.error(error.message);
        } else {
          toast.error("Something went wrong");
        }
      }
    }, 
    [accessToken]
  );

  const getUserTabs = useCallback(
    async (): Promise<void> => {
      try {
        const { data } = await axiosInstance.get<IMessageTabResponse>(
          "/message",
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          },
        );
        if (data.success) {
          setMessageTabs(data.data.tabs);
          setActiveTab(data.data.tabs[0]._id);
        }
      } catch (error: unknown) {
        if (error instanceof AxiosError) {
          toast.error(error.response?.data?.message || "Failed fetch tabs");
        } else if (error instanceof Error) {
          toast.error(error.message);
        } else {
          toast.error("Something went wrong");
        }
      }
    }, 
    [accessToken]
  );

  const fetchMessageTabContent = useCallback(
    async (slug: string): Promise<void> => {
      try {
        const { data } = await axiosInstance.get<IMessageContentResponse>(
          `/message/${slug}`,
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          },
        );

        if (data.success) {
          setSelectTabContent(data.data.content);
        }
      } catch (error) {
        if (error instanceof AxiosError) {
          toast.error(
            error.response?.data?.message || "Failed fetch tab content",
          );
        } else if (error instanceof Error) {
          toast.error(error.message);
        } else {
          toast.error("Something went wrong");
        }
      }
    },
    [accessToken],
  );

  const createNewChatTab = useCallback(
    async () => {
      try {
        const { data } = await axiosInstance.post<INewChatTabCreateResponse>(
          "/message", 
          null,
          {
            headers: {
              Authorization: `Bearer ${accessToken}`
            }
          }
        );

        if (data.success) {
          setMessageTabs((prev) => [data.data.tab, ...prev]);
          setActiveTab(data.data.tab._id);
          router.push(`/chat/${data.data.tab._id}`);
        }
      } catch (error: unknown) {
        if (error instanceof AxiosError) {
          toast.error(
            error.response?.data?.message || "Failed fetch tab content",
          );
        } else if (error instanceof Error) {
          toast.error(error.message);
        } else {
          toast.error("Something went wrong");
        }
      }
    },
    [accessToken, router]
  )

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

  return (
    <AuthContext.Provider
      value={{
        user,
        accessToken,
        refreshToken,
        sidebarOpen,
        messageTabs,
        selectTabContent,
        activeTab, 
        setActiveTab,
        fetchMessageTabContent,
        toggleSidebar,
        login,
        register,
        logout,
        getUserTabs,
        createNewChatTab
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAppContext() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used inside AuthProvider");
  }
  return context;
}
