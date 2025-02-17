
import Navigation from "@/components/userNav";

export default function RootLayout({ children }) {
    return (
      <html lang="en">
        <body
          className={``}
        >
          <Navigation />
          {children}
        </body>
      </html>
    );
  }
  