
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

// try {
//     // Listen for tab update event
//     chrome.tabs.onUpdated.addListener(function (tabId, changeInfo, tab) {
//         // Check if the tab has finished loading
//         if (changeInfo.status === 'complete') {
//         // Execute the script on the updated tab
//         chrome.scripting.executeScript({
//             target: { tabId: tab.id },
//             files: ['scripts/contentScript.js', 'css/contentScript.css']
//         });
//         chrome.scripting.insertCSS({
//             files: ["css/contentScript.css"],
//             target: { tabId: tab.id },
//           });
//         // executeScriptOnTab(tabId, 'console.log("Script executed on updated tab: " + tab.url);');
//         }
//     });
// } catch (e) {
//     console.log(e);
// }
alert("hi");

console.log('Background script is running');

chrome.runtime.onInstalled.addListener(() => {
  console.log('Extension installed or updated');
});

chrome.tabs.onUpdated.addListener(function (tabId, changeInfo, tab) {
    chrome.tabs.query({active: true, lastFocusedWindow: true}, tabs => {
        let url = tabs[0].url;
        // use `url` here inside the callback because it's asynchronous!
        console.log(url);
    });
});

// Listener for tab activation
// chrome.tabs.onActivated.addListener(activeInfo => {
    
//     chrome.tabs.get(activeInfo.tabId, function(tab) {
//         if (tab.url) {
//           console.log('Visited URL:', tab.url);
//         }
//       });
//     startTime = Date.now(); // Start timing for the new active tab
//   });

console.log("going to activate?");
chrome.tabs.onActivated.addListener(activeInfo => {
    // console.log('Tab activated:', activeInfo.tabId);
    // chrome.tabs.get(activeInfo.tabId, function(tab) {
    //     if (tab.url) {
    //         console.log('Visited URL:', tab.url);
    //     }
    //     });
    chrome.tabs.query({active: true, lastFocusedWindow: true}, tabs => {
        console.log(tabs);
        let url = tabs[0].url;
        // use `url` here inside the callback because it's asynchronous!
        console.log(url);
    });
});

chrome.storage.onChanged.addListener(function(changes, namespace) {
    for (let [key, { oldValue, newValue }] of Object.entries(changes)) {
        console.log(`Storage key "${key}" in namespace "${namespace}" changed.`);
        console.log(`Old value was "${oldValue}", new value is "${newValue}".`);
    }
});


