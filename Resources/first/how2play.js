function HowPlay(){
	var howplay = Ti.UI.createWindow({
		backgroundColor: "#fff"
	});

if(Ti.Platform.osname == 'iphone' ){
	var view_howplay = Ti.UI.createScrollView({
		contentWidth:'320px',
		contentHeight:'640px',
		top:0,
		bottom: 0,
		showVerticalScrollIndicator:true,
		showHorizontalScrollIndicator:true
	});
}else if(Ti.Platform.osname == 'android' ){
	var view_howplay = Ti.UI.createScrollView({
		contentWidth:'480px',
		contentHeight:'1000px',
		top:0,
		bottom: 0,
		showVerticalScrollIndicator:true,
		showHorizontalScrollIndicator:true
	});
}

if(Ti.Platform.osname == 'iphone' ){
	var imageView = Ti.UI.createImageView({
		image: '/images/how2play.png',
		width:320,
		height:640
	});
}else if(Ti.Platform.osname == 'android' ){
	var imageView = Ti.UI.createImageView({
		image: '/images/how2play.png',
		width:480,
		height:1000
	});
}
	view_howplay.add(imageView);
	
	howplay.add(view_howplay);
	return howplay;
}

module.exports = HowPlay;