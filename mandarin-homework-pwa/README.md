# Mandarin Buddy / เพื่อนจีน — Phase 7 (Cartoon theme & sequential calligraphy)

An original mobile-first bilingual Mandarin learning app for Thai parents and primary pupils. Thai is default; the toggle persists locally. The original five learning modules and sixth printable Worksheet Hub are integrated behind server-verified access. Explore has 60 original starter words; Dictation has ten-word rounds and Smart Review; Games has six mini-games; Homework uses AI; Progress records actual activity. The code is ready to configure and test; no live service is connected by default.

## Phase 7: cartoon learning experience

- Cream, sky blue, mint and sunny yellow theme, chunky pressable controls, distinct grade badge colours, and inline SVG panda mascot. Print styling remains separate for clean A4 worksheets.
- `WordCartoonIllustration.tsx` maps each original vocabulary word to a concept-specific original SVG and adds family, fruit and direction scenes. Tap a picture to replay movement, hear Mandarin via browser speech synthesis, and hear a short synthesized chime (no external audio or image assets). Users with reduced-motion preferences get a static final position; Mandarin voice availability depends on their device.
- The separate **Cartoons / การ์ตูน** bonus deck contains 19 practice cards (17 new words plus father and mother), including siblings, grandparents, puppy, fruits, and all seven directions plus 前后. The core 60 vocabulary entries, tests, 60 worksheet sets, IDs and progress definitions remain unchanged. All 77 distinct words are covered by 117 locally bundled stroke files. The P1 and P4 handwriting game also offers relevant bonus words.
- Explore and Games share `SequentialWordWriting.tsx`: during animation or tracing, exactly one character position is active, marked with a glowing border; completion moves automatically to the next character. Repeated characters are separate positions. Only completed tracing records activity, not watching the demo.
- Paywall is now **VIP redemption + seller contact** only. The old Stripe payment button is removed. Configure `NEXT_PUBLIC_LINE_URL` and `NEXT_PUBLIC_MESSENGER_URL` to show the actual seller links, or the app displays an unconfigured notice. The existing Stripe server endpoints/webhook remain intact for legacy payments, and existing paid entitlements still work. No SQL migration or auth/entitlement changes are needed for Phase 7. Manual VIP sales do not require configuring Stripe.
- `npm run test:cartoons` verifies scene coverage, local strokes, family and direction mappings, and the VIP/contact paywall. Continue running the Phase 6 regression tests.

## Phase 6: plans, VIP codes and printable worksheets

| Plan | Price (THB) | App | Worksheet entitlement |
| --- | ---: | --- | --- |
| `app_only` | 399 | Lifetime, P1–P6 | Set 1 sample for each grade |
| `worksheets_only` / `P1`–`P6` | 149 | Not included | 10 sets in the purchased grade, 1 year from redemption |
| `worksheets_only` / `ALL` | 599 | Not included | All 60 sets, 1 year from redemption |
| `combo_all` | 899 | Lifetime, P1–P6 | All 60 sets, lifetime |

The combo is a one-payment full purchase (฿899, compared with ฿998 for separately buying App + all-grade worksheet pack). No automatic prorated credit for earlier purchases is applied. An annual renewal extends that grade by one year from the later of now or its present expiry; lifetime grants never become annual. The legacy app-only Stripe checkout backend remains at the original ฿399 price, but Phase 7 removes its paywall button in favour of manual VIP purchases.

### Configure the manual VIP store

1. **Apply `supabase/migrations/0004_vip_worksheets.sql` after 0001–0003.** If you are upgrading Phase 5, run only 0004. This project did not previously contain `access_codes` or an admin generator, so the migration creates the table with `plan_type` and `grade_access`. If you have a separately built external table of the same name, back it up and reconcile the schema before applying this migration; do not drop existing data.
2. Register and confirm your **seller/admin** account in the app. Copy its Supabase Auth UID from Authentication → Users and configure server-only `VIP_ADMIN_USER_IDS` (comma-separated UUIDs). Only those authenticated, email-confirmed accounts can access `/admin` or generate codes. No buyer can generate their own code.
3. Configure `NEXT_PUBLIC_LINE_URL` and `NEXT_PUBLIC_MESSENGER_URL` with your actual official seller chat HTTPS URLs before building. The pricing screen shows an explicit unconfigured state until chat URLs are supplied. Do not send customers to placeholder accounts.
4. On `/pricing`, buyers choose the ฿399 plan, ฿149/grade or ฿599/all-grade worksheet plan, or ฿899 combo. The instruction modal gives the corresponding Thai/EN order message, chat links, payment and VIP redemption steps. This is **manual payment verification**: privately send the correct merchant QR, check the funds actually arrived in your bank account, then issue the code. No automatic payment is claimed for the manual packages and no QR or money transfer is performed by this app.
5. Open `/admin`, select the purchased plan and grade, check the confirmed-payment box only once the actual payment has settled, then generate. Copy the one-time-displayed Thai welcome message and send it privately to the buyer. Codes are random, stored only as SHA-256 hashes, not recoverable after closing the generator, and redeemable once by a single authenticated account. Repeated redemption by the same account does not extend access. If a code is lost, verify the original sale before issuing a replacement and invalidate any unused original in the database through your trusted admin process.
6. Buyer registers/signs in, clicks **ใช้รหัส VIP / Redeem VIP Access Code**, enters the code, and is automatically redirected/refreshed into the correct access. A worksheets-only customer sees the Worksheet tab; an app customer sees all six tabs. Worksheet access is checked server-side on each request. Expired annual grants do not open worksheets; the app-only preview remains available if the account also has lifetime app access.

### Worksheet contents and testing

All 60 original supplementary A4 sets contain 501 assessed questions with Chinese, Thai and English prompts, a bilingual parent guide, and an optional answer-key page. There are 10 per grade (4 Mandarin, 3 maths, 3 science; totals 24, 18, 18). The Mandarin sheets contain picture vocabulary, tone marks, reference/faint-trace/blank Tianzi Ge cells, stroke counts derived from bundled handwriting data, and fill-in-the-blanks. Maths covers numerals, addition/subtraction and comparison; science covers grade-appropriate terms, matching and true/false with explanations. The hub filters grades and subjects and uses browser print/Save PDF with A4 styles; answer keys start on a separate printed page. These are supplementary educational materials, not an official accredited curriculum.

The client receives catalog titles only; the substantive worksheet data is server-only and returned after `/api/worksheets` checks active grade grants. This does not prevent copying or sharing a purchased printed/downloaded page. Run `npm run test:vip`, `npm run test:worksheets`, `npm run test:study`, `npm run test:paywall`, `npm run typecheck`, and `npm run build` before launch. Test real Supabase authentication, seller chat links and a manual QR purchase using your own configured accounts.

## Phase 5 learning upgrade

- All 60 existing vocabulary records and IDs are preserved, with two bilingual example sentences each, Thai/English memory mnemonics, and 49 app-selected mandatory-writing words. This is a starter practice curriculum, not a verified official Thai Ministry mandatory-writing list.
- The Explore unit contains a mandatory-character pill bar, three modes (Study, Quick Unit Quiz, Worksheet), Tianzi Ge grids, Mandarin word and sentence audio, real Hanzi Writer stroke-order animations and interactive per-character quizzes, two examples, memory tips, word navigation and a selectable word list. The worksheet prints a clean A4 handwriting sheet with a reference character and four blank practice grids per row. Use the print dialog's Save as PDF option for a digital handout.
- The six-game arcade has live selected-grade word counts: Listen & Pick, Match Cards, Build Word (all multi-character entries), Build Sentence (ten sentence puzzles per grade plus two three-sentence story ordering tasks per grade in P4–P6), Falling Word Rain (ten targets, 3 lives, 10 points per correct catch), and Write Characters. The prior quick quiz lives in Explore instead of the arcade. All successful tracing and other assessed game activities still contribute to the existing dashboard's local activity/streak tracking; dictation mastery remains unchanged.
- `public/hanzi/` contains the 101 unmodified character data JSON files needed by the starter vocabulary, served by the app instead of an external CDN. Their original Arphic Public License and attribution are retained alongside the data (`ARPHICPL.TXT` and upstream `README.md`). To expand vocabulary, include the relevant additional character data and license. Local stroke assets remove the external-CDN dependency, but the app still requires connectivity for authenticated access and initial asset loading; full offline PWA support is not implied.
- Run `npm run test:study` to validate word and sentence completeness, stroke assets and puzzle coverage. Run `npm run test:paywall` to verify the existing payment flow remains intact. Phase 5 preserved auth and payment; Phase 6 adds the VIP access gate while retaining the existing Stripe checkout/webhook.

## Phase 4: commercial setup and legacy Stripe test checklist

1. Install Node.js LTS, extract the project, run `npm ci`.
2. Create a Supabase project. In its SQL editor run `supabase/migrations/0001_initial.sql`, then `0002_homework_quota.sql`, then `0003_lifetime_paywall.sql`, then `0004_vip_worksheets.sql`, once each and in that order. If using an existing project, run only the migrations not yet applied. Resolve any duplicate legacy pending purchases before the unique index is added.
3. Enable email/password sign-in and registration with email verification in Supabase Auth. Set Site URL to your exact app origin, and add `http://localhost:3000/auth/callback` and your production HTTPS `/auth/callback` to allowed redirect URLs. Use the default confirmation URL template for PKCE (open the link on the same device/browser). Configure production email delivery before launch.
4. Optional legacy Stripe integration only: use a Stripe account eligible for Thailand PromptPay. Phase 7 offers manual VIP purchases, so no Stripe setup is needed for that flow. Never treat a screenshot alone as proof of payment.
5. Copy `.env.example` to `.env.local`. Fill Supabase URL and publishable key, server-only service role key, Stripe **test** secret key, Stripe webhook signing secret, app origin, and OpenAI API key. Public Next.js vars need to be configured before the build. Keep `SUPABASE_SERVICE_ROLE_KEY`, `STRIPE_SECRET_KEY`, `STRIPE_WEBHOOK_SECRET`, and `OPENAI_API_KEY` private. Do not commit `.env.local` or use NEXT_PUBLIC secret keys.
6. Run `npm run dev`. Register, confirm email, sign in. Unpaid accounts get the Thai/EN VIP-only paywall; paid access cannot be enabled by URL query parameters. For optional legacy Stripe webhook testing, the Stripe CLI can forward events with `stripe listen --forward-to localhost:3000/api/webhook`. The Phase 7 UI no longer launches Stripe checkout.
7. In production, create the Stripe webhook endpoint `https://YOUR-DOMAIN/api/webhook` and subscribe to `checkout.session.completed`, `checkout.session.async_payment_succeeded`, `checkout.session.async_payment_failed`, and `checkout.session.expired`. Use that endpoint's signing secret, not the CLI secret. Deploy HTTPS only. Keep test and live Stripe keys, signing secret, and ideally Supabase projects separate. Test with a fresh unpaid parent, a successful payment, a cancellation, and duplicate event deliveries before enabling live mode.
8. Run `npm run test:paywall` (mock Stripe/Supabase, real Stripe signature verification), `npm run typecheck`, `npm run build`. Confirm live account setup and sandbox results separately.

### Access and payment guarantees

* The server page validates Supabase user identity and `profiles.is_paid` or active worksheet grants before mounting the appropriate app modules. The paywall has no bypass or close action; sign out remains available. Paid users are rechecked on window focus and periodically. AI access still requires the paid app entitlement.
* Legacy checkout uses a server-fixed price, verified user ID, same-origin request, unique pending purchase per user and open-session reuse. A return URL's `payment=success` is never proof of payment. The VIP paywall offers a manual check-access button; the server remains authoritative.
* A signature-verified webhook retrieves Stripe's canonical Checkout Session and PaymentIntent, verifies the amount/currency/product/customer account and successful payment, then calls the restricted `fulfill_lifetime_purchase` DB function. Purchase, event receipt, entitlement and `profiles.is_paid` update occur atomically. Duplicate events are safe. Failed/expired sessions do not unlock access. Unconfirmed open sessions may be reused to reduce duplicate payments.
* For a full refund, operational support should confirm refund success in Stripe and mark the associated purchase refunded and the corresponding entitlement revoked in Supabase (only revoke if there is no other valid paid purchase); the DB trigger changes the profile flag to false. Automated refund synchronization is not included. Publish refund terms and the AI fair-use allowance before launch. PromptPay is a bank QR workflow and repeat scans must be avoided.
* Existing vocabulary is compiled into client code, so this is a server-checked application gate, not DRM for downloadable JavaScript. For a stronger content paywall, migrate sensitive curriculum to the RLS-gated `vocabulary` table and load through authenticated server calls; do not treat bundled data as secret. Progress is locally stored per parent account, not cloud synced; unauthenticated preview records are intentionally not assigned to a newly signed-in parent.

### Phase 3 implementation

* `src/components/tabs/GamesTab.tsx` — six playable games, using selected-grade vocabulary; in Phase 5 Hanzi Writer uses bundled character data instead of its default remote data provider.
* `src/components/tabs/HomeworkTab.tsx` — file picker and mobile camera, resize/re-encode photo (removes EXIF), pasted text, output language selection, formatted response and Mandarin speech.
* `src/app/api/homework/route.ts` — server-only OpenAI Chat Completions API, images and text, structured JSON, validation, timeout, access and quota checks. Worksheet contents not saved by this app. Input is sent to OpenAI; provider data handling applies.
* `src/components/tabs/ProgressTab.tsx` — actual local activity, Bangkok-date streak, mastered words (two consecutive correct dictation self-checks), dictation accuracy, game activities, and weak-word shortcut to Smart Review.
* `src/lib/learningProgress.ts` — local progress store. Historical Phase 2 review words carry over; old dictation scores were not recorded and cannot be retroactively reconstructed.
* `supabase/migrations/0002_homework_quota.sql` — atomic per-parent daily allocation (10 attempted API calls, Bangkok date). Run after 0001.

### Enable homework

Set `OPENAI_API_KEY` to your own API key and complete Phase 4 account/payment setup. Both development and production require a valid Supabase Auth cookie, paid profile and active entitlement, and consume the durable 10-request daily quota. The default model is the requested `gpt-4o-mini`; if unavailable for your API account, set `OPENAI_HOMEWORK_MODEL` to a supported vision and structured-output model. AI usage incurs separate API fees.

Request JSON: `{ "lang": "th", "text": "我喜欢猫。" }` or `{ "lang": "en", "image": "data:image/jpeg;base64,..." }`. Raw base64 is also accepted with `mimeType` (`image/jpeg`, `image/png`, or `image/webp`). Exactly one input is required; text up to 6000 characters, decoded images up to 3 MB. Returns `{ result: { extractedText, sentences: [{ hanzi, pinyin, translation, explanation }], steps, notes } }` or `{ error: "..." }` and an HTTP status. Production requires paid Supabase session, service-role RPC, and the OpenAI key.

### Phase 2 implementation

* `src/data/sampleVocab.ts` — types, stable word IDs and 60 original entries.
* `src/components/tabs/ExploreTab.tsx` — bilingual flashcards.
* `src/components/tabs/DictationTab.tsx` — ten-word rounds and Smart Review.
* `src/components/tabs/GradeSelector.tsx` — shared grade picker.
* `src/lib/useMandarinSpeech.ts` — shared browser TTS, voice selection and error handling.
* `src/components/PaidApp.tsx` — integrates all tabs with the global language and shared grade.

Missed words persist in browser localStorage, not the Supabase database yet. A correct self-check removes the word from review; a missed answer adds it without duplicates. The review round uses a fixed snapshot so removing a word never skips the next question. Switching tabs or grade starts a fresh round; the persistent review queue is retained. The initial starter vocabulary is educational sample content, not certified official curriculum alignment.

## Run

Use a recent supported Node.js LTS version. In this directory run `npm install`, `npm run dev`, and open http://localhost:3000. For production run `npm run typecheck` and `npm run build`. Copy `.env.example` to `.env.local` only when integrating services. Never put service keys in NEXT_PUBLIC variables.

## Folder structure (complete target architecture)

```
mandarin-homework-pwa/
├── package.json / tsconfig.json / tailwind.config.ts / postcss.config.mjs
├── .env.example
├── public/                    # planned: offline fallback, PNG icons, service worker
├── supabase/
│   ├── migrations/0001_initial.sql
│   ├── migrations/0002_homework_quota.sql
│   ├── migrations/0003_lifetime_paywall.sql
│   ├── migrations/0004_vip_worksheets.sql
│   └── seed.sql               # planned: reviewed curriculum and vocabulary
└── src/
    ├── app/
    │   ├── layout.tsx
    │   ├── globals.css
    │   ├── page.tsx            # server authorization gate
    │   ├── manifest.ts
    │   ├── icon.svg
    │   ├── auth/callback/route.ts
    │   └── api/
    │       ├── checkout/route.ts
    │       ├── webhook/route.ts
    │       ├── homework/route.ts
    │       ├── homework/upload/route.ts
    │       ├── dictation/route.ts
    │       └── learning/route.ts
    ├── data/sampleVocab.ts                  # 60 original starter words
    ├── components/
    │   ├── AuthGate.tsx
    │   ├── PaywallModal.tsx
    │   ├── PaidApp.tsx
    │   ├── shell/Header.tsx
    │   ├── shell/BottomNav.tsx
    │   ├── tabs/ExploreTab.tsx
    │   ├── tabs/DictationTab.tsx
    │   ├── tabs/GradeSelector.tsx
    │   ├── tabs/GamesTab.tsx
    │   ├── tabs/HomeworkTab.tsx
    │   └── tabs/ProgressTab.tsx
    ├── hooks/                                # planned: useSpeech, useLearner, useReview
    ├── lib/
    │   ├── translations.ts
    │   ├── useMandarinSpeech.ts
    │   ├── homeworkTypes.ts
    │   ├── learningProgress.ts
    │   ├── supabase/{browser,server}.ts
    │   ├── auth/entitlements.ts               # planned
    │   ├── stripe.ts
    │   ├── review.ts                          # planned
    │   └── curriculum.ts                      # planned
    └── types/database.ts                     # planned: generated Supabase types
```

## Data model and access

One parent login can manage multiple learner nicknames and grades. Each learner has independent sessions, progress, daily activity and homework. The database migration enables RLS, blocks direct writes to purchases, entitlements, scores and homework results, and gates paid curriculum content. Trusted server endpoints must independently verify both parent identity and learner ownership; service-role access bypasses RLS. Supabase Auth manages passwords. Apply the migration in a fresh project and test using separate authenticated users and anonymous clients before release.

## Payment implementation

The server uses a one-time THB 399 price (39900 satang) with the `promptpay` payment method and the verified parent ID; the webhook confirms payment and updates the entitlement and profile. Configure Stripe and Supabase as above. No live charges or external account changes have been performed by this project delivery.

## Curriculum and AI design

Grade, framework, level and version are separate so a Thai grade can map to more than one YCT/HSK unit. No claim of official ministry endorsement or completed alignment: review Thai curriculum documents and licensed YCT/HSK wordlists before publishing. The 60-word starter dataset is illustrative, not official grade content.

Homework AI is server-side with structured responses, input limits, image re-encoding, no app-side worksheet storage, and a daily quota. Before commercial release, publish a privacy notice covering AI processing and retention, test with redacted worksheets, review local child privacy obligations, and monitor cost. One-time lifetime pricing should not promise unlimited AI requests.

PWA manifest and an original icon are included. Full installability testing on Android/iOS, PNG/maskable icons, safe offline cache and service worker are planned. Do not cache account, payments, homework images or private responses. Browser speech depends on installed Mandarin voices; later use reviewed fallback audio if needed.

## Next phases

### Phase 13 — Complete Kindergarten to Primary 6 curriculum

The public `src/data/sampleVocab.ts` entry point now exports the complete curriculum registry and preserves the original starter vocabulary for the existing worksheet catalog and legacy review. The seven levels contain 680 authored vocabulary entries: Kindergarten 200 plus P.1–P.6 at 80 each. This resolves the earlier inconsistent 544 total without deleting content. The 56 weekly sets comprise eight Kindergarten sets of 25 words and 48 primary sets of 10 words; ten separate Kindergarten category reviews retain the original 20-word categories. The 60 original starter entries remain accessible and their progress history is preserved separately. Some vocabulary intentionally recurs across levels or categories as reinforcement. Study, Dictation and Games share the selected week during a session; Smart Review and the Progress dashboard support all levels. The upper-primary P.5/P.6 files contribute 160 new words and 320 contextual examples; P.6 also includes eight reading paragraphs with comprehension questions. P.4 and P.6 reading passages can be played and ordered in Games. All curriculum characters have local stroke data (717 distinct characters); existing detailed SVG scenes are retained and Kindergarten concept pictograms provide additional animated illustrations, not custom medical or anatomical diagrams. The original 60 paid printable worksheets remain restricted to P.1–P.6. The curriculum is original and informed by YCT 4 / traditional HSK 3 learning depth and SJK(C) literacy competencies; this does not claim official alignment or exam mastery. A native-speaking educator should review translations, Pinyin and pedagogy before commercial release. Run `npm run test:curriculum` to validate all weekly sets and data. No new SQL migrations or API keys are required.

### Phase 12 — Expanded weekly primary curriculum

The original 60-word starter decks remain selectable. The Study and Dictation tabs now offer eight weekly sets of ten words in each of P.1–P.4 (320 expanded primary entries); the learning progress tracker recognises all 380 original and expanded primary vocabulary IDs. P.3 and P.4 each include 80 new original words, two distinct contextual bilingual examples, dictation callouts, character-component memory tips, Thai moral lessons and weekly values. All P.3 contextual sentences are 7–15 Han characters, excluding punctuation. P.4 has eight original three-sentence reading passages with questions and answers. The Games and printable worksheet hub retain their existing starter-based activities. P.1/P.2 source modules and Kindergarten Part 2 are now saved in the project from the previously delivered source; Kindergarten Part 1 and the unified Kindergarten selector/illustration expansion are not yet integrated. New local stroke data is included for all 374 distinct expanded primary characters. No database migration or new API key is required. Run `npm run test:curriculum` for structural validation. The curriculum is original and inspired by KSSR SJK(C) language competencies and the YCT 3 learning level, not a reproduction of the national textbook list or an official YCT alignment. Native-speaking educator review is recommended before sale.

### Phase 10 — Global audio and Chinese numbers

The header's persisted speed controls select 0.65× (default) or 0.9× for standard Mandarin read-aloud, including study, example sentences, games, dictation's global listen button, homework, pinyin, songs and numbers. Dictation also retains explicit speed buttons; the chant's 0.6×/0.85×/1.1× controls override the global setting, and music melody tempo remains separate. The single-owner audio helper prioritizes suitable installed Mandarin voices and cancels existing playback before speaking; a newly started session interrupts a previous sequence, melody, tone demo or cartoon chime. Browser/OS voice quality and availability vary. 

Numbers includes 31 starter selections and every integer 0–10,000 via numeric entry, place-value counting visuals and bilingual number names. The chant includes all 81 equations (45 traditional smaller-factor-first recitations), including 二五一十 and 九九八十一, with row highlighting, speed selection, repeat mode and a full 9×9 grid. Run `npm run test:numbers` to verify conversion, recitation and speech-session logic; no additional database migration or API key is required.

### Phase 9 — Panda & Friends song lab (Kindergarten / P.1)

Eight famous-song references open eight Panda practice cards with 36 complete bilingual practice lines, music-box synthesis, synchronized highlighted lyrics, individual and sequential Mandarin speech, speed control, eight SVG scenes, and gentle moral takeaways. Two use familiar traditional melodies (Frère Jacques / Two Tigers and Happy Birthday / Good Morning to All); the remaining six use original practice lyrics and music, explicitly labelled rather than misrepresented as the famous songs. Review local rights and obtain appropriate licenses before adding any protected song's exact lyrics, melody or arrangement to the commercial product. The data schema can house authorized lyrics and notes. Sources for traditional tunes are listed in the data. All music, narration and animated scenes run inside the Songs tab; external video links and navigation have been removed. No API keys, SQL migrations, or changes to VIP authorization are required. Run `npm run test:songs` to check notes, line alignment, timeline and speed.

### Phase 8 — Pinyin mouth and blending lab

The paid app navigation now includes Pinyin (พินอิน). The lab provides all 21 requested initials and 15 requested finals, 221 valid combinations in this inventory, 442 original Thai/English example cards, animated front and side-view articulation guides, and four interactive panda pitch tracks. It handles ü spelling after j/q/x and the special apical i syllables. This is a focused inventory, not every Mandarin final (for example, ia, ie, and uang are outside this lab's requested inventory).

The 554 included spoken tone examples use the device's Mandarin speech synthesis. For tone/syllable pairs without a reliable included word sample, the lab explicitly uses a musical pitch contour rather than inventing a spoken Mandarin syllable. Examples include neutral-tone and rare forms; contextual pronunciations and tone sandhi should be checked with a native-speaking educator before commercial release. Audio quality and voice availability vary by device. No new service keys, APIs or SQL migration are needed. Run `npm run test:pinyin` to verify the blend matrix, example matching and tone notation.

1. Configure Supabase and test Stripe sandbox checkout/webhook, then verify live eligibility.
2. Expand and review Thai MOE/YCT/HSK curriculum content.
3. Sync learning records by parent/learner in Supabase, add review scheduling.
4. End-to-end paid access and real homework API tests with a configured test account.
5. Installability, privacy, accessibility, security tests and production launch.
