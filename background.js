// https://support.google.com/analytics/answer/1032399?hl=fr

const blockedScripts = ["analytics.js", "gtag.js", "ga.js"];

chrome.webRequest.onBeforeRequest.addListener(
  (info) => {
    const { url } = info;
    if (blockedScripts.find((blockedScript) => url.includes(blockedScript))) {
      chrome.browserAction.setBadgeText({
        text: "1",
      });
      return {
        cancel: true,
      };
    }

    return null;
  },
  // filters
  {
    urls: ["<all_urls>"],
    types: ["script"],
  },
  // extraInfoSpec
  ["blocking"]
);
