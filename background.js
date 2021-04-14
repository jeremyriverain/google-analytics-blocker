// https://support.google.com/analytics/answer/1032399?hl=fr

let blockingRequestCounter = 0;

const blockedScripts = ["analytics.js", "gtag.js", "ga.js"];

chrome.webRequest.onBeforeRequest.addListener(
  (info) => {
    const { url } = info;
    if (blockedScripts.some((blockedScript) => url.includes(blockedScript))) {
      console.log(info);
      blockingRequestCounter++;
      chrome.browserAction.setBadgeText({
        text: blockingRequestCounter.toString(),
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
