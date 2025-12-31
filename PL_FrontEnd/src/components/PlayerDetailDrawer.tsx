import { Player } from '@/types/player';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from '@/components/ui/sheet';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { ScrollArea } from '@/components/ui/scroll-area';

interface PlayerDetailDrawerProps {
  player: Player | null;
  isOpen: boolean;
  onClose: () => void;
}

interface StatCardProps {
  label: string;
  value: string | number;
  highlight?: boolean;
}

function StatCard({ label, value, highlight }: StatCardProps) {
  return (
    <div className="stat-card">
      <p className="text-xs text-muted-foreground uppercase tracking-wide mb-1">{label}</p>
      <p className={`text-lg font-semibold ${highlight ? 'gradient-text' : 'text-foreground'}`}>
        {value}
      </p>
    </div>
  );
}

function StatSection({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="mb-6">
      <h3 className="text-sm font-semibold text-primary mb-3 uppercase tracking-wider">{title}</h3>
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
        {children}
      </div>
    </div>
  );
}

export function PlayerDetailDrawer({ player, isOpen, onClose }: PlayerDetailDrawerProps) {
  if (!player) return null;

  return (
    <Sheet open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <SheetContent className="w-full sm:max-w-lg bg-card border-border overflow-hidden">
        <SheetHeader className="pb-4">
          <div className="flex items-center gap-3">
            <div className="h-14 w-14 rounded-full gradient-primary flex items-center justify-center text-2xl font-bold text-primary-foreground">
              {player.number}
            </div>
            <div>
              <SheetTitle className="text-xl text-foreground">{player.player}</SheetTitle>
              <SheetDescription className="flex items-center gap-2 mt-1">
                <span>{player.team}</span>
                <Badge variant="outline" className="text-xs">
                  {player.position}
                </Badge>
              </SheetDescription>
            </div>
          </div>
        </SheetHeader>

        <Separator className="bg-border" />

        <ScrollArea className="h-[calc(100vh-180px)] pr-4">
          <div className="py-4">
            {/* Basic Info */}
            <StatSection title="Profile">
              <StatCard label="Nation" value={player.nation} />
              <StatCard label="Age" value={player.age} />
              <StatCard label="Squad Number" value={`#${player.number}`} />
            </StatSection>

            {/* Goals & Assists */}
            <StatSection title="Goals & Assists">
              <StatCard label="Goals" value={player.goals} highlight />
              <StatCard label="Assists" value={player.assists} highlight />
              <StatCard label="Minutes" value={player.minutes.toLocaleString()} />
            </StatSection>

            {/* Expected Stats */}
            <StatSection title="Expected Stats">
              <StatCard label="xG" value={player.xg?.toFixed(2) || '0.00'} />
              <StatCard label="Non-Penalty xG" value={player.npxg?.toFixed(2) || '0.00'} />
              <StatCard label="xAG" value={player.xag?.toFixed(2) || '0.00'} />
            </StatSection>

            {/* Shooting */}
            <StatSection title="Shooting">
              <StatCard label="Total Shots" value={player.totalShoot} />
              <StatCard label="Shots on Target" value={player.shootOnTarget} />
              <StatCard label="Penalties Taken" value={player.penaltyShoot} />
              <StatCard label="Penalties on Goal" value={player.penaltyShootOnGoal} />
            </StatSection>

            {/* Passing */}
            <StatSection title="Passing">
              <StatCard label="Passes Completed" value={player.passesCompleted} />
              <StatCard label="Passes Attempted" value={player.passesAttempted} />
              <StatCard label="Pass Completion %" value={`${player.passCompletion?.toFixed(1)}%`} />
              <StatCard label="Progressive Passes" value={player.progressivePasses} />
            </StatSection>

            {/* Dribbling & Carries */}
            <StatSection title="Dribbling & Carries">
              <StatCard label="Touches" value={player.touches} />
              <StatCard label="Carries" value={player.carries} />
              <StatCard label="Progressive Carries" value={player.progressiveCarries} />
              <StatCard label="Dribble Attempts" value={player.dribbleAttempts} />
              <StatCard label="Successful Dribbles" value={player.successfulDribbles} />
              <StatCard label="Dribbles" value={player.dribbles} />
            </StatSection>

            {/* Defense */}
            <StatSection title="Defense">
              <StatCard label="Tackles" value={player.tackles} />
              <StatCard label="Blocks" value={player.blocks} />
            </StatSection>

            {/* Creativity */}
            <StatSection title="Creativity">
              <StatCard label="Shot Creating Actions" value={player.shotCreatingActions} />
              <StatCard label="Goal Creating Actions" value={player.goalCreatingActions} />
            </StatSection>

            {/* Discipline */}
            <StatSection title="Discipline">
              <StatCard label="Yellow Cards" value={player.yellowCards} />
              <StatCard label="Red Cards" value={player.redCards} />
            </StatSection>

            {/* Date */}
            {player.date && (
              <div className="mt-4 pt-4 border-t border-border">
                <p className="text-xs text-muted-foreground">
                  Last updated: {new Date(player.date).toLocaleDateString()}
                </p>
              </div>
            )}
          </div>
        </ScrollArea>
      </SheetContent>
    </Sheet>
  );
}
