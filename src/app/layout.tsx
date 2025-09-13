import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "ToDo App By EricDev99",
    description:
    "Une application de liste de tâches simple et intuitive développée avec Next.js et React. Ajoutez, complétez et supprimez vos tâches facilement. Vos données sont sauvegardées automatiquement dans votre navigateur grâce au localStorage.",
  keywords: [
    "Todo App",
    "Gestionnaire de tâches",
    "Liste de tâches",
    "Next.js",
    "React",
    "Productivité",
    "Organisation",
    "localStorage"
  ],
  authors: [{ name: "Ton Nom" }],
  openGraph: {
    title: "Todo App - Gestionnaire de tâches simple",
    description:
      "Organisez vos tâches quotidiennes facilement avec cette application intuitive développée avec Next.js et React.",
    url: "https://todo-app-EricDev99.vercel.app",
    siteName: "Todo App",
    images: [
      {
        url: "https://ton-url.vercel.app/og-image.png", // image d’aperçu
        width: 1200,
        height: 630,
        alt: "Aperçu Todo App",
      },
    ],
    locale: "fr_FR",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
