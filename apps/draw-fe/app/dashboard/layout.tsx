import Link from 'next/link';
import { getUserIdFromCookie } from '@/lib/auth';
import { redirect } from 'next/navigation';
import { LogoutButton } from '@/components/LogoutButton';
import { PrismaClient } from '@prisma/client';

// We can instantiate Prisma client here for server components in this route
const prisma = new PrismaClient();

// Helper function to get user details
async function getUser() {
  const userId = await getUserIdFromCookie();
  if (!userId) {
    return null;
  }
  try {
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: { name: true, email: true },
    });
    return user;
  } catch (error) {
    console.error("Database Error:", error);
    return null;
  }
}

// Helper function to generate initials
const getInitials = (name: string | null, email: string) => {
    const displayName = name || email;
    if (!displayName) return '?';
    
    const parts = displayName.split(' ');
    if (parts.length > 1 && parts[0] && parts[parts.length - 1]) {
      return `${parts[0][0]}${parts[parts.length - 1][0]}`.toUpperCase();
    }
    return displayName.substring(0, 2).toUpperCase();
};

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await getUser();
  
  // Protect this entire section of the app
  if (!user) {
    redirect('/signin');
  }

  const userInitials = getInitials(user.name, user.email);

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <header className="sticky top-0 bg-card/80 backdrop-blur-lg border-b border-border z-30">
        <nav className="container mx-auto px-6 lg:px-8 py-3 flex justify-between items-center">
          <Link href="/dashboard" className="flex items-center gap-2">
            <h1 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-hero">
              SketchBoard
            </h1>
          </Link>
          <div className="flex items-center gap-4">
            <LogoutButton />
            {/* User Avatar JSX is now inlined here */}
            <div 
              className="w-9 h-9 rounded-full bg-primary/20 flex items-center justify-center border border-primary/30"
              title={user.name || user.email} // Tooltip shows full name/email on hover
            >
              <span className="text-sm font-semibold text-primary">{userInitials}</span>
            </div>
          </div>
        </nav>
      </header>
      <main className="flex-grow">
        {children}
      </main>
    </div>
  );
}