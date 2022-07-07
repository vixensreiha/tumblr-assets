/*! Vtuber List 3.0.0 */
(function(){
    var vtElmnt, vtItem = null, vtHlight = null, vtDdown = null,
        vtRandm = function(o){
            var n = Math.floor((Math.random() * vtItem.length));
            vtFetch( vtItem[n].dataset.group )
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
                purl = "https://vtlist.vxrieha.repl.co/",
                url = "vxrha.blogspot.com/p/"+o+".html";
            fetch(purl+url).then(
                response => response.text()
            ).then(
                vtElmnt.classList.add("is-loading"),
                n.innerHTML = "<div class='gvtb-loader'><div class='gvtb-loader_icon'><div></div><div></div><div></div><div></div></div></div>",
                chHligt(o)
            ).then(a => {
                const p = new DOMParser();
                const d = p.parseFromString(a, "text/html");
                const v = d.documentElement.querySelector("#ambilini");
                vtElmnt.classList.remove("is-loading"),
                n.innerHTML = v.innerHTML
            }).catch(
                (err) => {
                    vtElmnt.classList.remove("is-loading"),
                    console.log("Failed to access Vtuber list data because "+err),
                    n.innerHTML = "<div class='gvtb-error'><h3>Something wrong happen! Try again later...</h3></div>"
                    
                }
            )
        },
        chHligt = function(o){
            var n = vtElmnt.querySelector("[data-group='"+o+"']"),
                a = n.parentElement.querySelectorAll(".rhvtlist-filter_item");
            vtHlight.innerHTML = n.innerHTML,
            a.forEach(el => {
                el.classList.contains('active') && el.classList.remove("active")
            }),
            n.classList.add("active")
        },
        ftDdwn = function(){
            vtHlight.addEventListener("click", function(o) {
                vtDdown.classList.toggle('open')
            }),
            document.addEventListener("click", function(o) {
                !(vtHlight.contains(o.target)) && vtDdown.classList.contains('open') && vtDdown.classList.remove('open')
            })
        };
  
      window.addEventListener('DOMContentLoaded', (event) => {
          vtElmnt = document.querySelector(".rhvtlist"), null != vtElmnt && (
              vtItem = vtItem || vtElmnt.querySelectorAll(".rhvtlist-filter_item"),
              vtHlight = vtHlight || vtElmnt.querySelector(".rhvtlist-filter_hlight"),
              vtDdown = vtDdown || vtElmnt.querySelector(".rhvtlist-filter_items"),
              vtRandm(), vtClick(vtItem), ftDdwn()
          )
      });
    
  })()
