
// // Function to execute a script on a specific tab
// function executeScriptOnTab(tabId, script) {
//   chrome.tabs.executeScript(tabId, { code: script });
// }

// // Function to update the tabs and execute a script on update
// function updateTabsAndExecuteScript() {
//   // Get all tabs
//   chrome.tabs.query({}, function (tabs) {
//     // Loop through each tab
//     tabs.forEach(function (tab) {
//       // Execute the script on the tab
//       executeScriptOnTab(tab.id, 'console.log("Script executed on tab: " + tab.url);');
//     });
//   });
// }

try {
    // Listen for tab update event
    chrome.tabs.onUpdated.addListener(function (tabId, changeInfo, tab) {
        // Check if the tab has finished loading
        if (changeInfo.status === 'complete') {
        // Execute the script on the updated tab
        chrome.scripting.executeScript({
            target: { tabId: tab.id },
            files: ['scripts/contentScript.js', 'css/contentScript.css']
        });
        chrome.scripting.insertCSS({
            files: ["css/contentScript.css"],
            target: { tabId: tab.id },
          });
        // executeScriptOnTab(tabId, 'console.log("Script executed on updated tab: " + tab.url);');
        }
    });
} catch (e) {
    console.log(e);
}
