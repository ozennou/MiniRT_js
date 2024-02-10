class tuple 
{
	constructor(x = 0, y = 0, z = 0, w = 0)
	{
		this.x = x;
		this.y = y;
		this.z = z;
		this.w = w;
	}



	add(b)
	{
		return new tuple(this.x + b.x, this.y + b.y, this.z + b.z, this.w + b.w);
	}

	hadamard(b) // just for colors
	{
		return new tuple(this.x * b.x, this.y * b.y, this.z * b.z, this.w * b.w);
	}

	subtract(b)
	{
		return new tuple(this.x - b.x, this.y - b.y, this.z - b.z, this.w - b.w);
	}
	
	negate()
	{
		return new tuple(-this.x, -this.y, -this.z, -this.w);
	}
	
	multip(b)
	{
		return new tuple (this.x * b, this.y * b, this.z * b, this.w * b);
	}
	
	divide(b)
	{
		return this.multip(1 / b);
	}
	
	magnitude()
	{
		return Math.sqrt(this.x * this.x + this.y * this.y + this.z * this.z + this.w * this.w);
	}
	
	normalize(a)
	{
		var m = a.magnitude();
		return new tuple(this.x / m, this.y / m, this.z / m, this.w / m);
	}
	
	dot(b)
	{
		if (this.w != 0 || b.w != 0)
			return -1;
		return (this.x * b.x + this.y * b.y + this.z * b.z + this.w * b.w);
	}
	
	cross(b)
	{
		if (this.w != 0 || b.w != 0)
			return -1;
		return new vector(this.y * b.z - this.z * b.y, this.z * b.x - this.x * b.z, this.x * b.y - this.y * b.x);
	}
}

class point extends tuple
{
	constructor(x, y, z)
	{
		super(x, y, z, 1.0);
	}
}

class vector extends tuple
{
	constructor(x, y, z)
	{
		super(x, y, z, 0.0);
	}
}

export { tuple, point, vector} ;