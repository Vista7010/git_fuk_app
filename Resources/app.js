var win = Ti.UI.createWindow({
	backgroundColor:'#CCC'
});

var firstView = Ti.UI.createView();

var findBtn = Ti.UI.createButton({
	title:'現在地を検出',
	id:"findBtn"
});

findBtn.addEventListener('click', function(e)
{
	var Win = require('find');
		w = new Win();
		w.title = '現在地検出';
		w.barColor = 'black';

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
});

firstView.add(findBtn);
win.add(firstView);
win.open();
