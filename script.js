var col = $(".col");
var slot = $(".slot");
var modal = $(".modal");

$(".slot").on("mouseover", function(e) {
    console.log(e.target.parentNode);
    $(e.target.parentNode).css({ backgroundColor: "#8f8fe6" });
});
$(".slot").on("mouseout", function(e) {
    console.log(e.target.parentNode);
    $(e.target.parentNode).css({ backgroundColor: "#5050e2" });
});

(function() {
    var curPlayer = "player1";
    var everySlot = col.children();
    col.on("click", function(e) {
        var emptySlot;
        var slotsInColumn = $(e.currentTarget).find(slot);

        for (var i = 5; i >= 0; i--) {
            if (
                !slotsInColumn.eq(i).hasClass("player1") &&
                !slotsInColumn.eq(i).hasClass("player2")
            ) {
                emptySlot = slotsInColumn.eq(i);
                break;
            }
        }
        var row = i;
        var horizontalRow = $(".row" + row);

        emptySlot.addClass(curPlayer);

        checkForVerticalVictory(slotsInColumn);

        checkForHorizontalVictory(horizontalRow);

        checkForDiagonalVictory();

        switchPlayer();
    });

    function checkForVerticalVictory(slots) {
        var counter = 0;
        for (var i = 0; i < slots.length; i++) {
            if (slots.eq(i).hasClass(curPlayer)) {
                counter++;
                if (counter >= 4) {
                    modal.fadeIn("slow");
                    return true;
                }
            } else {
                counter = 0;
            }
        }
        return false;
    }
    function checkForHorizontalVictory(horizontalRow) {
        var counter = 0;
        for (var i = 0; i < horizontalRow.length; i++) {
            if (horizontalRow.eq(i).hasClass(curPlayer)) {
                counter++;
                if (counter >= 4) {
                    modal.fadeIn("slow");
                    return true;
                }
            } else {
                counter = 0;
            }
        }
        return false;
    }
    function checkIndex(a, b, c, d) {
        var firstPosition = everySlot.eq(a);
        var secondPosition = everySlot.eq(b);
        var thirdPosition = everySlot.eq(c);
        var fourthPosition = everySlot.eq(d);
        if (firstPosition.hasClass(curPlayer)) {
            if (secondPosition.hasClass(curPlayer)) {
                if (thirdPosition.hasClass(curPlayer)) {
                    if (fourthPosition.hasClass(curPlayer)) {
                        modal.fadeIn("slow");
                    }
                }
            }
        }
    }
    function checkForDiagonalVictory() {
        var solutions = [
            [1, 8, 15, 22],
            [8, 15, 22, 29],
            [2, 9, 16, 23],
            [0, 7, 14, 21],
            [7, 14, 21, 28],
            [14, 21, 28, 35],
            [6, 13, 20, 27],
            [13, 20, 27, 34],
            [20, 27, 34, 41],
            [12, 19, 26, 33],
            [18, 25, 32, 39],
            [19, 26, 33, 40],
            [18, 13, 8, 3],
            [24, 19, 14, 9],
            [19, 14, 9, 4],
            [30, 25, 20, 15],
            [25, 20, 15, 10],
            [20, 15, 10, 5],
            [36, 31, 26, 21],
            [31, 26, 21, 16],
            [26, 21, 16, 11],
            [37, 32, 27, 22],
            [32, 27, 22, 17],
            [38, 33, 28, 23]
        ];
        for (var i = 0; i < solutions.length; i++) {
            var diagonalVictories = solutions[i];
            checkIndex(
                diagonalVictories[0],
                diagonalVictories[1],
                diagonalVictories[2],
                diagonalVictories[3]
            );
        }
    }
    function switchPlayer() {
        if (curPlayer == "player1") {
            curPlayer = "player2";
        } else {
            curPlayer = "player1";
        }
    }
})();
