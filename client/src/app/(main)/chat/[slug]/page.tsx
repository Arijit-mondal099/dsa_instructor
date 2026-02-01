import { Header } from "@/components/Header";
import { Input } from "@/components/Input";
import { MessageContainer } from "@/components/MessageContainer";

interface HomePageProps {
  params: Promise<{ slug: string }>;
}

const HomePage: React.FC<HomePageProps> = async ({ params }) => {

  return (
    <div className="h-full flex flex-col">
      <Header />

      {/* Messages Container - Scrollable */}
      <div className="flex-1 overflow-y-auto px-6 pt-6">
        <div className="flex flex-col gap-6 max-w-3xl mx-auto w-full pb-6">
          <MessageContainer params={params} />
        </div>
      </div>

      {/* Input Area - Fixed at bottom */}
      <div className="shrink-0">
        <Input />
      </div>
    </div>
  );
};

export default HomePage;
