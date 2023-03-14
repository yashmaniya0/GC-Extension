async function load_all_submissions() {
    var dropdown = document.querySelector("#EARLIER > div.QRiHXd.fwcY1d.JYB4b > div:nth-child(5) > button > span.VfPpkd-kBDsod.HbKQLd.QRiHXd");
    var all_dropdowns = document.querySelectorAll("#yDmH0d > c-wiz > div > div > div.Z3qXvc > div.pEwOBc > div");

    async function fetcher(dropdown) {
        // console.log(dropdown.querySelector("button"));
        dropdown.querySelector("button").click();

        function view_them_all(){
            return new Promise((resolve) =>{
                setTimeout(async () => {
                    var view_all = await dropdown.querySelectorAll("button");
                    // console.log("View all  :  ");
                    // console.log(view_all[1]);
                    if (view_all[1]) {
                        view_all[1].click();
                    }
                    resolve(1);
                }, 1000);
            });
        }

        // function fetch_marks(){
        //     return new Promise((resolve) =>{
        //         setTimeout(() => {
        //             console.log("fn called");
        //             resolve(1);
        //         }, 1000);
        //     });
        // }

        await view_them_all();
        // await fetch_marks();

        console.log("loaded all submissions");

        return 1;
    }

    for (dropdown of all_dropdowns) {
        let status = await fetcher(dropdown);
        console.log(status); 
    }

    setTimeout(gimme_marks, 7000);
}

function gimme_marks() {
    // var css_link = '<link rel="stylesheet" type="text/css" href="C:/Users/YASH MANIYA/Desktop/Web-Dev/Extensions/E1/style.css">';
    var container = "<div class='my mycontainer'>";

    var l = document.querySelectorAll("li");                        // all assignments and quizzes
    var p = document.querySelectorAll("li p:nth-child(2)");         // courses
    var courses = [];
    var course_wise_marks = {};
    for (i of p) {
        if (courses.indexOf(i.textContent) < 0) {
            courses.push(i.textContent);
            course_wise_marks[i.textContent] = [
                [0, 0]
            ];
        }
    }
    for (i of l) {
        var str = i.textContent;
        if (str.includes("out of")) {
            var course = i.querySelector("p:nth-child(2)").textContent;
            var quiz = i.querySelector("p:nth-child(1)").textContent;
            var span = i.querySelector("span span span span:last-child").textContent;
            var separator = span.indexOf("/");
            var obtained_marks = parseFloat(span.slice(0, separator));
            var total_marks = parseFloat(span.slice(separator + 1,));
            course_wise_marks[course][0][0] += obtained_marks;
            course_wise_marks[course][0][1] += total_marks;
            course_wise_marks[course].push([quiz, obtained_marks, total_marks]);
            //console.log(course + "\n" + quiz + " :\n" + obtained_marks + " / " + total_marks);
        } else {
            console.log("else " + i);
            //pass
        }
    }
    console.log("\n\nCourse-Wise Quiz Marks Obtained :\n\n");
    for (i in course_wise_marks) {
        var course_obtained = course_wise_marks[i][0][0];
        var course_total = course_wise_marks[i][0][1];
        if (course_total == 0) { continue; }

        console.log("\n" + i);
        var course_div = "<div class = 'my mycourse'>" + i + "</div>";
        var ul_tag = "<ul>"

        for (j in course_wise_marks[i]) {
            if (j == 0) {
                continue;
            }
            var quiz = course_wise_marks[i][j][0];
            var obtained_in_quiz = course_wise_marks[i][j][1];
            var total_in_quiz = course_wise_marks[i][j][2];

            ul_tag += "<li>" + quiz + "\t:\t" + obtained_in_quiz + " / " + total_in_quiz + "</li>";
            console.log(quiz + " :\n" + obtained_in_quiz + " / " + total_in_quiz);
        }
        ul_tag += "</ul>";

        var quizzes_div = "<div class = 'my myquizzes'>" + ul_tag + "</div>";
        var overall_div = "<div class = 'my myoverall'><br>Overall Performance in Course : \t" + course_obtained + "\t/\t" + course_total;
        overall_div += "<br> Percentage: " + ((course_obtained / course_total) * 100).toFixed(2) + " %</div><hr id='hr_line'>";
        container += course_div + quizzes_div + overall_div;

        console.log("\nOverall Performance in Course :\n")
        console.log("Obtained Marks: " + course_obtained);
        console.log("Total Marks: " + course_total);
        console.log("Percentage: " + ((course_obtained / course_total) * 100).toFixed(2) + " %");
        console.log("--------------------------------------------------------")
    }
    container += "</div>";
    document.body.innerHTML = container;
}

var flag = false;
if (window.location.href == 'https://classroom.google.com/u/0/a/turned-in/all') {
    flag = true;
}

if (flag) {
    var timeout = setTimeout(load_all_submissions, 7000);
}
