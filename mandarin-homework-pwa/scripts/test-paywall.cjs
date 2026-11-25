// No network calls and no real payments. Exercise route logic with mocked Supabase/Stripe,
// while using Stripe's own implementation for raw-body signature verification.
const assert=require('node:assert/strict');
const fs=require('node:fs');const path=require('node:path');const ts=require('typescript');
const Stripe=require('stripe');const {NextRequest}=require('next/server');
const root=path.resolve(__dirname,'..');
function load(file,mocks){const js=ts.transpileModule(fs.readFileSync(path.join(root,file),'utf8'),{compilerOptions:{module:ts.ModuleKind.CommonJS,target:ts.ScriptTarget.ES2022,jsx:ts.JsxEmit.ReactJSX,esModuleInterop:true}}).outputText;const m={exports:{}};new Function('require','module','exports',js)(id=>id in mocks?mocks[id]:require(id),m,m.exports);return m.exports;}
const id='11111111-2222-4333-8444-555555555555';const product='mandarin-buddy-lifetime-v1';const origin='http://localhost:3000';
const metadata={user_id:id,product};let user={id,email:'parent@example.test'};let paid=false,pending=null,created=null,inserted=null,fulfilled=[],failed=false;const realStripe=new Stripe('sk_test_not_a_real_key');
let session={id:'cs_test_example',url:'https://checkout.stripe.com/test',status:'complete',mode:'payment',payment_status:'paid',amount_total:39900,currency:'thb',client_reference_id:id,metadata,payment_method_types:['promptpay'],payment_intent:{id:'pi_test',status:'succeeded',amount_received:39900,currency:'thb',metadata,payment_method_types:['promptpay']}};
const stripe={webhooks:realStripe.webhooks,checkout:{sessions:{retrieve:async()=>session,create:async args=>{created=args;return session},expire:async()=>{}}}};
const admin={from:()=>({select:()=>({eq:()=>({eq:()=>({maybeSingle:async()=>({data:pending,error:null})})})}),insert:async row=>{inserted=row;return {error:null}},update:()=>({eq:()=>({eq:()=>({eq:async()=>{failed=true;return {error:null}}})})})}),rpc:async(name,args)=>{assert.equal(name,'fulfill_lifetime_purchase');fulfilled.push(args);return {error:null}}};
const db={serverSupabase:async()=>({auth:{getUser:async()=>({data:{user},error:null})},from:()=>({select:()=>({eq:()=>({single:async()=>({data:{is_paid:paid},error:null})})})})}),adminSupabase:()=>admin};
const payments={stripeClient:()=>stripe,appOrigin:()=>origin,LIFETIME_AMOUNT:39900,LIFETIME_CURRENCY:'thb',PRODUCT_KEY:product};
const checkout=load('src/app/api/checkout/route.ts',{'@/lib/supabase/server':db,'@/lib/stripe':payments});
const webhook=load('src/app/api/webhook/route.ts',{'@/lib/supabase/server':db,'@/lib/stripe':payments});
const Gate=()=>null,Paywall=()=>null,App=()=>null;
const page=load('src/app/page.tsx',{'@/lib/supabase/server':db,'@/lib/worksheetAccess':{activeGrades:()=>[]},'@/components/AuthGate':{__esModule:true,default:Gate},'@/components/PaywallModal':{__esModule:true,default:Paywall},'@/components/PaidApp':{__esModule:true,default:App}});
const request=(src=origin)=>new NextRequest(origin+'/api/checkout?lang=th',{method:'POST',headers:{origin:src,'content-type':'application/json'},body:JSON.stringify({amount:1,user_id:'untrusted'})});
const secret='whsec_test_key_for_unit_tests';process.env.STRIPE_WEBHOOK_SECRET=secret;
function webhookRequest(type='checkout.session.completed',valid=true){const payload=JSON.stringify({id:'evt_test',type,data:{object:{id:session.id,metadata}}});const header=realStripe.webhooks.generateTestHeaderString({payload,secret:valid?secret:'wrong_secret'});return new NextRequest(origin+'/api/webhook',{method:'POST',headers:{'stripe-signature':header},body:payload});}
(async()=>{
 process.env.NEXT_PUBLIC_SUPABASE_URL='https://example.test';process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY='dummy';
 assert.equal((await checkout.POST(request('https://other.test'))).status,403);
 user=null;assert.equal((await checkout.POST(request())).status,401);assert.equal((await page.default({searchParams:Promise.resolve({payment:'success'})})).type,Gate);
 user={id,email:'parent@example.test'};assert.equal((await page.default({searchParams:Promise.resolve({payment:'success'})})).type,Paywall);
 paid=true;assert.equal((await page.default({searchParams:Promise.resolve({})})).type,App);assert.equal((await (await checkout.POST(request())).json()).alreadyPaid,true);paid=false;
 let response=await checkout.POST(request());assert.equal(response.status,200);assert.equal(created.line_items[0].price_data.unit_amount,39900);assert.equal(created.line_items[0].price_data.currency,'thb');assert.deepEqual(created.payment_method_types,['promptpay']);assert.equal(created.metadata.user_id,id);assert.equal(inserted.status,'pending');assert.equal(inserted.user_id,id);
 pending={stripe_checkout_session_id:session.id};assert.equal((await (await checkout.POST(request())).json()).pending,true);pending=null;
 assert.equal((await webhook.POST(webhookRequest('checkout.session.completed',false))).status,400);assert.equal(fulfilled.length,0);
 session.payment_status='unpaid';assert.equal((await webhook.POST(webhookRequest())).status,200);assert.equal(fulfilled.length,0);
 assert.equal((await webhook.POST(webhookRequest('checkout.session.async_payment_failed'))).status,200);assert.equal(failed,true);
 session.payment_status='paid';session.amount_total=1;assert.equal((await webhook.POST(webhookRequest())).status,400);assert.equal(fulfilled.length,0);
 session.amount_total=39900;assert.equal((await webhook.POST(webhookRequest())).status,200);assert.equal(fulfilled.length,1);assert.equal(fulfilled[0].p_user,id);assert.equal(fulfilled[0].p_amount,39900);
 assert.equal((await webhook.POST(webhookRequest())).status,200);assert.equal(fulfilled[1].p_event_id,fulfilled[0].p_event_id); // Database RPC deduplicates transactionally.
 console.log('PASS: signed payment validation, checkout price/identity, login and unpaid gate, successful fulfillment, retry event identity. No network requests or real charges.');
})().catch(e=>{console.error(e);process.exitCode=1});
