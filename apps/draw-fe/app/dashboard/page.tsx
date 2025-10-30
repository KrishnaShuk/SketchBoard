"use client"; // This component needs state and browser APIs, so it must be a Client Component.

import { useEffect, useState } from "react";
import Link from "next/link";
import { Button } from "@repo/ui/button";
import { HTTP_BACKEND } from "@/config"; // Assuming you have this config file

// Define a type for our room data for better TypeScript support
type Room = {
  id: number;
  slug: string;
  createdAt: string;
};

export default function DashboardPage() {
  const [rooms, setRooms] = useState<Room[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchRooms = async () => {
      try {
        const response = await fetch(`${HTTP_BACKEND}/api/user/rooms`, {
          credentials: "include", // IMPORTANT: This sends the httpOnly cookie
        });

        if (!response.ok) {
          throw new Error("Failed to fetch your rooms. Please try logging in again.");
        }

        const data: Room[] = await response.json();
        setRooms(data);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchRooms();
  }, []); // The empty array [] means this effect runs once when the component mounts.

  if (isLoading) {
    return <div className="p-8">Loading your dashboard...</div>;
  }

  if (error) {
    return <div className="p-8 text-red-500">Error: {error}</div>;
  }

  return (
    <div className="container mx-auto p-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-4xl font-bold">Your Whiteboards</h1>
        <Button>Create New Room</Button> {/* We can add functionality to this later */}
      </div>

      {rooms.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {rooms.map((room) => (
            <Link href={`/canvas/${room.id}`} key={room.id}>
              <div className="block p-6 bg-card border border-border rounded-lg hover:border-primary transition-colors cursor-pointer">
                <h2 className="text-xl font-semibold">{room.slug}</h2>
                <p className="text-sm text-muted-foreground mt-2">
                  Created on: {new Date(room.createdAt).toLocaleDateString()}
                </p>
              </div>
            </Link>
          ))}
        </div>
      ) : (
        <div className="text-center py-16 border-2 border-dashed border-border rounded-lg">
          <p className="text-muted-foreground">You haven't created any rooms yet.</p>
          <Button className="mt-4">Create Your First Room</Button>
        </div>
      )}
    </div>
  );
}