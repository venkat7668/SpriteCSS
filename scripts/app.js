var App=function(){};


App.prototype={
	init:function(){
		//drop files target	
		this.dropTarget=$(this.config.stage);
		//sprites array
		this.sprites=[];
		//canvas stage
		this.stage=$(this.config.stage);
		this.stage.attr({width:this.config.stageWidth,height:this.config.stageHeight}).css({width:this.config.stageWidth+"px",height:this.config.stageHeight+"px"});
		this.ctx=this.stage[0].getContext('2d');
		
		
		//bind event
		getFiles(this.dropTarget,this.sprites,this.draw,[this.ctx,this,this.config.stageWidth,this.config.stageHeight]);
	},
	clearCtx:function(ctx){
		ctx.clearRect(0,0,this.config.stageWidth,this.config.stageHeight);
	},
	fillRect:function(ctx,x,y,width,height,color){
		ctx.fillStyle=color;
		ctx.fillRect(x,y,width,height);
	},
	
	config:{
		stageWidth:1024,
		stageHeight:700,
		stage:"#stage",
		dropTarget:"#canvasRoot",
		thumbId:"#thumSprite",
		bgColor:"#ffffff",
		imgType:"#imageType"
	},
	
	draw:function(ctx,images,width,height,bgColor){
		width=this.config.stageWidth;
		height=this.config.stageHeight;
		//clear canvas
		this.clearCtx(ctx);
		//resize canvas
		this.stage.attr({width:width,height:height}).css({width:width+"px",height:height+"px"});
		
		var packer=new Packer(width,height);
		images.sort(function(a,b){return a.w < b.w});
		packer.fit(images);
		
		
		if(bgColor){
			this.fillRect(ctx,0,0,width,height,bgColor);
		}
		//draw on canvas
		var i=0,il=images.length;
		for(; i<il; i++){
			ctx.drawImage(images[i].img,images[i].fit.x,images[i].fit.y,images[i].w,images[i].h);
		}
		//generate thumbnail
		/*var img=$(this.config.stage)[0].toDataURL("image/png");
		$(this.config.thumbId).attr('src',img);*/
	},
	getImage:function(type,quality){
		return $(this.config.stage)[0].toDataURL("image/"+type,quality);
	},
	genCss:function(obj){
		var i=0, il=obj.length;
		var _type=$(this.config.imgType).val();
		var css="";
		css+=".sprite{background-image:url(sprite."+_type+");}/*change image name if you want*/\n\n"
		for(; i<il; i++){
			css+="."+obj[i].name+"{width:"+obj[i].w+"px; height:"+obj[i].h+"px; background-position: -"+obj[i].fit.x+"px -"+obj[i].fit.y+"px;}\n\n";
		}
		return css;
	},
	downloadCSS:function download(filename, text) {
			var a = document.createElement('a');
			a.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
			a.setAttribute('download', filename);
			a.click();
	},
	downloadSprite:function(filename,datauri){
		var a = document.createElement('a');
		a.setAttribute('href', datauri);
		a.setAttribute('download', filename);
		a.click();
	}
	
}
