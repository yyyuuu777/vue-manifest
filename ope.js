let _$ = Object.create({});
(()=>
  {
    let fs = require('fs');
    let file = "./dist/cache.manifest";
    let jsPath = "./dist/static/js";
    let cssPath = "./dist";
    let commonFont =
      `
 ./static/fonts/MaterialIcons-Regular.570eb83.woff2
 ./static/fonts/Roboto-Regular.b2a6341.woff2
 ./static/fonts/Roboto-Bold.ab96cca.woff2
 ./static/fonts/Roboto-Medium.2741a14.woff2
 ./static/fonts/Roboto-RegularItalic.df8e3a9.woff2
 ./static/fonts/MaterialIcons-Regular.012cf6a.woff
 ./static/fonts/Roboto-Regular.081b11e.woff
 ./static/fonts/Roboto-Bold.ad140ff.woff
 ./static/fonts/Roboto-Medium.303ded6.woff
 ./static/fonts/Roboto-RegularItalic.8add1ba.woff
 ./static/fonts/MaterialIcons-Regular.a37b0c0.ttf
 ./static/fonts/Roboto-Regular.99b14f0.ttf
 ./static/fonts/Roboto-Bold.56a76a2.ttf
 ./static/fonts/Roboto-Medium.c54f2a3.ttf
 ./static/fonts/Roboto-RegularItalic.90dbf90.ttf

 NETWORK:
 *
 `;
    let commonString = `CACHE MANIFEST
#2017-01-01
#Version 21

CACHE:
index.html
     `;
    String.prototype.endWith=function(s){
      if(s==null||s==""||this.length==0||s.length>this.length)
        return false;
      if(this.substring(this.length-s.length)==s)
        return true;
      else
        return false;
      return true;
    }
    var Manifest = function(){
    }

    Manifest.prototype.listInjectDir  = async function(dir,tag){
	console.log(`be operated dir is${dir}`);
      await this.readFile(dir).then(files=>{
        for(let i=0,len = files.length;i<len;i++){
          let fileName = files[i];
          fileName = tag?`./${fileName}`:`./static/js/${fileName}`;
          console.log('file name is'+fileName+' end with css ?'+fileName.endWith('.css'))
          fileName.endWith('.css')>0||fileName.endWith('.js')>0?this.writeFile(file,`${fileName}\n`):'';
        }
      }).catch(err=>console.log(err));
      console.log("------------test run order ----------------")
      if(tag){
        await this.writeFile(file,commonFont)
        return;
      };
      this.listInjectDir(cssPath,true);
    }

    Manifest.prototype.writeFile = function(file,str){
      return new Promise((resolve,reject)=>{
        fs.appendFile(file, str, function(err){
          console.log(err?`the error is --> ${err}`:`write file done`);
          err&&reject()||reject();
        });
      }).catch(err=>{console.log(err)})
    }

    Manifest.prototype.readFile = function (file){
      fs.readFile(file,"utf-8",function(err, data){
        console.log(err?`read file error --> ${err}`:data)
      });
    }

    Manifest.prototype.readFile = function(file) {
      return new Promise((resolve,reject)=>{
        fs.readdir(file,(err,files)=>{
          err&&reject()||resolve(files);
        })
      })
    }

    Manifest.prototype.run = function(){
      this.writeFile(file,commonString);
      this.listInjectDir(jsPath,false);
      this.readFile(file);
    }
    Manifest.prototype.injectManifest = function(){
    }
    _$.Manifest = Manifest;
  }
)();

let manifest = new _$.Manifest();
manifest.run();

