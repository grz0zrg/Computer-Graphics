/**
  * Custom raycaster done for fun on a phone (APDE Android app.) while commuting.
	* Improved afterward on desktop because APDE is buggy and crashed as the sketch complexity increased ! :)
	*
	* This is actually a 2D volume raycaster as map objects are as-is (not blocky) thus it allow curved walls and any wall shapes actually for free...
	* It is however a bit slower than a "blocky" raycaster, will take way more memory and the texturing is buggy on highly curved walls.
	* There is two methods implemented for raycast :
	*   - A naive not optimal one which walk the grid in the view direction through fixed step
	*   - An optimal one which walk the grid in the view direction through each cells
	*
	* Optimizations done :
	*   - walk the grid in the view direction through each cells
	*   - clamp slice start y / height by the display height (so we don't draw unnecessarily outside the display)
	*   - pre-compute rays direction through a lookup table (this however make camera rotation a bit less smooth)
	*
	* The walls are mirrored on the y axis so we get a cheap floor mirror :p
	*
	* One could extend this to cast rays in a more free ways (in all direction: 3D) and this would basically become a volume raycaster so voxels yeh! :)
	*
	* An overview of old-school raycasting methods (compared to this one) :
	* 	A blocky raycaster like Wolfenstein 3D isn't really far from this: 
	*     - the map informations would just need to have a defined size when rendering them, this would make the world blocky and fix issue with texturing as well!
	* 	A high-quality raycaster (a la Duke Nukem 3D / Build engine) isn't really far from this as well :
	*   	- The map informations (as a bitmap) would need to be dropped for a map informations only made of lines / curves, this would fix the texturing problem on highly curved walls
	*     - This would however come with some problems related to culling which were fixed using methods such as portal rendering back in the days
	*   A 'voxel' landscape can be done easily by adapting this (see my other sketch) :
	*     - Send rays from far to near
	*     - Rays are not stopped once they hit something (they walk on the heightmap)
	*     - All cells traversed by the ray are drawn (could say the ray always hit something)
	*   Raytracing :
	*     - Same as raycasting except you continue sending rays once they hit something (you bounce them off, compute shading from lights etc)
	*     - Drop bitmap representation (this is really the definition of Volumetric in all Voxel methods, the data is volumetric)
	*
	* This use Wolfenstein 3D textures.
	*/

static int display_width = 640;
static int display_height = 480;

static int board_width = 256;
static int board_height = board_width; // linked
static int board_size = board_width * board_height;

// typically the diagonal of the map so we stop any rays casted outside...
// but this can also be used for performances, this is the camera z clipping so with fog and this we can speed the rendering up :)
static int max_ray_step = board_width * 2;

static int wall_height = 32;

static int player_fov = 60;

static int minimap_width = 128;
static int minimap_height = minimap_width; // linked
static int minimap_width_m1 = minimap_width - 1;
static int minimap_fov_step = 88;
static float minimap_scale_x = (float)minimap_width / board_width;
static float minimap_scale_y = (float)minimap_height / board_height;

// increase for more performances
static int stepping_x = 8;
static int floor_stepping = 8;
static int ceil_stepping = 8;
static int texture_stepping = 2;

int edit_mode = 0;

float boards[];
// we use this actually instead of "boards" to store the map data
// this allow to draw our map directly with Processing shapes since we are not restricted to perpendicular walls :)
PGraphics pg_map;

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
  float height = 50;
 
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

void setup() {
  size(display_width, display_height);
  frameRate(60);
  colorMode(RGB,255,255,255,100);
 
	// initialize the map
	// since this is a volume raycaster we can do fun walls so we use curves, ellipse and more :)
	pg_map = createGraphics(board_width, board_height);
	pg_map.beginDraw();
	pg_map.noFill();
	pg_map.stroke(255);
	pg_map.rect(0, 0, board_width - 1, board_height - 1);
	pg_map.bezier(85, 20, 10, 10, 90, 90, 15, 80);
	pg_map.bezier(85 * 2, 20 * 2, 10 * 2, 10 * 2, 90 * 2, 90 * 2, 15 * 2, 80 * 2);
	pg_map.ellipse(board_width / 1.25, board_height / 1.25, 16, 16);
	pg_map.triangle(192, 200, 100, 210, 95, 240);
	pg_map.endDraw();
	pg_map.loadPixels();
	
/* // classical array
	boards = new float[board_size];

  for (int i = 0; i < board_width; i += 1) {
    boards[i] = 1;
    boards[i + board_width * (board_height - 1)] = 1;
  }
 
  for (int i = 0; i < board_height; i += 1) {
    boards[i * board_width] = 1;
    boards[(board_width - 1) + i * board_width] = 1;
  }
	
	for (int i = 0; i < 360; i += 1) {
		boards[(int)(board_width / 4 + 4 * cos(radians(i))) + (int)(board_height / 4 + 4 * sin(radians(i))) * board_width] = 1;
		boards[(int)(board_width / 4 + 4 * cos(radians(i))) + (int)(board_height - board_height / 4 + 4 * sin(radians(i))) * board_width] = 1;
		boards[(int)(board_width - board_width / 4 + 4 * cos(radians(i))) + (int)(board_height / 4 + 4 * sin(radians(i))) * board_width] = 1;
		boards[(int)(board_width - board_width / 4 + 4 * cos(radians(i))) + (int)(board_height - board_height / 4 + 4 * sin(radians(i))) * board_width] = 1;
	}
*/
	
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
	
	textures = loadImage("wolftextures.png");
	textures.loadPixels();
	
	pg_minimap = createGraphics(minimap_width, minimap_height);
	
	updateMinimap();
	
}

void draw() {
  background(0);
 
  noStroke();
 
  raycast();
	
	if (edit_mode) {
		
	} else {
  	render_minimap();
	}
 
  player.rotation = ((float)mouseX / width * 2 * 359) % 360;
	
	keyPressCheck();
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
		
    float px = player.position.x;
    float py = player.position.y;
		
		// "A Fast Voxel Traversal Algorithm for Ray Tracing" paper by John Amanatides and Andrew Woo
		// basically a rather obvious way to cross each cells at each steps!
		int mx = floor(px);
		int my = floor(py);
		
		float step_x = (ray_direction.x >= 0) ? 1 : -1; 
		float step_y = (ray_direction.y >= 0) ? 1 : -1; 
		
		float tmax_x = (float)((mx + step_x) - px) / dx;
		float tmax_y = (float)((my + step_y) - py) / dy;
		
		float delta_x = step_x / dx;
		float delta_y = step_y / dy;
		//
		
		int step = 0;
		
		// traverse the map & check for collisions
    while (step < max_ray_step) {
      //float result = boards[mx + my * board_width];
			float result = brightness(pg_map.pixels[mx + my * board_width]);
     
      if (result > 0) {					
				// compute distance with corrected perspective
				// if the perspective is not corrected this will produce fish-eye / distorded walls effect because rays on the edge of the screen need to travel 'further' than the middle rays one 
				float ddx = abs(player.position.x - mx);
				float ddy = abs(player.position.y - my);
				
        float dist = sqrt(ddx * ddx + ddy * ddy) * (cos(-radians(player.fov / 2) + radians(player.fov) * norm_i));
        float norm_dist = dist / max(board_width, board_height) / 1.25;
				float inorm_dist = max(1 - norm_dist, 0.01);
				
				// determine horizontal texture coordinate (note : not really correct!!)
				float tu = abs(mx - my);

				// determine wall height from the computed distance
				// dst_proj_plane is just a value related to the FOV, it relate to the player / projection plane distance
        float wh = wall_height / dist * player.dst_proj_plane;
				// now determine the vertical wall start position
        float wall_start_y = height / 2 - wh / 2 + player.height;
				
				// clamp to [0, display_height], we will use these so we don't overdraw outside the screen... (thus increasing performances)
				int clamped_start_y = max(0, wall_start_y);
				int clamped_wh = min(wh, height);
				
				// draw wall (untextured)
				/*
				fill(inorm_dist * 255, 0, 0, 255);
        rect(i, wall_start_y, stepping_x, wh);
				*/
				
				// simple ceiling
				/*int ceil_start = height / 2;
				for (j = ceil_start; j > -ceil_stepping; j -= ceil_stepping) {
					float inorm_j = (float)j / (height / 2);
					float norm_j = 1. - inorm_j;
					float ceil_brightness = 255 * (inorm_j);

					fill(0, 0, ceil_brightness, 64);
					rect(i, j, stepping_x, ceil_stepping);
				}*/
				
				// can change texture here (64, 128, 192 etc)
				int u = (int(tu) % (textures.width / 8) + 64);
				
	      // draw wall (textured)
				for (j = clamped_start_y; j < clamped_start_y + clamped_wh; j += texture_stepping) {
					float norm_j = (float)(j - wall_start_y) / wh;
					color c = textures.pixels[u + (int(norm_j * textures.height) % textures.height) * textures.width];
					fill(red(c) * inorm_dist, green(c) * inorm_dist, blue(c) * inorm_dist);
        	rect(i, j, stepping_x, texture_stepping);
					
					float cm = norm_dist * norm_j * 2;
					
					// mirrored :)
					fill(red(c) * cm, green(c) * cm, blue(c) * cm);
					rect(i, (wall_start_y + wh) * 2 - j, stepping_x, texture_stepping);
				}
				
				// draw ceiling
				/*int ceil_start = wall_start_y - ceil_stepping;
				for (j = ceil_start; j > -ceil_stepping; j -= ceil_stepping) {
					float inorm_j = (float)j / wall_start_y;
					float norm_j = 1. - inorm_j;
					float ceil_brightness = 255 * (inorm_j * inorm_dist * 2);

					fill(0, 0, ceil_brightness, 64);
					rect(i, j, stepping_x, ceil_stepping);
				}*/
				
				// draw floor
				int floor_start = wh + wall_start_y;
				for (j = floor_start; j < height; j += floor_stepping) {
					float norm_j = (float)(j - floor_start) / (height - floor_start);
					float inorm_j = 1. - norm_j;
					float floor_brightness = 255 * norm_j;
					
					fill(floor_brightness, 0, 0, 64);
					rect(i, j, stepping_x, floor_stepping);
				}
				
				// store ray for later use (minimap FOV)
				latest_rays[i].x = mx;
				latest_rays[i].y = my;
				
        break;
      }

			// show complete raycast FOV on minimap (pixels perfect but slow and should be computed outside to fix order issues)
      //fill(0, 255, 0, 64);
      //rect(int(px * minimap_scale_x + width - minimap_width_m1), int(py * minimap_scale_y), 1, 1);
			
			/*
			// naive way to raycast : go along the direction as a fixed step (but it may take many steps to cross a single cell)
			// if you want to use this you must replace mx/my by px/py in that loop
      px += dx;
      py += dy;
			*/
			
			// "A Fast Voxel Traversal Algorithm for Ray Tracing" paper by John Amanatides and Andrew Woo
			// basically a rather obvious way to cross each cells at each steps!
			if (tmax_x < tmax_y) {
				tmax_x += delta_x;
				mx += step_x;
				side = 0;
			} else {
				tmax_y += delta_y;
				my += step_y;
				side = 1;
			}
			//
			
			step += 1;
    }
  }
}

// physics logic
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
	pg_minimap.fill(255);
  for (int i = 0; i < board_size; i += int(board_width / minimap_width)) {
    //float w = boards[i];
		float w = brightness(pg_map.pixels[i]);
   
    if (w > 0.5) {
			int x = i % board_width;
			int y = int((float)i / board_width);

			x = int((float)x * minimap_scale_x);
			y = int((float)y * minimap_scale_y);
     
      pg_minimap.rect(x, y, 1, 1);
    }
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