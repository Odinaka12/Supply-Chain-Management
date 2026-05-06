"use client"; 
import "./globals.css";

// ---INTERNAL IMPORT
import {TrackingProvider} from "../Conetxt/SupplyChain";
import {NavBar, Footer} from "../Components";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="min-h-full flex flex-col">
        <TrackingProvider>
          <NavBar />
          {children}
        </TrackingProvider>
        <Footer/> 
      </body>
    </html>
  );
}
