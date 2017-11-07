// Setup initial game stats
var score        = 0;
var lives        = 2;
var powerPellets = 4;

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
  } else {

  }
};
function eatGhost(ghost){
  if (ghost.edible === false){
    lives -= 1;
    checkLives(lives);
    console.log('\nPac-Man was killed by the ' + ghost.color + '-coloured ' + ghost.name + '!');
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

function displayMenu() {
  console.log('\n\nSelect Option:\n');  // each \n creates a new line
  console.log('(d) Eat Dot');
  checkPellets();
  ghosts.forEach(function(ghost){
     console.log("(" + ghost.menuOption + ") Eat " + ghost.name );
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
  score += 10;
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
