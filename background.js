function wizExecuteSave(title, params) {
    var dynamic_html = "<embed type='application/x-wizbrother-wiz-ax' width='100' height='20' " + params + "></embed>";
    document.write(dynamic_html);
}

chrome.extension.onConnect.addListener(
    function(port) 
    {
        var tab = port.sender.tab;

        // This will get called by the content script we execute in
        // the tab as a result of the user pressing the browser action.
        port.onMessage.addListener(
            function(info) 
            {
                wizExecuteSave(info.title, info.params);
            }
        );
    }
);

function wizSaveToWiz(tab) {
    chrome.tabs.sendRequest(tab.id, {name: "preview", op: "article"});
    //chrome.tabs.executeScript(null, { file: "content_script.js" });
}

// Called when the user clicks on the browser action icon.
chrome.browserAction.onClicked.addListener(wizSaveToWiz);

function wizOnSaveToWizContextMenuClick(info, tab) {
    wizSaveToWiz(tab);
}
var menuTitle = chrome.i18n.getMessage("actionName");
var contexts = ["page", "selection", "link", "editable", "image", "video",
        "audio"];
chrome.contextMenus.create({ "title": menuTitle, "contexts": contexts, "onclick": wizOnSaveToWizContextMenuClick});
