# dmulle12/surge

A complete, self-hosted Surge resource repository: a ready-to-use profile, a rule-set index, and modules — all wired to rule data that updates itself every day.

This repo is the **consumer side** of a small self-owned supply chain:

- [dmulle12/rules](https://github.com/dmulle12/rules) — daily CI builds rule assets (domains, ad lists, GeoIP) from upstream sources (v2fly, hagezi, gfwlist, Loyalsoldier, …).
- **dmulle12/surge** (this repo) — the Surge-facing layer: profile, modules, and documentation that reference those assets.

Nothing here depends on anyone else's rule service. If an upstream changes, the daily build picks it up; this repo keeps working.

## Layout

```text
surge/
├── profiles/
│   └── surge.conf          # Complete, annotated Surge profile template
├── rules/
│   └── README.md           # Index of self-hosted rule sets + one-line snippets
├── modules/
│   └── adblock.sgmodule    # Ad/tracker blocking module (self-hosted list)
├── README.md / README.zh-CN.md
├── LICENSE                 # MIT
└── .gitignore
```

## Quick start

**Option A — full profile.** Download [`profiles/surge.conf`](profiles/surge.conf), fill in the `[Proxy]` section with your own nodes (commented examples included), and import it into Surge via *Download Configuration from URL* or iCloud Drive.

**Option B — ad blocking only.** Install the module in Surge (*Modules → Install New Module*) with this URL:

```text
https://raw.githubusercontent.com/dmulle12/surge/main/modules/adblock.sgmodule
```

**Option C — cherry-pick rule sets.** Copy any one-liner from [`rules/README.md`](rules/README.md) into your existing Surge config's `[Rule]` section.

## Design principles

1. **Own the supply chain.** Rule data comes from repositories we control and CI we can inspect — never from a stranger's release branch.
2. **Profiles are templates, not secrets.** Node credentials and MITM CA material never belong in this repo; every placeholder is clearly marked.
3. **Boring and explicit beats clever.** Rules are ordered top-down, each section commented with *why*, so the config stays debuggable a year from now.
4. **Say what blocking can't do.** DNS/domain blocking stops third-party ads and trackers. It cannot block in-feed ads served from the same first-party domain as the content itself (e.g. Facebook/TikTok feed ads) — blocking those domains would break the app.

## License

MIT — see [LICENSE](LICENSE).

Rule data converted from [hagezi/dns-blocklists](https://github.com/hagezi/dns-blocklists) remains under its [GPL-3.0](https://github.com/hagezi/dns-blocklists/blob/main/LICENSE) license; the original lists are available at the upstream repository.
