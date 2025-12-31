import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { playerApi } from '@/lib/api';
import { Player, PlayerFilters } from '@/types/player';
import { toast } from '@/hooks/use-toast';

export const usePlayers = (filters?: PlayerFilters) => {
  return useQuery({
    queryKey: ['players', filters],
    queryFn: () => playerApi.getPlayers(filters),
    staleTime: 30000,
  });
};

export const useCreatePlayer = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: playerApi.createPlayer,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['players'] });
      toast({
        title: 'Player created',
        description: 'The player has been successfully added.',
      });
    },
    onError: (error: Error) => {
      toast({
        title: 'Error creating player',
        description: error.message,
        variant: 'destructive',
      });
    },
  });
};

export const useUpdatePlayer = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: playerApi.updatePlayer,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['players'] });
      toast({
        title: 'Player updated',
        description: 'The player has been successfully updated.',
      });
    },
    onError: (error: Error) => {
      toast({
        title: 'Error updating player',
        description: error.message,
        variant: 'destructive',
      });
    },
  });
};

export const useDeletePlayer = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: playerApi.deletePlayer,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['players'] });
      toast({
        title: 'Player deleted',
        description: 'The player has been successfully removed.',
      });
    },
    onError: (error: Error) => {
      toast({
        title: 'Error deleting player',
        description: error.message,
        variant: 'destructive',
      });
    },
  });
};
