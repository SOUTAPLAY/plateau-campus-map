import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'キャンパスマップ',
  description: 'Project PLATEAUを使った明星大学3Dキャンパスマップ＋時間割アプリ',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <body className="bg-white antialiased">{children}</body>
    </html>
  );
}
