import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: '中国全国咖啡店地图',
  description: '年轻潮流风格的全国咖啡探索地图'
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="zh-CN">
      <body>{children}</body>
    </html>
  );
}
