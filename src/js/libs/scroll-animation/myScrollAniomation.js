// ScrollMagic
const controller = new ScrollMagic.Controller();

// Animate a non-inline object to a y or x value
// Usage: data-animation="y:-100" (non-mobile trigger on scroll)
// Example: <div data-animation="opacity: 0, x:-50%, y:50%"></div>
// Default: data-animation-duration="0.5" (1)
// Default: data-animation-direction="to" (to)
// Default: data-animation-trigger-hook="0.8" (middle)
// Default: data-animation-reverse="false" (true)
// Default: data-animation-trigger-element="#someID" (parent)
// Optional: data-animation-mobile="y:-50" (animate mobile up)
// Optional: data-animation-scroll-duration="50%" (bind to scroll)
// Optional: data-animation-ease="Linear"
// Optional: data-animation-offset="100" (0)

NodeList.prototype.forEach = Array.prototype.forEach;
document
.querySelectorAll("[data-animation], [data-animation-mobile]")
.forEach(function (element, i) {
    const isMobile = /Mobi|Android/i.test(navigator.userAgent);
    let data = [].filter.call(element.attributes, function (at) {
        return /^data-/.test(at.name);
    });

    let getData = function (str) {
        let _data = data.filter(function (d) {
            return d.name == "data-" + str;
        });
        if (!_data[0] || !_data[0].value) return;
        return _data[0].value && !_data[0].value.match(/(:|,)/g)
            ? _data[0].value
            : Object.assign(
                ..._data[0].value
                    .replace(": ", ":")
                    .replace(", ", ",")
                    .split(",")
                    .map(function (d) {
                        return {[d.split(":")[0].replace(" ", "")]: d.split(":")[1]};
                    })
            );
    };
    if (!getData("animation") && !getData("animation-mobile")) {
        console.log("abort animation: data-animation* not found");
        return;
    }

    let offset = getData("animation-offset") || 0;
    let triggerHook =
        (getData("animation-trigger-hook") && {
            triggerHook: getData("animation-trigger-hook")
        }) ||
        {};
    let ease =
        (getData("animation-ease") && {ease: getData("animation-ease")}) || {};
    let fromTo = getData("animation-direction") || "from";
    let toTarget =
        (isMobile && getData("animation-mobile")) || getData("animation");
    let triggerEl =
        (getData("animation-trigger-element") &&
            document.querySelector(getData("animation-trigger-element"))) ||
        element.parentNode;
    let scrollDuration =
        (getData("animation-scroll-duration") && {
            duration: getData("animation-scroll-duration")
        }) ||
        {};
    let tweenDuration = !!getData("animation-duration")
        ? parseFloat(getData("animation-duration"))
        : 1;
    let tweenReverse =
        (!!getData("animation-reverse") && {
            reverse: getData("animation-reverse").toLowerCase() === "true"
        }) ||
        {};

    const TweenMax = gsap.timeline();
    TweenMax.set([triggerEl], {
        backfaceVisibility: "hidden",
        perspective: 1000
    });
    const tween = TweenMax[fromTo](element, tweenDuration, {
        ...toTarget,
        ease
    });

    let sceneOptions = {
        triggerElement: triggerEl,
        ...scrollDuration,
        offset: offset,
        ...triggerHook,
        ...tweenReverse
    };
    let scene = new ScrollMagic.Scene(sceneOptions).setTween(tween);
    // isDev = /cdpn\.io|localhost/i.test(location.hostname);
    if (isDev) scene.addIndicators();
    scene.addTo(controller);

    if (isDev) {
        console.log({"tween options": tween, tweenDuration: tweenDuration});
        console.log({
            animated: element,
            scene: scene,
            "trigger-animation-element": triggerEl
        });
    }

});
