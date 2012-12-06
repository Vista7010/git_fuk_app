Ti.UI.currentWindow.title = "ようこそ";
Ti.UI.currentWindow.backgroundColor = "#fff";

var view_first = Ti.UI.createView();

var findBtn = Ti.UI.createButton({
	title:'現在地を検出',
	width: 240,
	height: 120
});

view_first.add(findBtn);
Ti.UI.currentWindow.add(view_first);

findBtn.addEventListener('click', function(e){
	Ti.UI.currentTab.open(Ti.UI.createWindow({url: "find.js"}));
});
