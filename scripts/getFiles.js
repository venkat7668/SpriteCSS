var getFiles=function(el,arr,cb,arg){
$(el).bind('drop',function(e){
	    var isLoaded=0;
		var files = e.originalEvent.dataTransfer.files;
		var f=0,fl=files.length;
			for(;f<fl; f++){
				var fReader=new FileReader();				
					fReader.onload=(function(file){						
						var fileName=file.name;
						
						return function(e){
							var lastIndex=fileName.lastIndexOf(".");
							fileName.replace(/\./g,"_");
							fileName=fileName.substr(0,lastIndex);
							
							var img = new Image();
							img.src=e.target.result;
							img.onload=function(){ 
							
								if(img.width<=arg[1].config.stageWidth && img.height<=arg[1].config.stageHeight){
									arr.push({w:img.width,h:img.height,img:img,name:fileName});
										if(isLoaded){
											cb.call(arg[1],arg[0],arr,arg[2],arg[3]);
										}
									}//pushing into array
							}
						}
				})(files[f])
				//console.log(files[f]);
				fReader.readAsDataURL(files[f]);
				if(f==fl-1){
					isLoaded=1;
				}
			}			
		e.stopPropagation();
		e.preventDefault();		
		});
		
	$(el).bind('dragover',function(e){
		e.stopPropagation();
		e.preventDefault();
		});
}