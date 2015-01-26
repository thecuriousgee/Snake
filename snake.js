(function(){
  if(typeof Snakes === "undefined"){
    Snakes = {};}

    // Snake Class
    Snake = Snakes.Snake = function (board) {
      this.dir = "S";
      this.segments = [[0,0], [1,0], [2,0], [3,0], [4,0], [5,0]];
    }

    Snake.DIRS = { "N": [-1, 0], "S": [1,0],
    "W": [0, -1], "E": [0,1]}

    // Adds a link to end of the Snake's body with the latest turn
    Snake.prototype.move = function () {
      var lastSpot = this.segments[this.segments.length-1];
      var newSpot = [lastSpot[0]+Snake.DIRS[this.dir][0],
      lastSpot[1]+Snake.DIRS[this.dir][1]];
      this.segments.push(newSpot);
      this.segments.shift();

    };

    Snake.prototype.nextSpot = function () {
      var lastSpot = this.segments[this.segments.length-1];
      var newSpot = [lastSpot[0]+Snake.DIRS[this.dir][0],
      lastSpot[1]+Snake.DIRS[this.dir][1]];
      return newSpot

    }

    // changes the dir ivar of snake
    Snake.prototype.turn = function (newDir) {
      if(this.oppositeDir(this.dir) != newDir) {
        this.dir = newDir;
      }
    };

    Snake.prototype.oppositeDir = function (dir) {
        switch (dir) {
          case "N":
            return "S";
            break;
          case "S":
            return "N";
            break;
          case "E":
            return "W";
            break;
          case "W":
            return "E";
            break;
        }
    }

    Snake.prototype.occupies = function (pos) {
      var bool = false
      this.segments.forEach( function(el) {
        if(pos[0] === el[0] && pos[1] === el[1]) {
          bool = true;
        };
      });
      return bool;
    };

    // Apple Class
    // ------------------------------------------------
    var Apple = Snakes.Apple = function (board) {
      this.board = board;
      this.pos = this.appear();

    }

    Apple.prototype.appear = function () {
      var notPlaced = true
      // debugger;
      while(notPlaced) {
        var row = Math.floor(Math.random() * Snakes.Util.dim());
        var col = Math.floor(Math.random() * Snakes.Util.dim());
        if(!this.board.snake.occupies([row, col])) {
          notPlaced = false;
        }
      }
      return [row, col];
    }



    // Board Class
    // ------------------------------------------------
    var Board = Snakes.Board = function (snake, apple) {
      this.snake = new Snakes.Snake(this);
      this.apple = new Snakes.Apple(this);
      this.dims = [Snakes.Util.dim(),Snakes.Util.dim()];

    };

    Board.prototype.fillGrid = function () {
      var grid = [];
      var size = this.dims[0];
      for (var i = 0; i < size; i++) {
        grid.push([]);}
      for (var i = 0; i < size; i++) {
        for (var j = 0; j < size; j++) {
          grid[j].push(".");
        };
      };

      this.snake.segments.forEach( function(segment) {
        grid[segment[0]][segment[1]] = "S";
      })
      grid[this.apple.pos[0]][this.apple.pos[1]] = "A";

      return grid;
    }

    Board.prototype.outOfBounds = function (pos) {
      if(pos[0] >= this.dims[0] || pos[0] < 0 ||
         pos[1] >= this.dims[1] || pos[1] < 0) {
           return true;
         };
      return false;
    }

    Board.prototype.render = function () {
      str = "";
      var grid = this.rasta();
      for (var i = 0; i < grid.length; i++) {
        str += String.fromCharCode(182);
        for (var j = 0; j < grid.length; j++) {
          str += grid[i][j];
        } str += String.fromCharCode(182) + "\n";
      }
      this.snake.segments.forEach(function(pos) {
      })
      return str;
    }

    Snakes.Util = {};
    Snakes.Util.dim = function () {
      return 16;
    };
})();