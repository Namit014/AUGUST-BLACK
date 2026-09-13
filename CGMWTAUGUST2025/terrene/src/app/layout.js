import "./globals.css";
import ClientLayout from "@/client-layout";
import TopBar from "@/components/TopBar/TopBar";

export const metadata = {
  title: "CONEKT | AI-Powered PCB Design & EDA Platform",
  description: "Next-generation AI-driven Electronic Design Automation (EDA) platform for intelligent schematic capture, automated PCB routing, and component discovery.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body suppressHydrationWarning>
        <ClientLayout>
          <TopBar />
          {children}
        </ClientLayout>
      </body>
    </html>
  );
}
