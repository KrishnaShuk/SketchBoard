"use client";

import { useState } from 'react';
import { Button } from '@repo/ui/button';
import { Input } from '@repo/ui/input';
import { Label } from '@repo/ui/Label';
import { HTTP_BACKEND } from '@/config';

type Room = {
  id: number;
  slug: string;
  createdAt: string;
};

interface CreateRoomModalProps {
  isOpen: boolean;
  onClose: () => void;
  onRoomCreated: (newRoom: Room) => void;
}

export function CreateRoomModal({ isOpen, onClose, onRoomCreated }: CreateRoomModalProps) {
  const [roomName, setRoomName] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    if (!roomName.trim()) {
      setError("Room name cannot be empty.");
      setIsLoading(false);
      return;
    }

    try {
      const response = await fetch(`${HTTP_BACKEND}/room`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ name: roomName }),
      });

      const data: any = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Failed to create room. Please try again.');
      }

      onRoomCreated(data as Room);
      setRoomName('');
      onClose();

    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  if (!isOpen) {
    return null;
  }

  const handleBackdropClick = () => {
    if (isLoading) return;
    onClose();
  }

  return (
    <div 
      className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 animate-fade-in"
      onClick={handleBackdropClick}
    >
      <div 
        className="bg-card rounded-xl p-8 border border-border shadow-xl w-full max-w-md animate-scale-in"
        onClick={e => e.stopPropagation()}
      >
        <h2 className="text-2xl font-bold mb-1 text-foreground">Create a New Whiteboard</h2>
        <p className="text-muted-foreground mb-6">Give your new canvas a name to get started.</p>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="roomName" className="font-medium text-muted-foreground">Room Name</Label>
            <Input
              id="roomName"
              type="text"
              placeholder="e.g., Q3 Project Brainstorm"
              value={roomName}
              onChange={(e) => setRoomName(e.target.value)}
              disabled={isLoading}
              className="py-3 bg-background/50 border-border focus:border-primary"
              autoFocus
            />
          </div>
          
          {error && <p className="text-sm text-center text-amber-500">{error}</p>}
          
          <div className="flex justify-end gap-4 pt-2">
            <Button 
              type="button" 
              onClick={onClose} 
              disabled={isLoading}
              className="bg-transparent border border-border text-foreground hover:bg-secondary"
            >
              Cancel
            </Button>
            <Button type="submit" isLoading={isLoading} className="bg-gradient-hero">
              Create Room
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}