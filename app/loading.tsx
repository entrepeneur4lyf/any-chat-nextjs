import { Loader2 } from "lucide-react";

const Loading = () => {
  return (
    <div className="flex flex-col items-center p-10 h-screen">
      <Loader2 className="animate-spin" />
    </div>
  );
};

export default Loading;
