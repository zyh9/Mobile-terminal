## 移动端

### viewport 视口(可视区窗口)

		默认不设置viewport一般可视区宽度在移动端是980
		
		width  可视区的宽度 (number||device-width)
		
		user-scalable 是否允许用户缩放 (yes||no) iOS10无效
		
		initial-scale 初始缩放比例
		
		minimum-scale 最小缩放比例
		
		maximum-scale 最大缩放比例

### 设备像素比(device pixel ratio)

		设备像素比简称为dpr，其定义了物理像素和设备独立像素的对应关系。它的值可以按下面的公式计算得到：
		
			设备像素比 ＝ 物理像素 / 设备独立像素
			
		在JavaScript中，可以通过window.devicePixelRatio获取到当前设备的dpr

### CSS单位rem

		在W3C规范中是这样描述rem的:
		
		font size of the root element.
		
		简单的理解，rem就是相对于根元素<html>的font-size来做计算。
		而我们的方案中使用rem单位，是能轻易的根据<html>的font-size计算出元素的盒模型大小。

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
		var PixelRatio = 1 / window.devicePixelRatio;
		//写入meta
		document.write('<meta name="viewport" content="width=device-width,initial-scale='+PixelRatio+',minimum-scale='+PixelRatio+',maximum-scale='+PixelRatio+',user-scalable=no" />');
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
		
		移动端click屏幕产生200-300ms的延迟响应
		
			移动设备上的web网页是有300ms延迟的，往往会造成按钮点击延迟甚至是点击失效。
		
		以下是历史原因：
		
			2007年苹果发布首款iphone上IOS系统搭载的safari为了将适用于PC端上大屏幕的网页能比较好的展示在手机端上，
			使用了双击缩放(double tap to zoom)的方案，比如你在手机上用浏览器打开一个PC上的网页，
			你可能在看到页面内容虽然可以撑满整个屏幕，但是字体、图片都很小看不清，此时可以快速双击屏幕上的某一部分，
			你就能看清该部分放大后的内容，再次双击后能回到原始状态。
			
			双击缩放是指用手指在屏幕上快速点击两次，iOS自带的 Safari浏览器会将网页缩放至原始比例。
			
			原因就出在浏览器需要如何判断快速点击上，当用户在屏幕上单击某一个元素时候，例如跳转链接<a href="#"></a>，
			此处浏览器会先捕获该次单击，但浏览器不能决定用户是单纯要点击链接还是要双击该部分区域进行缩放操作，
			所以，捕获第一次单击后，浏览器会先Hold一段时间t，如果在t时间区间里用户未进行下一次点击，
			则浏览器会做单击跳转链接的处理，如果t时间里用户进行了第二次单击操作，则浏览器会禁止跳转，
			转而进行对该部分区域页面的缩放操作。那么这个时间区间t有多少呢？在IOS safari下，大概为300毫秒。
			这就是延迟的由来。造成的后果用户纯粹单击页面，页面需要过一段时间才响应，给用户慢体验感觉，
			对于web开发者来说是，页面js捕获click事件的回调函数处理，需要300ms后才生效，也就间接导致影响其他业务逻辑的处理。

### 触摸事件的响应顺序

		1、ontouchstart 
		2、ontouchmove 
		3、ontouchend 
		4、onclick
		
		解决300ms延迟的问题，也可以通过绑定ontouchstart事件，加快对事件的响应

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

### 移动端input无法获取焦点的问题

在移动端开发中，我们有时有针对性的写一些特殊的重置，比如：

		* {
			-webkit-touch-callout: none;
			//阻止长按图片之后呼出菜单提示复制的行为
			
			-webkit-text-size-adjust: none;
			//禁用Webkit内核浏览器的文字大小调整功能
			
			-webkit-tap-highlight-color: rgba(0, 0, 0, 0);
			//避免点击a标签或者注册了click事件的元素时产生高亮
			
			-webkit-user-select: none;
			//禁止用户进行复制、选择
		}
		
		其中，-webkit-user-select: none;会产生一些问题，这是webkit内核浏览器下的一个bug
		阻止了用户的选择内容行为，会导致一些“内容可编辑”标签无法正常使用，比如input、textarea
		
		如果网站不需要阻止用户的选择内容的行为就可以使用如下样式：
		
			* {
				-webkit-user-select: text;
				-user-select: text;
			}
			
			另一种方式：
			*: not(input, textarea) {
				-webkit-touch-callout: none;
				-webkit-user-select: none;
			}
			
		user-select可能会导致与contenteditable = "true"元素的问题，以便更好的使用，所以下面的CSS也要加上
		
			HTML5全局 contenteditable属性
				contenteditable 属性规定是否可编辑元素的内容
		
			[contenteditable="true"] , input, textarea {
				-webkit-user-select: auto !important;
				-khtml-user-select: auto !important;
				-moz-user-select: auto !important;
				-ms-user-select: auto !important;
				-o-user-select: auto !important;
				user-select: auto !important;
			}

### 表单输入框placeholder的颜色值

		input::-webkit-input-placeholder{color:#ccc;}
		input:focus::-webkit-input-placeholder{color:#ddd;}

### 模拟按钮hover效果

		直接在body上添加ontouchstart，同样可激活移动端css的active效果
		移动端触摸按钮的效果，可明示用户有些事情正要发生，是一个比较好体验，但是移动设备中并没有鼠标指针，
		使用css的hover并不能满足我们的需求，还好国外有个激活移动端css的active效果
		
		//第一种
		<!DOCTYPE html>
		<html>
		<head>
		<meta charset="utf-8">
		<meta content="width=device-width,initial-scale=1.0,maximum-scale=1.0,user-scalable=no" name="viewport">
		<meta content="yes" name="apple-mobile-web-app-capable">
		<meta content="black" name="apple-mobile-web-app-status-bar-style">
		<meta content="telephone=no" name="format-detection">
		<meta content="email=no" name="format-detection">
		<style type="text/css">
			a{-webkit-tap-highlight-color: rgba(0,0,0,0);}
			.btn-blue{display:block;height:42px;line-height:42px;text-align:center;border-radius:4px;font-size:18px;color:#FFFFFF;background-color: #4185F3;}
			.btn-blue:active{background-color: #357AE8;}
		</style>
		</head>
		<body ontouchstart>
			<div class="btn-blue">按钮</div>
		</body>
		</html>
		
		
		//第二种
		<!DOCTYPE html>
		<html>
		<head>
		<meta charset="utf-8">
		<meta content="width=device-width,initial-scale=1.0,maximum-scale=1.0,user-scalable=no" name="viewport">
		<meta content="yes" name="apple-mobile-web-app-capable">
		<meta content="black" name="apple-mobile-web-app-status-bar-style">
		<meta content="telephone=no" name="format-detection">
		<meta content="email=no" name="format-detection">
		<style type="text/css">
			a{-webkit-tap-highlight-color: rgba(0,0,0,0);}
			.btn-blue{display:block;height:42px;line-height:42px;text-align:center;border-radius:4px;font-size:18px;color:#FFFFFF;background-color: #4185F3;}
			.btn-blue:active{background-color: #357AE8;}
		</style>
		</head>
		<body>
			<div class="btn-blue">按钮</div>
		<script type="text/javascript">
		document.addEventListener("touchstart", function(){}, true)
		</script>
		</body>
		</html>
		
		兼容性ios5+、部分android 4+、winphone 8
		
		
		//第三种
		要做到全兼容的办法，可通过绑定ontouchstart和ontouchend来控制按钮的类名
		<!DOCTYPE html>
		<html>
		<head>
		<meta charset="utf-8">
		<meta content="width=device-width,initial-scale=1.0,maximum-scale=1.0,user-scalable=no" name="viewport">
		<meta content="yes" name="apple-mobile-web-app-capable">
		<meta content="black" name="apple-mobile-web-app-status-bar-style">
		<meta content="telephone=no" name="format-detection">
		<meta content="email=no" name="format-detection">
		<style type="text/css">
			a{-webkit-tap-highlight-color: rgba(0,0,0,0);}
			.btn-blue{display:block;height:42px;line-height:42px;text-align:center;border-radius:4px;font-size:18px;color:#FFFFFF;background-color: #4185F3;}
			.btn-blue-on{background-color: #357AE8;}
		</style>
		</head>
		<body>
			<div class="btn-blue">按钮</div>
		<script type="text/javascript">
		var btnBlue = document.querySelector(".btn-blue");
		btnBlue.ontouchstart = function(){
			this.className = "btn-blue btn-blue-on"
		}
		btnBlue.ontouchend = function(){
			this.className = "btn-blue"
		}
		</script>
		</body>
		</html>

### 禁止ios长按时不触发系统的菜单，禁止ios&android长按时下载图片

		.css{-webkit-touch-callout: none}

### 禁止ios和android用户选中文字

		.css{-webkit-user-select:none}

### 打电话发短信写邮件

		打电话
		<a href="tel:10086">打电话给:10086</a>
		
		发短信
		<a href="sms:10086">发短信给:10086</a>
		
		写邮件
		<a href="mailto:zyh@qq.com">zyh@qq.com</a>

### 实现0.5px的线条

		网络上有很多方法，如设置viewport，box-shawdow，border-image，background-image，transform:scale等，
		本文只介绍一种觉得比较好用的方法，一来兼容性好，二来不依赖图片。
		
		transform:scale(x,y)
		
		通过css支持定义border或者height为.5px大的线条，在android设备中的无法显示出来，这里有个小技巧，
		设置线条为1px，然后通过transform:scale(x,y)来缩放线条为原来的一半，可显示0.5px的线条。
		
		<!DOCTYPE html>
		<html>
			<head>
			<meta charset="utf-8">
			<meta content="width=device-width,initial-scale=1,maximum-scale=1.0,user-scalable=no" name="viewport">
			<meta content="yes" name="apple-mobile-web-app-capable">
			<meta content="black" name="apple-mobile-web-app-status-bar-style">
			<meta content="telephone=no" name="format-detection">
			<meta content="email=no" name="format-detection">
			<title>点5测试 - scale</title>
			<style type="text/css">
			.line {
			    height: 50px;
			    line-height: 50px;
			    background-color: #CCC;
			    border-bottom:1px solid red
			} 
			.scale {
			    position: relative;
			    height: 50px;
			    line-height: 50px;
			    background-color: #CCC
			}
			.scale:after {
			    position: absolute;
			    content: '';
			    width: 100%;
			    left: 0;
			    bottom: 0;
			    height: 1px;
			    background-color: red;
			    -webkit-transform: scale(1,.5);
			    transform: scale(1,.5);
			    -webkit-transform-origin: center bottom;
			    transform-origin: center bottom
			}
			</style>
			</head>
			<body>
				<div class="line">1px</div>
				<br/><br/>    
				<div class="scale">0.5px</div>
			</body>
		</html>

### 实现.5px的圆角边框

		原理：先定义1px的圆角边框，然后拉伸内容的宽度和高度为父级的2倍(边框厚度不变)，
		然后再使用transform:scale(0.5)缩放为原来的0.5倍
		
		<!DOCTYPE html>
		<html>
			<head>
			<meta charset="utf-8">
			<meta content="width=device-width,initial-scale=1,maximum-scale=1.0,user-scalable=no" name="viewport">
			<meta content="yes" name="apple-mobile-web-app-capable">
			<meta content="black" name="apple-mobile-web-app-status-bar-style">
			<meta content="telephone=no" name="format-detection">
			<meta content="email=no" name="format-detection">
			<title>点5测试 - border-radius</title>
			<style type="text/css">
			body{padding: 50px;-webkit-touch-callout:none;}
			[class*="btn"]{margin: 0 auto;}
			.btn-1 {
			    width: 200px;
			    height: 42px;
			    -webkit-border-radius: 5px;
			    border-radius: 5px;
			    text-align: center;
			    line-height: 42px;
			    background-color: #EDEDED;
			    border: 1px solid red;
			}
			.btn {
			    position: relative;
			    width: 200px;
			    height: 42px;
			    -webkit-border-radius: 5px;
			    border-radius: 5px;
			    text-align: center;
			    line-height: 42px;
			    background-color: #EDEDED;
			}
			.btn:before {
			    content: '';
			    position: absolute;
			    top: -50%;
			    bottom: -50%;
			    left: -50%;
			    right: -50%;
			    -webkit-transform: scale(0.5);
			    transform: scale(0.5);
			    border-style: solid;
			    border-width: 1px;
			    border-color: red;
			    -webkit-border-radius: 10px;
			    border-radius: 10px;
			}
			</style>
			</script>
			</head>
			<body>
				<div class="btn-1">1px border</div>
				<br/><br/>
				<div class="btn">.5px border</div>
			</body>
		</html>
