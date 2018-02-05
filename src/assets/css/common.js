(function(window) {
	var Yzg = window.J = window.J  || {};
	var nodeConfig = {
		getStyle: function (element , style) {
			var realStyle = null;
			if (element.currentStyle) {
				realStyle = element.currentStyle[style];
			} else if (window.getComputedStyle) {
				realStyle = window.getComputedStyle(element, null)[style];
			}
			return parseInt(realStyle);
		}, 
		getClassName: function (name) {
			if (document.querySelector) {
				return document.querySelector(name);
			} 
			return null;

		},
		showModal: function (name , text) {
			var modal = nodeConfig.getClassName(name);
			if (!text) {
				modal.style.display = 'block';
			}
		},
		hideModal: function (name) {
			var modal = nodeConfig.getClassName(name);
			modal.style.display = 'none';
		}
	};
	var toastConfig = {
		alert: function (text) {
			if (!objectConfig.isEmpty(text)) {
				
				var element = document.createElement('div');
				var elementChild = document.createElement('div')
				elementChild.className = 'field-validmsg';
				elementChild.innerHTML = text;
		
				element.className = 'field-tooltip';
				element.appendChild(elementChild);
				document.body.appendChild(element);
	
				setTimeout(function(){
					document.body.removeChild(element);
				},2000);
			}	
		},
		alertSwitch: function (text , url) {
			if (!objectConfig.isEmpty(text)) {
				var element = document.createElement('div');
				var elementChild = document.createElement('div')
				elementChild.className = 'field-validmsg';
				elementChild.innerHTML = text;
		
				element.className = 'field-tooltip';
				element.appendChild(elementChild);
				document.body.appendChild(element);
				setTimeout(function(){
					document.body.removeChild(element);
					if (!objectConfig.isEmpty(url)) {
						window.location.href = url;
					}
				},2000);
			}
			
		}
	};
	var commonConfig = {
		goBack: function () {
			if (URLConfig.getParam('edit') == -1) {
				window.history.go(-3);
			} else {
				window.history.go(-1);
			}
		},
		showLoading: function () {
			document.querySelector(".load-box").style.display = 'block';
		},
		hideLoading: function () {
			document.querySelector(".load-box").style.display = 'none';
		},
		showPageLoader: function () {
			document.querySelector(".load").style.display = 'block';
		},
		hidePageLoader: function () {
			document.querySelector(".load").style.display = 'none';
		},
		getScript: function (url) {
			var script = document.createElement("script");
			script.async = "async", 
			script.src = url, 
			// t && (n.onload = t), 
			document.getElementsByTagName("head")[0].appendChild(script);
		}
	};
	var numberConfig = {
		// 转换百分数
		percentage: function  (num , total) {
			return ((Math.round(num / total * 10000) / 100.00).toFixed(0));// 小数点后两位百分比
		},
		// 转换两位小数
		toDecimal: function (value) {
			value = value || 0;
			if (isNaN(value)) {
				return NaN;
			}
			var r = parseFloat(value , 10);
			return (Math.round(r*100)/100 ).toFixed(2);
		}
	};
	var stringConfig = {
		decodeHtml: function(l) {
			var m = {
				"&lt;": "<",
				"&gt;": ">",
				"&amp;": "&",
				"&nbsp;": " ",
				"&quot;": '"',
				"&copy;": "",
				"&apos;": "'"
			};
			return (typeof l != "string") ? l : l.replace(/&\w+;|&#(\d+);/g, function(o, n) {
				var p = m[o];
				if (p === undefined) {
					if (!isNaN(n)) {
						p = String.fromCharCode((n == 160) ? 32 : n)
					} else {
						p = o
					}
				}
				return p
			})
		},
		isUnsignedNumeric: function(l) {
			if (objectConfig.isEmpty(l)) {
				return false
			}
			var m = /^\d+(\.\d+)?$/;
			return m.test(l)
		},
		isInteger: function (l) {
			if (objectConfig.isEmpty(l)) {
				return false
			}
			var m = /^(-|\+)?\d+$/;
			return m.test(l)
		},
		isUnsignedInteger: function(l) {
			var m = /^\d+$/;
			return m.test(l)
		},
		isFloat: function(l) {
			if (objectConfig.isEmpty(l)) {
				return false
			}
			var m = /^[0-9]+\.{0,1}[0-9]{0,2}$/;
			return m.test(l)
		},
		isPhoneNum: function(l) {
			if (objectConfig.isEmpty(l)) {
				return false
			}
			var m = /^(((13[0-9]{1})|(15[0-9]{1})|(17[0-9]{1})|(14[0-9]{1})|(18[0-9]{1}))+\d{8})$/;
			return m.test(l)
		},
		isIdCard: function (l) {
			if (objectConfig.isEmpty(l)) {
				return false
			}
			var reg = /^(\d{15}$|^\d{18}$|^\d{17}(\d|X|x))$/;
			return reg.test(l)
		},
		isEmail: function(l) {
			if (objectConfig.isEmpty(l)) {
				return false
			}
			var m = /^(\w-*\.*)+@(\w-?)+(\.\w{2,})+$/;
			return m.test(l)
		},
		hasSpace: function(l) {
			if (val == undefined || val == null || val == "null" || val == "undefined") {
				return true
			}
			return l.indexOf("") > -1
		}
	};
	var objectConfig = {
		$mObj: {},
		merge: function(n, m, l) {
			if (!n || !m || typeof m != "object") {
				return n
			}
			if (!l) {
				for (var r in m) {
					n[r] = m[r]
				}
			} else {
				var q, o;
				for (q in m) {
					if (m.hasOwnProperty(q)) {
						o = m[q];
						if (o && o.constructor === Object) {
							if (n[q] && n[q].constructor === Object) {
								objectConfig.merge(n[q], o)
							} else {
								n[q] = o
							}
						} else {
							n[q] = o
						}
					}
				}
			}
			return n
		},
		clone: function(m, l) {
			return objectConfig.merge({}, m, l)
		},
		namespace: function() {
			var m = a,
				r, o, p, n, q, s;
			for (p = 0, q = arguments.length; p < q; p++) {
				var l = arguments[p];
				if (objectConfig.$mObj.namespace[l]) {
					continue
				}
				r = l.split(".");
				for (n = 0, s = r.length; n < s; n++) {
					o = r[n];
					if (!m[o]) {
						m[o] = {}
					}
					m = m[o]
				}
				objectConfig.$mObj.namespace[l] = true
			}
		},
		
		each: function(n, r, q) {
			if (objectConfig.isEmpty(n) || !r) {
				return
			}
			if (objectConfig.isArray(n)) {
				for (var p = 0, m = n.length; p < m; p++) {
					try {
						if (r.call(q, n[p], p, n) === false) {
							return
						}
					} catch (err) {
						Yzg.log(err , "error")
					}
				}
			} else {
				for (var o in n) {
					if (!n.hasOwnProperty(o)) {
						continue
					}
					try {
						if (r.call(q, n[o], o, n) === false) {
							return
						}
					} catch (err) {
						Yzg.log(err , "error")
					}
				}
			}
		},
		contains: function(o, n) {
			if (objectConfig.isArray(o)) {
				if ("indexOf" in Array.prototype) {
					return o.indexOf(n) !== -1
				}
				var l, m;
				for (l = 0, m = o.length; l < m; l++) {
					if (o[l] === n) {
						return true
					}
				}
				return false
			} else {
				return !objectConfig.isEmpty(o) && n in o
			}
		},
		isEmpty: function(l, n) {
			if ((typeof l === "undefined") || (l === null) || (!n ? l === "" : false) || (objectConfig.isArray(l) && l.length === 0)) {
				return true
			} else {
				if (objectConfig.isObject(l)) {
					for (var m in l) {
						if (Object.prototype.hasOwnProperty.call(l, m)) {
							return false
						}
					}
					return true
				}
			}
			return false
		},
		isBlank: function(l) {
			return objectConfig.isEmpty(l) ? true : objectConfig.isEmpty(String(l).replace(/^\s+|\s+$/g, ""))
		},
		isDefined: function(l) {
			return typeof l === "undefined"
		},
		isObject: function(l) {
			if (Object.prototype.toString.call(null) === "[object Object]") {
				return l !== null && l !== undefined && Object.prototype.toString.call(l) === "[object Object]" && l.ownerDocument === undefined
			} else {
				return Object.prototype.toString.call(l) === "[object Object]"
			}
		},
		isFunction: function(l) {
			return Object.prototype.toString.apply(l) === "[object Function]"
		},
		isArray: function(l) {
			return Object.prototype.toString.apply(l) === "[object Array]"
		},
		isDate: function(l) {
			return Object.prototype.toString.apply(l) === "[object Date]"
		},
		isNumber: function(l) {
			return typeof l === "number" && isFinite(l)
		},
		isString: function(l) {
			return typeof l === "string"
		},
		isBoolean: function(l) {
			return typeof l === "boolean"
		}
	};
	var DateConfig = {
		// 日期转换时间戳
		toDateStamp: function (value) {
			return (new Date(Date.parse(value.replace(/-/g,"/")))).getTime();
		},
		toString: function(l, t) {
			var s = undefined;
			var q = l.getFullYear();
			var p = l.getMonth() + 1;
			var r = l.getDate();
			var m = l.getHours();
			var n = l.getMinutes();
			var o = l.getSeconds();
			p = (parseInt(p) < 10) ? ("0" + p) : (p);
			r = (parseInt(r) < 10) ? ("0" + r) : (r);
			m = (parseInt(m) < 10) ? ("0" + m) : (m);
			n = (parseInt(n) < 10) ? ("0" + n) : (n);
			o = (parseInt(o) < 10) ? ("0" + o) : (o);
			if ("yyyy-MM-dd HH:mm:ss" == t) {
				s = q + "-" + p + "-" + r + " " + m + ":" + n + ":" + o
			} else {
				if ("yyyy-MM-dd" == t) {
					s = q + "-" + p + "-" + r
				} else {
					if ("yyyy-MM" == t) {
						s = q + "-" + p
					} else {
						if ("yyyy" == t) {
							s = q
						}
					}
				}
			}
			return s
		},
		toDate: function(q) {
			if (q.length == 19) {
				var p = q.substring(0, 4);
				var r = q.substring(5, 7);
				var m = q.substring(8, 10);
				var l = q.substring(11, 13);
				var n = q.substring(14, 16);
				var o = q.substring(17, 19);
				return new Date(p, r - 1, m, l, n, o)
			} else {
				if (q.length == 10) {
					var p = q.substring(0, 4);
					var r = q.substring(5, 7);
					var m = q.substring(8, 10);
					return new Date(p, r - 1, m)
				} else {
					if (q.length == 7) {
						var p = q.substring(0, 4);
						var r = q.substring(5, 7);
						return new Date(p, r - 1)
					} else {
						if (q.length == 4) {
							var p = q.substring(0, 4);
							return new Date(p)
						} else {
							return undefined
						}
					}
				}
			}
		},
		today: function(l) {
			if (arguments.length == 0) {
				return DateConfig.toString(new Date(), "yyyy-MM-dd")
			} else {
				return DateConfig.toString(new Date(), l)
			}
		},
		chengeDate: function (value){
            return (new Date(Date.parse(value.replace(/-/g,"/")))).getTime();
        },
        getFullYear: function (date) {
            var d = new Date(date);
            return d.getFullYear();
        },
        getMonthDay: function (date) {
            var d = new Date(date);
            return d.getMonth()();
        },
        getDay: function (date) {
            var d = new Date(date);
            return d.getDay()();
        }
	};
	var URLConfig = {
		getParam: function(l) {
			var m = new RegExp("(^|&)" + l + "=([^&]*)(&|$)", "i");
			var n = window.location.search.substr(1).match(m);
			if (n != null) {
				return decodeURIComponent(n[2])
			}
			return null
		},
		setParams: function(n) {
			var m = window.location.search;
			var r = "";
			var l = new Array();
			var o = {};
			if (objectConfig.isObject(n)) {
				if (m.indexOf("?") != -1) {
					r = m.substr(m.indexOf("?") + 1)
				}
				if (r.length > 0) {
					var q = r.split("&");
					for (i in q) {
						var p = q[i].split("=");
						if (p.length > 1) {
							o[p[0]] = p[1]
						} else {
							o[p[0]] = ""
						}
					}
					objectConfig.merge(o, n)
				} else {
					o = n
				}
			} else {
				throw new Error("arguments is not a jsonobject")
			}
			for (key in o) {
				l.push(key);
				l.push("=");
				l.push(n[key]);
				l.push("&")
			}
			l.pop();
			window.location.search = l.join('')
		},
		getHash: function() {
			var hash = window.location.hash;
			if (!hash) {
				return undefined
			} else {
				return hash.replace("#", "")
			}
		},
		setHash: function(hash) {
			if (hash) {
				window.location.hash = "#" + hash
			} else {
				window.location.hash = ""
			}
		}
	};
	LocalStorageUtil = function() {
		var isSupport = false;
		try {
			isSupport = window.localStorage ? true : false
		} catch (err) {
			isSupport = false;
			Yzg.log("localStorage", "error")
		}
		function get(name) {
			var result = null;
			if (isSupport && name) {
				result = window.localStorage.getItem(name)
			}
			return result
		}
		function set(name, value) {
			if (isSupport && name) {
				try {
					window.localStorage.setItem(name, value)
				} catch (err) {
					LocalStorageUtil.removeAll();
					window.localStorage.setItem(name, value)
				}
			}
		}
		function remove(name) {
			if (isSupport && name) {
				window.localStorage.removeItem(name)
			}
		}
		function removeAll() {
			if (isSupport) {
				objectConfig.each(window.localStorage, function(value, name, obj, r) {
					window.localStorage.removeItem(name)
				})
			}
		}
		return {
			get: get,
			set: set,
			remove: remove,
			removeAll: removeAll
		}
	};
	Yzg.modules = {};
	Yzg.runMod = [];
	Yzg.config = {
		debug: 0
	};
	Yzg.log = function(m, l) {
		( !! !(Yzg.config && Yzg.config.debug && (typeof console !== "undefined" && console !== null) && (console[l || (l = "log")]))) && console[l](m)
	};

	Yzg.common = commonConfig;
	Yzg.toast = toastConfig;
	Yzg.node = nodeConfig;
	Yzg.string = stringConfig;
	Yzg.date = DateConfig;
	Yzg.object = objectConfig;
	Yzg.url = URLConfig;
	Yzg.localstorage = new LocalStorageUtil()
})(window);

