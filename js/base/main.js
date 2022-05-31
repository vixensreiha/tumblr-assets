(function (root) {
  var o = {
        hiddenlog: "Observer V2 by Reiha",
        lazyimage: "lazyimage",
        lazyiframe: "lazyiframe",
        audioext: "audiowrapper",
        scrolly: "scrolly"
      },
      v = function(e,t,n) {
        console && console.log && (t = t || "", e = e || "", n = n || {JSPlaintextAccentColor}, console.log("%c " + e + " ", "border-left: 5px solid " + n + "; color: #f3f6f8; background: #2a3b44; font-family: Monaco; padding: 0 2px 1px; border-radius: 3px; font-size: 20px", t))
      },
      r = function() {
        return {
          rootMargin: "64px"
        }
      },
      b = function(d,o) {
        o.addEventListener("click", function() {
          d.scrollTo({
            top: 0,
            behavior: "smooth"
          });
        })
      },
      a = function(z) {
        var x = root.documentElement,
            y = root.getElementById(z);
        root.addEventListener("scroll", function() {
          var ht = 0.5,
              hH = x.scrollHeight - x.clientHeight,
              dS = x.scrollTop;
          ( (dS / hH ) > ht ) ? root.body.classList.add("scrolly-show") : root.body.classList.remove("scrolly-show")
        }), b(x,y)
      },
      c = function(z) {
        var x = root.querySelectorAll("." + z);
        if(x.length > 0){
          if ('IntersectionObserver' in window && 'IntersectionObserverEntry' in window && 'intersectionRatio' in window.IntersectionObserverEntry.prototype) {
            var observer = new IntersectionObserver(function(entries, observer) {
              entries.forEach(function(entry) {
                if (entry.isIntersecting) {
                  observer.unobserve(entry.target);
                  entry.target.innerHTML = entry.target.querySelector(".lazyiframe-trueVideo").innerHTML;
                  entry.target.classList.remove("lazyiframe");
                }
              });
            }, r() );
            x.forEach(function(i) {
              observer.observe(i);
            });
          } else {
            for (var i = 0; i < x.length; i++) {
              x[i].innerHTML = x[i].querySelector(".lazyiframe-trueVideo").innerHTML;
              x[i].classList.remove("lazyiframe");
            }
          }
        }
      },
      d = function(z) {
        var x = root.querySelectorAll("." + z + " iframe");
        for(var i = 0, len = x.length; i < len; i++) {
          var y = x[i].parentElement;
          !(x[i].classList.contains('tumblr_audio_player')) && y.classList.add("audio-external")
        }
      };

  const init = function (z) {
      var n = root.querySelectorAll("." + z.lazyimage);
      v(z.hiddenlog), lazyload(n,r()), a(z.scrolly), c(z.lazyiframe), d(z.audioext)
  }
  init(o)
})(document);
