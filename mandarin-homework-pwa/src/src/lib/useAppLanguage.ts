'use client';
import { useEffect,useState } from 'react';
import type { Language } from './translations';
export function useAppLanguage(){const [lang,setLang]=useState<Language>('th');useEffect(()=>{try{const v=localStorage.getItem('mb-language');if(v==='th'||v==='en')setLang(v)}catch{}},[]);useEffect(()=>{document.documentElement.lang=lang},[lang]);return [lang,(value:Language)=>{setLang(value);try{localStorage.setItem('mb-language',value)}catch{}}] as const;}
