/* sole purpose of this script is for debugging purpose, it shows a "Page reloaded: x seconds ago"
on the lower right hand corder
*/

(function () {

    $(function () {


        var start = new Date();
        var timerDiv = $('<div>Page reloaded: <span></span> seconds ago.</div>').css({
                                'position': 'absolute',
                                'bottom': '0px',
                                'right': '0px',
                                'font-size': '10px'
                            }).appendTo('body');
        var timerSpan = timerDiv.find('span')
            .css('font-size', '14px');
        var timerId = setInterval(function () {
            var now = new Date();
            var seconds = Math.round((now - start) / 100) / 10;
            timerSpan.text(seconds);
        }, 600);


        $(document).on('LiveReloadDisconnect', function () {
            timerDiv.text('Disonnected from server.')
                .css({
                    'color':'red',
                    'font-size': '14px'
                });
            clearInterval(timerId);
        });

    });



})();