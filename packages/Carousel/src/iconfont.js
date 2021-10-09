!(function (t) {
  var e,
    n,
    o,
    i,
    l,
    c =
      '<svg><symbol id="icon-angle-right" viewBox="0 0 1024 1024"><path d="M610.88 512L192 93.12 285.12 0l512 512-512 512L192 930.88z" fill="#44caff" ></path></symbol><symbol id="icon-angle-left" viewBox="0 0 1024 1024"><path d="M378.24 512l418.88 418.88L704 1024 192 512l512-512 93.12 93.12z" fill="#44caff" ></path></symbol><symbol id="icon-pullleft" viewBox="0 0 1024 1024"><path d="M512 960C264.96 960 64 759.04 64 512S264.96 64 512 64s448 200.96 448 448S759.04 960 512 960zM512 128C300.256 128 128 300.256 128 512c0 211.744 172.256 384 384 384 211.744 0 384-172.256 384-384C896 300.256 723.744 128 512 128z"  ></path><path d="M290.368 524.352c0.032 0.128 0.192 0.256 0.256 0.384 1.536 3.616 3.648 7.072 6.592 10.048 0.032 0.032 0.064 0.032 0.096 0.064s0.032 0.064 0.064 0.096l158.912 159.36c12.48 12.512 32.704 12.576 45.248 0.064 12.512-12.48 12.544-32.704 0.064-45.248l-103.328-103.616 305.056 0c17.664 0 32-14.336 32-32s-14.336-32-32-32l-306.752 0 106.112-104.96c12.576-12.448 12.672-32.672 0.256-45.248-6.24-6.336-14.496-9.504-22.752-9.504-8.128 0-16.256 3.104-22.496 9.248l-160.256 158.496C288 498.912 285.632 512.704 290.368 524.352z"  ></path></symbol><symbol id="icon-pullright" viewBox="0 0 1024 1024"><path d="M512 960C264.96 960 64 759.04 64 512S264.96 64 512 64s448 200.96 448 448S759.04 960 512 960zM512 128C300.256 128 128 300.256 128 512c0 211.744 172.256 384 384 384 211.744 0 384-172.256 384-384C896 300.256 723.744 128 512 128z"  ></path><path d="M732.96 501.152c-0.032-0.128-0.192-0.256-0.256-0.384-1.536-3.616-3.648-7.072-6.592-10.048-0.032-0.032-0.064-0.032-0.096-0.064s-0.032-0.064-0.064-0.096l-158.912-159.36c-12.48-12.48-32.704-12.576-45.248-0.064-12.512 12.48-12.544 32.736-0.064 45.248L625.056 480 320 480c-17.664 0-32 14.336-32 32s14.336 32 32 32l306.752 0-106.112 104.96c-12.576 12.448-12.672 32.672-0.256 45.248 6.24 6.336 14.496 9.504 22.752 9.504 8.128 0 16.256-3.104 22.496-9.248l160.256-158.496C735.328 526.592 737.728 512.768 732.96 501.152z"  ></path></symbol></svg>',
    d = (d = document.getElementsByTagName('script'))[
      d.length - 1
    ].getAttribute('data-injectcss'),
    a = function (t, e) {
      e.parentNode.insertBefore(t, e);
    };
  if (d && !t.__iconfont__svg__cssinject__) {
    t.__iconfont__svg__cssinject__ = !0;
    try {
      document.write(
        '<style>.svgfont {display: inline-block;width: 1em;height: 1em;fill: currentColor;vertical-align: -0.1em;font-size:16px;}</style>',
      );
    } catch (t) {
      console && console.log(t);
    }
  }
  function s() {
    l || ((l = !0), o());
  }
  function r() {
    try {
      i.documentElement.doScroll('left');
    } catch (t) {
      return void setTimeout(r, 50);
    }
    s();
  }
  (e = function () {
    var t, e;
    ((e = document.createElement('div')).innerHTML = c),
      (c = null),
      (t = e.getElementsByTagName('svg')[0]) &&
        (t.setAttribute('aria-hidden', 'true'),
        (t.style.position = 'absolute'),
        (t.style.width = 0),
        (t.style.height = 0),
        (t.style.overflow = 'hidden'),
        (e = t),
        (t = document.body).firstChild ? a(e, t.firstChild) : t.appendChild(e));
  }),
    document.addEventListener
      ? ~['complete', 'loaded', 'interactive'].indexOf(document.readyState)
        ? setTimeout(e, 0)
        : ((n = function () {
            document.removeEventListener('DOMContentLoaded', n, !1), e();
          }),
          document.addEventListener('DOMContentLoaded', n, !1))
      : document.attachEvent &&
        ((o = e),
        (i = t.document),
        (l = !1),
        r(),
        (i.onreadystatechange = function () {
          'complete' == i.readyState && ((i.onreadystatechange = null), s());
        }));
})(window);
