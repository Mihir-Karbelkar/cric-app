import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { ThemeProvider } from '@cric-app/components/providers/theme-provider';
import { MainNav } from '@cric-app/composables/main-nav';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Cric App',
  description: 'Browse a curated list of cricket players and their details.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <MainNav />
          <div className="container">{children}</div>
        </ThemeProvider>
      </body>
    </html>
  );
}
