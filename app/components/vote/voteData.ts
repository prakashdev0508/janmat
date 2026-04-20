import type { VotePageData } from "./types";

export const votePageData: VotePageData = {
  featuredLeader: {
    id: "modi",
    name: "Narendra Modi",
    role: "Prime Minister of India",
    party: "BJP",
    popularity: 72.8,
    avatarUrl: "https://api.dicebear.com/7.x/avataaars/svg?seed=Narendra",
  },
  voteWindow: {
    title: "100% Anonymous",
    description: "Your identity is never stored with your vote.",
    availabilityLabel: "Available to vote now",
  },
  trendingLeaders: [
    {
      id: "rahul",
      name: "Rahul Gandhi",
      role: "MP",
      party: "INC",
      popularity: 48.2,
      avatarUrl: "https://api.dicebear.com/7.x/avataaars/svg?seed=Rahul",
    },
    {
      id: "mamata",
      name: "Mamata Banerjee",
      role: "CM",
      party: "AITC",
      popularity: 52.4,
      avatarUrl: "https://api.dicebear.com/7.x/avataaars/svg?seed=Mamata",
    },
    {
      id: "kejriwal",
      name: "Arvind Kejriwal",
      role: "CM",
      party: "AAP",
      popularity: 61.8,
      avatarUrl: "https://api.dicebear.com/7.x/avataaars/svg?seed=Arvind",
    },
    {
      id: "yogi",
      name: "Yogi Adityanath",
      role: "CM",
      party: "BJP",
      popularity: 78.4,
      avatarUrl: "https://api.dicebear.com/7.x/avataaars/svg?seed=Yogi",
    },
  ],
};
