import React from "react";
import Navbar from "@/components/Navbar"; 

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
