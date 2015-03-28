
$(function(){
	var app=new App();

	app.init();

	$("#download_css").bind("click",function(){
		var css=app.genCss(app.sprites);
		app.downloadCSS('sprite.css',css);
	})
	//
	$("#canvasSizedb").change(function(){
		var _val=$(this).val();
		if(_val=="Custom Size"){
			//$('#customControls').fadeIn();
			$("#customSize input").removeAttr("disabled");
		 }else{
			 //hide custom controls
			$("#customSize input").removeAttr("disabled");
			 var size=_val.split('x');
			 app.config.stageWidth=size[0];
			 app.config.stageHeight=size[1];
			 if($('#transprentBg').prop('checked')){
			 	app.draw(app.ctx,app.sprites,app.config.stageWidth,app.config.stageHeight);
			 }else{
				 var bgColor=$("#bgColor").val();
				 app.draw(app.ctx,app.sprites,app.config.stageWidth,app.config.stageHeight,bgColor);
			 }
		 }
	});
	//
	$("#resizeBtn").bind('click',function(){
		var _width=$("#customSize input").eq(0).val();
		var _height=$("#customSize input").eq(1).val();
		if(!isNaN(_width+_height)){
			app.config.stageWidth=_width;
			app.config.stageHeight=_height;
			
			if($('#transprentBg').prop('checked')){
			 	app.draw(app.ctx,app.sprites,app.config.stageWidth,app.config.stageHeight);
			 }else{
				 var bgColor=$("#bgColor").val();
				 app.draw(app.ctx,app.sprites,app.config.stageWidth,app.config.stageHeight,bgColor);
			 }
		}
	})
	//
	$("#transprentBg").change(function(){
		if(this.checked){
			//No background color
			app.draw(app.ctx,app.sprites,app.config.stageWidth,app.config.stageHeight);
			$('#bgColor').attr('disabled','disabled');
		}else{
			app.draw(app.ctx,app.sprites,app.config.stageWidth,app.config.stageHeight,app.config.bgColor);
			$('#bgColor').removeAttr('disabled');
		}
	});
	//
	$('#bgColor').change(function(){
		var size=$("#canvasSizedb").val().split("x");
		app.config.stageWidth=size[0];
		app.config.stageHeight=size[1];
		app.config.bgColor=this.value;
		app.draw(app.ctx,app.sprites,app.config.stageWidth,app.config.stageHeight,app.config.bgColor);
		//alert(this.value);
	});
	//
	$('#optimizeButton').bind("click",function(){
		var _quality=$('#quality').val();
		var _type=$("#imageType").val();
		var img=$('<img>').attr('src',app.getImage(_type,_quality/100));
		$("#popContent").html(img[0])
		$("#fileSize").text("size: "+(dataURItoBlob(app.getImage(_type,_quality/100)).size/1024).toFixed(2)+"kb");
	});
	//
	$('#closeBtn').bind("click",function(){
		$('#popup').fadeOut();
	});
	//
	$("#showSprite").bind("click",function(){
		$('#popup').fadeIn();		
		var _type=$("#imageType").val();
		
		//var dataURL=app.stage[0].toDataURL("image/"+$("#imageType").val())
		var img=$("<img>").attr('src',app.getImage(_type,1));
		$("#popContent").html(img);
		$("#fileSize").text("size: "+(dataURItoBlob(app.getImage(_type,1)).size/1024).toFixed(2)+"kb");
		console.log($("#fileSize").text());
		
	});
	//downloadPng
	$("#download_Sprite").bind("click",function(){
		var _type=$("#imageType").val();
		var dataURL=$("#popContent img")[0].src;
		app.downloadSprite('sprite.'+_type,dataURL);		
	})
	
	
	//
	function dataURItoBlob(dataURI) {
		var byteString = atob(dataURI.split(',')[1]);
		var mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];
	
		// write the bytes of the string to an ArrayBuffer
		var ab = new ArrayBuffer(byteString.length);
		var ia = new Uint8Array(ab);
		for (var i = 0; i < byteString.length; i++) {
			ia[i] = byteString.charCodeAt(i);
		}
	
		// write the ArrayBuffer to a blob, and you're done
		var bb = new Blob([ab]);
		return bb;
	}
});