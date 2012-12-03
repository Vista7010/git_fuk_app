function findMe() {
	var cLocLat;
	var cLocLong;

	/* JSONデータをパース */
	var file = Ti.Filesystem.getFile(Titanium.Filesystem.resourcesDirectory, 'testdb.json');
	var json = file.read().toString();
	if (json && json.length > 0) {
		var spots = JSON.parse(json);
	}

	var win = Ti.UI.createWindow({
		backgroundColor:'#cccccc'
	});

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
			top:0
		});
	}else if(Ti.Platform.osname == "android"){
		mapview = Ti.Map.createView({
			width:480,
			height:400,
			top:0
		});
	}


	win.add(mapview);

	/* ラベル2種類 */
	if(Ti.Platform.osname == "iphone"){
		var labelPos = Ti.UI.createLabel({
			text: 'hogehoge',
			height: 70,
			top: 240
		});
		var labelDist = Ti.UI.createLabel({
			text: 'hogeDistance',
			height: 140,
			top: 300
		});
	}else if(Ti.Platform.osname == "android"){
		var labelPos = Ti.UI.createLabel({
			text: 'hogehoge',
			height: 70,
			top: 450,
			color: "#000000"
		});
		var labelDist = Ti.UI.createLabel({
			text: 'hogeDistance',
			height: 140,
			top: 550,
			color: "#000000"
		});
	}
	win.add(labelPos);
	win.add(labelDist);
	
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
			chkDist(cLocLat,cLocLong,spots.spotdata);
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
			chkDist(cLocLat,cLocLong,spots.spotdata);
		});
	}

	return win;

	/* JSONから差が3km以内だったら名前を出す */
	function chkDist(cLat,cLong,spotArr){
		var txt;
		for(var i=0;i<spotArr.length;i++){
			Ti.API.info(cLat);
			Ti.API.info(cLong);
			Ti.API.info(calDist(cLat,cLong,spotArr[i].latitude,spotArr[i].longitude));
			if(calDist(cLat,cLong,spotArr[i].latitude,spotArr[i].longitude) < 4.4){
				txt = txt + spotArr[i].name + "\n";
			}
		}
		if(txt != null){labelDist.text = txt;}
	}

	/* 2点間の距離を出す */
	function calDist(cLat,cLong,bLat,bLong){
		var earth_r = 6378.137;

		var latSa = deg2rad(bLat - cLat);
		var longSa = deg2rad(bLong - cLong);
		var nanboku = earth_r * latSa;
		var touzai = Math.cos(deg2rad(cLat)) * earth_r * longSa;
		var d = Math.sqrt(Math.pow(touzai,2) + Math.pow(nanboku,2));
		function deg2rad(deg){return deg*Math.PI / 180;}
		return d ;
	}

};
module.exports = findMe;