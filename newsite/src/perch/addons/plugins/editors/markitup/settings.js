// -------------------------------------------------------------------
// markItUp!
// -------------------------------------------------------------------
// Copyright (C) 2008 Jay Salvat
// http://markitup.jaysalvat.com/
// -------------------------------------------------------------------


textileSettings = {
	nameSpace: "textile",
	previewParserPath:	'', // path to your Textile parser
	onShiftEnter:		{keepDefault:false, replaceWith:'\n\n'},
	markupSet: [
		{name:'Heading 1', key:'1', openWith:'h1(!(([![Class]!]))!). ', placeHolder:'Your title here...' },
		{name:'Heading 2', key:'2', openWith:'h2(!(([![Class]!]))!). ', placeHolder:'Your title here...' },
		{name:'Heading 3', key:'3', openWith:'h3(!(([![Class]!]))!). ', placeHolder:'Your title here...' },
		{name:'Heading 4', key:'4', openWith:'h4(!(([![Class]!]))!). ', placeHolder:'Your title here...' },
		{name:'Heading 5', key:'5', openWith:'h5(!(([![Class]!]))!). ', placeHolder:'Your title here...' },
		{name:'Heading 6', key:'6', openWith:'h6(!(([![Class]!]))!). ', placeHolder:'Your title here...' },
		{name:'Paragraph', key:'P', openWith:'p(!(([![Class]!]))!). '},
		{separator:'---------------' },
		{name:'Bold', key:'B', closeWith:'*', openWith:'*'},
		{name:'Italic', key:'I', closeWith:'_', openWith:'_'},
		{name:'Stroke through', closeWith:'-', openWith:'-'},
		{separator:'---------------' },
		{name:'Bulleted list', openWith:'(!(* |!|*)!)'},
		{name:'Numeric list', openWith:'(!(# |!|#)!)'}, 
		{separator:'---------------' },
		//{name:'Picture', replaceWith:'![![Source:!:http://]!]([![Alternative text]!])!'}, 
		{name:'Picture', className:'image-upload', closeWith:function(markItUp){miu.ImageUpload.upload(markItUp,'textile');}}, 
		{name:'File', className:'file-upload', closeWith:function(markItUp){miu.ImageUpload.upload(markItUp,'textile',true);}}, 
		{name:'Link', openWith:'"', closeWith:'":[![Link:!:http://]!]', placeHolder:'Your text to link here...' },
		{separator:'---------------' },
		{name:'Quotes', openWith:'bq. '}
		//{name:'Code', openWith:'@', closeWith:'@'}
	]
};



markdownSettings = {
	nameSpace: 'markdown',
	previewParserPath:	'',
	onShiftEnter:		{keepDefault:false, openWith:'\n\n'},
	markupSet: [
		{name:'First Level Heading', key:'1', placeHolder:'Your title here...', closeWith:function(markItUp) { return miu.markdownTitle(markItUp, '='); } },
		{name:'Second Level Heading', key:'2', placeHolder:'Your title here...', closeWith:function(markItUp) { return miu.markdownTitle(markItUp, '-'); } },
		{name:'Heading 3', key:'3', openWith:'### ', placeHolder:'Your title here...' },
		{name:'Heading 4', key:'4', openWith:'#### ', placeHolder:'Your title here...' },
		{name:'Heading 5', key:'5', openWith:'##### ', placeHolder:'Your title here...' },
		{name:'Heading 6', key:'6', openWith:'###### ', placeHolder:'Your title here...' },
		{separator:'---------------' },		
		{name:'Bold', key:'B', openWith:'**', closeWith:'**'},
		{name:'Italic', key:'I', openWith:'_', closeWith:'_'},
		{separator:'---------------' },
		{name:'Bulleted List', openWith:'- ' },
		{name:'Numeric List', openWith:function(markItUp) {
			return markItUp.line+'. ';
		}},
		{separator:'---------------' },
		//{name:'Picture', key:'P', replaceWith:'![[![Alternative text]!]]([![Url:!:http://]!] "[![Title]!]")'},
		{name:'Picture', className:'image-upload', openWith:function(markItUp){miu.ImageUpload.upload(markItUp,'markdown');}}, 
		{name:'File', className:'file-upload', openWith:function(markItUp){miu.ImageUpload.upload(markItUp,'markdown',true);}},
		{name:'Link', key:'L', openWith:'[', closeWith:']([![Url:!:http://]!] "[![Title]!]")', placeHolder:'Your text to link here...' },
		{separator:'---------------'},	
		{name:'Quotes', openWith:'> '}
		//{name:'Code Block / Code', openWith:'(!(\t|!|`)!)', closeWith:'(!(`)!)'}
	]
};

// mIu nameSpace to avoid conflict.
miu = {
	markdownTitle: function(markItUp, ch) {
		heading = '';
		n = $.trim(markItUp.selection||markItUp.placeHolder).length;
		for(i = 0; i < n; i++) {
			heading += ch;
		}
		return '\n'+heading;
	}
};


htmlSettings = {
	nameSpace: 'html',
	onShiftEnter:	{keepDefault:false, replaceWith:'<br />\n'},
	onCtrlEnter:	{keepDefault:false, openWith:'\n<p>', closeWith:'</p>\n'},
	onTab:			{keepDefault:false, openWith:'	 '},
	markupSet: [
		{name:'Heading 1', key:'1', openWith:'<h1(!( class="[![Class]!]")!)>', closeWith:'</h1>', placeHolder:'Your title here...' },
		{name:'Heading 2', key:'2', openWith:'<h2(!( class="[![Class]!]")!)>', closeWith:'</h2>', placeHolder:'Your title here...' },
		{name:'Heading 3', key:'3', openWith:'<h3(!( class="[![Class]!]")!)>', closeWith:'</h3>', placeHolder:'Your title here...' },
		{name:'Heading 4', key:'4', openWith:'<h4(!( class="[![Class]!]")!)>', closeWith:'</h4>', placeHolder:'Your title here...' },
		{name:'Heading 5', key:'5', openWith:'<h5(!( class="[![Class]!]")!)>', closeWith:'</h5>', placeHolder:'Your title here...' },
		{name:'Heading 6', key:'6', openWith:'<h6(!( class="[![Class]!]")!)>', closeWith:'</h6>', placeHolder:'Your title here...' },
		{name:'Paragraph', openWith:'<p(!( class="[![Class]!]")!)>', closeWith:'</p>' },
		{separator:'---------------' },
		{name:'Bold', key:'B', openWith:'(!(<strong>|!|<b>)!)', closeWith:'(!(</strong>|!|</b>)!)' },
		{name:'Italic', key:'I', openWith:'(!(<em>|!|<i>)!)', closeWith:'(!(</em>|!|</i>)!)' },
		{name:'Stroke through', openWith:'<del>', closeWith:'</del>' },
		{separator:'---------------' },
		{name:'Ul', openWith:'<ul>\n', closeWith:'</ul>\n' },
		{name:'Ol', openWith:'<ol>\n', closeWith:'</ol>\n' },
		{name:'Li', openWith:'<li>', closeWith:'</li>' },
		{separator:'---------------' },
		//{name:'Picture', key:'P', replaceWith:'<img src="[![Source:!:http://]!]" alt="[![Alternative text]!]" />' },
		{name:'Picture', className:'image-upload', closeWith:function(markItUp){miu.ImageUpload.upload(markItUp,'html');}}, 
		{name:'File', className:'file-upload', closeWith:function(markItUp){miu.ImageUpload.upload(markItUp,'html',true);}},
		{name:'Link', key:'L', openWith:'<a href="[![Link:!:http://]!]"(!( title="[![Title]!]")!)>', closeWith:'</a>', placeHolder:'Your text to link...' }
		//{separator:'---------------' },
		//{name:'Clean', className:'clean', replaceWith:function(markitup) { return markitup.selection.replace(/<(.*?)>/g, ""); } }
	]
};