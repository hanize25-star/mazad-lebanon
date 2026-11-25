# Dalilni Meta Ads Playbook

Saved Nov 25, 2026. Ad account: Dalilni (2322522435245370, USD).

- **Live dashboard:** https://claude.ai/artifact/7rFSSKSz4oTEcxcN8hUys6
- **Daily report:** scheduled task "Dalilni daily Meta ads update", 9:34 AM Beirut time. Add the *meta ads* connector to it on claude.ai or it can't read your data.

## Snapshot: last 14 days (Nov 12–25)

| Spent | Impressions | Clicks | CTR | CPM |
|---|---|---|---|---|
| $220.11 | 139,987 | 6,561 | 4.69% | $1.57 |

| Platform | Spend | CTR | CPM |
|---|---|---|---|
| Facebook | $114.17 | 5.68% | $1.35 |
| Instagram | $95.54 | 3.87% | $2.15 |
| Audience Network | $10.26 | 0.21% | — |

## Every ad

| Ad | Score | Strengths | Weaknesses |
|---|---|---|---|
| Social Proof Reel ($125, Active) | 26 | 5 IG follows | 57% of budget, 24% of clicks; 0.33% CTR on Instagram; 3.3% ThruPlay rate |
| Reel – Your beauty, your choice ($26, Paused) | 50 | Clicks go to the link; 4 follows | $2.51 CPM; weak video hold |
| Engagement Interactions ($20, Paused) | 38 | 8.7% CTR | Only 1.5% of clicks reach the link |
| Reel ليش تدفعي أكتر \| Install ($15, Active) | 74 | 12.6% CTR on Instagram; 33% ThruPlay rate | Installs not tracked |
| Engagement – Copy ($14, Active) | 50 | 11% CTR; $0.99 CPM | 0.36% CTR on Instagram vs 15.9% on Facebook |
| New Engagement Ad ($14, Paused) | low | High video completion | 0.24% CTR; mostly Audience Network |
| Engagement – Copy 2 ($6, Active) | 38 | 12.7% CTR on Facebook | 0% CTR on Instagram |

## Changes made

- **Nov 25, 2026:** Social Proof Reel campaign $4 → $2/day; Engagement – Copy campaign $4 → $6/day. Same total spend. Check on Nov 28 whether Copy still has about 11% CTR.

## To do, step by step (Ads Manager)

### 1. Run Copy and Copy 2 on Facebook only
1. Ad sets: tick "Dalilni | Engagement | Interactions - Copy", then click Edit.
2. Placements: switch to **Manual**, untick Instagram, Audience Network and Threads.
3. Publish. Repeat for "Copy 2". Check that both are On / Active.

### 2. Turn off Audience Network on the Installs ad set
1. Edit "Beirut 17km | Women 18-48 | iOS 14+ | Installs", then go to Placements and choose Manual.
2. Untick Audience Network, keep Instagram and Facebook. Publish.

### 3. Fix install tracking (developer)
1. Events Manager: Connect data sources, then App, then Dalilni.
2. Install the Meta SDK and turn on SKAdNetwork and App Install events.
3. Test events: open the app on an iPhone and confirm that App Install shows up.
4. Keep the Installs campaign at $7/day until installs show up.

### 4. Make more ads like the winner
1. Duplicate "Reel | ليش تدفعي أكتر | Install".
2. Vertical 9:16 Reel, offer in the first 2 seconds, price/savings hook.
3. Make 2–3 versions, test them for 3–4 days, keep the one with the best CTR.

### 5. Recut weak videos (Social Proof Reel, Copy 2)
- 0–2 seconds: a face or the result, no logo intro.
- Text on screen, because most people watch muted.
- 8–15 seconds.
- One call to action: "حمّلي التطبيق" (download the app) or "شوفي العروض" (see the offers).

## Weekly routine (Mondays, 5 min)
1. Open the dashboard and read **Best moves**.
2. Pause any ad that scores under 40 two weeks in a row.
3. Add 20% budget to any active ad that scores 60 or more.
4. Replace any creative whose CTR drops for 7 days.

## Scoring rules (as on the dashboard)
- CTR of 8% or more is a strength, under 1% is a weakness.
- CPM of $1.20 or less is a strength, $2.20 or more is a weakness.
- ThruPlay rate of 25% or more is a strength, under 5% is a weakness.
- Instagram CTR of 5% or more is a strength. Under 1% while Instagram takes 15% or more of the ad's spend is a weakness.
- Fewer than 5% of clicks reaching the link is a weakness.
- Frequency of 2 or more is a weakness. An install ad with no installs reported is a weakness.
- Score = 50 + 12 per strength − 12 per weakness, kept between 0 and 100.
