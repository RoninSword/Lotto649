//run everything inside this on program load
window.onload = function () {

    //setting constants for later
    const DATE = document.getElementById('dateOutput');
    const COMP_NUM = document.getElementById('compNumbs');
    const USER_NUM = document.getElementById('userNumbs');
    const MATCHES_DISPLAY = document.getElementById('matches');


    //function that takes in 2 arrays and returns how many matches it finds
    function matcher(computer, user) {

        //matches variable keeps track of the number of matches
        //color array is to keep track of which cell of the users numbers are matches for later css changes
        let matches = 0;
        let color = new Array(6);
        //loop that keeps track of which number in the computer array it is looking at
        for (let i = 0; i < 6; i++) {


            //loop that keeps track of which number in the user array it is looking at
            for (let x = 0; x < 6; x++) {

                if (user[x] == computer[i]) {
                    color[x] = 1;
                    matches++;
                }

            }

        }

        //returns a number in matches, and an array called color
        return [
            matches,
            color
        ];

    }

    //a function that creates and styles a string for date output
    function makeDate() {
        let results = "Numbers drawn on ";

        //date object so we can get specifics
        let now = new Date();

        //all these get the specific numbers for the dates
        let day = now.getDay();
        let month = now.getMonth();
        let date = now.getDate();
        let year = now.getFullYear();
        let hours = now.getHours();
        let minutes = now.getMinutes();
        let seconds = now.getSeconds();

        //if statement set that figures out which day of the week it is
        if (day == 0) {
            day = "Sunday"
        } else if (day == 1) {
            day = "Monday"
        } else if (day == 2) {
            day = "Tuesday"
        } else if (day == 3) {
            day = "Wednesday"
        } else if (day == 4) {
            day = "Thursday"
        } else if (day == 5) {
            day = "Friday"
        } else {
            day = "Saturday"
        }

        //if statement set that figures out which month it is
        if (month == 0) {
            month = "January"
        } else if (month == 1) {
            month = "Febuary"
        } else if (month == 2) {
            month = "March"
        } else if (month == 3) {
            month = "April"
        } else if (month == 4) {
            month = "May"
        } else if (month == 5) {
            month = "June"
        } else if (month == 6) {
            month = "July"
        } else if (month == 7) {
            month = "August"
        } else if (month == 8) {
            month = "September"
        } else if (month == 9) {
            month = "October"
        } else if (month == 10) {
            month = "November"
        } else {
            month = "December"
        }

        //if statements that force the string to not cut off the extra zero in its formatting
        if (seconds <= 9 && minutes <= 9) {
            results = results + day + ", " + month + " " + date + ", " + year + " @ " + hours + ":0" + minutes + ":0" + seconds;
        } else {
            results = results + day + ", " + month + " " + date + ", " + year + " @ " + hours + ":" + minutes + ":" + seconds;
        }


        return results;

    }


    //generates an array of 6 random non-repeating numbers
    function randomNum() {

        let numbers = new Array(49);

        let chosen = new Array(6);

        //create an array of 1-49
        for (let i = 0; i < 49; i++) {
            numbers[i] = i + 1;
        }



        //loop that keeps track of how many numbers it has chosen
        for (let i = 0; i < 6; i++) {

            //random number generator
            let rand = Math.floor(Math.random() * (49 - i));

            //puts the number at position rand in array numbers into array chosen
            chosen[i] = numbers[rand];

            //splices off position rand in numbers
            numbers.splice(rand, 1);
        }


        return chosen;
    }


    //builds the table layout for output later
    //accepts 2 array variables
    function tableBuild(numbers, colors) {

        //had to do this because you can't concatinate from a line outside the loop to a line isnide the loop
        let display = "<table><tr>"

        //loop that builds the one row table
        //if color[i] is one (is a match), then give that cell the match_color tag, assigning it the css value
        for (let i = 0; i < 6; i++) {
            if (colors[i] == 1) {
                display = display + "<td> <match_color>" + numbers[i] + "</match_color> </td>"
            } else {
                display = display + "<td>" + numbers[i] + "</td>"
            }
        }

        //finishes the building of the table
        display = display + "</tr></table>";

        return display;
    }


    //runs this when the button is clicked
    document.getElementById('clicked').onclick = function () {

        //checks to see if the no button for choosing your own numbers is checked
        if (document.getElementById('no').checked == true) {

            //create arrays of random numbers for both the user, computer and creates a variable that holds the date string for output
            let compRand = randomNum();
            let userRand = randomNum();
            let date = makeDate();


            //sorts both arrays by numeric order
            compRand = compRand.sort(function (x, y) {
                return x - y;
            });

            userRand = userRand.sort(function (x, y) {
                return x - y;
            })

            //counts the number of matches between the two arrays
            let match_color = matcher(compRand, userRand);

            //calls the table building array
            //compRand does not need to worry about coloring itself, so it gives an empty array as the second variable as a palceholder arguement
            //userRand sends itself to the tableBuild and an array that keeps track of all the positions of it that are matches and thus need to have there backgrounds changed
            compRand = tableBuild(compRand, new Array(6));
            userRand = tableBuild(userRand, match_color[1]);

            //tells the user what selection style they picked
            document.getElementById('decision').innerHTML = 'Quick Pick Selected. Your numbers are:'


            //outputs the date and the 2 number sets
            DATE.innerHTML = date;
            COMP_NUM.innerHTML = compRand;

            USER_NUM.innerHTML = userRand;

            //if statement that tells the user how many matches they made
            if (match_color[0] == 0) {
                MATCHES_DISPLAY.innerHTML = "Sorry, no numbers matched! Try again next time!";
            } else {
                MATCHES_DISPLAY.innerHTML = "You matched " + match_color[0] + " numbers!" + " Is that enough for you, or do you want to play again?";
            }


        } //run this if the yes button is checked (only one other option if the yes is not checked)
        else {

            //creates an array the same length as the amount of check bozes they are. creates variable count at 0 and an array of size 6
            let check_test = document.getElementsByName('numbers');
            let count = 0;
            let chosen = new Array(6);

            //do this loop while the array of chosen numbers is not full
            while (count < 6) {
                //loop that checks if the current checkbox is checked
                //does it for every checkbox until an array of size 6 is filled
                for (let i = 0; i < check_test.length; i++) {
                    //if the checkbox is checked, then assign the value to a temporary variable. then parseFloat the number so that it is a numeric value and not a string
                    if (check_test[i].checked == true) {
                        let temp_num = check_test[i].value;
                        temp_num = parseFloat(temp_num);

                        //put the new numeric number into the chosen array
                        chosen[count] = temp_num;
                        count++;
                    }
                }
            }

            //tells the user they did not pick 6 numbers
            if (count != 6) {
                alert("You did not pick 6 numbers");
            } //runs this if the user picked 6 numbers 
            else {

                //creates a date string for output
                //creates an array of random numbers for the computer
                //sorts the array of random numbers
                let date = makeDate();
                let compRand = randomNum();
                compRand = compRand.sort(function (x, y) {
                    return x - y;
                });

                //matches the computers array agains the users chosen array
                let match_color = matcher(compRand, chosen);

                //calls the table building array
                //compRand does not need to worry about coloring itself, so it gives an empty array as the second variable as a palceholder arguement
                //chosen sends itself to the tableBuild and an array that keeps track of all the positions of it that are matches and thus need to have there backgrounds changed
                compRand = tableBuild(compRand, new Array(6));
                chosen = tableBuild(chosen, match_color[1]);

                //tell the user they picked the numbers
                document.getElementById('decision').innerHTML = 'You picked the following numbers:'


                //outputs the date, the computers array and the users array
                DATE.innerHTML = date;
                COMP_NUM.innerHTML = compRand;
                USER_NUM.innerHTML = chosen;

                //tells the user how many matches they got
                if (match_color[0] == 0) {
                    MATCHES_DISPLAY.innerHTML = "Sorry, no numbers matched! Try again next time!";
                } else {
                    MATCHES_DISPLAY.innerHTML = "You matched " + match_color[0] + " numbers!" + " Is that enough for you, or do you want to play again?";
                }



            }



        }

    }




}
