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
    //this.salamiItem = document.querySelector(".ingredients-item.salami");
    //this.salamiItemInput = document.querySelector(".ingredients-item.salami .input");
    //this.tomatoItem = document.querySelector(".ingredients-item.tomato");
    //this.tomatoItemInput = document.querySelector(".ingredients-item.tomato .input");
    //this.baconItem = document.querySelector(".ingredients-item.bacon");
    //this.baconItemInput = document.querySelector(".ingredients-item.bacon .input");
    //this.cheezeItem = document.querySelector(".ingredients-item.cheeze");
    //this.cheezeItemInput = document.querySelector(".ingredients-item.cheeze .input");
    //this.greenItem = document.querySelector(".ingredients-item.green");
    //this.greenItemInput = document.querySelector(".ingredients-item.green .input");
}

Table.prototype.renderRow = function () {
    var _self = this;

    function renderRowHandler() {
        return function () {
            var rowTemplate = `<tr>
                           <td class="num">
                               <button class="select-num">${ _self.currentIndex }</button>
                               </td>
                               <td class="ingredients">
            <div class="ingredients-item salami">
              <span class="name">Salami <img src="images/salami.svg" alt=""></span>
              <button class="plus">+</button>
              <input type='number' class="input">
              <button class="minus">-</button>
            </div>
            <div class="ingredients-item tomato">
              <span class="name">tomato <img src="images/tomato.svg" alt=""></span>
              <button class="plus">+</button>
              <input type='number' class="input">
              <button class="minus">-</button>
            </div>
            <div class="ingredients-item bacon">
              <span class="name">bacon <img src="images/bacon.svg" alt=""></span>
              <button class="plus">+</button>
              <input type='number' class="input">
              <button class="minus">-</button>
            </div>
            <div class="ingredients-item cheeze">
              <span class="name">cheeze <img src="images/cheeze.svg" alt=""></span>
              <button class="plus">+</button>
              <input type='number' class="input">
              <button class="minus">-</button>
            </div>
            <div class="ingredients-item green">
              <span class="name">green <img src="images/green.svg" alt=""></span>
              <button class="plus">+</button>
              <input type='number' class="input">
              <button class="minus">-</button>
            </div>
          </td>
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
            document.querySelector('.list').style.marginLeft = -`${ 300 * (currentIndex - 1) }` + `px`;
            console.log(currentIndex - 1);
            _self.checkCurrentIndex();
            _self.updateItemCount();
            _self.setCurrentItem();
            _self.basket.children[parseInt(currentIndex) - 1].classList.add('selected');
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
            currentIndex = nodeList.indexOf(currentRow),
            list = document.querySelectorAll('.list .pizza-item');
        for (var k = 0; k < list.length; k++) {
            list[k].classList.remove('active');
        }
        list[currentIndex].classList.add('active');
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
    var displaySumCell = document.querySelector(cell);
    displaySumCell.dataset.price = sum;
    displaySumCell.innerHTML = sum;
};

Table.prototype.ingradientsOptions = function () {
    //var salamiItem = {
    //    plus:document.querySelector('.ingredients-item.salami .plus'),
    //    minus: document.querySelector('.ingredients-item.salami .minus'),
    //    input: document.querySelector('.ingredients-item.salami input')
    //};
    //  var itemsArr = [];
    //  var salamiItem = document.querySelector(".ingredients-item.salami"),
    //      salamiItemInput = document.querySelector(".ingredients-item.salami .input"),
    //      tomatoItem = document.querySelector(".ingredients-item.tomato"),
    //      tomatoItemInput = document.querySelector(".ingredients-item.tomato .input"),
    //      baconItem = document.querySelector(".ingredients-item.bacon"),
    //      baconItemInput = document.querySelector(".ingredients-item.bacon .input"),
    //      cheezeItem = document.querySelector(".ingredients-item.cheeze"),
    //      cheezeItemInput = document.querySelector(".ingredients-item.cheeze .input"),
    //      greenItem = document.querySelector(".ingredients-item.green"),
    //      greenItemInput = document.querySelector(".ingredients-item.green .input");
    function clickActionHandler(event) {
        var target = event.target;
        if (target.classList.contains("plus")) {
            target.nextElementSibling.value++;
        }
        if (target.classList.contains("minus")) {
            target.previousElementSibling.value--;
        }
    }
    document.querySelector('.ingredients').addEventListener('click', clickActionHandler);
};

Table.prototype.updateItemCost = function () {
    var _self = this;

    function listHandler(event) {
        function getRandom(min, max) {
            return Math.round(Math.random() * (max - min) + min);
        }
        var target = event.target;
        if (target.tagName == 'IMG') {
            var src = target.getAttribute('src');
            var newImg = document.createElement('img');
            newImg.src = src;
            newImg.style.top = getRandom(25, 240) + "px";
            newImg.style.left = getRandom(25, 240) + "px";
            newImg.classList.add('ingredient');
            document.querySelector('.pizza-item.active').appendChild(newImg);
            var name = target.parentNode.dataset.name;
            console.log(name);
            var input = document.querySelector('.ingredients-item' + '.' + name + ' .input');
            input.value++;
        }
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
table.ingradientsOptions();
var pizzaBuilder = new PizzaBuilder();
pizzaBuilder.renderSidebar('.ingredients-list', 'public/config.json');

},{}]},{},[1])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJzcmNcXGluZGV4LmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FDQUEsU0FBUyxZQUFULENBQXNCLFNBQXRCLEVBQWlDO0FBQzdCLFNBQUssSUFBTCxHQUFZLElBQVo7QUFDQSxTQUFLLFNBQUwsR0FBaUIsU0FBUyxhQUFULENBQXVCLFNBQXZCLENBQWpCO0FBQ0g7O0FBRUQsYUFBYSxTQUFiLENBQXVCLGFBQXZCLEdBQXVDLFVBQVUsSUFBVixFQUFnQixJQUFoQixFQUFzQjtBQUN6RCxRQUFJLFFBQVEsSUFBWjtBQUNBLFNBQUssSUFBTCxHQUFZLFNBQVMsYUFBVCxDQUF1QixJQUF2QixDQUFaO0FBQ0EsYUFBUyxhQUFULENBQXVCLFlBQXZCLEVBQXFDLFVBQXJDLEVBQWlEO0FBQzdDLFlBQUksVUFBVSxXQUFXLE1BQVgsQ0FBZDtBQUNBLGFBQUssSUFBSSxJQUFJLENBQWIsRUFBZ0IsSUFBSSxRQUFRLE1BQTVCLEVBQW9DLEdBQXBDLEVBQXlDO0FBQ3JDLGdCQUFJLFdBQVk7NkJBQUEsQ0FDQyxRQUFRLENBQVIsRUFBVyxJQUFLLG1CQUFnQixRQUFRLENBQVIsRUFBVyxLQUFNLGlCQUFjLFFBQVEsQ0FBUixFQUFXLEdBQUk7a0JBRC9GO0FBR0EseUJBQWEsU0FBYixJQUEwQixRQUExQjtBQUNIO0FBQ0o7O0FBRUQsUUFBSSxNQUFNLElBQUksY0FBSixFQUFWO0FBQ0EsUUFBSSxJQUFKLENBQVMsS0FBVCxFQUFnQixJQUFoQixFQUFzQixJQUF0QjtBQUNBLFFBQUksa0JBQUosR0FBeUIsTUFBSztBQUMxQixZQUFJLElBQUksVUFBSixJQUFrQixDQUFsQixJQUF1QixJQUFJLE1BQUosSUFBYyxHQUF6QyxFQUE4QztBQUMxQyxpQkFBSyxJQUFMLEdBQVksS0FBSyxLQUFMLENBQVcsSUFBSSxZQUFmLENBQVo7QUFDQSwwQkFBYyxL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LEVBQXdDO0FBQ3BDLG1CQUFXLENBQVgsRUFBYyxTQUFkLEdBQTBCLElBQUksQ0FBOUI7QUFDSDtBQUNELFNBQUssSUFBSSxDQUFULEVBQVksSUFBSSxZQUFZLE1BQTVCLEVBQW9DLEdBQXBDLEVBQXlDO0FBQ3JDLG9CQUFZLENBQVosRUFBZSxTQUFmLEdBQTJCLElBQUksQ0FBL0I7QUFDSDtBQUNKLENBWEQ7O0FBYUEsTUFBTSxTQUFOLENBQWdCLGVBQWhCLEdBQWtDLFlBQVk7QUFDMUMsUUFBSSxhQUFhLEdBQUcsS0FBSCxDQUFTLElBQVQsQ0FBYyxTQUFTLGdCQUFULENBQTBCLHdCQUExQixDQUFkLENBQWpCO0FBQ0EsU0FBSyxTQUFMLENBQWUsU0FBZixHQUEyQixXQUFXLE1BQXRDO0FBQ0gsQ0FIRDs7QUFLQSxJQUFJLFFBQVEsSUFBSSxLQUFKLENBQVUsWUFBVixFQUF3QixlQUF4QixFQUF5QyxNQUF6QyxFQUFpRCxhQUFqRCxFQUFnRSxtQkFBaEUsRUFBcUYsUUFBckYsRUFBK0YsT0FBL0YsRUFBd0csYUFBeEcsQ0FBWjtBQUNBLE1BQU0saUJBQU47QUFDQSxNQUFNLFNBQU47QUFDQSxNQUFNLFVBQU47QUFDQSxNQUFNLGVBQU47QUFDQSxNQUFNLGNBQU47QUFDQSxNQUFNLGNBQU47QUFDQSxNQUFNLFFBQU4sQ0FBZSxRQUFmLEVBQXlCLFlBQXpCO0FBQ0EsTUFBTSxrQkFBTjtBQUNBLElBQUksZUFBZSxJQUFJLFlBQUosRUFBbkI7QUFDQSxhQUFhLGFBQWIsQ0FBMkIsbUJBQTNCLEVBQWdELG9CQUFoRCIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiLCJmdW5jdGlvbiBQaXp6YUJ1aWxkZXIocGl6emFMaXN0KSB7XHJcbiAgICB0aGlzLmRhdGEgPSBudWxsO1xyXG4gICAgdGhpcy5waXp6YUxpc3QgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKHBpenphTGlzdCk7XHJcbn1cclxuXHJcblBpenphQnVpbGRlci5wcm90b3R5cGUucmVuZGVyU2lkZWJhciA9IGZ1bmN0aW9uIChsaXN0LCBkYXRhKSB7XHJcbiAgICB2YXIgX3NlbGYgPSB0aGlzO1xyXG4gICAgdGhpcy5saXN0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihsaXN0KTtcclxuICAgIGZ1bmN0aW9uIHJlbmRlclNpZGViYXIoU2VsZWN0ZWRMaXN0LCBwYXJzZWREYXRhKSB7XHJcbiAgICAgICAgdmFyIGRhdGFPYmogPSBwYXJzZWREYXRhWydkYXRhJ107XHJcbiAgICAgICAgZm9yICh2YXIgaSA9IDE7IGkgPCBkYXRhT2JqLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIHZhciB0ZW1wbGF0ZSA9IGBcclxuICAgICAgICAgICAgPGxpIGRhdGEtbmFtZT1cIiR7ZGF0YU9ialtpXS5uYW1lfVwiIGRhdGEtcHJpY2U9XCIke2RhdGFPYmpbaV0ucHJpY2V9XCI+PGltZyBzcmM9XCIke2RhdGFPYmpbaV0uc3JjfVwiPlxyXG4gICAgICAgICAgICA8L2xpPmA7XHJcbiAgICAgICAgICAgIFNlbGVjdGVkTGlzdC5pbm5lckhUTUwgKz0gdGVtcGxhdGU7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHZhciB4aHIgPSBuZXcgWE1MSHR0cFJlcXVlc3QoKTtcclxuICAgIHhoci5vcGVuKFwiR0VUXCIsIGRhdGEsIHRydWUpO1xyXG4gICAgeGhyLm9ucmVhZHlzdGF0ZWNoYW5nZSA9ICgpPT4ge1xyXG4gICAgICAgIGlmICh4aHIucmVhZHlTdGF0ZSA9PSA0ICYmIHhoci5zdGF0dXMgPT0gMjAwKSB7XHJcbiAgICAgICAgICAgIHRoaXMuZGF0YSA9IEpTT04ucGFyc2UoeGhyLnJlc3BvbnNlVGV4dCk7XHJcbiAgICAgICAgICAgIHJlbmRlclNpZGViYXIodGhpcy5saXN0LCB0aGlzLmRhdGEpO1xyXG4gICAgICAgIH1cclxuICAgIH07XHJcbiAgICB4aHIuc2VuZCgpO1xyXG59O1xyXG5cclxuZnVuY3Rpb24gVGFibGUoYWRkQnRuLCBiYXNrZXQsIGl0ZW1Db3VudCwgbnVtQnRuLCBpbmdyTGlzdCwgdG90YWxDZWxsLCBwaXp6YUxpc3QsIHBpenphTGlzdEl0ZW0pIHtcclxuICAgIHRoaXMuYWRkQnRuID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihhZGRCdG4pO1xyXG4gICAgdGhpcy5iYXNrZXQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKGJhc2tldCk7XHJcbiAgICB0aGlzLml0ZW1Db3VudCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoaXRlbUNvdW50KTtcclxuICAgIHRoaXMubnVtQnRuID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihudW1CdG4pO1xyXG4gICAgdGhpcy5pbmdyTGlzdCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoaW5nckxpc3QpO1xyXG4gICAgdGhpcy50b3RhbENlbGwgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKHRvdGFsQ2VsbCk7XHJcbiAgICB0aGlzLmN1cnJlbnRJbmRleCA9IDI7XHJcbiAgICB0aGlzLnBpenphTGlzdCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IocGl6emFMaXN0KTtcclxuICAgIHRoaXMucGl6emFMaXN0SXRlbSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IocGl6emFMaXN0SXRlbSk7XHJcbiAgICAvL3RoaXMuc2FsYW1pSXRlbSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuaW5ncmVkaWVudHMtaXRlbS5zYWxhbWlcIik7XHJcbiAgICAvL3RoaXMuc2FsYW1pSXRlbUlucHV0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5pbmdyZWRpZW50cy1pdGVtLnNhbGFtaSAuaW5wdXRcIik7XHJcbiAgICAvL3RoaXMudG9tYXRvSXRlbSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuaW5ncmVkaWVudHMtaXRlbS50b21hdG9cIik7XHJcbiAgICAvL3RoaXMudG9tYXRvSXRlbUlucHV0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5pbmdyZWRpZW50cy1pdGVtLnRvbWF0byAuaW5wdXRcIik7XHJcbiAgICAvL3RoaXMuYmFjb25JdGVtID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5pbmdyZWRpZW50cy1pdGVtLmJhY29uXCIpO1xyXG4gICAgLy90aGlzLmJhY29uSXRlbUlucHV0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5pbmdyZWRpZW50cy1pdGVtLmJhY29uIC5pbnB1dFwiKTtcclxuICAgIC8vdGhpcy5jaGVlemVJdGVtID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5pbmdyZWRpZW50cy1pdGVtLmNoZWV6ZVwiKTtcclxuICAgIC8vdGhpcy5jaGVlemVJdGVtSW5wdXQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmluZ3JlZGllbnRzLWl0ZW0uY2hlZXplIC5pbnB1dFwiKTtcclxuICAgIC8vdGhpcy5ncmVlbkl0ZW0gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmluZ3JlZGllbnRzLWl0ZW0uZ3JlZW5cIik7XHJcbiAgICAvL3RoaXMuZ3JlZW5JdGVtSW5wdXQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmluZ3JlZGllbnRzLWl0ZW0uZ3JlZW4gLmlucHV0XCIpO1xyXG59XHJcblxyXG5UYWJsZS5wcm90b3R5cGUucmVuZGVyUm93ID0gZnVuY3Rpb24gKCkge1xyXG4gICAgdmFyIF9zZWxmID0gdGhpcztcclxuXHJcbiAgICBmdW5jdGlvbiByZW5kZXJSb3dIYW5kbGVyKCkge1xyXG4gICAgICAgIHJldHVybiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIHZhciByb3dUZW1wbGF0ZSA9IGA8dHI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgIDx0ZCBjbGFzcz1cIm51bVwiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGJ1dHRvbiBjbGFzcz1cInNlbGVjdC1udW1cIj4ke19zZWxmLmN1cnJlbnRJbmRleH08L2J1dHRvbj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvdGQ+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8dGQgY2xhc3M9XCJpbmdyZWRpZW50c1wiPlxyXG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVwiaW5ncmVkaWVudHMtaXRlbSBzYWxhbWlcIj5cclxuICAgICAgICAgICAgICA8c3BhbiBjbGFzcz1cIm5hbWVcIj5TYWxhbWkgPGltZyBzcmM9XCJpbWFnZXMvc2FsYW1pLnN2Z1wiIGFsdD1cIlwiPjwvc3Bhbj5cclxuICAgICAgICAgICAgICA8YnV0dG9uIGNsYXNzPVwicGx1c1wiPis8L2J1dHRvbj5cclxuICAgICAgICAgICAgICA8aW5wdXQgdHlwZT0nbnVtYmVyJyBjbGFzcz1cImlucHV0XCI+XHJcbiAgICAgICAgICAgICAgPGJ1dHRvbiBjbGFzcz1cIm1pbnVzXCI+LTwvYnV0dG9uPlxyXG4gICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cImluZ3JlZGllbnRzLWl0ZW0gdG9tYXRvXCI+XHJcbiAgICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJuYW1lXCI+dG9tYXRvIDxpbWcgc3JjPVwiaW1hZ2VzL3RvbWF0by5zdmdcIiBhbHQ9XCJcIj48L3NwYW4+XHJcbiAgICAgICAgICAgICAgPGJ1dHRvbiBjbGFzcz1cInBsdXNcIj4rPC9idXR0b24+XHJcbiAgICAgICAgICAgICAgPGlucHV0IHR5cGU9J251bWJlcicgY2xhc3M9XCJpbnB1dFwiPlxyXG4gICAgICAgICAgICAgIDxidXR0b24gY2xhc3M9XCJtaW51c1wiPi08L2J1dHRvbj5cclxuICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJpbmdyZWRpZW50cy1pdGVtIGJhY29uXCI+XHJcbiAgICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJuYW1lXCI+YmFjb24gPGltZyBzcmM9XCJpbWFnZXMvYmFjb24uc3ZnXCIgYWx0PVwiXCI+PC9zcGFuPlxyXG4gICAgICAgICAgICAgIDxidXR0b24gY2xhc3M9XCJwbHVzXCI+KzwvYnV0dG9uPlxyXG4gICAgICAgICAgICAgIDxpbnB1dCB0eXBlPSdudW1iZXInIGNsYXNzPVwiaW5wdXRcIj5cclxuICAgICAgICAgICAgICA8YnV0dG9uIGNsYXNzPVwibWludXNcIj4tPC9idXR0b24+XHJcbiAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVwiaW5ncmVkaWVudHMtaXRlbSBjaGVlemVcIj5cclxuICAgICAgICAgICAgICA8c3BhbiBjbGFzcz1cIm5hbWVcIj5jaGVlemUgPGltZyBzcmM9XCJpbWFnZXMvY2hlZXplLnN2Z1wiIGFsdD1cIlwiPjwvc3Bhbj5cclxuICAgICAgICAgICAgICA8YnV0dG9uIGNsYXNzPVwicGx1c1wiPis8L2J1dHRvbj5cclxuICAgICAgICAgICAgICA8aW5wdXQgdHlwZT0nbnVtYmVyJyBjbGFzcz1cImlucHV0XCI+XHJcbiAgICAgICAgICAgICAgPGJ1dHRvbiBjbGFzcz1cIm1pbnVzXCI+LTwvYnV0dG9uPlxyXG4gICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cImluZ3JlZGllbnRzLWl0ZW0gZ3JlZW5cIj5cclxuICAgICAgICAgICAgICA8c3BhbiBjbGFzcz1cIm5hbWVcIj5ncmVlbiA8aW1nIHNyYz1cImltYWdlcy9ncmVlbi5zdmdcIiBhbHQ9XCJcIj48L3NwYW4+XHJcbiAgICAgICAgICAgICAgPGJ1dHRvbiBjbGFzcz1cInBsdXNcIj4rPC9idXR0b24+XHJcbiAgICAgICAgICAgICAgPGlucHV0IHR5cGU9J251bWJlcicgY2xhc3M9XCJpbnB1dFwiPlxyXG4gICAgICAgICAgICAgIDxidXR0b24gY2xhc3M9XCJtaW51c1wiPi08L2J1dHRvbj5cclxuICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICA8L3RkPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHRkIGNsYXNzPVwidG90YWxcIiBkYXRhLXByaWNlPVwiNDBcIj40MDwvdGQ+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8dGQ+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8YnV0dG9uIGNsYXNzPVwicmVtb3ZlXCI+eDwvYnV0dG9uPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICA8L3RkPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICA8L3RyPmA7XHJcbiAgICAgICAgICAgIHZhciBwaXp6YVRlbXBsYXRlID0gYFxyXG4gICAgICAgICAgICAgICAgPGxpIGNsYXNzPVwicGl6emEtaXRlbVwiPlxyXG4gICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwicGl6emEtaW5kZXhcIj4ke19zZWxmLmN1cnJlbnRJbmRleH08L3NwYW4+XHJcbiAgICAgICAgICAgICAgICAgICAgPGltZyBzcmM9XCJpbWFnZXMvcGl6emEuc3ZnXCIgd2lkdGg9XCIzMDBcIiBoZWlnaHQ9XCIzMDBcIiBhbHQ9XCJcIiB0aXRsZT1cIlwiPlxyXG4gICAgICAgICAgICAgICAgPC9saT5cclxuICAgICAgICAgICAgYDtcclxuICAgICAgICAgICAgX3NlbGYucGl6emFMaXN0LmlubmVySFRNTCArPSBwaXp6YVRlbXBsYXRlO1xyXG4gICAgICAgICAgICBfc2VsZi5iYXNrZXQuaW5uZXJIVE1MICs9IHJvd1RlbXBsYXRlO1xyXG4gICAgICAgICAgICBfc2VsZi5jdXJyZW50SW5kZXggKz0gMTtcclxuICAgICAgICAgICAgX3NlbGYuY2hlY2tDdXJyZW50SW5kZXgoKTtcclxuICAgICAgICAgICAgX3NlbGYudXBkYXRlSXRlbUNvdW50KCk7XHJcbiAgICAgICAgICAgIF9zZWxmLnNldEN1cnJlbnRJdGVtKCk7XHJcbiAgICAgICAgICAgIF9zZWxmLnN1bVByaWNlKCcudG90YWwnLCAnLnN1bS1wcmljZScpO1xyXG4gICAgICAgIH07XHJcbiAgICB9XHJcblxyXG4gICAgX3NlbGYuYWRkQnRuLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCByZW5kZXJSb3dIYW5kbGVyKCkpO1xyXG59O1xyXG5cclxuVGFibGUucHJvdG90eXBlLnJlbW92ZUl0ZW0gPSBmdW5jdGlvbiAoKSB7XHJcbiAgICB2YXIgX3NlbGYgPSB0aGlzO1xyXG5cclxuICAgIGZ1bmN0aW9uIHJlbW92ZVNlbGZIYW5kbGVyKGV2ZW50KSB7XHJcbiAgICAgICAgaWYgKGV2ZW50LnRhcmdldC5jbGFzc05hbWUgPT0gJ3JlbW92ZScpIHtcclxuICAgICAgICAgICAgdmFyIHJlbW92ZVJvdyA9IGV2ZW50LnRhcmdldC5wYXJlbnROb2RlLnBhcmVudE5vZGUsXHJcbiAgICAgICAgICAgICAgICBub2RlTGlzdCA9IEFycmF5LnByb3RvdHlwZS5zbGljZS5jYWxsKF9zZWxmLmJhc2tldC5jaGlsZHJlbiksXHJcbiAgICAgICAgICAgICAgICBjdXJyZW50SW5kZXggPSBub2RlTGlzdC5pbmRleE9mKHJlbW92ZVJvdyk7XHJcbiAgICAgICAgICAgIF9zZWxmLnBpenphTGlzdC5yZW1vdmVDaGlsZChkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcubGlzdCBsaScpW2N1cnJlbnRJbmRleF0pO1xyXG4gICAgICAgICAgICBfc2VsZi5iYXNrZXQucmVtb3ZlQ2hpbGQocmVtb3ZlUm93KTtcclxuICAgICAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmxpc3QnKS5zdHlsZS5tYXJnaW5MZWZ0ID0gLWAkezMwMCAqIChjdXJyZW50SW5kZXggLSAxKX1gICsgYHB4YDtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coY3VycmVudEluZGV4IC0gMSk7XHJcbiAgICAgICAgICAgIF9zZWxmLmNoZWNrQ3VycmVudEluZGV4KCk7XHJcbiAgICAgICAgICAgIF9zZWxmLnVwZGF0ZUl0ZW1Db3VudCgpO1xyXG4gICAgICAgICAgICBfc2VsZi5zZXRDdXJyZW50SXRlbSgpO1xyXG4gICAgICAgICAgICBfc2VsZi5iYXNrZXQuY2hpbGRyZW5bcGFyc2VJbnQoY3VycmVudEluZGV4KSAtIDFdLmNsYXNzTGlzdC5hZGQoJ3NlbGVjdGVkJyk7XHJcbiAgICAgICAgICAgIF9zZWxmLnN1bVByaWNlKCcudG90YWwnLCAnLnN1bS1wcmljZScpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdib2R5JykuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCByZW1vdmVTZWxmSGFuZGxlcik7XHJcbn07XHJcblxyXG5UYWJsZS5wcm90b3R5cGUuc2V0Q3VycmVudEl0ZW0gPSBmdW5jdGlvbiAoKSB7XHJcbiAgICB2YXIgX3NlbGYgPSB0aGlzLFxyXG4gICAgICAgIGJ0bnMgPSBbXS5zbGljZS5jYWxsKGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5zZWxlY3QtbnVtJykpO1xyXG5cclxuICAgIGZ1bmN0aW9uIGNsaWNrSGFuZGxlcihldmVudCkge1xyXG4gICAgICAgIHZhciBjdXJyZW50Um93ID0gZXZlbnQudGFyZ2V0LnBhcmVudE5vZGUucGFyZW50Tm9kZSxcclxuICAgICAgICAgICAgbm9kZUxpc3QgPSBBcnJheS5wcm90b3R5cGUuc2xpY2UuY2FsbChfc2VsZi5iYXNrZXQuY2hpbGRyZW4pLFxyXG4gICAgICAgICAgICBjdXJyZW50SW5kZXggPSBub2RlTGlzdC5pbmRleE9mKGN1cnJlbnRSb3cpLFxyXG4gICAgICAgICAgICBsaXN0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLmxpc3QgLnBpenphLWl0ZW0nKTtcclxuICAgICAgICBmb3IgKHZhciBrID0gMDsgayA8IGxpc3QubGVuZ3RoOyBrKyspIHtcclxuICAgICAgICAgICAgbGlzdFtrXS5jbGFzc0xpc3QucmVtb3ZlKCdhY3RpdmUnKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgbGlzdFtjdXJyZW50SW5kZXhdLmNsYXNzTGlzdC5hZGQoJ2FjdGl2ZScpO1xyXG4gICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5saXN0Jykuc3R5bGUubWFyZ2luTGVmdCA9IC1gJHszMDAgKiAoY3VycmVudEluZGV4KX1gICsgYHB4YDtcclxuICAgICAgICB2YXIgdHIgPSBbXS5zbGljZS5jYWxsKGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5iYXNrZXQgdHInKSk7XHJcbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCB0ci5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICB0cltpXS5jbGFzc0xpc3QucmVtb3ZlKCdzZWxlY3RlZCcpO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLmNsb3Nlc3QoJ3RyJykuY2xhc3NMaXN0LmFkZCgnc2VsZWN0ZWQnKTtcclxuICAgIH1cclxuXHJcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IGJ0bnMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICBidG5zW2ldLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgY2xpY2tIYW5kbGVyKTtcclxuICAgIH1cclxufTtcclxuXHJcblRhYmxlLnByb3RvdHlwZS5zdW1QcmljZSA9IGZ1bmN0aW9uIChzdW1BcnIsIGNlbGwpIHtcclxuICAgIHZhciBhcnIgPSBbXS5zbGljZS5jYWxsKGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoc3VtQXJyKSksXHJcbiAgICAgICAgc3VtID0gYXJyLnJlZHVjZShmdW5jdGlvbiAoc3VtLCBjdXJyZW50SXRlbSkge1xyXG4gICAgICAgICAgICByZXR1cm4gc3VtICsgKCtjdXJyZW50SXRlbS5kYXRhc2V0LnByaWNlKTtcclxuICAgICAgICB9LCAwKTtcclxuICAgIHZhciBkaXNwbGF5U3VtQ2VsbCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoY2VsbCk7XHJcbiAgICBkaXNwbGF5U3VtQ2VsbC5kYXRhc2V0LnByaWNlID0gc3VtO1xyXG4gICAgZGlzcGxheVN1bUNlbGwuaW5uZXJIVE1MID0gc3VtO1xyXG59O1xyXG5cclxuVGFibGUucHJvdG90eXBlLmluZ3JhZGllbnRzT3B0aW9ucyA9IGZ1bmN0aW9uICgpIHtcclxuICAvL3ZhciBzYWxhbWlJdGVtID0ge1xyXG4gIC8vICAgIHBsdXM6ZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmluZ3JlZGllbnRzLWl0ZW0uc2FsYW1pIC5wbHVzJyksXHJcbiAgLy8gICAgbWludXM6IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5pbmdyZWRpZW50cy1pdGVtLnNhbGFtaSAubWludXMnKSxcclxuICAvLyAgICBpbnB1dDogZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmluZ3JlZGllbnRzLWl0ZW0uc2FsYW1pIGlucHV0JylcclxuICAvL307XHJcbiAgLy8gIHZhciBpdGVtc0FyciA9IFtdO1xyXG4gIC8vICB2YXIgc2FsYW1pSXRlbSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuaW5ncmVkaWVudHMtaXRlbS5zYWxhbWlcIiksXHJcbiAgLy8gICAgICBzYWxhbWlJdGVtSW5wdXQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmluZ3JlZGllbnRzLWl0ZW0uc2FsYW1pIC5pbnB1dFwiKSxcclxuICAvLyAgICAgIHRvbWF0b0l0ZW0gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmluZ3JlZGllbnRzLWl0ZW0udG9tYXRvXCIpLFxyXG4gIC8vICAgICAgdG9tYXRvSXRlbUlucHV0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5pbmdyZWRpZW50cy1pdGVtLnRvbWF0byAuaW5wdXRcIiksXHJcbiAgLy8gICAgICBiYWNvbkl0ZW0gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmluZ3JlZGllbnRzLWl0ZW0uYmFjb25cIiksXHJcbiAgLy8gICAgICBiYWNvbkl0ZW1JbnB1dCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuaW5ncmVkaWVudHMtaXRlbS5iYWNvbiAuaW5wdXRcIiksXHJcbiAgLy8gICAgICBjaGVlemVJdGVtID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5pbmdyZWRpZW50cy1pdGVtLmNoZWV6ZVwiKSxcclxuICAvLyAgICAgIGNoZWV6ZUl0ZW1JbnB1dCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuaW5ncmVkaWVudHMtaXRlbS5jaGVlemUgLmlucHV0XCIpLFxyXG4gIC8vICAgICAgZ3JlZW5JdGVtID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5pbmdyZWRpZW50cy1pdGVtLmdyZWVuXCIpLFxyXG4gIC8vICAgICAgZ3JlZW5JdGVtSW5wdXQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmluZ3JlZGllbnRzLWl0ZW0uZ3JlZW4gLmlucHV0XCIpO1xyXG4gICAgZnVuY3Rpb24gY2xpY2tBY3Rpb25IYW5kbGVyKGV2ZW50KXtcclxuICAgICAgICB2YXIgdGFyZ2V0ID0gZXZlbnQudGFyZ2V0O1xyXG4gICAgICAgIGlmKHRhcmdldC5jbGFzc0xpc3QuY29udGFpbnMoXCJwbHVzXCIpKXtcclxuICAgICAgICAgICAgdGFyZ2V0Lm5leHRFbGVtZW50U2libGluZy52YWx1ZSsrO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZih0YXJnZXQuY2xhc3NMaXN0LmNvbnRhaW5zKFwibWludXNcIikpe1xyXG4gICAgICAgICAgICB0YXJnZXQucHJldmlvdXNFbGVtZW50U2libGluZy52YWx1ZS0tO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5pbmdyZWRpZW50cycpLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJyxjbGlja0FjdGlvbkhhbmRsZXIpO1xyXG59O1xyXG5cclxuXHJcblRhYmxlLnByb3RvdHlwZS51cGRhdGVJdGVtQ29zdCA9IGZ1bmN0aW9uICgpIHtcclxuICAgIHZhciBfc2VsZiA9IHRoaXM7XHJcblxyXG4gICAgZnVuY3Rpb24gbGlzdEhhbmRsZXIoZXZlbnQpIHtcclxuICAgICAgICBmdW5jdGlvbiBnZXRSYW5kb20obWluLCBtYXgpIHtcclxuICAgICAgICAgICAgcmV0dXJuIE1hdGgucm91bmQoTWF0aC5yYW5kb20oKSAqIChtYXggLSBtaW4pICsgbWluKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgdmFyIHRhcmdldCA9IGV2ZW50LnRhcmdldDtcclxuICAgICAgICBpZiAodGFyZ2V0LnRhZ05hbWUgPT0gJ0lNRycpIHtcclxuICAgICAgICAgICAgdmFyIHNyYyA9IHRhcmdldC5nZXRBdHRyaWJ1dGUoJ3NyYycpO1xyXG4gICAgICAgICAgICB2YXIgbmV3SW1nID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaW1nJyk7XHJcbiAgICAgICAgICAgIG5ld0ltZy5zcmMgPSBzcmM7XHJcbiAgICAgICAgICAgIG5ld0ltZy5zdHlsZS50b3AgPSBnZXRSYW5kb20oMjUsIDI0MCkgKyBcInB4XCI7XHJcbiAgICAgICAgICAgIG5ld0ltZy5zdHlsZS5sZWZ0ID0gZ2V0UmFuZG9tKDI1LCAyNDApICsgXCJweFwiO1xyXG4gICAgICAgICAgICBuZXdJbWcuY2xhc3NMaXN0LmFkZCgnaW5ncmVkaWVudCcpO1xyXG4gICAgICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcucGl6emEtaXRlbS5hY3RpdmUnKS5hcHBlbmRDaGlsZChuZXdJbWcpO1xyXG4gICAgICAgICAgICB2YXIgbmFtZSA9IHRhcmdldC5wYXJlbnROb2RlLmRhdGFzZXQubmFtZTtcclxuICAgICAgICAgICAgY29uc29sZS5sb2cobmFtZSk7XHJcbiAgICAgICAgICAgIHZhciBpbnB1dCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5pbmdyZWRpZW50cy1pdGVtJysnLicrbmFtZSsnIC5pbnB1dCcpO1xyXG4gICAgICAgICAgICBpbnB1dC52YWx1ZSsrO1xyXG4gICAgICAgIH1cclxuICAgICAgICB2YXIgbGkgPSB0YXJnZXQuY2xvc2VzdCgnbGknKTtcclxuICAgICAgICBpZiAoIV9zZWxmLmluZ3JMaXN0LmNvbnRhaW5zKGxpKSkge1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHZhciBjb3N0ID0gcGFyc2VJbnQodGFyZ2V0LnBhcmVudE5vZGUuZGF0YXNldC5wcmljZSksXHJcbiAgICAgICAgICAgIGN1cnJlbnRUb3RhbENvc3QgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmJhc2tldCAuc2VsZWN0ZWQgLnRvdGFsXCIpO1xyXG4gICAgICAgIGlmIChjdXJyZW50VG90YWxDb3N0KSB7XHJcbiAgICAgICAgICAgIGN1cnJlbnRUb3RhbENvc3QuZGF0YXNldC5wcmljZSA9IHBhcnNlSW50KGN1cnJlbnRUb3RhbENvc3QuZGF0YXNldC5wcmljZSkgKyBjb3N0O1xyXG4gICAgICAgICAgICBjdXJyZW50VG90YWxDb3N0LmlubmVySFRNTCA9IGN1cnJlbnRUb3RhbENvc3QuZGF0YXNldC5wcmljZTtcclxuICAgICAgICAgICAgX3NlbGYuc3VtUHJpY2UoJy50b3RhbCcsICcuc3VtLXByaWNlJyk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHRoaXMuaW5nckxpc3QuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBsaXN0SGFuZGxlcik7XHJcbn07XHJcblxyXG5UYWJsZS5wcm90b3R5cGUuY2hlY2tDdXJyZW50SW5kZXggPSBmdW5jdGlvbiAoKSB7XHJcbiAgICB2YXIgaXRlbXNBcnJheSA9IFtdLnNsaWNlLmNhbGwoZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChcIi5vcmRlcnMgdHIgLnNlbGVjdC1udW1cIikpLFxyXG4gICAgICAgIHBpenphc0FycmF5ID0gW10uc2xpY2UuY2FsbChkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKFwiLnBpenphLWluZGV4XCIpKSxcclxuICAgICAgICBpLFxyXG4gICAgICAgIGs7XHJcbiAgICBmb3IgKGkgPSAwOyBpIDwgaXRlbXNBcnJheS5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgIGl0ZW1zQXJyYXlbaV0uaW5uZXJIVE1MID0gaSArIDE7XHJcbiAgICB9XHJcbiAgICBmb3IgKGsgPSAwOyBrIDwgcGl6emFzQXJyYXkubGVuZ3RoOyBrKyspIHtcclxuICAgICAgICBwaXp6YXNBcnJheVtrXS5pbm5lckhUTUwgPSBrICsgMTtcclxuICAgIH1cclxufTtcclxuXHJcblRhYmxlLnByb3RvdHlwZS51cGRhdGVJdGVtQ291bnQgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICB2YXIgaXRlbXNBcnJheSA9IFtdLnNsaWNlLmNhbGwoZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChcIi5vcmRlcnMgdHIgLnNlbGVjdC1udW1cIikpO1xyXG4gICAgdGhpcy5pdGVtQ291bnQuaW5uZXJIVE1MID0gaXRlbXNBcnJheS5sZW5ndGg7XHJcbn07XHJcblxyXG52YXIgdGFibGUgPSBuZXcgVGFibGUoJy5hZGQtcGl6emEnLCAnLmJhc2tldCB0Ym9keScsICcubnVtJywgJy5zZWxlY3QtbnVtJywgJy5pbmdyZWRpZW50cy1saXN0JywgJy50b3RhbCcsICcubGlzdCcsICcucGl6emEtaXRlbScpO1xyXG50YWJsZS5jaGVja0N1cnJlbnRJbmRleCgpO1xyXG50YWJsZS5yZW5kZXJSb3coKTtcclxudGFibGUucmVtb3ZlSXRlbSgpO1xyXG50YWJsZS51cGRhdGVJdGVtQ291bnQoKTtcclxudGFibGUudXBkYXRlSXRlbUNvc3QoKTtcclxudGFibGUuc2V0Q3VycmVudEl0ZW0oKTtcclxudGFibGUuc3VtUHJpY2UoJy50b3RhbCcsICcuc3VtLXByaWNlJyk7XHJcbnRhYmxlLmluZ3JhZGllbnRzT3B0aW9ucygpO1xyXG52YXIgcGl6emFCdWlsZGVyID0gbmV3IFBpenphQnVpbGRlcigpO1xyXG5waXp6YUJ1aWxkZXIucmVuZGVyU2lkZWJhcignLmluZ3JlZGllbnRzLWxpc3QnLCAncHVibGljL2NvbmZpZy5qc29uJyk7XHJcblxyXG4iXX0=
