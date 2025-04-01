import { defineStore } from "pinia";
import { ref, computed } from "vue";
import tournamentService from "../services/tournamentService";
import playerService from "../services/playerService";
import type { Tournament } from "../types";

export const useTournamentStore = defineStore("tournaments", () => {
  // État de base
  const tournaments = ref<Tournament[]>([]);
  const tournamentDetails = ref<{ [key: string]: Tournament }>({});
  const checkedInPlayers = ref<{ [key: string]: boolean }>({});
  const loading = ref(false);
  const lastFetchTime = ref<number | null>(null);
  const lastDetailsFetchTime = ref<{ [key: string]: number }>({});

  // Vérification si les données doivent être rafraîchies (5 minutes de cache)
  const shouldRefreshData = computed(() => {
    if (!lastFetchTime.value) return true;
    return Date.now() - lastFetchTime.value > 300000; // 5 minutes
  });

  /**
   * Récupère tous les tournois avec mise en cache
   * @param userId ID de l'utilisateur connecté (pour vérifier les check-ins)
   * @param forceRefresh Force le rafraîchissement même si le cache est valide
   */
  const fetchTournaments = async (userId?: string, forceRefresh = false) => {
    // Si données en cache et non forcé, utiliser le cache
    if (
      !forceRefresh &&
      tournaments.value.length > 0 &&
      !shouldRefreshData.value
    ) {
      // Toujours vérifier les check-ins si un utilisateur est connecté
      if (userId) {
        await checkUserCheckIns(userId);
      }
      return tournaments.value;
    }

    loading.value = true;

    try {
      // Récupération des tournois
      tournaments.value = await tournamentService.getTournaments();

      // Vérification des check-ins si un utilisateur est connecté
      if (userId) {
        await checkUserCheckIns(userId);
      }

      // Mise à jour du temps de cache
      lastFetchTime.value = Date.now();
      saveToLocalStorage();

      return tournaments.value;
    } catch (err) {
      console.error("Erreur lors du chargement des tournois:", err);
      // En cas d'erreur, tenter de récupérer depuis le localStorage
      loadFromLocalStorage();
      return tournaments.value;
    } finally {
      loading.value = false;
    }
  };

  /**
   * Récupère les détails d'un tournoi spécifique avec mise en cache
   * @param tournamentId ID du tournoi
   * @param forceRefresh Force le rafraîchissement même si le cache est valide
   */
  const fetchTournamentById = async (
    tournamentId: string,
    forceRefresh = false
  ) => {
    // Vérifier si les données sont déjà en cache et récentes
    const cachedTime = lastDetailsFetchTime.value[tournamentId];
    const isCacheValid = cachedTime && Date.now() - cachedTime < 300000;

    if (
      !forceRefresh &&
      tournamentDetails.value[tournamentId] &&
      isCacheValid
    ) {
      return tournamentDetails.value[tournamentId];
    }

    loading.value = true;

    try {
      // Récupération des détails du tournoi
      const data = await tournamentService.getTournamentById(tournamentId);

      // Mise en cache des données
      tournamentDetails.value[tournamentId] = data;
      lastDetailsFetchTime.value[tournamentId] = Date.now();

      saveToLocalStorage();
      return data;
    } catch (err) {
      console.error(
        `Erreur lors du chargement du tournoi ${tournamentId}:`,
        err
      );
      return null;
    } finally {
      loading.value = false;
    }
  };

  /**
   * Récupère les tournois pour un jeu spécifique
   * @param gameId ID du jeu
   */
  const fetchTournamentsByGame = async (gameId: string) => {
    loading.value = true;

    try {
      const tournamentsForGame = await tournamentService.getTournamentsByGame(
        gameId
      );

      // Mettre à jour le cache pour ces tournois
      tournamentsForGame.forEach((tournament) => {
        if (tournament._id) {
          tournamentDetails.value[tournament._id] = tournament;
          lastDetailsFetchTime.value[tournament._id] = Date.now();
        }
      });

      saveToLocalStorage();
      return tournamentsForGame;
    } catch (err) {
      console.error(
        `Erreur lors du chargement des tournois pour le jeu ${gameId}:`,
        err
      );
      return [];
    } finally {
      loading.value = false;
    }
  };

  /**
   * Vérifie les check-ins d'un utilisateur
   */
  const checkUserCheckIns = async (userId: string) => {
    try {
      const player = await playerService.getPlayerByIdUser(userId);
      if (player && player._id) {
        tournaments.value.forEach((tournament) => {
          if (tournament._id) {
            checkedInPlayers.value[tournament._id] =
              (tournament.checkIns &&
                player._id &&
                tournament.checkIns[player._id]) ||
              false;
          }
        });
      }
      saveToLocalStorage();
    } catch (err) {
      console.error("Erreur lors de la vérification des check-ins:", err);
    }
  };

  /**
   * Effectue l'inscription d'un joueur à un tournoi et met à jour le cache
   * @param tournamentId ID du tournoi
   * @param userId ID de l'utilisateur
   */
  const registerPlayer = async (tournamentId: string, userId: string) => {
    try {
      // Appel à l'API pour l'inscription
      await tournamentService.registerPlayer(tournamentId, userId);

      // Mettre à jour le tournoi dans le cache
      await updateTournamentInCache(tournamentId);

      return true;
    } catch (err) {
      console.error(
        `Erreur lors de l'inscription au tournoi ${tournamentId}:`,
        err
      );
      return false;
    }
  };

  /**
   * Effectue la désinscription d'un joueur d'un tournoi et met à jour le cache
   * @param tournamentId ID du tournoi
   * @param userId ID de l'utilisateur
   */
  const unregisterPlayer = async (tournamentId: string, userId: string) => {
    try {
      // Appel à l'API pour la désinscription
      await tournamentService.unregisterPlayer(tournamentId, userId);

      // Mettre à jour le tournoi dans le cache
      await updateTournamentInCache(tournamentId);

      return true;
    } catch (err) {
      console.error(
        `Erreur lors de la désinscription du tournoi ${tournamentId}:`,
        err
      );
      return false;
    }
  };

  /**
   * Met à jour le check-in d'un joueur et actualise le cache
   * @param tournamentId ID du tournoi
   * @param userId ID de l'utilisateur
   * @param checkedIn Nouvel état de check-in
   */
  const checkInPlayer = async (
    tournamentId: string,
    userId: string,
    checkedIn: boolean
  ) => {
    // Update optimiste
    if (tournamentId in checkedInPlayers.value) {
      checkedInPlayers.value[tournamentId] = checkedIn;
    }

    try {
      // Appel API
      await tournamentService.checkInPlayer(tournamentId, userId, checkedIn);

      // Mettre à jour le tournoi dans le cache
      await updateTournamentInCache(tournamentId);

      return true;
    } catch (err) {
      // Restaurer l'état précédent en cas d'erreur
      if (tournamentId in checkedInPlayers.value) {
        checkedInPlayers.value[tournamentId] = !checkedIn;
      }
      console.error(`Erreur lors du check-in au tournoi ${tournamentId}:`, err);
      return false;
    }
  };

  /**
   * Met à jour un tournoi spécifique dans le cache
   * @param tournamentId ID du tournoi à mettre à jour
   */
  const updateTournamentInCache = async (tournamentId: string) => {
    try {
      // Récupérer les données à jour du tournoi
      const updatedTournament = await tournamentService.getTournamentById(
        tournamentId
      );

      // Mettre à jour le cache des détails du tournoi
      if (updatedTournament) {
        tournamentDetails.value[tournamentId] = updatedTournament;
        lastDetailsFetchTime.value[tournamentId] = Date.now();
      }

      // Mettre à jour aussi dans la liste des tournois si présent
      const tournamentIndex = tournaments.value.findIndex(
        (t) => t._id === tournamentId
      );
      if (tournamentIndex !== -1 && updatedTournament) {
        tournaments.value[tournamentIndex] = updatedTournament;
      }

      saveToLocalStorage();
    } catch (err) {
      console.error(
        `Erreur lors de la mise à jour du cache pour le tournoi ${tournamentId}:`,
        err
      );
    }
  };

  /**
   * Sauvegarde les données en cache dans le localStorage
   */
  const saveToLocalStorage = () => {
    localStorage.setItem(
      "tournamentStore",
      JSON.stringify({
        tournaments: tournaments.value,
        tournamentDetails: tournamentDetails.value,
        checkedInPlayers: checkedInPlayers.value,
        lastFetchTime: lastFetchTime.value,
        lastDetailsFetchTime: lastDetailsFetchTime.value,
      })
    );
  };

  /**
   * Charge les données depuis le localStorage
   */
  const loadFromLocalStorage = () => {
    const savedData = localStorage.getItem("tournamentStore");
    if (savedData) {
      try {
        const parsedData = JSON.parse(savedData);
        tournaments.value = parsedData.tournaments || [];
        tournamentDetails.value = parsedData.tournamentDetails || {};
        checkedInPlayers.value = parsedData.checkedInPlayers || {};
        lastFetchTime.value = parsedData.lastFetchTime || null;
        lastDetailsFetchTime.value = parsedData.lastDetailsFetchTime || {};
      } catch (e) {
        console.error("Erreur lors du parsing des données sauvegardées", e);
      }
    }
  };

  /**
   * Vide le cache et force un rechargement
   */
  const clearCache = () => {
    tournaments.value = [];
    tournamentDetails.value = {};
    checkedInPlayers.value = {};
    lastFetchTime.value = null;
    lastDetailsFetchTime.value = {};
    localStorage.removeItem("tournamentStore");
  };

  // Initialisation : charger les données depuis le localStorage au démarrage
  loadFromLocalStorage();

  return {
    // État
    tournaments,
    tournamentDetails,
    checkedInPlayers,
    loading,
    shouldRefreshData,

    // Fonctions de récupération de données
    fetchTournaments,
    fetchTournamentById,
    fetchTournamentsByGame,
    checkUserCheckIns,

    // Fonctions d'actions utilisateur
    registerPlayer,
    unregisterPlayer,
    checkInPlayer,

    // Fonctions utilitaires
    updateTournamentInCache,
    clearCache,
  };
});
