var _ = require('underscore')

//Order of require:
//1. Core module
//2. File or folder (./ syntax)
//3. node_modules

var result  = _.contains([1, 2, 3], 3)
console.log(result)