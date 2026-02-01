export interface IAppContext {
  user: string | null;
  accessToken: string | null;
  refreshToken: string | null;
  sidebarOpen: boolean;
  messageTabs: ITab[];
  selectTabContent: IContent[];
  activeTab: string | null, 
  setActiveTab: React.Dispatch<React.SetStateAction<string | null>>;
  login: (payload: { email: string; password: string }) => Promise<void>;
  register: (payload: {
    username: string;
    email: string;
    password: string;
  }) => Promise<void>;
  logout: () => Promise<void>;
  getUserTabs: () => Promise<void>;
  fetchMessageTabContent: (slug: string) => Promise<void>;
  createNewChatTab: () => Promise<void>;
  toggleSidebar: () => void;
}

export interface ILoginResponse {
  status: number;
  success: boolean;
  message: string;
  data: {
    _id: string;
    email: string;
    username: string;
    accessToken: string;
    refreshToken: string;
  };
}

export interface IRegisterResponse {
  status: number;
  success: boolean;
  message: string;
  data: {
    _id: string;
    username: string;
    email: string;
    createdAt: Date;
    updatedAt: Date;
    __v: 0;
  };
}

export interface ILogoutResponse {
  status: number;
  success: boolean;
  message: string;
}

export interface IContent {
  role: "user" | "model";
  text: string;
  _id: string;
}

export interface ITab {
  _id: string;
  title: string;
  userId: string;
  content: IContent[];
  createdAt: Date;
  updatedAt: Date;
}

export interface IMessageTabResponse {
  status: number;
  success: boolean;
  message: string;
  data: {
    tabs: ITab[];
  };
}

export interface IMessageContentResponse {
  status: number;
  success: boolean;
  message: string;
  data: {
    _id: string;
    title: string;
    userId: string;
    content: IContent[];
  };
}

export interface INewChatTabCreateResponse {
  status: number;
  success: boolean;
  message: string;
  data: {
    tab: {
      title: string;
      userId: string;
      content: [];
      _id: string;
      createdAt: Date;
      updatedAt: Date;
    };
  };
}
