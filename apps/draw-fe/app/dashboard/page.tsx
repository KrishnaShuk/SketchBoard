"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Button } from "@repo/ui/button";
import { HTTP_BACKEND } from "@/config";
import { Plus, ArrowRight, PenTool, Sparkles } from "lucide-react";
import { CreateRoomModal } from "@/components/CreateRoomModal";

type Room = {
  id: number;
  slug: string;
  createdAt: string;
};

// --- HELPER COMPONENTS FOR CLEANER JSX ---

// A beautiful, encouraging "Empty State"
const EmptyState = ({ onOpenModal }: { onOpenModal: () => void }) => (
  <div className="relative text-center py-24 border-2 border-dashed border-border rounded-xl mt-8">
    {/* Background pattern */}
    <div className="absolute inset-0 z-0 opacity-20" style={{ backgroundImage: 'radial-gradient(circle at 25px 25px, hsl(var(--border)) 2%, transparent 0%), radial-gradient(circle at 75px 75px, hsl(var(--border)) 2%, transparent 0%)', backgroundSize: '100px 100px' }}></div>

    <div className="relative z-10">
      <div className="w-16 h-16 rounded-full bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center mx-auto mb-4 border border-primary/20">
        <Sparkles className="w-8 h-8 text-primary" />
      </div>
      <h3 className="text-2xl font-bold text-foreground">Create Your First Whiteboard</h3>
      <p className="text-muted-foreground mt-2 max-w-sm mx-auto">
        Your canvas awaits. Turn your ideas into visuals and collaborate with your team in real-time.
      </p>
      <Button className="mt-6 bg-gradient-hero group shadow-lg shadow-primary/20 text-lg py-3 px-6" onClick={onOpenModal}>
        Start Creating
        <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform"/>
      </Button>
    </div>
  </div>
);

// A skeleton loader that mimics the final card layout
const LoadingState = () => (
  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 animate-pulse mt-8">
    {[...Array(4)].map((_, i) => (
      <div key={i} className="bg-card/50 border border-border rounded-lg aspect-[4/3]">
        <div className="p-5">
          <div className="h-6 bg-secondary rounded w-3/4 mb-4"></div>
          <div className="h-4 bg-secondary rounded w-1/2"></div>
        </div>
      </div>
    ))}
  </div>
);

// The redesigned Room Card component
const RoomCard = ({ room }: { room: Room }) => (
  <Link href={`/canvas/${room.id}`} key={room.id} className="group block">
    <div className="relative h-full bg-card/80 backdrop-blur-sm border border-white/10 rounded-lg shadow-sm transition-all duration-300 ease-in-out overflow-hidden hover:border-primary/50 hover:scale-[1.02] hover:shadow-xl hover:shadow-primary/20">
      {/* Subtle background glow effect on hover */}
      <div className="absolute -inset-2 bg-primary/10 opacity-0 group-hover:opacity-100 blur-2xl transition-opacity duration-300"></div>

      <div className="relative h-full flex flex-col justify-between p-5 aspect-[4/3]">
        <div className="flex justify-between items-start">
          <PenTool className="w-8 h-8 text-muted-foreground/50" />
          {/* "Open" call to action that appears on hover */}
          <div className="flex items-center gap-1 text-sm text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            Open <ArrowRight className="w-4 h-4" />
          </div>
        </div>
        <div>
          <h2 className="font-semibold text-xl text-foreground truncate pr-2">{room.slug}</h2>
          <p className="text-sm text-muted-foreground mt-1">
            {new Date(room.createdAt).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
          </p>
        </div>
      </div>
    </div>
  </Link>
);


// --- MAIN DASHBOARD PAGE ---

export default function DashboardPage() {
  const [rooms, setRooms] = useState<Room[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    // Simulate loading for a better visual effect on fast connections
    const timer = setTimeout(() => {
      fetch(`${HTTP_BACKEND}/api/user/rooms`, { credentials: "include" })
        .then(res => {
          if (!res.ok) throw new Error("Failed to fetch your whiteboards. Please try again later.");
          return res.json();
        })
        .then((data: Room[]) => setRooms(data))
        .catch(err => setError(err.message))
        .finally(() => setIsLoading(false));
    }, 500); // 500ms delay

    return () => clearTimeout(timer);
  }, []);

  const handleRoomCreated = (newRoom: Room) => {
    setRooms(prevRooms => [newRoom, ...prevRooms]);
  };

  return (
    <>
      <CreateRoomModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onRoomCreated={handleRoomCreated}
      />
      {/* Background Glow Effect */}
      <div className="absolute top-0 left-0 -z-10 h-96 w-full bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,rgba(120,119,198,0.3),rgba(255,255,255,0))]"></div>
      
      <div className="container mx-auto px-6 lg:px-8 py-12">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-10">
          <div>
            <h1 className="text-5xl font-bold tracking-tight text-foreground">Dashboard</h1>
            <p className="text-muted-foreground mt-2 text-lg">Welcome back! Here are your collaborative spaces.</p>
          </div>
          <Button onClick={() => setIsModalOpen(true)} className="group bg-gradient-hero shadow-lg shadow-primary/20 text-base py-3 px-5">
            <Plus className="w-5 h-5 mr-2 group-hover:rotate-90 transition-transform" />
            Create Board
          </Button>
        </div>
        
        {/* --- Content Area --- */}
        {isLoading ? (
          <LoadingState />
        ) : error ? (
          <div className="text-center py-24 border border-amber-500/30 text-amber-500 bg-amber-500/5 rounded-xl mt-8">{error}</div>
        ) : rooms.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mt-8">
            {rooms.map((room) => <RoomCard room={room} key={room.id} />)}
          </div>
        ) : (
          <EmptyState onOpenModal={() => setIsModalOpen(true)} />
        )}
      </div>
    </>
  );
}