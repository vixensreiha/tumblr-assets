/*! Vtuber List 1.0 */
(function(){
  var vtElmnt, vtArray = [],
      vtRandm = function(o){
          o.forEach(el => {
            var n;
            vtArray.push( el.dataset.group );
            n = vtArray[Math.floor(Math.random() * vtArray.length)];
            vtFetch(n)
          })
      },
      vtClick = function(o){
          o.forEach(el => {
              el.addEventListener("click", function(o) {
                  var n, e = el.dataset.group;
                  vtFetch(e)
              })
          })
      },
      vtFetch = function(o){
          var n = vtElmnt.querySelector("#groupvtuber"),
              proxyurl = "https://reihacors.herokuapp.com/",
              url = "https://betavozko.blogspot.com/p/"+o+".html";
          fetch(proxyurl + url).then(
              response => response.text()
          ).then(
              vtElmnt.classList.add("loading") ,n.innerHTML = "<p>Loading</p>"
          ).then(a => {
              const p = new DOMParser();
              const d = p.parseFromString(a, "text/html");
              const v = d.documentElement.querySelector("#getelement");
              vtElmnt.classList.remove("loading"); chHligt(o);
              vtElmnt.querySelector("#groupvtuber").innerHTML = v.innerHTML
          }).catch(
              (err) => console.log("Failed to access Vtuber list data because "+err)
          )
      },
      chClass = function(o){
          var n = o.parentElement.querySelectorAll(".rhvtlist-filter-group");
          n.forEach(el => {
              el.classList.contains('active') && el.classList.remove("active")
          })
          o.classList.add("active")
      },
      chHligt = function(o){
          var n = vtElmnt.querySelector("[data-group='"+o+"']");
          chClass(n), vtElmnt.querySelector(".rhvtlist-filter-hlight").innerHTML = n.innerHTML
      };

    window.addEventListener('DOMContentLoaded', (event) => {
        var n;
        vtElmnt = document.querySelector(".rhvtlist"), null != vtElmnt && (
            n = vtElmnt.querySelectorAll(".rhvtlist-filter-group"), vtRandm(n), vtClick(n)
        )
    });
  
})()
