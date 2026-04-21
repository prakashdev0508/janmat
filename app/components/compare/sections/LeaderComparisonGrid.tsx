import type { ComparedLeader } from "../types";
import { LeaderComparisonColumn } from "./LeaderComparisonColumn";

type LeaderComparisonGridProps = {
  leaders: ComparedLeader[];
};

export function LeaderComparisonGrid({ leaders }: LeaderComparisonGridProps) {
  return (
    <section className="px-6 pb-12">
      <div className="mx-auto max-w-7xl">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
          {leaders.map((leader) => (
            <LeaderComparisonColumn key={leader.id} leader={leader} />
          ))}
        </div>
      </div>
    </section>
  );
}
