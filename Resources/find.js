function findMe() {
	var win = Ti.UI.createWindow({
		backgroundColor:'#cccccc'
	});

	var mapview = Ti.Map.createView({
	    mapType: Ti.Map.STANDARD_TYPE,
	    // 地図の中心と表示する幅を指定する
	    region:{latitude:40.0, longitude:130, latitudeDelta:30, longitudeDelta:30},
	    animate:true,
	    regionFit:true,
	    width:320,
	    height:240,
	    top:0
	});
	win.add(mapview);
	
	/* ラベル2種類 */
	var labelPos = Ti.UI.createLabel({
	     text: 'hogehoge',
	     height: 70,
	     top: 280
	});
	win.add(labelPos);

	var labelDist = Ti.UI.createLabel({
	     text: 'hogeDistance',
	     height: 35,
	     top: 325
	});
	win.add(labelDist);

	Ti.Geolocation.purpose = '現在地を取得し近くのスポットを検索するため'; // GPSの利用目的を明記

	if(Ti.Platform.osname == 'android'){
		var providerGps = Ti.Geolocation.Android.createLocationProvider({
		    name: Ti.Geolocation.PROVIDER_GPS,
		    minUpdateDistance: 0.0,
		    minUpdateTime: 0
		});

		Ti.Geolocation.Android.addLocationProvider(providerGps);
		Ti.Geolocation.Android.manualMode = true;
	
		var locationCallback = function(e) {
		    if (!e.success || e.error) {
				labelPos.text = 'error:' + JSON.stringify(e.error);
		    }
		
			var cLocLat = e.coords.latitude;
			var cLocLong = e.coords.longitude;
			labelPos.text = cLocLat+'\n'+cLocLong ;
		};
		
		Titanium.Geolocation.addEventListener('location', locationCallback);
	}else if(Ti.Platform.osname == 'iphone' ){
		/* addEventListenerでは繰り返して情報を取り出す */
		Ti.Geolocation.addEventListener("location", function(e) {
		    if (!e.success || e.error){
		        alert('位置情報が取得できませんでした');
		        return;
		    }
			var cLocLat = e.coords.latitude;
			var cLocLong = e.coords.longitude;
			Ti.API.info(cLocLat);
			Ti.API.info(cLocLong);
			labelPos.text = cLocLat+'\n'+cLocLong ;
			labelDist.text = calDist(cLocLat,cLocLong);
		});
	}

	/* addEventListenerでは情報は一度きりしかとらない */
	Ti.Geolocation.getCurrentPosition(
	    function(e) {
	        if (!e.success || e.error){
	            alert('位置情報が取得できませんでした');
	            return;
	        }
	        
			var cLocLat = e.coords.latitude;
			var cLocLong = e.coords.longitude;
	
	        mapview.show(); // 地図を表示する
	
	        mapview.region = {   // 現在地まで地図をスクロールする
	            latitude:cLocLat,
	            longitude:cLocLong,
	            latitudeDelta:0.01,
	            longitudeDelta:0.01
	        }
	    }
	);
	
	/* 2点間の距離を出す */
	function calDist(cLat,cLong){
		var earth_r = 6378.137;
		var bLat = 33.593332; //福岡タワーの緯度
		var bLong = 130.351408;//福岡タワーの経度
		
		var latSa = deg2rad(bLat - cLat);
		var longSa = deg2rad(bLong - cLong);
		var nanboku = earth_r * latSa;
		var touzai = Math.cos(deg2rad(cLat)) * earth_r * longSa;
		
		var d = Math.sqrt(Math.pow(touzai,2) + Math.pow(nanboku,2));
		
		function deg2rad(deg){return deg*Math.PI / 180;}
		
		return d ;
	}
	
	return win;
};

module.exports = findMe;