"use client";

import { axiosInstance } from "@/lib/axios";
import {
  AIGenResponse,
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
  const [chatId, setChatId] = useState<string | null>(() =>
    typeof window !== "undefined" ? localStorage.getItem("chat-id") : null,
  );
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const router = useRouter();

  // ---------------------- Feature for create new msg tab -----------------
  const createNewChatTab = useCallback(async () => {
    try {
      const { data } = await axiosInstance.post<INewChatTabCreateResponse>(
        "/message",
        null,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        },
      );

      if (data.success) {
        localStorage.setItem("chat-id", data.data.tab._id);
        setChatId(data.data.tab._id);
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
  }, [accessToken, router]);

  // ---------------------- Feature for fetch all user msg tab's -----------
  const getUserTabs = useCallback(async (): Promise<void> => {
    try {
      const { data } = await axiosInstance.get<IMessageTabResponse>(
        "/message",
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        },
      );
      if (data.success && data.data.tabs.length > 0) {
        localStorage.setItem("chat-id", data.data.tabs[0]._id);
        setChatId(data.data.tabs[0]._id);
        setMessageTabs(data.data.tabs);
        setActiveTab(data.data.tabs[0]._id);
      }
    } catch (error: unknown) {
      console.log(error);
      if (error instanceof AxiosError) {
        toast.error(error.response?.data?.message || "Failed fetch tabs");
      } else if (error instanceof Error) {
        toast.error(error.message);
      } else {
        toast.error("Something went wrong");
      }
    }
  }, [accessToken]);

  // ---------------------- Feature for user login -------------------------
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
          localStorage.setItem("accessToken", data.data.accessToken);
          localStorage.setItem("refreshToken", data.data.refreshToken);

          const tabs = await axiosInstance.get<IMessageTabResponse>(
            "/message",
            { 
              headers: {
                Authorization: `Bearer ${accessToken}`,
              },
            },
          );

          if (tabs.data.data.tabs && tabs.data.data.tabs?.length === 0) {
            await createNewChatTab();
            if (tabs.data.data.tabs[0]?._id) {
              setActiveTab(tabs.data.data.tabs[0]._id);
              router.replace(`/chat/${tabs.data.data.tabs[0]._id}`);
            }
          } else {
            router.replace(`/chat/${tabs.data.data.tabs[0]?._id}`);
          }
        }
      } catch (error: unknown) {
        console.log(error);
        if (error instanceof AxiosError) {
          toast.error(error.response?.data?.message || "Login failed");
        } else if (error instanceof Error) {
          toast.error(error.message);
        } else {
          toast.error("Something went wrong");
        }
      }
    },
    [createNewChatTab, router, accessToken],
  );

  // ---------------------- Feature for user register ----------------------
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

  // ---------------------- Feature for user logout ------------------------
  const logout = useCallback(async (): Promise<void> => {
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
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
        localStorage.removeItem("chat-id");
        router.replace("/login");
      }
    } catch (error: unknown) {
      console.log(error);
      if (error instanceof AxiosError) {
        toast.error(error.response?.data?.message || "Logout failed");
      } else if (error instanceof Error) {
        toast.error(error.message);
      } else {
        toast.error("Something went wrong");
      }
    }
  }, [accessToken, router]);

  // ---------------------- Feature for fetch selected msg tab content -----
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
        console.log(error);
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

  // ---------------------- Feature for sent prompt to LLM -----------------
  const sentMessageToAI = useCallback(
    async (prompt: string) => {
      setIsLoading(true);
      setSelectTabContent((prev) => [
        ...prev,
        { _id: Date.now().toString(), role: "user", text: prompt },
      ]);

      try {
        const { data } = await axiosInstance.patch<AIGenResponse>(
          `/message/${activeTab}`,
          { prompt },
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          },
        );

        if (data.success) {
          setIsLoading(false);
          setSelectTabContent((prev) => [
            ...prev,
            { _id: Date.now().toString(), ...data.data },
          ]);
        }
      } catch (error: unknown) {
        if (error instanceof AxiosError) {
          toast.error(
            error.response?.data?.message || "Oops please try again!",
          );
        } else if (error instanceof Error) {
          toast.error(error.message);
        } else {
          toast.error("Something went wrong");
        }
      }
    },
    [accessToken, activeTab],
  );

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

  return (
    <AuthContext.Provider
      value={{
        accessToken,
        refreshToken,
        sidebarOpen,
        messageTabs,
        selectTabContent,
        activeTab,
        isLoading,
        chatId,
        setActiveTab,
        fetchMessageTabContent,
        toggleSidebar,
        login,
        register,
        logout,
        getUserTabs,
        createNewChatTab,
        sentMessageToAI,
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
