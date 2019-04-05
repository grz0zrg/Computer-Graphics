/* @pjs preload="sample.jpg"; */

final int populationN = 10;

PImage cImage = null;
PImage sample = null;
PImage individual = null;

String imagePixelsCount;

int[] offspringBody = null;

// keep track of the actual generation
int generation = 0;
int reachedTargetAt = -1;

boolean greyscaleOn = true;
int x = 0, y = 0;
final int windowScaleWidth = 3; // images displayed per rows in the window
final int windowScaleHeight = 2; // per cols

class MyIndividual implements Comparable {
  public int[] pixs = null;
  public int fitness = 0;
  public int matchs = 0;
  public float probability = 0.0;

  MyIndividual(int[] p, int f) {
    pixs = new int[p.length];
    arrayCopy(p, pixs);
    fitness = f;
  }

  // only java
  int compareTo(Object o)
  {
    MyIndividual other = (MyIndividual)o;
    if (other.fitness > fitness) { 
      return -1;
    }
    if (other.fitness == fitness) {
      return 0;
    }
    
    return 1;
  }
}

// compare function to sort MyIndividual
var compare = function(o1,o2){
  if(o2.fitness > o1.fitness) {
    return -1;
  } 
  if(o1.fitness == o2.fitness) {
    return 0;
  }
  return 1;
};

MyIndividual[] population = null;
MyIndividual[] newPopulation = null;

void iterateGeneration()
{
  // selection&reproduction
  int offspring = 0;

  while (offspring != populationN) {
    int parentOne, parentTwo = 0;
    while (true) {
      float rollOne = 1.0-random(0.0, 1.0);
      parentOne = (int)random(populationN);
      if (population[parentOne].probability >= rollOne) {
        float rollTwo = 1.0-random(0.0, 1.0);
        parentTwo = (int)random(populationN);
        if (population[parentTwo].probability >= rollTwo) {
          break;
        }
      }
    }

    int crossover = (int)random(sample.pixels.length);
 
    // offspring
    arrayCopy(population[parentOne].pixs, offspringBody, crossover);
    arrayCopy(population[parentTwo].pixs, crossover, offspringBody, crossover, sample.pixels.length-crossover);

    int mutation = 10000;
    for (int i = 0; i < mutation; i++) {
      int selectPixel = (int)random(sample.pixels.length);

      if (offspringBody[selectPixel] == sample.pixels[selectPixel]) {
        /*if ((int)(random(100)) > 1)*/        continue;
      }

      offspringBody[selectPixel] = color((int)random(255));
    }

    int fitness = 0;
    int matchs = 0;
    for (int i = 0; i < offspringBody.length; i++) {
      if (offspringBody[i] == sample.pixels[i]) {
        matchs++;
      }
    }
    
    if (matchs == offspringBody.length && reachedTargetAt == -1) {
      reachedTargetAt = generation;
    }

    newPopulation[offspring] = new MyIndividual(offspringBody, fitness+matchs);
    newPopulation[offspring].matchs = matchs;

    offspring++;
  }

  // copy the new generation
  for (int i = 0; i < populationN; i++)
  {
    population[i].pixs = null;
    population[i] = new MyIndividual(newPopulation[i].pixs, newPopulation[i].fitness);
    population[i].matchs = newPopulation[i].matchs;
  }
  population = population.sort(compare);
  for (int i = 0; i < populationN; i++) {
    population[i].probability = (float)population[i].fitness/population[populationN-1].fitness;
  }

  cImage.loadPixels();
  for (int i = 0; i < cImage.pixels.length; i++) {
	cImage.pixels[i] = population[populationN-1].pixs[i];
  }

  generation++;
}

void reset_ga()
{
  x = y = 0;
  background(0);

  cImage.loadPixels();
  sample.loadPixels();
  for (int i = 0; i < cImage.pixels.length; i++) {
	cImage.pixels[i] = sample.pixels[i];
  }
  cImage.updatePixels();
  
  generation = 0;
  reachedTargetAt = -1;
  imagePixelsCount = str(sample.width*sample.height);
  
  individual.loadPixels();
  for (int i = 0; i < populationN; i++) {
    int fitness = 0;
    for (int j=0; j < sample.pixels.length; j++) {
      int pixelValue = (int)random(255);
      individual.pixels[j] = color(pixelValue);
      if (individual.pixels[j] == sample.pixels[j]) {
        fitness++;
      }
    }
	individual.updatePixels();
    population[i] = new MyIndividual(individual.pixels, fitness);
  }
  population = population.sort(compare);

  for (int i = 0; i < populationN; i++) {
    population[i].probability = (float)population[i].fitness/population[populationN-1].fitness;
    //print("f:"+population[i].fitness + " p:" + population[i].probability + " ");
  }
}

void setup() 
{
  //randomSeed(0);

  background(0);

  sample = loadImage("sample.jpg");
  cImage = createImage(sample.width, sample.height, RGB);

  individual = createImage(sample.width, sample.height, RGB);

  offspringBody = new int[sample.pixels.length];

  //size(sample.width*windowScaleWidth, sample.height*windowScaleHeight, P2D);
  size(1024-128, 256+128, P2D);

  // populate
  population = new MyIndividual[populationN];
  newPopulation = new MyIndividual[populationN];
  reset_ga();
}

void draw() 
{ 
  if (sample.width != 0) {
	if(sample.width == -1)
	{
		fill(0);
		rect(0, 0, 100, 38);
		fill(255);
		text("Image load failed...", 0, 20);		
		//return;
	} else {
	
	  int fitWidth = sample.width*floor(width/sample.width);
	  int fitHeight = sample.height*floor(height/sample.height);
	  int marginWidth = (width-fitWidth)/2;
	  int marginHeight = (height-fitHeight)/2;
	  int xNext = (x+cImage.width)%fitWidth;
	  int yNext = (y+cImage.height)%fitHeight;
	  // this clear the background after a 'full screen pass'
	  /*if(xNext == cImage.width && yNext == cImage.height) {
	   background(0); }
	   */
	  cImage.updatePixels();
	  image(cImage, marginWidth+x, marginHeight+y);

	  fill(0);
	  if(reachedTargetAt != -1) {
		rect(0, 0, 100, 38);
		fill(255);
		text(str(reachedTargetAt), 0, 38);
	  } else {
		rect(0, 0, 100, 24);
	  }
	  fill(255);
	  text(str(generation), 0, 10);
	  text(str(population[populationN-1].matchs)+"/"+imagePixelsCount, 0, 24);

	  iterateGeneration();

	  x = xNext;
	  if (x == 0) {
		y = yNext;
	  }
	}
  }
}

void keyPressed() {
  iterateGeneration();
}
