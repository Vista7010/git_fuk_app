Ti.UI.currentWindow.title = "ようこそ";
Ti.UI.currentWindow.backgroundColor = "#fff";

var view_first = Ti.UI.createView();

var findBtn = Ti.UI.createButton({
	backgroundImage:'/images/btnSagasu.png',
	width: 360,
	height: 120,
	top: 120
});
var setteiBtn = Ti.UI.createButton({
	backgroundImage:'/images/btnSettei.png',
	width: 360,
	height: 80,
	top: 390
});
var asobikataBtn = Ti.UI.createButton({
	backgroundImage:'/images/btnAsobikata.png',
	width: 360,
	height: 80,
	top: 500
});

view_first.add(findBtn);
view_first.add(setteiBtn);
view_first.add(asobikataBtn);
Ti.UI.currentWindow.add(view_first);

findBtn.addEventListener('click', function(e){
	Ti.UI.currentTab.open(Ti.UI.createWindow({url: "find.js"}));
});

setteiBtn.addEventListener('click', function(e){
	var Win = require('/first/settei');
	w = new Win();
	w.title = "設定";
	w.barColor = '#000';
	
	var b = Titanium.UI.createButton({
		title:'Close',
		style:Titanium.UI.iPhone.SystemButtonStyle.PLAIN
	});
	/* wにボタン追加 */
	w.setLeftNavButton(b);
	b.addEventListener('click',function()
	{
		w.close();
	});
	/* wをオープンさせる。modalアニメ付き。 */	
	w.open({modal:true});
});

asobikataBtn.addEventListener('click', function(e){
	var Win = require('/first/how2play');
	w = new Win();
	w.title = "遊び方";
	w.barColor = '#000';
	
	var b = Titanium.UI.createButton({
		title:'Close',
		style:Titanium.UI.iPhone.SystemButtonStyle.PLAIN
	});
	/* wにボタン追加 */
	w.setLeftNavButton(b);
	b.addEventListener('click',function()
	{
		w.close();
	});
	/* wをオープンさせる。modalアニメ付き。 */	
	w.open({modal:true});
});

Ti.App.addEventListener('close',function(e){Ti.Geolocation.removeEventListener('location')});
Ti.App.addEventListener('close',function(e){Ti.Geolocation.removeEventListener('heading')});

view_first.add(findBtn);
view_first.add(setteiBtn);
view_first.add(asobikataBtn);
Ti.UI.currentWindow.add(view_first);

