/**
  * A tentative to do a 3D renderer using REYES like algorithms (a type of rendering invented / developed by Lucasfilm / Pixar in the mid-80s and still used to late 2000s)
	* Actually REYES is more like a collection of classical computer graphics algorithms packed into a single solution with a well defined pipeline process.
	*
	* Actually it is more like a standard rasterizer than REYES... :)
	*
	* REYES algorithm is simple and powerful, it is between rasterization and state of art algorithms like raytracing / pathtracing
	* in term of power and it have some speed advantages over that last one but it is most importantly very flexible and parallelization friendly.
	* 
	* So how does it work ? It is pretty similar to a standard rasterizer and work mainly with polygons but... with a process of massive surfaces subdivision (preferably adaptive)
	* which produce "micropolygons", polygons that are the size of a pixel or so and which allow easy / fast shading computations, there is also some important optimization steps.
	*
	* "All objects are reduced to common world-space geometric entities called micropolygons, and all of the shading and visibility calculations operate on these micropolygons.
	*  Each type of calculation is performed in a coordinate system that is natural for that type of calculation.
	*  Micropolygons are created and textured in the local coordinate system of the object, with the result that texture filtering is simplified and improved.
	*  Visibility is calculated in screen space using stochastic point sampling with a z buffer.
	*  There are no clipping or perspective calculations. Geometric and texture locality are exploited to minimize paging and to support models that contain arbitrarily many primitives."
  *
	* Surfaces may be defined through NURBS for example but i chose a parametric object for this demonstration.
	*
	* https://en.wikipedia.org/wiki/Reyes_rendering
	* 
	* How it was made :
	*  - first we want to define a geometric object (a cube) programmatically, i chose to do it as a parametric surface by simply stepping
	*    in normalized space through points for X,Y,Z then converting to screen space and centering the object. Doing it by stepping on the surface
	*    allow us to control as wanted the stepping factor (which will be our subdivision factor for our polygons)
	*  - since we also stepped through Z we are already rendering a kind of volumetric cube data (which is cool because you could even do volumetric effects later on !)
	*  - since we are only interested by the cube surface, we filter the volumetric data and retain the points on the surface
	*  - we do projection + rotation of our object at the same time with simple matrix / vector operation
	*  - once we have the object points rendered we can do a simple shading that will give us some depth by computing
  *    the length then normalizing the point position vector and assigning the Z value scaled by the max. RGB value to the point color
	*  - at this point we have several ways to render our object :
	*   - by simply rendering the dots
	*   - by detecting the surfaces of the cube we are on (by looking to points position), computing next value for X/Y or X/Z or Y/Z
	*     using those values to draw lines to form two triangles (a quad), this is wireframe mode, we can also compute points value in different order for different wireframe mode
	*   - same step as above but then fill the triangles with barycentric algorithm (find bounding box of triangle, step through X/Y and check wether we are in or out)
	*     we will have flat shading at low resolution but... it also pave the road to the easy application of more complex shading algorithms or texturing!! an important step is also to
	*     check shaded point distance against a Z buffer to remove hidden surfaces
	*
	* Note : When filling polygon we give a step of more than 1 and increase the size of the "rect" primitive, this allow fast rendering at the price of huge quality lost
	*        but if you are doing it non-realtime you would increase subdivision to the point of each triangles being 1px, the flat shading would suddenly be smooth shading! :)
	*
	* How can this be improved ?
	*  - add texturing
	*  - fill quads instead of triangles
	*  - add more parametric surfaces and especially more generic surfaces
	*  - add shading algorithms (phong etc.)
	*  - play with volumetric data :)
	*  - adaptative subdivision ?
	*  - parallelization
	*  - cleanup of the sides checking
	*  - non-realtime render to obtain high quality images (when subdivision is low)
	*/

int frame = 0;

static float cs = 580; // also scale :P
static float inc = 0.5; // control surface subdivision, lower = higher quality (but too slow for realtime)
static float csi = 1.0 / inc; // how much points our surface will have along a specific axis
static float scale = 1.0 / 8.0; // cube scale

PGraphics depthbuffer;

void setup() {
  size(1024, 768);

  background(0);
	
	noStroke();
	
	depthbuffer = createGraphics(width, height);
	depthbuffer.noStroke();
}

void fillTriangle(float x1, float y1,
									float x2, float y2,
									float x3, float y3, int shading) {
	int maxX = max(x1, max(x2, x3));
	int minX = min(x1, min(x2, x3));
	int maxY = max(y1, max(y2, y3));
	int minY = min(y1, min(y2, y3));
	
	float vs1x = x2 - x1;
	float vs1y = y2 - y1;
	float vs2x = x3 - x1;
	float vs2y = y3 - y1;

	for (float x = minX; x <= maxX; x += 4) {
  	for (float y = minY; y <= maxY; y += 4) {
			float qx = x - x1;
			float qy = y - y1;
			
			float s = (qx * vs2y - vs2x * qy) / (vs1x * vs2y - vs2x * vs1y);
			float t = (vs1x * qy - qx * vs1y) / (vs1x * vs2y - vs2x * vs1y);

			if ( (s >= 0) && (t >= 0) && (s + t <= 1)) {
				// check against Z buffer!
				if (shading >= brightness(depthbuffer.get(x, y))) {
					// depth value go into depth buffer
					depthbuffer.beginDraw();
					depthbuffer.fill(shading, shading, shading);
					depthbuffer.rect(x, y, 4, 4);
					depthbuffer.endDraw();
					
					rect(x, y, 4, 4);
				}
			}
		}
	}
}

void draw() {
	// clear z-buffer
	depthbuffer.beginDraw();
	depthbuffer.background(0);
	depthbuffer.endDraw();
	
  background(0);
	//fill(0, 0, 0, 48);
	//rect(0, 0, width, height);
	
	float rxa = 0.03 * frame;
	float rya = 0.04 * frame;

	// rotation values
	float crx = cos(rxa);
	float cry = cos(rya);
	float srx = sin(rxa);
	float sry = sin(rya);
	
	// rm = rotation matrix
	float[] rm = {0,0,0,0,0,0,0,0,0};

	rm[0] = cry;     /*rm[1] = 0.0f;*/ rm[2] = -sry;
	rm[3] = sry * srx; rm[4] = crx;    rm[5] = cry * srx;
	rm[6] = sry * crx; rm[7] = -srx;   rm[8] = cry * crx;
	
	int x2 = width / 2;
	int y2 = height / 2;
	
	// step cube volume along X,Y,Z in normalized space
	float x, y, z;
	for (z = 0.0; z <= 1.0; z += inc) {
		float[] vr = {0,0,0};

		float pz = 2.0 * z - 1.0; // normalize screen space

		vr[2] = pz * scale;
		for (y = 0.0; y <= 1.0; y += inc) {
			float py = 2.0 * y - 1.0;

			vr[1] = py * scale;
			for (x = 0.0; x <= 1.0; x += inc) {
				// filter volumetric data (eg. we only want the points on the surface)
				if (x > 0.0 && x < (1.0 - inc) && y > 0.0 && y < (1.0 - inc) && z > 0.0 && z < (1.0 - inc)) continue;
				
				float px = (2.0 * x - 1.0);
				
				vr[0] = px * scale;

				// rotate/transform our points
				float[] vrr = {
						rm[0] * vr[0] + rm[3] * vr[1] + rm[6] * vr[2],
						rm[1] * vr[0] + rm[4] * vr[1] + rm[7] * vr[2],
						rm[2] * vr[0] + rm[5] * vr[1] + rm[8] * vr[2]
				};
			
				// compute length & normalize
				float le = sqrt((vrr[0] * vrr[0]) + (vrr[1] * vrr[1]) + (vrr[2] * vrr[2]));
			  float[] vrn = { vrr[0] / le, vrr[1] / le, vrr[2] / le };

				// point shade based on normalized Z value
			  int shading = vrn[2] * 255;
				//fill(shading, shading, shading);

				// since we were in normalized space we scale it to screen space and translate it at the center of the screen
				float posx = x2 - (int)(vrr[0] * cs);
				float posy = y2 - (int)(vrr[1] * cs);
		
				// draw cube surface
				float px2 = (2.0 * (x + inc) - 1.0);
				float pxs = px2 * scale;
				float py2 = (2.0 * (y + inc) - 1.0);
				float pys = py2 * scale;
				float pz2 = (2.0 * (z + inc) - 1.0);
				float pzs = pz2 * scale;
		
				float posx2; float posy2;
				float posx3; float posy3;
				float posx4; float posy4;
				
				// cube side detection & polygons drawing
				// note : could be optimized into much shorted code...
				if (y >= 0.0 && y <= (1.0 - inc) &&
						z >= 0.0 && z <= (1.0 - inc) &&
					  (x >= 0.99 || x <= 0.0)) {
					float[] vrr2 = {
							rm[0] * vr[0] + rm[3] * vr[1] + rm[6] * pzs,
							rm[1] * vr[0] + rm[4] * vr[1] + rm[7] * pzs,
							rm[2] * vr[0] + rm[5] * vr[1] + rm[8] * pzs
					};
		
					float[] vrr3 = {
							rm[0] * vr[0] + rm[3] * pys + rm[6] * pzs,
							rm[1] * vr[0] + rm[4] * pys + rm[7] * pzs,
							rm[2] * vr[0] + rm[5] * pys + rm[8] * pzs
					};
	
					float[] vrr4 = {
							rm[0] * vr[0] + rm[3] * pys + rm[6] * vr[2],
							rm[1] * vr[0] + rm[4] * pys + rm[7] * vr[2],
							rm[2] * vr[0] + rm[5] * pys + rm[8] * vr[2]
					};
		
					posx2 = x2 - (int)(vrr2[0] * cs);
					posy2 = y2 - (int)(vrr2[1] * cs);
					posx3 = x2 - (int)(vrr3[0] * cs);
					posy3 = y2 - (int)(vrr3[1] * cs);
					posx4 = x2 - (int)(vrr4[0] * cs);
					posy4 = y2 - (int)(vrr4[1] * cs);
/*
					// wireframe
					stroke(shading, shading, shading);
					line(posx, posy, posx2, posy2);
					line(posx2, posy2, posx3, posy3);
					line(posx3, posy3, posx, posy);

					stroke(shading, 0, 0);
					line(posx, posy, posx4, posy4);
					line(posx4, posy4, posx3, posy3);
					line(posx3, posy3, posx, posy);
*/
					noStroke();
					fill(shading, shading, shading);
					fillTriangle(posx, posy, posx2, posy2, posx3, posy3, shading);
					fillTriangle(posx, posy, posx4, posy4, posx3, posy3, shading);
					noFill();
				}
				
				if (x >= 0.0 && x <= (1.0 - inc) &&
									 y >= 0.0 && y <= (1.0 - inc) &&
									 (z >= 0.99 || z <= 0.0)) {
					float[] vrr2 = {
							rm[0] * pxs + rm[3] * vr[1] + rm[6] * vr[2],
							rm[1] * pxs + rm[4] * vr[1] + rm[7] * vr[2],
							rm[2] * pxs + rm[5] * vr[1] + rm[8] * vr[2]
					};
		
					float[] vrr3 = {
							rm[0] * pxs + rm[3] * pys + rm[6] * vr[2],
							rm[1] * pxs + rm[4] * pys + rm[7] * vr[2],
							rm[2] * pxs + rm[5] * pys + rm[8] * vr[2]
					};
	
					float[] vrr4 = {
							rm[0] * vr[0] + rm[3] * pys + rm[6] * vr[2],
							rm[1] * vr[0] + rm[4] * pys + rm[7] * vr[2],
							rm[2] * vr[0] + rm[5] * pys + rm[8] * vr[2]
					};
		
					posx2 = x2 - (int)(vrr2[0] * cs);
					posy2 = y2 - (int)(vrr2[1] * cs);
					posx3 = x2 - (int)(vrr3[0] * cs);
					posy3 = y2 - (int)(vrr3[1] * cs);
					posx4 = x2 - (int)(vrr4[0] * cs);
					posy4 = y2 - (int)(vrr4[1] * cs);
/*
					// wireframe
					stroke(shading, shading, shading);
					line(posx, posy, posx2, posy2);
					line(posx2, posy2, posx3, posy3);
					line(posx3, posy3, posx, posy);

					stroke(shading, 0, 0);
					line(posx, posy, posx4, posy4);
					line(posx4, posy4, posx3, posy3);
					line(posx3, posy3, posx, posy);
*/
					noStroke();
					fill(shading, shading, shading);
					fillTriangle(posx, posy, posx2, posy2, posx3, posy3, shading);
					fillTriangle(posx, posy, posx4, posy4, posx3, posy3, shading);
					noFill();
				}
				
				if (x >= 0.0 && x <= (1.0 - inc) &&
									 z >= 0.0 && z <= (1.0 - inc) &&
									 (y >= 0.99 || y <= 0.0)) {
					float[] vrr2 = {
							rm[0] * pxs + rm[3] * vr[1] + rm[6] * vr[2],
							rm[1] * pxs + rm[4] * vr[1] + rm[7] * vr[2],
							rm[2] * pxs + rm[5] * vr[1] + rm[8] * vr[2]
					};
		
					float[] vrr3 = {
							rm[0] * pxs + rm[3] * vr[1] + rm[6] * pzs,
							rm[1] * pxs + rm[4] * vr[1] + rm[7] * pzs,
							rm[2] * pxs + rm[5] * vr[1] + rm[8] * pzs
					};
	
					float[] vrr4 = {
							rm[0] * vr[0] + rm[3] * vr[1] + rm[6] * pzs,
							rm[1] * vr[0] + rm[4] * vr[1] + rm[7] * pzs,
							rm[2] * vr[0] + rm[5] * vr[1] + rm[8] * pzs
					};
		
					posx2 = x2 - (int)(vrr2[0] * cs);
					posy2 = y2 - (int)(vrr2[1] * cs);
					posx3 = x2 - (int)(vrr3[0] * cs);
					posy3 = y2 - (int)(vrr3[1] * cs);
					posx4 = x2 - (int)(vrr4[0] * cs);
					posy4 = y2 - (int)(vrr4[1] * cs);
/*
					// wireframe
					stroke(shading, shading, shading);
					line(posx, posy, posx2, posy2);
					line(posx2, posy2, posx3, posy3);
					line(posx3, posy3, posx, posy);

					stroke(shading, 0, 0);
					line(posx, posy, posx4, posy4);
					line(posx4, posy4, posx3, posy3);
					line(posx3, posy3, posx, posy);
*/
					noStroke();
					fill(shading, shading, shading);
					fillTriangle(posx, posy, posx2, posy2, posx3, posy3, shading);
					fillTriangle(posx, posy, posx4, posy4, posx3, posy3, shading);
					noFill();
				}
				
				// no z-buffer, optimized filling
				//quad(posx, posy, posx2, posy2, posx3, posy3, posx4, posy4);

				// points only
				//fill(255, 0, 0);
				//ellipse(posx, posy, 2, 2);
			}
		}
	}
	
	// display z buffer
	//image(depthbuffer, 0, 0);

	frame += 1;
}