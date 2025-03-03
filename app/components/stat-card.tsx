import { Users } from "lucide-react";

interface StatCardProps {
  title: string;
  value: number | string;
  icon?: React.ReactNode;
}

function StatCard({ title, value, icon }: StatCardProps) {
  return (
    <div className="flex flex-row px-4 py-5 gap-5 bg-white rounded-lg h-fit shadow-md">
      <div className="w-14 h-14 rounded-full bg-[#C8C3F4] flex justify-center items-center">
        {icon || <Users />}
      </div>
      <div className="flex flex-col">
        <div className="text-[#718EBF] text-lg">{title}</div>
        <div className="text-[#2D2D2D] text-xl font-bold">{value}</div>
      </div>
    </div>
  );
}

export default StatCard;
