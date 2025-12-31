import { Player } from '@/types/player';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Trash2, Eye, Edit, Loader2 } from 'lucide-react';
import { useState } from 'react';

interface PlayersTableProps {
  players: Player[];
  isLoading: boolean;
  onViewPlayer: (player: Player) => void;
  onEditPlayer: (player: Player) => void;
  onDeletePlayer: (player: Player) => void;
}

const ITEMS_PER_PAGE = 10;

export function PlayersTable({
  players,
  isLoading,
  onViewPlayer,
  onEditPlayer,
  onDeletePlayer,
}: PlayersTableProps) {
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(players.length / ITEMS_PER_PAGE);
  
  const paginatedPlayers = players.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const getPositionColor = (position: string) => {
    switch (position) {
      case 'GK':
        return 'bg-warning/20 text-warning border-warning/30';
      case 'DF':
        return 'bg-blue-500/20 text-blue-400 border-blue-500/30';
      case 'MF':
        return 'bg-success/20 text-success border-success/30';
      case 'FW':
        return 'bg-destructive/20 text-destructive border-destructive/30';
      default:
        return 'bg-muted text-muted-foreground border-border';
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64 bg-card border border-border rounded-lg">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (players.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-64 bg-card border border-border rounded-lg animate-fade-in">
        <div className="text-muted-foreground text-lg mb-2">No players found</div>
        <p className="text-sm text-muted-foreground">Try adjusting your filters or add a new player</p>
      </div>
    );
  }

  return (
    <div className="bg-card border border-border rounded-lg overflow-hidden animate-fade-in">
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow className="border-border hover:bg-transparent">
              <TableHead className="font-semibold text-foreground">Player</TableHead>
              <TableHead className="font-semibold text-foreground">Team</TableHead>
              <TableHead className="font-semibold text-foreground">Pos</TableHead>
              <TableHead className="font-semibold text-foreground">Nation</TableHead>
              <TableHead className="font-semibold text-foreground text-center">Goals</TableHead>
              <TableHead className="font-semibold text-foreground text-center">Assists</TableHead>
              <TableHead className="font-semibold text-foreground text-center">Mins</TableHead>
              <TableHead className="font-semibold text-foreground text-center">xG</TableHead>
              <TableHead className="font-semibold text-foreground text-center">xAG</TableHead>
              <TableHead className="font-semibold text-foreground text-center">🟨</TableHead>
              <TableHead className="font-semibold text-foreground text-center">🟥</TableHead>
              <TableHead className="font-semibold text-foreground text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {paginatedPlayers.map((player, index) => (
              <TableRow
                key={player.id || player.player + index}
                className="table-row-hover border-border"
                onClick={() => onViewPlayer(player)}
              >
                <TableCell className="font-medium text-foreground">{player.player}</TableCell>
                <TableCell className="text-muted-foreground">{player.team}</TableCell>
                <TableCell>
                  <Badge variant="outline" className={getPositionColor(player.position)}>
                    {player.position}
                  </Badge>
                </TableCell>
                <TableCell className="text-muted-foreground">{player.nation}</TableCell>
                <TableCell className="text-center font-semibold text-foreground">{player.goals}</TableCell>
                <TableCell className="text-center text-foreground">{player.assists}</TableCell>
                <TableCell className="text-center text-muted-foreground">{player.minutes}</TableCell>
                <TableCell className="text-center text-muted-foreground">{player.xg?.toFixed(1)}</TableCell>
                <TableCell className="text-center text-muted-foreground">{player.xag?.toFixed(1)}</TableCell>
                <TableCell className="text-center text-warning">{player.yellowCards}</TableCell>
                <TableCell className="text-center text-destructive">{player.redCards}</TableCell>
                <TableCell className="text-right">
                  <div className="flex items-center justify-end gap-1" onClick={(e) => e.stopPropagation()}>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => onViewPlayer(player)}
                      className="h-8 w-8"
                    >
                      <Eye className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => onEditPlayer(player)}
                      className="h-8 w-8"
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => onDeletePlayer(player)}
                      className="h-8 w-8 text-destructive hover:text-destructive hover:bg-destructive/10"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      
      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-between px-4 py-3 border-t border-border">
          <p className="text-sm text-muted-foreground">
            Showing {(currentPage - 1) * ITEMS_PER_PAGE + 1} to{' '}
            {Math.min(currentPage * ITEMS_PER_PAGE, players.length)} of {players.length} players
          </p>
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              disabled={currentPage === 1}
              onClick={() => setCurrentPage((p) => p - 1)}
            >
              Previous
            </Button>
            <Button
              variant="outline"
              size="sm"
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage((p) => p + 1)}
            >
              Next
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
