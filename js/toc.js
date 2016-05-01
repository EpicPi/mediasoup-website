window.addEventListener('load', function()
{
	var tocButton = document.querySelector('.toc-button');
	var toc = document.querySelector('.toc-wrapper');
	var tocUl = document.querySelector('.toc-wrapper ul.toc');
	var transitionDuration = 200;
	var isTocVisible = false;
	var hammer = new Hammer.Manager(toc);

	hammer.add(new Hammer.Pan(
		{
			threshold : 30,
			direction : Hammer.DIRECTION_RIGHT
		}));

	dontscrollthebody(toc);

	document.addEventListener('click', function(event)
	{
		if (tocButton.contains(event.target))
		{
			if (!isTocVisible)
				showToc();
			else
				hideToc();
		}
		else if (!toc.contains(event.target))
		{
			hideToc();
		}
	});

	// ESC key hides the TOC panel.
	document.addEventListener('keydown', function(event)
	{
		if (event.keyCode === 27)
			hideToc();
	});

	hammer.on('panright', function()
	{
		hideToc();
	});

	function showToc()
	{
		if (isTocVisible)
			return;

		isTocVisible = true;
		toc.classList.add('visible');
		tocUl.style.display = '';
	}

	function hideToc()
	{
		if (!isTocVisible)
			return;

		isTocVisible = false;
		toc.classList.remove('visible');
		setTimeout(function()
		{
			if (!isTocVisible)
				tocUl.style.display = 'none';
		}, transitionDuration * 1.5);
	}
});
