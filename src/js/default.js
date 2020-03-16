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
	};

	setTimeout(function() {
		blocks.wrapper.classList.add(`${lotteryName}-loaded`);
	}, 500);

	//Hash
	let hash = location.search.replace(/\?/, "");
	if (hash === "righttoleft") {
		// ltrToRtl.href = "/assets/css/right-to-left.css";
		blocks.body.classList.add("righttoleft");
		direction = true;
	}

	// PerfectScroll
	let initPS = new PerfectScrollbar(jsElements.scrollPS);
	window.addEventListener("resize", function(event) {
		initPS.update();
	});

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

		initPS.update();

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
			console.log(1);
			e.target
				.closest(`.${lotteryName}-modal`)
				.classList.remove(`${lotteryName}-modal--open`);
			blocks.body.style.cssText = "";
		}
	});
	// проверяем поддержку
	if (!Element.prototype.closest) {

		// реализуем
		Element.prototype.closest = function(css) {
			var node = this;

			while (node) {
				if (node.matches(css)) return node;
				else node = node.parentElement;
			}
			return null;
		};
	}
	// проверяем поддержку
	if (!Element.prototype.matches) {

		// определяем свойство
		Element.prototype.matches = Element.prototype.matchesSelector ||
			Element.prototype.webkitMatchesSelector ||
			Element.prototype.mozMatchesSelector ||
			Element.prototype.msMatchesSelector;

	}
	if (hash !== "") {
		let modalHash = document.querySelectorAll(`.${lotteryName}-modal${hash}`);
		if (modalHash.length > 0) {
			showModal(`.${lotteryName}-modal${hash}`);
		}
	}

	// Slider
	let slider = tns({
		container: `.${lotteryName}-slider`,
		items: 1,
		slideBy: "page",
		loop: true,
		rewind: true,
		autoplay: true,
		nav: false,
		controls: true,
		speed: 1500,
		autoplayTimeout: 3500,
		autoplayButtonOutput: false
	});

	slider.events.on("transitionStart", function(displayIndex, eventName) {
		var info = slider.getInfo(),
			indexCurrent = info.index,
			container = info.container,
			controls = info.controlsContainer;
		// console.log(container);
		if (indexCurrent === 1) {
			controls.classList.add(`tns-showPrev`);
			controls.classList.remove(`tns-showNext`);

			if (direction) {
				container.classList.add(`tns-rtl`);
			}
		} else {
			controls.classList.add(`tns-showNext`);
			controls.classList.remove(`tns-showPrev`);

			if (direction) {
				container.classList.remove(`tns-rtl`);
			}
		}
	});
});
