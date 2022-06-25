/*! Vtuber List 2.0 */
(function(){
  var vtElmnt, vtItem = null, vtHlight = null, vtDdown = null, vtArray = [],
      vtRandm = function(o){
          var rd = Math.floor((Math.random() * vtItem.length));
          var rdo = vtItem[rd].dataset.group;
          vtFetch(rdo)
      },
      vtClick = function(o){
          o.forEach(el => {
              el.addEventListener("click", function(o) {
                  var n, e = el.dataset.group;
                  !(el.classList.contains("active")) && vtFetch(e)
              })
          })
      },
      vtFetch = function(o){
          var n = vtElmnt.querySelector("#groupvtuber"),
              proxyurl = "https://vtlist.vxrieha.repl.co/",
              url = "betavozko.blogspot.com/p/"+o+".html";
          fetch(proxyurl+url).then(
              response => response.text()
          ).then(
              vtElmnt.classList.add("is-loading"),
              n.innerHTML = "<div class='gvtb-loader'><div class='gvtb-loader_icon'><div></div><div></div><div></div><div></div></div></div>",
              chHligt(o)
          ).then(a => {
              const p = new DOMParser();
              const d = p.parseFromString(a, "text/html");
              const v = d.documentElement.querySelector("#getelement");
              vtElmnt.classList.remove("is-loading");
              vtElmnt.querySelector("#groupvtuber").innerHTML = v.innerHTML
          }).catch(
              (err) => {
                  vtElmnt.classList.remove("is-loading"),
                  console.log("Failed to access Vtuber list data because "+err),
                  n.innerHTML = "<div class='gvtb-error'><h3>Something wrong happen! Try again later...</h3></div>"
                  
              }
          )
      },
      chClass = function(o){
          var n = o.parentElement.querySelectorAll(".rhvtlist-filter_item");
          n.forEach(el => {
              el.classList.contains('active') && el.classList.remove("active")
          })
          o.classList.add("active")
      },
      chHligt = function(o){
          var n = vtElmnt.querySelector("[data-group='"+o+"']");
          chClass(n), vtHlight.innerHTML = n.innerHTML
      }
      ddOpen = function(o){
          o.addEventListener("click", function(o) {
              vtDdown.classList.toggle('open')
          })
      },
      ddClose = function(){
          document.addEventListener("click", function(e) {
              if(!vtHlight.contains(e.target)) { vtDdown.classList.remove('open') }
          });
      };

    window.addEventListener('DOMContentLoaded', (event) => {
        vtElmnt = document.querySelector(".rhvtlist"), null != vtElmnt && (
            vtItem = vtItem || vtElmnt.querySelectorAll(".rhvtlist-filter_item"),
            vtHlight = vtHlight || vtElmnt.querySelector(".rhvtlist-filter_hlight"),
            vtDdown = vtDdown || vtElmnt.querySelector(".rhvtlist-filter_items"),
            vtRandm(), vtClick(vtItem), ddOpen(vtHlight), ddClose()
        )
    });
  
})()
