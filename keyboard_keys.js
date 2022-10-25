



function keyPressed() 
{
  // If RIGHT_ARROW is pressed, the character needs to move right, so set horizontal velocity to 10
  if (keyCode === RIGHT_ARROW)                   
  {
    vx = 10;
  }
  
  // If LEFT_ARROW is pressed, the character needs to move left, so set horizontal velocity to -10
  if (keyCode === LEFT_ARROW) 
  {
    vx = -10;
  }
  
  // If DOWN_ARROW is pressed, the character needs to move DOWN, so set horizontal velocity to 10
  if (keyCode === DOWN_ARROW) 
  {
    vy = 10;
  }
  
  // If UP_ARROW is pressed, the character needs to move UP, so set horizontal velocity to -10
  if (keyCode === UP_ARROW) 
  {
    vy = -10;
  }
  
}



// Function that helps to move character one step at a time
function keyReleased() 
{
  
  // After RIGHT or LEFT arrow is released, set horizontal velocity to 0
  if (keyCode === RIGHT_ARROW || keyCode === LEFT_ARROW) 
  {
    vx = 0;
  }
  
  // After DOWN or UP arrow is released, set vertical velocity to 0
  if (keyCode === DOWN_ARROW || keyCode === UP_ARROW) 
  {
    vy = 0;
  }
  
}

