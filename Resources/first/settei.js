function Settei(){
	var settei = Ti.UI.createWindow({
		backgroundColor: "#fff"
	});
	
	var view_settei = Ti.UI.createView();
	
	var picker = Ti.UI.createPicker();
	
	var data = [];
	data[0]=Ti.UI.createPickerRow({title:'ちょっとそこまで(500m以内)',custom_item:'0.5'});
	data[1]=Ti.UI.createPickerRow({title:'少し遠くへ(1km以内)',custom_item:'1'});
	data[2]=Ti.UI.createPickerRow({title:'もっと遠くへ(2km以内)',custom_item:'2'});
	data[3]=Ti.UI.createPickerRow({title:'ずっと遠くへ(4km以内)',custom_item:'4'});
	picker.add(data);
	
	// 選択表示を有効にします（標準は無効）
	picker.selectionIndicator = true;
	
	view_settei.add(picker);
	
	picker.addEventListener('change',function(e){
		Ti.App.range = e.row.custom_item;
	});
	
	settei.add(view_settei);
	return settei;
}

module.exports = Settei;