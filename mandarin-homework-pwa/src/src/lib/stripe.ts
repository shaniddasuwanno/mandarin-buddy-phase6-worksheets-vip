import 'server-only';
import Stripe from 'stripe';
export const LIFETIME_AMOUNT=39900;
export const LIFETIME_CURRENCY='thb';
export const PRODUCT_KEY='mandarin-buddy-lifetime-v1';
export function stripeClient(){const key=process.env.STRIPE_SECRET_KEY;if(!key)throw new Error('Stripe is not configured');return new Stripe(key);}
export function appOrigin(){const raw=process.env.NEXT_PUBLIC_APP_URL;if(!raw)throw new Error('App URL is not configured');const url=new URL(raw);if(url.protocol!=='https:'&&!(url.protocol==='http:'&&['localhost','127.0.0.1'].includes(url.hostname)))throw new Error('HTTPS app origin required');return url.origin;}
