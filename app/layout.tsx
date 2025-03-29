import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { ThemeProvider } from '@/components/theme-provider';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Sai Gawand Portfolio',
  description: 'A modern cyberpunk portfolio showcasing my work and skills',
  icons: {
    icon: '/portfolio.png',
    shortcut: '/portfolio.png',
    apple: '/portfolio.png',
    other: {
      rel: 'apple-touch-icon-precomposed',
      url: '/portfolio.png',
    },
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem={false}
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
