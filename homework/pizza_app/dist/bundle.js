(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
function PizzaBuilder() {
    self.data = null;
}

PizzaBuilder.prototype.renderSidebar = function (data) {
    window.onload = function () {
        var xhr = new XMLHttpRequest();
        xhr.open("GET", data, true);
        xhr.onreadystatechange = function () {

            if (xhr.readyState == 4 && xhr.status == 200) {
                self.data = JSON.parse(xhr.responseText);
                document.querySelector('.ingredients').innerHTML = self.data['data'][0].name;
            }
        };
        xhr.send();
    };
};

function Table(addBtn, basket, itemCount) {
    self.addBtn = document.querySelector(addBtn);
    self.basket = document.querySelector(basket);
    self.itemCount = document.querySelector(itemCount);
    self.currentIndex = 2;
}

Table.prototype.renderRow = function () {

    function renderRowHandler() {
        return function () {
            var rowTemplate = `<tr>
                           <td class="num">
                               <button class="select-num">${ self.currentIndex }</button>
                               </td>
                               <td class="ingredients"></td>
                               <td class="total">40</td>
                               <td>
                               <button class="remove">x</button>
                           </td>
                           </tr>`;

            self.basket.innerHTML += rowTemplate;
            self.currentIndex += 1;
            Table.prototype.checkCurrentIndex();
            Table.prototype.updateItemCount();
        };
    }
    self.addBtn.addEventListener("click", renderRowHandler());
};

Table.prototype.removeItem = function (event) {
    function removeSelfHandler(event) {
        if (event.target.className == 'remove') {
            var removeRow = event.target.parentNode.parentNode;
            self.basket.removeChild(removeRow);
            Table.prototype.checkCurrentIndex();
            Table.prototype.updateItemCount();
        }
    }
    document.querySelector('body').addEventListener('click', removeSelfHandler);
};

Table.prototype.updateTable = function () {};

Table.prototype.setCurrentItem = function () {};

Table.prototype.updateItemCost = function () {};

Table.prototype.checkCurrentIndex = function () {
    var itemsArray = [].slice.call(document.querySelectorAll(".orders tr .select-num"));
    var i;
    for (i = 0; i < itemsArray.length; i++) {
        itemsArray[i].innerHTML = i + 1;
    }
    var checkItemArray = document.querySelectorAll('.orders tr');
    if (checkItemArray.length == 2) {
        self.currentIndex = 3;
        i = 2;
    }
    if (checkItemArray.length == 1) {
        self.currentIndex = 2;
        i = 1;
    }
};

Table.prototype.updateItemCount = function () {
    var itemsArray = [].slice.call(document.querySelectorAll(".orders tr .select-num"));
    self.itemCount.innerHTML = itemsArray.length;
};

var table = new Table('.add-pizza', '.basket tbody', '.num');
table.checkCurrentIndex();
table.renderRow();
table.removeItem();
table.updateItemCount();
var pizzaBuilder = new PizzaBuilder();
pizzaBuilder.renderSidebar('public/config.json');
console.log(self);

},{}]},{},[1])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJzcmNcXGluZGV4LmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FDQUEsU0FBUyxZQUFULEdBQXVCO0FBQ25CLFNBQUssSUFBTCxHQUFZLElBQVo7QUFDSDs7QUFFRCxhQUFhLFNBQWIsQ0FBdUIsYUFBdkIsR0FBdUMsVUFBUyxJQUFULEVBQWM7QUFDakQsV0FBTyxNQUFQLEdBQWdCLFlBQVk7QUFDeEIsWUFBSSxNQUFNLElBQUksY0FBSixFQUFWO0FBQ0EsWUFBSSxJQUFKLENBQVMsS0FBVCxFQUFnQixJQUFoQixFQUFzQixJQUF0QjtBQUNBLFlBQUksa0JBQUosR0FBeUIsWUFBWTs7QUFFakMsZ0JBQUksSUFBSSxVQUFKLElBQWtCLENBQWxCLElBQXVCLElBQUksTUFBSixJQUFjLEdBQXpDLEVBQThDO0FBQzFDLHFCQUFLLElBQUwsR0FBWSxLQUFLLEtBQUwsQ0FBVyxJQUFJLFlBQWYsQ0FBWjtBQUNBLHlCQUFTLGFBQVQsQ0FBdUIsY0FBdkIsRUFBdUMsU0FBdkMsR0FBbUQsS0FBSyxJQUFMLENBQVUsTUFBVixFQUFrQixDQUFsQixFQUFxQixJQUF4RTtBQUNIO0FBQ0osU0FORDtBQU9BLFlBQUksSUFBSjtBQUNILEtBWEQ7QUFZSCxDQWJEOztBQWVBLFNBQVMsS0FBVCxDQUFlLE1BQWYsRUFBdUIsTUFBdkIsRUFBK0IsU0FBL0IsRUFBMEM7QUFDdEMsU0FBSyxNQUFMLEdBQWMsU0FBUyxhQUFULENBQXVCLE1BQXZCLENBQWQ7QUFDQSxTQUFLLE1BQUwsR0FBYyxTQUFTLGFBQVQsQ0FBdUIsTUFBdkIsQ0FBZDtBQUNBLFNBQUssU0FBTCxHQUFpQixTQUFTLGFBQVQsQ0FBdUIsU0FBdkIsQ0FBakI7QUFDQSxTQUFLLFlBQUwsR0FBb0IsQ0FBcEI7QUFDSDs7QUFFRCxNQUFNLFNBQU4sQ0FBZ0IsU0FBaEIsR0FBNEIsWUFBWTs7QUFFcEMsYUFBUyxnQkFBVCxHQUE0QjtBQUN4QixlQUFPLFlBQVk7QUFDZixnQkFBSSxjQUFlOzs0REFBQSxDQUU2QixLQUFLLFlBQWE7Ozs7Ozs7aUNBRmxFOztBQVdBLGlCQUFLLE1BQUwsQ0FBWSxTQUFaLElBQXlCLFdBQXpCO0FBQ0EsaUJBQUssWUFBTCxJQUFxQixDQUFyQjtBQUNBLGtCQUFNLFNBQU4sQ0FBZ0IsaUJBQWhCO0FBQ0Esa0JBQU0sU0FBTixDQUFnQixlQUFoQjtBQUNILFNBaEJEO0FBaUJIO0FBQ0QsU0FBSyxNQUFMLENBQVksZ0JBQVosQ0FBNkIsT0FBN0IsRUFBc0Msa0JBQXRDO0FBQ0gsQ0F0QkQ7O0FBd0JBLE1BQU0sU0FBTixDQUFnQixVQUFoQixHQUE2QixVQUFVLEtBQVYsRUFBaUI7QUFDMUMsYUFBUyxpQkFBVCxDQUEyQixLQUEzQixFQUFrQztBQUM5QixZQUFJLE1BQU0sTUFBTixDQUFhLFNBQWIsSUFBMEIsUUFBOUIsRUFBd0M7QUFDcEMsZ0JBQUksWUFBWSxNQUFNLE1BQU4sQ0FBYSxVQUFiLENBQXdCLFVBQXhDO0FBQ0EsaUJBQUssTUFBTCxDQUFZLFdBQVosQ0FBd0IsU0FBeEI7QUFDQSxrQkFBTSxTQUFOLENBQWdCLGlCQUFoQjtBQUNBLGtCQUFNLFNBQU4sQ0FBZ0IsZUFBaEI7QUFDSDtBQUNKO0FBQ0QsYUFBUyxhQUFULENBQXVCLE1BQXZCLEVBQStCLGdCQUEvQixDQUFnRCxPQUFoRCxFQUF5RCxpQkFBekQ7QUFDSCxDQVZEOztBQVlBLE1BQU0sU0FBTixDQUFnQixXQUFoQixHQUE4QixZQUFZLENBRXpDLENBRkQ7O0FBSUEsTUFBTSxTQUFOLENBQWdCLGNBQWhCLEdBQWlDLFlBQVksQ0FFNUMsQ0FGRDs7QUFJQSxNQUFNLFNBQU4sQ0FBZ0IsY0FBaEIsR0FBaUMsWUFBWSxDQUU1QyxDQUZEOztBQUtBLE1BQU0sU0FBTixDQUFnQixpQkFBaEIsR0FBb0MsWUFBWTtBQUM1QyxRQUFJLGFBQWEsR0FBRyxLQUFILENBQVMsSUFBVCxDQUFjLFNBQVMsZ0JBQVQsQ0FBMEIsd0JBQTFCLENBQWQsQ0FBakI7QUFDQSxRQUFJLENBQUo7QUFDQSxTQUFLLElBQUksQ0FBVCxFQUFZLElBQUksV0FBVyxNQUEzQixFQUFtQyxHQUFuQyxFQUF3QztBQUNwQyxtQkFBVyxDQUFYLEVBQWMsU0FBZCxHQUEwQixJQUFJLENBQTlCO0FBQ0g7QUFDRCxRQUFJLGlCQUFpQixTQUFTLGdCQUFULENBQTBCLFlBQTFCLENBQXJCO0FBQ0EsUUFBSSxlQUFlLE1BQWYsSUFBeUIsQ0FBN0IsRUFBZ0M7QUFDNUIsYUFBSyxZQUFMLEdBQW9CLENBQXBCO0FBQ0EsWUFBSSxDQUFKO0FBQ0g7QUFDRCxRQUFJLGVBQWUsTUFBZixJQUF5QixDQUE3QixFQUFnQztBQUM1QixhQUFLLFlBQUwsR0FBb0IsQ0FBcEI7QUFDQSxZQUFJLENBQUo7QUFDSDtBQUNKLENBZkQ7O0FBaUJBLE1BQU0sU0FBTixDQUFnQixlQUFoQixHQUFrQyxZQUFZO0FBQzFDLFFBQUksYUFBYSxHQUFHLEtBQUgsQ0FBUyxJQUFULENBQWMsU0FBUyxnQkFBVCxDQUEwQix3QkFBMUIsQ0FBZCxDQUFqQjtBQUNBLFNBQUssU0FBTCxDQUFlLFNBQWYsR0FBMkIsV0FBVyxNQUF0QztBQUNILENBSEQ7O0FBS0EsSUFBSSxRQUFRLElBQUksS0FBSixDQUFVLFlBQVYsRUFBd0IsZUFBeEIsRUFBeUMsTUFBekMsQ0FBWjtBQUNBLE1BQU0saUJBQU47QUFDQSxNQUFNLFNBQU47QUFDQSxNQUFNLFVBQU47QUFDQSxNQUFNLGVBQU47QUFDQSxJQUFJLGVBQWUsSUFBSSxZQUFKLEVBQW5CO0FBQ0EsYUFBYSxhQUFiLENBQTJCLG9CQUEzQjtBQUNBLFFBQVEsR0FBUixDQUFZLElBQVoiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dmFyIGY9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKTt0aHJvdyBmLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsZn12YXIgbD1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwobC5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxsLGwuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pIiwiZnVuY3Rpb24gUGl6emFCdWlsZGVyKCl7XHJcbiAgICBzZWxmLmRhdGEgPSBudWxsO1xyXG59XHJcblxyXG5QaXp6YUJ1aWxkZXIucHJvdG90eXBlLnJlbmRlclNpZGViYXIgPSBmdW5jdGlvbihkYXRhKXtcclxuICAgIHdpbmRvdy5vbmxvYWQgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgdmFyIHhociA9IG5ldyBYTUxIdHRwUmVxdWVzdCgpO1xyXG4gICAgICAgIHhoci5vcGVuKFwiR0VUXCIsIGRhdGEsIHRydWUpO1xyXG4gICAgICAgIHhoci5vbnJlYWR5c3RhdGVjaGFuZ2UgPSBmdW5jdGlvbiAoKSB7XHJcblxyXG4gICAgICAgICAgICBpZiAoeGhyLnJlYWR5U3RhdGUgPT0gNCAmJiB4aHIuc3RhdHVzID09IDIwMCkge1xyXG4gICAgICAgICAgICAgICAgc2VsZi5kYXRhID0gSlNPTi5wYXJzZSh4aHIucmVzcG9uc2VUZXh0KTtcclxuICAgICAgICAgICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5pbmdyZWRpZW50cycpLmlubmVySFRNTCA9IHNlbGYuZGF0YVsnZGF0YSddWzBdLm5hbWU7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9O1xyXG4gICAgICAgIHhoci5zZW5kKCk7XHJcbiAgICB9O1xyXG59O1xyXG5cclxuZnVuY3Rpb24gVGFibGUoYWRkQnRuLCBiYXNrZXQsIGl0ZW1Db3VudCkge1xyXG4gICAgc2VsZi5hZGRCdG4gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKGFkZEJ0bik7XHJcbiAgICBzZWxmLmJhc2tldCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoYmFza2V0KTtcclxuICAgIHNlbGYuaXRlbUNvdW50ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihpdGVtQ291bnQpO1xyXG4gICAgc2VsZi5jdXJyZW50SW5kZXggPSAyO1xyXG59XHJcblxyXG5UYWJsZS5wcm90b3R5cGUucmVuZGVyUm93ID0gZnVuY3Rpb24gKCkge1xyXG5cclxuICAgIGZ1bmN0aW9uIHJlbmRlclJvd0hhbmRsZXIoKSB7XHJcbiAgICAgICAgcmV0dXJuIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgdmFyIHJvd1RlbXBsYXRlID0gYDx0cj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgPHRkIGNsYXNzPVwibnVtXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8YnV0dG9uIGNsYXNzPVwic2VsZWN0LW51bVwiPiR7c2VsZi5jdXJyZW50SW5kZXh9PC9idXR0b24+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L3RkPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHRkIGNsYXNzPVwiaW5ncmVkaWVudHNcIj48L3RkPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHRkIGNsYXNzPVwidG90YWxcIj40MDwvdGQ+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8dGQ+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8YnV0dG9uIGNsYXNzPVwicmVtb3ZlXCI+eDwvYnV0dG9uPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICA8L3RkPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICA8L3RyPmA7XHJcblxyXG4gICAgICAgICAgICBzZWxmLmJhc2tldC5pbm5lckhUTUwgKz0gcm93VGVtcGxhdGU7XHJcbiAgICAgICAgICAgIHNlbGYuY3VycmVudEluZGV4ICs9IDE7XHJcbiAgICAgICAgICAgIFRhYmxlLnByb3RvdHlwZS5jaGVja0N1cnJlbnRJbmRleCgpO1xyXG4gICAgICAgICAgICBUYWJsZS5wcm90b3R5cGUudXBkYXRlSXRlbUNvdW50KCk7XHJcbiAgICAgICAgfTtcclxuICAgIH1cclxuICAgIHNlbGYuYWRkQnRuLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCByZW5kZXJSb3dIYW5kbGVyKCkpO1xyXG59O1xyXG5cclxuVGFibGUucHJvdG90eXBlLnJlbW92ZUl0ZW0gPSBmdW5jdGlvbiAoZXZlbnQpIHtcclxuICAgIGZ1bmN0aW9uIHJlbW92ZVNlbGZIYW5kbGVyKGV2ZW50KSB7XHJcbiAgICAgICAgaWYgKGV2ZW50LnRhcmdldC5jbGFzc05hbWUgPT0gJ3JlbW92ZScpIHtcclxuICAgICAgICAgICAgdmFyIHJlbW92ZVJvdyA9IGV2ZW50LnRhcmdldC5wYXJlbnROb2RlLnBhcmVudE5vZGU7XHJcbiAgICAgICAgICAgIHNlbGYuYmFza2V0LnJlbW92ZUNoaWxkKHJlbW92ZVJvdyk7XHJcbiAgICAgICAgICAgIFRhYmxlLnByb3RvdHlwZS5jaGVja0N1cnJlbnRJbmRleCgpO1xyXG4gICAgICAgICAgICBUYWJsZS5wcm90b3R5cGUudXBkYXRlSXRlbUNvdW50KCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcignYm9keScpLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgcmVtb3ZlU2VsZkhhbmRsZXIpO1xyXG59O1xyXG5cclxuVGFibGUucHJvdG90eXBlLnVwZGF0ZVRhYmxlID0gZnVuY3Rpb24gKCkge1xyXG5cclxufTtcclxuXHJcblRhYmxlLnByb3RvdHlwZS5zZXRDdXJyZW50SXRlbSA9IGZ1bmN0aW9uICgpIHtcclxuXHJcbn07XHJcblxyXG5UYWJsZS5wcm90b3R5cGUudXBkYXRlSXRlbUNvc3QgPSBmdW5jdGlvbiAoKSB7XHJcblxyXG59O1xyXG5cclxuXHJcblRhYmxlLnByb3RvdHlwZS5jaGVja0N1cnJlbnRJbmRleCA9IGZ1bmN0aW9uICgpIHtcclxuICAgIHZhciBpdGVtc0FycmF5ID0gW10uc2xpY2UuY2FsbChkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKFwiLm9yZGVycyB0ciAuc2VsZWN0LW51bVwiKSk7XHJcbiAgICB2YXIgaTtcclxuICAgIGZvciAoaSA9IDA7IGkgPCBpdGVtc0FycmF5Lmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgaXRlbXNBcnJheVtpXS5pbm5lckhUTUwgPSBpICsgMTtcclxuICAgIH1cclxuICAgIHZhciBjaGVja0l0ZW1BcnJheSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5vcmRlcnMgdHInKTtcclxuICAgIGlmIChjaGVja0l0ZW1BcnJheS5sZW5ndGggPT0gMikge1xyXG4gICAgICAgIHNlbGYuY3VycmVudEluZGV4ID0gMztcclxuICAgICAgICBpID0gMjtcclxuICAgIH1cclxuICAgIGlmIChjaGVja0l0ZW1BcnJheS5sZW5ndGggPT0gMSkge1xyXG4gICAgICAgIHNlbGYuY3VycmVudEluZGV4ID0gMjtcclxuICAgICAgICBpID0gMTtcclxuICAgIH1cclxufTtcclxuXHJcblRhYmxlLnByb3RvdHlwZS51cGRhdGVJdGVtQ291bnQgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICB2YXIgaXRlbXNBcnJheSA9IFtdLnNsaWNlLmNhbGwoZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChcIi5vcmRlcnMgdHIgLnNlbGVjdC1udW1cIikpO1xyXG4gICAgc2VsZi5pdGVtQ291bnQuaW5uZXJIVE1MID0gaXRlbXNBcnJheS5sZW5ndGg7XHJcbn07XHJcblxyXG52YXIgdGFibGUgPSBuZXcgVGFibGUoJy5hZGQtcGl6emEnLCAnLmJhc2tldCB0Ym9keScsICcubnVtJyk7XHJcbnRhYmxlLmNoZWNrQ3VycmVudEluZGV4KCk7XHJcbnRhYmxlLnJlbmRlclJvdygpO1xyXG50YWJsZS5yZW1vdmVJdGVtKCk7XHJcbnRhYmxlLnVwZGF0ZUl0ZW1Db3VudCgpO1xyXG52YXIgcGl6emFCdWlsZGVyID0gbmV3IFBpenphQnVpbGRlcigpO1xyXG5waXp6YUJ1aWxkZXIucmVuZGVyU2lkZWJhcigncHVibGljL2NvbmZpZy5qc29uJyk7XHJcbmNvbnNvbGUubG9nKHNlbGYpO1xyXG4iXX0=
