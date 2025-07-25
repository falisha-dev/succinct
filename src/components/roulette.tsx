"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { EggIcon } from "@/components/egg-icon";
import { CrackedEggIcon } from "@/components/cracked-egg-icon";
import { Confetti } from "@/components/confetti";
import { cn } from "@/lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { User, Share2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

type Role = "Proofer Promotion" | "Prove Of Love Promotion";
const ROLES: Role[] = ["Proofer Promotion", "Prove Of Love Promotion"];

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
  
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);


  const { toast } = useToast();

  const handleRoleSelect = (role: Role) => {
    if (!state.username) {
      toast({
        title: "Whoops!",
        description: "Please enter your Twitter username first.",
        variant: "destructive",
      });
      return;
    }
    setState(prev => ({ ...prev, error: null, probability: null, showResult: false, selectedRole: role, isLoading: true }));

    // Simple client-side random number generation
    const probability = Math.floor(Math.random() * (80 - 60 + 1)) + 60;

    setTimeout(() => {
      setState(prev => ({ ...prev, probability: probability, isLoading: false, showResult: true }));
    }, 2500); // 2.5s for rolling animation
  };

  const handleReset = () => {
    setState(prev => ({...INITIAL_STATE, username: prev.username}));
  };
  
  const handleShare = () => {
    const text = `I just rolled the Rollup Roulette! 🎲\n\nMy chance for the "${state.selectedRole}" is ${state.probability}%! ✨\n\nWhat are your odds? #RollupRoulette`;
    const url = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}`;
    window.open(url, '_blank');
  };

  const { username, isLoading, showResult, probability, selectedRole } = state;

  return (
    <>
      <Card className="w-full max-w-md mx-auto shadow-2xl shadow-primary/10 border-primary/20">
        <CardHeader className="text-center">
          <Image
            src="/assets/succ-.png"
            alt="Logo"
            width={50}
            height={50}
            className="mx-auto"
          />
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
                <EggIcon className="w-28 h-28 animate-roll" />
                <p className="text-center mt-4 text-muted-foreground animate-pulse font-medium">
                  Calculating your fate...
                </p>
              </div>
            )}
            
            {!isLoading && !showResult && (
              <div className="text-center text-muted-foreground">
                <EggIcon className="w-28 h-28 opacity-50 mx-auto" />
                <p className="mt-4 font-medium">Select a rollup to see your chances!</p>
              </div>
            )}

            {showResult && (
              <div className="text-center text-muted-foreground animate-fade-in-pop">
                 <CrackedEggIcon className="w-32 h-32 text-primary mx-auto" />
                 <p className="text-2xl font-bold mt-2">{probability}%</p>
                 <p className="font-medium">Chance for "{selectedRole}"</p>
              </div>
            )}
          </div>
          
           <div className="grid grid-cols-1 gap-4">
              {ROLES.map(role => (
                <Button 
                  key={role}
                  onClick={() => handleRoleSelect(role)}
                  disabled={isLoading || showResult}
                  size="lg"
                  className="font-semibold"
                >
                  {role}
                </Button>
              ))}
            </div>
        </CardContent>
         {isClient && showResult && (
          <CardFooter className="flex-col gap-4">
              <Button onClick={handleShare} className="w-full">
                <Share2 /> Share on Twitter
              </Button>
            <Button onClick={handleReset} variant="outline" className="w-full">
              Try Again
            </Button>
          </CardFooter>
        )}
      </Card>
      
      {isClient && (
        <AlertDialog open={showResult} onOpenChange={(open) => !open && handleReset()}>
            <AlertDialogContent className="overflow-hidden p-0">
              <div className="relative text-center">
                <Confetti />
                <div className="p-8 pt-12">
                    <CrackedEggIcon className="w-36 h-36 text-primary mx-auto" />
                    <div className="absolute inset-0 flex flex-col items-center justify-center text-accent-foreground drop-shadow-lg">
                      <p className="text-6xl font-bold font-headline">
                        {probability}%
                      </p>
                      <p className="text-xs font-semibold uppercase tracking-widest">Probability</p>
                    </div>
                  </div>
              </div>
              <AlertDialogHeader className="px-6 text-center">
                <AlertDialogTitle className="text-2xl">Congratulations, @{username}!</AlertDialogTitle>
                <AlertDialogDescription>
                  You have a {probability}% chance for the "{selectedRole}" role.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter className="bg-muted/50 p-6 gap-4 sm:gap-2">
                  <Button variant="outline" onClick={handleShare}>
                    <Share2 /> Share on Twitter
                  </Button>
                <AlertDialogAction asChild>
                  <Button onClick={handleReset}>Try Again</Button>
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        )}
    </>
  );
}
