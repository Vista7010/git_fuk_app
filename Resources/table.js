Ti.UI.currentWindow.title = "スポットへのヒント";
Ti.UI.currentWindow.backgroundColor = "#fff"; 

var view_table =Ti.UI.createView();

var nearData = new Array(); //周辺データを保管する配列
var earth_r = 6378.137;

chkDist(Ti.App.cFinLat,Ti.App.cFinLong,Ti.App.spots.spotdata);//nearDataを操作

nearData.sort(renSortFunc);//nearDataを並び替え

var table = Ti.UI.createTableView({
	data:createTableData(nearData)
});

/* テーブルをクリックでタブが開く */
table.addEventListener('click', function(e){
	if (e.rowData.hasChild) {
		Ti.App.toSpotwinId = nearData[e.index].nearId;
		var Win = require('spotwin');
		w = new Win();
		w.title = "スポット情報";
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
	}
});

view_table.add(table);

Ti.UI.currentWindow.add(view_table);

/* JSONから差が一定以内だったら名前を出す */
function chkDist(cLat,cLong,spotArr){
	var dist = 0;
	for(var i=0;i<spotArr.length;i++){
		dist = Math.round(calDist(cLat,cLong,spotArr[i].latitude,spotArr[i].longitude)*1000);
		if(calDist(cLat,cLong,spotArr[i].latitude,spotArr[i].longitude) < Ti.App.range){
			nearData.push({nearId:spotArr[i].id,nearDist:dist});
		}
	}
}

/* 連想配列のソート  */
function renSortFunc(a,b) {return (a.nearDist > b.nearDist) ? 1 : -1;}

/* 2点間の距離を出す */
function calDist(cLat,cLong,bLat,bLong){

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
	//テーブルデータの作成
	for(var i=0;i<dataArr.length;i++){
		var tableTitle = dataArr[i].nearDist + "m先：" + Ti.App.spots.spotdata[dataArr[i].nearId].hint1;
		tmpDataArr.push({
			title: tableTitle,
			hasChild:true,
			color: "#000000"
		});
	}
	return tmpDataArr;
}