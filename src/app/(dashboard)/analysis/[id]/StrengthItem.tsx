import { CheckCircle } from "lucide-react";

interface StrengthItemProps {
  strength: string;
}

export default function StrengthItem({ strength }: StrengthItemProps) {
  return (
    <div className="flex items-start gap-3 p-3 bg-cv-success/5 rounded-lg border border-cv-success/10">
      <CheckCircle className="w-5 h-5 text-cv-success mt-0.5 flex-shrink-0" />
      <span className="text-cv-text-secondary">{strength}</span>
    </div>
  );
}
