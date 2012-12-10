function spotWin(){
	var spotwin = Ti.UI.createWindow({
		backgroundColor: "#ff0" 
	});

	var view_spotwin = Ti.UI.createView();

	var id = Ti.App.toSpotwinId;

	var labelTest = Ti.UI.createLabel({
	    color: '#999',
	    text: 'spotdata',
	    height: 320,
	    width: 200,
	    top: 50
	});

	view_spotwin.add(labelTest);
	
	labelTest.text = Ti.App.spots.spotdata[id].id + "\n" + Ti.App.spots.spotdata[id].name + "\n" + Ti.App.spots.spotdata[id].hint1 + "\n" + Ti.App.spots.spotdata[id].hint2 + "\n" + Ti.App.spots.spotdata[id].hint3 + "\n" + Ti.App.spots.spotdata[id].web + "\n" + Ti.App.spots.spotdata[id].address + "\n" + Ti.App.spots.spotdata[id].info;
	
	spotwin.add(view_spotwin);

	return spotwin;
}

module.exports = spotWin;