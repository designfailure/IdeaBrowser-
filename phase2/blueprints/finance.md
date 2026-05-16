# Finance — 10 Blueprints

> Embedded finance, neobanks, and AI underwriting.

### The neobank that closes a trucker's books while they sleep.

`id: finance_neobank_for_truckers` · `v1.0.0` · `finance`

- **Core problem:** 1.9M US owner-operators run their books in shoeboxes; existing neobanks treat them as 1099-W2 hybrids and miss IFTA, per-diem, and load-factoring economics.
- **Emotional driver:** autonomy
- **AI leverage:** Vision agent ingests bills of lading + fuel receipts; ledger agent files IFTA quarterly; replaces a $4-6k/yr human bookkeeper.
- **Business model:** embedded_finance
- **Monetization:** $29/mo SaaS + 0.8% interchange + 1.5% factoring spread; net ARPU ~$110/mo at month 6.
- **Distribution:** Truck-stop wedge + DAT/Truckstop.com partnerships; community via owner-operator subreddits and CDL TikTok.
- **Retention loop:** Quarter-locked filings + factored receivables create 90-day switching cost; data flywheel improves load-pricing recommendations.
- **Moat:** switching_cost — Quarterly filings + factored receivables create 90-day lock; load-data flywheel compounds.
- **Scalability:** 8/10 — TAM $2B SaaS + $10B factoring; constrained by trucker onboarding velocity, not technology.
- **Billion-dollar path:** Stage 1: solo owner-operators. Stage 2: small fleets (2-20). Stage 3: factoring marketplace + load-pricing data network sold to brokers.
- **Failure avoidance:** commoditization_collapse: vertical-deep with IFTA + factoring vs Dave's mass-market trap; regulatory_blind_spot: SOC 2 + state money-transmitter licenses scoped pre-launch
- **Validation principle:** buffett — Defensible quarterly switching cost; cash-flow positive by month 9; reject growth at the cost of margin.
- **UI/UX model:** agent_mediated — Trucker texts a photo of a receipt; agent files it; weekly digest in app; chat for q&a.

**MVP sketch**

```json
{
  "stack": "Next.js + tRPC + Postgres + Plaid + Unit.co",
  "agents": [
    "openclaw:bookkeeping_dag",
    "hermes:receipt_extract",
    "hermes:ifta_filer"
  ],
  "data": "Receipts, BOLs, fuel cards, factoring ledger; per-trucker vector store for tax q&a.",
  "infra": "Vercel + Supabase + Inngest cron; Sentry; LaunchDarkly.",
  "hitl": "Operator approves filed returns >$5k or factoring advances >$25k."
}
```

---

### Quarterly taxes that file themselves the moment a creator gets paid.

`id: finance_embedded_tax_for_creators` · `v1.0.0` · `finance`

- **Core problem:** 12M US 1099 creators owe quarterly estimated taxes and routinely under-withhold; April becomes a $4k surprise.
- **Emotional driver:** fear
- **AI leverage:** Income-classification agent watches Stripe/PayPal/Patreon webhooks; tax engine sweeps the right % into a sub-account; auto-files Form 1040-ES.
- **Business model:** embedded_finance
- **Monetization:** $19/mo + 0.3% on auto-swept funds; ARPU ~$32/mo.
- **Distribution:** Stripe App Marketplace + Patreon partnership; PLG via 'Tax-Withheld Stripe link' wedge.
- **Retention loop:** IRS payment history is locked to the account; switching mid-year forfeits filing continuity.
- **Moat:** embedded_workflow — Sits inside payment webhooks; survives even if creator changes banks.
- **Scalability:** 8/10 — Webhook-driven; marginal cost is API calls, not human review.
- **Billion-dollar path:** Stage 1: solo creators. Stage 2: agencies + small studios. Stage 3: cross-border creator tax (EU VAT, UK PAYE).
- **Failure avoidance:** regulatory_blind_spot: tax filing is licensed; partner with a registered EFIN provider day one; thin_wrapper_syndrome: own the IRS-filing pipeline, not a UI on top of TurboTax
- **Validation principle:** rothschild — Own the payment-webhook data layer; competitors see only end-of-year statements while we see every transaction.
- **UI/UX model:** invisible — Creator never opens the app until April; receives a 'You owe $0, we already paid it' email.

**MVP sketch**

```json
{
  "stack": "Next.js + Cloudflare Workers + Stripe webhooks + Increase.com",
  "agents": [
    "hermes:income_classifier",
    "hermes:tax_engine",
    "openclaw:filing_dag"
  ],
  "data": "Webhook stream from Stripe/PayPal; IRS publication index for deductions.",
  "infra": "Cloudflare D1 + R2; Sentry; Datadog.",
  "hitl": "Operator reviews any return >$10k owed or any audit flag from the IRS."
}
```

---

### A 60-second SMB credit decision built on cash-flow telemetry, not credit bureau lag.

`id: finance_ai_underwriter_for_smb_credit` · `v1.0.0` · `finance`

- **Core problem:** 30M US SMBs are underwritten on FICO + tax returns months stale; the data exists in Stripe/QuickBooks but no underwriter ingests it natively.
- **Emotional driver:** autonomy
- **AI leverage:** Cash-flow agent ingests Stripe/Plaid/QuickBooks streams; underwriting agent renders a decision + price in 60s; replaces a 2-week bank pull.
- **Business model:** outcome_based
- **Monetization:** 1.5-3% origination fee + 50-100bps servicing; charged only on funded loans.
- **Distribution:** Embedded inside vertical SaaS (Toast, Mindbody, Jobber); revenue share with the SaaS.
- **Retention loop:** Cash-flow data is continuously re-scored; SMBs return for line increases; SaaS partner gets a new monetization line.
- **Moat:** data — Multi-source cash-flow corpus across verticals improves underwriting; partners cannot leave without losing decisioning.
- **Scalability:** 9/10 — API-driven; capital is partner-supplied (warehouses); operating leverage is enormous.
- **Billion-dollar path:** Stage 1: embed in 5 vertical SaaS. Stage 2: own the warehouse facility. Stage 3: license decision engine to community banks.
- **Failure avoidance:** fake_ai_trap: publish quarterly automation-rate metrics + auditor letter; regulatory_blind_spot: ECOA/UDAAP-compliant adverse-action notices generated automatically
- **Validation principle:** rothschild — Own the multi-source cash-flow data layer; underwriters relying on FICO are running blind.
- **UI/UX model:** invisible — SMB clicks 'Get a $50k line' inside Toast; sees a price + accept button in 60 seconds.

**MVP sketch**

```json
{
  "stack": "Python + FastAPI + Postgres + Plaid + Codat + LendAPI",
  "agents": [
    "hermes:cashflow_aggregator",
    "openclaw:underwriting_dag",
    "hermes:adverse_action_writer"
  ],
  "data": "Bank, AR, AP, payroll, Stripe; bureau supplement only.",
  "infra": "AWS + RDS + KMS; SOC 2 Type II in year one.",
  "hitl": "Compliance officer reviews any decline; risk officer approves any policy change."
}
```

---

### An AI agent that opens your medical, telecom, and SaaS invoices and negotiates them down — for free unless it wins.

`id: finance_invoice_negotiator_agent` · `v1.0.0` · `finance`

- **Core problem:** US households overpay $2.4k/yr in negotiable bills (medical, telecom, gym, SaaS); existing services (Truebill, BillShark) charge 40% upfront and rarely touch medical.
- **Emotional driver:** fear
- **AI leverage:** Agent reads scanned bills, identifies negotiable line items, drafts dispute letters, and runs voice negotiation against billing reps; replaces a $50/hr billing advocate.
- **Business model:** outcome_based
- **Monetization:** 30% of confirmed savings, billed monthly over 12 months; no upfront.
- **Distribution:** Direct-to-consumer via TikTok 'send me your hospital bill' + insurance broker partnerships.
- **Retention loop:** Bills keep arriving; agent's negotiation history with each provider compounds — Anthem learns the agent always wins, settles faster.
- **Moat:** data — Per-provider negotiation success rates compound; new entrants start at zero.
- **Scalability:** 7/10 — Voice + document; bottleneck is per-provider integration and call wait times.
- **Billion-dollar path:** Stage 1: medical bill negotiation. Stage 2: full-stack billing-advocacy platform. Stage 3: B2B for HR teams as employee benefit.
- **Failure avoidance:** unsustainable_unit_economics: outcome-based pricing aligns ARR to recovered savings; regulatory_blind_spot: HIPAA-aligned BAA before touching any medical bill
- **Validation principle:** buffett — Free unless we win — economics enforce conviction; reject vanity DAU.
- **UI/UX model:** agent_mediated — User snaps a bill; agent drafts a strategy; user clicks 'go'; weekly status updates.

**MVP sketch**

```json
{
  "stack": "Python + FastAPI + Twilio Voice + Vapi.ai + Postgres",
  "agents": [
    "hermes:bill_parser",
    "openclaw:dispute_dag",
    "hermes:voice_negotiator"
  ],
  "data": "Per-provider call scripts, success rates, billing codes (CPT/HCPCS).",
  "infra": "AWS + Twilio + Vapi; HIPAA-compliant logging.",
  "hitl": "User approves any settlement over $500 or any release-of-claims clause."
}
```

---

### Bloomberg Terminal for the 30M SMBs that can't afford a CFO.

`id: finance_real_time_treasury_for_smb` · `v1.0.0` · `finance`

- **Core problem:** SMBs make six-figure cash decisions on QuickBooks balances stale by 24-72h; treasury management is a fortune-500 luxury.
- **Emotional driver:** mastery
- **AI leverage:** Forecast agent rebuilds 13-week cash forecast every hour from Plaid/Stripe; sweep agent moves idle balances into T-bills nightly.
- **Business model:** subscription
- **Monetization:** $199-799/mo by company size + 5bps on swept balances; ARPU $400+.
- **Distribution:** Sales-led to 50-200 employee SMBs; CFO advisory firm partnership.
- **Retention loop:** Forecast accuracy improves with company history; switching forfeits 13-week visibility built up over months.
- **Moat:** switching_cost — Cash forecast and sweep policies are encoded in the system; unwinding takes weeks.
- **Scalability:** 8/10 — API + automation; sales cycle is the bottleneck, not delivery.
- **Billion-dollar path:** Stage 1: SMB treasury. Stage 2: embedded in vertical accounting software. Stage 3: AI CFO bundle (forecasting + AR + AP + tax).
- **Failure avoidance:** thin_wrapper_syndrome: own the forecasting model + sweep execution, not a wrapper on Plaid; fake_ai_trap: publish forecast-accuracy backtests quarterly
- **Validation principle:** rothschild — Real-time cash visibility is asymmetric information; static QuickBooks users are flying blind.
- **UI/UX model:** dashboard_plus_chat — Cash dashboard; chat asks 'what if I delay payroll 5 days' and gets a numerically grounded answer.

**MVP sketch**

```json
{
  "stack": "Next.js + Python + Postgres + Plaid + Modern Treasury",
  "agents": [
    "hermes:forecast_engine",
    "openclaw:sweep_dag",
    "hermes:variance_explainer"
  ],
  "data": "Bank, AR, AP, payroll, vendor terms; macro rates feed.",
  "infra": "AWS + RDS + KMS; SOC 2 Type II.",
  "hitl": "CFO approves any sweep policy change; auto-revert on +/-15% forecast variance."
}
```

---

### BSA/AML compliance copilot that turns 4,000 community banks into competitive fintechs.

`id: finance_compliance_copilot_for_community_banks` · `v1.0.0` · `finance`

- **Core problem:** Community banks spend 8-12% of opex on BSA/AML; vendor stacks (NICE Actimize) are mainframe-era and unaffordable for sub-$5B AUM.
- **Emotional driver:** fear
- **AI leverage:** Transaction-monitoring agent triages SAR alerts; KYC agent reviews ID + sanctions hits; replaces 3-5 FTEs per bank.
- **Business model:** subscription
- **Monetization:** $8-25k/mo by AUM tier + per-alert overage; ARPU $15k/mo.
- **Distribution:** ICBA + state banking association partnerships; sales-led with regulator-friendly pitch.
- **Retention loop:** Alert-tuning history is bank-specific; switching loses years of false-positive suppression.
- **Moat:** regulatory — FFIEC examination-ready audit trails; competitors face years to reach parity.
- **Scalability:** 7/10 — Sales cycle 6-9 months; once integrated, expansion within bank is fast.
- **Billion-dollar path:** Stage 1: BSA/AML for community banks. Stage 2: full compliance suite (CRA, Reg E, Reg Z). Stage 3: license to credit unions globally.
- **Failure avoidance:** regulatory_blind_spot: SR 11-7 model risk management documentation from day one; fake_ai_trap: human-in-the-loop on every SAR; transparent automation rate
- **Validation principle:** buffett — Regulatory moat compounds; switching costs are existential for banks under examination.
- **UI/UX model:** dashboard_plus_chat — BSA officer reviews triaged alerts in a queue; chat to ask 'why was this flagged' in plain English.

**MVP sketch**

```json
{
  "stack": "Python + FastAPI + Postgres + Snowflake + Sigma",
  "agents": [
    "openclaw:tm_alert_dag",
    "hermes:kyc_reviewer",
    "hermes:sar_drafter"
  ],
  "data": "Core banking transactions, OFAC, FinCEN guidance, internal alert history.",
  "infra": "AWS GovCloud-ready; SOC 2 Type II + ISO 27001.",
  "hitl": "BSA officer reviews every SAR before filing; model committee approves tuning changes."
}
```

---

### An AI collections agent that recovers 30-day-late invoices without souring the customer relationship.

`id: finance_ar_collections_agent` · `v1.0.0` · `finance`

- **Core problem:** $3.1T US B2B receivables run >30 days late; collections teams are expensive and abrasive; SMBs avoid hiring collectors entirely.
- **Emotional driver:** convenience
- **AI leverage:** Voice + email agent runs tone-tuned dunning sequences; payment-plan agent negotiates terms within authority limits.
- **Business model:** outcome_based
- **Monetization:** 8-15% of collected funds (vs 25-50% for traditional agencies); minimum $99/mo subscription.
- **Distribution:** QuickBooks + Xero app marketplace; PLG with 'connect ledger, see who's overdue' wedge.
- **Retention loop:** Recovery rates improve with debtor history; ledger integration is sticky.
- **Moat:** data — Per-debtor payment behavior corpus improves negotiation tactics.
- **Scalability:** 8/10 — Voice + email scale linearly with API costs; no per-account human required.
- **Billion-dollar path:** Stage 1: SMB AR. Stage 2: mid-market ERP integrations. Stage 3: cross-creditor reputation network priced to debt buyers.
- **Failure avoidance:** regulatory_blind_spot: FDCPA + state collection license footprint scoped pre-launch; unsustainable_unit_economics: outcome pricing keeps gross margin >70%
- **Validation principle:** buffett — Cash-flow positive on funds recovered; reject vanity DAU.
- **UI/UX model:** agent_mediated — SMB sees an inbox of overdue invoices; clicks 'collect' on each; agent runs a 30-day campaign.

**MVP sketch**

```json
{
  "stack": "Python + FastAPI + Postgres + Vapi.ai + Twilio + Stripe",
  "agents": [
    "openclaw:dunning_dag",
    "hermes:voice_collector",
    "hermes:payment_plan_negotiator"
  ],
  "data": "Ledger, debtor history, FDCPA scripts, dispute outcomes.",
  "infra": "AWS + RDS; FDCPA-compliant call recording + retention.",
  "hitl": "Operator approves any settlement <60% of face or any litigation referral."
}
```

---

### A neobank for the 280M diaspora that needs to bank in three currencies and remit home weekly.

`id: finance_sovereign_wealth_for_diaspora` · `v1.0.0` · `finance`

- **Core problem:** Diaspora workers pay 6-8% on remittances and lose another 3% to FX; existing solutions (Wise, Remitly) are remit-only and lack a real banking layer.
- **Emotional driver:** belonging
- **AI leverage:** Multi-currency ledger agent rebalances across USD/EUR/GBP/INR/PHP nightly; remittance agent times transfers to favorable FX windows.
- **Business model:** embedded_finance
- **Monetization:** Free remit + 0.3% FX spread + 0.5% interchange; $0/mo; ARPU $11/mo.
- **Distribution:** Diaspora community channels (Filipino nurses, Indian engineers, Nigerian fintechers); employer payroll partnerships.
- **Retention loop:** Remit history + bill-pay-back-home compounds; family in country of origin onboards into recipient app.
- **Moat:** network — Two-sided diaspora ↔ recipient network; switching breaks family payment rails.
- **Scalability:** 9/10 — $700B annual remittance market; community-driven CAC.
- **Billion-dollar path:** Stage 1: USA diaspora corridors. Stage 2: EU + UK + Gulf corridors. Stage 3: white-label remit rail to community banks.
- **Failure avoidance:** regulatory_blind_spot: state MTL + EU PSD2 + RBI inward remit licenses pre-scoped; commoditization_collapse: own the recipient-side experience, not a Wise wrapper
- **Validation principle:** medici — Indispensable infrastructure for diaspora financial life; the platform that makes others rich.
- **UI/UX model:** voice_first — User says 'send 200 to mom' in native language; agent times the transfer and confirms via voice.

**MVP sketch**

```json
{
  "stack": "React Native + Node + Postgres + Currencycloud + Plaid",
  "agents": [
    "hermes:fx_optimizer",
    "openclaw:remit_dag",
    "hermes:bill_pay_router"
  ],
  "data": "Per-corridor FX history, recipient bank rails, employer payroll calendars.",
  "infra": "AWS + Cloudflare; SOC 2 + PCI; per-jurisdiction data residency.",
  "hitl": "Compliance reviews any remit >$10k or any sanctioned-country flag."
}
```

---

### An options-strategy copilot that explains every Greek before you click buy.

`id: finance_options_strategist_for_retail` · `v1.0.0` · `finance`

- **Core problem:** 26M US retail options traders execute spreads they don't understand; broker UIs (Robinhood, Schwab) hide risk and don't explain consequences.
- **Emotional driver:** mastery
- **AI leverage:** Strategy agent translates intent ('I want upside on NVDA but cap loss at $500') to a defined-risk spread; risk agent simulates 1-30 day P&L paths.
- **Business model:** subscription
- **Monetization:** $29/mo + $99/mo Pro tier; no PFOB to avoid Robinhood-style misalignment.
- **Distribution:** YouTube finance creator partnerships; PLG via free strategy-explainer that requires login to execute.
- **Retention loop:** Trade-journal + outcome tracking creates personalized risk profile; users return to log every position.
- **Moat:** brand — Trust-first brand in a space dominated by gambling-aesthetic apps.
- **Scalability:** 7/10 — Subscription model; broker integrations are the bottleneck.
- **Billion-dollar path:** Stage 1: options education + execution wrapper. Stage 2: hedge-as-a-service for ETF holders. Stage 3: licensed RIA layer.
- **Failure avoidance:** regulatory_blind_spot: FINRA-compliant content review; not a broker-dealer day one; thin_wrapper_syndrome: own the simulation engine + journaling, not a UI on TastyTrade
- **Validation principle:** buffett — Defensible brand built on transparent risk; reject PFOB-driven flow monetization.
- **UI/UX model:** conversational — User describes intent in plain English; copilot returns a visualized trade with all Greeks.

**MVP sketch**

```json
{
  "stack": "Next.js + Python + Postgres + Polygon.io + SnapTrade",
  "agents": [
    "hermes:strategy_translator",
    "openclaw:risk_simulator",
    "hermes:journal_writer"
  ],
  "data": "Options chains, IV surface, user trade journal, outcome history.",
  "infra": "AWS + RDS; SOC 2; FINRA-aligned record retention.",
  "hitl": "Compliance reviews any new strategy template before user-facing release."
}
```

---

### An estate plan that updates itself every time you have a baby, buy a house, or change jobs.

`id: finance_estate_planner_invisible` · `v1.0.0` · `finance`

- **Core problem:** 67% of US adults have no estate plan; LegalZoom is one-shot and stale within 18 months; lawyers cost $2-5k upfront.
- **Emotional driver:** fear
- **AI leverage:** Life-event agent watches Plaid + payroll + DMV + birth certificates (opt-in) and triggers will/trust amendments; legal agent drafts changes for attorney review.
- **Business model:** subscription
- **Monetization:** $15/mo individual, $25/mo family; bar-licensed attorney review priced per change ($99-299).
- **Distribution:** Embedded in HR benefits stacks; D2C via 'free will draft' wedge.
- **Retention loop:** Estate plan is alive; switching loses continuity and triggers attorney re-review costs.
- **Moat:** switching_cost — Continuous estate-plan history; switching means paying for a fresh attorney review.
- **Scalability:** 7/10 — B2B2C via HR benefits scales fast; attorney review is the bottleneck.
- **Billion-dollar path:** Stage 1: D2C + HR benefits. Stage 2: probate concierge bundle. Stage 3: cross-jurisdiction estate concierge for HNW.
- **Failure avoidance:** regulatory_blind_spot: UPL boundaries clear; partner with bar-licensed attorneys per state; unsustainable_unit_economics: subscription + per-event upsell keeps CAC payback <12 months
- **Validation principle:** medici — Indispensable life-event infrastructure for households + employers; both sides depend on us.
- **UI/UX model:** invisible — Estate plan auto-updates after a life event; user gets a summary + 'approve' email.

**MVP sketch**

```json
{
  "stack": "Next.js + Postgres + Plaid + DocuSign",
  "agents": [
    "hermes:life_event_watcher",
    "openclaw:will_amendment_dag",
    "hermes:attorney_router"
  ],
  "data": "Will templates per state, life-event taxonomy, attorney panel.",
  "infra": "AWS + KMS-encrypted document store; SOC 2 + state bar compliance.",
  "hitl": "Bar-licensed attorney signs every binding amendment; user e-signs final."
}
```

