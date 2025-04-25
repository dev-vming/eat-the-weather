import './globals.css';
import { Navbar } from './components/NavBar';
import QueryProviders from '@/providers/QueryProvider';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

export const metadata = {
  title: 'Eat The Weather',
  description: '날씨 기반 커뮤니티 서비스',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko">
      <body className="bg-gradient-to-b from-sky-100 to-white min-h-screen flex flex-col items-center pt-[env(safe-area-inset-top)]">
        <div className="w-full max-w-md bg-white min-h-screen shadow-md relative z-10 ">
          <QueryProviders>
            {children}
            <ReactQueryDevtools initialIsOpen={false} />
          </QueryProviders>
        </div>
        <Navbar />
      </body>
    </html>
  );
}
