// Default:
// =====================================================================================================================

document.addEventListener("DOMContentLoaded", function() {
	// Browsers
	let is_opera = !!window.opera || navigator.userAgent.indexOf(" OPR/") >= 0,
		is_Edge = navigator.userAgent.indexOf("Edge") > -1,
		is_chrome = !!window.chrome && !is_opera && !is_Edge,
		is_explorer =
			typeof document !== "undefined" && !!document.documentMode && !is_Edge,
		is_firefox = typeof window.InstallTrigger !== "undefined",
		is_safari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);

	const blocks = {
		body: document.querySelector("body"),
		wrapper: document.querySelector(`.${lotteryName}-wrapper`)
	};
	const elements = {};
	const jsElements = {
		scrollPS: blocks.wrapper.querySelector(`.${lotteryName}-scroll`),
		modalShow: blocks.wrapper.querySelectorAll(`.${lotteryName}-modalShow`)
		// hash: location.search.replace(/\?/,''),
		// modalHash: blocks.wrapper.querySelector(`.${lotteryName}-modal__${hash}`),
	};

	//Hash
	let hash = location.search.replace(/\?/, "");

	if (hash === "righttoleft") {
		ltrToRtl.href = "/assets/css/right-to-left.css";
		blocks.body.classList.add("righttoleft");
	}

	// PerfectScroll
	// let initPS = new PerfectScrollbar(jsElements.scrollPS);
	window.addEventListener("resize", function(event) {
		initPS.update();
	});
	// console.log(modalShow);

	// Modal
	for (let i = 0; i < jsElements.modalShow.length; i++) {
		jsElements.modalShow[i].addEventListener("click", function(e) {
			e.preventDefault();
			let modalClassName = this.dataset.modal;
			showModal(modalClassName);
		});
	}

	function showModal(modalName) {
		let curModal = document.querySelector(modalName);
		curModal.classList.add(`${lotteryName}-modal--open`);
		blocks.body.style.cssText = "overflow: hidden";

		// initPS.update();

		let curCloseBtnEl = document.querySelector(
			`${modalName} .${lotteryName}-modal__close`
		);
		curCloseBtnEl.addEventListener("click", function(e) {
			curModal.classList.remove(`${lotteryName}-modal--open`);
			blocks.body.style.cssText = "";
		});
	}
	document.addEventListener("click", function(e) {
		if (e.target.classList.contains(`${lotteryName}-modal__overlay`)) {
			e.target
				.closest(`.${lotteryName}-modal`)
				.classList.remove(`${lotteryName}-modal--open`);
			blocks.body.style.cssText = "";
		}
	});

	if (hash !== "") {
		let modalHash = document.querySelectorAll(`.${lotteryName}-modal${hash}`);
		if (modalHash.length > 0) {
			showModal(`.${lotteryName}-modal${hash}`);
		}
	}
});
