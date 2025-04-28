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
      {/* Navbar for Sign Up Page */}
      {pathname === "/sign-up" && !isUserAuthenticated && (
        <nav className="fixed top-2 left-2 flex items-center justify-between bg-transparent shadow-lg px-6 py-2 w-full max-w-[400px]">
          <ul className="flex flex-row gap-4">
            <button
              onClick={() => handleNavigate("/")}
              className="cursor-pointer rounded-full px-4 py-1 text-white font-semibold text-base sm:text-lg md:text-xl glow-text"
            >
              Home
            </button>
          </ul>
        </nav>
      )}

      {/* Navbar for Sign In Page */}
      {pathname === "/sign-in" && !isUserAuthenticated && (
        <nav className="fixed top-2 left-2 flex items-center justify-between bg-transparent shadow-lg px-6 py-2 w-full max-w-[400px]">
          <ul className="flex flex-row gap-4">
            <button
              onClick={() => handleNavigate("/")}
              className="cursor-pointer rounded-full px-4 py-1 text-white font-semibold text-base sm:text-lg md:text-xl glow-text"
            >
              Home
            </button>
          </ul>
        </nav>
      )}

    {/* Navbar for the Dashboard */}
    {pathname === "/dashboard" && isUserAuthenticated && (
   <nav className="fixed top-2 left-0 right-0 flex items-center justify-between bg-transparent shadow-lg px-6 py-2 w-full">
     {/* Logo on the left */}
      <div className="flex items-center">
        <img
          src="logo.png"
          alt="Logo"
          className="h-8 mr-4"></img>
          </div>
          {/* Buttons on the right */}
          <ul className="flex flex-row gap-4 ml-auto">
            <button
              onClick={() => handleNavigate("/interview")}
              className="cursor-pointer rounded-full px-4 py-1 text-white font-semibold text-base sm:text-lg md:text-xl glow-text"
            >
              Begin Interview
            </button>
            <button
              onClick={handleSignOut}
              className="cursor-pointer rounded-full px-4 py-1 text-white font-semibold text-base sm:text-lg md:text-xl glow-text"
            >
              {isSigningOut ? "" : "Sign Out"}
            </button>
          </ul>
        </nav>
      )}


      {/* Navbar for the Interview page */}
      {pathname === "/interview" && isUserAuthenticated && (
        <nav className="fixed top-4 right-0 flex items-center justify-between bg-transparent shadow-lg px-6 py-2">
          <ul className="flex flex-row gap-4">
            <button
              onClick={() => handleNavigate("/dashboard")}
              className="cursor-pointer rounded-full px-4 py-1 text-white font-semibold text-base sm:text-lg md:text-xl glow-text"
            >
              Dashboard
            </button>
          </ul>
        </nav>
      )}
    </>
  );
};

export default Navbar;