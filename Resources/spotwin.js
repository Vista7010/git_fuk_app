Ti.UI.currentWindow.title = "スポット情報";
Ti.UI.currentWindow.backgroundColor = "#fff"; 

var view_spotwin = Ti.UI.createView();

var labelTest = Ti.UI.createLabel({
    color: '#999',
    text: 'spotdata',
    height: 32,
    width: 150,
    top: 120
});
view_spotwin.add(labelTest);
Ti.UI.currentWindow.add(view_spotwin);

