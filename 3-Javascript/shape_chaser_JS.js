var start = new Date().getTime();

      function getRandomColor() {

        var letters = "0123456789ABCDEF".split("");

        var color = "#";

        for (var i=0; i<6; i++) {

          color += letters[Math.floor(Math.random() * 16)];

        }
        
        return color;        

      }
      
      function makeShapeAppear() {

        var top = Math.floor(Math.random() * 35);

        var left = Math.floor (Math.random() * 60);

        var width = Math.floor (Math.random() * 15) + 3;

        var randomCircle = Math.random();

        // Circle 50% of the time
        
        if (randomCircle > 0.5) {

          document.getElementById("shape").style.borderRadius = "50%";

        } else {

          document.getElementById("shape").style.borderRadius = "0%";

        }

        document.getElementById("shape").style.top = top + "vh";

        document.getElementById("shape").style.left = left + "vw";

        document.getElementById("shape").style.width = width + "vw";

        document.getElementById("shape").style.height = width + "vw";

        document.getElementById("shape").style.backgroundColor = getRandomColor();;
        
        document.getElementById("shape").style.display = "block";

        start = new Date().getTime();

      }

      function appearAfterDelay() {

        setTimeout(makeShapeAppear, Math.floor(Math.random() * 3001));

      }

      function average(a, n)
      {
       
        // Find sum of array element
        var sum = 0;
        for (var i = 0; i < n; i++) sum += a[i];
 
        return parseFloat(sum / n);
      }

      
      function printTimes() {
            
            var end = new Date().getTime();

            var timeTaken = (end - start)/1000;

            document.getElementById("secondsTaken").innerHTML = timeTaken + "s";

            times.push(timeTaken);



            var newTime = document.createElement('li');
      
            newTime.appendChild(document.createTextNode(times[times.length-1] + "s"));

            document.querySelector('ol').appendChild(newTime);

            timesClicked = timesClicked + 1;



            if (times[times.length-1] < fastestClick) {

              fastestClick = times[times.length-1];
              
              document.getElementById("fastestClick").innerHTML = times[times.length-1] + "s";

            }
          
      }

      //countdown numbers
      
      function countdownThreeDisappear() {

        document.getElementById("three").style.display = "none";

      }

      function countdownTwoDisappear() {

        document.getElementById("two").style.display = "none";

      }

      function countdownOneDisappear() {

        document.getElementById("one").style.display = "none";

      }

      function beginsIn() {

        document.getElementById("gameBeginsIn").style.display = "none";

      }

      
      function countdown() {

        document.getElementById("three").style.display = "table";

        document.getElementById("two").style.display = "table";

        document.getElementById("one").style.display = "table";

        document.getElementById("gameBeginsIn").style.display = "block";
        
        setTimeout(countdownThreeDisappear, 1000);

        setTimeout(countdownTwoDisappear,2000);

        setTimeout(countdownOneDisappear,3000);

        setTimeout(beginsIn,3000);

      }


      function getHighestPlayerScore() {

        var pastScores = names[enteredName];

        personalHighscore = pastScores[0];

        for (i=1; i<pastScores.length; i++) {

          if (pastScores[i] < personalHighscore) {

            personalHighscore = pastScores[i];

          }

        }
        
        return personalHighscore;

      }


      function printHighestPlayerScore() {

        var table = document.getElementById("scoreTable");

        var rowCount = table.rows.length;

        for (i=0; i<rowCount; i++) {

          if (table.rows[i].cells[0].innerHTML == enteredName) {

            table.rows[i].cells[1].innerHTML = personalHighscore.toPrecision(3);

          }

        }

      }


      function highestScoreOverall() {

        var table = document.getElementById("scoreTable");

        var rowCount = table.rows.length;

        var highestScoreOverall = 100000;

        var highestScoreOverallName = "";

        var currentScore = 0;

        var rowNumber = 0;

        if (rowCount > 0) {
        
          for (i=1; i<rowCount; i++) {

            currentScore = table.rows[i].cells[1].innerHTML;

            if (currentScore < highestScoreOverall) {

              highestScoreOverall = currentScore;

              rowNumber = i;

            }

          }

          document.getElementById("highscoreHolder").innerHTML = table.rows[rowNumber].cells[0].innerHTML;

        }

      }

      
      
      //page begins...



      countdownTwoDisappear();

      countdownOneDisappear();

      countdownThreeDisappear();

      beginsIn();

      var times = [];

      var highscore = 1000000000000000;

      var fastestClick = 100000000000000;

      var timesClicked = 0;

      var timesPlayed = 1;

      var names = {};

      var enterNameButtonClick = 1;

      enteredName = [];

      names[enteredName] = [];


    

      
      //enter name function


      document.getElementById("enterName").onclick = function () {
        
        enteredName = document.getElementById("nameBar").value;

        var table = document.getElementById("scoreTable");

        var rowCount = table.rows.length;

        var alreadyThere = 0;
        
        for (i=0; i<rowCount; i++) {

          if (table.rows[i].cells[0].innerHTML == enteredName) {

            var alreadyThere = 1;

          }
        
        }

        if (alreadyThere == 0) {

          var newRow = table.insertRow(rowCount);

            var newName = newRow.insertCell(0);

            var newHighscore = newRow.insertCell(1);

            newName.innerHTML = enteredName;
        
        }

        names[enteredName] = names[enteredName] || [];

        return enteredName;

      }

      
      
      
      
      //start again button
      
      document.getElementById("startAgain").onclick = function() {

        timesClicked = 0;

        document.getElementById("timesList").innerHTML = "";

        document.getElementById("avgTime").innerHTML = "";

        document.getElementById("secondsTaken").innerHTML = "";

        document.getElementById("shape").style.display = "none";

        countdown();
        
        setTimeout(appearAfterDelay, 3000);

        if (document.getElementById("highscore").innerHTML !== "") {
        
          timesPlayed = timesPlayed + 1;

        }

      }

      
      //when click shape

      document.getElementById("shape").onclick = function() {

        document.getElementById("shape").style.display = "none";
        
        if (timesClicked < 9) {

          printTimes();;
                
          appearAfterDelay();

        } else {

          printTimes();
          
          var avgOfTimes = average(times,times.length);        

          var difference = avgOfTimes - highscore;

          if (enteredName !== 0) {

            i = names[enteredName].length;

            names[enteredName][i] = avgOfTimes;

            getHighestPlayerScore();

            printHighestPlayerScore();

            setTimeout(highestScoreOverall,1000);

          }

          

          document.getElementById("avgTime").innerHTML = "Average time: " + avgOfTimes.toPrecision(3) + "s";

          if (difference > 0) {

           alert("Oh dear, you didn't beat the highscore. You were " + difference.toPrecision(3) + " off. Press PLAY to play again!");

          } else if (timesPlayed == 1) {

            alert("Well done, you scored " + avgOfTimes.toPrecision(3) + "s. Press PLAY to play again!")

            highscore = avgOfTimes;

            document.getElementById("highscore").innerHTML = highscore.toPrecision(3) + "s";

          }
          
          else {

            difference = - difference;

            alert("Well done, you scored " + avgOfTimes.toPrecision(3) + "s. That's " + difference.toPrecision(3) + "s above the highscore. Press PLAY to play again!")

            highscore = avgOfTimes;

            document.getElementById("highscore").innerHTML = highscore.toPrecision(3) + "s";

          }

        }

      }