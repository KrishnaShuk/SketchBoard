"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Button } from "@repo/ui/button"; // Assuming a headless Button from your UI package
import { HTTP_BACKEND } from "@/config";
import { Plus, ArrowRight, PenTool, Sparkles } from "lucide-react";
import { CreateRoomModal } from "@/components/CreateRoomModal";

// --- Type Definition ---
type Room = {
  id: number;
  slug: string;
  createdAt: string;
};

// --- Helper Components for a Cleaner Main Component ---

// A beautiful, encouraging "Empty State"
const EmptyState = ({ onOpenModal }: { onOpenModal: () => void }) => (
  <div className="relative mt-12 text-center border-2 border-dashed border-border rounded-xl p-8 sm:p-12 lg:p-16">
    <div className="absolute inset-0 z-0 opacity-20" style={{ backgroundImage: 'radial-gradient(circle at 25px 25px, hsl(var(--border)) 1px, transparent 0), radial-gradient(circle at 75px 75px, hsl(var(--border)) 1px, transparent 0%)', backgroundSize: '100px 100px' }}></div>
    <div className="relative z-10">
      <div className="w-16 h-16 rounded-full bg-surface flex items-center justify-center mx-auto mb-4 border-2 border-dashed border-border">
        <Sparkles className="w-8 h-8 text-primary" />
      </div>
      <h2 className="text-4xl font-bold">Create Your First Board</h2>
      <p className="max-w-md mx-auto mt-2 text-muted-foreground">
        Your canvas awaits. Turn your ideas into visuals and collaborate with your team in real-time.
      </p>
      <Button
        className="mt-6 group bg-primary text-primary-foreground hover:bg-primary/90 shadow-lg shadow-primary/20 text-base py-3 px-6"
        onClick={onOpenModal}
      >
        Start Creating
        <ArrowRight className="w-5 h-5 ml-2 transition-transform group-hover:translate-x-1" />
      </Button>
    </div>
  </div>
);

// A skeleton loader that mimics the final card layout
const LoadingState = () => (
  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mt-8 animate-pulse">
    {[...Array(4)].map((_, i) => (
      <div key={i} className="bg-surface border border-border rounded-lg aspect-[4/3]">
        <div className="p-5 flex flex-col justify-between h-full">
          <div className="h-8 bg-border rounded w-1/4"></div>
          <div>
            <div className="h-6 bg-border rounded w-3/4 mb-3"></div>
            <div className="h-4 bg-border rounded w-1/2"></div>
          </div>
        </div>
      </div>
    ))}
  </div>
);

// The redesigned Room Card component
const RoomCard = ({ room }: { room: Room }) => (
  <Link href={`/canvas/${room.id}`} key={room.id} className="group block">
    <div className="relative h-full bg-surface border border-border rounded-lg shadow-sm transition-all duration-300 ease-in-out hover:border-primary hover:shadow-xl hover:shadow-primary/10 hover:-translate-y-1">
      <div className="relative h-full flex flex-col justify-between p-5 aspect-[4/3]">
        <div className="flex justify-between items-start">
          <PenTool className="w-8 h-8 text-muted-foreground/50 transition-colors group-hover:text-primary" />
          <div className="flex items-center gap-1 text-sm text-muted-foreground opacity-0 transition-opacity duration-300 group-hover:opacity-100">
            Open <ArrowRight className="w-4 h-4" />
          </div>
        </div>
        <div>
          <h3 className="font-sans font-semibold text-xl text-foreground truncate pr-2">{room.slug}</h3>
          <p className="font-sans text-sm text-muted-foreground mt-1">
            {new Date(room.createdAt).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
          </p>
        </div>
      </div>
    </div>
  </Link>
);


// --- Main Dashboard Page Component ---

export default function DashboardPage() {
  const [rooms, setRooms] = useState<Room[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    // Simulate a short delay for a smoother loading experience
    const timer = setTimeout(() => {
      fetch(`${HTTP_BACKEND}/api/user/rooms`, { credentials: "include" })
        .then(res => {
          if (!res.ok) throw new Error("Failed to fetch your whiteboards.");
          return res.json();
        })
        .then((data: Room[]) => setRooms(data))
        .catch(err => setError(err.message))
        .finally(() => setIsLoading(false));
    }, 300); // 300ms delay
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
      
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
        <div>
          <h1 className="text-5xl font-bold tracking-tight">Dashboard</h1>
          <p className="mt-2 text-lg text-muted-foreground">
            Welcome back! Here are your collaborative spaces.
          </p>
        </div>
        <Button
          className="group bg-primary text-primary-foreground hover:bg-primary/90 shadow-lg shadow-primary/20 text-base py-3 px-5"
          onClick={() => setIsModalOpen(true)}
        >
          <Plus className="w-5 h-5 mr-2 transition-transform group-hover:rotate-90" />
          Create Board
        </Button>
      </div>

      {/* Main Content Area */}
      {isLoading ? (
        <LoadingState />
      ) : error ? (
        <div className="mt-12 text-center py-16 border border-amber-500/30 text-amber-500 bg-amber-500/5 rounded-xl">{error}</div>
      ) : rooms.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mt-8">
          {rooms.map((room) => <RoomCard room={room} key={room.id} />)}
        </div>
      ) : (
        <EmptyState onOpenModal={() => setIsModalOpen(true)} />
      )}
    </>
  );
}