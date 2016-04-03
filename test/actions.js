var db = require("../db")
var url = require("url")


function trim(str) {
    return str.replace(/(^\s+)|(\s+$)/g, "");
}



exports.create = function(req,res){
    var query_obj=url.parse(req.url,true).query
    var name=query_obj["name"]
    var sex=query_obj["sex"]
    var sql ="insert into test(name,sex) values('"+name+"',"+sex+");"
    db.query(sql, function (err,r) {
        if(err){
            res.end('{"res":2004,"msg":"pgsql error!!"}')
            return
        }
        else {
            res.end('{"res":0,"msg":"insert ok!!"}')
        }
    })
}

exports.modify = function(req,res){
    var query_obj=url.parse(req.url,true).query
    var id=query_obj["id"]
    var name=query_obj["name"]
    var sex=query_obj["sex"]
    var sql="UPDATE test set name='"+name+"',sex="+sex+" where id="+id+";"
    db.query(sql,function (err,r) {
        if(err){
            res.end('{"res":2004,"msg":"pgsql error!!"}')
            return
        }else {
            if(r.rowCount==0){
                res.end('{"res":1,"msg":"this id not exist"}')
            }else {
                res.end('{"res":0,"msg":"modify is ok!!"}')
            }
        }
        })
}
exports.select = function(req,res){
    db.query("SELECT * FROM test;",
        function (err,r) {
            var test=new Array
            for(var x in  r.rows){
                var test1=new Array
                test1.push(r.rows[x].id)
                test1.push(trim(r.rows[x].name))
                test1.push(r.rows[x].sex)
                test.push(test1)
            }
            var json1={}
            json1.count=test.length
            json1.rows=test
            var string1 = JSON.stringify(json1)
            res.end(string1)
        })
}
exports.delete = function(req,res){
    var query_obj=url.parse(req.url,true).query
    var id=query_obj["id"]
    var sql="DELETE FROM test WHERE id = "+id+";"
    db.query(sql, function (err,r) {
        if(err){
            res.end('{"res":2004,"msg":"pgsql error!!"}')
            return
        }else {
            if(r.rowCount==0){
                res.end('{"res":1,"msg":"this id not exist"}')
            }else {
                res.end('{"res":0,"msg":"delete is ok!!"}')
            }
        }
        })
}

