(function(window){
	function Lyric(path){
		return new Lyric.prototype.init(path);
	}
	Lyric.prototype={
		construtor:Lyric,
        
		init:function(path){
			this.path=path;
		},
		times:[],
		lyrics:[],
		index:-1,
        loadLyric:function(callBack){
        	var $this=this;
        	
        	$.ajax({
			
			url:$this.path,
			dataType:"text",
			success:function(data){
//				console.log(data);
			$this.parseLyric(data);
			callBack();
			},
			error:function(e){
				console.log(e);
			}
		});
        },
        parseLyric:function(data){
        	var $this=this;
        	//清空
        	$this.times=[];
        	$this.lyrics=[];
        	var array=data.split("\n");
//      	console.log(array);

            var timeReg=/\[(\d*:\d*\.\d*)\]/

//遍历取出每一条歌词
        
		$.each(array,function(index,ele){
		//处理歌词
		var lrc=ele.split("]")[1];
		//排除空字符串（没有歌词的）
		if(lrc==null) 
		return;
		$this.lyrics.push(lrc);
	//	console.log(ele);
		var res=timeReg.exec(ele);
	//	console.log(res);		
		if(res==null) return true;
		var timeStr=res[1];
		var res2=timeStr.split(":");
		var min=parseInt(res2[0]*60);
		var sec=parseFloat(res2[1]);
		var time=parseFloat(Number(min+sec).toFixed(2));
		//	console.log(time);
		$this.times.push(time);
		
		});
	//	console.log($this.times);
	//	console.log($this.lyrics);
	        },
	    currentIndex:function(currentTime){
	//  	console.log(currentTime);
		if(currentTime>=this.times[0]){
		this.index++;
		this.times.shift();
		}
		return this.index;
	    	}
	    
	}
	Lyric.prototype.init.prototype=Lyric.prototype;
	window.Lyric=Lyric;
})(window);
