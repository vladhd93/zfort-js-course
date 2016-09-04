(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
function PizzaBuilder() {
    this.data = null;
}

PizzaBuilder.prototype.renderSidebar = function (list, data) {
    var _self = this;
    this.list = document.querySelector(list);
    function renderSidebar(SelectedList, parsedData) {
        var dataObj = parsedData['data'];
        for (var i = 1; i < dataObj.length; i++) {
            var template = `
            <li data-name="${ dataObj[i].name }" data-price="${ dataObj[i].price }"><img src="${ dataObj[i].src }">
            </li>`;
            SelectedList.innerHTML += template;
        }
    }
    var xhr = new XMLHttpRequest();
    xhr.open("GET", data, true);
    xhr.onreadystatechange = () => {
        if (xhr.readyState == 4 && xhr.status == 200) {
            this.data = JSON.parse(xhr.responseText);
            renderSidebar(this.list, this.data);
        }
    };
    xhr.send();
};

function Table(addBtn, basket, itemCount, numBtn, ingrList, totalCell) {
    this.addBtn = document.querySelector(addBtn);
    this.basket = document.querySelector(basket);
    this.itemCount = document.querySelector(itemCount);
    this.numBtn = document.querySelector(numBtn);
    this.ingrList = document.querySelector(ingrList);
    this.totalCell = document.querySelector(totalCell);
    this.currentIndex = 2;
}

Table.prototype.renderRow = function () {

    var _self = this;
    function renderRowHandler() {
        return function () {
            var rowTemplate = `<tr>
                           <td class="num">
                               <button class="select-num">${ _self.currentIndex }</button>
                               </td>
                               <td class="ingredients"></td>
                               <td class="total" data-price="40">40</td>
                               <td>
                               <button class="remove">x</button>
                           </td>
                           </tr>`;
            _self.basket.innerHTML += rowTemplate;
            _self.currentIndex += 1;
            _self.checkCurrentIndex();
            _self.updateItemCount();
            _self.setCurrentItem();
        };
    }
    _self.addBtn.addEventListener("click", renderRowHandler());
};

Table.prototype.removeItem = function (event) {
    var _self = this;
    function removeSelfHandler(event) {
        if (event.target.className == 'remove') {
            var removeRow = event.target.parentNode.parentNode;
            _self.basket.removeChild(removeRow);
            _self.checkCurrentIndex();
            _self.setCurrentItem();
        }
    }
    document.querySelector('body').addEventListener('click', removeSelfHandler);
};

Table.prototype.setCurrentItem = function () {
    var btns = [].slice.call(document.querySelectorAll('.select-num'));
    function clickHandler() {
        var tr = [].slice.call(document.querySelectorAll('.basket tr'));
        for (var i = 0; i < tr.length; i++) {
            tr[i].classList.remove('selected');
        }
        this.closest('tr').classList.add('selected');
    }
    for (var i = 0; i < btns.length; i++) {
        btns[i].addEventListener('click', clickHandler);
    }
};

Table.prototype.updateItemCost = function () {
    var _self = this;
    function listHandler(event) {
        var target = event.target;
        var li = target.closest('li');
        if (!_self.ingrList.contains(li)) {
            return;
        }
        var cost = parseInt(target.parentNode.dataset.price);
        var currentTotalCost = document.querySelector(".basket .selected .total");
        if (currentTotalCost) {
            currentTotalCost.dataset.price = parseInt(currentTotalCost.dataset.price) + cost;
            currentTotalCost.innerHTML = currentTotalCost.dataset.price;
        }
    }
    this.ingrList.addEventListener('click', listHandler);
};

Table.prototype.checkCurrentIndex = function () {
    var itemsArray = [].slice.call(document.querySelectorAll(".orders tr .select-num"));
    var i;
    for (i = 0; i < itemsArray.length; i++) {
        itemsArray[i].innerHTML = i + 1;
    }
    var checkItemArray = document.querySelectorAll('.orders tr');
    if (checkItemArray.length == 2) {
        this.currentIndex = 3;
        i = 2;
    }
    if (checkItemArray.length == 1) {
        this.currentIndex = 2;
        i = 1;
    }
};

Table.prototype.updateItemCount = function () {
    var itemsArray = [].slice.call(document.querySelectorAll(".orders tr .select-num"));
    this.itemCount.innerHTML = itemsArray.length;
};

var table = new Table('.add-pizza', '.basket tbody', '.num', '.select-num', '.ingredients-list', '.total');
table.checkCurrentIndex();
table.renderRow();
table.removeItem();
table.updateItemCount();
table.updateItemCost();
table.setCurrentItem();
var pizzaBuilder = new PizzaBuilder();
pizzaBuilder.renderSidebar('.ingredients-list', 'public/config.json');

},{}]},{},[1])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJzcmNcXGluZGV4LmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FDQUEsU0FBUyxZQUFULEdBQXVCO0FBQ25CLFNBQUssSUFBTCxHQUFZLElBQVo7QUFDSDs7QUFFRCxhQUFhLFNBQWIsQ0FBdUIsYUFBdkIsR0FBdUMsVUFBUyxJQUFULEVBQWMsSUFBZCxFQUFtQjtBQUN0RCxRQUFJLFFBQVEsSUFBWjtBQUNBLFNBQUssSUFBTCxHQUFZLFNBQVMsYUFBVCxDQUF1QixJQUF2QixDQUFaO0FBQ0EsYUFBUyxhQUFULENBQXVCLFlBQXZCLEVBQW9DLFVBQXBDLEVBQStDO0FBQzNDLFlBQUksVUFBVSxXQUFXLE1BQVgsQ0FBZDtBQUNBLGFBQUksSUFBSSxJQUFJLENBQVosRUFBZSxJQUFJLFFBQVEsTUFBM0IsRUFBa0MsR0FBbEMsRUFBc0M7QUFDbEMsZ0JBQUksV0FBWTs2QkFBQSxDQUNDLFFBQVEsQ0FBUixFQUFXLElBQUssbUJBQWdCLFFBQVEsQ0FBUixFQUFXLEtBQU0saUJBQWMsUUFBUSxDQUFSLEVBQVcsR0FBSTtrQkFEL0Y7QUFHQSx5QkFBYSxTQUFiLElBQTBCLFFBQTFCO0FBQ0g7QUFDSjtBQUNELFFBQUksTUFBTSxJQUFJLGNBQUosRUFBVjtBQUNBLFFBQUksSUFBSixDQUFTLEtBQVQsRUFBZ0IsSUFBaEIsRUFBc0IsSUFBdEI7QUFDQSxRQUFJLGtCQUFKLEdBQXdCLE1BQUs7QUFDekIsWUFBSSxJQUFJLFVBQUosSUFBa0IsQ0FBbEIsSUFBdUIsSUFBSSxNQUFKLElBQWMsR0FBekMsRUFBOEM7QUFDMUMsaUJBQUssSUFBTCxHQUFZLEtBQUssS0FBTCxDQUFXLElBQUksWUFBZixDQUFaO0FBQ0EsMEJBQWMsS0FBSyxJQUFuQixFQUF3QixLQUFLLElBQTdCO0FBQ0g7QUFDSixLQUxEO0FBTUEsUUFBSSxJQUFKO0FBQ0gsQ0Fy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a0MsWUFBWTtBQUMxQyxRQUFJLGFBQWEsR0FBRyxLQUFILENBQVMsSUFBVCxDQUFjLFNBQVMsZ0JBQVQsQ0FBMEIsd0JBQTFCLENBQWQsQ0FBakI7QUFDQSxTQUFLLFNBQUwsQ0FBZSxTQUFmLEdBQTJCLFdBQVcsTUFBdEM7QUFDSCxDQUhEOztBQUtBLElBQUksUUFBUSxJQUFJLEtBQUosQ0FBVSxZQUFWLEVBQXdCLGVBQXhCLEVBQXlDLE1BQXpDLEVBQWdELGFBQWhELEVBQThELG1CQUE5RCxFQUFrRixRQUFsRixDQUFaO0FBQ0EsTUFBTSxpQkFBTjtBQUNBLE1BQU0sU0FBTjtBQUNBLE1BQU0sVUFBTjtBQUNBLE1BQU0sZUFBTjtBQUNBLE1BQU0sY0FBTjtBQUNBLE1BQU0sY0FBTjtBQUNBLElBQUksZUFBZSxJQUFJLFlBQUosRUFBbkI7QUFDQSxhQUFhLGFBQWIsQ0FBMkIsbUJBQTNCLEVBQStDLG9CQUEvQyIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiLCJmdW5jdGlvbiBQaXp6YUJ1aWxkZXIoKXtcclxuICAgIHRoaXMuZGF0YSA9IG51bGw7XHJcbn1cclxuXHJcblBpenphQnVpbGRlci5wcm90b3R5cGUucmVuZGVyU2lkZWJhciA9IGZ1bmN0aW9uKGxpc3QsZGF0YSl7XHJcbiAgICB2YXIgX3NlbGYgPSB0aGlzO1xyXG4gICAgdGhpcy5saXN0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihsaXN0KTtcclxuICAgIGZ1bmN0aW9uIHJlbmRlclNpZGViYXIoU2VsZWN0ZWRMaXN0LHBhcnNlZERhdGEpe1xyXG4gICAgICAgIHZhciBkYXRhT2JqID0gcGFyc2VkRGF0YVsnZGF0YSddO1xyXG4gICAgICAgIGZvcih2YXIgaSA9IDE7IGkgPCBkYXRhT2JqLmxlbmd0aDtpKyspe1xyXG4gICAgICAgICAgICB2YXIgdGVtcGxhdGUgPSBgXHJcbiAgICAgICAgICAgIDxsaSBkYXRhLW5hbWU9XCIke2RhdGFPYmpbaV0ubmFtZX1cIiBkYXRhLXByaWNlPVwiJHtkYXRhT2JqW2ldLnByaWNlfVwiPjxpbWcgc3JjPVwiJHtkYXRhT2JqW2ldLnNyY31cIj5cclxuICAgICAgICAgICAgPC9saT5gO1xyXG4gICAgICAgICAgICBTZWxlY3RlZExpc3QuaW5uZXJIVE1MICs9IHRlbXBsYXRlO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIHZhciB4aHIgPSBuZXcgWE1MSHR0cFJlcXVlc3QoKTtcclxuICAgIHhoci5vcGVuKFwiR0VUXCIsIGRhdGEsIHRydWUpO1xyXG4gICAgeGhyLm9ucmVhZHlzdGF0ZWNoYW5nZSA9KCk9PiB7XHJcbiAgICAgICAgaWYgKHhoci5yZWFkeVN0YXRlID09IDQgJiYgeGhyLnN0YXR1cyA9PSAyMDApIHtcclxuICAgICAgICAgICAgdGhpcy5kYXRhID0gSlNPTi5wYXJzZSh4aHIucmVzcG9uc2VUZXh0KTtcclxuICAgICAgICAgICAgcmVuZGVyU2lkZWJhcih0aGlzLmxpc3QsdGhpcy5kYXRhKTtcclxuICAgICAgICB9XHJcbiAgICB9O1xyXG4gICAgeGhyLnNlbmQoKTtcclxufTtcclxuXHJcbmZ1bmN0aW9uIFRhYmxlKGFkZEJ0biwgYmFza2V0LCBpdGVtQ291bnQsbnVtQnRuLGluZ3JMaXN0LHRvdGFsQ2VsbCkge1xyXG4gICAgdGhpcy5hZGRCdG4gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKGFkZEJ0bik7XHJcbiAgICB0aGlzLmJhc2tldCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoYmFza2V0KTtcclxuICAgIHRoaXMuaXRlbUNvdW50ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihpdGVtQ291bnQpO1xyXG4gICAgdGhpcy5udW1CdG4gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKG51bUJ0bik7XHJcbiAgICB0aGlzLmluZ3JMaXN0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihpbmdyTGlzdCk7XHJcbiAgICB0aGlzLnRvdGFsQ2VsbCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IodG90YWxDZWxsKTtcclxuICAgIHRoaXMuY3VycmVudEluZGV4ID0gMjtcclxufVxyXG5cclxuVGFibGUucHJvdG90eXBlLnJlbmRlclJvdyA9IGZ1bmN0aW9uICgpIHtcclxuXHJcbiAgICB2YXIgX3NlbGYgPSB0aGlzO1xyXG4gICAgZnVuY3Rpb24gcmVuZGVyUm93SGFuZGxlcigpIHtcclxuICAgICAgICByZXR1cm4gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICB2YXIgcm93VGVtcGxhdGUgPSBgPHRyPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICA8dGQgY2xhc3M9XCJudW1cIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxidXR0b24gY2xhc3M9XCJzZWxlY3QtbnVtXCI+JHtfc2VsZi5jdXJyZW50SW5kZXh9PC9idXR0b24+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L3RkPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHRkIGNsYXNzPVwiaW5ncmVkaWVudHNcIj48L3RkPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHRkIGNsYXNzPVwidG90YWxcIiBkYXRhLXByaWNlPVwiNDBcIj40MDwvdGQ+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8dGQ+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8YnV0dG9uIGNsYXNzPVwicmVtb3ZlXCI+eDwvYnV0dG9uPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICA8L3RkPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICA8L3RyPmA7XHJcbiAgICAgICAgICAgIF9zZWxmLmJhc2tldC5pbm5lckhUTUwgKz0gcm93VGVtcGxhdGU7XHJcbiAgICAgICAgICAgIF9zZWxmLmN1cnJlbnRJbmRleCArPSAxO1xyXG4gICAgICAgICAgICBfc2VsZi5jaGVja0N1cnJlbnRJbmRleCgpO1xyXG4gICAgICAgICAgICBfc2VsZi51cGRhdGVJdGVtQ291bnQoKTtcclxuICAgICAgICAgICAgX3NlbGYuc2V0Q3VycmVudEl0ZW0oKTtcclxuICAgICAgICB9O1xyXG4gICAgfVxyXG4gICAgX3NlbGYuYWRkQnRuLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCByZW5kZXJSb3dIYW5kbGVyKCkpO1xyXG5cclxufTtcclxuXHJcblRhYmxlLnByb3RvdHlwZS5yZW1vdmVJdGVtID0gZnVuY3Rpb24gKGV2ZW50KSB7XHJcbiAgICB2YXIgX3NlbGYgPSB0aGlzO1xyXG4gICAgZnVuY3Rpb24gcmVtb3ZlU2VsZkhhbmRsZXIoZXZlbnQpIHtcclxuICAgICAgICBpZiAoZXZlbnQudGFyZ2V0LmNsYXNzTmFtZSA9PSAncmVtb3ZlJykge1xyXG4gICAgICAgICAgICB2YXIgcmVtb3ZlUm93ID0gZXZlbnQudGFyZ2V0LnBhcmVudE5vZGUucGFyZW50Tm9kZTtcclxuICAgICAgICAgICAgX3NlbGYuYmFza2V0LnJlbW92ZUNoaWxkKHJlbW92ZVJvdyk7XHJcbiAgICAgICAgICAgIF9zZWxmLmNoZWNrQ3VycmVudEluZGV4KCk7XHJcbiAgICAgICAgICAgIF9zZWxmLnNldEN1cnJlbnRJdGVtKCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcignYm9keScpLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgcmVtb3ZlU2VsZkhhbmRsZXIpO1xyXG59O1xyXG5cclxuVGFibGUucHJvdG90eXBlLnNldEN1cnJlbnRJdGVtID0gZnVuY3Rpb24gKCkge1xyXG4gICAgdmFyIGJ0bnMgPSBbXS5zbGljZS5jYWxsKGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5zZWxlY3QtbnVtJykpO1xyXG4gICAgZnVuY3Rpb24gY2xpY2tIYW5kbGVyKCl7XHJcbiAgICAgICAgdmFyIHRyID0gW10uc2xpY2UuY2FsbChkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcuYmFza2V0IHRyJykpO1xyXG4gICAgICAgIGZvcih2YXIgaSA9IDA7IGkgPCB0ci5sZW5ndGg7aSsrKXtcclxuICAgICAgICAgICAgdHJbaV0uY2xhc3NMaXN0LnJlbW92ZSgnc2VsZWN0ZWQnKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5jbG9zZXN0KCd0cicpLmNsYXNzTGlzdC5hZGQoJ3NlbGVjdGVkJyk7XHJcbiAgICB9XHJcbiAgICBmb3IodmFyIGkgPSAwOyBpIDwgYnRucy5sZW5ndGg7aSsrKXtcclxuICAgICAgICBidG5zW2ldLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJyxjbGlja0hhbmRsZXIpO1xyXG4gICAgfVxyXG59O1xyXG5cclxuVGFibGUucHJvdG90eXBlLnVwZGF0ZUl0ZW1Db3N0ID0gZnVuY3Rpb24gKCkge1xyXG4gICAgdmFyIF9zZWxmPSB0aGlzO1xyXG4gICAgZnVuY3Rpb24gbGlzdEhhbmRsZXIoZXZlbnQpe1xyXG4gICAgICAgIHZhciB0YXJnZXQgPSBldmVudC50YXJnZXQ7XHJcbiAgICAgICAgdmFyIGxpID0gdGFyZ2V0LmNsb3Nlc3QoJ2xpJyk7XHJcbiAgICAgICAgaWYgKCFfc2VsZi5pbmdyTGlzdC5jb250YWlucyhsaSkpe1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHZhciBjb3N0ID0gcGFyc2VJbnQodGFyZ2V0LnBhcmVudE5vZGUuZGF0YXNldC5wcmljZSk7XHJcbiAgICAgICAgdmFyIGN1cnJlbnRUb3RhbENvc3QgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmJhc2tldCAuc2VsZWN0ZWQgLnRvdGFsXCIpO1xyXG4gICAgICAgIGlmKGN1cnJlbnRUb3RhbENvc3Qpe1xyXG4gICAgICAgICAgICBjdXJyZW50VG90YWxDb3N0LmRhdGFzZXQucHJpY2UgPSBwYXJzZUludChjdXJyZW50VG90YWxDb3N0LmRhdGFzZXQucHJpY2UpICsgY29zdDtcclxuICAgICAgICAgICAgY3VycmVudFRvdGFsQ29zdC5pbm5lckhUTUwgPSBjdXJyZW50VG90YWxDb3N0LmRhdGFzZXQucHJpY2U7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgdGhpcy5pbmdyTGlzdC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsbGlzdEhhbmRsZXIpO1xyXG59O1xyXG5cclxuVGFibGUucHJvdG90eXBlLmNoZWNrQ3VycmVudEluZGV4ID0gZnVuY3Rpb24gKCkge1xyXG4gICAgdmFyIGl0ZW1zQXJyYXkgPSBbXS5zbGljZS5jYWxsKGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXCIub3JkZXJzIHRyIC5zZWxlY3QtbnVtXCIpKTtcclxuICAgIHZhciBpO1xyXG4gICAgZm9yIChpID0gMDsgaSA8IGl0ZW1zQXJyYXkubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICBpdGVtc0FycmF5W2ldLmlubmVySFRNTCA9IGkgKyAxO1xyXG4gICAgfVxyXG4gICAgdmFyIGNoZWNrSXRlbUFycmF5ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLm9yZGVycyB0cicpO1xyXG4gICAgaWYgKGNoZWNrSXRlbUFycmF5Lmxlbmd0aCA9PSAyKSB7XHJcbiAgICAgICAgdGhpcy5jdXJyZW50SW5kZXggPSAzO1xyXG4gICAgICAgIGkgPSAyO1xyXG4gICAgfVxyXG4gICAgaWYgKGNoZWNrSXRlbUFycmF5Lmxlbmd0aCA9PSAxKSB7XHJcbiAgICAgICAgdGhpcy5jdXJyZW50SW5kZXggPSAyO1xyXG4gICAgICAgIGkgPSAxO1xyXG4gICAgfVxyXG59O1xyXG5cclxuVGFibGUucHJvdG90eXBlLnVwZGF0ZUl0ZW1Db3VudCA9IGZ1bmN0aW9uICgpIHtcclxuICAgIHZhciBpdGVtc0FycmF5ID0gW10uc2xpY2UuY2FsbChkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKFwiLm9yZGVycyB0ciAuc2VsZWN0LW51bVwiKSk7XHJcbiAgICB0aGlzLml0ZW1Db3VudC5pbm5lckhUTUwgPSBpdGVtc0FycmF5Lmxlbmd0aDtcclxufTtcclxuXHJcbnZhciB0YWJsZSA9IG5ldyBUYWJsZSgnLmFkZC1waXp6YScsICcuYmFza2V0IHRib2R5JywgJy5udW0nLCcuc2VsZWN0LW51bScsJy5pbmdyZWRpZW50cy1saXN0JywnLnRvdGFsJyk7XHJcbnRhYmxlLmNoZWNrQ3VycmVudEluZGV4KCk7XHJcbnRhYmxlLnJlbmRlclJvdygpO1xyXG50YWJsZS5yZW1vdmVJdGVtKCk7XHJcbnRhYmxlLnVwZGF0ZUl0ZW1Db3VudCgpO1xyXG50YWJsZS51cGRhdGVJdGVtQ29zdCgpO1xyXG50YWJsZS5zZXRDdXJyZW50SXRlbSgpO1xyXG52YXIgcGl6emFCdWlsZGVyID0gbmV3IFBpenphQnVpbGRlcigpO1xyXG5waXp6YUJ1aWxkZXIucmVuZGVyU2lkZWJhcignLmluZ3JlZGllbnRzLWxpc3QnLCdwdWJsaWMvY29uZmlnLmpzb24nKTtcclxuXHJcbiJdfQ==
