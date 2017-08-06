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
