(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
function PizzaBuilder(pizzaList) {
    this.data = null;
    this.pizzaList = document.querySelector(pizzaList);
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

function Table(addBtn, basket, itemCount, numBtn, ingrList, totalCell, pizzaList, pizzaListItem) {
    this.addBtn = document.querySelector(addBtn);
    this.basket = document.querySelector(basket);
    this.itemCount = document.querySelector(itemCount);
    this.numBtn = document.querySelector(numBtn);
    this.ingrList = document.querySelector(ingrList);
    this.totalCell = document.querySelector(totalCell);
    this.currentIndex = 2;
    this.pizzaList = document.querySelector(pizzaList);
    this.pizzaListItem = document.querySelector(pizzaListItem);
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
            var pizzaTemplate = `
                <li class="pizza-item">
                    <span class="pizza-index">${ _self.currentIndex }</span>
                    <img src="images/pizza.svg" width="300" height="300" alt="" title="">
                </li>
            `;
            _self.pizzaList.innerHTML += pizzaTemplate;
            _self.basket.innerHTML += rowTemplate;
            _self.currentIndex += 1;
            _self.checkCurrentIndex();
            _self.updateItemCount();
            _self.setCurrentItem();
            _self.sumPrice('.total', '.sum-price');
        };
    }
    _self.addBtn.addEventListener("click", renderRowHandler());
};

Table.prototype.removeItem = function () {
    var _self = this;
    function removeSelfHandler(event) {
        if (event.target.className == 'remove') {
            var removeRow = event.target.parentNode.parentNode,
                nodeList = Array.prototype.slice.call(_self.basket.children),
                currentIndex = nodeList.indexOf(removeRow);
            _self.pizzaList.removeChild(document.querySelectorAll('.list li')[currentIndex]);
            _self.basket.removeChild(removeRow);
            _self.checkCurrentIndex();
            _self.updateItemCount();
            _self.setCurrentItem();
            _self.sumPrice('.total', '.sum-price');
        }
    }
    document.querySelector('body').addEventListener('click', removeSelfHandler);
};

Table.prototype.setCurrentItem = function () {
    var _self = this,
        btns = [].slice.call(document.querySelectorAll('.select-num'));
    function clickHandler(event) {
        var currentRow = event.target.parentNode.parentNode,
            nodeList = Array.prototype.slice.call(_self.basket.children),
            currentIndex = nodeList.indexOf(currentRow);
        document.querySelector('.list').style.marginLeft = -`${ 300 * currentIndex }` + `px`;
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

Table.prototype.sumPrice = function (sumArr, cell) {
    var arr = [].slice.call(document.querySelectorAll(sumArr)),
        sum = arr.reduce(function (sum, currentItem) {
        return sum + +currentItem.dataset.price;
    }, 0);
    console.log(sum);
    var displaySumCell = document.querySelector(cell);
    displaySumCell.dataset.price = sum;
    displaySumCell.innerHTML = sum;
};

Table.prototype.updateItemCost = function () {
    var _self = this;
    function listHandler(event) {
        var target = event.target;
        var li = target.closest('li');
        if (!_self.ingrList.contains(li)) {
            return;
        }
        var cost = parseInt(target.parentNode.dataset.price),
            currentTotalCost = document.querySelector(".basket .selected .total");
        if (currentTotalCost) {
            currentTotalCost.dataset.price = parseInt(currentTotalCost.dataset.price) + cost;
            currentTotalCost.innerHTML = currentTotalCost.dataset.price;
            _self.sumPrice('.total', '.sum-price');
        }
    }
    this.ingrList.addEventListener('click', listHandler);
};

Table.prototype.checkCurrentIndex = function () {
    var itemsArray = [].slice.call(document.querySelectorAll(".orders tr .select-num")),
        pizzasArray = [].slice.call(document.querySelectorAll(".pizza-index")),
        i,
        k;
    for (i = 0; i < itemsArray.length; i++) {
        itemsArray[i].innerHTML = i + 1;
    }
    for (k = 0; k < pizzasArray.length; k++) {
        pizzasArray[k].innerHTML = k + 1;
    }
};

Table.prototype.updateItemCount = function () {
    var itemsArray = [].slice.call(document.querySelectorAll(".orders tr .select-num"));
    this.itemCount.innerHTML = itemsArray.length;
};

var table = new Table('.add-pizza', '.basket tbody', '.num', '.select-num', '.ingredients-list', '.total', '.list', '.pizza-item');
table.checkCurrentIndex();
table.renderRow();
table.removeItem();
table.updateItemCount();
table.updateItemCost();
table.setCurrentItem();
table.sumPrice('.total', '.sum-price');
var pizzaBuilder = new PizzaBuilder();
pizzaBuilder.renderSidebar('.ingredients-list', 'public/config.json');

},{}]},{},[1])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJzcmNcXGluZGV4LmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FDQUEsU0FBUyxZQUFULENBQXNCLFNBQXRCLEVBQWdDO0FBQzVCLFNBQUssSUFBTCxHQUFZLElBQVo7QUFDQSxTQUFLLFNBQUwsR0FBaUIsU0FBUyxhQUFULENBQXVCLFNBQXZCLENBQWpCO0FBQ0g7O0FBRUQsYUFBYSxTQUFiLENBQXVCLGFBQXZCLEdBQXVDLFVBQVMsSUFBVCxFQUFjLElBQWQsRUFBbUI7QUFDdEQsUUFBSSxRQUFRLElBQVo7QUFDQSxTQUFLLElBQUwsR0FBWSxTQUFTLGFBQVQsQ0FBdUIsSUFBdkIsQ0FBWjtBQUNBLGFBQVMsYUFBVCxDQUF1QixZQUF2QixFQUFvQyxVQUFwQyxFQUErQztBQUMzQyxZQUFJLFVBQVUsV0FBVyxNQUFYLENBQWQ7QUFDQSxhQUFJLElBQUksSUFBSSxDQUFaLEVBQWUsSUFBSSxRQUFRLE1BQTNCLEVBQWtDLEdBQWxDLEVBQXNDO0FBQ2xDLGdCQUFJLFdBQVk7NkJBQUEsQ0FDQyxRQUFRLENBQVIsRUFBVyxJQUFLLG1CQUFnQixRQUFRLENBQVIsRUFBVyxLQUFNLGlCQUFjLFFBQVEsQ0FBUixFQUFXLEdBQUk7a0JBRC9GO0FBR0EseUJBQWEsU0FBYixJQUEwQixRQUExQjtBQUNIO0FBQ0o7QUFDRCxRQUFJLE1BQU0sSUFBSSxjQUFKLEVBQVY7QUFDQSxRQUFJLElBQUosQ0FBUyxLQUFULEVBQWdCLElBQWhCLEVBQXNCLElBQXRCO0FBQ0EsUUFBSSxrQkFBSixHQUF3QixNQUFLO0FBQ3pCLFlBQUksSUFBSSxVQUFKLElBQWtCLENBQWxCLElBQXVCLElBQUksTUFBSixJQUFjLEdBQXpDLEVBQThDO0FBQzFDLGlCQUFLLElBQUwsR0FBWSxLQUFLLEtBQUwsQ0FBVyxJQUFJLFlBQWYsQ0FBWjtBQUNBLDBCQUFjLEtBQUss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ZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3ZhciBmPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIik7dGhyb3cgZi5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGZ9dmFyIGw9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGwuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sbCxsLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSIsImZ1bmN0aW9uIFBpenphQnVpbGRlcihwaXp6YUxpc3Qpe1xyXG4gICAgdGhpcy5kYXRhID0gbnVsbDtcclxuICAgIHRoaXMucGl6emFMaXN0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihwaXp6YUxpc3QpO1xyXG59XHJcblxyXG5QaXp6YUJ1aWxkZXIucHJvdG90eXBlLnJlbmRlclNpZGViYXIgPSBmdW5jdGlvbihsaXN0LGRhdGEpe1xyXG4gICAgdmFyIF9zZWxmID0gdGhpcztcclxuICAgIHRoaXMubGlzdCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IobGlzdCk7XHJcbiAgICBmdW5jdGlvbiByZW5kZXJTaWRlYmFyKFNlbGVjdGVkTGlzdCxwYXJzZWREYXRhKXtcclxuICAgICAgICB2YXIgZGF0YU9iaiA9IHBhcnNlZERhdGFbJ2RhdGEnXTtcclxuICAgICAgICBmb3IodmFyIGkgPSAxOyBpIDwgZGF0YU9iai5sZW5ndGg7aSsrKXtcclxuICAgICAgICAgICAgdmFyIHRlbXBsYXRlID0gYFxyXG4gICAgICAgICAgICA8bGkgZGF0YS1uYW1lPVwiJHtkYXRhT2JqW2ldLm5hbWV9XCIgZGF0YS1wcmljZT1cIiR7ZGF0YU9ialtpXS5wcmljZX1cIj48aW1nIHNyYz1cIiR7ZGF0YU9ialtpXS5zcmN9XCI+XHJcbiAgICAgICAgICAgIDwvbGk+YDtcclxuICAgICAgICAgICAgU2VsZWN0ZWRMaXN0LmlubmVySFRNTCArPSB0ZW1wbGF0ZTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICB2YXIgeGhyID0gbmV3IFhNTEh0dHBSZXF1ZXN0KCk7XHJcbiAgICB4aHIub3BlbihcIkdFVFwiLCBkYXRhLCB0cnVlKTtcclxuICAgIHhoci5vbnJlYWR5c3RhdGVjaGFuZ2UgPSgpPT4ge1xyXG4gICAgICAgIGlmICh4aHIucmVhZHlTdGF0ZSA9PSA0ICYmIHhoci5zdGF0dXMgPT0gMjAwKSB7XHJcbiAgICAgICAgICAgIHRoaXMuZGF0YSA9IEpTT04ucGFyc2UoeGhyLnJlc3BvbnNlVGV4dCk7XHJcbiAgICAgICAgICAgIHJlbmRlclNpZGViYXIodGhpcy5saXN0LHRoaXMuZGF0YSk7XHJcbiAgICAgICAgfVxyXG4gICAgfTtcclxuICAgIHhoci5zZW5kKCk7XHJcbn07XHJcblxyXG5mdW5jdGlvbiBUYWJsZShhZGRCdG4sIGJhc2tldCwgaXRlbUNvdW50LG51bUJ0bixpbmdyTGlzdCx0b3RhbENlbGwscGl6emFMaXN0LHBpenphTGlzdEl0ZW0pIHtcclxuICAgIHRoaXMuYWRkQnRuID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihhZGRCdG4pO1xyXG4gICAgdGhpcy5iYXNrZXQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKGJhc2tldCk7XHJcbiAgICB0aGlzLml0ZW1Db3VudCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoaXRlbUNvdW50KTtcclxuICAgIHRoaXMubnVtQnRuID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihudW1CdG4pO1xyXG4gICAgdGhpcy5pbmdyTGlzdCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoaW5nckxpc3QpO1xyXG4gICAgdGhpcy50b3RhbENlbGwgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKHRvdGFsQ2VsbCk7XHJcbiAgICB0aGlzLmN1cnJlbnRJbmRleCA9IDI7XHJcbiAgICB0aGlzLnBpenphTGlzdCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IocGl6emFMaXN0KTtcclxuICAgIHRoaXMucGl6emFMaXN0SXRlbSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IocGl6emFMaXN0SXRlbSk7XHJcbn1cclxuXHJcblRhYmxlLnByb3RvdHlwZS5yZW5kZXJSb3cgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICB2YXIgX3NlbGYgPSB0aGlzO1xyXG4gICAgZnVuY3Rpb24gcmVuZGVyUm93SGFuZGxlcigpIHtcclxuICAgICAgICByZXR1cm4gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICB2YXIgcm93VGVtcGxhdGUgPSBgPHRyPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICA8dGQgY2xhc3M9XCJudW1cIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxidXR0b24gY2xhc3M9XCJzZWxlY3QtbnVtXCI+JHtfc2VsZi5jdXJyZW50SW5kZXh9PC9idXR0b24+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L3RkPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHRkIGNsYXNzPVwiaW5ncmVkaWVudHNcIj48L3RkPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHRkIGNsYXNzPVwidG90YWxcIiBkYXRhLXByaWNlPVwiNDBcIj40MDwvdGQ+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8dGQ+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8YnV0dG9uIGNsYXNzPVwicmVtb3ZlXCI+eDwvYnV0dG9uPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICA8L3RkPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICA8L3RyPmA7XHJcbiAgICAgICAgICAgIHZhciBwaXp6YVRlbXBsYXRlID0gYFxyXG4gICAgICAgICAgICAgICAgPGxpIGNsYXNzPVwicGl6emEtaXRlbVwiPlxyXG4gICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwicGl6emEtaW5kZXhcIj4ke19zZWxmLmN1cnJlbnRJbmRleH08L3NwYW4+XHJcbiAgICAgICAgICAgICAgICAgICAgPGltZyBzcmM9XCJpbWFnZXMvcGl6emEuc3ZnXCIgd2lkdGg9XCIzMDBcIiBoZWlnaHQ9XCIzMDBcIiBhbHQ9XCJcIiB0aXRsZT1cIlwiPlxyXG4gICAgICAgICAgICAgICAgPC9saT5cclxuICAgICAgICAgICAgYDtcclxuICAgICAgICAgICAgX3NlbGYucGl6emFMaXN0LmlubmVySFRNTCArPSAgcGl6emFUZW1wbGF0ZTtcclxuICAgICAgICAgICAgX3NlbGYuYmFza2V0LmlubmVySFRNTCArPSByb3dUZW1wbGF0ZTtcclxuICAgICAgICAgICAgX3NlbGYuY3VycmVudEluZGV4ICs9IDE7XHJcbiAgICAgICAgICAgIF9zZWxmLmNoZWNrQ3VycmVudEluZGV4KCk7XHJcbiAgICAgICAgICAgIF9zZWxmLnVwZGF0ZUl0ZW1Db3VudCgpO1xyXG4gICAgICAgICAgICBfc2VsZi5zZXRDdXJyZW50SXRlbSgpO1xyXG4gICAgICAgICAgICBfc2VsZi5zdW1QcmljZSgnLnRvdGFsJywnLnN1bS1wcmljZScpO1xyXG4gICAgICAgIH07XHJcbiAgICB9XHJcbiAgICBfc2VsZi5hZGRCdG4uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIHJlbmRlclJvd0hhbmRsZXIoKSk7XHJcbn07XHJcblxyXG5UYWJsZS5wcm90b3R5cGUucmVtb3ZlSXRlbSA9IGZ1bmN0aW9uICgpIHtcclxuICAgIHZhciBfc2VsZiA9IHRoaXM7XHJcbiAgICBmdW5jdGlvbiByZW1vdmVTZWxmSGFuZGxlcihldmVudCkge1xyXG4gICAgICAgIGlmIChldmVudC50YXJnZXQuY2xhc3NOYW1lID09ICdyZW1vdmUnKSB7XHJcbiAgICAgICAgICAgIHZhciByZW1vdmVSb3cgPSBldmVudC50YXJnZXQucGFyZW50Tm9kZS5wYXJlbnROb2RlLFxyXG4gICAgICAgICAgICAgbm9kZUxpc3QgPSBBcnJheS5wcm90b3R5cGUuc2xpY2UuY2FsbChfc2VsZi5iYXNrZXQuY2hpbGRyZW4pLFxyXG4gICAgICAgICAgICAgY3VycmVudEluZGV4ID0gbm9kZUxpc3QuaW5kZXhPZiggcmVtb3ZlUm93ICk7XHJcbiAgICAgICAgICAgIF9zZWxmLnBpenphTGlzdC5yZW1vdmVDaGlsZChkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcubGlzdCBsaScpW2N1cnJlbnRJbmRleF0pO1xyXG4gICAgICAgICAgICBfc2VsZi5iYXNrZXQucmVtb3ZlQ2hpbGQocmVtb3ZlUm93KTtcclxuICAgICAgICAgICAgX3NlbGYuY2hlY2tDdXJyZW50SW5kZXgoKTtcclxuICAgICAgICAgICAgX3NlbGYudXBkYXRlSXRlbUNvdW50KCk7XHJcbiAgICAgICAgICAgIF9zZWxmLnNldEN1cnJlbnRJdGVtKCk7XHJcbiAgICAgICAgICAgIF9zZWxmLnN1bVByaWNlKCcudG90YWwnLCcuc3VtLXByaWNlJyk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcignYm9keScpLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgcmVtb3ZlU2VsZkhhbmRsZXIpO1xyXG59O1xyXG5cclxuVGFibGUucHJvdG90eXBlLnNldEN1cnJlbnRJdGVtID0gZnVuY3Rpb24gKCkge1xyXG4gICAgdmFyIF9zZWxmID0gdGhpcyxcclxuICAgICAgICBidG5zID0gW10uc2xpY2UuY2FsbChkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcuc2VsZWN0LW51bScpKTtcclxuICAgIGZ1bmN0aW9uIGNsaWNrSGFuZGxlcihldmVudCl7XHJcbiAgICAgICAgdmFyIGN1cnJlbnRSb3cgPSBldmVudC50YXJnZXQucGFyZW50Tm9kZS5wYXJlbnROb2RlLFxyXG4gICAgICAgICAgICBub2RlTGlzdCA9IEFycmF5LnByb3RvdHlwZS5zbGljZS5jYWxsKF9zZWxmLmJhc2tldC5jaGlsZHJlbiksXHJcbiAgICAgICAgICAgIGN1cnJlbnRJbmRleCA9IG5vZGVMaXN0LmluZGV4T2YoIGN1cnJlbnRSb3cgKTtcclxuICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcubGlzdCcpLnN0eWxlLm1hcmdpbkxlZnQgPSAtYCR7MzAwKmN1cnJlbnRJbmRleH1gK2BweGA7XHJcbiAgICAgICAgdmFyIHRyID0gW10uc2xpY2UuY2FsbChkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcuYmFza2V0IHRyJykpO1xyXG4gICAgICAgIGZvcih2YXIgaSA9IDA7IGkgPCB0ci5sZW5ndGg7aSsrKXtcclxuICAgICAgICAgICAgdHJbaV0uY2xhc3NMaXN0LnJlbW92ZSgnc2VsZWN0ZWQnKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5jbG9zZXN0KCd0cicpLmNsYXNzTGlzdC5hZGQoJ3NlbGVjdGVkJyk7XHJcbiAgICB9XHJcbiAgICBmb3IodmFyIGkgPSAwOyBpIDwgYnRucy5sZW5ndGg7aSsrKXtcclxuICAgICAgICBidG5zW2ldLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJyxjbGlja0hhbmRsZXIpO1xyXG4gICAgfVxyXG59O1xyXG5cclxuVGFibGUucHJvdG90eXBlLnN1bVByaWNlID0gZnVuY3Rpb24oc3VtQXJyLGNlbGwpe1xyXG4gICAgdmFyIGFyciA9IFtdLnNsaWNlLmNhbGwoZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChzdW1BcnIpKSxcclxuICAgICAgICBzdW0gPSBhcnIucmVkdWNlKGZ1bmN0aW9uKHN1bSxjdXJyZW50SXRlbSl7XHJcbiAgICAgICAgcmV0dXJuIHN1bSArICgrY3VycmVudEl0ZW0uZGF0YXNldC5wcmljZSk7XHJcbiAgICB9LDApO1xyXG4gICAgY29uc29sZS5sb2coc3VtKTtcclxuICAgIHZhciBkaXNwbGF5U3VtQ2VsbCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoY2VsbCk7XHJcbiAgICBkaXNwbGF5U3VtQ2VsbC5kYXRhc2V0LnByaWNlID0gc3VtO1xyXG4gICAgZGlzcGxheVN1bUNlbGwuaW5uZXJIVE1MID0gc3VtO1xyXG59O1xyXG5cclxuVGFibGUucHJvdG90eXBlLnVwZGF0ZUl0ZW1Db3N0ID0gZnVuY3Rpb24gKCkge1xyXG4gICAgdmFyIF9zZWxmPSB0aGlzO1xyXG4gICAgZnVuY3Rpb24gbGlzdEhhbmRsZXIoZXZlbnQpe1xyXG4gICAgICAgIHZhciB0YXJnZXQgPSBldmVudC50YXJnZXQ7XHJcbiAgICAgICAgdmFyIGxpID0gdGFyZ2V0LmNsb3Nlc3QoJ2xpJyk7XHJcbiAgICAgICAgaWYgKCFfc2VsZi5pbmdyTGlzdC5jb250YWlucyhsaSkpe1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHZhciBjb3N0ID0gcGFyc2VJbnQodGFyZ2V0LnBhcmVudE5vZGUuZGF0YXNldC5wcmljZSksXHJcbiAgICAgICAgICAgIGN1cnJlbnRUb3RhbENvc3QgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmJhc2tldCAuc2VsZWN0ZWQgLnRvdGFsXCIpO1xyXG4gICAgICAgIGlmKGN1cnJlbnRUb3RhbENvc3Qpe1xyXG4gICAgICAgICAgICBjdXJyZW50VG90YWxDb3N0LmRhdGFzZXQucHJpY2UgPSBwYXJzZUludChjdXJyZW50VG90YWxDb3N0LmRhdGFzZXQucHJpY2UpICsgY29zdDtcclxuICAgICAgICAgICAgY3VycmVudFRvdGFsQ29zdC5pbm5lckhUTUwgPSBjdXJyZW50VG90YWxDb3N0LmRhdGFzZXQucHJpY2U7XHJcbiAgICAgICAgICAgIF9zZWxmLnN1bVByaWNlKCcudG90YWwnLCcuc3VtLXByaWNlJyk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgdGhpcy5pbmdyTGlzdC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsbGlzdEhhbmRsZXIpO1xyXG59O1xyXG5cclxuVGFibGUucHJvdG90eXBlLmNoZWNrQ3VycmVudEluZGV4ID0gZnVuY3Rpb24gKCkge1xyXG4gICAgdmFyIGl0ZW1zQXJyYXkgPSBbXS5zbGljZS5jYWxsKGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXCIub3JkZXJzIHRyIC5zZWxlY3QtbnVtXCIpKSxcclxuICAgICAgICBwaXp6YXNBcnJheSA9IFtdLnNsaWNlLmNhbGwoZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChcIi5waXp6YS1pbmRleFwiKSksXHJcbiAgICAgICAgaSxcclxuICAgICAgICBrO1xyXG4gICAgZm9yIChpID0gMDsgaSA8IGl0ZW1zQXJyYXkubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICBpdGVtc0FycmF5W2ldLmlubmVySFRNTCA9IGkgKyAxO1xyXG4gICAgfVxyXG4gICAgZm9yIChrID0gMDsgayA8IHBpenphc0FycmF5Lmxlbmd0aDsgaysrKSB7XHJcbiAgICAgICAgcGl6emFzQXJyYXlba10uaW5uZXJIVE1MID0gayArIDE7XHJcbiAgICB9XHJcbn07XHJcblxyXG5UYWJsZS5wcm90b3R5cGUudXBkYXRlSXRlbUNvdW50ID0gZnVuY3Rpb24gKCkge1xyXG4gICAgdmFyIGl0ZW1zQXJyYXkgPSBbXS5zbGljZS5jYWxsKGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXCIub3JkZXJzIHRyIC5zZWxlY3QtbnVtXCIpKTtcclxuICAgIHRoaXMuaXRlbUNvdW50LmlubmVySFRNTCA9IGl0ZW1zQXJyYXkubGVuZ3RoO1xyXG59O1xyXG5cclxudmFyIHRhYmxlID0gbmV3IFRhYmxlKCcuYWRkLXBpenphJywgJy5iYXNrZXQgdGJvZHknLCAnLm51bScsJy5zZWxlY3QtbnVtJywnLmluZ3JlZGllbnRzLWxpc3QnLCcudG90YWwnLCcubGlzdCcsJy5waXp6YS1pdGVtJyk7XHJcbnRhYmxlLmNoZWNrQ3VycmVudEluZGV4KCk7XHJcbnRhYmxlLnJlbmRlclJvdygpO1xyXG50YWJsZS5yZW1vdmVJdGVtKCk7XHJcbnRhYmxlLnVwZGF0ZUl0ZW1Db3VudCgpO1xyXG50YWJsZS51cGRhdGVJdGVtQ29zdCgpO1xyXG50YWJsZS5zZXRDdXJyZW50SXRlbSgpO1xyXG50YWJsZS5zdW1QcmljZSgnLnRvdGFsJywnLnN1bS1wcmljZScpO1xyXG52YXIgcGl6emFCdWlsZGVyID0gbmV3IFBpenphQnVpbGRlcigpO1xyXG5waXp6YUJ1aWxkZXIucmVuZGVyU2lkZWJhcignLmluZ3JlZGllbnRzLWxpc3QnLCdwdWJsaWMvY29uZmlnLmpzb24nKTtcclxuXHJcbiJdfQ==
