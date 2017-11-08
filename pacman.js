// Setup initial game stats
var score        = 0;
var lives        = 2;
var powerPellets = 4;
var dots         = 240;
var ghostsEaten  = 0;

// Define your ghosts here
var inky = {
  menuOption: '1',
  name: "Inky",
  color: "Red",
  character: "Shadow",
  edible: false
};

var blinky = {
  menuOption: '2',
  name: "Blinky",
  color: "Cyan",
  character: "Speedy",
  edible: false
};

var pinky = {
  menuOption: '3',
  name: "Pinky",
  color: "Pink",
  character: "Bashful",
  edible: false
};

var clyde = {
  menuOption: '4',
  name: "Clyde",
  color: "Orange",
  character: "Pokey",
  edible: false
};

var ghosts = [inky, blinky, pinky, clyde];

function checkLives(){
  if (lives === 0){
    process.exit();
    console.log("Game over!");
  }
}
function checkPellets(){
  if (powerPellets > 0){
    console.log('(p) Eat Power-Pellet');
  }
}

function checkDots(){
  if (dots > 100){
    console.log('(t) Eat 10 Dots');
    console.log('(h) Eat 100 Dots');
  } else if (dots > 10 && dots < 100){
    console.log('(t) Eat 10 Dots')
  }
}
function displayEdible(ghost){
  if (ghost.edible === false){
    return "inedible";
  } else{
    return "edible";
  }
}
function eatGhost(ghost){

  if (ghost.edible === false){
    lives -= 1;
    checkLives(lives);
    console.log('\nPac-Man was killed by the ' + ghost.color + '-coloured ' + ghost.name + '!');
  } else {
    if (ghostsEaten === 0) {
      score += 200;
      ghostsEaten += 1;
      ghost.edible = false;
      console.log('\nPac-Man totally destroyed the ' + ghost.color + '-coloured ' + ghost.name + '!');
    } else if (ghostsEaten === 1){
        score += 400;
        ghostsEaten += 1;
        ghost.edible = false;
        console.log('\nPac-Man totally destroyed the ' + ghost.color + '-coloured ' + ghost.name + '!');
    } else if (ghostsEaten === 2){
        score += 800;
        ghostsEaten += 1;
        ghost.edible = false;
        console.log('\nPac-Man totally destroyed the ' + ghost.color + '-coloured ' + ghost.name + '!');
    } else if (ghostsEaten === 3){
        score += 1600;
        ghostsEaten += 1;
        ghost.edible += false;
        console.log('\nPac-Man totally destroyed the ' + ghost.color + '-coloured ' + ghost.name + '!');
    } else {
      score += 2000;
      ghostsEaten += 1;
      ghost.edible += false;
      console.log('\nPac-Man totally destroyed the ' + ghost.color + '-coloured ' + ghost.name + '!')
    }
  }
}

function eatPowerPellet(){
  score += 50;
  powerPellets -= 1;
  ghosts.forEach(function(ghost){
    ghost.edible = true;
   });
}

// Draw the screen functionality
function drawScreen() {
  clearScreen();
  setTimeout(function() {
    displayStats();
    displayPellets();
    displayDots();
    displayMenu();
    displayPrompt();
  }, 10);
}

function clearScreen() {
  console.log('\x1Bc');
}

function displayStats() {
  console.log('Score: ' + score + '     Lives: ' + lives);
}

function displayPellets(){
  console.log('\n\nPower-Pellets: ' + powerPellets);
}

function displayDots(){
  console.log('\n\nDots Remaining: ' + dots);
}

function displayMenu() {
  console.log('\n\nSelect Option:\n');  // each \n creates a new line
  console.log('(d) Eat 1 Dot');
  checkDots();
  console.log('(a) Eat All the Dots');
  checkPellets();
  ghosts.forEach(function(ghost){
     console.log("(" + ghost.menuOption + ") Eat " + ghost.name + " (" + displayEdible(ghost) + ")");
   });
   console.log('(q) Quit');
}

function displayPrompt() {
  // process.stdout.write is similar to console.log except it doesn't add a new line after the text
  process.stdout.write('\nWaka Waka :v '); // :v is the Pac-Man emoji.
}


// Menu Options
function eatDot() {
  console.log('\nChomp!');
  dots -= 1;
  score += 10;
}

function eatTenDots(){
  console.log('\nChomp ten times!');
  dots -= 10;
  score += 50;
}

function eatHundredDots(){
  console.log('\nChomp a hundred times!');
  dots -= 100;
  score += 100;
}

function eatAllDots(){
  console.log('\nCHOMPING ALL DA DOTS!!!');
  dots = 0;
  score += 150;
}

// Process Player's Input
function processInput(key) {
  switch(key) {
    case '\u0003': // This makes it so CTRL-C will quit the program
    case 'q':
      process.exit();
      break;
    case '1':
      eatGhost(ghosts[0]);
      break;
    case '2':
      eatGhost(ghosts[1]);
      break;
    case '3':
      eatGhost(ghosts[2]);
      break;
    case '4':
      eatGhost(ghosts[3]);
      break;
    case 'd':
      eatDot();
      break;
    case 't':
      if (dots < 10){
        console.log('\nNot enough dots to chomp :(');
      } else {
        eatTenDots();
      }
      break;
    case 'h':
      if (dots < 100){
        console.log('\nNot enough dots to chomp :(');
      } else {
      eatHundredDots();
    }
      break;
    case 'a':
      eatAllDots();
      break;
    case 'p':
      if (powerPellets > 0){
        eatPowerPellet();
      } else{
        console.log('\nNo Power-Pellets left!');
        }
      break;
    default:
      console.log('\nInvalid Command!');
  }
}


//
// YOU PROBABLY DON'T WANT TO CHANGE CODE BELOW THIS LINE
//

// Setup Input and Output to work nicely in our Terminal
var stdin = process.stdin;
stdin.setRawMode(true);
stdin.resume();
stdin.setEncoding('utf8');

// Draw screen when game first starts
drawScreen();

// Process input and draw screen each time player enters a key
stdin.on('data', function(key) {
  process.stdout.write(key);
  processInput(key);
  setTimeout(drawScreen, 1000); // The command prompt will flash a message for 300 milliseoncds before it re-draws the screen. You can adjust the 300 number to increase this.
});

// Player Quits
process.on('exit', function() {
  console.log('\n\nGame Over!\n');
});
