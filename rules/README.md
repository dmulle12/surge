# Rule index

One-line snippets for the `[Rule]` section of your existing Surge config.
All lists are built daily by [dmulle12/rules](https://github.com/dmulle12/rules)
CI and published to its `rel` branch.

> Honest note: DNS/domain blocking stops third-party ads and trackers. It
> cannot block in-feed ads served from the same first-party domain as the
> content itself (e.g. Facebook/TikTok feed ads) — blocking those domains
> would break the app.

## Ad blocking

```ini
# hagezi Multi PRO (~231k domains, recommended)
DOMAIN-SET,https://github.com/dmulle12/rules/raw/rel/ads.list,REJECT

# hagezi PRO mini (~60k domains, for low-memory devices)
DOMAIN-SET,https://github.com/dmulle12/rules/raw/rel/ads-mini.list,REJECT

# DLC category-ads-all based alternative
DOMAIN-SET,https://github.com/dmulle12/rules/raw/rel/reject.list,REJECT
```

## 回国-style routing

```ini
# Douyin — put this BEFORE streaming-cn (both contain douyin domains)
DOMAIN-SET,https://github.com/dmulle12/rules/raw/rel/douyin.list,BackCN

# Mainland streaming & entertainment
DOMAIN-SET,https://github.com/dmulle12/rules/raw/rel/streaming-cn.list,BackCN

# Mainland China domains
DOMAIN-SET,https://github.com/dmulle12/rules/raw/rel/loc-cn.list,BackCN

# Mainland China IPs (needs the GeoIP database below)
GEOIP,CN,BackCN
```

```ini
# [General] — China-only GeoIP database (MaxMind format), rebuilt daily
geoip-maxmind-url = https://github.com/dmulle12/rules/raw/rel/chnroutes.mmdb
```

## US routing

```ini
# Microsoft services + US school domains
DOMAIN-SET,https://github.com/dmulle12/rules/raw/rel/microsoft.list,US
```
