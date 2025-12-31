import axios from 'axios';
import { Player, PlayerFilters } from '@/types/player';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || '/api/v1';

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const playerApi = {
  getPlayers: async (filters?: PlayerFilters): Promise<Player[]> => {
    const params = new URLSearchParams();
    
    if (filters?.team) params.append('team', filters.team);
    if (filters?.name) params.append('name', filters.name);
    if (filters?.position) params.append('position', filters.position);
    if (filters?.nation) params.append('nation', filters.nation);
    
    const response = await apiClient.get<Player[]>('/player', { params });
    return response.data;
  },

  createPlayer: async (player: Player): Promise<Player> => {
    const response = await apiClient.post<Player>('/player', player);
    return response.data;
  },

  updatePlayer: async (player: Player): Promise<Player> => {
    const response = await apiClient.put<Player>('/player', player);
    return response.data;
  },

  deletePlayer: async (playerName: string): Promise<void> => {
    await apiClient.delete(`/player/${encodeURIComponent(playerName)}`);
  },
};

export default apiClient;
