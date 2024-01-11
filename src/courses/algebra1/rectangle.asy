size(8cm); // Adjust the size as needed

real width = 6; // Horizontal side length
real height = 4; // Vertical side length

real xCenter = width / 2;
real yCenter = height / 2;

pair A = (-xCenter, -yCenter); // Bottom-left corner
pair B = (-xCenter, yCenter);  // Top-left corner
pair C = (xCenter, yCenter);   // Top-right corner
pair D = (xCenter, -yCenter);  // Bottom-right corner

// Draw the rectangle
draw(A--B--C--D--cycle);

// Label the sides
label("$6$", (A + B)/2, W); // Horizontal side
label("$4$", (B + C)/2, N); // Vertical side

// Optional: Add labels for the corners
label("$A$", A, SW);
label("$B$", B, NW);
label("$C$", C, NE);
label("$D$", D, SE);

// Optional: Add a title
label("Horizontally Oriented Rectangle", (0, 1.2yCenter));

// Optional: Adjust the pen color, size, etc.
pen p = linewidth(1.5);
draw(A--B--C--D--cycle, p);
