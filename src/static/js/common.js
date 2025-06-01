/*
 * @Autor: dc
 * @Date: 2022-02-18 16:14:28
 * @LastEditors: lh
 * @LastEditTime: 2023-01-06 15:17:52
 * @Description: 公共的一些js工具方法
 */
import { Toast } from "vant";


export function checkPasswordStrength(password) {
  let strength = 0;
  if (password.length < 8) return false;
  // 长度检查
  // if (password.length >= 8) strength++; 
  if (password.length >= 12) strength++;
  
  // 字符类型检查
  if (/[a-z]/.test(password)) strength++;
  if (/[A-Z]/.test(password)) strength++; 
  if (/\d/.test(password)) strength++;
  if (/[^a-zA-Z0-9]/.test(password)) strength++;
  let arrtxt = ['很弱','弱','一般','良好','优秀','很棒','安全']
  return arrtxt[strength]; // 0-6分
}
export function screenOrientation() {
    let landscape = "(orientation: landscape)"
    if (window.matchMedia(landscape).matches) {
        //横屏
        return true
    } else {
        //竖屏
        return false
    }
}
/**
 * 获取get参数
 * @params {String} name 想要读取到的URL上的参数名
 * @params {Boolean} isGetParent 是否想要获取父级上的参数 true 或 false
 * @returns 返回URL上的参数,没有就返回NULL
 * */ 
 export function getQueryString(name,isGetParent = false) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
    var reg_rewrite = new RegExp("(^|/)" + name + "/([^/]*)(/|$)", "i");
    var r,q;
    try{
        if(isGetParent){
            // 父级
            r = window.parent.location.search.substr(1).match(reg);
            q = window.parent.location.pathname.substr(1).match(reg_rewrite);
        }else{
            // 获取当前的
            r = window.location.search.substr(1).match(reg);
            q = window.location.pathname.substr(1).match(reg_rewrite);
        }
        if (r != null) {
            return unescape(r[2]);
        } else if (q != null) {
            return unescape(q[2]);
        } else {
            return null;
        }
    }catch(err){
        return null;
    }
}
// 获取当前渠道 1:安卓 2:ios 3:网页 5:网页
export function systemFn() {
    var u = navigator.userAgent;
    var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1; //android终端
    var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
    var system = getQueryString('system');
    console.log("ddddddddddddddddddddddddd system ", system)
    var debug = getQueryString('debug');
    console.log(debug)
    if (system == null) {
        if (isAndroid) {
            if (debug === null || debug === false) {
                return 1;
            } else {
                return 3;
            }

        } else if (isiOS) {
            if (debug === null || debug === false) {
                return 2;
            } else {
                return 3;
            }
        } else {
            return 3;
        }
    } else {
        return Number(system);
    }
}
// 把对象转变成 url 拼接字符串
export function changeJSON2QueryString(JSON) {
    var temp = [];
    for (var k in JSON) {
        temp.push(k + "=" + encodeURIComponent(JSON[k]));
    }
    return temp.join("&");
}
// 运行环境 type 1 返回是否安卓 2 返回是否ios
export function runChannel(type) {
    var u = navigator.userAgent;
    var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1; //android终端
    var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
    if(type==1) return isAndroid;
    else if(type == 2) return isiOS;
}
// 返回是否是微信环境
export function isWeChat() {
    var i = navigator.userAgent;
    return i.indexOf("MicroMessenger") > -1;
}

// 数字小于10 追加0
const t = (i) => (i < 10 ? '0' : '') + i;

/**
 * 通过时间戳转化时间字符串格式
 * @param {number} time 时间戳
 * @returns {string} 返回时间格式字符串
*/
export function formatDate(time, format = 'yyyy-mm-dd') {
	const d = time ? new Date(time) : new Date();
	const year = d.getFullYear();
	const month = d.getMonth() + 1;
	const day = d.getDate();
	const hour = d.getHours();
	const minutes = d.getMinutes();
	const seconds = d.getSeconds();
	const weekday = d.getDay();
   
	return format.replace(/(yy){1,2}|m{1,2}|d{1,2}|h{1,2}|i{1,2}|s{1,2}|w{1,2}/gi, function(r) {
	  switch (r.toUpperCase()) {
		case 'YY':// 两个数年
		  return ('' + year).substr(2);
		case 'YYYY': // 四位数年
		  return year;
		case 'M': // 月份
		  return month;
		case 'MM': // 月份 小于10 追加0
		  return t(month);
		case 'D': // 天
		  return day;
		case 'DD': // 复数天 小于10 追加0
		  return t(day);
		case 'H': // 小时
		  return hour;
		case 'HH': // 复数小时 小于10 追加0
		  return t(hour);
		case 'I': // 分
		  return minutes;
		case 'II': // 复数分 小于10 追加0
		  return t(minutes);
		case 'S': // 秒
		  return seconds;
		case 'SS': // 复数秒 小于10 追加0
		  return t(seconds);
		case 'W': // 一周
		  return `星期${['日', '一', '二', '三', '四', '五', '六'][weekday]}`;
		case 'WW': // 英文版 一周
		  return ['Sunday', 'Monday', 'TuesDay', 'Wednesday', 'Thursday', 'Friday', 'Saturday'][weekday];
	  }
	});
}
/**
 * 倒计时
 * @param {number} time 时间戳 或者秒数
 * @param {number} isTime 1为时间戳 2为秒数
 * @param {number} isNeedH 是否需要返回小时 1 返回 0 不返回
 * */ 
export function countDownFn(time,isTime = 1,isNeedH=0) {
  if(isTime){
    var newDate = new Date().getTime(), // 当前时间
    countDownTiem = new Date(time).getTime(), // 目标时间
    surplusTime = countDownTiem - newDate; // 剩余时间
    if(countDownTiem > newDate){
      let secondT =  Math.floor( (surplusTime/1000) %60 ), // 秒
      branchT = Math.floor( surplusTime/(1000*60) ), // 分
      hourT = Math.floor( surplusTime/(1000*60*60) );// 小时
      secondT = t(secondT);
      branchT = t(branchT);
      hourT = t(hourT);
      if(isNeedH){
        branchT = t(branchT%60);
        return `${hourT}:${branchT}:${secondT}`
      }else{
        return `${branchT}:${secondT}`
      }
    }else{
      // 没有时间了
      return null;
    }
  }else{
    if(time > 0){
      let secondT =  Math.floor( time%60 ), // 秒
      branchT = Math.floor( time/60 ); // 分
      secondT = t(secondT);
      branchT = t(branchT);
      return `${branchT}:${secondT}`
    }else{
      // 没有时间了
      return null;
    }
  }
  
}
/**
 * 是否是当天
 * @param {number | string} time 时间戳 或者是否格式的字符串
 * @param {number} type 1为时间戳 2为字符串
 * @returns {boolean} 返回布尔 是否是当天
 * */ 
export function isSameDay(time,type=1) {
  if(typeof time != "number" && typeof time != "string"){
    throw('请传入一个时间戳或者时间格式的字符串')
  }
  var timeDate = null,
    newtimeDate = new Date().getTime(),
    obj = {
      newT:'',
      oldT:''
    };
  if(type == 1){
    timeDate = new Date(Number(time))
  }else{
    timeDate = new Date(time)
  }
  obj.newT = formatDate(newtimeDate);
  obj.oldT = formatDate(timeDate.getTime());
  if(obj.newT === obj.oldT){
    //  当天
    return true
  }else{
    // 不再当天
    return false;
  }
}
/**
 *  防抖
 * @params {function} fn 必传 回调函数
 * @params {number} tiems 必传 多少毫秒的间隔
 * @params {boolean} isImmediately 非必传 是否立即执行
 *  
 * */ 
export function debounce(fn, tiems,isImmediately= false) {  
  var timeout = null;    
  return function() {
    let that = this;
    let args = arguments;  
	  if(isImmediately){
      if(timeout == null){
        fn.apply(that, args);
      }else{
        clearTimeout(timeout);
      }
      timeout = setTimeout(()=>{ timeout = null; }, tiems);
	  }else{
		  if(timeout !== null) clearTimeout(timeout);
		  timeout = setTimeout(()=>{
        clearTimeout(timeout);
        timeout = null;
        fn.apply(that, args);
      }, tiems);
	  }
  }
}

/**
 *  节流
 * */ 
export function throttle(fun, wait = 1000) {
  let timeout;
  return function () {
    let that = this;
    let args = arguments;
    if (!timeout) {
      timeout = setTimeout(() => {
        timeout = null;
        fun.apply(that, args);
        // that[fun](...args); // vue用法
      }, wait);
    }
  };
}
/**
 * 下载二维码
 * @params Toast 提示弹框
 * @params qrcodeImg 二维码地址
 * 
 * */ 
export function saveImg(Toast,qrcodeImg) {
  // let DAW_WEB = window.parent.DAW_WEB;
  if(runChannel(2)){
      // 是ios环境
      Toast('长按二维码添加到照片');
  }else{
      // 非ios
      // if(DAW_WEB && DAW_WEB.onWeiXin){
      if( isWeChat() ){
          // 微信公众号
          Toast('长按识别二维码');
      }else{
          // 非微信公众号,走js 下载图片
          let aLink = document.createElement('a');
          let evt = document.createEvent("HTMLEvents");
          evt.initEvent("click", true, true); //initEvent 不加后两个参数在FF下会报错  事件类型，是否冒泡，是否阻止浏览器的默认行为
          aLink.download = '客服二维码.png';
          aLink.href = qrcodeImg;
          aLink.click();
      }
  }
}
/**
 * 复制文本
 * */
 export function copyText(text) {
  // 执行复制思路
  // 动态创建 textarea 标签，并设置 readOnly 属性及移出可视区域
  // 将要复制的值赋给 textarea 标签的 value 属性，并插入到 body
  // 选中值 textarea 并复制
  // 将 body 中插入的 textarea 移除
  // 在第一次调用时绑定事件，在解绑时移除事件

  //创建 textarea 元素
  const textarea = document.createElement('textarea');
  // 将该 textarea 设为 readonly 防止 iOS 下自动唤起键盘，同时将 textarea 移出可视区域
  textarea.readOnly = 'readonly'
  // 将textarea定位到屏幕外
  textarea.style.position = 'absolute'
  textarea.style.left = '-999999px'
  // 将要复制的值赋值给textarea
  textarea.value = text
  // 插入到body元素中
  document.body.appendChild(textarea)
  // 选中内容
  if(textarea.select()){ // 兼容处理
      // ios 可能不支持
      textarea.select()
  }else{
      // ios 不支持执行 setSelectionRange方法
      textarea.setSelectionRange(0,text.length)
  }
  // 复制选中的内容
  const result = document.execCommand('Copy')
  // 验证是否复制成功
  if(result){
      // console.log('复制成功')
      Toast('复制成功');
  }
  // 复制完成后移除textarea
  document.body.removeChild(textarea)
}


/**
 * // 通过传递的id 页面定位过去
 * @param {string} id 必传 要跳转的元素id
 * @param {number} type 非必传 1为页面 2为父级id
 * @param {boolean} isTop 非必传 是否是纵向
 * @param {string} fatherId 非必传 父级id
*/
export function gotoid(id,type=1,isTop=true,fatherId){ 

	let jump = document.querySelector(id);//定义起跳点div
  if(!jump){
    let time = setTimeout(()=>{
      clearTimeout(time)
      gotoid(id,type,isTop,fatherId)
    },500)
    return
  }
	let total = isTop? jump.offsetTop : jump.offsetLeft;
  let topOrLeft = isTop?'scrollTop':'scrollLeft';
	let distance =
		document.documentElement[topOrLeft] || document.body[topOrLeft];
	var moreregionbox;
	if(type == 1){
		moreregionbox =  document.documentElement;
	}else{
		moreregionbox = document.getElementById(fatherId); // document.documentElement;
	}
	// 平滑滚动，时长500ms，每10ms一跳，共50跳
	let step = total / 80;
	if (total > distance) {
		smoothDown();
	} else {
		let newTotal = distance - total;
		step = newTotal / 80;
		smoothUp();
	}
	function smoothDown() {
		if (distance < total) {
		distance += step;
		document.body[topOrLeft] = distance;
		moreregionbox[topOrLeft] = distance;
		setTimeout(smoothDown, 10);
		} else {
		document.body[topOrLeft] = total;
		moreregionbox[topOrLeft] = total;
		}
	}
	function smoothUp() {
		if (distance > total) {
		distance -= step;
		document.body[topOrLeft] = distance;
		moreregionbox[topOrLeft] = distance;
		setTimeout(smoothUp, 10);
		} else {
		document.body[topOrLeft] = total;
		moreregionbox[topOrLeft] = total;
		}
	}
}