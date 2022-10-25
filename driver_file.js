/*
      "Chase Me"
      Midterm Project
      ---------------
      Name: Samyam Lamichhane
      Date: October 9, 2022 Sun.
      
      
      --------------------------------------------------
      General Rule: Positive Directions = Down and Right 
                    Negative Directions = Up and Left
       
      
      ------------------------------
      // Optimum Gaming Experience
      > Change Time to 30 and 5
      > Num of char = 3
      > Big Boss Level = 3            [game.js file]
      
*/



// Game Variables
let canvas_h = 800;
let canvas_w = 1000;

let score = 0;                            // Score of the player
let gamePhase = "start";                  // Denotes the stage of the game - initially 'start'
let isGameOver = false;                   // Initially, it's false
let level = 1;                            // Level of the game

let timer_len_1 = 30;                     // Time allocated for level 1 - goes on decreasing
let timer_len = timer_len_1;              // Variable to keep track of countdown timer
let level_time_reduction = 5;             // Value by which time decreases after each level
let num_levels = (timer_len_1/ level_time_reduction);       // Num of levels depends on total time set above


// Image variables
let background_img;
let start_screen_img;
let gameOver_screen_img;
let game_completion_screen_img;

let my_char_image;
let img_supp_char_1;
let img_supp_char_2;
let img_supp_char_3;
let big_boss_char_4;


// Sound variables
let background_sound;
let collision_sound;
let gameOver_sound;
let newlevel_sound;
let victory_sound;

// Font variables
let assassin_font;
let corleone_font;


// Main Character variable
let my_char;                        // Object variable
let my_char_size = 50

// Direction for each character
let x_dir = 1;              // 1 means RIGHT  & -1 means LEFT
let y_dir = 1;              // 1 means DOWN   & -1 means UP

// Horizontal velocity set to 0. Positive means RIGHT, Negative velocity means LEFT
// Vertical velocity set to 0. Positive means DOWN, Negative velocity means UP
let vx = 0;                  
let vy = 0;



// Supplement character related list and variables
let num_supp_char = 3;                // Number of characters in level 1 - goes on increasing
let num_big_boss = 1;                 // Number of big-boss character

let supp_char_list = [];              // List to store all supplementary characters
let supp_char_size = 40;              // Image size of normal characters
let big_boss_size = 100;              // Image size of big-boss character
let big_boss_vel_limit = 12;          // Max velocity for big-boss character

let supp_char_mag = 0.1;              // Max gravitational pull for normal characters
let supp_vel_limit = 6;               // Max velocity for normal characters
let supp_vel_increment = 4;           // Value by which velocity increases after each level 




// Preload function - loads all the assets beforehand
function preload()
{
  
  // Font
  assassin_font = loadFont("fonts/assassin.ttf");
  corleone_font = loadFont("fonts/corleone.ttf");
  
  
  // Images
  background_img = loadImage("images/background_img.png");
  start_screen_img = loadImage("images/start_screen_mafia.jpg");
  gameOver_screen_img = loadImage("images/gameOver_img.jpg");
  game_completion_screen_img = loadImage("images/congrats_img.jpg");
  
  my_char_img = loadImage("images/my_char.png");
  img_supp_char_1 = loadImage("images/1_thanos.png");
  img_supp_char_2 = loadImage("images/2_villain.png");
  img_supp_char_3 = loadImage("images/3_villain.png");
  big_boss_char_4 = loadImage("images/4_big_boss.png");
  
  // Sound
  background_sound = loadSound("sounds/the_good_bad_and_the_ugly.mp3");
  collision_sound = loadSound("sounds/shotgun_firing.mp3");
  victory_sound = loadSound("sounds/victory_sound.mp3");
  gameOver_sound = loadSound("sounds/game_over.mp3");                      // Not used
  newlevel_sound = loadSound("sounds/new_level.mp3");                      // Not used
}






function setup() 
{ 
  
  // Background Sound Function
  add_soundtrack();
  
  imageMode(CORNER);
  createCanvas(canvas_w, canvas_h);
  
  
  // Creating user character
  my_char = new MyCharacter(canvas_w/2 - my_char_size, canvas_h/2 - my_char_size, my_char_size, my_char_img);
 

  // Supplementary characters - Adding them to corresponding list
  add_supp_char();
  
}



// Background Soundtrack function added separately 
// It is called again in the 'reset' function - thus a separate function is convenient
function add_soundtrack()
{
  background_sound.setVolume(0.1);
  background_sound.play();
  background_sound.loop();
  
}




// Function to add normal Supplementary characters to the list
function add_supp_char()
{
  // Iterate based on the global variable
  for (let i = 0; i < num_supp_char; i++)
  {
    // Variables that determine which image to load as supplementary character
    let img_selection;                                
    let rand_choice = int(random(0, 3));
    
    if (rand_choice == 0)                      // Select Thanos as image
      img_selection = img_supp_char_1;
    else if (rand_choice == 1)                 // Select Hela as image
      img_selection = img_supp_char_2;
    else if (rand_choice == 2)                 // Select Monolith as image
      img_selection = img_supp_char_3;
    
    
//     // Random positions for supplement characters inside the canvas
//     let random_x = random(0, (canvas_w - supp_char_size));
//     let random_y = random(0, (canvas_h - supp_char_size));
    
    // Random positions for supplement characters - but random_x is adjusted so that it doesnot 
    // overlap with the x-position of the primary character
    let random_x = random(0, (canvas_w/2 - my_char_size*2.5));
    let random_y = random(0, (canvas_h - supp_char_size));
    
    
    
    
    
    // Storing each character temporarily in a variable; then pushing it to the list
    // img_selection variable is randomized above
    let temp_supp_char = new SuppCharacter(random_x, random_y, supp_char_size, img_selection);
    append(supp_char_list, temp_supp_char);
  }
  
}



// Function to add big-boss Supplementary characters to the list
// Used after Level 3
function add_big_boss()
{
  // // Random positions for supplement characters inside the canvas
  // let random_x = random(0, (canvas_w - supp_char_size));
  // let random_y = random(0, (canvas_h - supp_char_size));
  
  
  // Random positions for supplement characters - but random_x is adjusted so that it doesnot 
  // overlap with the x-position of the primary character
  let random_x = random(0, (canvas_w/2 - my_char_size*2.5));
  let random_y = random(0, (canvas_h - supp_char_size));
  
  
  // Iterate based on global variable
  for (let i = 0; i < num_big_boss; i++)
  {
    // Temp variable
    let temp_big_boss = new SuppCharacter(random_x, random_y, big_boss_size, big_boss_char_4);
  
    // Set this.velocity.limit() value for this character before adding to the list 
    // This way, big-boss character has more velocity
    temp_big_boss.velocity.limit(big_boss_vel_limit);
    append(supp_char_list, temp_big_boss);
  }
 
}




function draw()
{
  
  // If game is not over, call different screen functions based on gamephase
  // Otherwise, call 'gameOver_screen()' function
  if (isGameOver == false)
  {  
    if (gamePhase === "start")
      start_screen();
    
    else if (gamePhase === "playing")
      game_screen();
    
    else if (gamePhase === "complete")
      game_complete_screen();

  }
  else
  {
    gamePhase = "gameover";
    background_sound.stop();                // Stop the background track once game is over
    gameOver_screen();
  }
  
}

