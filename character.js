

// Super class for all the characters in the game
class Character
{
  constructor(x, y, size, img_name)
  {
    this.location = createVector(x, y);                    // Location vector - has x and y components
    this.size = size;
    this.img = img_name
  }
  
}





// Primary character class -- inherited from Character Class
class MyCharacter extends Character
{
  // Constructor inherited from super class
  // 3 additional attributes
  constructor(x, y, size, img_name)
  {
    super(x, y, size, img_name);
    
    this.char_w = this.size;
    this.char_h = (this.size + 20);
    this.collision = false;
  }

  
  // Call update before displaying the image
  display()
  {
    this.update();
    image(this.img, this.location.x, this.location.y, this.char_w, this.char_h);
  }

  
  
  // Check collision with borders of the canvas
  border_check()
  {
    // Right and Left border check
    if (this.location.x <= 0)
      this.location.x = 0;
    else if (this.location.x >= (canvas_w - this.char_w))
      this.location.x = canvas_w - this.char_w;
    
    // Top and bottom border check
    if (this.location.y <= 0)
      this.location.y = 0;
    else if (this.location.y >= (canvas_h - this.char_h))
      this.location.y = canvas_h - this.char_h;
    
  }
  
  
  // Collision Check Function
  up_collision_check(other)
  {
    // X coordinates verification
    if ( (this.location.x < (other.location.x + other.size)) && (this.location.x > other.location.x)) 
    {
      // Y coordinates verification
      if ((this.location.y < (other.location.y + other.size)) && ((this.location.y + this.char_h) > other.location.y))
      {
        print("Collision");
        collision_sound.play();                    // Collision sound is played here
        collision_sound.setVolume(0.2);
        isGameOver = true;                         // Game is over 
        return true;
      }      
    } 
  }
  
  
  // Collision check is called inside the movement after iterating through each objects in the supp_char_list
  movement()
  {
    for (let each_char of supp_char_list)
    {
      if (this.up_collision_check(each_char))
        self.collision = true;
    }
  }
  
  
  // Update x and y coordinates and check collision with the border
  update()
  {
    this.location.x += vx;
    this.location.y += vy;
    this.border_check();
    this.movement();
    
  }
  
}





// Side characters class -- inherited from Character Class
class SuppCharacter extends Character
{
  // Constructor inherited from super class
  // Additional 5 attributes
  constructor(x, y, size, img_name)
  {
    super(x, y, size, img_name);
    
    this.choices = [-1, 1];                      // List which determines the positive or negative direction
  
    // Random horizontal and vertical velocities of characters - could be positive or negative
    this.supp_vx = random(this.choices) * (random(0, 10));
    this.supp_vy = random(this.choices) * (random(0, 10));
    
  
    // Velocity and Acceleration vector attributes created separately
    this.velocity = createVector(0, 0);
    this.acc = createVector(0, 0);
    
  }
  
  
  // Call update before displaying the image
  display()
  {
    this.update();
    image(this.img, this.location.x, this.location.y, this.size, this.size); 
  }
  
  
  // Update x and y coordinates and check collision with the border
  // Function that makes supplementary characters follow the main character
  update()
  {
    
    // Create location vector for main character (dynamic in nature)
    let main_vec = createVector(my_char.location.x, my_char.location.y);
    main_vec.sub(this.location);                  // Subtract location of this.location from main_vec
    main_vec.setMag(supp_char_mag);               // Set the magnitude of the vector - used as 'Pull'
    this.acc = main_vec;                          // Set acceleration to main_vec
  
    this.location.add(this.velocity);    // Update location -- add velocity components to location components
    this.velocity.add(this.acc);                         // Similary for velocity
    this.velocity.limit(supp_vel_limit);                // Set max velocity limit
    
    
    
    // this.location.x += this.supp_vx;
    // this.location.y += this.supp_vy;
    this.border_check();
  }
  
  
  
  // Check collision with borders of the canvas - reverse the direction when it collides
  border_check()
  {
    // Left and Right borders
    if (this.location.x <= 0 || this.location.x >= (canvas_w - this.size))
      this.velocity.x = -this.velocity.x;
    
    // Top and bottom borders
    if (this.location.y <= 0 || this.location.y >= (canvas_h - this.size))
      this.velocity.y = -this.velocity.y;
    
    
    
//     if (this.location.x <= 0 || this.location.x >= (canvas_w - this.size))
//       this.supp_vx = -this.supp_vx;
    
//     if (this.location.y <= 0 || this.location.y >= (canvas_h - this.size))
//       this.supp_vy = -this.supp_vy;
    
  }
}
