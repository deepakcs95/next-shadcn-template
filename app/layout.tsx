import { ClerkProvider } from "@clerk/nextjs";
import "./globals.css";
import { auth } from "@clerk/nextjs/server";
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body>{children}</body>
      </html>
    </ClerkProvider>
  );
}
