'use client';
import { useEffect, useRef, useState } from 'react';

/** Call speak directly from a button click for iOS/Android compatibility. */
export function useMandarinSpeech() {
  const [error, setError] = useState(false);
  const [speaking, setSpeaking] = useState(false);
  const current = useRef<SpeechSynthesisUtterance | null>(null);

  function stop() {
    current.current = null;
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) window.speechSynthesis.cancel();
    setSpeaking(false);
  }

  useEffect(() => () => {
    current.current = null;
    if ('speechSynthesis' in window) window.speechSynthesis.cancel();
  }, []);

  function speak(text: string, rate = 1) {
    stop();
    setError(false);
    if (!('speechSynthesis' in window) || !('SpeechSynthesisUtterance' in window)) {
      setError(true); return;
    }
    const synth = window.speechSynthesis;
    const voices = synth.getVoices();
    const voice = voices.find(v => /^zh[-_]CN$/i.test(v.lang)) ?? voices.find(v => /^zh[-_]Hans/i.test(v.lang)) ?? voices.find(v => /^zh[-_]TW$/i.test(v.lang));
    // Some browsers initially return an empty voice list; lang lets the browser choose automatically.
    if (voices.length > 0 && !voice) { setError(true); return; }
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'zh-CN';
    utterance.rate = rate;
    if (voice) utterance.voice = voice;
    current.current = utterance;
    utterance.onend = () => { if (current.current === utterance) { current.current = null; setSpeaking(false); } };
    utterance.onerror = (event) => { if (current.current === utterance) { current.current = null; setSpeaking(false); if (event.error !== 'canceled' && event.error !== 'interrupted') setError(true); } };
    setSpeaking(true);
    try { synth.speak(utterance); } catch { current.current = null; setSpeaking(false); setError(true); }
  }
  return { speak, stop, error, speaking };
}
