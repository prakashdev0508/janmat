import Image from "next/image";
import type { FavoriteLeader } from "../types";

type FavoritesPanelProps = {
  leaders: FavoriteLeader[];
};

export function FavoritesPanel({ leaders }: FavoritesPanelProps) {
  return (
    <section className="glass-card rounded-[32px] p-6">
      <h3 className="mb-4 text-lg font-bold text-slate-900">Favorite Leaders</h3>
      <div className="hide-scrollbar flex gap-4 overflow-x-auto pb-2">
        {leaders.map((leader) => (
          <article
            key={leader.id}
            className="min-w-[220px] rounded-2xl border border-slate-100 bg-white p-4"
          >
            <div className="mb-3 flex items-center gap-3">
              <Image
                src={leader.avatarUrl}
                alt={leader.name}
                width={44}
                height={44}
                className="h-11 w-11 rounded-xl bg-slate-50"
                unoptimized
              />
              <div>
                <p className="font-bold text-slate-900">{leader.name}</p>
                <p className="text-xs font-medium text-slate-500">{leader.role}</p>
              </div>
            </div>
            <p className="text-xs font-bold tracking-wider text-slate-400 uppercase">
              Popularity
            </p>
            <p className="text-lg font-bold text-teal-600">{leader.popularity}%</p>
          </article>
        ))}
      </div>
    </section>
  );
}
