import type { LucideIcon } from "lucide-react";
import { cn } from "../lib/cn";

interface StatCardProps {
  title: string;
  value: number | string;
  icon: LucideIcon;
  colorClass: string;
}

export const StatCard = ({
  title,
  value,
  icon: Icon,
  colorClass,
}: StatCardProps) => {
  return (
    <div className="card-titanium flex items-center gap-5">
      <div className={cn("p-4 rounded-2xl", colorClass)}>
        <Icon size={28} className="text-white" />
      </div>
      <div>
        <p className="text-slate-500 text-sm font-medium">{title}</p>
        <h3 className="text-3xl font-bold text-slate-800">{value}</h3>
      </div>
    </div>
  );
};
