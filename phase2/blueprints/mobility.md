# Mobility — 10 Blueprints

> EV, micromobility, freight, and curb intelligence.

### Software that pays an EV fleet's electric bill 30% lower without buying a single charger.

`id: mobility_ev_fleet_charging_optimizer` · `v1.0.0` · `mobility`

- **Core problem:** 120k US commercial EV fleets pay 2-4x retail kWh because they charge at peak; charging-network apps don't see fleet TMS data.
- **Emotional driver:** mastery
- **AI leverage:** Schedule agent reads dispatch + telematics; charging agent stages sessions during off-peak windows + utility DR programs.
- **Business model:** outcome_based
- **Monetization:** 30% of measured kWh-cost savings; minimum $500/mo per fleet.
- **Distribution:** Fleet-mgmt SaaS partnerships (Geotab, Samsara) + utility partnerships for DR program enrollment.
- **Retention loop:** Per-fleet charging history + utility tariffs lock optimization accuracy; switching loses months of tuning.
- **Moat:** data — Per-fleet + per-utility charging-cost corpus improves recommendations.
- **Scalability:** 8/10 — Asset-light; SaaS channel scales fast; utility DR partnerships gate territory.
- **Billion-dollar path:** Stage 1: small commercial fleets. Stage 2: school + transit fleets. Stage 3: V2G arbitrage product.
- **Failure avoidance:** hardware_scaling_chasm: software-only over Canoo's hardware burn; commoditization_collapse: own optimization, not the chargers
- **Validation principle:** rothschild — Own the per-fleet + per-utility optimization data; charger OEMs see only their own hardware.
- **UI/UX model:** invisible — Fleet manager sees a monthly savings report; daily ops are unchanged.

**MVP sketch**

```json
{
  "stack": "Python + Postgres + Geotab API + OpenADR",
  "agents": [
    "hermes:dispatch_reader",
    "openclaw:charge_optimizer_dag",
    "hermes:utility_settler"
  ],
  "data": "Telematics, dispatch, utility tariffs, DR signals.",
  "infra": "AWS + TimescaleDB; SOC 2.",
  "hitl": "Operator approves new tariff or new utility partnership."
}
```

---

### A vision-AI inspection that buyers trust more than a CarFax — and dealers can run from a phone.

`id: mobility_used_car_remote_inspection` · `v1.0.0` · `mobility`

- **Core problem:** 39M used cars sold/yr in US; dealers + private sellers lack trustworthy condition data; CarFax misses 60% of body damage.
- **Emotional driver:** fear
- **AI leverage:** Vision agent runs a 60-second guided phone scan; defect agent classifies frame, paint, undercarriage, mechanical signals.
- **Business model:** consumption
- **Monetization:** $19-49 per inspection; $999/mo unlimited for dealers.
- **Distribution:** Dealer-management-system partnerships (vAuto, CDK) + D2C via Craigslist/Facebook Marketplace integration.
- **Retention loop:** Per-VIN inspection history compounds; switching loses verified-condition badge.
- **Moat:** data — Per-VIN inspection corpus is unique; competitors must rebuild from zero.
- **Scalability:** 8/10 — Phone-only inspection; software margins.
- **Billion-dollar path:** Stage 1: D2C + small dealer. Stage 2: enterprise dealer + auction house. Stage 3: insurance + financing pricing layer.
- **Failure avoidance:** thin_wrapper_syndrome: own the defect classifier, not a UI on third-party CV; unsustainable_unit_economics: asset-light vs Vroom
- **Validation principle:** buffett — Defensible per-VIN data + dealer workflow lock; reject vanity inspection counts.
- **UI/UX model:** agent_mediated — Seller follows on-screen prompts; agent generates a buyer-shareable report in 5 minutes.

**MVP sketch**

```json
{
  "stack": "React Native + Python + Postgres + custom CV models",
  "agents": [
    "hermes:guided_capture",
    "openclaw:defect_classifier_dag",
    "hermes:report_renderer"
  ],
  "data": "Per-VIN inspection corpus, defect taxonomy, historical resale prices.",
  "infra": "AWS + S3 + GPU inference; SOC 2.",
  "hitl": "Trained inspector reviews any 'high concern' flag before report ships."
}
```

---

### An ML safety layer that drops e-bike injuries 40% by intervening before the swerve.

`id: mobility_micromobility_safety_layer` · `v1.0.0` · `mobility`

- **Core problem:** 150M e-bike + scooter trips annually result in 250k ER visits; existing fleets (Lime, Bird) lack predictive safety beyond geofencing.
- **Emotional driver:** fear
- **AI leverage:** Edge-AI on handlebar IMU + camera; rider-state agent slows or warns before high-risk swerve.
- **Business model:** licensing
- **Monetization:** $8-15 per device/mo licensed to fleet operators + cities.
- **Distribution:** Direct to fleet operators + city procurement.
- **Retention loop:** City-level safety data + insurance discount drives operator retention.
- **Moat:** regulatory — City RFP requirements increasingly mandate safety analytics; first-mover wins multi-year contracts.
- **Scalability:** 7/10 — Hardware partner integration is the bottleneck; software margins after.
- **Billion-dollar path:** Stage 1: micromobility fleets. Stage 2: bike-share + delivery rider safety. Stage 3: full urban mobility safety layer.
- **Failure avoidance:** hardware_scaling_chasm: software on partner hardware vs Canoo; regulatory_blind_spot: GDPR + CCPA-aligned rider data handling
- **Validation principle:** buffett — Insurance + city procurement create a defensible regulatory + operational moat.
- **UI/UX model:** invisible — Rider feels a slight throttle reduction in risky moments; no app interaction.

**MVP sketch**

```json
{
  "stack": "Edge: TFLite + Rust; cloud: Python + Postgres + Snowflake",
  "agents": [
    "hermes:imu_classifier",
    "openclaw:safety_intervention_dag",
    "hermes:incident_reporter"
  ],
  "data": "Per-city ride telemetry, incident records, hospital admission correlations.",
  "infra": "AWS + Snowflake; per-city data residency.",
  "hitl": "City partner approves any intervention policy change; safety officer reviews incident escalations."
}
```

---

### A roaming charging marketplace where private home chargers earn during the day.

`id: mobility_evs_charging_marketplace` · `v1.0.0` · `mobility`

- **Core problem:** 11M US home EV chargers sit idle 80% of the day; public network coverage is uneven; drivers route to gas-station-grade DCFC and pay 3x.
- **Emotional driver:** convenience
- **AI leverage:** Routing agent matches driver origin/destination/SOC to nearest cheap home charger; trust agent rates hosts + drivers.
- **Business model:** marketplace
- **Monetization:** 20% take rate on session $; $0.05/kWh insurance fee.
- **Distribution:** Charger OEM partnerships (Wallbox, ChargePoint home) + EV-driver community channels.
- **Retention loop:** Two-sided liquidity per metro; once dense, drivers and hosts can't switch without losing earnings/availability.
- **Moat:** network — Two-sided density compounds; new entrants face cold-start in every metro.
- **Scalability:** 8/10 — Software-only marketplace; capital is host-supplied chargers.
- **Billion-dollar path:** Stage 1: home roaming. Stage 2: SMB destination charging. Stage 3: V2G + grid-services bundle.
- **Failure avoidance:** hardware_scaling_chasm: marketplace, not OEM; regulatory_blind_spot: utility tariffs + state PUC rules per metro
- **Validation principle:** medici — Indispensable infrastructure for distributed charging; both sides depend on us.
- **UI/UX model:** agent_mediated — Driver enters destination; agent picks the cheapest viable charger; host gets paid automatically.

**MVP sketch**

```json
{
  "stack": "Next.js + Postgres + OCPP gateway + Stripe",
  "agents": [
    "hermes:routing_optimizer",
    "openclaw:dispute_dag",
    "hermes:settlement_processor"
  ],
  "data": "Per-charger availability, session history, driver SOC, utility tariffs.",
  "infra": "AWS + TimescaleDB; per-state regulatory.",
  "hitl": "Ops resolves disputes >$200; safety reviews reported equipment issues."
}
```

---

### A returns-logistics network that turns the $800B reverse-supply problem into per-pallet profit.

`id: mobility_freight_returns_optimizer` · `v1.0.0` · `mobility`

- **Core problem:** $800B/yr in US returns burns warehouse capacity + truck miles; carriers see returns as a cost line, not a routing optimization problem.
- **Emotional driver:** convenience
- **AI leverage:** Returns-routing agent consolidates pickups + matches to backhaul lanes; resale agent values items at return time and routes to liquidation/refurb/restock.
- **Business model:** transaction_fee
- **Monetization:** $2-8 per package + 5% of resale recovered value.
- **Distribution:** Direct to D2C brands + 3PL partnerships.
- **Retention loop:** Per-brand returns history + lane density compound; switching loses recovery rates.
- **Moat:** network — Lane density + per-brand resale outcomes compound; cold-start barrier.
- **Scalability:** 9/10 — $800B TAM; software-orchestrated; capital is partner trucks.
- **Billion-dollar path:** Stage 1: D2C apparel returns. Stage 2: cross-category. Stage 3: returns-as-a-service for marketplaces.
- **Failure avoidance:** unsustainable_unit_economics: per-package + resale split keeps margin healthy; market_timing_failure: returns volume is structural, not COVID-driven
- **Validation principle:** buffett — Lane density + recovery-rate moat compounds; reject vanity volume metrics.
- **UI/UX model:** invisible — Brand sees recovered $ per month; consumer sees a friction-free return label.

**MVP sketch**

```json
{
  "stack": "Python + Postgres + Optaplanner + Shopify API",
  "agents": [
    "hermes:return_classifier",
    "openclaw:routing_dag",
    "hermes:resale_router"
  ],
  "data": "Per-brand SKU resale data, lane density, carrier capacity.",
  "infra": "AWS + Snowflake; SOC 2.",
  "hitl": "Ops approves new lane onboarding; finance reviews any monthly settlement >$1M."
}
```

---

### A dispatch brain that lets independent taxi operators beat Uber surge pricing in their metro.

`id: mobility_dispatch_brain_for_taxis` · `v1.0.0` · `mobility`

- **Core problem:** 180k US/EU independent taxi operators lost share to Uber/Lyft; they have local relationships but no surge-pricing intelligence.
- **Emotional driver:** autonomy
- **AI leverage:** Demand-prediction agent forecasts per-cell demand 30 min ahead; pricing agent matches Uber surge dynamically.
- **Business model:** subscription
- **Monetization:** $15-40 per driver/mo; cooperative rev-share for federation members.
- **Distribution:** Taxi cooperative + association partnerships (NYC TLC, Curb).
- **Retention loop:** Per-driver + per-cell demand history compounds; switching forfeits forecast accuracy.
- **Moat:** data — Hyperlocal demand corpus per metro is unique.
- **Scalability:** 7/10 — Co-op channel slow; per-metro deployment is the bottleneck.
- **Billion-dollar path:** Stage 1: taxi co-ops. Stage 2: independent rideshare (BlaBlaCar-style). Stage 3: global federation against duopoly platforms.
- **Failure avoidance:** commoditization_collapse: vertical-deep with cooperatives vs Uber's mass market; regulatory_blind_spot: TLC + per-city PHV rules
- **Validation principle:** medici — Indispensable infrastructure for local taxi cooperatives; we make others sovereign.
- **UI/UX model:** dashboard_plus_chat — Driver sees a heatmap + pricing recommendations; chat to ask 'where should I go in 30 min'.

**MVP sketch**

```json
{
  "stack": "Next.js + Python + Postgres + Mapbox",
  "agents": [
    "hermes:demand_forecaster",
    "openclaw:dispatch_dag",
    "hermes:pricing_engine"
  ],
  "data": "Per-cell trip history, weather, events, competitor surge feeds.",
  "infra": "AWS + TimescaleDB; per-city compliance.",
  "hitl": "Co-op board approves pricing policies; ops reviews algorithmic anomalies."
}
```

---

### An RV resale concierge that values, lists, inspects, and finances — without touching the asset.

`id: mobility_rv_resale_concierge` · `v1.0.0` · `mobility`

- **Core problem:** 10M US RVs depreciate $4-8k/yr; resale is fragmented, opaque, and broker-heavy; private sellers lose 18-25% to friction.
- **Emotional driver:** convenience
- **AI leverage:** Valuation agent prices per make/model/condition; listing agent generates marketplace-ready spec sheets; financing agent qualifies buyers.
- **Business model:** transaction_fee
- **Monetization:** 1.5% seller fee + 1% financing referral; capped at $4k.
- **Distribution:** RV park + dealer partnerships; PLG via 'free valuation' wedge.
- **Retention loop:** Resale history per VIN compounds; future trade-ins lock continuity.
- **Moat:** data — Per-VIN resale outcome data improves valuations.
- **Scalability:** 7/10 — Asset-light; market is mid-tail; community channel slow.
- **Billion-dollar path:** Stage 1: RV resale. Stage 2: boats + powersports. Stage 3: full second-hand high-ticket asset platform.
- **Failure avoidance:** unsustainable_unit_economics: asset-light vs Vroom; capped fee keeps trust; regulatory_blind_spot: state DMV title rules per jurisdiction
- **Validation principle:** buffett — Asset-light moat with per-VIN data; reject inventory exposure.
- **UI/UX model:** agent_mediated — Seller uploads photos + VIN; concierge runs the rest.

**MVP sketch**

```json
{
  "stack": "Next.js + Postgres + Stripe + DocuSign",
  "agents": [
    "hermes:valuation_engine",
    "openclaw:listing_dag",
    "hermes:title_processor"
  ],
  "data": "Per-VIN history, resale prices, financing rates.",
  "infra": "AWS + RDS; per-state DMV compliance.",
  "hitl": "Ops verifies title transfer; finance approves any deal >$100k."
}
```

---

### OBD-II + AI maintenance copilot that keeps a tradesperson's truck on the road and the next job booked.

`id: mobility_predictive_maintenance_for_tradesmen` · `v1.0.0` · `mobility`

- **Core problem:** 8M US tradespeople lose $200/day per truck downtime; existing fleet telematics priced for 50+ trucks.
- **Emotional driver:** fear
- **AI leverage:** OBD-II + audio-vibration agent classifies wear; maintenance-scheduling agent books service to avoid revenue gaps.
- **Business model:** subscription
- **Monetization:** $25-45/mo per truck + $99 OBD-II dongle.
- **Distribution:** Trade SaaS partnerships (Jobber, Housecall Pro) + supply-house channel (Ferguson).
- **Retention loop:** Per-truck signature compounds; service history locked.
- **Moat:** data — Per-truck wear corpus across thousands improves fault detection.
- **Scalability:** 7/10 — Hardware-light dongle; SaaS distribution scales fast.
- **Billion-dollar path:** Stage 1: trades. Stage 2: SMB delivery fleets. Stage 3: insurance + warranty partner offering.
- **Failure avoidance:** hardware_scaling_chasm: dongle is commodity; value is software; thin_wrapper_syndrome: own the per-truck signature corpus
- **Validation principle:** rothschild — Own the per-truck wear data layer; competitors price on miles + age alone.
- **UI/UX model:** agent_mediated — Trades app shows 'service due Tuesday'; agent books with the local shop.

**MVP sketch**

```json
{
  "stack": "React Native + Python + Postgres + OBD-II BLE",
  "agents": [
    "hermes:obd_ingestor",
    "openclaw:fault_classifier_dag",
    "hermes:scheduler"
  ],
  "data": "OBD-II streams, audio-vibration recordings, service history.",
  "infra": "AWS + TimescaleDB; SOC 2.",
  "hitl": "Mechanic reviews any 'do not drive' flag before SMS to operator."
}
```

---

### A city OS for the curb that prices loading zones, deliveries, and ride-hails by the minute.

`id: mobility_curb_management_city_os` · `v1.0.0` · `mobility`

- **Core problem:** 200 US cities lose $2B+/yr to mismanaged curb space; double parking, blocked bike lanes, and lost meter revenue compound.
- **Emotional driver:** mastery
- **AI leverage:** Vision-on-pole agent classifies vehicle type + duration; pricing agent dynamically prices and bills via license plate.
- **Business model:** RaaS
- **Monetization:** City contract + 8-12% of dynamic curb-revenue uplift.
- **Distribution:** Direct city procurement + smart-city consortium channels.
- **Retention loop:** Per-city curb data + state PUC contract creates multi-year lock.
- **Moat:** regulatory — Multi-year city contracts + integration into permit systems create high switching costs.
- **Scalability:** 7/10 — City sales cycle 12-24 months; once installed, expansion within metro fast.
- **Billion-dollar path:** Stage 1: 10 mid-size cities. Stage 2: top-50 US metros. Stage 3: global curb-as-a-service infrastructure.
- **Failure avoidance:** regulatory_blind_spot: ALPR privacy + ADA compliance per city; unsustainable_unit_economics: outcome share keeps cities aligned
- **Validation principle:** medici — Indispensable infrastructure for urban mobility; cities and operators both depend on us.
- **UI/UX model:** invisible — Driver parks; agent tracks duration + bills via plate; receipt arrives via SMS.

**MVP sketch**

```json
{
  "stack": "Edge: NVIDIA Jetson + Rust; cloud: Python + Postgres + Snowflake",
  "agents": [
    "hermes:curb_classifier",
    "openclaw:dynamic_pricing_dag",
    "hermes:billing_router"
  ],
  "data": "Per-block curb usage, ALPR (anonymized), city permit data.",
  "infra": "AWS + Snowflake; per-city data residency + privacy review.",
  "hitl": "City staff approve every pricing schedule change; privacy officer reviews ALPR retention."
}
```

---

### Vertiport operations OS — gate management, charging, FAA reporting — for the eVTOL era.

`id: mobility_evtol_vertiport_ops` · `v1.0.0` · `mobility`

- **Core problem:** First-wave vertiports (LA, NYC, Dubai) need ops infrastructure; current providers (Skyports, UrbanV) build airfields not software.
- **Emotional driver:** mastery
- **AI leverage:** Slot-allocation agent schedules gates by aircraft type + charge time; FAA-reporting agent files Form 7233 + ATC slots.
- **Business model:** subscription
- **Monetization:** $8-30k/mo per vertiport + $1-3 per movement.
- **Distribution:** Direct partnership with vertiport developers + eVTOL operators (Joby, Archer).
- **Retention loop:** FAA-integration + ops history lock multi-year contracts.
- **Moat:** regulatory — FAA + EASA vertiport certification cycles favor first-mover; integrations are existential.
- **Scalability:** 7/10 — Vertiport rollout 2026-2030 is the gating factor.
- **Billion-dollar path:** Stage 1: pilot vertiports in 3 cities. Stage 2: top-30 metros. Stage 3: global UAM ground ops standard.
- **Failure avoidance:** hardware_scaling_chasm: software for ops, not building airframes; regulatory_blind_spot: FAA Part 139 + EASA vertiport SC-VTOL alignment
- **Validation principle:** medici — Indispensable infrastructure for the UAM ecosystem; we make operators and cities sovereign.
- **UI/UX model:** dashboard_plus_chat — Manager sees a live gate map; chat to ask 'can we accept the 14:30 slot' with constraints answered.

**MVP sketch**

```json
{
  "stack": "Python + FastAPI + Postgres + Mapbox + ADS-B",
  "agents": [
    "hermes:slot_allocator",
    "openclaw:vertiport_ops_dag",
    "hermes:faa_reporter"
  ],
  "data": "Aircraft telemetry, charge state, gate availability, ATC slots.",
  "infra": "AWS GovCloud-ready; FAA + EASA aligned.",
  "hitl": "Vertiport manager approves any schedule deviation; safety officer signs incident reports."
}
```

