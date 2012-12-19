function spotWin(){
	var spotwin = Ti.UI.createWindow({
		backgroundColor: "#fff"
	});

	var view_spotwin = Ti.UI.createView();

	var id = Ti.App.toSpotwinId;
	
	var earth_r = 6378137;

	var cLocLat;
	var cLocLong;
	
	var restDist;
	
	/* Viewで矢印と距離を表示する場所を作る */
	if(Ti.Platform.osname == "iphone"){
		var viewBG = Ti.UI.createView({
			top:0,
			height: 135,
			backgroundColor: "#ccc"
		});
	}else if(Ti.Platform.osname == "android"){
		var viewBG = Ti.UI.createView({
			height: 340,
			top:0,
			backgroundColor: "#ccc"
		});
	}
	view_spotwin.add(viewBG);

	/* 距離のラベル */
	if(Ti.Platform.osname == "iphone"){
		var labelDist = Ti.UI.createLabel({
			text: '位置情報取得中...',
			height: 35,
			font:{fontSize:32},
			top: 290
		});
	}else if(Ti.Platform.osname == "android"){
		var labelDist = Ti.UI.createLabel({
			text: '位置情報取得中...',
			height: 48,
			top: 290,
			font:{fontSize:32},
			color: "#000000"
		});
	}
	view_spotwin.add(labelDist);

	/* ヒントを表示するボタン */
	if(Ti.Platform.osname == "iphone"){
		var btnHint1 = Ti.UI.createButton({
			backgroundImage:'/images/btnHint1.png',
			height: 100,
			top: 400,
			left: 60
		});
		var btnHint2 = Ti.UI.createButton({
			backgroundImage:'/images/btnHint1.png',
			height: 100,
			top: 400,
			left: 60
		});
		var btnHint3 = Ti.UI.createButton({
			backgroundImage:'/images/btnHint1.png',
			height: 100,
			top: 400,
			left: 60
		});
	}else if(Ti.Platform.osname == "android"){
		var btnHint1 = Ti.UI.createButton({
			backgroundImage:'/images/btnHint1.png',
			height: 100,
			width: 100,
			top: 400,
			left: 60
		});
		var btnHint2 = Ti.UI.createButton({
			backgroundImage:'/images/btnHint2.png',
			height: 100,
			width: 100,
			top: 400,
			left: 190
		});
		var btnHint3 = Ti.UI.createButton({
			backgroundImage:'/images/btnHint3.png',
			height: 100,
			width: 100,
			top: 400,
			left: 320
		});
	}
	view_spotwin.add(btnHint1);
	view_spotwin.add(btnHint2);
	view_spotwin.add(btnHint3);

	/* ボタンを押したらヒントを出す */
	btnHint1.addEventListener('click', function(e){
		alert(Ti.App.spots.spotdata[id].hint1)
	});
	btnHint2.addEventListener('click', function(e){
		alert(Ti.App.spots.spotdata[id].hint2)
	});
	btnHint3.addEventListener('click', function(e){
		alert(Ti.App.spots.spotdata[id].hint3)
	});

	/* ついた！ボタン */
	var btnTsuita = Ti.UI.createButton({
		backgroundImage:'/images/btnTsuita.png',
		width:380,
		height:80,
		top:560,
		left: 999
	});
	view_spotwin.add(btnTsuita);

	btnTsuita.addEventListener('click', function(){
		alert('clear!');
	});

	/* 位置情報を取り続ける */
	if(Ti.Platform.osname == 'android'){
		var providerGps = Ti.Geolocation.Android.createLocationProvider({
			name: Ti.Geolocation.PROVIDER_GPS,
			minUpdateDistance: 5.0, //これだけ移動したらとり直すよ
			minUpdateTime: 100 //これだけ経つととり直すよ
		});
		
		Ti.Geolocation.Android.addLocationProvider(providerGps);
		Ti.Geolocation.Android.manualMode = true;
		var locationCallback2 = function(e) {
			if (!e.success || e.error) {
				labelPos.text = 'error:' + JSON.stringify(e.error);
			}
			cLocLat = e.coords.latitude;
			cLocLong = e.coords.longitude;
			restDist = Math.round(calDist(cLocLat,cLocLong,Ti.App.spots.spotdata[id].latitude,Ti.App.spots.spotdata[id].longitude));
			labelDist.text = 'あと'+ restDist +'m';
			changeBG();
		};
		Titanium.Geolocation.addEventListener('location', locationCallback2);
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
			restDist = Math.round(calDist(cLocLat,cLocLong,Ti.App.spots.spotdata[id].latitude,Ti.App.spots.spotdata[id].longitude));
			labelDist.text = 'あと'+ restDist +'m';
			changeBG();
		});
	}

	/* 残りの距離によって背景色変化 */
	function changeBG(){
		if (restDist != null && restDist < 50){
			viewBG.backgroundColor = '#ff9999';
			btnTsuita.left = 60;
		}
		else if(restDist < 400){
			viewBG.backgroundColor = '#ffff99';
			btnTsuita.left = 999;
			;
		}
		else {
			viewBG.backgroundColor = '#cccccc';
			btnTsuita.left = 999;
			;
		}
	}

	/* コンパス */
	if(Ti.Platform.osname == "iphone"){
		var compass = Ti.UI.createImageView({
			image:'images/yazirushi.png',
			width: 80,
			height:80,
			top: 320
		});
	}else if(Ti.Platform.osname == "android"){
		var compass = Ti.UI.createImageView({
			image:'images/yazirushi.png',
			width: 200,
			height:200,
			top: 60
		});
	}
	view_spotwin.add(compass);

	var updateCompass = function(e){
		if(e.error){
			Ti.API.info(e);
			return;
		}
		var mHead = e.heading.trueHeading;
		var rotate = Ti.UI.create2DMatrix();
		var angle = 180 + calDir(Ti.App.spots.spotdata[id].latitude,Ti.App.spots.spotdata[id].longitude,cLocLat,cLocLong) - mHead;
		rotate = rotate.rotate(angle);
		compass.transform = rotate;
	};
	
	Ti.Geolocation.headingFilter = 90;
	Ti.Geolocation.addEventListener('heading',updateCompass);

	spotwin.addEventListener('blur',function(){
		Ti.Geolocation.removeEventListener('locate',locationCallback2);
		Ti.Geolocation.removeEventListener('heading',updateCompass);
	});

	spotwin.add(view_spotwin);
	return spotwin;
	
	/* 2点間から向きを出す */
	function calDir(lat1, lng1, lat2, lng2){
		var pi = Math.PI / 180;
		var y = Math.cos(lng2 * pi) * Math.sin(lat2 * pi - lat1 * pi);
		var x = Math.cos(lng1 * pi) * Math.sin(lng2 * pi) - Math.sin(lng1 * pi) * Math.cos(lng2 * pi) * Math.cos(lat2 * pi - lat1 * pi);
		var rad = 180 * Math.atan2(y, x) / Math.PI;
		if(rad < 0){ rad = rad + 360; }
		var deg = 360 - rad;
		var deg = (rad + 90) % 360;
		return deg;
	}
	
	/* 2点間の距離を出す */
	function calDist(cLat,cLong,bLat,bLong){
		var latSa = deg2rad(bLat - cLat);
		var longSa = deg2rad(bLong - cLong);
		var nanboku = earth_r * latSa;
		var touzai = Math.cos(deg2rad(cLat)) * earth_r * longSa;
		var d = Math.sqrt(Math.pow(touzai,2) + Math.pow(nanboku,2));
		return d ;
	}
	
	/* 度をラジアン変換 */
	function deg2rad(deg){return deg*Math.PI / 180;}
}

module.exports = spotWin;