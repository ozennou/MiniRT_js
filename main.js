
import { matrix, ray } from "./matrix.js";
import { point, vector } from "./tuple.js";
import { sphere } from "./objects.js";

var canvas = document.getElementById('myCanvas');
var ctx = canvas.getContext('2d');

ctx.fillStyle = `red`;

var s = new sphere();
var r = new ray(new point(0, 0, -5), new vector(0, 0, 1));


var half = 500 / 2;
var pixel_size = 1;
var half_pixel = pixel_size / 2;

s.set_transform(matrix.scale(4,4,4));

for (var x = 0; x < 500; x++)
{
	var world_x = -half + half_pixel + x * pixel_size;
	for (var y = 0; y < 500; y++)
	{
		var world_y = half - half_pixel - y * pixel_size;
		var position = new point(world_x, world_y, 7);
		var r = new ray(new point(0, 0, -5), position.subtract(new point(0, 0, -5)).normalize());
		var xs = s.intersect(r);
		if (xs != undefined)
			ctx.fillRect(x, y, 1, 1);
	}
}

