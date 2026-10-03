import type { Metadata } from 'next';
import { Cinzel_Decorative, Poppins, Tiro_Devanagari_Hindi } from 'next/font/google';
import './globals.css';
import { LangProvider, LocalizationProvider } from '@/locales';
import { Toaster } from 'sonner';

const poppins = Poppins({
  variable: '--font-poppins',
  subsets: ['latin'],
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
});

const cinzelDecorative = Cinzel_Decorative({
  variable: '--font-cinzel-decorative',
  subsets: ['latin'],
  weight: ['700'],
});

const tiroDevanagari = Tiro_Devanagari_Hindi({
  variable: '--font-tiro-devanagari',
  subsets: ['latin', 'devanagari'],
  weight: ['400'],
});

export const metadata: Metadata = {
  title: 'The Wedding of Chayan & Divya',
  description:
    'Join us in celebrating the union of Chayan and Divya. Discover our love story, wedding details, and more.',
  // iOS Safari/Chrome otherwise auto-underline addresses and dates and open a
  // Maps/Calendar sheet on tap; we provide our own map links and tel: links.
  formatDetection: { telephone: false, address: false, date: false, email: false },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${poppins.variable} ${cinzelDecorative.variable} ${tiroDevanagari.variable} antialiased`}>
        <LangProvider>
          <LocalizationProvider>
            {children}
            <Toaster />
          </LocalizationProvider>
        </LangProvider>
      </body>
    </html>
  );
}
