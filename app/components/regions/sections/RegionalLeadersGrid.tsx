import { LeaderResultCard } from "../LeaderResultCard";
import type { LeaderResult } from "../types";

export function RegionalLeadersGrid({ leaders }: { leaders: LeaderResult[] }) {
  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-2">
      {leaders.map((leader) => (
        <LeaderResultCard key={leader.id} leader={leader} />
      ))}
    </div>
  );
}
