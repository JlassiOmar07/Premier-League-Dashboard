import { useState } from 'react';
import { Player, PlayerFilters } from '@/types/player';
import { usePlayers, useCreatePlayer, useUpdatePlayer, useDeletePlayer } from '@/hooks/usePlayers';
import { Header } from '@/components/Header';
import { PlayerFiltersPanel } from '@/components/PlayerFilters';
import { PlayersTable } from '@/components/PlayersTable';
import { PlayerDetailDrawer } from '@/components/PlayerDetailDrawer';
import { PlayerFormModal } from '@/components/PlayerFormModal';
import { DeleteConfirmDialog } from '@/components/DeleteConfirmDialog';
import { Button } from '@/components/ui/button';
import { Plus, Users } from 'lucide-react';

const Index = () => {
  const [filters, setFilters] = useState<PlayerFilters>({});
  const [selectedPlayer, setSelectedPlayer] = useState<Player | null>(null);
  const [isDetailOpen, setIsDetailOpen] = useState(false);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingPlayer, setEditingPlayer] = useState<Player | null>(null);
  const [deletingPlayer, setDeletingPlayer] = useState<Player | null>(null);

  const { data, isLoading, error } = usePlayers(filters);
  const players = Array.isArray(data) ? data : [];
  const createPlayer = useCreatePlayer();
  const updatePlayer = useUpdatePlayer();
  const deletePlayer = useDeletePlayer();

  const handleViewPlayer = (player: Player) => {
    setSelectedPlayer(player);
    setIsDetailOpen(true);
  };

  const handleEditPlayer = (player: Player) => {
    setEditingPlayer(player);
    setIsFormOpen(true);
  };

  const handleAddPlayer = () => {
    setEditingPlayer(null);
    setIsFormOpen(true);
  };

  const handleDeletePlayer = (player: Player) => {
    setDeletingPlayer(player);
  };

  const handleFormSubmit = async (data: Player) => {
    if (editingPlayer) {
      await updatePlayer.mutateAsync(data);
    } else {
      await createPlayer.mutateAsync(data);
    }
  };

  const handleConfirmDelete = async () => {
    if (deletingPlayer) {
      await deletePlayer.mutateAsync(deletingPlayer.player);
      setDeletingPlayer(null);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container py-6 space-y-6">
        {/* Stats Summary */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 animate-slide-up">
          <div className="stat-card">
            <div className="flex items-center gap-2 mb-2">
              <Users className="h-4 w-4 text-primary" />
              <span className="text-xs text-muted-foreground uppercase">Total Players</span>
            </div>
            <p className="text-2xl font-bold text-foreground">{players.length}</p>
          </div>
          <div className="stat-card">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-xs text-muted-foreground uppercase">Total Goals</span>
            </div>
            <p className="text-2xl font-bold gradient-text">
              {players.reduce((sum, p) => sum + (p.goals || 0), 0)}
            </p>
          </div>
          <div className="stat-card">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-xs text-muted-foreground uppercase">Total Assists</span>
            </div>
            <p className="text-2xl font-bold text-foreground">
              {players.reduce((sum, p) => sum + (p.assists || 0), 0)}
            </p>
          </div>
          <div className="stat-card">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-xs text-muted-foreground uppercase">Avg xG</span>
            </div>
            <p className="text-2xl font-bold text-foreground">
              {players.length > 0
                ? (players.reduce((sum, p) => sum + (p.xg || 0), 0) / players.length).toFixed(2)
                : '0.00'}
            </p>
          </div>
        </div>

        {/* Filters */}
        <PlayerFiltersPanel filters={filters} onFiltersChange={setFilters} />

        {/* Action Bar */}
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold text-foreground">
            Players
            <span className="ml-2 text-sm font-normal text-muted-foreground">
              ({players.length} {players.length === 1 ? 'result' : 'results'})
            </span>
          </h2>
          <Button variant="gradient" onClick={handleAddPlayer}>
            <Plus className="h-4 w-4" />
            Add Player
          </Button>
        </div>

        {/* Error State */}
        {error && (
          <div className="bg-destructive/10 border border-destructive/30 rounded-lg p-4 text-destructive">
            Failed to load players. Please ensure your backend is running at /api/v1/player
          </div>
        )}

        {/* Players Table */}
        <PlayersTable
          players={players}
          isLoading={isLoading}
          onViewPlayer={handleViewPlayer}
          onEditPlayer={handleEditPlayer}
          onDeletePlayer={handleDeletePlayer}
        />
      </main>

      {/* Player Detail Drawer */}
      <PlayerDetailDrawer
        player={selectedPlayer}
        isOpen={isDetailOpen}
        onClose={() => setIsDetailOpen(false)}
      />

      {/* Player Form Modal */}
      <PlayerFormModal
        player={editingPlayer}
        isOpen={isFormOpen}
        onClose={() => {
          setIsFormOpen(false);
          setEditingPlayer(null);
        }}
        onSubmit={handleFormSubmit}
      />

      {/* Delete Confirmation */}
      <DeleteConfirmDialog
        player={deletingPlayer}
        isOpen={!!deletingPlayer}
        onClose={() => setDeletingPlayer(null)}
        onConfirm={handleConfirmDelete}
        isDeleting={deletePlayer.isPending}
      />
    </div>
  );
};

export default Index;
