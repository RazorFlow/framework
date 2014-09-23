$(function () {
	var timeStart, elapsed,
		totalIteration,
		timeArr = [],
		renderTrigger = false,
		resizeTrigger = false,
		db,
		Benchmark = {
			reset: function () {
				timeStart = 0;
				elapsed = 0;
				resizeTrigger = false;
				renderTrigger = false;
				timeArr = [];
				totalIteration = 10;
			},
			dbRender: function () {
				db = window.rfBenchmark ();
				db.renderTo($("#dbTarget"));
				Benchmark.initialize ();
			},
			initialize: function () {
				db.bind("resizeFinished", function () {
					if (resizeTrigger) {
						elapsed = new Date().getTime() - timeStart;
						timeArr.push(elapsed);
						Benchmark.checkingResize();
					}
				});

				db.bind("renderFinished", function () {
					if (renderTrigger) {
						elapsed = new Date().getTime() - timeStart;
						timeArr.push(elapsed);
						Benchmark.checkingRender();
					}
				});
			},
			checkingRender: function () {
				if(!renderTrigger) {
					return;
				}
				console.log("Rendering " + totalIteration);
				if (totalIteration-- > 0) {
					timeStart = new Date().getTime();
					$(".rfTooltip, .k-window").remove();
					db.pro.dispose();
					$("#dbTarget").empty();
					Benchmark.dbRender();
				} else {
					var sum = 0, count = timeArr.length;
					for (var i = 0; i < count; i++) {	
						sum += timeArr[i];
					}
					$(".redraw-info").text(count + " renders. Average " + sum/count + " ms/render");
				}
			},

			checkingResize: function () {
				if (!resizeTrigger) {
					return;
				}
				console.log("Resizing " + totalIteration);
				if (totalIteration-- > 0) {
					db.pro.dispose();
					timeStart = new Date().getTime();
					if($("#dbTarget").width() == "900") {
						db.pro.forceResize(920);
					} else {
						db.pro.forceResize(900);
					}
				} else {
					var sum = 0, count = timeArr.length;
					for (var i = 0; i < count; i++) {	
						sum += timeArr[i];
					}
					$(".resize-info").text(count + " resizes. Average " + sum/count + " ms/resize");
				}
			}
		};

	$("#dbTarget").css({
		"width": 900
	});

	$(".rfRedrawLink").bind("click", function () {
		Benchmark.reset ();
		renderTrigger = true;
		Benchmark.checkingRender();
	});


	$(".rfResizeLink").bind("click", function () {
		Benchmark.reset ();
		resizeTrigger = true;
		Benchmark.checkingResize();
	});


	Benchmark.dbRender();

});