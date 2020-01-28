
// ScrollReveal().reveal(`${lotteryName}-sectionMain`);

// let add = (a, b) => a+b;
// console.log(add(10,5));

// console.log(`lol kek ${lotteryName}`);
window.sr = ScrollReveal(
    {
        reset: true,
        duration: 0,
        delay: 0,
        afterReveal: function (domEl) {
            $(domEl).addClass('revealed');
        },
        afterReset: function(domEl) {
            $(domEl).removeClass('revealed');
        }
    });
sr.reveal(`.${jsReveal}`);
