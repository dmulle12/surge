/******************************
脚本功能：91短视频——捕获 m3u8 播放链接, 换成 CloudFront 直链后发通知, 点通知观看
原作：彭于晏💞 (QX 版 91dsp.js, 2026-6-2, 单行混淆版)
Surge 适配：dmulle12, 2026-11-05

为什么不能原样搬 (已逐行解混淆核对原脚本):
1. 原脚本的平台判断在 Surge 下会走错分支: 它以 typeof $task !== 'undefined' 判 Surge,
   但 Surge 没有 $task、有 $httpClient, 于是 Surge 会落进它标为 QX 的分支, 用
   $notification.post(..., {"url": newUrl}) 发通知 —— "url" 不是 Surge 的参数名,
   Surge 要的是 "open-url", 结果通知能弹但点开大概率没反应。
2. 原脚本结尾 $done({response:{headers}}) 是 QX script-request-header 的回传写法;
   Surge 的 http-request 里 response 键是「直接构造响应返回」, 语义完全不同, 照搬有风险。
本适配版只改这两处平台语法, 业务逻辑与原版一致:
- 命中条件不变: 请求头带 X-Playback-Session-Id 才算捕获 (另加小写头名兜底)
- 换链规则不变: 只把源站域名换成 d39jna88gmha0l.cloudfront.net, 路径/参数原样
  (原脚本还有个 .replace(/\.m3u8/, ".m3u8") 自换自的空操作, 已去掉)
- 发完通知后 $done({}) 放行原请求, 不动请求头、不拦播放
验证状态: 已用 mock 的 Surge 全局对象在 node 里真跑过 (命中/未命中两条路径都对);
真机未验。
******************************/

var url = ($request && $request.url) || "";
var headers = ($request && $request.headers) || {};

var hasSession =
  Object.prototype.hasOwnProperty.call(headers, "X-Playback-Session-Id") ||
  Object.prototype.hasOwnProperty.call(headers, "x-playback-session-id");

if (hasSession) {
  var newUrl = url.replace(
    /^https?:\/\/[^\/]+/,
    "https://d39jna88gmha0l.cloudfront.net"
  );
  console.log("捕获到 X-Playback-Session-Id，正在转换链接...");
  $notification.post(
    "彭于晏提示❗️视频链接捕获成功",
    "点击通知即可观看",
    "",
    { "open-url": newUrl }
  );
}

$done({});
