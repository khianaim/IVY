import Navbar from "@/components/navbar";
import React from "react";

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="root-layout">
      <Navbar /> 
     

      {/* Main Content */}
      <main>{children}</main>
    </div>
  );
};

export default RootLayout;
