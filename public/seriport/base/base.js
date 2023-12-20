// "use strict";

// /**
//  * 自定义单击事件
//  * @id 选择器
//  * @fun 点击事件
//  * */
// function baseClick(id, fun) {
// 	document.querySelectorAll(id).forEach(function (v) {
// 		v.addEventListener('click', fun);
// 	});
// };

// /**
//  * 自定义双击事件
//  * @id 选择器
//  * @fun 点击事件
//  * */
// function baseDblclick(id, fun) {
// 	document.querySelectorAll(id).forEach(function (v) {
// 		v.addEventListener('dblclick', fun);
// 	});
// };

// /**
//  * 自定义鼠标按键按下事件
//  * @id 选择器
//  * @fun 点击事件
//  * */
// function baseMousedown(id, fun) {
// 	document.querySelectorAll(id).forEach(function (v) {
// 		v.addEventListener('mousedown', fun);
// 	});
// };

// /**
//  * 自定义鼠标按键松开事件
//  * @id 选择器
//  * @fun 点击事件
//  * */
// function baseMouseup(id, fun) {
// 	document.querySelectorAll(id).forEach(function (v) {
// 		v.addEventListener('mouseup', fun);
// 	});
// };

// /**
//  * 自定义鼠标移入事件
//  * @id 选择器
//  * @fun 点击事件
//  * */
// function baseMouseenter(id, fun) {
// 	document.querySelectorAll(id).forEach(function (v) {
// 		v.addEventListener('mouseenter', fun);
// 	});
// };

// /**
//  * 自定义鼠标移出事件
//  * @id 选择器
//  * @fun 点击事件
//  * */
// function baseMouseleave(id, fun) {
// 	document.querySelectorAll(id).forEach(function (v) {
// 		v.addEventListener('mouseleave', fun);
// 	});
// };

// /**
//  * 自定义鼠标移动事件
//  * @id 选择器
//  * @fun 点击事件
//  * */
// function baseMousemove(id, fun) {
// 	document.querySelectorAll(id).forEach(function (v) {
// 		v.addEventListener('mousemove', fun);
// 	});
// };
// /**
//  * Utf8Array转字符串
//  * @array Utf8Array数据
//  * */
// function Utf8ArrayToStr(array) {
// 	var out, i, len, c;
// 	var char2, char3;
// 	out = "";
// 	len = array.length;
// 	i = 0;
// 	while (i < len) {
// 		c = array[i++];
// 		switch (c >> 4) {
// 			case 0:
// 			case 1:
// 			case 2:
// 			case 3:
// 			case 4:
// 			case 5:
// 			case 6:
// 			case 7:
// 				// 0xxxxxxx
// 				out += String.fromCharCode(c);
// 				break;
// 			case 12:
// 			case 13:
// 				// 110x xxxx 10xx xxxx
// 				char2 = array[i++];
// 				out += String.fromCharCode((c & 0x1f) << 6 | char2 & 0x3f);
// 				break;
// 			case 14:
// 				// 1110 xxxx 10xx xxxx 10xx xxxx
// 				char2 = array[i++];
// 				char3 = array[i++];
// 				out += String.fromCharCode((c & 0x0f) << 12 | (char2 & 0x3f) << 6 | (char3 & 0x3f) << 0);
// 				break;
// 		}
// 	}
// 	return out;
// }