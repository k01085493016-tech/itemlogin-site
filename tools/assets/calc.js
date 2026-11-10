/* 아이템로그 계산기 공통 함수 (서버 전송 없음, 모든 계산은 브라우저 안에서 처리) */
var $ = function (id) { return document.getElementById(id); };
function won(n) { return Math.round(n).toLocaleString('ko-KR') + '원'; }
function parseNum(s) { var v = Number(String(s == null ? '' : s).replace(/[^0-9.\-]/g, '')); return isFinite(v) ? v : 0; }
function bindMoney() {
  document.querySelectorAll('input[data-money]').forEach(function (el) {
    var fmt = function () { var raw = el.value.replace(/[^0-9]/g, ''); el.value = raw ? Number(raw).toLocaleString('ko-KR') : ''; };
    el.addEventListener('input', fmt); fmt();
  });
}
function pad(n) { return String(n).padStart(2, '0'); }
function ymd(d) { return d.getFullYear() + '-' + pad(d.getMonth() + 1) + '-' + pad(d.getDate()); }
function parseDate(s) { if (!s) return null; var p = s.split('-').map(Number); return new Date(p[0], p[1] - 1, p[2]); }
function daysBetween(a, b) {
  return Math.round((Date.UTC(b.getFullYear(), b.getMonth(), b.getDate()) - Date.UTC(a.getFullYear(), a.getMonth(), a.getDate())) / 86400000);
}
function addMonths(d, n) {
  var r = new Date(d.getFullYear(), d.getMonth() + n, 1);
  var last = new Date(r.getFullYear(), r.getMonth() + 1, 0).getDate();
  r.setDate(Math.min(d.getDate(), last));
  return r;
}
function addDays(d, n) { return new Date(d.getFullYear(), d.getMonth(), d.getDate() + n); }
var WD = ['일', '월', '화', '수', '목', '금', '토'];
function rows(list) {
  return list.map(function (r) {
    return '<div class="row' + (r[2] ? ' big' : '') + '"><span>' + r[0] + '</span><b>' + r[1] + '</b></div>';
  }).join('');
}
function setRes(html) { $('res').innerHTML = html; }
function note(type, text) { return '<div class="msg ' + type + '">' + text + '</div>'; }
function onChange(fn) {
  document.querySelectorAll('#calc input, #calc select').forEach(function (el) {
    el.addEventListener('input', fn); el.addEventListener('change', fn);
  });
  var b = $('go'); if (b) b.addEventListener('click', function (e) { e.preventDefault(); fn(); });
  fn();
}
