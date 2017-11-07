## 移动端

### viewport 视口(可视区窗口)

		默认不设置viewport一般可视区宽度在移动端是980
		
		width  可视区的宽度 (number||device-width)
		
		user-scalable 是否允许用户缩放 (yes||no) iOS10无效
		
		initial-scale 初始缩放比例
		
		minimum-scale 最小缩放比例
		
		maximum-scale 最大缩放比例

### meta设置

```
		<!DOCTYPE html>
		<html lang="en">
		<head>
		<meta charset="UTF-8">
		<title>Document</title>
		<meta name="viewport" content="width=device-width,user-scalable=no">
		<!--QQ强制竖屏显示-->
		<meta name="x5-orientation" content="portrait" />
		<!--QQ全屏显示-->
		<meta name="x5-fullscreen" content="true" />
		<!--UC强制竖屏显示-->
		<meta name="screen-orientation" content="portrait">
		<!--UC全屏显示-->
		<meta name="full-screen" content="yes">
		<!--禁止识别电话号码和邮箱地址-->
		<meta name="format-detection" content="telephone=no, email=no" />
		<!--页面适合在pc和mobile上进行浏览-->
		<meta name="applicable-device" content="pc, mobile">
		<!--针对Apple是否启动WebApp功能-->
		<meta name="apple-mobile-web-app-capable" content="yes">
		<!--Apple顶部导航栏颜色-->
		<meta name="apple-mobile-web-app-status-bar-style" content="black">
		</head>
		<body>
			<!--
				href="tel:"
				href="mailto:"
			-->
			<p>13888888888</p>
			<a href="tel:18888888888">请拨打电话18888888888</a>
			<a href="mailto:zyh@qq.com">请发送邮件</a>
		</body>
		</html>
```

### 默认样式设置

```
	    <!DOCTYPE html>
	    <html lang="en">
	    <head>
	    <meta charset="UTF-8">
	    <title>Document</title>
	    <meta name="viewport" content="width=device-width,user-scalable=no">
	    <style type="text/css">
	    /*默认字体设置*/
	    body {
	    	font-family: Helvetica;
	    }
	    body * {
	    	/*禁止文字缩放*/
	    	-webkit-text-size-adjust: 100%;
	    	/*选中文字设置*/
	    	-webkit-user-select: none; 
	    }
	    /*清除点击阴影*/
	    a,input,button {
	    	-webkit-tap-highlight-color: rgba(0, 0, 0, 0);
	    	/*-webkit-tap-highlight-color: transparent*/
	    }
	    /*消除圆角按钮（针对iOS系统）*/
	    input,button {
	    	-webkit-appearance: none;
	    	border-radius: 0;
	    }
	    </style>
	    </head>
	    <body>
	    	<a href="http://www.baidu.com">百度一下</a>
	    	<input type="button" value="按钮">
	    </body>
	    </html>
```

### 动态获取像素比

```
	!function(e, t) {
		function i() {
			var t = n.getBoundingClientRect().width;
			t / d > 540 && (t = 540 * d);
			var i = t / 10;
			n.style.fontSize = i + "px", p.rem = e.rem = i
		}
		var a, r = e.document,
			n = r.documentElement,
			o = r.querySelector('meta[name="viewport"]'),
			l = r.querySelector('meta[name="flexible"]'),
			m = r.querySelector('meta[name="flexible-in-x5"]'),
			s = !0,
			d = 0,
			c = 0,
			p = t.flexible || (t.flexible = {});
		if (o) {
			console.warn("将根据已有的meta标签来设置缩放比例");
			var u = o.getAttribute("content").match(/initial\-scale=([\d\.]+)/);
			u && (c = parseFloat(u[1]), d = parseInt(1 / c))
		} else if (l) {
			var f = l.getAttribute("content");
			if (f) {
				var v = f.match(/initial\-dpr=([\d\.]+)/),
					h = f.match(/maximum\-dpr=([\d\.]+)/);
				v && (d = parseFloat(v[1]), c = parseFloat((1 / d).toFixed(2))), h && (d = parseFloat(h[1]), c = parseFloat((1 / d).toFixed(2)))
			}
		}
		if (m && (s = "false" !== m.getAttribute("content")), !d && !c) {
			var x = (e.navigator.appVersion.match(/android/gi), e.chrome),
				g = e.navigator.appVersion.match(/iphone/gi),
				b = e.devicePixelRatio,
				w = /TBS\/\d+/.test(e.navigator.userAgent),
				y = !1;
			try {
				y = "true" === localStorage.getItem("IN_FLEXIBLE_WHITE_LIST")
			} catch (e) {
				y = !1
			}
			d = g || x || w && s && y ? b >= 3 && (!d || d >= 3) ? 3 : b >= 2 && (!d || d >= 2) ? 2 : 1 : 1, c = 1 / d
		}
		if (n.setAttribute("data-dpr", d), !o) if (o = r.createElement("meta"), o.setAttribute("name", "viewport"), o.setAttribute("content", "initial-scale=" + c + ", maximum-scale=" + c + ", minimum-scale=" + c + ", user-scalable=no"), n.firstElementChild) n.firstElementChild.appendChild(o);
		else {
			var E = r.createElement("div");
			E.appendChild(o), r.write(E.innerHTML)
		}
		e.addEventListener("resize", function() {
			clearTimeout(a), a = setTimeout(i, 300)
		}, !1), e.addEventListener("pageshow", function(e) {
			e.persisted && (clearTimeout(a), a = setTimeout(i, 300))
		}, !1), "complete" === r.readyState ? r.body.style.fontSize = 12 * d + "px" : r.addEventListener("DOMContentLoaded", function(e) {
			r.body.style.fontSize = 12 * d + "px"
		}, !1), i(), p.dpr = e.dpr = d, p.refreshRem = i, p.rem2px = function(e) {
			var t = parseFloat(e) * this.rem;
			return "string" == typeof e && e.match(/rem$/) && (t += "px"), t
		}, p.px2rem = function(e) {
			var t = parseFloat(e) / this.rem;
			return "string" == typeof e && e.match(/px$/) && (t += "rem"), t
		}
	}(window, window.lib || (window.lib = {}))
```

### 像素比简单设置

		//获取像素比
		var pixclPatio = 1 / window.devicePixelRatio;
		//写入meta
		document.write('<meta name="viewport" content="width=device-width,initial-scale='+pixclPatio+',minimum-scale='+pixclPatio+',maximum-scale='+pixclPatio+',user-scalable=no" />');
		//获取html元素
		var html = document.getElementsByTagName('html')[0];
		//获取html（屏幕）的宽度
		var pageWidth = html.getBoundingClientRect().width;
		//获取html的字号
		html.style.fontSize = pageWidth / 10 + 'px';

### 弹性盒模型

> 主轴和侧轴的样式都需要加在元素的父级，而元素的位置设置只需要加在自身即可（别忘了父级要加display: flex;）

		主轴方向设置
		
			/*新版弹性盒模型*/
			display: flex;
			
			/*设置主轴方向为水平方向*/
			/*flex-direction: row;*/
			
			/*设置主轴方向为垂直方向*/
			/*flex-direction: column;*/
			
			
			/*老版弹性盒模型*/
			display: -webkit-box;
			
			/*设置主轴方向为水平方向*/
			-webkit-box-orient: horizontal;
			
			/*设置主轴方向为垂直方向*/
			/*-webkit-box-orient: vertical;*/
		
		主轴上元素排列方向
		
			/*新版弹性盒模型*/
			/*display: flex;*/
			
			/*设置主轴方向为水平,元素排列为反序*/
			/*flex-direction: row-reverse;*/
			
			/*设置主轴方向为垂直,元素排列为反序*/
			/*flex-direction: column-reverse;*/
			
			
			/*老版弹性盒模型*/
			display: -webkit-box;
			
			/*元素在主轴上排列为反序*/
			/*-webkit-box-direction: reverse;*/
			
			/*元素在主轴上排列为正序*/
			/*-webkit-box-direction: normal;*/
		
		主轴上富裕空间管理
		
			/*新版弹性盒模型*/
			display: flex;
			
			/*元素在主轴开始位置 ，富裕空间在主轴的结束位置*/
			/*justify-content: flex-start;*/
			
			/*元素在主轴结束位置，富裕空间在主轴开始位置*/
			/*justify-content: flex-end;*/
			
			/*元素在主轴中间,富裕空间在主轴两侧*/
			/*justify-content: center;*/
			
			/*富裕空间平均分配在每两个元素之间*/
			/*justify-content: space-between;*/
			
			/*富裕空间平均分配在每个元素两侧*/
			/*justify-content: space-around;*/
			
			
			/*老版弹性盒模型*/
			display: -webkit-box;
			
			/*元素在主轴的开始位置,富裕空间在主轴的结束位置*/
			/*-webkit-box-pack: start;*/
			
			/*元素在主轴结束位置，富裕空间在主轴开始位置*/
			/*-webkit-box-pack: end;*/
			
			/*元素在主轴中间,富裕空间在主轴两侧*/
			/*-webkit-box-pack: center;*/
			
			/*富裕空间平均分配在每两个元素之间*/
			/*-webkit-box-pack: justify;*/
		
		侧轴上富裕空间管理
		
			/*新版弹性盒模型*/
			/*display: flex;*/
			
			/*元素在侧轴开始位置，富裕空间在侧轴结束位置*/
			/*align-items: flex-start;*/
			
			/*元素在侧轴结束位置，富裕空间在侧轴开始位置*/
			/*align-items: flex-end;*/
			
			/*元素在侧轴中间位置，富裕空间在侧轴两侧*/
			/*align-items: center;*/
			
			/*根据侧轴方向上文字的基线对齐*/
			/*align-items: baseline;*/
			
			
			/*老版弹性盒模型*/
			/*display: -webkit-box;*/
			
			/*元素在侧轴开始位置，富裕空间在侧轴结束位置*/
			/*-webkit-box-align: start;*/
			
			/*元素在侧轴结束位置，富裕空间在侧轴开始位置*/
			/*-webkit-box-align: end;*/
			
			/*元素在侧轴中间位置，富裕空间在侧轴两侧*/
			/*-webkit-box-align: center;*/
		
		元素弹性空间
		
			/*新版*/
			/*flex-grow: 1;*/
			
			/*老版*/
			-webkit-box-flex:1;
		
		元素具体位置设置
		
			/* 数值越小越靠前，可以接受0或者负值 */
			/*order:5;*/
			
			/* 数值越小越靠前， 最小值默认处理为1*/
			/*-webkit-box-ordinal-group:-2;*/

### 移动端事件

		手指按下：
			ontouchstart
			
		手指移动：
			ontouchmove
			
		手指抬起：
			ontouchend
			
		注意：
			在移动端开发的时候，浏览器的模拟器时好时坏，
			一般不用on的方式绑定事件函数，要用事件绑定的方式(addEventListener)
			pc上的事件比移动端的事件略慢，大概是在300ms左右(这个数据并不真实)

### 移动端的点透

		当上层元素发生点击的时候，下层元素也有点击（焦点）特性，
		在300ms之后，如果上层元素消失或者隐藏，目标点就会“漂移”到下层元素身上，就会触发点击行为。
			
		解决：
		
			1.下层不要使用有点击（焦点）特性的元素
			
			2.阻止pc事件

### 移动端阻止PC事件优点

		document.addEventListener('touchstart',function(ev){
			ev.preventDefault();
		});
		
		
		1.IOS10下设置meta禁止用户缩放是不可行的。（使用阻止pc事件就可以在IOS10下禁止用户缩放）
			
		2.解决IOS10下溢出隐藏的问题。
		
		3.禁止系统默认的滚动条、阻止橡皮筋效果
		
		4.禁止长按选中文字、选中图片、系统默认菜单
		
		5.解决点透问题
		
		6.也阻止了焦点元素的焦点行为(要正常使用：ev.stopPropagation()阻止冒泡)

### 移动端事件对象

		当给某个元素加上了事件绑定函数之后，事件函数默认的第一个参数就是事件对象
		
		事件对象：
			当用户在浏览器下触发了某个行为，事件对象会记录用户操作时一些细节信息。
		
		touches 当前位于*屏幕*上的所有手指的一个列表
		
		targetTouches 位于当前DOM元素上的手指的一个列表
		
		changedTouches  涉及当前事件的手指的一个列表
		
		div.addEventListener('touchmove',start);
		function start(ev){
			//this.innerHTML = ev.touches.length;
			//this.innerHTML = ev.targetTouches.length;
			this.innerHTML = ev.changedTouches.length;
		}
