Ti.UI.currentWindow.title = "現在地取得";
Ti.UI.currentWindow.backgroundColor = "#fff"; 

var view_find =Ti.UI.createView();

var cLocLat;
var cLocLong;

/* マップ */
var mapview = Ti.Map.createView({
	mapType: Ti.Map.STANDARD_TYPE,
	// 地図の中心と表示する幅を指定する
	region:{latitude:40.0, longitude:130, latitudeDelta:30, longitudeDelta:30},
	animate:true,
	regionFit:true,
});

if(Ti.Platform.osname == "iphone"){
	mapview = Ti.Map.createView({
		width:320,
		height:240,
		top:0,
		userLocation:true
	});
}else if(Ti.Platform.osname == "android"){
	mapview = Ti.Map.createView({
		width:480,
		height:400,
		top:0,
		userLocation:true
	});
}
view_find.add(mapview);

/* ラベル2種類 */
if(Ti.Platform.osname == "iphone"){
	var labelPos = Ti.UI.createLabel({
		text: 'hogehoge',
		height: 70,
		top: 220
	});
}else if(Ti.Platform.osname == "android"){
	var labelPos = Ti.UI.createLabel({
		text: 'hogehoge',
		height: 70,
		top: 450,
		color: "#000000"
	});
}
view_find.add(labelPos);

/* スポットを探すボタン->table.js */
if(Ti.Platform.osname == "iphone"){
	var goTableBtn = Ti.UI.createButton({
		title:'この辺りのスポットを探す',
		width: 300,
		height: 40,
		top: 340
	});
}else if(Ti.Platform.osname == "android"){
	var goTableBtn = Ti.UI.createButton({
		title:'この辺りのスポットを探す',
		width: 300,
		height: 40,
		top: 600
	});
}
view_find.add(goTableBtn);

Ti.Geolocation.purpose = '現在地を取得し近くのスポットを検索するため'; // GPSの利用目的を明記

/* addEventListenerでは情報は一度きりしかとらない */
Ti.Geolocation.getCurrentPosition(
	function(e) {
		if (!e.success || e.error){
			alert('位置情報が取得できませんでした');
			return;
		}
	
		cLocLat = e.coords.latitude;
		cLocLong = e.coords.longitude;
		mapview.show(); // 地図を表示する
		mapview.region = {   // 現在地まで地図をスクロールする
			latitude:cLocLat,
			longitude:cLocLong,
			latitudeDelta:0.01,
			longitudeDelta:0.01
		}
	}
);

if(Ti.Platform.osname == 'android'){
	var providerGps = Ti.Geolocation.Android.createLocationProvider({
		name: Ti.Geolocation.PROVIDER_GPS,
		minUpdateDistance: 5.0, //これだけ移動したらとり直すよ
		minUpdateTime: 100 //これだけ経つととり直すよ
	});
	
	Ti.Geolocation.Android.addLocationProvider(providerGps);
	Ti.Geolocation.Android.manualMode = true;
	var locationCallback = function(e) {
		if (!e.success || e.error) {
			labelPos.text = 'error:' + JSON.stringify(e.error);
		}
		cLocLat = e.coords.latitude;
		cLocLong = e.coords.longitude;
		labelPos.text = cLocLat+'\n'+cLocLong ;
		mapview.region = {   // 現在地まで地図をスクロールする
			latitude:cLocLat,
			longitude:cLocLong,
			latitudeDelta:0.01,
			longitudeDelta:0.01
		}

	};
	Titanium.Geolocation.addEventListener('location', locationCallback);
}else if(Ti.Platform.osname == 'iphone' ){
	/* addEventListenerでは繰り返して情報を取り出す */
	Ti.Geolocation.addEventListener("location", function(e) {
		if (!e.success || e.error){
			alert('位置情報が取得できませんでした');
			return;
		}
		cLocLat = e.coords.latitude;
		cLocLong = e.coords.longitude;
		Ti.API.info(cLocLat);
		Ti.API.info(cLocLong);
		labelPos.text = cLocLat+'\n'+ cLocLong ;
		mapview.region = {   // 現在地まで地図をスクロールする
			latitude:cLocLat,
			longitude:cLocLong,
			latitudeDelta:0.01,
			longitudeDelta:0.01
		}
	});
}

goTableBtn.addEventListener('click', function(e){
	Ti.App.cFinLat = cLocLat;
	Ti.App.cFinLong = cLocLong;
	Ti.UI.currentTab.open(Ti.UI.createWindow({url: "table.js"}));
});

Ti.UI.currentWindow.add(view_find);