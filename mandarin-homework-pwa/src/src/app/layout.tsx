import type { Metadata, Viewport } from 'next';
import './globals.css';
export const metadata:Metadata={title:'Mandarin Buddy | เพื่อนจีน',description:'Mandarin homework companion for Thai primary school families',applicationName:'Mandarin Buddy'};
export const viewport:Viewport={width:'device-width',initialScale:1,viewportFit:'cover',themeColor:'#047857'};
export default function RootLayout({children}:{children:React.ReactNode}){return <html lang="th"><body>{children}</body></html>;}
