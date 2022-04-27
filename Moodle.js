javascript: {
    function routine() {
        var i = 0;
        const myTimeout = setTimeout(repeat, 10 * 1000);

        function repeat() {
            console.log(i);
            window.open('https://classroom.sumankundu.info/moodle/mod/forum/view.php?id=10092', '_self');
            i++;
        }
    }
    routine();
}