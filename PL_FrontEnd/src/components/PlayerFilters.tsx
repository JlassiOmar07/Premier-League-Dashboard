import { useState, useEffect } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Search, X, Filter } from 'lucide-react';
import { PlayerFilters, POSITIONS, PREMIER_LEAGUE_TEAMS } from '@/types/player';
import { useDebounce } from '@/hooks/useDebounce';

interface PlayerFiltersProps {
  filters: PlayerFilters;
  onFiltersChange: (filters: PlayerFilters) => void;
}

export function PlayerFiltersPanel({ filters, onFiltersChange }: PlayerFiltersProps) {
  const [nameInput, setNameInput] = useState(filters.name || '');
  const debouncedName = useDebounce(nameInput, 400);

  useEffect(() => {
    if (debouncedName !== filters.name) {
      onFiltersChange({ ...filters, name: debouncedName || undefined });
    }
  }, [debouncedName]);

  const handleClearFilters = () => {
    setNameInput('');
    onFiltersChange({});
  };

  const hasActiveFilters = filters.team || filters.name || filters.position || filters.nation;

  return (
    <div className="bg-card border border-border rounded-lg p-4 animate-fade-in">
      <div className="flex items-center gap-2 mb-4">
        <Filter className="h-5 w-5 text-primary" />
        <h2 className="font-semibold text-foreground">Filters</h2>
        {hasActiveFilters && (
          <Button
            variant="ghost"
            size="sm"
            onClick={handleClearFilters}
            className="ml-auto text-muted-foreground hover:text-foreground"
          >
            <X className="h-4 w-4 mr-1" />
            Clear
          </Button>
        )}
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Name Search */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search player name..."
            value={nameInput}
            onChange={(e) => setNameInput(e.target.value)}
            className="pl-10"
          />
        </div>

        {/* Team Select */}
        <Select
          value={filters.team || 'all'}
          onValueChange={(value) =>
            onFiltersChange({ ...filters, team: value === 'all' ? undefined : value })
          }
        >
          <SelectTrigger>
            <SelectValue placeholder="Select team" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Teams</SelectItem>
            {PREMIER_LEAGUE_TEAMS.map((team) => (
              <SelectItem key={team} value={team}>
                {team}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        {/* Position Select */}
        <Select
          value={filters.position || 'all'}
          onValueChange={(value) =>
            onFiltersChange({ ...filters, position: value === 'all' ? undefined : value })
          }
        >
          <SelectTrigger>
            <SelectValue placeholder="Select position" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Positions</SelectItem>
            {POSITIONS.map((pos) => (
              <SelectItem key={pos} value={pos}>
                {pos}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        {/* Nation Input */}
        <Input
          placeholder="Filter by nation..."
          value={filters.nation || ''}
          onChange={(e) =>
            onFiltersChange({ ...filters, nation: e.target.value || undefined })
          }
        />
      </div>
    </div>
  );
}
