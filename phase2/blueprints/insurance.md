# Insurance — 10 Blueprints

> Parametric, embedded, and outcome-based coverage.

### Climate insurance that pays the moment a satellite confirms the heat dome, not after a 90-day claims fight.

`id: insurance_parametric_climate_for_smb` · `v1.0.0` · `insurance`

- **Core problem:** 32M US SMBs (farms, restaurants, marinas) lose 2-8 weeks of revenue to climate events; traditional BI insurance pays months later, if at all.
- **Emotional driver:** fear
- **AI leverage:** Satellite + weather-API agent watches predefined triggers; payout agent disburses to a Stripe account within 24h of trigger.
- **Business model:** embedded_finance
- **Monetization:** 1.5-3% of insured revenue annually; reinsurance-backed; ~25% loss ratio target.
- **Distribution:** Embedded in vertical SaaS (Square for restaurants, FarmLogs for ag); broker channel for >$500k policies.
- **Retention loop:** Trigger history per location; switching loses underwriting precision.
- **Moat:** data — Per-location climate-loss correlation corpus improves trigger pricing; competitors lack the longitudinal dataset.
- **Scalability:** 8/10 — Parametric = no claims adjusters; scales with reinsurance capacity, not headcount.
- **Billion-dollar path:** Stage 1: heat + flood + wind for SMB. Stage 2: supply-chain disruption parametric. Stage 3: sovereign-level cat bonds for emerging markets.
- **Failure avoidance:** regulatory_blind_spot: state DOI parametric rules vary; license footprint scoped first; unsustainable_unit_economics: reinsurance-backed; claims ratio managed via trigger calibration
- **Validation principle:** rothschild — Own the satellite + IoT trigger data layer; traditional carriers underwrite blind.
- **UI/UX model:** invisible — SMB sees nothing until a trigger fires; gets an SMS 'Payout of $12,400 sent' and a Stripe receipt.

**MVP sketch**

```json
{
  "stack": "Python + FastAPI + Postgres + Sentinel Hub + Tomorrow.io + Stripe",
  "agents": [
    "hermes:trigger_watcher",
    "openclaw:payout_dag",
    "hermes:reinsurance_optimizer"
  ],
  "data": "Satellite imagery, weather APIs, per-location revenue baselines.",
  "infra": "AWS + Snowflake; SOC 2 + state DOI filings.",
  "hitl": "Actuary approves any trigger calibration; CFO approves payout >$50k."
}
```

---

### Cyber insurance that comes with an AI security operator — not just a check after the breach.

`id: insurance_cyber_for_main_street` · `v1.0.0` · `insurance`

- **Core problem:** 8M US small businesses have no cyber coverage; brokers won't quote them; ransomware attacks against SMBs grew 300% in 2 years.
- **Emotional driver:** fear
- **AI leverage:** Continuous-monitoring agent watches DNS, email, endpoint posture; remediation agent applies fixes; underwriting agent re-prices monthly based on posture score.
- **Business model:** subscription
- **Monetization:** $199-799/mo bundled (insurance + monitoring); ARPU $350+.
- **Distribution:** MSP partnerships (3,000+ MSPs serve SMBs); embedded in IT-management SaaS.
- **Retention loop:** Posture score history is account-locked; carrier switching forfeits the discount earned.
- **Moat:** embedded_workflow — Monitoring + insurance bundled; insurance alone is commodity, monitoring alone is unaffordable for SMB.
- **Scalability:** 8/10 — MSP channel + automated monitoring; underwriting scales with API.
- **Billion-dollar path:** Stage 1: 5-50 employee SMBs via MSPs. Stage 2: mid-market direct. Stage 3: cyber + E&O + D&O bundled outcome-based policies.
- **Failure avoidance:** fake_ai_trap: publish monthly automation rate + breach response SLAs; regulatory_blind_spot: state DOI cyber rules + NAIC model law alignment
- **Validation principle:** medici — Indispensable infrastructure for SMB digital safety; MSPs and carriers depend on us.
- **UI/UX model:** dashboard_plus_chat — Owner sees a posture score; chat asks 'why did my score drop' and gets a numerically grounded answer.

**MVP sketch**

```json
{
  "stack": "Python + Go + Postgres + Datadog + Tines",
  "agents": [
    "hermes:posture_scanner",
    "openclaw:remediation_dag",
    "hermes:claims_triager"
  ],
  "data": "DNS, email, endpoint, cloud posture; per-vertical breach corpus.",
  "infra": "AWS + Snowflake; SOC 2 + ISO 27001 + HITRUST.",
  "hitl": "Underwriter approves any policy >$1M; security officer approves remediation playbooks."
}
```

---

### A freelancer health co-op priced like a group plan, governed like a community.

`id: insurance_freelancer_health_co_op` · `v1.0.0` · `insurance`

- **Core problem:** 70M US gig workers face individual ACA premiums 40-70% above group rates; existing solutions (Stride, HealthSherpa) only shop, not negotiate.
- **Emotional driver:** belonging
- **AI leverage:** Pool-formation agent clusters members by geography + risk; negotiation agent bids carriers for group rates monthly.
- **Business model:** co_op
- **Monetization:** $25/mo membership + 1% of premium savings; pool returns 95% of margin to members.
- **Distribution:** Freelancer marketplaces (Upwork, Toptal) + community channels (creator collectives).
- **Retention loop:** Pool membership history compounds; switching forfeits pool credits and re-underwriting.
- **Moat:** network — Two-sided pool size compounds bargaining leverage; new entrants start with zero pool.
- **Scalability:** 8/10 — Geographic pool density determines negotiating power; multi-state expansion gated by DOI filings.
- **Billion-dollar path:** Stage 1: solo freelancer pools. Stage 2: agency + small studio pools. Stage 3: cross-border pools for digital nomads.
- **Failure avoidance:** regulatory_blind_spot: state DOI association health plan rules; licensed broker-of-record; unsustainable_unit_economics: co-op model returns margin to members; sustained by membership growth, not premium markup
- **Validation principle:** medici — Indispensable health infrastructure for the gig economy; members and carriers both win.
- **UI/UX model:** agent_mediated — Member joins a pool; agent shops + negotiates; member approves the chosen plan.

**MVP sketch**

```json
{
  "stack": "Next.js + Python + Postgres + Vouch + HealthSherpa API",
  "agents": [
    "hermes:pool_clusterer",
    "openclaw:carrier_negotiation_dag",
    "hermes:claims_advocate"
  ],
  "data": "Member demographics, claims history, carrier rate cards.",
  "infra": "AWS + KMS; HIPAA + HITRUST; per-state DOI filings.",
  "hitl": "Licensed broker approves every group renewal; member-elected board approves pool changes."
}
```

---

### Renters insurance that fights your landlord's deposit grab on your behalf.

`id: insurance_renters_with_dispute_advocate` · `v1.0.0` · `insurance`

- **Core problem:** 44M US renter households lose $1.2B/yr to wrongful security deposit withholding; renters insurance pays for theft but ignores deposit disputes.
- **Emotional driver:** fear
- **AI leverage:** Inspection-doc agent timestamps move-in/move-out; dispute agent drafts demand letters + small-claims filings.
- **Business model:** subscription
- **Monetization:** $12-18/mo (insurance + advocacy); ARPU competitive with Lemonade.
- **Distribution:** PLG via 'free move-in inspection report' wedge; landlord-tech partnerships (RentRedi, Buildium).
- **Retention loop:** Inspection history per address compounds; renters return for every new lease.
- **Moat:** data — Per-landlord dispute outcome corpus identifies repeat offenders; valuable to renters and regulators.
- **Scalability:** 7/10 — DOI filings per state are a 6-12 month grind; advocacy automation scales fast.
- **Billion-dollar path:** Stage 1: renters insurance + deposit advocacy. Stage 2: landlord rating network. Stage 3: tenant rights API for housing platforms.
- **Failure avoidance:** regulatory_blind_spot: state DOI renters rules + UPL boundaries on legal advocacy; unsustainable_unit_economics: outcome-based recovery upsell keeps ARPU healthy
- **Validation principle:** buffett — Defensible per-landlord data + advocacy; reject vanity policy count.
- **UI/UX model:** invisible — Renter snaps move-in photos; agent handles disputes silently; renter sees 'recovered $850' notification.

**MVP sketch**

```json
{
  "stack": "Next.js + Python + Postgres + DocuSign + Stripe",
  "agents": [
    "hermes:inspection_capturer",
    "openclaw:dispute_dag",
    "hermes:small_claims_filer"
  ],
  "data": "Inspection photos, lease terms, per-landlord dispute outcomes.",
  "infra": "AWS + S3 image store; DOI compliance per state.",
  "hitl": "Bar-licensed paralegal reviews any small-claims filing; user approves any settlement."
}
```

---

### Pet insurance that pays you to keep your dog healthy, not just to fix what's broken.

`id: insurance_pet_health_wellness_loop` · `v1.0.0` · `insurance`

- **Core problem:** 180M US pets cost $30B/yr in vet bills; existing pet insurance (Trupanion, Lemonade) is reactive and excludes preventive care.
- **Emotional driver:** belonging
- **AI leverage:** Wellness agent reads wearable + vet record data; underwriting agent re-prices monthly based on wellness score.
- **Business model:** subscription
- **Monetization:** $25-65/mo + cashback on wellness milestones; ARPU $42+.
- **Distribution:** Vet clinic + pet-store retail partnerships; PLG via free wellness assessment.
- **Retention loop:** Wellness score + claims history are pet-locked; switching forfeits accumulated discount.
- **Moat:** data — Per-breed wellness correlation corpus improves underwriting; competitors price on age + breed alone.
- **Scalability:** 7/10 — DOI filings per state; wearable adoption is the input bottleneck.
- **Billion-dollar path:** Stage 1: dogs in 10 states. Stage 2: cats + exotics nationally. Stage 3: pet-life-cycle bundle (food, meds, end-of-life).
- **Failure avoidance:** regulatory_blind_spot: state DOI + AVMA-aligned data sharing; thin_wrapper_syndrome: own the wellness data + actuarial model, not a Lemonade clone
- **Validation principle:** rothschild — Own the per-breed wellness data layer; competitors price on demographic averages.
- **UI/UX model:** agent_mediated — Owner sees a monthly wellness report + cashback; agent handles claims directly with the vet.

**MVP sketch**

```json
{
  "stack": "React Native + Python + Postgres + Fitbark + EVet API",
  "agents": [
    "hermes:wellness_scorer",
    "openclaw:claims_dag",
    "hermes:vet_navigator"
  ],
  "data": "Wearable telemetry, vet records, breed claims atlas.",
  "infra": "AWS + Snowflake; per-state DOI filings.",
  "hitl": "Veterinary advisor reviews claims >$2k; underwriter approves rate changes."
}
```

---

### Aviation underwriting for the eVTOL era — priced per flight-minute, not per annual policy.

`id: insurance_evtol_micro_aviation` · `v1.0.0` · `insurance`

- **Core problem:** Emerging eVTOL operators face Lloyd's-grade premiums priced on legacy rotorcraft loss tables; pricing is wrong by 3-5x and locks operators out.
- **Emotional driver:** autonomy
- **AI leverage:** Telemetry-ingest agent reads flight data; underwriting agent re-prices per route + weather + pilot history.
- **Business model:** consumption
- **Monetization:** $2-12 per flight-minute; reinsurance-backed; quarterly true-up.
- **Distribution:** Direct partnership with eVTOL operators (Joby, Archer, Beta); FAA + EASA regulatory engagement.
- **Retention loop:** Per-operator telemetry corpus locks underwriting accuracy.
- **Moat:** regulatory — First-mover with FAA/EASA on parametric eVTOL rates; competitors face years of regulatory work.
- **Scalability:** 7/10 — eVTOL fleet scaling determines TAM; underwriting tech is leverageable.
- **Billion-dollar path:** Stage 1: eVTOL operators. Stage 2: cargo drones. Stage 3: full UAM (urban air mobility) liability stack.
- **Failure avoidance:** hardware_scaling_chasm: ride the operators, don't build the airframe — Lilium's lesson; regulatory_blind_spot: FAA Part 135 + EASA SC-VTOL alignment from day one
- **Validation principle:** rothschild — Own the per-flight telemetry data; legacy aviation underwriters work from annual aggregates.
- **UI/UX model:** invisible — Operator sees a per-flight invoice; underwriting is automatic.

**MVP sketch**

```json
{
  "stack": "Python + FastAPI + Postgres + ADS-B + WeatherKit",
  "agents": [
    "hermes:telemetry_ingestor",
    "openclaw:per_minute_pricing_dag",
    "hermes:claims_adjuster"
  ],
  "data": "ADS-B flight tracks, weather, pilot logs, eVTOL airframe telemetry.",
  "infra": "AWS GovCloud-ready; FAA-aligned data retention.",
  "hitl": "Aviation underwriter approves any new operator class or new aircraft model."
}
```

---

### Business interruption insurance that maps your supply chain and pays when a Tier-2 supplier goes dark.

`id: insurance_climate_supply_chain_bi` · `v1.0.0` · `insurance`

- **Core problem:** Mid-market manufacturers lose $200B/yr to supply-chain disruptions; existing BI policies require named-cause; cascading supplier failures aren't covered.
- **Emotional driver:** fear
- **AI leverage:** Graph agent maps supplier dependencies from PO + AP data; trigger agent watches news/satellite/port data for disruptions.
- **Business model:** subscription
- **Monetization:** $5-50k/mo by manufacturer revenue + claims payout; reinsurance-backed.
- **Distribution:** Embedded in ERP (NetSuite, SAP B1) + procurement SaaS partnerships.
- **Retention loop:** Supplier graph + risk telemetry compound; switching forfeits months of mapping.
- **Moat:** data — Multi-tier supplier graph is unique per customer + becomes a network asset.
- **Scalability:** 8/10 — ERP integration scales the channel; graph mapping is automated.
- **Billion-dollar path:** Stage 1: mid-market manufacturers. Stage 2: F500 procurement bundle. Stage 3: cross-industry supplier reputation network.
- **Failure avoidance:** regulatory_blind_spot: state DOI BI rules + reinsurance treaty alignment; fake_ai_trap: publish quarterly trigger-precision metrics
- **Validation principle:** rothschild — Own the multi-tier supplier graph; legacy carriers see only direct suppliers.
- **UI/UX model:** dashboard_plus_chat — CFO sees a supply-chain risk map; chat asks 'what happens if Shenzhen goes down 5 days' and gets a $ exposure answer.

**MVP sketch**

```json
{
  "stack": "Python + Neo4j + Postgres + Sentinel Hub + Snowflake",
  "agents": [
    "hermes:supplier_graph_builder",
    "openclaw:disruption_trigger_dag",
    "hermes:claims_calculator"
  ],
  "data": "PO/AP data, port telemetry, news, satellite, customs filings.",
  "infra": "AWS + Snowflake; SOC 2 + DOI filings.",
  "hitl": "Underwriter approves any policy >$5M payout cap; risk officer reviews graph thresholds."
}
```

---

### Revenue insurance for creators when YouTube demonetizes you on Tuesday.

`id: insurance_creator_revenue_protection` · `v1.0.0` · `insurance`

- **Core problem:** 12M creators have income tied to platforms that can demonetize without notice; no one underwrites platform-suspension risk.
- **Emotional driver:** fear
- **AI leverage:** Income-monitoring agent baselines per-creator earnings; trigger agent fires on >40% drop tied to suspension event.
- **Business model:** subscription
- **Monetization:** 2-5% of monthly revenue; payout = up to 12 weeks of baseline income.
- **Distribution:** PLG via 'see my baseline' wedge; partnerships with creator-economy SaaS (Linktree, Beacons).
- **Retention loop:** Baseline + claims history compound; switching loses earned discount.
- **Moat:** data — Per-platform suspension-rate corpus underwrites future products; new entrants lack the data.
- **Scalability:** 8/10 — API-driven monitoring; reinsurance capacity is the constraint.
- **Billion-dollar path:** Stage 1: YouTube/TikTok creators. Stage 2: Patreon/Substack creators. Stage 3: cross-platform creator income smoothing product.
- **Failure avoidance:** regulatory_blind_spot: state DOI parametric rules + NAIC model law alignment; unsustainable_unit_economics: trigger calibration controls loss ratio
- **Validation principle:** buffett — Defensible parametric trigger; loss ratio managed via underwriting calibration.
- **UI/UX model:** invisible — Creator gets paid out 24h after a confirmed demonetization event.

**MVP sketch**

```json
{
  "stack": "Python + Postgres + YouTube/TikTok APIs + Stripe",
  "agents": [
    "hermes:income_baseliner",
    "openclaw:suspension_trigger_dag",
    "hermes:payout_processor"
  ],
  "data": "Per-platform earnings, suspension corpus, creator demographics.",
  "infra": "AWS + Snowflake; per-state DOI.",
  "hitl": "Underwriter approves payout >$50k or any new platform onboarded."
}
```

---

### STR insurance that adjusts coverage by the night and the booking source.

`id: insurance_landlord_short_term_rental` · `v1.0.0` · `insurance`

- **Core problem:** 2.4M US STR hosts run uninsured or under-insured because traditional homeowner policies exclude STR; Airbnb's host guarantee covers <30% of claims.
- **Emotional driver:** convenience
- **AI leverage:** Booking-graph agent watches Airbnb/Vrbo/Booking iCal; coverage agent adjusts policy nightly per occupant + duration.
- **Business model:** consumption
- **Monetization:** $3-12 per night-occupied + $25/mo base; charged per booking via host's payout.
- **Distribution:** PMS (Hostfully, OwnerRez) + Airbnb partner integration; PLG via 'connect calendar, see your gaps' wedge.
- **Retention loop:** Booking history + claims history compound per property; switching forfeits property history.
- **Moat:** embedded_workflow — Sits inside PMS; survives carrier shopping because the data + automation lives in the workflow.
- **Scalability:** 8/10 — API-driven; reinsurance capacity is the constraint.
- **Billion-dollar path:** Stage 1: STR insurance. Stage 2: PMS-bundled risk + ops + cleaning. Stage 3: STR-as-asset-class for fractional ownership platforms.
- **Failure avoidance:** regulatory_blind_spot: state DOI STR rules + municipal STR ordinances; unsustainable_unit_economics: per-night pricing + claims data keeps loss ratio in line
- **Validation principle:** medici — Indispensable infrastructure for STR ecosystem; PMS, hosts, carriers all benefit.
- **UI/UX model:** invisible — Host connects PMS; coverage adjusts silently per booking; claims handled in chat.

**MVP sketch**

```json
{
  "stack": "Python + Postgres + Hostfully API + OwnerRez API + Stripe",
  "agents": [
    "hermes:booking_graph",
    "openclaw:per_night_underwriting_dag",
    "hermes:claims_router"
  ],
  "data": "Booking calendars, guest demographics, claims history per property.",
  "infra": "AWS + Snowflake; per-state DOI filings.",
  "hitl": "Underwriter approves new property class; ops reviews any claim >$10k."
}
```

---

### Income insurance for hourly workers that pays the day a shift gets cut.

`id: insurance_wage_advance_protection` · `v1.0.0` · `insurance`

- **Core problem:** 55M hourly workers face shift cuts with no buffer; existing wage-advance services (DailyPay, Earnin) provide cash, not insurance.
- **Emotional driver:** fear
- **AI leverage:** Schedule-monitor agent ingests employer scheduling data; trigger agent pays a defined benefit when actual hours drop below baseline.
- **Business model:** subscription
- **Monetization:** $8-15/mo via payroll deduction; payout up to 40h baseline.
- **Distribution:** Embedded in workforce-mgmt SaaS (When I Work, Deputy); B2B2C via employer benefits.
- **Retention loop:** Baseline + payout history compound; switching forfeits earned credit.
- **Moat:** embedded_workflow — Sits inside scheduling software; workers don't have to manage anything.
- **Scalability:** 8/10 — Workforce SaaS channel scales fast; reinsurance is the cap.
- **Billion-dollar path:** Stage 1: hourly retail + restaurant. Stage 2: gig platforms. Stage 3: full income-smoothing product (advances + insurance + savings).
- **Failure avoidance:** regulatory_blind_spot: CFPB EWA rules + state DOI parametric income coverage; unsustainable_unit_economics: subscription + reinsurance keeps loss ratio in band
- **Validation principle:** buffett — Defensible parametric trigger backed by payroll data; reject vanity user counts.
- **UI/UX model:** invisible — Worker enrolls via employer; sees payout SMS the day a shift cut is detected.

**MVP sketch**

```json
{
  "stack": "Python + Postgres + ADP + When-I-Work API + Stripe",
  "agents": [
    "hermes:schedule_baseliner",
    "openclaw:shortfall_trigger_dag",
    "hermes:payout_processor"
  ],
  "data": "Scheduling data, payroll, employer rosters, regional unemployment baselines.",
  "infra": "AWS + Snowflake; per-state DOI.",
  "hitl": "Underwriter approves new employer; payroll team confirms first payout cycle."
}
```

