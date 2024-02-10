
class complex 
{
	constructor(z = 0, i = 0)
	{
		this.z = z;
		this.i = i;
	}
}

function coordinate(x, width, min, max) {
	return x * (max - min) / width + min;
}

function mandel(frac, x ,y)
{
	var z = new complex(0, 0);
	var i = 0;
	while (z.z * z.z + z.i * z.i < 4 && i < 100) {
		var temp = z.z * z.z - z.i * z.i + frac.z;
		z.i = 2 * z.z * z.i + frac.i;
		z.z = temp;
		i++;
	}
	if (i == 100) {
		ctx.fillRect(x, y, 1, 1);
	}
	else{
		ctx.fillStyle = 'hsl(' + i * 10 + ', 100%, 50%)';
		ctx.fillRect(x, y, 1, 1);
		ctx.fillStyle = 'black';
	}
}

var canvas = document.getElementById('myCanvas');
var ctx = canvas.getContext('2d');

ctx.fillStyle = 'black';


var centerX = 500;
var centerY = 500;
var radius = 200; 
for (var x = 0; x < canvas.width; x++) {
    for (var y = 0; y < canvas.height; y++) {
		var frac = new complex(coordinate(x, 1000, -2, 2), coordinate(y, 1000, -2, 2));
		mandel(frac, x, y);
    }
}
