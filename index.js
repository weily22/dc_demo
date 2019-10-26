/*
 * @Author: Weily
 * @Date: 2019-10-21 13:18:13
 * @Description: file content
 * @LastEditors: Weily
 * @LastEditTime: 2019-10-21 15:50:28
 */
var i = 10;
var smsback = "";
function getSms () {
  var mobileReg = /^((13[0-9])|(14[5,7])|(15[0-3,5-9])|(17[0,3,5-8])|(18[0-9])|166|198|199|(147))\d{8}$/;
  var mobile = $("#mobile").val();
  mobile = mobile.replace(/[^0-9]/ig, "");
  if (!mobileReg.test(mobile)){
    $('#iphone_valid').html('请填写正确的手机号码')
    return;
  }
  if (i == 10){
    changeMsg();
  } else {
    return;
  }
  $('#valid').html('')
  $('#mobile')[0].className = "iphone_code";
  $('#phone_c').attr('placeholder','手机验证码已发送')
}

function changeMsg () {
  if (i > 0) {
    $('#code').html(i + ' 秒可重发');
    i--;
    setTimeout('changeMsg()', 1000);
  } else {
    $('#phone_c').attr('placeholder','请输入手机码')
    $('#code').html('获取验证码');
    i = 10;
  }
}

// 模拟验证码生成
function createCode(length) {
  var code = "";
  var codeLength = parseInt(length); //验证码的长度
  var img_code = document.getElementById('img_code');
  var codeChars = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9,
  'a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z',
  'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'); 
  for (var i = 0; i < codeLength; i++) {
    var charNum = Math.floor(Math.random() * 62);
    code += codeChars[charNum];
  }
  if (img_code) {
    img_code.innerHTML = code;
  }
}


function onInput () {
  var value = $('#mobile').val();
  if (value == '') {
    $('#valid').html('')
    $('#mobile')[0].className = "iphone_code";
  }
}

function reload() {
  location.reload();
}


function login() {
  $('.valid').html('');
  var name = $("#name").val();
  var password = $("#password").val();
  var img = $('#img').val();
  var mobile = $('#mobile').val();
  var phone_c = $('#phone_c').val();
  var imgCode = $('#img_code').html();
  var arr = [name, password, img, mobile, phone_c];
  var errArr = ['请输入账号', '请输入密码', '请输入图形码', '请输入手机号', '请输入手机码']

  for (var i = 0, len = arr.length; i < len; i++) {
    if (i == 2) {
      if (img.toUpperCase() !== imgCode.toUpperCase()) {
        $('.valid')[i].innerHTML = '图形码不正确';
        return
      }
    }
    if (!arr[i] || arr[i] === errArr[i] ) {
      $('.valid')[i].innerHTML = errArr[i];
      return
    }
  }
}

// <!--360 兼容-->
function initBrowser () {
  function _mime(option, value) {
    var mimeTypes = navigator.mimeTypes;
    for (var i =0, len = mimeTypes.length; i < len; i++) {
      if (mimeTypes[i].type == value) {
        return true
      }
    }
    return false;
  }
  var is360 = _mime("type", "application/vnd.chromium.remoting-viewer");
  if (is360) {
    alert('360')
    $('body').addClass('browser_360');
  }
}

initBrowser();


$('.a').on('click', function (e) {
  $('#name').focus();
})
$('.b').on('click', function (e) {
  $('#password').focus();
})
$('.c').on('click', function (e) {
  $('#img').focus();
})
$('.d').on('click', function (e) {
  $('#mobile').focus();
})
$('.e').on('click', function (e) {
  $('#phone_c').focus();
})

$('#mobile').on('keyup', function () {
  var that = $(this);
  var value = that.val();
  value = value.replace(/[^0-9]/ig, "");
  var arr = value.split('');
  if (arr.length >= 4) {
    arr.splice(3, 0, ' ');
  }
  if (arr.length >= 9) { 
    arr.splice(8, 0, ' ');
  }
  value = arr.join('');
  that.val(value);
})

// $('#name, #password, #img, #mobile, #phone_c').each(function (index) {
//   $(this).on('keyup', function() {
//     if ($(this).val()) {
//       $('.pholder').eq(index).addClass('hide')
//     } else {
//       $('.pholder').eq(index).removeClass('hide');
//     }
//   });
// })


if (window.attachEvent) {    
  window.attachEvent('touchstart', function() {});    
} else if (window.addEventListener) {    
  window.addEventListener("touchstart", function() {});      
}  

var w = window.innerWidth;
var h = window.innerHeight;
window.onresize = function(){
  if(w<window.innerWidth||h< window.innerHeight){
    if (window.innerWidth > 800) {
      $('footer').addClass('absolute')
    } else {
      $('footer').removeClass('absolute')
    }
  } else {
    $('footer').removeClass('absolute')
  }
}
