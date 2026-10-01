# dmulle12/surge

一套完整、自托管的 Surge 资源仓库：开箱即用的 profile、规则集索引和模块——全部引用每天自动更新的规则数据。

这个仓库是自有小供应链的**消费端**：

- [dmulle12/rules](https://github.com/dmulle12/rules) — 每天 CI 从上游（v2fly、hagezi、gfwlist、Loyalsoldier……）构建规则产物（域名、广告列表、GeoIP）。
- **dmulle12/surge**（本仓库）— 面向 Surge 的一层：profile、模块和文档，引用上述产物。

这里不依赖任何陌生人的规则服务。上游变了，每日构建会自动跟进；这个仓库照常工作。

## 目录结构

```text
surge/
├── profiles/
│   └── surge.conf          # 完整、带注释的 Surge profile 模板
├── rules/
│   └── README.md           # 自托管规则集索引 + 一行代码片段
├── modules/
│   └── adblock.sgmodule    # 去广告/追踪模块（自托管列表）
├── README.md / README.zh-CN.md
├── LICENSE                 # MIT
└── .gitignore
```

## 快速开始

**方案 A —— 完整 profile。** 下载 [`profiles/surge.conf`](profiles/surge.conf)，在 `[Proxy]` 里填上自己的节点（里面有注释示例），然后通过 *Download Configuration from URL* 或 iCloud Drive 导入 Surge。

**方案 B —— 只要去广告。** 在 Surge 里 *Modules → Install New Module*，填这个 URL：

```text
https://raw.githubusercontent.com/dmulle12/surge/main/modules/adblock.sgmodule
```

**方案 C —— 按需取用规则。** 从 [`rules/README.md`](rules/README.md) 复制任意一行，粘贴到你现有 Surge 配置的 `[Rule]` 里。

## 设计原则

1. **供应链自己说了算。** 规则数据来自我们自己控制的仓库和看得见的 CI，绝不引用陌生人的 release 分支。
2. **Profile 是模板，不是密码本。** 节点账号和 MITM 证书材料永远不进这个仓库，所有占位符都有明确标记。
3. **笨而明确胜过聪明。** 规则自上而下排列，每段都注释了*为什么*，一年后照样好排查。
4. **把拦不住的说清楚。** DNS/域名层能拦第三方广告和追踪器；拦不住和内容同第一方域名下发的信息流广告（比如 Facebook/TikTok 的信息流广告）——把那些域名拦了 App 就废了。

## 许可证

MIT — 见 [LICENSE](LICENSE)。

从 [hagezi/dns-blocklists](https://github.com/hagezi/dns-blocklists) 转换来的规则数据仍遵循其 [GPL-3.0](https://github.com/hagezi/dns-blocklists/blob/main/LICENSE) 协议，原始列表见上游仓库。
