import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Player, PlayerFormData, POSITIONS, PREMIER_LEAGUE_TEAMS } from '@/types/player';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Loader2 } from 'lucide-react';

const playerSchema = z.object({
  player: z.string().min(1, 'Player name is required'),
  team: z.string().min(1, 'Team is required'),
  number: z.coerce.number().min(1).max(99),
  nation: z.string().min(1, 'Nation is required'),
  position: z.string().min(1, 'Position is required'),
  age: z.coerce.number().min(15).max(50),
  minutes: z.coerce.number().min(0),
  goals: z.coerce.number().min(0),
  assists: z.coerce.number().min(0),
  penaltyShootOnGoal: z.coerce.number().min(0),
  penaltyShoot: z.coerce.number().min(0),
  totalShoot: z.coerce.number().min(0),
  shootOnTarget: z.coerce.number().min(0),
  yellowCards: z.coerce.number().min(0),
  redCards: z.coerce.number().min(0),
  touches: z.coerce.number().min(0),
  dribbles: z.coerce.number().min(0),
  tackles: z.coerce.number().min(0),
  blocks: z.coerce.number().min(0),
  xg: z.coerce.number().min(0),
  npxg: z.coerce.number().min(0),
  xag: z.coerce.number().min(0),
  shotCreatingActions: z.coerce.number().min(0),
  goalCreatingActions: z.coerce.number().min(0),
  passesCompleted: z.coerce.number().min(0),
  passesAttempted: z.coerce.number().min(0),
  passCompletion: z.coerce.number().min(0).max(100),
  progressivePasses: z.coerce.number().min(0),
  carries: z.coerce.number().min(0),
  progressiveCarries: z.coerce.number().min(0),
  dribbleAttempts: z.coerce.number().min(0),
  successfulDribbles: z.coerce.number().min(0),
  date: z.string().min(1, 'Date is required'),
});

interface PlayerFormModalProps {
  player?: Player | null;
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: Player) => Promise<void>;
}

const defaultValues: PlayerFormData = {
  player: '',
  team: '',
  number: 1,
  nation: '',
  position: '',
  age: 20,
  minutes: 0,
  goals: 0,
  assists: 0,
  penaltyShootOnGoal: 0,
  penaltyShoot: 0,
  totalShoot: 0,
  shootOnTarget: 0,
  yellowCards: 0,
  redCards: 0,
  touches: 0,
  dribbles: 0,
  tackles: 0,
  blocks: 0,
  xg: 0,
  npxg: 0,
  xag: 0,
  shotCreatingActions: 0,
  goalCreatingActions: 0,
  passesCompleted: 0,
  passesAttempted: 0,
  passCompletion: 0,
  progressivePasses: 0,
  carries: 0,
  progressiveCarries: 0,
  dribbleAttempts: 0,
  successfulDribbles: 0,
  date: new Date().toISOString().split('T')[0],
};

export function PlayerFormModal({ player, isOpen, onClose, onSubmit }: PlayerFormModalProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const isEditing = !!player;

  const form = useForm<PlayerFormData>({
    resolver: zodResolver(playerSchema),
    defaultValues,
  });

  useEffect(() => {
    if (player) {
      form.reset(player);
    } else {
      form.reset(defaultValues);
    }
  }, [player, form]);

  const handleSubmit = async (data: PlayerFormData) => {
    setIsSubmitting(true);
    try {
      await onSubmit({
        ...data,
        id: player?.id,
      } as Player);
      onClose();
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-w-2xl max-h-[90vh] bg-card border-border">
        <DialogHeader>
          <DialogTitle className="text-foreground">
            {isEditing ? 'Edit Player' : 'Add New Player'}
          </DialogTitle>
          <DialogDescription>
            {isEditing
              ? 'Update the player details below.'
              : 'Fill in the player details to add a new player.'}
          </DialogDescription>
        </DialogHeader>

        <ScrollArea className="max-h-[calc(90vh-150px)] pr-4">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6 pb-4">
              {/* Basic Info Section */}
              <div>
                <h3 className="text-sm font-semibold text-primary mb-3 uppercase tracking-wider">
                  Basic Info
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="player"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Player Name</FormLabel>
                        <FormControl>
                          <Input placeholder="e.g., Erling Haaland" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="team"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Team</FormLabel>
                        <Select onValueChange={field.onChange} value={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select team" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {PREMIER_LEAGUE_TEAMS.map((team) => (
                              <SelectItem key={team} value={team}>
                                {team}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="position"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Position</FormLabel>
                        <Select onValueChange={field.onChange} value={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select position" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {POSITIONS.map((pos) => (
                              <SelectItem key={pos} value={pos}>
                                {pos}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="number"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Squad Number</FormLabel>
                        <FormControl>
                          <Input type="number" min={1} max={99} {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="nation"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Nation</FormLabel>
                        <FormControl>
                          <Input placeholder="e.g., Norway" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="age"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Age</FormLabel>
                        <FormControl>
                          <Input type="number" min={15} max={50} {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="date"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Date</FormLabel>
                        <FormControl>
                          <Input type="date" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>

              {/* Performance Stats */}
              <div>
                <h3 className="text-sm font-semibold text-primary mb-3 uppercase tracking-wider">
                  Performance
                </h3>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                  <FormField
                    control={form.control}
                    name="minutes"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Minutes</FormLabel>
                        <FormControl>
                          <Input type="number" min={0} {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="goals"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Goals</FormLabel>
                        <FormControl>
                          <Input type="number" min={0} {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="assists"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Assists</FormLabel>
                        <FormControl>
                          <Input type="number" min={0} {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="yellowCards"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Yellow Cards</FormLabel>
                        <FormControl>
                          <Input type="number" min={0} {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="redCards"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Red Cards</FormLabel>
                        <FormControl>
                          <Input type="number" min={0} {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>

              {/* Shooting Stats */}
              <div>
                <h3 className="text-sm font-semibold text-primary mb-3 uppercase tracking-wider">
                  Shooting
                </h3>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                  <FormField
                    control={form.control}
                    name="totalShoot"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Total Shots</FormLabel>
                        <FormControl>
                          <Input type="number" min={0} {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="shootOnTarget"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>On Target</FormLabel>
                        <FormControl>
                          <Input type="number" min={0} {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="penaltyShoot"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Penalties</FormLabel>
                        <FormControl>
                          <Input type="number" min={0} {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="penaltyShootOnGoal"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Pen. On Goal</FormLabel>
                        <FormControl>
                          <Input type="number" min={0} {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>

              {/* Expected Stats */}
              <div>
                <h3 className="text-sm font-semibold text-primary mb-3 uppercase tracking-wider">
                  Expected Stats
                </h3>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                  <FormField
                    control={form.control}
                    name="xg"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>xG</FormLabel>
                        <FormControl>
                          <Input type="number" step="0.01" min={0} {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="npxg"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>npxG</FormLabel>
                        <FormControl>
                          <Input type="number" step="0.01" min={0} {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="xag"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>xAG</FormLabel>
                        <FormControl>
                          <Input type="number" step="0.01" min={0} {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>

              {/* Passing */}
              <div>
                <h3 className="text-sm font-semibold text-primary mb-3 uppercase tracking-wider">
                  Passing
                </h3>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                  <FormField
                    control={form.control}
                    name="passesCompleted"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Completed</FormLabel>
                        <FormControl>
                          <Input type="number" min={0} {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="passesAttempted"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Attempted</FormLabel>
                        <FormControl>
                          <Input type="number" min={0} {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="passCompletion"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Completion %</FormLabel>
                        <FormControl>
                          <Input type="number" step="0.1" min={0} max={100} {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="progressivePasses"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Progressive</FormLabel>
                        <FormControl>
                          <Input type="number" min={0} {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>

              {/* Dribbling & Carries */}
              <div>
                <h3 className="text-sm font-semibold text-primary mb-3 uppercase tracking-wider">
                  Dribbling & Carries
                </h3>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                  <FormField
                    control={form.control}
                    name="touches"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Touches</FormLabel>
                        <FormControl>
                          <Input type="number" min={0} {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="carries"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Carries</FormLabel>
                        <FormControl>
                          <Input type="number" min={0} {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="progressiveCarries"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Prog. Carries</FormLabel>
                        <FormControl>
                          <Input type="number" min={0} {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="dribbles"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Dribbles</FormLabel>
                        <FormControl>
                          <Input type="number" min={0} {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="dribbleAttempts"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Dribble Attempts</FormLabel>
                        <FormControl>
                          <Input type="number" min={0} {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="successfulDribbles"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Successful</FormLabel>
                        <FormControl>
                          <Input type="number" min={0} {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>

              {/* Defense & Creativity */}
              <div>
                <h3 className="text-sm font-semibold text-primary mb-3 uppercase tracking-wider">
                  Defense & Creativity
                </h3>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                  <FormField
                    control={form.control}
                    name="tackles"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Tackles</FormLabel>
                        <FormControl>
                          <Input type="number" min={0} {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="blocks"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Blocks</FormLabel>
                        <FormControl>
                          <Input type="number" min={0} {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="shotCreatingActions"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Shot Creating</FormLabel>
                        <FormControl>
                          <Input type="number" min={0} {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="goalCreatingActions"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Goal Creating</FormLabel>
                        <FormControl>
                          <Input type="number" min={0} {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>

              <div className="flex justify-end gap-3 pt-4 border-t border-border">
                <Button type="button" variant="outline" onClick={onClose}>
                  Cancel
                </Button>
                <Button type="submit" variant="gradient" disabled={isSubmitting}>
                  {isSubmitting && <Loader2 className="h-4 w-4 animate-spin" />}
                  {isEditing ? 'Update Player' : 'Add Player'}
                </Button>
              </div>
            </form>
          </Form>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}
