import { matrix, ray } from "./matrix.js";
import { point, vector } from "./tuple.js";

class sphere 
{
	constructor(p = new point(0, 0, 0), r = 1.0)
	{
		this.p = p;
		this.r = r;
		this.transform = matrix.identity(4);
	}

	set_transform(m)
	{
		this.transform = this.transform.multi(m);
	}

	intersect(r1)
	{
		var r = r1.transform(this.transform.inversion());
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

export { sphere };