define([
	"jsep",
	"vendor/lodash"
], function (jsep, _) {
	var cellValue = null,
			evalExpression = function (expression, value) {
				cellValue = value;
				return getResult(jsep(expression));
			},

			getResult = function(tree) {
				switch (tree.type) {
					case "LogicalExpression" : 
										switch(tree.operator) {
											case "&&" : return getResult(tree.left) && getResult(tree.right);
											case "||" : return getResult(tree.left) || getResult(tree.right);
										}
					case "BinaryExpression" :
										var left = getResult(tree.left),
											right = getResult(tree.right);
										if(_.isBoolean(left)) {
											if(!left) {
												return false;
											} else {
												left = cellValue;
											}
										}
										switch(tree.operator) {
											case "<" : return left < right;
											case ">" : return left > right;
											case "<=" : return left <= right;
											case ">=" : return left >= right;
											case "==" : return left == right;
											case "===" : return left === right;
											case "+" : return left + right;
											case "-" : return left - right;
											case "*" : return left * right;
											case "/" : return left / right;
											case "%" : return left % right;
										}
					case "Literal" :
										return tree.value;
					case "Identifier" :
										return cellValue;
				}
				return false;
			};

	return evalExpression;
});