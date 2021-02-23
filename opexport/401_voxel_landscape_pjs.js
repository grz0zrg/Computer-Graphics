/**
  * This is like my custom volume raycaster sketch but tuned for 'infinite' voxel landscapes.
	*
	* It is the same technically except that rays go from far to near and are not stopped once they hit something (they walk on the heightmap), all cells are also drawn
	* Another difference is that it is infinite, rays are warped when they go outside map boundary
	*
	* This sketch is much faster also because texturing is almost free; from a secondary colormap.
	*
	* Perspective is done that way for fun, it look like the inside of a sphere with mapped terrain :)
	* Heightmap and Colormap come from Comanche game
	*
	* All of these rendering tricks are specialized version of voxel rendering.
	*/

static int display_width = 640;
static int display_height = 480;

static int board_width = 512;
static int board_height = board_width; // linked
static int board_size = board_width * board_height;

// typically the diagonal of the map so we stop any rays casted outside...
// but this can also be used for performances, this is the camera z clipping so with fog and this we can speed the rendering up :)
static int max_ray_step = board_width / 2;

static int wall_height = 1;

static int player_fov = 60;

static int minimap_width = 128;
static int minimap_height = minimap_width; // linked
static int minimap_width_m1 = minimap_width - 1;
static int minimap_fov_step = 88;
static float minimap_scale_x = (float)minimap_width / board_width;
static float minimap_scale_y = (float)minimap_height / board_height;

// increase for more performances
static int stepping_x = 4;

float boards[];
// we use this actually instead of "boards" to store the map data
// this allow to draw our map directly with Processing shapes since we are not restricted to perpendicular walls :)
PImage pg_map;

PVector raydir[];
PVector latest_rays[];

PImage textures;

PGraphics pg_minimap;

// an entity class which hold player data and other entities
class Entity {
  PVector position;
  float rotation;
  float fov;
	float dst_proj_plane;
	float vel_multiplier = 2;
  float height = 100;
 
  Entity(PVector position, float rotation, float fov) {
    this.position = position;
    this.rotation = rotation;
    this.fov = fov;
		this.dst_proj_plane = 160 / tan(radians(fov / 2));
  }
};

Entity player = new Entity(
    new PVector(board_width / 2,
                board_height / 2), 90, player_fov);

int pred = 0;

void setup() {
  size(display_width, display_height);
  frameRate(60);
  colorMode(RGB,255,255,255,100);
 
	// initialize the map from a heightmap
	pg_map = loadImage("heightmap.png");
	pg_map.loadPixels();
	
	// pre-calculate all ray directions for the player FOV
	raydir = new PVector[width * 360];
	
	for (int i = 0; i < (width * 360); i += 1) {
		int rotation_degree = int((float)i / width);

		float ri = i % width;
		float norm_i = ri / width;
		
		raydir[i] = new PVector(
									cos(radians(rotation_degree) - radians(player.fov / 2) + radians(player.fov) * norm_i),
		            	sin(radians(rotation_degree) - radians(player.fov / 2) + radians(player.fov) * norm_i));
	}
	
	// latest rays are stored here (used to display the player FOV in the minimap)
	latest_rays = new PVector[width];
	for (int i = 0; i < width; i += 1) {
		latest_rays[i] = new PVector(0, 0);
	}
	
	textures = loadImage("C2W.png");
	textures.loadPixels();
	
	pg_minimap = createGraphics(minimap_width, minimap_height);
	
	pred = red(pg_map.pixels[0]);
}

void draw() {
  background(0);
 
  noStroke();
 
  raycast();
	
	render_minimap();
 
  player.rotation = ((float)mouseX / width * 2 * 359) % 360;
	
	// comment this and uncomment keyPressCheck for regular keyboard playable movement
	move();
	
	//keyPressCheck();
	
	// we update the minimap only once when the heightmap is loaded (need that to avoid asynchronous issues)
	if (red(pg_map.pixels[0]) != pred) {
		updateMinimap();
		
		pred = red(pg_map.pixels[0]);
	}
}

// core algorithm
void raycast() {
  int i = 0, j = 0;
	
	int rot_i = int(player.rotation) * width;
	
	// scan the screen horizontally and raycast from the defined player FOV
  for (i = 0; i < width; i += stepping_x) {
    float norm_i = (float)i / width;
		
		// we use pre-computed ray directions (see below for the raw formula)
		PVector ray_direction = raydir[i + rot_i];
   
    float dx = ray_direction.x;
		//float dx = cos(radians(player.rotation) - radians(player.fov / 2) + radians(player.fov) * norm_i);
    float dy = ray_direction.y;
		//float dy = sin(radians(player.rotation) - radians(player.fov / 2) + radians(player.fov) * norm_i);
		
    float px = player.position.x + dx * max_ray_step;
    float py = player.position.y + dy * max_ray_step;
		
		latest_rays[i].x = floor(px);
		latest_rays[i].y = floor(py);
		
		int step = 0;
		
		// traverse the map & check for collisions
    while (step < max_ray_step) {
			int ix = (int)px;
			int iy = (int)py;
			
      //float result = boards[(int)px + (int)py * board_width];
			color result = pg_map.pixels[ix + iy * board_width];
			
			float heightmap_height = red(result);
     
			float dst_to_plane = (float)step / max_ray_step;
			
			float dst = dst_to_plane * (cos(-radians(player.fov / 2) + radians(player.fov) * norm_i));

			// now determine the slice height from heightmap brightness value and fake the perspective
			int wall_start_y = (height - height * ((float)heightmap_height / 255) * 2) * dst - (player.height - height) * dst_to_plane;

			// draw terrain slice with color from colormap (* 2 because the colormap size is 1024 and heightmap 512)
			color colormap = textures.pixels[ix * 2 + iy * 2 * textures.width];

			fill(red(colormap), green(colormap), blue(colormap));
			rect(i, wall_start_y, stepping_x, height - wall_start_y);

			// show complete raycast FOV on minimap (pixels perfect but slow and should be computed outside to fix order issues)
      //fill(0, 255, 0, 64);
      //rect(int(px * minimap_scale_x + width - minimap_width_m1), int(py * minimap_scale_y), 1, 1);
			
      px -= dx;
      py -= dy;
			
			if (px < 0) {
				px = board_width - abs(px);	
			}
			
			px = px % board_width;
			
			if (py < 0) {
				py = board_height - abs(py);	
			}
			
			py = py % board_height;
			
			step += 1;
    }
  }
}

// just move up
void move() {
	int rot_i = int(player.rotation) * width;

	PVector ray_direction = raydir[width / 2 + rot_i];

	PVector velocity = new PVector(ray_direction.x, ray_direction.y);
	velocity.mult(player.vel_multiplier);
	
	PVector newPosition = new PVector(player.position.x, player.position.y);
	newPosition.add(velocity);
	player.position = newPosition;	
	
	if (player.position.x < 0) {
		player.position.x = board_width - 1;
	}
	
	if (player.position.y < 0) {
		player.position.y = board_height - 1;
	}
	
	if (player.position.x > board_width) {
		player.position.x = 0;
	}

	if (player.position.y > board_height) {
		player.position.y = 0;
	}
}

// physics logic (unused but working!)
void keyPressCheck() {
  if (keyPressed) {
		int rot_i = int(player.rotation) * width;
		
		PVector ray_direction = raydir[width / 2 + rot_i];
		
		PVector velocity = new PVector(ray_direction.x, ray_direction.y);
		velocity.mult(player.vel_multiplier);
		
		int dir = 1;
		if (player.rotation > 90 || player.rotation < 180) {
			dir = -1;
		}
		
		PVector newPosition = new PVector(player.position.x, player.position.y);
		
    if (keyCode == UP) {
			newPosition.add(velocity);
		} else if (keyCode == DOWN) {
			newPosition.sub(velocity);
		}
		
		if (keyCode == LEFT) {
			newPosition.x -= cos(radians(player.rotation) - PI/2) * player.vel_multiplier * dir;
			newPosition.y -= sin(radians(player.rotation) - PI/2) * player.vel_multiplier * dir;
		} else if (keyCode == RIGHT) {
			newPosition.x += cos(radians(player.rotation) - PI/2) * player.vel_multiplier * dir;
			newPosition.y += sin(radians(player.rotation) - PI/2) * player.vel_multiplier * dir;
		}
		
		if (newPosition.x < board_width - 1 && newPosition.y < board_height - 1 &&
				newPosition.x > 0 && newPosition.y > 0) {
			player.position = newPosition;
		}
	}
}

void keyReleased() {
	if (keyCode == ENTER || keyCode == RETURN) {
		edit_mode += 1;
		edit_mode %= 2;
	}
}

// update minimap buffer (so we don't compute the minimap rendering it at every frames)
void updateMinimap() {
	pg_minimap.beginDraw();
	pg_minimap.noStroke();
  for (int i = 0; i < board_size; i += int(board_width / minimap_width)) {
    //float w = boards[i];
		float w = brightness(pg_map.pixels[i]);
   
		int x = i % board_width;
		int y = int((float)i / board_width);

		x = int((float)x * minimap_scale_x);
		y = int((float)y * minimap_scale_y);

		pg_minimap.fill(w);
		pg_minimap.rect(x, y, 1, 1);
  }
	pg_minimap.endDraw();
}

void render_minimap() {
	int minimap_offset_x = width - minimap_width_m1;

	image(pg_minimap, minimap_offset_x, 0);
	
	// player FOV on the minimap from all the latest rays casted (fast but not pixel perfect)
	stroke(255, 0, 0);
	for (int i = 0; i < width; i += minimap_fov_step) {
		PVector ray = latest_rays[i];
		line(player.position.x * minimap_scale_x + minimap_offset_x,
				 player.position.y * minimap_scale_y,
				 ray.x * minimap_scale_x + minimap_offset_x,
				 ray.y * minimap_scale_y);
	}
	noStroke();
	
	// player position
	fill(255, 255, 0);
	ellipse(player.position.x * minimap_scale_x + minimap_offset_x,
			 player.position.y * minimap_scale_y, 6, 6);
}