(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
function PizzaBuilder() {}

PizzaBuilder.prototype.renderSidebar = function (data) {
    window.onload = function () {

        var xhr = new XMLHttpRequest();
        xhr.open("GET", data, true);
        xhr.onreadystatechange = function () {
            if (xhr.readyState == 4) {
                if (xhr.status == 200) {
                    self.dataObj += xhr.responseText;
                }
            }
        };
        xhr.send();
        console.log(JSON.parse(self.dataObj));
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

},{}]},{},[1])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJzcmNcXGluZGV4LmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FDQUEsU0FBUyxZQUFULEdBQXVCLENBRXRCOztBQUVELGFBQWEsU0FBYixDQUF1QixhQUF2QixHQUF1QyxVQUFTLElBQVQsRUFBYztBQUNqRCxXQUFPLE1BQVAsR0FBZ0IsWUFBWTs7QUFFcEIsWUFBSSxNQUFNLElBQUksY0FBSixFQUFWO0FBQ0EsWUFBSSxJQUFKLENBQVMsS0FBVCxFQUFnQixJQUFoQixFQUFzQixJQUF0QjtBQUNBLFlBQUksa0JBQUosR0FBeUIsWUFBWTtBQUNqQyxnQkFBSSxJQUFJLFVBQUosSUFBa0IsQ0FBdEIsRUFBeUI7QUFDckIsb0JBQUksSUFBSSxNQUFKLElBQWMsR0FBbEIsRUFBdUI7QUFDbkIseUJBQUssT0FBTCxJQUFnQixJQUFJLFlBQXBCO0FBQ0g7QUFDSjtBQUNKLFNBTkQ7QUFPQSxZQUFJLElBQUo7QUFDSixnQkFBUSxHQUFSLENBQVksS0FBSyxLQUFMLENBQVcsS0FBSyxPQUFoQixDQUFaO0FBQ0gsS0FiRDtBQWlCSCxDQWxCRDtBQW1CQSxTQUFTLEtBQVQsQ0FBZSxNQUFmLEVBQXVCLE1BQXZCLEVBQStCLFNBQS9CLEVBQTBDOztBQUV0QyxTQUFLLE1BQUwsR0FBYyxTQUFTLGFBQVQsQ0FBdUIsTUFBdkIsQ0FBZDtBQUNBLFNBQUssTUFBTCxHQUFjLFNBQVMsYUFBVCxDQUF1QixNQUF2QixDQUFkO0FBQ0EsU0FBSyxTQUFMLEdBQWlCLFNBQVMsYUFBVCxDQUF1QixTQUF2QixDQUFqQjtBQUNBLFNBQUssWUFBTCxHQUFvQixDQUFwQjtBQUNIOztBQUVELE1BQU0sU0FBTixDQUFnQixTQUFoQixHQUE0QixZQUFZOztBQUVwQyxhQUFTLGdCQUFULEdBQTRCO0FBQ3hCLGVBQU8sWUFBWTtBQUNmLGdCQUFJLGNBQWU7OzREQUFBLENBRTZCLEtBQUssWUFBYTs7Ozs7OztpQ0FGbEU7O0FBV0EsaUJBQUssTUFBTCxDQUFZLFNBQVosSUFBeUIsV0FBekI7QUFDQSxpQkFBSyxZQUFMLElBQXFCLENBQXJCO0FBQ0Esa0JBQU0sU0FBTixDQUFnQixpQkFBaEI7QUFDQSxrQkFBTSxTQUFOLENBQWdCLGVBQWhCO0FBQ0gsU0FoQkQ7QUFpQkg7QUFDRCxTQUFLLE1BQUwsQ0FBWSxnQkFBWixDQUE2QixPQUE3QixFQUFzQyxrQkFBdEM7QUFDSCxDQXRCRDs7QUF3QkEsTUFBTSxTQUFOLENBQWdCLFVBQWhCLEdBQTZCLFVBQVUsS0FBVixFQUFpQjtBQUMxQyxhQUFTLGlCQUFULENBQTJCLEtBQTNCLEVBQWtDO0FBQzlCLFlBQUksTUFBTSxNQUFOLENBQWEsU0FBYixJQUEwQixRQUE5QixFQUF3QztBQUNwQyxnQkFBSSxZQUFZLE1BQU0sTUFBTixDQUFhLFVBQWIsQ0FBd0IsVUFBeEM7QUFDQSxpQkFBSyxNQUFMLENBQVksV0FBWixDQUF3QixTQUF4QjtBQUNBLGtCQUFNLFNBQU4sQ0FBZ0IsaUJBQWhCO0FBQ0Esa0JBQU0sU0FBTixDQUFnQixlQUFoQjtBQUNIO0FBQ0o7QUFDRCxhQUFTLGFBQVQsQ0FBdUIsTUFBdkIsRUFBK0IsZ0JBQS9CLENBQWdELE9BQWhELEVBQXlELGlCQUF6RDtBQUNILENBVkQ7O0FBWUEsTUFBTSxTQUFOLENBQWdCLFdBQWhCLEdBQThCLFlBQVksQ0FFekMsQ0FGRDs7QUFJQSxNQUFNLFNBQU4sQ0FBZ0IsY0FBaEIsR0FBaUMsWUFBWSxDQUU1QyxDQUZEOztBQUlBLE1BQU0sU0FBTixDQUFnQixjQUFoQixHQUFpQyxZQUFZLENBRTVDLENBRkQ7O0FBS0EsTUFBTSxTQUFOLENBQWdCLGlCQUFoQixHQUFvQyxZQUFZO0FBQzVDLFFBQUksYUFBYSxHQUFHLEtBQUgsQ0FBUyxJQUFULENBQWMsU0FBUyxnQkFBVCxDQUEwQix3QkFBMUIsQ0FBZCxDQUFqQjtBQUNBLFFBQUksQ0FBSjtBQUNBLFNBQUssSUFBSSxDQUFULEVBQVksSUFBSSxXQUFXLE1BQTNCLEVBQW1DLEdBQW5DLEVBQXdDO0FBQ3BDLG1CQUFXLENBQVgsRUFBYyxTQUFkLEdBQTBCLElBQUksQ0FBOUI7QUFDSDtBQUNELFFBQUksaUJBQWlCLFNBQVMsZ0JBQVQsQ0FBMEIsWUFBMUIsQ0FBckI7QUFDQSxRQUFJLGVBQWUsTUFBZixJQUF5QixDQUE3QixFQUFnQztBQUM1QixhQUFLLFlBQUwsR0FBb0IsQ0FBcEI7QUFDQSxZQUFJLENBQUo7QUFDSDtBQUNELFFBQUksZUFBZSxNQUFmLElBQXlCLENBQTdCLEVBQWdDO0FBQzVCLGFBQUssWUFBTCxHQUFvQixDQUFwQjtBQUNBLFlBQUksQ0FBSjtBQUNIO0FBQ0osQ0FmRDs7QUFpQkEsTUFBTSxTQUFOLENBQWdCLGVBQWhCLEdBQWtDLFlBQVk7QUFDMUMsUUFBSSxhQUFhLEdBQUcsS0FBSCxDQUFTLElBQVQsQ0FBYyxTQUFTLGdCQUFULENBQTBCLHdCQUExQixDQUFkLENBQWpCO0FBQ0EsU0FBSyxTQUFMLENBQWUsU0FBZixHQUEyQixXQUFXLE1BQXRDO0FBQ0gsQ0FIRDs7QUFLQSxJQUFJLFFBQVEsSUFBSSxLQUFKLENBQVUsWUFBVixFQUF3QixlQUF4QixFQUF5QyxNQUF6QyxDQUFaO0FBQ0EsTUFBTSxpQkFBTjtBQUNBLE1BQU0sU0FBTjtBQUNBLE1BQU0sVUFBTjtBQUNBLE1BQU0sZUFBTjtBQUNBLElBQUksZUFBZSxJQUFJLFlBQUosRUFBbkI7QUFDQSxhQUFhLGFBQWIsQ0FBMkIsb0JBQTNCIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3ZhciBmPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIik7dGhyb3cgZi5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGZ9dmFyIGw9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGwuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sbCxsLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSIsImZ1bmN0aW9uIFBpenphQnVpbGRlcigpe1xyXG5cclxufVxyXG5cclxuUGl6emFCdWlsZGVyLnByb3RvdHlwZS5yZW5kZXJTaWRlYmFyID0gZnVuY3Rpb24oZGF0YSl7XHJcbiAgICB3aW5kb3cub25sb2FkID0gZnVuY3Rpb24gKCkge1xyXG5cclxuICAgICAgICAgICAgdmFyIHhociA9IG5ldyBYTUxIdHRwUmVxdWVzdCgpO1xyXG4gICAgICAgICAgICB4aHIub3BlbihcIkdFVFwiLCBkYXRhLCB0cnVlKTtcclxuICAgICAgICAgICAgeGhyLm9ucmVhZHlzdGF0ZWNoYW5nZSA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgIGlmICh4aHIucmVhZHlTdGF0ZSA9PSA0KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHhoci5zdGF0dXMgPT0gMjAwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHNlbGYuZGF0YU9iaiArPSB4aHIucmVzcG9uc2VUZXh0O1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgeGhyLnNlbmQoKTtcclxuICAgICAgICBjb25zb2xlLmxvZyhKU09OLnBhcnNlKHNlbGYuZGF0YU9iaikpO1xyXG4gICAgfTtcclxuXHJcblxyXG5cclxufTtcclxuZnVuY3Rpb24gVGFibGUoYWRkQnRuLCBiYXNrZXQsIGl0ZW1Db3VudCkge1xyXG5cclxuICAgIHNlbGYuYWRkQnRuID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihhZGRCdG4pO1xyXG4gICAgc2VsZi5iYXNrZXQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKGJhc2tldCk7XHJcbiAgICBzZWxmLml0ZW1Db3VudCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoaXRlbUNvdW50KTtcclxuICAgIHNlbGYuY3VycmVudEluZGV4ID0gMjtcclxufVxyXG5cclxuVGFibGUucHJvdG90eXBlLnJlbmRlclJvdyA9IGZ1bmN0aW9uICgpIHtcclxuXHJcbiAgICBmdW5jdGlvbiByZW5kZXJSb3dIYW5kbGVyKCkge1xyXG4gICAgICAgIHJldHVybiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIHZhciByb3dUZW1wbGF0ZSA9IGA8dHI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgIDx0ZCBjbGFzcz1cIm51bVwiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGJ1dHRvbiBjbGFzcz1cInNlbGVjdC1udW1cIj4ke3NlbGYuY3VycmVudEluZGV4fTwvYnV0dG9uPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC90ZD5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDx0ZCBjbGFzcz1cImluZ3JlZGllbnRzXCI+PC90ZD5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDx0ZCBjbGFzcz1cInRvdGFsXCI+NDA8L3RkPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHRkPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGJ1dHRvbiBjbGFzcz1cInJlbW92ZVwiPng8L2J1dHRvbj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgPC90ZD5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgPC90cj5gO1xyXG5cclxuICAgICAgICAgICAgc2VsZi5iYXNrZXQuaW5uZXJIVE1MICs9IHJvd1RlbXBsYXRlO1xyXG4gICAgICAgICAgICBzZWxmLmN1cnJlbnRJbmRleCArPSAxO1xyXG4gICAgICAgICAgICBUYWJsZS5wcm90b3R5cGUuY2hlY2tDdXJyZW50SW5kZXgoKTtcclxuICAgICAgICAgICAgVGFibGUucHJvdG90eXBlLnVwZGF0ZUl0ZW1Db3VudCgpO1xyXG4gICAgICAgIH07XHJcbiAgICB9XHJcbiAgICBzZWxmLmFkZEJ0bi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgcmVuZGVyUm93SGFuZGxlcigpKTtcclxufTtcclxuXHJcblRhYmxlLnByb3RvdHlwZS5yZW1vdmVJdGVtID0gZnVuY3Rpb24gKGV2ZW50KSB7XHJcbiAgICBmdW5jdGlvbiByZW1vdmVTZWxmSGFuZGxlcihldmVudCkge1xyXG4gICAgICAgIGlmIChldmVudC50YXJnZXQuY2xhc3NOYW1lID09ICdyZW1vdmUnKSB7XHJcbiAgICAgICAgICAgIHZhciByZW1vdmVSb3cgPSBldmVudC50YXJnZXQucGFyZW50Tm9kZS5wYXJlbnROb2RlO1xyXG4gICAgICAgICAgICBzZWxmLmJhc2tldC5yZW1vdmVDaGlsZChyZW1vdmVSb3cpO1xyXG4gICAgICAgICAgICBUYWJsZS5wcm90b3R5cGUuY2hlY2tDdXJyZW50SW5kZXgoKTtcclxuICAgICAgICAgICAgVGFibGUucHJvdG90eXBlLnVwZGF0ZUl0ZW1Db3VudCgpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ2JvZHknKS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIHJlbW92ZVNlbGZIYW5kbGVyKTtcclxufTtcclxuXHJcblRhYmxlLnByb3RvdHlwZS51cGRhdGVUYWJsZSA9IGZ1bmN0aW9uICgpIHtcclxuXHJcbn07XHJcblxyXG5UYWJsZS5wcm90b3R5cGUuc2V0Q3VycmVudEl0ZW0gPSBmdW5jdGlvbiAoKSB7XHJcblxyXG59O1xyXG5cclxuVGFibGUucHJvdG90eXBlLnVwZGF0ZUl0ZW1Db3N0ID0gZnVuY3Rpb24gKCkge1xyXG5cclxufTtcclxuXHJcblxyXG5UYWJsZS5wcm90b3R5cGUuY2hlY2tDdXJyZW50SW5kZXggPSBmdW5jdGlvbiAoKSB7XHJcbiAgICB2YXIgaXRlbXNBcnJheSA9IFtdLnNsaWNlLmNhbGwoZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChcIi5vcmRlcnMgdHIgLnNlbGVjdC1udW1cIikpO1xyXG4gICAgdmFyIGk7XHJcbiAgICBmb3IgKGkgPSAwOyBpIDwgaXRlbXNBcnJheS5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgIGl0ZW1zQXJyYXlbaV0uaW5uZXJIVE1MID0gaSArIDE7XHJcbiAgICB9XHJcbiAgICB2YXIgY2hlY2tJdGVtQXJyYXkgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcub3JkZXJzIHRyJyk7XHJcbiAgICBpZiAoY2hlY2tJdGVtQXJyYXkubGVuZ3RoID09IDIpIHtcclxuICAgICAgICBzZWxmLmN1cnJlbnRJbmRleCA9IDM7XHJcbiAgICAgICAgaSA9IDI7XHJcbiAgICB9XHJcbiAgICBpZiAoY2hlY2tJdGVtQXJyYXkubGVuZ3RoID09IDEpIHtcclxuICAgICAgICBzZWxmLmN1cnJlbnRJbmRleCA9IDI7XHJcbiAgICAgICAgaSA9IDE7XHJcbiAgICB9XHJcbn07XHJcblxyXG5UYWJsZS5wcm90b3R5cGUudXBkYXRlSXRlbUNvdW50ID0gZnVuY3Rpb24gKCkge1xyXG4gICAgdmFyIGl0ZW1zQXJyYXkgPSBbXS5zbGljZS5jYWxsKGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXCIub3JkZXJzIHRyIC5zZWxlY3QtbnVtXCIpKTtcclxuICAgIHNlbGYuaXRlbUNvdW50LmlubmVySFRNTCA9IGl0ZW1zQXJyYXkubGVuZ3RoO1xyXG59O1xyXG5cclxudmFyIHRhYmxlID0gbmV3IFRhYmxlKCcuYWRkLXBpenphJywgJy5iYXNrZXQgdGJvZHknLCAnLm51bScpO1xyXG50YWJsZS5jaGVja0N1cnJlbnRJbmRleCgpO1xyXG50YWJsZS5yZW5kZXJSb3coKTtcclxudGFibGUucmVtb3ZlSXRlbSgpO1xyXG50YWJsZS51cGRhdGVJdGVtQ291bnQoKTtcclxudmFyIHBpenphQnVpbGRlciA9IG5ldyBQaXp6YUJ1aWxkZXIoKTtcclxucGl6emFCdWlsZGVyLnJlbmRlclNpZGViYXIoJ3B1YmxpYy9jb25maWcuanNvbicpO1xyXG5cclxuIl19
