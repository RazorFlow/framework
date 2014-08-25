define([
	"jsep"
], function (jsep) {
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
										switch(tree.operator) {
											case "<" : return getResult(tree.left) < getResult(tree.right);
											case ">" : return getResult(tree.left) > getResult(tree.right);
											case "<=" : return getResult(tree.left) <= getResult(tree.right);
											case ">=" : return getResult(tree.left) >= getResult(tree.right);
											case "==" : return getResult(tree.left) == getResult(tree.right);
											case "===" : return getResult(tree.left) === getResult(tree.right);
											case "+" : return getResult(tree.left) + getResult(tree.right);
											case "-" : return getResult(tree.left) - getResult(tree.right);
											case "*" : return getResult(tree.left) * getResult(tree.right);
											case "/" : return getResult(tree.left) / getResult(tree.right);
											case "%" : return getResult(tree.left) % getResult(tree.right);
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