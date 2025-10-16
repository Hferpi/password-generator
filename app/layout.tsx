import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";

const poppins = Poppins({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  weight: ["200", "400", "500", "800"],
});



export const metadata: Metadata = {
  title: "Password Manager",
  description: "App to save and manage your passwords",
  manifest: "/manifest.json",
  icons :{
    icon: "/images/icon_app.png"
  },
  keywords: ["password manager", "security", "encrypted passwords", "productivity"],
  creator: "Hferpi",
openGraph: {
  title: "Password Manager",
  description: "Securely save and manage your passwords",
  url: "https://passvaultsafe.vercel.app",
  siteName: "PassVaultSafe",
  images: [
    {
      url: "/og-image.png",
      width: 1200,
      height: 768,
    },
  ],
  locale: "es_ES",
  type: "website",
},

twitter: {
  card: "summary_large_image",
  title: "Password Manager",
  description: "Securely save and manage your passwords",
  images: ["/og-image.png"],
  creator: "@Hferpi",
},

};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body
        className={`${poppins.variable} antialiased`}
      >
        {children}
        <Toaster />
      </body>
    </html>
  );
}
