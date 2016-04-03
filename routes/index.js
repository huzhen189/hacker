var user=require("../user")
var test=require("../test")

var handles = {}
for(var k in user.handles){
    handles[k] = user.handles[k]
}
for(var k in test.handles){
    handles[k] = test.handles[k]
}
exports.handles = handles
