Ti.UI.currentWindow.title = "スポットへのヒント";
Ti.UI.currentWindow.backgroundColor = "#fff"; 

var view_table =Ti.UI.createView();

var nearData = new Array();
chkDist(Ti.App.cFinLat,Ti.App.cFinLong,Ti.App.spots.spotdata);

var table = Ti.UI.createTableView({
	data:createTableData(nearData)
});

/* テーブルをクリックでタブが開く */
table.addEventListener('click', function(e){
    if (e.rowData.hasChild) {
        var w = Ti.UI.createWindow({
            url: e.rowData.dest,
            title: e.rowData.title,
            backgroundColor: 'white'
        });
        Ti.UI.currentTab.open(w);
    }
});

view_table.add(table);

Ti.UI.currentWindow.add(view_table);

/* JSONから差が3km以内だったら名前を出す */
function chkDist(cLat,cLong,spotArr){
	var dist = 0;
	for(var i=0;i<spotArr.length;i++){
		dist = Math.round(calDist(cLat,cLong,spotArr[i].latitude,spotArr[i].longitude)*1000);
		if(calDist(cLat,cLong,spotArr[i].latitude,spotArr[i].longitude) < 4.4){
			nearData.push({nearId:spotArr[i].id,nearDist:dist});
		}
	}
	Ti.API.info(nearData);
}

/* 連想配列のソート  */
function renSortFunc(a,b) {return (a.nearDist > b.nearDist) ? 1 : -1;}

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

/* テーブルデータを作る */
function createTableData(dataArr){
	var tmpDataArr = new Array();
	
	//並び替え
	dataArr.sort(renSortFunc);
	Ti.API.info(dataArr);
	//テーブルデータの作成
	for(var i=0;i<dataArr.length;i++){
		var tableTitle = dataArr[i].nearDist + "m先：" + Ti.App.spots.spotdata[dataArr[i].nearId].hint1;
		tmpDataArr.push({
			title: tableTitle,
			hasChild:true,
			color: "#000000",
			dest:"spotwin.js"
		});
	}
	return tmpDataArr;
}
