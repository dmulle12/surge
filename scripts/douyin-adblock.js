/*
 * 抖音去广告 — 信息流响应过滤 (Surge)
 *
 * 作用: 剔除推荐 / 关注 / 同城 / 搜索 / 热搜信息流 JSON 中的广告条目
 *       (依据 is_ads / raw_ad_data 字段判定)
 * 开屏广告由模块中的 URL-REGEX reject 规则处理, 不在本脚本内
 *
 * 配套模块: https://github.com/dmulle12/surge/raw/main/modules/douyin-adblock.sgmodule
 * 需要开启 MITM 并在 iOS 上信任 Surge 证书, 否则脚本不会生效
 *
 * 容错: 非 JSON 响应 (如 protobuf) 或解析失败时直接透传, 不影响正常使用
 */

const RULES = [
  { match: "/feed/", list: "aweme_list" },            // 推荐信息流
  { match: "/aweme/post/", list: "aweme_list" },      // 作品列表
  { match: "/follow/feed/", list: "data", pick: "aweme" }, // 关注信息流
  { match: "/nearby/feed/", list: "aweme_list" },     // 同城
  { match: "/search/item/", list: "aweme_list" },     // 视频搜索
  { match: "/hot/search/video/", list: "aweme_list" },// 热搜视频
  { match: "/general/search/", special: "general" },  // 综合搜索
];

function isAd(aweme) {
  if (!aweme || typeof aweme !== "object") return false;
  return aweme.is_ads === true || aweme.is_ads === 1 || !!aweme.raw_ad_data;
}

function filterList(list, pick) {
  if (!Array.isArray(list)) return list;
  return list.filter(function (entry) {
    return !isAd(pick ? entry[pick] : entry);
  });
}

(function main() {
  try {
    const url = $request.url;
    const raw = $response.body;
    if (!raw) return $done({});

    const obj = JSON.parse(raw); // 非 JSON 直接抛到 catch 透传

    for (const r of RULES) {
      if (url.indexOf(r.match) === -1) continue;
      if (r.special === "general") {
        // 综合搜索: data[].type===1 的条目内嵌 aweme_info
        if (Array.isArray(obj.data)) {
          obj.data = obj.data.filter(function (x) {
            return !(x && x.type === 1 && isAd(x.aweme_info));
          });
        }
      } else if (obj[r.list]) {
        obj[r.list] = filterList(obj[r.list], r.pick);
      }
      break;
    }

    $done({ body: JSON.stringify(obj) });
  } catch (e) {
    $done({}); // 解析失败一律透传
  }
})();
