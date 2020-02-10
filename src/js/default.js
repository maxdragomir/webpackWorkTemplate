// Default:
// =====================================================================================================================

$(document).ready(function() {
	// Browsers
	let is_opera = !!window.opera || navigator.userAgent.indexOf(" OPR/") >= 0,
		is_Edge = navigator.userAgent.indexOf("Edge") > -1,
		is_chrome = !!window.chrome && !is_opera && !is_Edge,
		is_explorer =
			typeof document !== "undefined" && !!document.documentMode && !is_Edge,
		is_firefox = typeof window.InstallTrigger !== "undefined",
		is_safari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);

	// CustomScroll
	let scrollBar = $(`.${lotteryName}-scroll`);
	scrollBar.perfectScrollbar();
	$(window).on("resize", function() {
		$(`.${lotteryName}-scroll`).perfectScrollbar("update");
	});

	// Modal
	let modal = $(`.${lotteryName}-modalShow`);
	modal.on("click", function(e) {
		e.preventDefault();
		var $this = $(this),
			modalOpen = $this.data("modal");

		$(modalOpen).arcticmodal({
			afterOpen: function(data, el) {
				var scroll = $(el).find(`.${lotteryName}-scroll`);
				if (scroll.length) scroll.perfectScrollbar("update");

				$(el).addClass(`${lotteryName}-modal--show`);
			},
			beforeClose: function(data, el) {
				$(el).removeClass(`${lotteryName}-modal--show`);
			}
		});
	});
	$(`.${lotteryName}-modal__${hash}`).arcticmodal({
		afterOpen: function(data, el) {
			var scroll = $(el).find(`.${lotteryName}-scroll`);
			if (scroll.length) scroll.perfectScrollbar("update");

			$(el).addClass(`${lotteryName}-modal--show`);
		},
		beforeClose: function(data, el) {
			$(el).removeClass(`${lotteryName}-modal--show`);
		}
	});

	// Timers
	let timerDate = new Date(2030, 12, 12, 0, 15, 0);
	$(`.${lotteryName}-timer__wrapper`).countdown({
		until: timerDate,
		padZeroes: true,
		format: "DHMS",
		labels: ["Years", "Months", "Weeks", "дней", "часов", "минут", "секунд"],
		labels1: ["Year", "Month", "Week", "дней", "часов", "минут", "секунд"],
		labels2: ["Year", "Month", "Week", "дней", "часов", "минут", "секунд"],
		layout: `<ul class="${lotteryName}-timer__list">
	        <li><b>{d10}{d1}</b> <span>{dl}</span></li>
	        <li><b>{h10}{h1}</b> <span>{hl}</span></li>
	        <li><b>{m10}{m1}</b> <span>{ml}</span></li>
	        <li><b>{s10}{s1}</b> <span>{sl}</span></li>
	        </ul>`
	});

	// Animation
});
