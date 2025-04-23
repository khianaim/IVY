"use client"; // Ensure client-side rendering

import { useState, useEffect } from "react";
import { isAuthenticated, signOut } from "@/lib/actions/auth.action";
import { usePathname, useRouter } from "next/navigation";

const Navbar = () => {
  const [isUserAuthenticated, setIsUserAuthenticated] = useState<boolean | null>(null);
  const [isSigningOut, setIsSigningOut] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    const checkAuth = async () => {
      const auth = await isAuthenticated();
      setIsUserAuthenticated(auth);

      if (auth && pathname === "/") {
        router.replace("/dashboard");
      } 
      // Allow access to sign-in and sign-up pages
      else if (!auth && pathname !== "/" && pathname !== "/sign-in" && pathname !== "/sign-up"&& pathname !== "/interviewnosign") {
        router.replace("/");
      }
    };

    checkAuth();
  }, [pathname, router]);

  const handleSignOut = async () => {
    setIsSigningOut(true);
    await signOut();
    setIsUserAuthenticated(false);
    setIsSigningOut(false);
    router.push("/");
  };

  if (isUserAuthenticated === null) return null; // Prevent UI flicker

  const handleNavigate = (path: string) => {
    router.push(path);
  };

  return (
    <>
    {/* Navbar for Sign Up Page*/}
{pathname === "/sign-up" && !isUserAuthenticated && (
  <nav className="fixed top-2 left-2 flex items-center justify-between bg-transparent shadow-lg px-6 py-2 w-full max-w-[400px]">
    <ul className="flex gap-4">
      <button onClick={() => handleNavigate("/")} className="btn-primary glow-text">
        Home
      </button>
    </ul>
  </nav>
)}

{/* Navbar for Sign In Page */}
{pathname === "/sign-in" && !isUserAuthenticated && (
  <nav className="fixed top-2 left-2 flex items-center justify-between bg-transparent shadow-lg px-6 py-2 w-full max-w-[400px]">
    <ul className="flex gap-4">
    <button onClick={() => handleNavigate("/")} className="btn-primary glow-text">
        Home
      </button>
    </ul>
  </nav>
)}
    
      {/* Navbar for the dashboard (Start New Interview / Sign Out) */}
      {pathname === "/dashboard" && isUserAuthenticated && (
        <nav className="fixed top-2 -right-20 flex items-center justify-between bg-transparent shadow-lg px-6 py-2 w-full max-w-[400px]">
          <ul className="flex">
            <button onClick={() => handleNavigate("/interview")} className="btn-primary glow-text">
              Start New Interview
            </button>
            <button onClick={handleSignOut} className="btn-primary glow-text">
              {isSigningOut ? "" : "Sign Out"}
            </button>
          </ul>
        </nav>
      )}

      {/* Navbar for the Interview page */}
      {(pathname === "/interview" || pathname.startsWith("/interview/")) && isUserAuthenticated && (
        <nav className="fixed top-2 -right-53 flex items-center justify-between bg-transparent shadow-lg px-6 py-2 w-full max-w-[400px]">
          <ul className="flex">
            <button onClick={() => handleNavigate("/dashboard")} className="btn-primary glow-text">
              Dashboard
            </button>
          </ul>
        </nav>
      )}
    </>
  );
};

export default Navbar;

