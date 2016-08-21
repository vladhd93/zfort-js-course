(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
function pizzaBuilder() {
    Table.apply(this, arguments);
    var self = this;
}

function Table(addBtn, basket, itemCount) {
    self.addBtn = document.querySelector(addBtn);
    self.basket = document.querySelector(basket);
    self.itemCount = document.querySelector(itemCount);
    self.currentIndex = 0;
}

Table.prototype.renderRow = function () {

    function renderRowHandler() {
        Table.prototype.checkCurrentIndex();
        var index;
        if (self.currentIndex >= 1) {
            index = 2;
        }

        return function () {

            var rowTemplate = `<tr>
                           <td class="num">
                               <button class="select-num">${ index }</button>
                               </td>
                               <td class="ingredients"></td>
                               <td class="total">40</td>
                               <td>
                               <button class="remove">x</button>
                           </td>
                           </tr>`;

            self.basket.innerHTML += rowTemplate;
            index++;

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
    for (i = 1; i < itemsArray.length; i++) {
        itemsArray[i].innerHTML = i;
    }
    var checkItemArray = document.querySelectorAll('.orders tr');
    if (checkItemArray.length == 1) {
        self.currentIndex = 2;
        i = 2;
    }
    if (checkItemArray.length == 0) {
        self.currentIndex = 1;
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

},{}]},{},[1])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJzcmNcXGluZGV4LmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FDQUEsU0FBUyxZQUFULEdBQXdCO0FBQ3BCLFVBQU0sS0FBTixDQUFZLElBQVosRUFBa0IsU0FBbEI7QUFDQSxRQUFJLE9BQU8sSUFBWDtBQUdIOztBQUVELFNBQVMsS0FBVCxDQUFlLE1BQWYsRUFBdUIsTUFBdkIsRUFBK0IsU0FBL0IsRUFBMEM7QUFDdEMsU0FBSyxNQUFMLEdBQWMsU0FBUyxhQUFULENBQXVCLE1BQXZCLENBQWQ7QUFDQSxTQUFLLE1BQUwsR0FBYyxTQUFTLGFBQVQsQ0FBdUIsTUFBdkIsQ0FBZDtBQUNBLFNBQUssU0FBTCxHQUFpQixTQUFTLGFBQVQsQ0FBdUIsU0FBdkIsQ0FBakI7QUFDQSxTQUFLLFlBQUwsR0FBb0IsQ0FBcEI7QUFDSDs7QUFFRCxNQUFNLFNBQU4sQ0FBZ0IsU0FBaEIsR0FBNEIsWUFBWTs7QUFHcEMsYUFBUyxnQkFBVCxHQUE0QjtBQUN4QixjQUFNLFNBQU4sQ0FBZ0IsaUJBQWhCO0FBQ0EsWUFBSSxLQUFKO0FBQ0EsWUFBSSxLQUFLLFlBQUwsSUFBcUIsQ0FBekIsRUFBNEI7QUFDeEIsb0JBQVEsQ0FBUjtBQUNIOztBQUVELGVBQU8sWUFBWTs7QUFFZixnQkFBSSxjQUFlOzs0REFBQSxDQUU2QixLQUFNOzs7Ozs7O2lDQUZ0RDs7QUFXQSxpQkFBSyxNQUFMLENBQVksU0FBWixJQUF5QixXQUF6QjtBQUNBOztBQUdBLGtCQUFNLFNBQU4sQ0FBZ0IsZUFBaEI7QUFFSCxTQW5CRDtBQXFCSDs7QUFFRCxTQUFLLE1BQUwsQ0FBWSxnQkFBWixDQUE2QixPQUE3QixFQUFzQyxrQkFBdEM7QUFFSCxDQW5DRDs7QUFxQ0EsTUFBTSxTQUFOLENBQWdCLFVBQWhCLEdBQTZCLFVBQVUsS0FBVixFQUFpQjtBQUMxQyxhQUFTLGlCQUFULENBQTJCLEtBQTNCLEVBQWtDOztBQUU5QixZQUFJLE1BQU0sTUFBTixDQUFhLFNBQWIsSUFBMEIsUUFBOUIsRUFBd0M7O0FBRXBDLGdCQUFJLFlBQVksTUFBTSxNQUFOLENBQWEsVUFBYixDQUF3QixVQUF4QztBQUNBLGlCQUFLLE1BQUwsQ0FBWSxXQUFaLENBQXdCLFNBQXhCO0FBQ0Esa0JBQU0sU0FBTixDQUFnQixpQkFBaEI7QUFDQSxrQkFBTSxTQUFOLENBQWdCLGVBQWhCO0FBQ0g7QUFFSjs7QUFFRCxhQUFTLGFBQVQsQ0FBdUIsTUFBdkIsRUFBK0IsZ0JBQS9CLENBQWdELE9BQWhELEVBQXlELGlCQUF6RDtBQUVILENBZkQ7O0FBaUJBLE1BQU0sU0FBTixDQUFnQixXQUFoQixHQUE4QixZQUFZLENBRXpDLENBRkQ7O0FBSUEsTUFBTSxTQUFOLENBQWdCLGNBQWhCLEdBQWlDLFlBQVksQ0FFNUMsQ0FGRDs7QUFJQSxNQUFNLFNBQU4sQ0FBZ0IsY0FBaEIsR0FBaUMsWUFBWSxDQUU1QyxDQUZEOztBQUtBLE1BQU0sU0FBTixDQUFnQixpQkFBaEIsR0FBb0MsWUFBWTtBQUM1QyxRQUFJLGFBQWEsR0FBRyxLQUFILENBQVMsSUFBVCxDQUFjLFNBQVMsZ0JBQVQsQ0FBMEIsd0JBQTFCLENBQWQsQ0FBakI7QUFDQSxRQUFJLENBQUo7QUFDQSxTQUFLLElBQUksQ0FBVCxFQUFZLElBQUksV0FBVyxNQUEzQixFQUFtQyxHQUFuQyxFQUF3QztBQUNwQyxtQkFBVyxDQUFYLEVBQWMsU0FBZCxHQUEwQixDQUExQjtBQUNIO0FBQ0QsUUFBSSxpQkFBaUIsU0FBUyxnQkFBVCxDQUEwQixZQUExQixDQUFyQjtBQUNBLFFBQUksZUFBZSxNQUFmLElBQXlCLENBQTdCLEVBQWdDO0FBQzVCLGFBQUssWUFBTCxHQUFvQixDQUFwQjtBQUNBLFlBQUksQ0FBSjtBQUNIO0FBQ0QsUUFBSSxlQUFlLE1BQWYsSUFBeUIsQ0FBN0IsRUFBZ0M7QUFDNUIsYUFBSyxZQUFMLEdBQW9CLENBQXBCO0FBQ0EsWUFBSSxDQUFKO0FBQ0g7QUFFSixDQWhCRDs7QUFrQkEsTUFBTSxTQUFOLENBQWdCLGVBQWhCLEdBQWtDLFlBQVk7O0FBRTFDLFFBQUksYUFBYSxHQUFHLEtBQUgsQ0FBUyxJQUFULENBQWMsU0FBUyxnQkFBVCxDQUEwQix3QkFBMUIsQ0FBZCxDQUFqQjtBQUNBLFNBQUssU0FBTCxDQUFlLFNBQWYsR0FBMkIsV0FBVyxNQUF0QztBQUNILENBSkQ7O0FBTUEsSUFBSSxRQUFRLElBQUksS0FBSixDQUFVLFlBQVYsRUFBd0IsZUFBeEIsRUFBeUMsTUFBekMsQ0FBWjtBQUNBLE1BQU0saUJBQU47QUFDQSxNQUFNLFNBQU47QUFDQSxNQUFNLFVBQU47QUFDQSxNQUFNLGVBQU4iLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dmFyIGY9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKTt0aHJvdyBmLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsZn12YXIgbD1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwobC5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxsLGwuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pIiwiZnVuY3Rpb24gcGl6emFCdWlsZGVyKCkge1xyXG4gICAgVGFibGUuYXBwbHkodGhpcywgYXJndW1lbnRzKTtcclxuICAgIHZhciBzZWxmID0gdGhpcztcclxuXHJcblxyXG59XHJcblxyXG5mdW5jdGlvbiBUYWJsZShhZGRCdG4sIGJhc2tldCwgaXRlbUNvdW50KSB7XHJcbiAgICBzZWxmLmFkZEJ0biA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoYWRkQnRuKTtcclxuICAgIHNlbGYuYmFza2V0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihiYXNrZXQpO1xyXG4gICAgc2VsZi5pdGVtQ291bnQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKGl0ZW1Db3VudCk7XHJcbiAgICBzZWxmLmN1cnJlbnRJbmRleCA9IDA7XHJcbn1cclxuXHJcblRhYmxlLnByb3RvdHlwZS5yZW5kZXJSb3cgPSBmdW5jdGlvbiAoKSB7XHJcblxyXG5cclxuICAgIGZ1bmN0aW9uIHJlbmRlclJvd0hhbmRsZXIoKSB7XHJcbiAgICAgICAgVGFibGUucHJvdG90eXBlLmNoZWNrQ3VycmVudEluZGV4KCk7XHJcbiAgICAgICAgdmFyIGluZGV4O1xyXG4gICAgICAgIGlmIChzZWxmLmN1cnJlbnRJbmRleCA+PSAxKSB7XHJcbiAgICAgICAgICAgIGluZGV4ID0gMjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHJldHVybiBmdW5jdGlvbiAoKSB7XHJcblxyXG4gICAgICAgICAgICB2YXIgcm93VGVtcGxhdGUgPSBgPHRyPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICA8dGQgY2xhc3M9XCJudW1cIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxidXR0b24gY2xhc3M9XCJzZWxlY3QtbnVtXCI+JHtpbmRleH08L2J1dHRvbj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvdGQ+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8dGQgY2xhc3M9XCJpbmdyZWRpZW50c1wiPjwvdGQ+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8dGQgY2xhc3M9XCJ0b3RhbFwiPjQwPC90ZD5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDx0ZD5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxidXR0b24gY2xhc3M9XCJyZW1vdmVcIj54PC9idXR0b24+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvdGQ+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvdHI+YDtcclxuXHJcbiAgICAgICAgICAgIHNlbGYuYmFza2V0LmlubmVySFRNTCArPSByb3dUZW1wbGF0ZTtcclxuICAgICAgICAgICAgaW5kZXgrKztcclxuXHJcblxyXG4gICAgICAgICAgICBUYWJsZS5wcm90b3R5cGUudXBkYXRlSXRlbUNvdW50KCk7XHJcblxyXG4gICAgICAgIH07XHJcblxyXG4gICAgfVxyXG5cclxuICAgIHNlbGYuYWRkQnRuLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCByZW5kZXJSb3dIYW5kbGVyKCkpO1xyXG5cclxufTtcclxuXHJcblRhYmxlLnByb3RvdHlwZS5yZW1vdmVJdGVtID0gZnVuY3Rpb24gKGV2ZW50KSB7XHJcbiAgICBmdW5jdGlvbiByZW1vdmVTZWxmSGFuZGxlcihldmVudCkge1xyXG5cclxuICAgICAgICBpZiAoZXZlbnQudGFyZ2V0LmNsYXNzTmFtZSA9PSAncmVtb3ZlJykge1xyXG5cclxuICAgICAgICAgICAgdmFyIHJlbW92ZVJvdyA9IGV2ZW50LnRhcmdldC5wYXJlbnROb2RlLnBhcmVudE5vZGU7XHJcbiAgICAgICAgICAgIHNlbGYuYmFza2V0LnJlbW92ZUNoaWxkKHJlbW92ZVJvdyk7XHJcbiAgICAgICAgICAgIFRhYmxlLnByb3RvdHlwZS5jaGVja0N1cnJlbnRJbmRleCgpO1xyXG4gICAgICAgICAgICBUYWJsZS5wcm90b3R5cGUudXBkYXRlSXRlbUNvdW50KCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgIH1cclxuXHJcbiAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdib2R5JykuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCByZW1vdmVTZWxmSGFuZGxlcik7XHJcblxyXG59O1xyXG5cclxuVGFibGUucHJvdG90eXBlLnVwZGF0ZVRhYmxlID0gZnVuY3Rpb24gKCkge1xyXG5cclxufTtcclxuXHJcblRhYmxlLnByb3RvdHlwZS5zZXRDdXJyZW50SXRlbSA9IGZ1bmN0aW9uICgpIHtcclxuXHJcbn07XHJcblxyXG5UYWJsZS5wcm90b3R5cGUudXBkYXRlSXRlbUNvc3QgPSBmdW5jdGlvbiAoKSB7XHJcblxyXG59O1xyXG5cclxuXHJcblRhYmxlLnByb3RvdHlwZS5jaGVja0N1cnJlbnRJbmRleCA9IGZ1bmN0aW9uICgpIHtcclxuICAgIHZhciBpdGVtc0FycmF5ID0gW10uc2xpY2UuY2FsbChkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKFwiLm9yZGVycyB0ciAuc2VsZWN0LW51bVwiKSk7XHJcbiAgICB2YXIgaTtcclxuICAgIGZvciAoaSA9IDE7IGkgPCBpdGVtc0FycmF5Lmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgaXRlbXNBcnJheVtpXS5pbm5lckhUTUwgPSBpO1xyXG4gICAgfVxyXG4gICAgdmFyIGNoZWNrSXRlbUFycmF5ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLm9yZGVycyB0cicpO1xyXG4gICAgaWYgKGNoZWNrSXRlbUFycmF5Lmxlbmd0aCA9PSAxKSB7XHJcbiAgICAgICAgc2VsZi5jdXJyZW50SW5kZXggPSAyO1xyXG4gICAgICAgIGkgPSAyO1xyXG4gICAgfVxyXG4gICAgaWYgKGNoZWNrSXRlbUFycmF5Lmxlbmd0aCA9PSAwKSB7XHJcbiAgICAgICAgc2VsZi5jdXJyZW50SW5kZXggPSAxO1xyXG4gICAgICAgIGkgPSAxO1xyXG4gICAgfVxyXG5cclxufTtcclxuXHJcblRhYmxlLnByb3RvdHlwZS51cGRhdGVJdGVtQ291bnQgPSBmdW5jdGlvbiAoKSB7XHJcblxyXG4gICAgdmFyIGl0ZW1zQXJyYXkgPSBbXS5zbGljZS5jYWxsKGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXCIub3JkZXJzIHRyIC5zZWxlY3QtbnVtXCIpKTtcclxuICAgIHNlbGYuaXRlbUNvdW50LmlubmVySFRNTCA9IGl0ZW1zQXJyYXkubGVuZ3RoO1xyXG59O1xyXG5cclxudmFyIHRhYmxlID0gbmV3IFRhYmxlKCcuYWRkLXBpenphJywgJy5iYXNrZXQgdGJvZHknLCAnLm51bScpO1xyXG50YWJsZS5jaGVja0N1cnJlbnRJbmRleCgpO1xyXG50YWJsZS5yZW5kZXJSb3coKTtcclxudGFibGUucmVtb3ZlSXRlbSgpO1xyXG50YWJsZS51cGRhdGVJdGVtQ291bnQoKTsiXX0=
