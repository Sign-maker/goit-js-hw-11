!function(){function e(e){return e&&e.__esModule?e.default:e}var t="undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self?self:"undefined"!=typeof window?window:"undefined"!=typeof global?global:{},n={},r={},a=t.parcelRequired7c6;null==a&&((a=function(e){if(e in n)return n[e].exports;if(e in r){var t=r[e];delete r[e];var a={id:e,exports:{}};return n[e]=a,t.call(a.exports,a,a.exports),a.exports}var o=new Error("Cannot find module '"+e+"'");throw o.code="MODULE_NOT_FOUND",o}).register=function(e,t){r[e]=t},t.parcelRequired7c6=a);var o=a("bpxeT"),i=a("dDDEV"),s=a("2TvXO"),c=a("6JpON");a("5IjG7");var l=a("kZWxX"),u=a("hDTxg"),d=a("ip97o"),p=a("gx7bW"),f=document.querySelector("#search-form"),h=document.querySelector(".load-more-btn"),g=document.querySelector(".search-loader"),m=document.querySelector(".load-more-loader"),y=document.querySelector(".gallery");e(c).Notify.init({fontSize:"16px",timeout:5e3});var b=new(0,l.PixabayAPI),v=new(0,u.Button)(h),w=new(0,d.Loader)(g,"🔍"),x=new(0,d.Loader)(m,"🎞️"),L=new SimpleLightbox(".gallery a",{});function N(){return(N=e(o)(e(s).mark((function t(n){var r,a,o;return e(s).wrap((function(t){for(;;)switch(t.prev=t.next){case 0:if(n.preventDefault(),r=n.target.elements.searchQuery.value.trim()){t.next=5;break}return e(c).Notify.warning("Plase input search query!"),t.abrupt("return");case 5:return b.params.page=1,C(),v.isVisible&&v.hide(),b.params=e(i)({},b.params,{q:r}),t.prev=9,n.target.lastElementChild.disabled=!0,w.show(),t.next=14,b.getCards();case 14:if(a=t.sent,o=a.totalHits){t.next=19;break}return e(c).Notify.failure("Sorry, there are no images matching your search query. Please try again."),t.abrupt("return");case 19:e(c).Notify.success("".concat(o," image").concat(1===o?"":"s"," finded")),b.totalPages=Math.ceil(o/b.params.per_page),E(a.hits),L.refresh(),q()?(b.params.page+=1,v.show(),v.enable()):e(c).Notify.success("We're sorry, but you've reached the end of search results."),t.next=30;break;case 26:t.prev=26,t.t0=t.catch(9),console.log(t.t0),e(c).Notify.failure("Oops, something went wrong, try again!");case 30:return t.prev=30,w.hide(),n.target.lastElementChild.disabled=!1,t.finish(30);case 34:case"end":return t.stop()}}),t,null,[[9,26,30,34]])})))).apply(this,arguments)}function k(){return(k=e(o)(e(s).mark((function t(){return e(s).wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.prev=0,v.disable(),x.show(),t.next=5,b.getCards();case 5:E(t.sent.hits),S(),L.refresh(),v.enable(),q()?b.params.page+=1:(e(c).Notify.success("We're sorry, but you've reached the end of search results."),v.hide()),t.next=17;break;case 13:t.prev=13,t.t0=t.catch(0),console.log(t.t0),e(c).Notify.failure("Oops, something went wrong, try again!");case 17:return t.prev=17,x.hide(),t.finish(17);case 20:case"end":return t.stop()}}),t,null,[[0,13,17,20]])})))).apply(this,arguments)}function q(){return b.totalPages>b.params.page}function T(e){var t=e.webformatURL,n=e.largeImageURL,r=e.likes,a=e.views,o=e.comments,i=e.downloads,s=e.tags;return'<div class="photo-card">\n      <a href="'.concat(n,'"><img src="').concat(t,'" alt="').concat(s,'" loading="lazy" /></a>\n      <div class="info">\n        <p class="info-item">\n          <b>Likes</b>').concat(r,'\n        </p>\n        <p class="info-item">\n          <b>Views</b>').concat(a,'\n        </p>\n        <p class="info-item">\n          <b>Comments</b>').concat(o,'\n        </p>\n        <p class="info-item">\n          <b>Downloads</b>').concat(i,"\n        </p>\n      </div>\n    </div>")}function C(){y.innerHTML=""}function E(e){var t=e.map(T).join("");y.insertAdjacentHTML("beforeend",t)}function S(){var e=y.firstElementChild.getBoundingClientRect().height;window.scrollBy({top:2*e,behavior:"smooth"})}w.hide(),v.hide(),v.disable(),x.hide(),f.addEventListener("submit",(function(e){return N.apply(this,arguments)})),h.addEventListener("click",(function(){return k.apply(this,arguments)})),(0,p.goTopBtnHandler)()}();
//# sourceMappingURL=index.7421ce11.js.map