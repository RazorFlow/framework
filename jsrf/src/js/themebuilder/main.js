define([
	"generated/templates",
	"themebuilder/config/themecomponent",
	"kendo/kendo.panelbar",
	"kendo/kendo.colorpicker",
	"themebuilder/config/themegen",
	"kendo/kendo.button"
	], function (JST, ThemeComponent, KPanelBar, KColorPicker, ThemeGen, KButton) {
	var $rfThemeModal,
			$updateBtn,
			$getCSSBtn,
			$doneBtn,
			updated_variables = {},
			RF_LESS_PATH = "/devStatic/jsrfBuild/tmp/themebuilder/",
			themeWindow = null,
			panelbar = null,
			picker = {},
			kGetCSSBtn = null,
			kUpdateBtn = null,
			kDoneBtn = null,
			DefaultTheme = {},
		ThemeBuilder = {
			init: function () {
				$.getJSON(RF_LESS_PATH + "defaulttheme.json", function (data) {
					DefaultTheme = data;
				}).done(function () {
					closeDOM();
					initDOM();
					initPanelBar();
					initThemeWindow();
					initColorPicker();
					addListeners();
				});
			}
		},

		closeDOM = function () {
			if (themeWindow) {
				themeWindow.close();
			}
		},

		initDOM = function () {
			$rfThemeModal = $('body').find(".rfThemeModal");
			$rfThemeModal.html(JST.theme_builder({

			}));
			$getCSSBtn = $rfThemeModal.find(".getCSSBtn");
			$updateBtn = $rfThemeModal.find(".updateBtn");
			$doneBtn = $rfThemeModal.find(".doneBtn");
			kGetCSSBtn = $getCSSBtn.kendoButton().data("kendoButton");
			kUpdateBtn = $updateBtn.kendoButton().data("kendoButton");
			kDoneBtn = $doneBtn.kendoButton().data("kendoButton");
			kDoneBtn.enable(false);
		},

		addListeners = function () {
			$updateBtn.bind("click", function () {
				generate_css_and_update(updated_variables, update_theme);
			});
			$(".resetTheme").bind("click", function () {
				var value = $(this).data("value"),
					id = $(this).data("id");
				updated_variables["@"+id] = value;
				picker[id].value(value);
				generate_css_and_update(updated_variables, update_theme);
			});

			$doneBtn.bind("click", function () {
				$(this).hide();
				$("#rfThemeFileName").show();
				$getCSSBtn.show();
			});

			$getCSSBtn.bind("click", function () {
				var filename = $("#rfThemeFileName").val();
				if (filename === "") {
					filename = "custom_theme";
				}
				$(this).attr("download", filename + ".css");
			});
		},

		initThemeWindow = function () {
			themeWindow = $("#themeWindow").kendoWindow({
			  actions: [ "Close" ],
			  resizable: false,
			  width: 400,
			  maxHeight: 500,
			  close: function () {
			  },
			  title: "Dashboard ThemeBuilder"
			}).data("kendoWindow");

			themeWindow.center();
		},

		initPanelBar = function () {
			panelbar = $("#themepanelbar").kendoPanelBar({
		        expandMode: "single"
		    }).data("kendoPanelBar");
		
			panelbar.append(addComponentPanel());
		},

		initColorPicker = function () {
			for (var key in DefaultTheme) {
				if(DefaultTheme.hasOwnProperty(key)) {
					picker[key] = $("input[data-id = '" + key + "']").kendoColorPicker({
						value: DefaultTheme[key],
					    buttons: false,
					    change: updateVar
					}).data("kendoColorPicker");
				}
			}
		},

		addComponentPanel = function () {
			var theme_components = ThemeComponent,
				name = null;
				items = [],
				panelBarData = [];

			$.each(theme_components, function(idx, component) {
				name = component.section_name;
				items = component.items;
		    panelBarData.push({
		      text : name,
		      content: applyContent(items)
		    });
		  });

		  return panelBarData;
		},

		updateVar = function (e) {
			var variable = e.sender.element.data("id"),
					value = e.value;
			updated_variables["@"+variable] = value;
		},

		generate_css_and_update = function(variables_object,callback){
		  var default_vars_promise = get_file_as_promise('theme/variables.less'),
		      mixins_promise = get_file_as_promise('mixins.less'),
		      theme_promise = get_file_as_promise('theme.less');
		  $.when(default_vars_promise, mixins_promise, theme_promise).done(function(vars, mixins, theme) {
		    var themeLessSourceCode = mixins[0] + theme[0];
		    ThemeGen.generateTheme(	
		      variables_object,
		      vars[0],
		      themeLessSourceCode,
		      callback
		    );
		  });
		},

		update_theme = function(css) {
			kDoneBtn.enable(true);
		  append_css_to_head(css);
		  update_download_button(css);
		},

		append_css_to_head = function(css){
			if ($("#custom")) {
				$("#custom").remove();
			}
			$theme_style = $('<style id="custom">');
			$theme_style.html(css);
			$('head').append($theme_style);
		},

		update_download_button = function(css) {
		  var file_href = "data:application/octet-stream;charset=utf-8;base64," + btoa(css);
		  $('.getCSSBtn').attr('href', file_href);
		},

		get_file_as_promise = function(filename) {
		  var contents,
		      url =  RF_LESS_PATH + filename;

		  return $.ajax({
		    type: "GET",
		    url: url
		  });
		},

		applyContent = function (items) {
			var content = JST.theme_table({
				items: items,
				DefaultTheme: DefaultTheme
			});
			return content;
		};

	return ThemeBuilder;
});