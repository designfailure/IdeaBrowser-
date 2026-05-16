# Wearables — 10 Blueprints

> Continuous health + performance + safety wearables.

### A non-diabetic CGM coach that turns your daily glucose curve into a one-line action.

`id: wearables_continuous_glucose_for_metabolic_health` · `v1.0.0` · `wearables`

- **Core problem:** 100M+ US adults are pre-diabetic or insulin-resistant; CGMs (Levels, Nutrisense) drown users in graphs without action.
- **Emotional driver:** mastery
- **AI leverage:** Curve-pattern agent classifies meal/sleep/exercise responses; coaching agent prescribes one daily change with measurable target.
- **Business model:** subscription
- **Monetization:** $199/mo coaching + Rx CGM cost (operator-supplied or insurance).
- **Distribution:** MD partnerships + employer wellness benefits; PLG via free 'glucose curve from photo' wedge.
- **Retention loop:** Per-user response corpus locks personalization.
- **Moat:** data — Per-user food/sleep/exercise → glucose response corpus is unique.
- **Scalability:** 7/10 — Rx + sensor supply + insurance coverage gate; coaching scales via API.
- **Billion-dollar path:** Stage 1: D2C health-conscious. Stage 2: insurer + employer bundle. Stage 3: full metabolic-health platform with longevity outcomes.
- **Failure avoidance:** regulatory_blind_spot: HIPAA + FDA labeling for wellness vs medical claims; fake_ai_trap: clinician reviews any prescriptive change
- **Validation principle:** rothschild — Per-user metabolic data is asymmetric; food + activity apps see only inputs.
- **UI/UX model:** agent_mediated — User snaps a meal photo; agent predicts spike and suggests a tweak; daily action delivered as a single notification.

**MVP sketch**

```json
{
  "stack": "React Native + Python + Postgres + Dexcom/Abbott API",
  "agents": [
    "hermes:curve_classifier",
    "openclaw:coaching_dag",
    "hermes:meal_logger"
  ],
  "data": "Per-user CGM + food + sleep + activity corpus.",
  "infra": "AWS + RDS; HIPAA + HITRUST.",
  "hitl": "Clinician approves any new coaching protocol; user approves any data sharing."
}
```

---

### An athlete recovery HUD that tells you the right warmup and the right wattage today.

`id: wearables_athlete_recovery_hud` · `v1.0.0` · `wearables`

- **Core problem:** 60M serious amateur athletes train without recovery science; Whoop/Oura give scores, not prescriptions.
- **Emotional driver:** mastery
- **AI leverage:** Recovery agent fuses HRV, sleep, soreness, training load; prescription agent sets workout intensity + warmup.
- **Business model:** subscription
- **Monetization:** $25/mo + Whoop/Oura referral kickback.
- **Distribution:** Coach + gym partnerships + creator channels.
- **Retention loop:** Per-athlete response corpus + coach integration lock.
- **Moat:** data — Per-athlete training load + recovery response corpus is unique.
- **Scalability:** 8/10 — Wearable APIs + scalable coaching engine.
- **Billion-dollar path:** Stage 1: amateur athletes. Stage 2: pro teams + colleges. Stage 3: full performance OS for athletic departments.
- **Failure avoidance:** thin_wrapper_syndrome: own the prescription engine, not a UI on Whoop; commoditization_collapse: depth + coach integration
- **Validation principle:** rothschild — Per-athlete response data is asymmetric; wearables see only physiology.
- **UI/UX model:** voice_first — Athlete asks 'how should I train today'; agent answers with intensity + warmup.

**MVP sketch**

```json
{
  "stack": "React Native + Python + Postgres + Whoop/Oura/Garmin API",
  "agents": [
    "hermes:recovery_scorer",
    "openclaw:prescription_dag",
    "hermes:coach_messenger"
  ],
  "data": "Per-athlete HRV + sleep + training load + perceived exertion.",
  "infra": "AWS + RDS; SOC 2.",
  "hitl": "Certified coach reviews any extreme intensity change; athlete approves coach access."
}
```

---

### A smart ring that calls your daughter when grandma's heart rhythm flags afib — without her knowing she's wearing a med device.

`id: wearables_smart_ring_for_seniors` · `v1.0.0` · `wearables`

- **Core problem:** 55M US adults 65+; afib detection is gated by Apple Watch; many won't wear a watch.
- **Emotional driver:** fear
- **AI leverage:** PPG-rhythm agent classifies afib + falls; family agent notifies adult children with severity + context.
- **Business model:** hardware_plus_software
- **Monetization:** $249 ring + $19/mo monitoring; Medicare reimbursement potential.
- **Distribution:** Adult-children D2C + Medicare Advantage health-plan bundles.
- **Retention loop:** Per-elder rhythm signature lock.
- **Moat:** data — Per-elder PPG corpus + family network compounds.
- **Scalability:** 7/10 — Hardware + FDA pathway gate; software margins after.
- **Billion-dollar path:** Stage 1: D2C + insurer bundle. Stage 2: senior living. Stage 3: full ambient health-monitoring OS for elders.
- **Failure avoidance:** regulatory_blind_spot: FDA SaMD pathway scoped; hardware_scaling_chasm: contract manufacturer + OEM ring partnership
- **Validation principle:** buffett — FDA + insurance moat compounds; reject vanity ring sales.
- **UI/UX model:** invisible — Elder wears the ring; family gets alerts only when warranted.

**MVP sketch**

```json
{
  "stack": "Embedded + Python + Postgres + AWS IoT",
  "agents": [
    "hermes:rhythm_classifier",
    "openclaw:notification_dag",
    "hermes:family_router"
  ],
  "data": "Per-elder PPG + accelerometer + family network.",
  "infra": "AWS + Snowflake; HIPAA + FDA documentation.",
  "hitl": "Clinician reviews any afib alert before ER notification."
}
```

---

### A posture coach that buzzes you back into shape before lower-back pain becomes a $5k MRI.

`id: wearables_posture_haptic_coach` · `v1.0.0` · `wearables`

- **Core problem:** 85M US desk workers report chronic back pain; wearable posture coaches (Upright) lacked ML personalization and adoption fell off.
- **Emotional driver:** mastery
- **AI leverage:** IMU agent classifies posture + movement; coaching agent personalizes haptic intensity + frequency.
- **Business model:** hardware_plus_software
- **Monetization:** $129 device + $9/mo coaching.
- **Distribution:** Corporate wellness + chiropractor partnership channels.
- **Retention loop:** Per-user posture pattern + coaching history lock.
- **Moat:** data — Per-user posture corpus improves coaching.
- **Scalability:** 6/10 — Mid-tail; B2B wellness channel scales.
- **Billion-dollar path:** Stage 1: corporate wellness. Stage 2: chiropractor + PT bundle. Stage 3: musculoskeletal health platform.
- **Failure avoidance:** thin_wrapper_syndrome: own the coaching personalization engine; market_timing_failure: pain is structural, not pandemic-driven
- **Validation principle:** buffett — Defensible coaching brand + corporate wellness retention.
- **UI/UX model:** invisible — User wears device; haptic gently corrects in real time; weekly digest in app.

**MVP sketch**

```json
{
  "stack": "Embedded + React Native + Python + Postgres",
  "agents": [
    "hermes:posture_classifier",
    "openclaw:coaching_dag",
    "hermes:exercise_prescriber"
  ],
  "data": "Per-user IMU traces, exercise compliance, pain reports.",
  "infra": "AWS + RDS; SOC 2.",
  "hitl": "PT reviews any exercise prescription change."
}
```

---

### A baby sleep wearable that nudges parents to act 30 seconds before the wake-up cry.

`id: wearables_baby_sleep_intervention` · `v1.0.0` · `wearables`

- **Core problem:** 4M US new-parent households face brutal sleep deprivation; existing monitors (Owlet, Nanit) alert during, not before.
- **Emotional driver:** fear
- **AI leverage:** Sleep-stage agent classifies via HR + sound; intervention agent suggests action before transition (room temp, white noise, swaddle re-tuck).
- **Business model:** hardware_plus_software
- **Monetization:** $199 monitor + $12/mo coaching.
- **Distribution:** OB + pediatrician channel + new-parent retail (BuyBuyBaby).
- **Retention loop:** Per-baby sleep corpus + parent-coaching lock.
- **Moat:** data — Per-baby sleep corpus + parent action outcome data is unique.
- **Scalability:** 7/10 — Hardware install gates; software margins after.
- **Billion-dollar path:** Stage 1: 0-12 mo. Stage 2: toddler + child-development OS. Stage 3: pediatric care + insurer bundle.
- **Failure avoidance:** regulatory_blind_spot: FDA SaMD scoped + AAP guidelines; fake_ai_trap: pediatric advisor reviews any prescriptive intervention
- **Validation principle:** buffett — Defensible parent-trust brand + medical partnerships.
- **UI/UX model:** voice_first — Parent gets a soft voice prompt 'rock now, 10 seconds, soft'.

**MVP sketch**

```json
{
  "stack": "Embedded + React Native + Python + Postgres",
  "agents": [
    "hermes:sleep_stage_classifier",
    "openclaw:intervention_dag",
    "hermes:parent_messenger"
  ],
  "data": "Per-baby HR + sound + motion + parent action outcomes.",
  "infra": "AWS + Snowflake; HIPAA-aligned + FDA documentation.",
  "hitl": "Pediatric advisor approves any new intervention protocol."
}
```

---

### A breath regulator wearable that drops your cortisol before you snap at a coworker.

`id: wearables_stress_breath_regulator` · `v1.0.0` · `wearables`

- **Core problem:** 200M+ knowledge workers face daily acute stress; meditation apps (Calm, Headspace) require time + intent that stressed people don't have.
- **Emotional driver:** mastery
- **AI leverage:** HRV + skin-conductance agent detects stress onset; intervention agent triggers haptic-paced breathing.
- **Business model:** subscription
- **Monetization:** $199 device + $8/mo subscription; corporate wellness $4/mo per employee.
- **Distribution:** Corporate wellness + EAP channels.
- **Retention loop:** Per-user stress signature + intervention success lock.
- **Moat:** data — Per-user stress + intervention corpus improves recommendations.
- **Scalability:** 7/10 — Hardware + B2B wellness channel scales fast.
- **Billion-dollar path:** Stage 1: D2C + corporate wellness. Stage 2: clinical anxiety adjunct (FDA-cleared). Stage 3: full nervous-system regulation platform.
- **Failure avoidance:** regulatory_blind_spot: FDA wellness vs medical claim boundary; thin_wrapper_syndrome: own the intervention engine
- **Validation principle:** buffett — Defensible wellness brand + corporate retention.
- **UI/UX model:** invisible — Wearable buzzes gently; user breathes with the haptic; cortisol drops.

**MVP sketch**

```json
{
  "stack": "Embedded + React Native + Python + Postgres",
  "agents": [
    "hermes:stress_classifier",
    "openclaw:breath_dag",
    "hermes:wellness_logger"
  ],
  "data": "Per-user HRV + skin conductance + intervention outcomes.",
  "infra": "AWS + RDS; HIPAA-aligned for corporate wellness.",
  "hitl": "Clinical advisor approves any intervention protocol change."
}
```

---

### An industrial safety vest that detects a fall + heat-stress + dropped tool before OSHA does.

`id: wearables_industrial_safety_vest` · `v1.0.0` · `wearables`

- **Core problem:** 5M US construction + warehouse workers face injury rates 3x national avg; existing vests are reflective fabric, not telemetry.
- **Emotional driver:** fear
- **AI leverage:** IMU + temperature + sound agent classifies events; safety agent notifies foreman + emergency contacts.
- **Business model:** subscription
- **Monetization:** $25/mo per worker + $99 vest + insurance discount.
- **Distribution:** GC + insurance carrier partnerships; OSHA-aligned compliance pitch.
- **Retention loop:** Per-worker telemetry + insurance discount lock.
- **Moat:** regulatory — OSHA + insurance partnership creates switching cost.
- **Scalability:** 7/10 — Hardware install gates; B2B sales scale.
- **Billion-dollar path:** Stage 1: construction + warehouse. Stage 2: utility + oilfield. Stage 3: full industrial workforce safety OS.
- **Failure avoidance:** regulatory_blind_spot: OSHA + state worker-comp rules; hardware_scaling_chasm: contract manufacturer + apparel OEM
- **Validation principle:** medici — Indispensable infrastructure for industrial safety; workers + GCs + insurers all benefit.
- **UI/UX model:** invisible — Worker wears vest; foreman gets alert only when warranted.

**MVP sketch**

```json
{
  "stack": "Embedded + Python + Postgres + Twilio",
  "agents": [
    "hermes:fall_classifier",
    "openclaw:safety_alert_dag",
    "hermes:foreman_messenger"
  ],
  "data": "Per-worker telemetry, incident corpus, OSHA records.",
  "infra": "AWS + Snowflake; ISO 45001 alignment.",
  "hitl": "Safety officer reviews any incident escalation."
}
```

---

### Headphones that adapt focus music to your concentration level in real time.

`id: wearables_headphones_focus_coach` · `v1.0.0` · `wearables`

- **Core problem:** 200M+ focus-music listeners use generic playlists; brain-music research (Brain.fm) is preset-driven.
- **Emotional driver:** mastery
- **AI leverage:** EEG-on-headphone + interaction agent classifies focus state; music agent adapts tempo + complexity.
- **Business model:** subscription
- **Monetization:** $15/mo + $99 device subsidy.
- **Distribution:** D2C + remote-work tooling partnerships.
- **Retention loop:** Per-user focus signature + music response corpus lock.
- **Moat:** data — Per-user EEG + music response corpus is unique.
- **Scalability:** 6/10 — Hardware EEG-headphone availability gates.
- **Billion-dollar path:** Stage 1: D2C focus. Stage 2: ADHD + meditation adjunct. Stage 3: full neurofeedback wellness platform.
- **Failure avoidance:** regulatory_blind_spot: FDA wellness vs medical claim boundary; thin_wrapper_syndrome: own the EEG + music adaptation engine
- **Validation principle:** rothschild — Per-user EEG + music-response data is asymmetric; preset apps are blind.
- **UI/UX model:** invisible — User puts on headphones; music adapts; focus session logged.

**MVP sketch**

```json
{
  "stack": "Embedded + React Native + Python + Postgres + custom DSP",
  "agents": [
    "hermes:focus_classifier",
    "openclaw:music_adapt_dag",
    "hermes:session_logger"
  ],
  "data": "Per-user EEG + interaction + music response.",
  "infra": "AWS + RDS; SOC 2.",
  "hitl": "Clinical advisor reviews any new protocol."
}
```

---

### A smart insole that prevents diabetic foot ulcers — the most expensive complication in healthcare.

`id: wearables_diabetic_foot_intervention` · `v1.0.0` · `wearables`

- **Core problem:** 5M US diabetics develop foot ulcers/yr; treatment cost $9-25k each; existing insoles (Orpyx, Siren) struggle with adoption.
- **Emotional driver:** fear
- **AI leverage:** Pressure-temp agent detects pre-ulcer hot spots; alert agent notifies user + endocrinologist.
- **Business model:** outcome_based
- **Monetization:** $79/mo via insurance reimbursement + outcome bonus.
- **Distribution:** Endocrinologist + podiatrist partnerships + Medicare Advantage carriers.
- **Retention loop:** Per-patient foot signature + clinician relationship lock.
- **Moat:** regulatory — FDA cleared + insurance reimbursement creates switching cost.
- **Scalability:** 7/10 — Clinical + insurance partnerships gate; hardware established.
- **Billion-dollar path:** Stage 1: diabetic foot. Stage 2: peripheral artery disease. Stage 3: full endocrinology OS bundled with care.
- **Failure avoidance:** regulatory_blind_spot: FDA + CMS reimbursement codes scoped; fake_ai_trap: clinician reviews any escalation
- **Validation principle:** buffett — FDA + reimbursement moat + outcome guarantees; reject vanity device sales.
- **UI/UX model:** invisible — Patient wears insole; clinician notified silently before ulcer forms.

**MVP sketch**

```json
{
  "stack": "Embedded + Python + Postgres + AWS IoT + EHR integration",
  "agents": [
    "hermes:foot_classifier",
    "openclaw:alert_dag",
    "hermes:clinician_router"
  ],
  "data": "Per-patient pressure-temp, ulcer corpus, outcome data.",
  "infra": "AWS + Snowflake; HIPAA + FDA documentation.",
  "hitl": "Clinician reviews any 'high risk' flag before patient notification."
}
```

---

### AR glasses that whisper a name + last conversation when you re-meet someone at a party.

`id: wearables_emotion_aware_ar_glasses` · `v1.0.0` · `wearables`

- **Core problem:** Memory + social anxiety affects 100M+ adults; existing tools (Notion, Roam) require active note-taking.
- **Emotional driver:** status
- **AI leverage:** Vision agent identifies known faces (opt-in); memory agent surfaces last conversation + relationship context to AR display.
- **Business model:** subscription
- **Monetization:** $25/mo software + $499 glasses (subsidized via partnership).
- **Distribution:** Professional networks + AR-headset OEM partnerships (Meta Ray-Ban, Apple Vision).
- **Retention loop:** Per-user social graph + memory corpus lock.
- **Moat:** switching_cost — Personal social graph + memory corpus is account-locked.
- **Scalability:** 6/10 — AR glasses adoption is the gating constraint.
- **Billion-dollar path:** Stage 1: professionals + execs. Stage 2: people-with-memory-conditions. Stage 3: full social-memory OS.
- **Failure avoidance:** regulatory_blind_spot: BIPA + state biometric privacy laws (Illinois, Texas); fake_ai_trap: opt-in only; transparent face-data retention
- **Validation principle:** rothschild — Personal social graph is asymmetric; networking tools see only LinkedIn.
- **UI/UX model:** ar_overlay — User looks at someone; AR shows name + last topic + 'they're back from Lisbon trip'.

**MVP sketch**

```json
{
  "stack": "AR SDK + Python + Postgres + custom face embeddings",
  "agents": [
    "hermes:face_recognizer",
    "openclaw:memory_dag",
    "hermes:context_renderer"
  ],
  "data": "Per-user opt-in face embeddings, conversation memory, relationship metadata.",
  "infra": "AWS + KMS; on-device-first inference; per-state privacy compliance.",
  "hitl": "Privacy officer reviews data retention; user controls who is memorized."
}
```

