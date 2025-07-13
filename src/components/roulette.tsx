"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { calculateProbability } from "@/ai/flows/calculate-probability";
import { EggIcon } from "@/components/egg-icon";
import { CrackedEggIcon } from "@/components/cracked-egg-icon";
import { Confetti } from "@/components/confetti";
import { cn } from "@/lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { User, Dices } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

type Role = "Proofer Promotion Rollup" | "Prove Of Love Promotion Rollup";
const ROLES: Role[] = ["Proofer Promotion Rollup", "Prove Of Love Promotion Rollup"];

const INITIAL_STATE = {
  username: "",
  probability: null,
  isLoading: false,
  error: null,
  selectedRole: null,
  showResult: false,
};

export function Roulette() {
  const [state, setState] = useState<{
    username: string;
    probability: number | null;
    isLoading: boolean;
    error: string | null;
    selectedRole: Role | null;
    showResult: boolean;
  }>(INITIAL_STATE);

  const { toast } = useToast();

  const handleRoleSelect = async (role: Role) => {
    if (!state.username) {
      toast({
        title: "Whoops!",
        description: "Please enter your Twitter username first.",
        variant: "destructive",
      });
      return;
    }
    setState(prev => ({ ...prev, error: null, probability: null, showResult: false, selectedRole: role, isLoading: true }));

    try {
      const result = await calculateProbability({ twitterUsername: state.username, role });
      setTimeout(() => {
        setState(prev => ({ ...prev, probability: result.probability, isLoading: false, showResult: true }));
      }, 2500); // 2.5s for rolling animation
    } catch (e) {
      console.error(e);
      toast({
        title: "Oh no!",
        description: "The crystal ball is cloudy. Could not calculate probability.",
        variant: "destructive",
      });
      setState(prev => ({ ...prev, isLoading: false }));
    }
  };

  const handleReset = () => {
    setState(prev => ({...INITIAL_STATE, username: prev.username}));
  };

  const { username, isLoading, showResult, probability } = state;

  return (
    <Card className="w-full max-w-md mx-auto shadow-2xl shadow-primary/10 border-primary/20">
      <CardHeader className="text-center">
        <Dices className="mx-auto h-12 w-12 text-primary" />
        <CardTitle className="text-3xl font-bold font-headline text-accent">
          Rollup Roulette
        </CardTitle>
        <CardDescription>
          What are your chances of getting the role?
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="username">Twitter Username</Label>
          <div className="flex items-center gap-4">
            <div className="relative flex-grow">
               <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
               <Input
                  id="username"
                  placeholder="e.g. vitalikbuterin"
                  value={username}
                  onChange={(e) => setState(prev => ({...prev, username: e.target.value}))}
                  disabled={isLoading || showResult}
                  className="pl-9"
                />
            </div>
            <Avatar>
              <AvatarImage src={username ? `https://unavatar.io/twitter/${username}` : undefined} alt={username} />
              <AvatarFallback>
                <User className="h-5 w-5" />
              </AvatarFallback>
            </Avatar>
          </div>
        </div>

        <div className="relative w-full h-48 flex items-center justify-center overflow-hidden rounded-lg bg-primary/5 p-4">
          {isLoading && (
            <div className="absolute text-center">
              <EggIcon className="w-28 h-28 text-primary/50 animate-roll" />
              <p className="text-center mt-4 text-muted-foreground animate-pulse font-medium">
                Calculating your fate...
              </p>
            </div>
          )}
          {showResult && probability !== null && (
            <>
              <Confetti />
              <div className="relative text-center animate-fade-in-pop">
                <CrackedEggIcon className="w-36 h-36 text-primary" />
                <div className="absolute inset-0 flex flex-col items-center justify-center text-accent-foreground drop-shadow-lg">
                  <p className="text-6xl font-bold font-headline">
                    {probability}%
                  </p>
                  <p className="text-xs font-semibold uppercase tracking-widest">Probability</p>
                </div>
              </div>
            </>
          )}
          {!isLoading && !showResult && (
            <div className="text-center text-muted-foreground">
              <EggIcon className="w-28 h-28 text-primary/20 mx-auto" />
              <p className="mt-4 font-medium">Select a rollup to see your chances!</p>
            </div>
          )}
        </div>
        
        {!showResult && (
           <div className="grid grid-cols-1 gap-4">
            {ROLES.map(role => (
              <Button 
                key={role}
                onClick={() => handleRoleSelect(role)}
                disabled={isLoading}
                size="lg"
                className="font-semibold"
              >
                {role}
              </Button>
            ))}
          </div>
        )}
      </CardContent>
      {showResult && (
         <CardFooter>
            <Button variant="outline" onClick={handleReset} className="w-full">
                Try Again
            </Button>
         </CardFooter>
      )}
    </Card>
  );
}
