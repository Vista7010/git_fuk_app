var win1 = Ti.UI.createWindow({url: "first.js",tabBarHidden: true});

/* JSONデータをパース */
var file = Ti.Filesystem.getFile(Titanium.Filesystem.resourcesDirectory, 'testdb.json');
var json = file.read().toString();
if (json && json.length > 0) {
	Ti.App.spots = JSON.parse(json);
}

var tab1 = Ti.UI.createTab({window: win1});
var tabGroup = Ti.UI.createTabGroup();

tabGroup.addTab(tab1);
tabGroup.open();