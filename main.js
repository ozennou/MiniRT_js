
import { tuple, point, vector} from './tuple.js';


var canvas = document.getElementById('myCanvas');
var ctx = canvas.getContext('2d');

ctx.fillStyle = `rgb(255, 90, 100)`;



for (var x = 0; x < 1000; x++)
{
	for (var y = 0; y < 1000; y++)
		ctx.fillRect(x, y, 1, 1);
}

