var express = require('express');
var router = express.Router();
var http = require('http');
var util = require('util');
var buffer = require('buffer');
var multiparty = require('connect-multiparty');
var multipartMiddleware = multiparty();
var fs = require('fs');
var stringDecoder = require('string_decoder').StringDecoder;

router.get('/lists', function(req, res, next) { //获取演员导演列表
    const type = req.query.type; //123:电视剧，电影，综艺
    const staffType = req.query.staffType; //123:演员，导演，编剧
    var getheaders = {
        'Content-Type': 'application/json; charset=UTF-8'
    };
    var optionspost = {
        host: global.hostAddress,
        port: global.portNum,
        path: global.ctx + '/staff/lists?type=' + type + '&staffType=' + staffType,
        method: 'GET',
        headers: getheaders
    };
    var str = '';
    http.request(optionspost, function(response) {
        response.on('data', function(data) {
            str += data;
        });
        response.on('end', function() {
            res.send(str);
        });
    }).end();
}).get('/type_lists', function(req, res, next) { //获取该类型下的type列表
    const type = req.query.type; //123:电视剧，电影，综艺
    var getheaders = {
        'Content-Type': 'application/json; charset=UTF-8'
    };
    var optionspost = {
        host: global.hostAddress,
        port: global.portNum,
        path: global.ctx + '/drama/type_lists?type=' + type,
        method: 'GET',
        headers: getheaders
    };
    var str = '';
    http.request(optionspost, function(response) {
        response.on('data', function(data) {
            str += data;
        });
        response.on('end', function() {
            res.send(str);
        });
    }).end();
}).get('/drama/solr', function(req, res, next) {
    //   var token = req.cookies.access_token;
    var reqData = req.query;
    var param = '?page=' + reqData.page;
    if (reqData.rows != null && reqData.rows != '') {
        param += '&rows=' + encodeURI(reqData.rows, "UTF-8");
    }
    if (reqData.search != null && reqData.search != '') {
        param += '&search=' + decodeURI(reqData.search, "UTF-8");
    }
    if (reqData.type != null && reqData.type != '') { //type（0：影视剧名称 1：演员 2：导演 3：编剧）
        param += '&type=' + encodeURI(reqData.type, "UTF-8");
    }
    if (reqData.actorsName != null && reqData.actorsName != '') {
        param += '&actorsName=' + encodeURI(reqData.actorsName, "UTF-8");
    }
    if (reqData.directorsName != null && reqData.directorsName != '') {
        param += '&directorsName=' + encodeURI(reqData.directorsName, "UTF-8");
    }
    if (reqData.screenwritersName != null && reqData.screenwritersName != '') {
        param += '&screenwritersName=' + encodeURI(reqData.screenwritersName, "UTF-8");
    }
    if (reqData.dramaTypeName != null && reqData.dramaTypeName != '') {
        param += '&dramaTypeName=' + encodeURI(reqData.dramaTypeName, "UTF-8");
    }
    var getheaders = {
        'Content-Type': 'application/json; charset=UTF-8',
        'ip_address': req.hostname
    };
    var optionspost = {
        host: global.hostAddress,
        port: global.portNum,
        path: global.ctx + '/drama/solr' + param, // + '&access_token=' + token
        method: 'GET',
        headers: getheaders
    };
    var str = '';
    var decoder = new stringDecoder('UTF-8');
    http.request(optionspost, function(response) {
        response.on('data', function(data) {
            str += decoder.write(data);
        });
        response.on('end', function() {
            res.send(str);
        });

    }).end();
}).get('/permission', function(req, res, next) { //获取该类型下的type列表
    const access_token = req.query.access_token; //123:电视剧，电影，综艺
    var getheaders = {
        'Content-Type': 'application/json; charset=UTF-8'
    };
    var optionspost = {
        host: global.hostAddress,
        port: global.portNum,
        path: global.ctx + '/login/menu/resource?access_token=' + access_token,
        method: 'GET',
        headers: getheaders
    };
    var str = '';
    http.request(optionspost, function(response) {
        response.on('data', function(data) {
            str += data;
        });
        response.on('end', function() {
            res.send(str);
        });
    }).end();
}).get('/user/user_info', function(req, res, next) {
    //用户信息查询
    var token = req.cookies.access_token;
    var optionspost = {
        host: global.hostAddress,
        port: global.portNum,
        path: global.ctx + '/userInfo?access_token=' + token,
        method: 'GET'
    };
        var str = '';
        http.request(optionspost, function(response) {
            response.on('data', function(data) {
                str += data;
            });
            response.on('end', function() {
                res.send(str);
            });
        }).end();
}).get('/staff_list', function(req, res, next) {
        var type = req.query.type;//1演员 2导演 3编剧
        var staff=req.query.staffType;
        var getheaders = {
            'Content-Type': 'application/json; charset=UTF-8'
           };
        var optionspost = {
            host: global.hostAddress,
            port: global.portNum,
            path: global.ctx + '/staff/lists?type=' + type+'&staffType='+staff,//firstPinyin
            method: 'GET',
            headers: getheaders,
        };
    var str = '';
    http.request(optionspost, function(response) {
        response.on('data', function(data) {
            str += data;
        });
        response.on('end', function() {
            res.send(str);
        });
    }).end();
}).get('/select', function(req, res, next) { //查询列表
    var type = req.query.type;
    var getheaders = {
        'Content-Type': 'application/json; charset=UTF-8'
    };
    var path = global.ctx + '/select';
    if (type == 'area') {
        path += '/areaList';
    } else if (type == 'language') {
        path += '/languageList'
    } else if (type == 'plat') {
        path += '/playPlatformList'
    } else if (type == 'adver') {
        path += '/adverTypeList'
    } else if (type == 'drama') {
        path += '/dramaTypeList'
    } else if (type == 'staff') {
        path += '/staffList'
    } else if (type == 'region') {
        path += '/regin'
    } else if (type == 'company') {
        path += '/companyList'
    } else {
        path += '/staffList'
    }
    var optionspost = {
        host: global.hostAddress,
        port: global.portNum,
        path: path, //firstPinyin
        method: 'GET',
        headers: getheaders,
    };

    var str = '';
    var decoder = new stringDecoder('UTF-8');
    http.request(optionspost, function(response) {
        response.on('data', function(data) {
            str += decoder.write(data);
        });
        response.on('end', function() {
            res.send(str);
        });

    }).end();
}).post('/upload', multipartMiddleware, function(req, res, next) { //上传头像接口
    var token = req.cookies.access_token;
    var files = req.files.file;
    var boundaryKey = Math.random().toString(16);
    var optionspost = {
        host: global.hostAddress,
        port: global.portNum,
        path: global.ctx + '/upload/picture?access_token=' + token,
        method: 'POST'
    };
    var reqPost = http.request(optionspost, function(resPost) {
        resPost.on('data', function(d) {
            res.send(d);
        });
    });

    var payload = '--' + boundaryKey + '\r\n' + 'Content-Type: image/jpeg\r\n' + 'Content-Disposition: form-data; name="image"; filename="' + files.name + '"\r\n' + 'Content-Transfer-Encoding: binary\r\n\r\n';

    var enddata = '\r\n--' + boundaryKey + '--';
    reqPost.setHeader('Content-Type', 'multipart/form-data; boundary=' + boundaryKey + '');
    reqPost.setHeader('Content-Length', Buffer.byteLength(payload) + Buffer.byteLength(enddata) + files.size);
    reqPost.write(payload);
    var fileStream = fs.createReadStream(files.path, { bufferSize: 4 * 1024 });
    fileStream.pipe(reqPost, { end: false });

    fileStream.on('end', function(d) {

        reqPost.end(enddata);
    });
    fileStream.on('close', function(d) {

    });

    reqPost.on('error', function(e) {

    });
}).post('/file', multipartMiddleware, function(req, res, next) { //上传图片接口（共享文件）
    var token = req.cookies.access_token;
    var files = req.files.file;
    var businessType = req.body.businessType;
    var boundaryKey = Math.random().toString(16);
    var optionspost = {
        host: global.hostAddress,
        port: global.portNum,
        path: global.ctx + '/upload/file?access_token=' + token,
        method: 'POST'
    };

    var reqPost = http.request(optionspost, function(resPost) {

        resPost.on('data', function(d) {
            res.send(d);
        });
    });

    var payload = '--' + boundaryKey + '\r\n' + 'Content-Type: image/jpeg\r\n' + 'Content-Disposition: form-data; name="file"; filename="' + files.name + '"\r\n' + 'Content-Transfer-Encoding: binary\r\n\r\n';

    var enddata = '\r\n--' + boundaryKey + '--';
    reqPost.setHeader('Content-Type', 'multipart/form-data; boundary=' + boundaryKey + '');
    reqPost.setHeader('Content-Length', Buffer.byteLength(payload) + Buffer.byteLength(enddata) + files.size);
    reqPost.setHeader('businessType', businessType);
    reqPost.write(payload);
    var fileStream = fs.createReadStream(files.path, { bufferSize: 4 * 1024 });
    fileStream.pipe(reqPost, { end: false });

    fileStream.on('end', function(d) {
        reqPost.end(enddata);
    });
    fileStream.on('close', function(d) {

    });
    reqPost.on('error', function(e) {

    });
}).post('/prifile', multipartMiddleware, function(req, res, next) { //上传图片接口（共享文件）
    var token = req.cookies.access_token;
    var files = req.files.file;
    var businessType = req.body.businessType;
    var boundaryKey = Math.random().toString(16);
    var optionspost = {
        host: global.hostAddress,
        port: global.portNum,
        path: global.ctx + '/upload/file/system?access_token=' + token,
        method: 'POST'
    };

    var reqPost = http.request(optionspost, function(resPost) {

        resPost.on('data', function(d) {
            res.send(d);
        });
    });

    var payload = '--' + boundaryKey + '\r\n' + 'Content-Type: image/jpeg\r\n' + 'Content-Disposition: form-data; name="file"; filename="' + files.name + '"\r\n' + 'Content-Transfer-Encoding: binary\r\n\r\n';

    var enddata = '\r\n--' + boundaryKey + '--';
    reqPost.setHeader('Content-Type', 'multipart/form-data; boundary=' + boundaryKey + '');
    reqPost.setHeader('Content-Length', Buffer.byteLength(payload) + Buffer.byteLength(enddata) + files.size);
    reqPost.setHeader('businessType', businessType);
    reqPost.write(payload);
    var fileStream = fs.createReadStream(files.path, { bufferSize: 4 * 1024 });
    fileStream.pipe(reqPost, { end: false });

    fileStream.on('end', function(d) {
        reqPost.end(enddata);
    });
    fileStream.on('close', function(d) {

    });
    reqPost.on('error', function(e) {

    });
}).post('/attract', multipartMiddleware, function(req, res, next) { //上传文件接口
    var token = req.cookies.access_token;
    var files = req.files.file;
    var id = req.query.id;
    var boundaryKey = Math.random().toString(16);
    var optionspost = {
        host: global.hostAddress,
        port: global.portNum,
        path: global.ctx + '/product/attract/' + id + '?access_token=' + token,
        method: 'POST'
    };
    var reqPost = http.request(optionspost, function(resPost) {

        resPost.on('data', function(d) {
            res.send(d);
        });
    });

    var payload = '--' + boundaryKey + '\r\n' + 'Content-Type: image/jpeg\r\n' + 'Content-Disposition: form-data; name="file"; filename="' + files.name + '"\r\n' + 'Content-Transfer-Encoding: binary\r\n\r\n';

    var enddata = '\r\n--' + boundaryKey + '--';
    reqPost.setHeader('Content-Type', 'multipart/form-data; boundary=' + boundaryKey + '');
    reqPost.setHeader('Content-Length', Buffer.byteLength(payload) + Buffer.byteLength(enddata) + files.size);
    reqPost.write(payload);
    var fileStream = fs.createReadStream(files.path, { bufferSize: 4 * 1024 });
    fileStream.pipe(reqPost, { end: false });

    fileStream.on('end', function(d) {
        reqPost.end(enddata);
    });
    fileStream.on('close', function(d) {

    });
    reqPost.on('error', function(e) {

    });
}).post('/uploadMedia', function(req, res, next) {
    var token = req.cookies.access_token;
    var reqBody = JSON.stringify(req.body);
    var postheaders = {
        'Content-Type': 'application/json; charset=UTF-8',
        'Content-Length': Buffer.byteLength(reqBody, 'utf8')
    };
    // the post options  
    var optionspost = {
        host: global.hostAddress,
        port: global.portNum,
        path: global.ctx + '/product/save?access_token=' + token,
        method: 'POST',
        headers: postheaders
    };
    var reqPost = http.request(optionspost, function(resPost) {
        resPost.on('data', function(d) {
            res.send(d);
        });
    });
    reqPost.write(reqBody);
    reqPost.end();
    reqPost.on('error', function(e) {});

}).post('/post_client', function(req, res, next) {
    var token = req.cookies.access_token;
    var reqBody = JSON.stringify(req.body);
    var postheaders = {
        'Content-Type': 'application/json; charset=UTF-8',
        'Content-Length': Buffer.byteLength(reqBody, 'utf8')
    };
    // the post options  
    var optionspost = {
        host: global.hostAddress,
        port: global.portNum,
        path: global.ctx + '/client?access_token=' + token,
        method: 'PUT',
        headers: postheaders
    };
    var reqPost = http.request(optionspost, function(resPost) {
        resPost.on('data', function(d) {
            res.send(d);
        });
    });
    reqPost.write(reqBody);
    reqPost.end();
    reqPost.on('error', function(e) {});

}).post('/post_vendor', function(req, res, next) {
    var token = req.cookies.access_token;
    var reqBody = JSON.stringify(req.body);
    var postheaders = {
        'Content-Type': 'application/json; charset=UTF-8',
        'Content-Length': Buffer.byteLength(reqBody, 'utf8')
    };
    // the post options  
    var optionspost = {
        host: global.hostAddress,
        port: global.portNum,
        path: global.ctx + '/vendor?access_token=' + token,
        method: 'PUT',
        headers: postheaders
    };
    var reqPost = http.request(optionspost, function(resPost) {
        resPost.on('data', function(d) {
            res.send(d);
        });
    });
    reqPost.write(reqBody);
    reqPost.end();
    reqPost.on('error', function(e) {});

}).post('/updateFile', multipartMiddleware, function(req, res, next) {
    var token = req.cookies.access_token;
    var files1 = req.files.file;
    var doType = req.body.doType;
    var id = req.body.id;
    var boundaryKey = Math.random().toString(16);
    var optionspost = {
        host: global.hostAddress,
        port: global.portNum,
        path: global.ctx + '/product/update?access_token=' + token + '&doType=' + doType + '&id=' + id,
        method: 'POST'
    };
    var reqPost = http.request(optionspost, function(resPost) {
        resPost.on('data', function(d) {
            res.send(d);
        });
    });
    var payload = '--' + boundaryKey + '\r\n' + 'Content-Type: image/jpeg\r\n' + 'Content-Disposition: form-data; name="pic"; filename="' + files1.name + '"\r\n' + 'Content-Transfer-Encoding: binary\r\n\r\n';
    var enddata = '\r\n--' + boundaryKey + '--';
    reqPost.setHeader('Content-Type', 'multipart/form-data; boundary=' + boundaryKey + '');
    reqPost.setHeader('Content-Length', Buffer.byteLength(payload) + Buffer.byteLength(enddata) + files1.size);
    reqPost.write(payload);
    var fileStream = fs.createReadStream(files1.path, { bufferSize: 4 * 1024 });
    fileStream.pipe(reqPost, { end: false });
    fileStream.on('end', function(d) {
        reqPost.end(enddata);
    });
    fileStream.on('close', function(d) {});
    reqPost.on('error', function(e) {

    });
}).post('/suggest', function(req, res, next) {
    var token = req.cookies.access_token;
    var reqJosnData = JSON.stringify(req.body);
    var method = 'POST';
    var postheaders = {
        'Content-Type': 'application/json; charset=UTF-8',
        'Content-Length': Buffer.byteLength(reqJosnData, 'utf8')
    };
    var optionspost = {
        host: global.hostAddress,
        port: global.portNum,
        path: global.ctx + '/feedback?access_token=' + token,
        method: method,
        headers: postheaders
    };
    var reqPost = http.request(optionspost, function(resPost) {
        resPost.on('data', function(d) {
            res.send(d);
        });
    });
    reqPost.write(reqJosnData);
    reqPost.end();
    reqPost.on('error', function(e) {});
}).post('/verification', function(req, res, next) {
    var token = req.cookies.access_token;
    var reqJosnData = JSON.stringify(req.body);
    var method = 'POST';
    var postheaders = {
        'Content-Type': 'application/json; charset=UTF-8',
        'Content-Length': Buffer.byteLength(reqJosnData, 'utf8')
    };
    var optionspost = {
        host: global.hostAddress,
        port: global.portNum,
        path: global.ctx + '/userInfo/checkVerification',
        method: method,
        headers: postheaders
    };
    var reqPost = http.request(optionspost, function(resPost) {
        resPost.on('data', function(d) {
            res.send(d);
        });
    });
    reqPost.write(reqJosnData);
    reqPost.end();
    reqPost.on('error', function(e) {});
}).post('/checkToken', function(req, res, next) {
    var tokens = req.body.tokens;
    var data = { userName: req.body.userName }
    var reqJosnData = JSON.stringify(data);
    var method = 'POST';
    var postheaders = {
        'Content-Type': 'application/json; charset=UTF-8',
        'Content-Length': Buffer.byteLength(reqJosnData, 'utf8')
    };
    var optionspost = {
        host: global.hostAddress,
        port: global.portNum,
        path: global.ctx + '/userInfo/checkToken?token=' + tokens,
        method: method,
        headers: postheaders
    };
    var reqPost = http.request(optionspost, function(resPost) {
        resPost.on('data', function(d) {
            res.send(d);
        });
    });
    reqPost.write(reqJosnData);
    reqPost.end();
    reqPost.on('error', function(e) {});
}).post('/changeTel', function(req, res, next) {
    var token = req.cookies.access_token;
    var reqJosnData = JSON.stringify(req.body);
    var method = 'POST';
    var postheaders = {
        'Content-Type': 'application/json; charset=UTF-8',
        'Content-Length': Buffer.byteLength(reqJosnData, 'utf8')
    };
    var optionspost = {
        host: global.hostAddress,
        port: global.portNum,
        path: global.ctx + '/userInfo/changeTel?access_token=' + token,
        method: method,
        headers: postheaders
    };
    var reqPost = http.request(optionspost, function(resPost) {
        resPost.on('data', function(d) {
            res.send(d);
        });
    });
    reqPost.write(reqJosnData);
    reqPost.end();
    reqPost.on('error', function(e) {});
}).post('/updateMedia', function(req, res, next) {
    var token = req.cookies.access_token;
    var reqBody = JSON.stringify(req.body);
    var postheaders = {
        'Content-Type': 'application/json; charset=UTF-8',
        'Content-Length': Buffer.byteLength(reqBody, 'utf8')
    };
    // the post options  
    var optionspost = {
        host: global.hostAddress,
        port: global.portNum,
        path: global.ctx + '/product/update?access_token=' + token,
        method: 'POST',
        headers: postheaders
    };
    var reqPost = http.request(optionspost, function(resPost) {
        resPost.on('data', function(d) {
            res.send(d);
        });
    });
    reqPost.write(reqBody);
    reqPost.end();
    reqPost.on('error', function(e) {});
}).get('/detail/drama', function(req, res, next) {
    var param = req.query.id;
    var token = req.cookies.access_token;
    var getheaders = {
        'Content-Type': 'application/json; charset=UTF-8'
    };
    var optionspost = {
        host: global.hostAddress,
        port: global.portNum,
        path: global.ctx + '/drama/' + param + '?access_token=' + token,
        method: 'GET',
        headers: getheaders,
    };

    var str = '';
    var decoder = new stringDecoder('UTF-8');
    http.request(optionspost, function(response) {
        response.on('data', function(data) {
            str += decoder.write(data);
        });
        response.on('end', function() {
            res.send(str);
        });

    }).end();
}).post('/advisory', function(req, res, next) {
    var token = req.cookies.access_token;
    var reqJosnData = JSON.stringify(req.body);

    var method = 'POST';
    // 接收客户端的JSON数据  
    // do a POST request  
    var postheaders = {
        'Content-Type': 'application/json; charset=UTF-8',
        'Content-Length': Buffer.byteLength(reqJosnData, 'utf8')
    };

    // the post options  
    var optionspost = {
        host: global.hostAddress,
        port: global.portNum,
        path: global.ctx + '/advisory?access_token=' + token,
        method: method,
        headers: postheaders
    };

    // do the POST call  
    var reqPost = http.request(optionspost, function(resPost) {
        resPost.on('data', function(d) {
            res.send(d);
        });
    });

    // write the json data  

    // 发送REST请求时传入JSON数据  
    reqPost.write(reqJosnData);
    reqPost.end();
    reqPost.on('error', function(e) {});
}).get('/download', function(req, res, next) {
    var token = req.cookies.access_token;
    var param = req.query.id;
    var getheaders = {
        'Content-Type': 'application/json; charset=UTF-8',
        'ip_address': req.hostname
    };
    var optionspost = {
        host: global.hostAddress,
        port: global.portNum,
        path: global.ctx + '/downLoad/attractInvestment/' + param + '?access_token=' + token,
        method: 'GET',
        headers: getheaders,
    };

    var internalReq = http.request(optionspost, function(internalRes) {
        res.setHeader("Content-Disposition", "attachment;");
        res.writeHead(internalRes.statusCode, internalRes.headers);
        internalRes.pipe(res);
    });
    internalReq.end();
}).get('/region', function(req, res, next) {
    //查询地区
    var type = req.query.type;
    var id = req.query.id;
    var getheaders = {
        'Content-Type': 'application/json; charset=UTF-8'
    };

    var path = global.ctx + '/select/region';
    if (type == 'district') {
        path += '?len=6'
    } else if (type == 'city') {
        path += '?len=4'
    } else if (type == 'province') {
        path += '?len=2'
    }
    if (id != null) {
        path += '&id=' + id;
    }

    var optionspost = {
        host: global.hostAddress,
        port: global.portNum,
        path: path, //firstPinyin
        method: 'GET',
        headers: getheaders,
    };

    var str = '';
    var decoder = new stringDecoder('UTF-8');
    http.request(optionspost, function(response) {
        response.on('data', function(data) {
            str += decoder.write(data);
        });
        response.on('end', function() {
            res.send(str);
        });

    }).end();
}).post('/user/user_post_info', function(req, res, next) {
    //user info update 
    var token = req.cookies.access_token;
    var reqJosnData = JSON.stringify(req.body);
    var postheaders = {
        'Content-Type': 'application/json; charset=UTF-8',
        'Content-Length': Buffer.byteLength(reqJosnData, 'utf8')
    };
    var optionspost = {
        host: global.hostAddress,
        port: global.portNum,
        path: global.ctx + '/userInfo?access_token=' + token,
        method: 'POST',
        headers: postheaders
    };
    // do the POST call  
    var reqPost = http.request(optionspost, function(resPost) {
        resPost.on('data', function(d) {
            res.send(d);
        });
    });

    // 发送REST请求时传入JSON数据  
    reqPost.write(reqJosnData);
    reqPost.end();
    reqPost.on('error', function(e) {});
}).post('/user/change_email/', function(req, res, next) {
    //重新绑定邮箱
    var email = req.query.email;
    var token = req.cookies.access_token;
    var reqJosnData = JSON.stringify({
        'email': email
    });
    // 接收客户端的JSON数据  
    // do a POST request  
    var postheaders = {
        'Content-Type': 'application/json; charset=UTF-8',
        'Content-Length': Buffer.byteLength(reqJosnData, 'utf8')
    };

    // the post options  
    var optionspost = {
        host: global.hostAddress,
        port: global.portNum,
        path: global.ctx + '/userInfo/changeEmail?access_token=' + token,
        method: 'POST',
        headers: postheaders
    };

    // do the POST call  
    var reqPost = http.request(optionspost, function(resPost) {
        resPost.on('data', function(d) {
            res.send(d);
        });
    });

    // write the json data  
    // 发送REST请求时传入JSON数据  
    reqPost.write(reqJosnData);
    reqPost.end();
    reqPost.on('error', function(e) {});
}).post('/user/activate_email', function(req, res, next) {
    //邮箱激活
    var token = req.cookies.access_token;
    var emailToken = req.query.token;
    var optionspost = {
        host: global.hostAddress,
        port: global.portNum,
        path: global.ctx + '/userInfo/emailActivate?access_token=' + token + '&email_token=' + emailToken,
        method: 'POST'
    };

    // do the POST call  
    var reqPost = http.request(optionspost, function(resPost) {
        resPost.on('data', function(d) {
            res.send(d);
        });
    });
    // 发送REST请求时传入JSON数据  
    // reqPost.write(reqJosnData);
    reqPost.end();
    reqPost.on('error', function(e) {});
}).get('/get_client', function(req, res, next) {
    var token = req.cookies.access_token;
    var getheaders = {
        'Content-Type': 'application/json; charset=UTF-8'
    };
    var optionspost = {
        host: global.hostAddress,
        port: global.portNum,
        path: global.ctx + '/client?access_token=' + token,
        method: 'GET',
        headers: getheaders,
    };

    var str = '';
    var decoder = new stringDecoder('UTF-8');
    http.request(optionspost, function(response) {
        response.on('data', function(data) {
            str += decoder.write(data);
        });
        response.on('end', function() {
            res.send(str);
        });

    }).end();
}).get('/get_vendor', function(req, res, next) {
    var token = req.cookies.access_token;
    var getheaders = {
        'Content-Type': 'application/json; charset=UTF-8'
    };
    var optionspost = {
        host: global.hostAddress,
        port: global.portNum,
        path: global.ctx + '/vendor?access_token=' + token,
        method: 'GET',
        headers: getheaders,
    };

    var str = '';
    var decoder = new stringDecoder('UTF-8');
    http.request(optionspost, function(response) {
        response.on('data', function(data) {
            str += decoder.write(data);
        });
        response.on('end', function() {
            res.send(str);
        });

    }).end();
}).get('/user/advisory/list/', function(req, res, next) {
    //获取咨询列表
    var getheaders = {
        'Content-Type': 'application/json; charset=UTF-8'
    };
    var params = '&page=' + req.query.page + '&rows=' + req.query.rows;
    var token = req.cookies.access_token;

    var optionspost = {
        host: global.hostAddress,
        port: global.portNum,
        path: global.ctx + '/advisory/list?access_token=' + token + params,
        method: 'GET',
        headers: getheaders,
    };
    var str = '';
    http.request(optionspost, function(response) {
        response.on('data', function(data) {
            str += data;
        });
        response.on('end', function() {
            res.send(str);
        });
    }).end();
}).delete('/user/advisory', function(req, res, next) {
    var id = req.query.id;
    var token = req.cookies.access_token;
    var method = 'delete';
    var optionspost = {
        host: global.hostAddress,
        port: global.portNum,
        path: global.ctx + '/advisory/' + id + '?access_token=' + token,
        method: method
    };
    var reqPost = http.request(optionspost, function(resPost) {
        resPost.on('data', function(d) {
            res.send(d);
        });
    });
    reqPost.end();
    reqPost.on('error', function(e) {});
}).post('/user/send_activate_email/', function(req, res, next) {
    //邮件重新发送
    var token = req.cookies.access_token;
    var optionspost = {
        host: global.hostAddress,
        port: global.portNum,
        path: global.ctx + '/userInfo/sendActivateEmail?access_token=' + token,
        method: 'POST'
    };

    // do the POST call  
    var reqPost = http.request(optionspost, function(resPost) {
        resPost.on('data', function(d) {
            res.send(d);
        });
    });

    // 发送REST请求时传入JSON数据  
    reqPost.end();
    reqPost.on('error', function(e) {});
}).get('/media', function(req, res, next) {
    var id=req.query.id;
    //获取咨询列表
    var getheaders = {
        'Content-Type': 'application/json; charset=UTF-8'
    };
    var token = req.cookies.access_token;

    var optionspost = {
        host: global.hostAddress,
        port: global.portNum,
        path: global.ctx + '/product/'+id+'?access_token=' + token ,
        method: 'GET',
        headers: getheaders,
    };
    var str = '';
    http.request(optionspost, function(response) {
        response.on('data', function(data) {
            str += data;
        });
        response.on('end', function() {
            res.send(str);
        });
    }).end();
}).get('/media/list', function(req, res, next) {
    //获取咨询列表
    var getheaders = {
        'Content-Type': 'application/json; charset=UTF-8'
    };
    var params = '&page=' + req.query.page + '&rows=' + req.query.rows;
    var token = req.cookies.access_token;

    var optionspost = {
        host: global.hostAddress,
        port: global.portNum,
        path: global.ctx + '/product/list?access_token=' + token + params,
        method: 'GET',
        headers: getheaders,
    };
    var str = '';
    http.request(optionspost, function(response) {
        response.on('data', function(data) {
            str += data;
        });
        response.on('end', function() {
            res.send(str);
        });
    }).end();
}).delete('/media', function(req, res, next) {
    var id = req.query.id;
    var token = req.cookies.access_token;
    var method = 'delete';
    var optionspost = {
        host: global.hostAddress,
        port: global.portNum,
        path: global.ctx + '/product/delete/' + id + '?access_token=' + token,
        method: method
    };
    var reqPost = http.request(optionspost, function(resPost) {
        resPost.on('data', function(d) {
            res.send(d);
        });
    });
    reqPost.end();
    reqPost.on('error', function(e) {});
}).get('/load_type', function(req, res, next) {
        var type=req.query.type;
        var getheaders = {
            'Content-Type': 'application/json; charset=UTF-8'
        };
        var optionspost = {
            host: global.hostAddress,
            port: global.portNum,
            path: global.ctx + '/drama/type_lists?type='+type,
            method: 'GET',
            headers: getheaders,
        };
    var str = '';
    http.request(optionspost, function(response) {
        response.on('data', function(data) {
            str += data;
        });
        response.on('end', function() {
            res.send(str);
        });
    }).end();
}).get('/load_staff', function(req, res, next) { //
    var getheaders = {
        'Content-Type': 'application/json; charset=UTF-8'
    };
    var optionspost = {
        host: global.hostAddress,
        port: global.portNum,
        path: global.ctx + '/staff/lists',
        method: 'GET',
        headers: getheaders,
    };

    var str = '';
    http.request(optionspost, function(response) {
        response.on('data', function(data) {
            str += data;
        });
        response.on('end', function() {
            res.send(str);
        });
    }).end();
}).get('/load_banner', function(req, res, next) {
    var getheaders = {
        'Content-Type': 'application/json; charset=UTF-8'
    };
    var optionspost = {
        host: global.hostAddress,
        port: global.portNum,
        path: global.ctx + '/banner/list',
        method: 'GET',
        headers: getheaders,
    };
    var str = '';
    http.request(optionspost, function(response) {
        response.on('data', function(data) {
            str += data;
        });
        response.on('end', function() {
            res.send(str);
        });
    }).end();
});
module.exports = router;