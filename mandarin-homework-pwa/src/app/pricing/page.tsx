'use client';
import Link from 'next/link';
import { useEffect,useState } from 'react';
import Header from '@/components/shell/Header';
import PricingSection from '@/components/PricingSection';
import { useAppLanguage } from '@/lib/useAppLanguage';
export default function PricingPage(){const [lang,setLang]=useAppLanguage();const [combo,setCombo]=useState(false);useEffect(()=>setCombo(new URLSearchParams(window.location.search).get('plan')==='combo_all'),[]);return <div className="kids-app min-h-dvh"><Header language={lang} onLanguageChange={setLang}/><main className="mx-auto max-w-5xl px-3 py-5"><Link href="/" className="mb-4 inline-block text-sm font-bold text-emerald-800">← {lang==='th'?'กลับสู่แอป / เข้าสู่ระบบ':'Back to app / sign in'}</Link><PricingSection key={combo?'combo':'pricing'} lang={lang} initialPlan={combo?'combo_all':undefined}/></main></div>}
