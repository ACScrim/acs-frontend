interface RankInfo {
  class: string;
  color: string;
}

// Table de correspondances entre les rangs et leurs classes CSS
const rankMappings: Record<string, RankInfo> = {
  // Rangs génériques par métal/pierre précieuse
  iron: { class: "text-gray-400", color: "#9ca3af" },
  fer: { class: "text-gray-400", color: "#9ca3af" },
  bronze: { class: "text-amber-700", color: "#b45309" },
  silver: { class: "text-gray-300", color: "#d1d5db" },
  argent: { class: "text-gray-300", color: "#d1d5db" },
  gold: { class: "text-yellow-400", color: "#facc15" },
  or: { class: "text-yellow-400", color: "#facc15" },
  platinum: { class: "text-blue-200", color: "#bfdbfe" },
  platine: { class: "text-blue-200", color: "#bfdbfe" },
  diamond: { class: "text-cyan-400", color: "#22d3ee" },
  diamant: { class: "text-cyan-400", color: "#22d3ee" },
  master: { class: "text-purple-400", color: "#c084fc" },
  maître: { class: "text-purple-400", color: "#c084fc" },
  grandmaster: { class: "text-red-500", color: "#ef4444" },
  "grand maître": { class: "text-red-500", color: "#ef4444" },
  challenger: { class: "text-yellow-300", color: "#fde047" },
  challengeur: { class: "text-yellow-300", color: "#fde047" },
  immortal: { class: "text-pink-500", color: "#ec4899" },
  immortel: { class: "text-pink-500", color: "#ec4899" },
  radiant: { class: "text-yellow-200", color: "#fef08a" },
  radieux: { class: "text-yellow-200", color: "#fef08a" },
  legend: { class: "text-orange-400", color: "#fb923c" },
  légende: { class: "text-orange-400", color: "#fb923c" },
  champion: { class: "text-purple-500", color: "#a855f7" },
  emerald: { class: "text-emerald-400", color: "#34d399" },
  émeraude: { class: "text-emerald-400", color: "#34d399" },
  emeraude: { class: "text-emerald-400", color: "#34d399" },
  ruby: { class: "text-red-400", color: "#f87171" },
  rubis: { class: "text-red-400", color: "#f87171" },
  sapphire: { class: "text-blue-500", color: "#3b82f6" },
  saphir: { class: "text-blue-500", color: "#3b82f6" },

  // Rangs spécifiques pour des jeux populaires
  ascendant: { class: "text-green-500", color: "#22c55e" },
  divine: { class: "text-purple-300", color: "#d8b4fe" },
  supreme: { class: "text-indigo-500", color: "#6366f1" },
  global: { class: "text-red-600", color: "#dc2626" },
};

/**
 * Récupère les informations sur la classe CSS à appliquer pour un rang de jeu
 * @param rank - Le rang du joueur à analyser
 * @returns Un objet avec la classe CSS correspondante
 */
export function getRankInfo(rank: string): RankInfo {
  if (!rank) return { class: "text-yellow-300", color: "#fde047" }; // Valeur par défaut

  const rankLower = rank.toLowerCase();

  // Rechercher une correspondance dans la table
  for (const [key, info] of Object.entries(rankMappings)) {
    if (rankLower.includes(key)) {
      return info;
    }
  }

  return { class: "text-yellow-300", color: "#fde047" }; // Valeur par défaut
}

/**
 * Récupère la classe CSS à appliquer pour un rang de jeu
 * @param rank - Le rang du joueur à analyser
 * @returns La classe CSS correspondante
 */
export function getRankClass(rank: string): string {
  return getRankInfo(rank).class;
}

/**
 * Récupère la couleur hexadécimale pour un rang de jeu
 * @param rank - Le rang du joueur à analyser
 * @returns La couleur hexadécimale correspondante
 */
export function getRankColor(rank: string): string {
  return getRankInfo(rank).color;
}
