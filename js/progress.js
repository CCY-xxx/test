(function(window){
	function Progress($progressBar,$progressLine,$progressDot){
		return new Progress.prototype.init($progressBar,$progressLine,$progressDot);
	}
	Progress.prototype={
		construtor:Progress,
	    isMove:false,
		init:function($progressBar,$progressLine,$progressDot){
			this.$progressBar=$progressBar;
			this.$progressLine=$progressLine;
			this.$progressDot=$progressDot;
		},
	progressClick:function(callBack){
		var $this=this;
		//监听背景的点击
		this.$progressBar.click(function(event){
			//获取背景距离窗口默认的位置
			var normalLeft=$this.$progressBar.offset().left;
			//在这里$this.$progressBar同等于$(this);
			//获取点击位置距离窗口的位置
			var eventLeft=event.pageX;
			//设置前景的宽度
			$this.$progressLine.css("width",eventLeft-normalLeft);
			$this.$progressDot.css("left",eventLeft-normalLeft);
			//计算进度条的比例
			var value=(eventLeft-normalLeft)/$(this).width();
			callBack(value);
		})
	},
	progressMove:function(callBack){
		var $this=this;
		var normalLeft=this.$progressBar.offset().left;
		var eventLeft;
		var barWidth=this.$progressBar.width();
		//监听鼠标的按下事件
		this.$progressBar.mousedown(function(){
			$this.isMove=true;
			//获取背景距离窗口默认的位置
			
			//监听鼠标的移动事件
			$(document).mousemove(function(event){
	//获取点击位置距离窗口的位置
			eventLeft=event.pageX;
			var offset=eventLeft-normalLeft;
			if(offset>=0&&offset<=barWidth){
			//设置前景的宽度
			$this.$progressLine.css("width",eventLeft-normalLeft);
			$this.$progressDot.css("left",eventLeft-normalLeft);
				var value=(eventLeft-normalLeft)/$(this).width();
				callBack(value);
			}
			
		})
		})
		
		//监听鼠标的抬起事件
		$(document).mouseup(function(){
			$(document).off("mousemove");
			$this.isMove=false;
			//计算进度条的比例
			var value=(eventLeft-normalLeft)/$this.$progressBar.width();
			callBack(value);
		})
	
	},
	setProgress:function(value){
		if(this.isMove) return;
		if(value<0||value>100) return;
		this.$progressLine.css({
			width:value+"%"
		});
		this.$progressDot.css({
			left:value+"%"
		})
	}
}
	Progress.prototype.init.prototype=Progress.prototype;
	window.Progress=Progress;
})(window);
