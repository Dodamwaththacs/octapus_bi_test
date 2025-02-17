import React from "react";
import Navigation from "@/components/adminNav";

export default function RootLayout({ children }) {
    return (
      <html lang="en">
        <body>
          <Navigation />
          {children}
        </body>
      </html>
    );
  }
  