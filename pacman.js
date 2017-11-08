// Setup initial game stats
var score        = 0;
var lives        = 2;
var powerPellets = 4;
var dots         = 240;
var ghostsEaten  = 0;
var level        = 1;

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

var fruitList = ['Cherry', 'Strawberry', 'Orange', "Apple", 'Pineapple', 'Galaxian Spaceship', 'Bell', 'Key']

function checkLevels(array){
  var fruitLevels = {};
  for (var i = 1; i < 20; i++)
    if (i === 1){
      fruitLevels[i] = array[0];
    } else if (i === 2){
      fruitLevels[i] = array[1]
    } else if (i === 3 || i === 4){
      fruitLevels[i] = array[2];
    } else if (i === 5 || i === 6){
      fruitLevels[i] = array[3];
    } else if (i === 7 || i === 8){
      fruitLevels[i] = array[4];
    } else if (i === 9 || i === 10){
      fruitLevels[i] = array[5];
    } else if (i === 11 || i === 12){
      fruitLevels[i] = array[6];
    } else if (i > 12){
      fruitLevels[i] = array[7];
    }
  return fruitLevels[level]
}

function levelUp(){
  if (powerPellets === 0 && dots === 0){
    level += 1;
    powerPellets = 4;
    dots = 240;
  }
}

var random = 0;

function selectRandom(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  random = Math.floor(Math.random() * (max - min)) + min;
  return random
}

function showMenu() {
  if (random === 1){
    console.log('(f) Eat ' + checkLevels(fruitList));
  }
}
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
        ghost.edible = false;
        console.log('\nPac-Man totally destroyed the ' + ghost.color + '-coloured ' + ghost.name + '!');
    } else {
      score += 2000;
      ghostsEaten += 1;
      ghost.edible = false;
      console.log('\nPac-Man totally destroyed the ' + ghost.color + '-coloured ' + ghost.name + '!')
    }
    levelUp();
  }
}

function eatPowerPellet(){
  score += 50;
  powerPellets -= 1;
  ghosts.forEach(function(ghost){
    ghost.edible = true;
   });
   levelUp();
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
  console.log('Score: ' + score + '     Lives: ' + lives + '     Level: ' + level);
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
  showMenu();
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

function fruitPoints(){
  if (level === 1){
    score += 100;
  } else if (level === 2){
    score += 300;
  } else if (level === 3 || level === 4){
    score += 500;
  } else if (level === 5 || level === 6){
    score += 700;
  } else if (level === 7 || level === 8){
    score += 1000;
  } else if (level === 9 || level === 10){
    score += 2000;
  } else if (level === 11 || level === 12){
    score += 3000;
  } else{
    score += 5000;
  }
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
    case 'f':
      fruitPoints();
      console.log('\nYou just ate a bonus fruit!');
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
  selectRandom(1, 5);
  setTimeout(drawScreen, 1000); // The command prompt will flash a message for 300 milliseoncds before it re-draws the screen. You can adjust the 300 number to increase this.
});

// Player Quits
process.on('exit', function() {
  console.log('\n\nGame Over!\n');
});
