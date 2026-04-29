import type { Metadata } from "next";
import "./globals.css";
import { AuthProvider } from "@/context/AuthContext";
import { Toaster } from "react-hot-toast";

export const metadata: Metadata = {
  title: "Patitas Urbanas - Comunidad de Mascotas",
  description: "Comparte consejos, recetas y guarderías para tus mascotas en una comunidad",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body>
        <AuthProvider>
          <Toaster
            position="top-center"
            toastOptions={{
              style: {
                borderRadius: '12px',
                background: '#fff',
                color: '#2E2E2E',
                fontFamily: 'Inter, sans-serif',
              },
            }}
          />
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}
