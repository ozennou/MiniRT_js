import { tuple, point, vector} from './tuple.js';

class matrix 
{
	constructor(rows = 4, cols = 4)
	{
		this.rows = rows;
		this.cols = cols;
		this.data = [];
		for (var i = 0; i < this.rows; i++) {
			this.data[i] = [];
			for (var j = 0; j < this.cols; j++) {
				this.data[i][j] = 0;
			}
		}
	}

	submatrix(rows, cols)
	{
		var res = new matrix(this.rows - 1, this.cols - 1);
		var i = 0;
		for (var x = 0; x < this.rows; x++)
		{
			if (x == rows)
				continue;
			var j = 0;
			for (var y = 0; y < this.cols; y++)
			{
				if (y == cols)
					continue;
				res.data[i][j] = this.data[x][y];
				j++;
			}
			i++;
		}
		return (res);
	}

	determinant()
	{
		if (this.rows == 2 && this.cols == 2)
			return (this.data[0][0] * this.data[1][1] - this.data[0][1] * this.data[1][0])
		var res = 0;
		for (var x = 0; x < this.cols; x++)
		{
			var sign;
			sign = (x % 2)? -1 : 1
			res += sign * this.data[0][x] * this.submatrix(0, x).determinant();
		}
		return (res);
	}

	multi(a)
	{
		if (this.cols != a.rows)
			return -1;
		var res = new matrix(this.rows, a.cols);
		for (var x = 0; x < this.rows; x++) {
			for (var y = 0; y < a.cols; y++) {
				var sum = 0;
				for (var i = 0; i < this.cols; i++) {
					sum += this.data[x][i] * a.data[i][y];
				}
				res.data[x][y] = sum;
			}
		}
		return res;
	}

	static identity(size = 4)
	{
		var result = new matrix(size, size);
		for (var i = 0; i < size; i++) {
			result.data[i][i] = 1;
		}
		return result;
	}

	static translate(x, y, z)
	{
		var res = matrix.identity();
		res.data[0][3] = x;
		res.data[1][3] = y;
		res.data[2][3] = z;
		return res;
	}

	static scale(x, y, z)
	{
		var res = matrix.identity();
		res.data[0][0] = x;
		res.data[1][1] = y;
		res.data[2][2] = z;
		return (res);
	}

	static rotation_x(angle)
	{
		var res = matrix.identity();
		res.data[1][1] = Math.cos(angle);
		res.data[1][2] = -Math.sin(angle);
		res.data[2][1] = Math.sin(angle);
		res.data[2][2] = Math.cos(angle);
		return res;
	}

	static rotation_y(angle)
	{
		var res = matrix.identity();
		res.data[0][0] = Math.cos(angle);
		res.data[0][2] = Math.sin(angle);
		res.data[2][0] = -Math.sin(angle);
		res.data[2][2] = Math.cos(angle);
		return res;
	}

	static rotation_z(angle)
	{
		var res = matrix.identity();
		res.data[0][0] = Math.cos(angle);
		res.data[0][1] = -Math.sin(angle);
		res.data[1][0] = Math.sin(angle);
		res.data[1][1] = Math.cos(angle);
		return res;
	}

	static shear(xy, xz, yx, yz, zx, zy)
	{
		var res = matrix.identity();
		res.data[0][1] = xy;
		res.data[0][2] = xz;
		res.data[1][0] = yx;
		res.data[1][2] = yz;
		res.data[2][0] = zx;
		res.data[2][1] = zy;
		return res;
	}

	multi_p(p)
	{
		var res = new point();
		res.x = this.data[0][0] * p.x + this.data[0][1] * p.y + this.data[0][2] * p.z + this.data[0][3] * p.w;
		res.y = this.data[1][0] * p.x + this.data[1][1] * p.y + this.data[1][2] * p.z + this.data[1][3] * p.w;
		res.z = this.data[2][0] * p.x + this.data[2][1] * p.y + this.data[2][2] * p.z + this.data[2][3] * p.w;
		res.w = this.data[3][0] * p.x + this.data[3][1] * p.y + this.data[3][2] * p.z + this.data[3][3] * p.w;
		return res;
	}

	transpose()
	{
		var res = new matrix(this.cols, this.rows)
		for (var x = 0; x < this.rows; x++)
		{
			for (var y = 0; y < this.cols; y++)
				res.data[y][x] = this.data[x][y];
		}
		return res;
	}

	print()
	{
		for (var i = 0; i < this.rows; i++)
			console.log(this.data[i]);
	}

	cofactor(i, y)
	{
		if ((i + y) % 2)
			return (-submatrix(this, i, y).determinant());
		else
			return (submatrix(this, i, y).determinant());
	}

	inversion()
	{
		var det = this.determinant();
		if (!det)
			return -1;
		var res = new matrix(m.cols, m.rows);
		for (var x = 0; x < m.rows; x++)
		{
			for (var y = 0; y < m.cols; y++)
				res.data[y][x] = this.cofactor(x, y) / det;
		}
		return res
	}
}

class ray 
{
	constructor(origin, direction)
	{
		this.origin = origin;
		this.direction = direction;
	}

	position(t)
	{
		return this.origin.add(this.direction.multip(t));
	}
}

export { matrix, ray };

// var n = identity(4);
// print(m);
// print(rotation_z(Math.PI / 4));


// var m = new matrix;
// m.data = [[-5, 2, 6, -8], [1, -5, 1, 8], [7, 7, -6, -7], [1, -3, 7, 4]];
// m.multi(matrix.rotation_x(Math.PI / 4)).print();
// matrix.identity(4).multi(matrix.rotation_x(Math.PI / 4)).print();
// m.multi(matrix.rotation_x(Math.PI / 2)).transpose().print();
// m.multi(matrix.rotation_x(Math.PI / 2)).print()

// var r = new ray(new point(2, 3, 4), new vector(1, 0, 0));

// console.log(r.position(2.5).subtract(new point(2, 3, 4)).divide(2.5));