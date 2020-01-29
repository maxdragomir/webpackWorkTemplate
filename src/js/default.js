// Default:
// =====================================================================================================================


$(document).ready(function() {

    // Browsers
    let is_opera = !!window.opera || navigator.userAgent.indexOf(' OPR/') >= 0,
        is_Edge = navigator.userAgent.indexOf("Edge") > -1 ,
        is_chrome = !!window.chrome && !is_opera && !is_Edge,
        is_explorer= typeof document !== 'undefined' && !!document.documentMode && !is_Edge,
        is_firefox = typeof window.InstallTrigger !== 'undefined',
        is_safari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);


    // CustomScroll
    let scrollBar = $(`.${lotteryName}-scroll`);
    scrollBar.perfectScrollbar();


    // Modal
    let modal = $(`.${lotteryName}-modalShow`);
    modal.on('click', function(e) {
        e.preventDefault();
        var $this = $(this),
            modalOpen = $this.data('modal');

        $(modalOpen).arcticmodal({
            afterOpen: function(data, el) {
                var scroll = $(el).find(`.${lotteryName}-scroll`);

                $(`.${lotteryName}-modal__body`).addClass('show');
                if(scroll.length) scroll.perfectScrollbar('update');
            },
            beforeClose: function () {
                $(`.${lotteryName}-modal__body`).removeClass('show');
            }
        });
    });
    $(`.${lotteryName}-modal__${hash}`).arcticmodal({
        afterOpen: function(data, el) {
            var scroll = $(el).find(`.${lotteryName}-scroll`);

            $(`.${lotteryName}-modal__body`).addClass('show');
            if(scroll.length) scroll.perfectScrollbar('update');
        },
        beforeClose: function () {
            $(`.${lotteryName}-modal__body`).removeClass('show');
        }
    });


    // Timers
    let timerDate = new Date(2030,12, 12, 0, 15, 0);
    $(`.${lotteryName}-timer`).countdown({
        until: timerDate,
        padZeroes: true,
        format: 'DHMS',
        labels: ['Years', 'Months', 'Weeks', 'дней', 'часов', 'минут', 'секунд'],
        labels1: ['Year', 'Month', 'Week', 'дней', 'часов', 'минут', 'секунд'],
        labels2: ['Year', 'Month', 'Week', 'дней', 'часов', 'минут', 'секунд'],
        layout:`<ul class="${lotteryName}-timerList">
            <li><b>{d10}{d1}</b> <span>{dl}</span></li>
            <li><b>{h10}{h1}</b> <span>{hl}</span></li>
            <li><b>{m10}{m1}</b> <span>{ml}</span></li>
            <li><b>{s10}{s1}</b> <span>{sl}</span></li>
            </ul>`
    });


    // Animation ScrollReveal
    if(window.ScrollReveal) {
        window.sr = ScrollReveal({
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
    }

});