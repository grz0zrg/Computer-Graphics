/**
  * Old processing code ported to Processing.js; JPEG encoder / decoder done for an online course.
  */

PImage img;
PImage imge;

// tables from http://www.impulseadventure.com/photo/jpeg-quantization.html
int[] defaultQLuminance = {16, 11, 10, 16, 24,  40,  51,  61,
                           12, 12, 14, 19, 26,  58,  60,  55,
                           14, 13, 16, 24, 40,  57,  69,  56,
                           14, 17, 22, 29, 51,  87,  80,  62,
                           18, 22, 37, 56, 68,  109, 103, 77,
                           24, 35, 55, 64, 81,  104, 113, 92,
                           49, 64, 78, 87, 103, 121, 120, 101,
                           72, 92, 95, 98, 112, 100, 103, 99,
                         
                           16, 11, 10, 16, 24,  40,  51,  61, // 8x8 matrix for 16x16
                           12, 12, 14, 19, 26,  58,  60,  55,
                           14, 13, 16, 24, 40,  57,  69,  56,
                           14, 17, 22, 29, 51,  87,  80,  62,
                           18, 22, 37, 56, 68,  109, 103, 77,
                           24, 35, 55, 64, 81,  104, 113, 92,
                           49, 64, 78, 87, 103, 121, 120, 101,
                           72, 92, 95, 98, 112, 100, 103, 99};
                           
int[] defaultQChrominance = {17, 18, 24, 47, 99, 99, 99, 99,
                             18, 21, 26, 66, 99, 99, 99, 99,
                             24, 26, 56, 99, 99, 99, 99, 99,
                             47, 66, 99, 99, 99, 99, 99, 99,
                             99, 99, 99, 99, 99, 99, 99, 99,
                             99, 99, 99, 99, 99, 99, 99, 99,
                             99, 99, 99, 99, 99, 99, 99, 99,
                             99, 99, 99, 99, 99, 99, 99, 99,
                           
                             17, 18, 24, 47, 99, 99, 99, 99, // 8x8 matrix for 16x16
                             18, 21, 26, 66, 99, 99, 99, 99,
                             24, 26, 56, 99, 99, 99, 99, 99,
                             47, 66, 99, 99, 99, 99, 99, 99,
                             99, 99, 99, 99, 99, 99, 99, 99,
                             99, 99, 99, 99, 99, 99, 99, 99,
                             99, 99, 99, 99, 99, 99, 99, 99,
                             99, 99, 99, 99, 99, 99, 99, 99};

class Pixel {
  int y, cb, cr;
  int pr, pg , pb;
  double cy, ccb, ccr; // dct coefficients for ycbcr
  
  Pixel(int r, int g, int b) {
    pr = r;
    pg = g;
    pb = b;
    
    y  = (int)( 0.299   * r + 0.587   * g + 0.114   * b);
    cb = (int)(-0.16874 * r - 0.33126 * g + 0.50000 * b);
    cr = (int)( 0.50000 * r - 0.41869 * g - 0.08131 * b);
  }
  
  void toRgb() {
    pr = (int)(y + 1.402 * cr); 
    pg = (int)(y - 0.344 * cb - 0.714 * cr); 
    pb = (int)(y + 1.772 * cb); 
    
    /*r = constrain(abs((int)(cy + 1.402 * ccr)), 0, 255); 
    g = constrain(abs((int)(cy - 0.344 * ccb - 0.714 * ccr)), 0, 255); 
    b = constrain(abs((int)(cy + 1.772 * ccb)), 0, 255); */
  }
}
  
class ImageBlock {
  Pixel[] pxs;
  
  ImageBlock(Pixel[] px) {
    pxs = px;
  }
}

// not used, this is a min priority queue initially done for the entropy coding stage with huffman algorithm
class MinPQ
{
  private int maxSize;
  private long[] queue;
  private int nItems;
  
  MinPQ(int s)
  {
    maxSize = s;
    queue = new long[maxSize];
    nItems = 0;
  }
  
  void insert(long item)
  {
    int i;
    if (nItems == 0) {
      queue[nItems++] = item;
    } else {
      for (i = nItems - 1; i >= 0; i--) {
        if (item > queue[i]) {
          queue[i + 1] = queue[i];
        } else {
          break;
        }
      }
        
      queue[i + 1] = item;
      nItems++;
    }
  }
  
  long remove()
  {
    return queue[--nItems];
  }
  
  long peekMin()
  {
    return queue[nItems - 1];
  }
  
  boolean isEmpty()
  {
    return (nItems == 0);
  }
  
  boolean isFull()
  {
    return (nItems == maxSize);
  }
}

ImageBlock[] blocks;
ImageBlock[] transformedBlocks;
ImageBlock[] quantizedBlocks;
ImageBlock[] finalImage;
int blockSize = 8; // buggy

int[] QLum;
int[] QChrom;

double jpeg_quality_degradation_luminance = 1.0;
double jpeg_quality_degradation_chrominance = 1.0;

void computeImage() {
  blocks = buildBlocks(img, blockSize);
  transformedBlocks = discreteCosineTransform(blocks, blockSize);

  for (int i = 0; i < defaultQLuminance.length; i++) {
		QLum[i] = defaultQLuminance[i];
		QChrom[i] = defaultQChrominance[i];
		
    QLum[i] *= jpeg_quality_degradation_luminance;
    QChrom[i] *= jpeg_quality_degradation_chrominance;
  }
  
  quantizedBlocks = quantizer(transformedBlocks, blockSize, QLum, QChrom);
  finalImage = inverseDiscreteCosineTransform(quantizedBlocks, blockSize);
}

void setup() {
  size(512, 300);
  noFill();
  stroke(255);
  frameRate(12);
	background(0);
	
	img = loadImage("sea.jpg");
	
	QLum = new int[defaultQLuminance.length()];
	QChrom = new int[defaultQChrominance.length()];

	computeImage();

	updateBlocks(finalImage, blockSize);
/*
  MinPQ hufftree = new MinPQ(10);
*/
}

ImageBlock[] buildBlocks(PImage src_img, int blockLength) {
  ImageBlock[] dst_blocks = new ImageBlock[ceil((src_img.width/blockLength) * (src_img.height/blockLength))];
  int dst_blockSize = blockLength*blockLength;
  
  //Pixel[] pixels = new Pixel[dst_blockSize];
  
  int start_x = 0;
  int start_y = 0;
  
  src_img.loadPixels();
  for (int i = 0; i < dst_blocks.length(); i++) {
    Pixel[] pxs = new Pixel[dst_blockSize];
    for(int e = start_x; e < start_x+blockLength; e++) {
      int off_x = e-start_x;
      
      for(int j = start_y; j < start_y+blockLength; j++) {
        int index = e+j*src_img.width;
				color c = src_img.pixels[index];
        int r = red(c);//(img.pixels[index]>>16)&0xff;
        int g = green(c);//(img.pixels[index]>>8)&0xff;
        int b = blue(c);//img.pixels[index]&0xff;
       
        pxs[off_x+(j-start_y)*blockLength] = new Pixel(r, g, b);
      }
    }
    
    start_x += blockLength;
    if (start_x%src_img.width == 0) {
      start_x = 0;
      start_y += blockLength;
    }
    
    dst_blocks[i] = new ImageBlock(pxs);
  }
  
  return dst_blocks;
}

void updateBlocks(ImageBlock[] src_blocks, int blockLength) {
  int start_x = 0, start_y = 0;
  imge = createImage(img.width, img.height, RGB);
  imge.loadPixels();
  for (int i = 0; i < src_blocks.length(); i++) {
    for(int e = 0; e < blockLength; e++) {
      int off_x = e+start_x;
      
      for(int j = 0; j < blockLength; j++) {
        int index = e+j*blockLength;

        src_blocks[i].pxs[index].toRgb();
        imge.pixels[off_x+(j+start_y)*imge.width] = color(src_blocks[i].pxs[index].pr, src_blocks[i].pxs[index].pg, src_blocks[i].pxs[index].pb, 255); 
      }
    }
    
    start_x += blockLength;
    if (start_x%imge.width == 0) {
      start_x = 0;
      start_y += blockLength;
    }
  }

  imge.updatePixels();
}

ImageBlock[] discreteCosineTransform(ImageBlock[] src_blocks, int blockLength) {
  int start_x = 0, start_y = 0;
  for (int i = 0; i < src_blocks.length(); i++) {
    double o = 0, p = 0;
    int N = blockLength;
    double sqrt_rec_N = 1/sqrt(2); // 1/sqrt(n)
    double sqrt_rec2_N = 2/sqrt(N);
    double tmpy, tmpcb, tmpcr;
    
    for(int k=0;k<blockLength;k++) {
      o=0;

        if (k == 0) {
          o = sqrt_rec_N;
        } else {
          o = 1;
        }
        
      for(int l=0;l<blockLength;l++) {
        p=0;
        tmpy=tmpcb=tmpcr=0;

        if (l == 0) {
          p = sqrt_rec_N;
        } else {
          p = 1;
        }
        
        double mul = 0.25*(o*p);
            
        for (int m=0;m<blockLength;m++) {
          double xx_dct = cos(((2.0*m+1)*PI*k) /(2*N));
          
          for(int n=0;n<blockLength;n++) { 
            double dct = xx_dct * (cos(((2.0*n+1)*PI*l)/(2*N)));
            int index = m+n*blockLength;
            
            tmpy+= src_blocks[i].pxs[index].y*dct*mul; 
            tmpcb+= src_blocks[i].pxs[index].cb*dct*mul; 
            tmpcr+= src_blocks[i].pxs[index].cr*dct*mul; 
          }
        }
        
        int index = k+l*blockLength;
        
        src_blocks[i].pxs[index].cy = tmpy;
        src_blocks[i].pxs[index].ccb = tmpcb;
        src_blocks[i].pxs[index].ccr = tmpcr;
      }
    }
    
    start_x += blockLength;
    if (start_x%img.width == 0) {
      start_x = 0;
      start_y += blockLength;
    }
  }
  
  return src_blocks;
}

ImageBlock[] inverseDiscreteCosineTransform(ImageBlock[] src_blocks, int blockLength) {
  int start_x = 0, start_y = 0;
  for (int i = 0; i < src_blocks.length(); i++) {
    double o = 0, p = 0;
    int N = blockLength;
    double sqrt_rec_N = 1/sqrt(2);
    double sqrt_rec2_N = 2/sqrt(N);
    double tmpy, tmpcb, tmpcr;
    for(int k=0;k<blockLength;k++) {
      for(int l=0;l<blockLength;l++) {
        tmpy=tmpcb=tmpcr=0;
  
        for (int m=0;m<blockLength;m++) {
          for(int n=0;n<blockLength;n++) { 
            o=0;p=0;
            if (m == 0) {
              o = sqrt_rec_N;
            } else {
              o = 1;
            }
            
            if (n == 0) {
              p = sqrt_rec_N;
            } else {
              p = 1;
            }
            
            double mul = 0.25*(o*p);
        
            double dct = (cos( ((2.0*k+1)*PI*m) /(2*N))) * (cos(((2.0*l+1)*PI*n)/(2*N)));
            int index = m+n*blockLength;
            
            tmpy+= mul*src_blocks[i].pxs[index].cy*dct;  
            tmpcb+= mul*src_blocks[i].pxs[index].ccb*dct; 
            tmpcr+= mul*src_blocks[i].pxs[index].ccr*dct; 
          }
        }
        
        int index = k+l*blockLength;
        src_blocks[i].pxs[index].y = (int)tmpy;
        src_blocks[i].pxs[index].cb = (int)tmpcb;
        src_blocks[i].pxs[index].cr = (int)tmpcr;
      }
    }
    
    start_x += blockLength;
    if (start_x%img.width == 0) {
      start_x = 0;
      start_y += blockLength;
    }
  }
  
  return src_blocks;
}

ImageBlock[] quantizer(ImageBlock[] src_blocks, int blockLength, int[] QLuminance, int[] QChrominance) {
  int start_x = 0, start_y = 0;
  for (int i = 0; i < src_blocks.length(); i++) {
    double tmpy, tmpcb, tmpcr;
    
    for(int e=0;e<blockLength;e++) {
      for(int j=0;j<blockLength;j++) {
        int index = e+j*blockLength;
        
        src_blocks[i].pxs[index].cy = round((float)(src_blocks[i].pxs[index].cy/QChrominance[index]))*QChrominance[index];
        src_blocks[i].pxs[index].ccb = round((float)(src_blocks[i].pxs[index].ccb/QLuminance[index]))*QLuminance[index];
        src_blocks[i].pxs[index].ccr = round((float)(src_blocks[i].pxs[index].ccr/QLuminance[index]))*QLuminance[index];
      }
    }
    
    start_x += blockLength;
    if (start_x%img.width == 0) {
      start_x = 0;
      start_y += blockLength;
    }
  }
  
  return src_blocks;
}

int pmx = 8;
int pmy = 8;

void draw() {  
	background(0);
	
	image(imge, 0, 0);

	image(img, img.width, 0);
	
	if (pmx != mouseX || pmy != mouseY) {
		background(0);
		
		pmx = mouseX;
		pmy = mouseY;
		
		jpeg_quality_degradation_luminance = mouseX / width * 10;
		jpeg_quality_degradation_chrominance = mouseY / height * 10;
		
		if (jpeg_quality_degradation_luminance == 0 && jpeg_quality_degradation_chrominance == 0) {
			jpeg_quality_degradation_luminance = 1;
			jpeg_quality_degradation_chrominance = 1;
		}
		
		fill(255, 255, 255, 255);
		textSize(24);
		text("JPEG processing...", 8, 32);

		computeImage();

		updateBlocks(finalImage, blockSize);
	}
	
	textSize(16);
	text("luminance degradation : " + jpeg_quality_degradation_luminance, 8, 278);
	textSize(16);
	text("chrominance degradation : " + jpeg_quality_degradation_chrominance, 8, 278 + 16);
}