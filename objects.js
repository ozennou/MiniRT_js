import { matrix, ray } from "./matrix.js";
import { point, vector } from "./tuple.js";

class sphere 
{
	constructor(p, r = 1.0)
	{
		this.p = p;
		this.r = r;
	}

	intersect(r)
	{
		var sphere_to_ray = r.origin.subtract(this.p);
		var a = r.direction.dot(r.direction);
		var b = 2 * r.direction.dot(sphere_to_ray);
		var c = sphere_to_ray.dot(sphere_to_ray) - this.r * this.r;
		var discriminant = b * b - 4 * a * c;
		if (discriminant < 0)
			return undefined;
		var t1 = (-b - Math.sqrt(discriminant)) / (2 * a);
		var t2 = (-b + Math.sqrt(discriminant)) / (2 * a);
		return [t1, t2];
	}
}

var r = new ray(new point(0.7071067811865476, 0.7071067811865476, 5), new vector(0, 0, 1));

var s = new sphere(new point(0, 0, 0), 1);
console.log(s.p);
var xs = s.intersect(r);
console.log(xs);