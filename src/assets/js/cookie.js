/* 用export把方法暴露出来 */
/* 设置cookie */
export function setCookie (cname, value, expire) {
  var date = new Date()
  date.setSeconds(date.getSeconds() + expire)
  document.cookie = cname + '=' + escape(value) + '; expires=' + date.toGMTString()
// console.log(document.cookie)
}

/* 获取cookie */
export function getCookie (cname) {
  if (document.cookie.length > 0) {
    let cstart = document.cookie.indexOf(cname + '=')
    if (cstart !== -1) {
      cstart = cstart + cname.length + 1
      let cend = document.cookie.indexOf(';', cstart)
      if (cend === -1) cend = document.cookie.length
      return unescape(document.cookie.substring(cstart, cend))
    }
  }
  return ''
}

/* 删除cookie */
export function delCookieOne (cname) {
  setCookie(cname, '', -1)
}

export function delCookie () {
  var keys = document.cookie.match(/[^ =;]+(?=\\=)/g)
  if (keys) {
    for (var i = keys.length; i--;) {
      document.cookie = keys[i] + '=0;expires=' + new Date(0).toUTCString()
    }
  }
}

/* 截取字符串,并返回截取的第一个值 */
export function sliceStr (s) {
  var str
  if (s) {
    var arr = s.split('_')
    str = arr[0]
  } else {
    str = '-'
  }
  return str
}

/* 检测字符串是否为空字符 */
export function checkStr (s) {
  var str
  if (s === '' && s !== '0') {
    str = '-'
  } else {
    str = s
  }
  return str
}

/* 页面数据统计 */
export function PageStatistics () {
// var cnzz_protocol = (("https:" == document.location.protocol) ? " https://" : " http://");
// document.write(unescape("%3Cspan id='cnzz_stat_icon_1267932041'%3E%3C/span%3E%3Cscript src='" + cnzz_protocol + "s13.cnzz.com/z_stat.php%3Fid%3D1267932041%26show%3Dpic' type='text/javascript'%3E%3C/script%3E"));
}
