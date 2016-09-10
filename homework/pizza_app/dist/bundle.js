(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
function PizzaBuilder(pizzaList) {
    this.dataObj = null;
    this.data = null;
    this.pizzaList = document.querySelector(pizzaList);
}

PizzaBuilder.prototype.renderSidebar = function (list, data) {
    var _self = this;
    this.list = document.querySelector(list);
    function renderSidebar(SelectedList, parsedData) {
        this.dataObj = parsedData['data'];
        var dataObj = this.dataObj;
        for (var i = 1; i < this.dataObj.length; i++) {
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
    PizzaBuilder.apply(this, arguments);
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
            var newRow = document.createElement('tr');
            var rowTemplate = `
                           <td class="num">
                               <button class="select-num">${ _self.currentIndex }</button>
                               </td>
                               <td class="ingredients">
            <div class="ingredients-item salami" data-type="salami" data-price="3">
              <span class="name">Salami <img src="images/salami.svg" alt=""></span>
              <button class="plus">+</button>
              <input type='number' min="0" class="input">
              <button class="minus">-</button>
            </div>
            <div class="ingredients-item tomato" data-type="tomato" data-price="2">
              <span class="name">tomato <img src="images/tomato.svg" alt=""></span>
              <button class="plus">+</button>
              <input type='number' min="0" class="input">
              <button class="minus">-</button>
            </div>
            <div class="ingredients-item bacon" data-type="bacon" data-price="4">
              <span class="name">bacon <img src="images/bacon.svg" alt=""></span>
              <button class="plus">+</button>
              <input type='number' class="input">
              <button class="minus">-</button>
            </div>
            <div class="ingredients-item cheeze" data-type="cheeze" data-price="3">
              <span class="name">cheeze <img src="images/cheeze.svg" alt=""></span>
              <button class="plus">+</button>
              <input type='number' min="0" class="input">
              <button class="minus">-</button>
            </div>
            <div class="ingredients-item green" data-type="green" data-price="1">
              <span class="name">green <img src="images/green.svg" alt=""></span>
              <button class="plus">+</button>
              <input type='number' min="0" class="input">
              <button class="minus">-</button>
            </div>
          </td>
                               <td class="total" data-price="40">40</td>
                               <td>
                               <button class="remove">x</button>
                           </td>
                           `;
            var pizzaTemplate = `
                <li class="pizza-item">
                    <span class="pizza-index">${ _self.currentIndex }</span>
                    <img src="images/pizza.svg" width="300" height="300" alt="" title="">
                </li>
            `;
            newRow.innerHTML = rowTemplate;
            _self.basket.appendChild(newRow);
            _self.pizzaList.innerHTML += pizzaTemplate;
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
            if (removeRow.classList.contains('selected')) {
                _self.basket.children[parseInt(currentIndex) - 1].classList.add('selected');
            }
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

Table.prototype.updateItemCost = function () {
    var _self = this;

    function listHandler(event) {
        function getRandom(min, max) {
            return Math.round(Math.random() * (max - min) + min);
        }

        var target = event.target;
        if (target.tagName == 'UL') {
            return;
        }
        if (target.closest('li')) {
            var targetLI = target.parentNode.dataset.name;
        }
        if (target.tagName == 'IMG') {
            var src = target.getAttribute('src');
            var newImg = document.createElement('img');
            newImg.src = src;
            newImg.style.top = getRandom(25, 240) + "px";
            newImg.style.left = getRandom(25, 240) + "px";
            newImg.classList.add('ingredient');
            newImg.classList.add(targetLI);
            document.querySelector('.pizza-item.active').appendChild(newImg);
            var name = target.parentNode.dataset.name;
            var input = document.querySelector('.selected .ingredients-item' + '.' + name + ' .input');
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

Table.prototype.setActiveFirst = function (pizza, row) {
    var pizzaActive = document.querySelectorAll(pizza),
        rowActive = document.querySelectorAll(row);
    pizzaActive[0].classList.add('active');
    rowActive[0].classList.add('selected');
};

Table.prototype.ingradientsOptions = function () {
    var _self = this;

    function clickActionHandler(event) {
        function getRandom(min, max) {
            return Math.round(Math.random() * (max - min) + min);
        }

        var target = event.target;
        if (target.closest('.selected')) {
            var type = target.closest('.ingredients-item').dataset.type;
            var price = parseInt(target.closest('.ingredients-item').dataset.price),
                currentPrice = target.closest('.ingredients-item .total'),
                sumPrice = document.querySelector('.sum-price');
            var elementTotalPrice = document.querySelector('.orders .selected .total');
            if (target.classList.contains("plus")) {
                target.nextElementSibling.value++;
                var newImg = document.createElement('img');
                newImg.src = 'images/' + type + '.svg';
                newImg.style.top = getRandom(25, 240) + "px";
                newImg.style.left = getRandom(25, 240) + "px";
                newImg.classList.add('ingredient');
                newImg.classList.add(type);
                document.querySelector('.pizza-item.active').appendChild(newImg);
                elementTotalPrice.dataset.price = price + parseInt(elementTotalPrice.dataset.price);
                sumPrice.dataset.price = parseInt(sumPrice.dataset.price) + price;
                sumPrice.innerHTML = sumPrice.dataset.price;
                elementTotalPrice.innerHTML = elementTotalPrice.dataset.price;
            }

            if (target.classList.contains("minus")) {
                if (target.previousElementSibling.value == 0) {
                    return;
                }

                target.previousElementSibling.value--;
                var removed = document.querySelectorAll(`.pizza-item.active .ingredient.${ type }`);
                document.querySelector('.pizza-item.active').removeChild(removed[removed.length - 1]);
                elementTotalPrice.dataset.price = parseInt(elementTotalPrice.dataset.price) - price;
                sumPrice.dataset.price = parseInt(sumPrice.dataset.price) - price;
                sumPrice.innerHTML = sumPrice.dataset.price;
                elementTotalPrice.innerHTML = elementTotalPrice.dataset.price;
            }

            if (target.classList.contains("input")) {
                console.log(1);
            }
        }
    }

    var timeout = null;

    function inputActionHandler(event) {
        function getRandom(min, max) {
            return Math.round(Math.random() * (max - min) + min);
        }

        var target = event.target;
        if (target.closest('.selected')) {
            var _self = this;
            if (timeout !== null) {
                clearTimeout(timeout);
            }
            timeout = setTimeout(function () {
                var type = target.closest('.ingredients-item').dataset.type,
                    price = parseInt(target.closest('.ingredients-item').dataset.price),
                    elementTotalPrice = document.querySelector('.orders .selected .total'),
                    sumPrice = document.querySelector('.sum-price');
                if (target.classList.contains("input")) {
                    var timeoutValue = target.value;

                    function removeElement(element) {
                        element && element.parentNode && element.parentNode.removeChild(element);
                    }

                    var removeArr = document.querySelectorAll('.pizza-item.active .ingredient' + '.' + type);
                    for (var h = 0; h < removeArr.length; h++) {
                        removeElement(removeArr[h]);
                    }

                    elementTotalPrice.dataset.price = parseInt(elementTotalPrice.dataset.price) - price * removeArr.length;
                    sumPrice.dataset.price = parseInt(sumPrice.dataset.price) - price * removeArr.length;
                    for (var k = 0; k < timeoutValue; k++) {
                        var newImg = document.createElement('img');
                        newImg.src = 'images/' + type + '.svg';
                        newImg.style.top = getRandom(25, 240) + "px";
                        newImg.style.left = getRandom(25, 240) + "px";
                        newImg.classList.add('ingredient');
                        newImg.classList.add(type);
                        document.querySelector('.pizza-item.active').appendChild(newImg);
                        elementTotalPrice.dataset.price = price + parseInt(elementTotalPrice.dataset.price);
                        elementTotalPrice.innerHTML = elementTotalPrice.dataset.price;
                        sumPrice.dataset.price = parseInt(sumPrice.dataset.price) + price;
                        sumPrice.innerHTML = sumPrice.dataset.price;
                    }
                }
            }, 800);
        }
    }

    document.querySelector('.orders').addEventListener('click', clickActionHandler);
    document.querySelector('.orders').addEventListener('input', inputActionHandler);
};

var table = new Table('.add-pizza', '.basket tbody', '.num', '.select-num', '.ingredients-list', '.total', '.list', '.pizza-item');
table.checkCurrentIndex();
table.setActiveFirst('.pizza-item', '.orders tr');
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJzcmNcXGluZGV4LmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FDQUEsU0FBUyxZQUFULENBQXNCLFNBQXRCLEVBQWlDO0FBQzdCLFNBQUssT0FBTCxHQUFlLElBQWY7QUFDQSxTQUFLLElBQUwsR0FBWSxJQUFaO0FBQ0EsU0FBSyxTQUFMLEdBQWlCLFNBQVMsYUFBVCxDQUF1QixTQUF2QixDQUFqQjtBQUNIOztBQUVELGFBQWEsU0FBYixDQUF1QixhQUF2QixHQUF1QyxVQUFVLElBQVYsRUFBZ0IsSUFBaEIsRUFBc0I7QUFDekQsUUFBSSxRQUFRLElBQVo7QUFDQSxTQUFLLElBQUwsR0FBWSxTQUFTLGFBQVQsQ0FBdUIsSUFBdkIsQ0FBWjtBQUNBLGFBQVMsYUFBVCxDQUF1QixZQUF2QixFQUFxQyxVQUFyQyxFQUFpRDtBQUM3QyxhQUFLLE9BQUwsR0FBZSxXQUFXLE1BQVgsQ0FBZjtBQUNBLFlBQUksVUFBVSxLQUFLLE9BQW5CO0FBQ0EsYUFBSyxJQUFJLElBQUksQ0FBYixFQUFnQixJQUFJLEtBQUssT0FBTCxDQUFhLE1BQWpDLEVBQXlDLEdBQXpDLEVBQThDO0FBQzFDLGdCQUFJLFdBQVk7NkJBQUEsQ0FDQyxRQUFRLENBQVIsRUFBVyxJQUFLLG1CQUFnQixRQUFRLENBQVIsRUFBVyxLQUFNLGlCQUFjLFFBQVEsQ0FBUixFQUFXLEdBQUk7a0JBRC9GO0FBR0EseUJBQWEsU0FBYixJQUEwQixRQUExQjtBQUNIO0FBQ0o7O0FBRUQsUUFBSSxNQUFNLElBQUksY0FBSixFQUFWO0FBQ0EsUUFBSSxJQUFKLENBQVMsS0FBVCxFQUFnQixJQUFoQixFQUFzQixJQUF0QjtBQUNBLFFBQUksa0JBQUosR0FBeUIsTUFBSztBQUMxQixZQUFJLElBQUksVUFBSixJQUFrQixDQUFsQixJQUF1QixJQUFJLE1BQUosSUFBYyxHQUF6QyxFQUE4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QU47QUFDQSxNQUFNLGNBQU4sQ0FBcUIsYUFBckIsRUFBb0MsWUFBcEM7QUFDQSxNQUFNLFNBQU47QUFDQSxNQUFNLFVBQU47QUFDQSxNQUFNLGVBQU47QUFDQSxNQUFNLGNBQU47QUFDQSxNQUFNLGNBQU47QUFDQSxNQUFNLFFBQU4sQ0FBZSxRQUFmLEVBQXlCLFlBQXpCO0FBQ0EsTUFBTSxrQkFBTjtBQUNBLElBQUksZUFBZSxJQUFJLFlBQUosRUFBbkI7QUFDQSxhQUFhLGFBQWIsQ0FBMkIsbUJBQTNCLEVBQWdELG9CQUFoRCIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiLCJmdW5jdGlvbiBQaXp6YUJ1aWxkZXIocGl6emFMaXN0KSB7XHJcbiAgICB0aGlzLmRhdGFPYmogPSBudWxsO1xyXG4gICAgdGhpcy5kYXRhID0gbnVsbDtcclxuICAgIHRoaXMucGl6emFMaXN0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihwaXp6YUxpc3QpO1xyXG59XHJcblxyXG5QaXp6YUJ1aWxkZXIucHJvdG90eXBlLnJlbmRlclNpZGViYXIgPSBmdW5jdGlvbiAobGlzdCwgZGF0YSkge1xyXG4gICAgdmFyIF9zZWxmID0gdGhpcztcclxuICAgIHRoaXMubGlzdCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IobGlzdCk7XHJcbiAgICBmdW5jdGlvbiByZW5kZXJTaWRlYmFyKFNlbGVjdGVkTGlzdCwgcGFyc2VkRGF0YSkge1xyXG4gICAgICAgIHRoaXMuZGF0YU9iaiA9IHBhcnNlZERhdGFbJ2RhdGEnXTtcclxuICAgICAgICB2YXIgZGF0YU9iaiA9IHRoaXMuZGF0YU9iajtcclxuICAgICAgICBmb3IgKHZhciBpID0gMTsgaSA8IHRoaXMuZGF0YU9iai5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICB2YXIgdGVtcGxhdGUgPSBgXHJcbiAgICAgICAgICAgIDxsaSBkYXRhLW5hbWU9XCIke2RhdGFPYmpbaV0ubmFtZX1cIiBkYXRhLXByaWNlPVwiJHtkYXRhT2JqW2ldLnByaWNlfVwiPjxpbWcgc3JjPVwiJHtkYXRhT2JqW2ldLnNyY31cIj5cclxuICAgICAgICAgICAgPC9saT5gO1xyXG4gICAgICAgICAgICBTZWxlY3RlZExpc3QuaW5uZXJIVE1MICs9IHRlbXBsYXRlO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICB2YXIgeGhyID0gbmV3IFhNTEh0dHBSZXF1ZXN0KCk7XHJcbiAgICB4aHIub3BlbihcIkdFVFwiLCBkYXRhLCB0cnVlKTtcclxuICAgIHhoci5vbnJlYWR5c3RhdGVjaGFuZ2UgPSAoKT0+IHtcclxuICAgICAgICBpZiAoeGhyLnJlYWR5U3RhdGUgPT0gNCAmJiB4aHIuc3RhdHVzID09IDIwMCkge1xyXG4gICAgICAgICAgICB0aGlzLmRhdGEgPSBKU09OLnBhcnNlKHhoci5yZXNwb25zZVRleHQpO1xyXG4gICAgICAgICAgICByZW5kZXJTaWRlYmFyKHRoaXMubGlzdCwgdGhpcy5kYXRhKTtcclxuICAgICAgICB9XHJcbiAgICB9O1xyXG4gICAgeGhyLnNlbmQoKTtcclxufTtcclxuXHJcbmZ1bmN0aW9uIFRhYmxlKGFkZEJ0biwgYmFza2V0LCBpdGVtQ291bnQsIG51bUJ0biwgaW5nckxpc3QsIHRvdGFsQ2VsbCwgcGl6emFMaXN0LCBwaXp6YUxpc3RJdGVtKSB7XHJcbiAgICBQaXp6YUJ1aWxkZXIuYXBwbHkodGhpcywgYXJndW1lbnRzKTtcclxuICAgIHRoaXMuYWRkQnRuID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihhZGRCdG4pO1xyXG4gICAgdGhpcy5iYXNrZXQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKGJhc2tldCk7XHJcbiAgICB0aGlzLml0ZW1Db3VudCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoaXRlbUNvdW50KTtcclxuICAgIHRoaXMubnVtQnRuID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihudW1CdG4pO1xyXG4gICAgdGhpcy5pbmdyTGlzdCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoaW5nckxpc3QpO1xyXG4gICAgdGhpcy50b3RhbENlbGwgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKHRvdGFsQ2VsbCk7XHJcbiAgICB0aGlzLmN1cnJlbnRJbmRleCA9IDI7XHJcbiAgICB0aGlzLnBpenphTGlzdCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IocGl6emFMaXN0KTtcclxuICAgIHRoaXMucGl6emFMaXN0SXRlbSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IocGl6emFMaXN0SXRlbSk7XHJcbiAgICAvL3RoaXMuc2FsYW1pSXRlbSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuaW5ncmVkaWVudHMtaXRlbS5zYWxhbWlcIik7XHJcbiAgICAvL3RoaXMuc2FsYW1pSXRlbUlucHV0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5pbmdyZWRpZW50cy1pdGVtLnNhbGFtaSAuaW5wdXRcIik7XHJcbiAgICAvL3RoaXMudG9tYXRvSXRlbSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuaW5ncmVkaWVudHMtaXRlbS50b21hdG9cIik7XHJcbiAgICAvL3RoaXMudG9tYXRvSXRlbUlucHV0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5pbmdyZWRpZW50cy1pdGVtLnRvbWF0byAuaW5wdXRcIik7XHJcbiAgICAvL3RoaXMuYmFjb25JdGVtID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5pbmdyZWRpZW50cy1pdGVtLmJhY29uXCIpO1xyXG4gICAgLy90aGlzLmJhY29uSXRlbUlucHV0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5pbmdyZWRpZW50cy1pdGVtLmJhY29uIC5pbnB1dFwiKTtcclxuICAgIC8vdGhpcy5jaGVlemVJdGVtID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5pbmdyZWRpZW50cy1pdGVtLmNoZWV6ZVwiKTtcclxuICAgIC8vdGhpcy5jaGVlemVJdGVtSW5wdXQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmluZ3JlZGllbnRzLWl0ZW0uY2hlZXplIC5pbnB1dFwiKTtcclxuICAgIC8vdGhpcy5ncmVlbkl0ZW0gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmluZ3JlZGllbnRzLWl0ZW0uZ3JlZW5cIik7XHJcbiAgICAvL3RoaXMuZ3JlZW5JdGVtSW5wdXQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmluZ3JlZGllbnRzLWl0ZW0uZ3JlZW4gLmlucHV0XCIpO1xyXG59XHJcblxyXG5UYWJsZS5wcm90b3R5cGUucmVuZGVyUm93ID0gZnVuY3Rpb24gKCkge1xyXG4gICAgdmFyIF9zZWxmID0gdGhpcztcclxuXHJcbiAgICBmdW5jdGlvbiByZW5kZXJSb3dIYW5kbGVyKCkge1xyXG4gICAgICAgIHJldHVybiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIHZhciBuZXdSb3cgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCd0cicpO1xyXG4gICAgICAgICAgICB2YXIgcm93VGVtcGxhdGUgPSBgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgIDx0ZCBjbGFzcz1cIm51bVwiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGJ1dHRvbiBjbGFzcz1cInNlbGVjdC1udW1cIj4ke19zZWxmLmN1cnJlbnRJbmRleH08L2J1dHRvbj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvdGQ+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8dGQgY2xhc3M9XCJpbmdyZWRpZW50c1wiPlxyXG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVwiaW5ncmVkaWVudHMtaXRlbSBzYWxhbWlcIiBkYXRhLXR5cGU9XCJzYWxhbWlcIiBkYXRhLXByaWNlPVwiM1wiPlxyXG4gICAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwibmFtZVwiPlNhbGFtaSA8aW1nIHNyYz1cImltYWdlcy9zYWxhbWkuc3ZnXCIgYWx0PVwiXCI+PC9zcGFuPlxyXG4gICAgICAgICAgICAgIDxidXR0b24gY2xhc3M9XCJwbHVzXCI+KzwvYnV0dG9uPlxyXG4gICAgICAgICAgICAgIDxpbnB1dCB0eXBlPSdudW1iZXInIG1pbj1cIjBcIiBjbGFzcz1cImlucHV0XCI+XHJcbiAgICAgICAgICAgICAgPGJ1dHRvbiBjbGFzcz1cIm1pbnVzXCI+LTwvYnV0dG9uPlxyXG4gICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cImluZ3JlZGllbnRzLWl0ZW0gdG9tYXRvXCIgZGF0YS10eXBlPVwidG9tYXRvXCIgZGF0YS1wcmljZT1cIjJcIj5cclxuICAgICAgICAgICAgICA8c3BhbiBjbGFzcz1cIm5hbWVcIj50b21hdG8gPGltZyBzcmM9XCJpbWFnZXMvdG9tYXRvLnN2Z1wiIGFsdD1cIlwiPjwvc3Bhbj5cclxuICAgICAgICAgICAgICA8YnV0dG9uIGNsYXNzPVwicGx1c1wiPis8L2J1dHRvbj5cclxuICAgICAgICAgICAgICA8aW5wdXQgdHlwZT0nbnVtYmVyJyBtaW49XCIwXCIgY2xhc3M9XCJpbnB1dFwiPlxyXG4gICAgICAgICAgICAgIDxidXR0b24gY2xhc3M9XCJtaW51c1wiPi08L2J1dHRvbj5cclxuICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJpbmdyZWRpZW50cy1pdGVtIGJhY29uXCIgZGF0YS10eXBlPVwiYmFjb25cIiBkYXRhLXByaWNlPVwiNFwiPlxyXG4gICAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwibmFtZVwiPmJhY29uIDxpbWcgc3JjPVwiaW1hZ2VzL2JhY29uLnN2Z1wiIGFsdD1cIlwiPjwvc3Bhbj5cclxuICAgICAgICAgICAgICA8YnV0dG9uIGNsYXNzPVwicGx1c1wiPis8L2J1dHRvbj5cclxuICAgICAgICAgICAgICA8aW5wdXQgdHlwZT0nbnVtYmVyJyBjbGFzcz1cImlucHV0XCI+XHJcbiAgICAgICAgICAgICAgPGJ1dHRvbiBjbGFzcz1cIm1pbnVzXCI+LTwvYnV0dG9uPlxyXG4gICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cImluZ3JlZGllbnRzLWl0ZW0gY2hlZXplXCIgZGF0YS10eXBlPVwiY2hlZXplXCIgZGF0YS1wcmljZT1cIjNcIj5cclxuICAgICAgICAgICAgICA8c3BhbiBjbGFzcz1cIm5hbWVcIj5jaGVlemUgPGltZyBzcmM9XCJpbWFnZXMvY2hlZXplLnN2Z1wiIGFsdD1cIlwiPjwvc3Bhbj5cclxuICAgICAgICAgICAgICA8YnV0dG9uIGNsYXNzPVwicGx1c1wiPis8L2J1dHRvbj5cclxuICAgICAgICAgICAgICA8aW5wdXQgdHlwZT0nbnVtYmVyJyBtaW49XCIwXCIgY2xhc3M9XCJpbnB1dFwiPlxyXG4gICAgICAgICAgICAgIDxidXR0b24gY2xhc3M9XCJtaW51c1wiPi08L2J1dHRvbj5cclxuICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJpbmdyZWRpZW50cy1pdGVtIGdyZWVuXCIgZGF0YS10eXBlPVwiZ3JlZW5cIiBkYXRhLXByaWNlPVwiMVwiPlxyXG4gICAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwibmFtZVwiPmdyZWVuIDxpbWcgc3JjPVwiaW1hZ2VzL2dyZWVuLnN2Z1wiIGFsdD1cIlwiPjwvc3Bhbj5cclxuICAgICAgICAgICAgICA8YnV0dG9uIGNsYXNzPVwicGx1c1wiPis8L2J1dHRvbj5cclxuICAgICAgICAgICAgICA8aW5wdXQgdHlwZT0nbnVtYmVyJyBtaW49XCIwXCIgY2xhc3M9XCJpbnB1dFwiPlxyXG4gICAgICAgICAgICAgIDxidXR0b24gY2xhc3M9XCJtaW51c1wiPi08L2J1dHRvbj5cclxuICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICA8L3RkPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHRkIGNsYXNzPVwidG90YWxcIiBkYXRhLXByaWNlPVwiNDBcIj40MDwvdGQ+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8dGQ+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8YnV0dG9uIGNsYXNzPVwicmVtb3ZlXCI+eDwvYnV0dG9uPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICA8L3RkPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICBgO1xyXG4gICAgICAgICAgICB2YXIgcGl6emFUZW1wbGF0ZSA9IGBcclxuICAgICAgICAgICAgICAgIDxsaSBjbGFzcz1cInBpenphLWl0ZW1cIj5cclxuICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzcz1cInBpenphLWluZGV4XCI+JHtfc2VsZi5jdXJyZW50SW5kZXh9PC9zcGFuPlxyXG4gICAgICAgICAgICAgICAgICAgIDxpbWcgc3JjPVwiaW1hZ2VzL3BpenphLnN2Z1wiIHdpZHRoPVwiMzAwXCIgaGVpZ2h0PVwiMzAwXCIgYWx0PVwiXCIgdGl0bGU9XCJcIj5cclxuICAgICAgICAgICAgICAgIDwvbGk+XHJcbiAgICAgICAgICAgIGA7XHJcbiAgICAgICAgICAgIG5ld1Jvdy5pbm5lckhUTUwgPSByb3dUZW1wbGF0ZTtcclxuICAgICAgICAgICAgX3NlbGYuYmFza2V0LmFwcGVuZENoaWxkKG5ld1Jvdyk7XHJcbiAgICAgICAgICAgIF9zZWxmLnBpenphTGlzdC5pbm5lckhUTUwgKz0gcGl6emFUZW1wbGF0ZTtcclxuICAgICAgICAgICAgX3NlbGYuY3VycmVudEluZGV4ICs9IDE7XHJcbiAgICAgICAgICAgIF9zZWxmLmNoZWNrQ3VycmVudEluZGV4KCk7XHJcbiAgICAgICAgICAgIF9zZWxmLnVwZGF0ZUl0ZW1Db3VudCgpO1xyXG4gICAgICAgICAgICBfc2VsZi5zZXRDdXJyZW50SXRlbSgpO1xyXG4gICAgICAgICAgICBfc2VsZi5zdW1QcmljZSgnLnRvdGFsJywgJy5zdW0tcHJpY2UnKTtcclxuICAgICAgICB9O1xyXG4gICAgfVxyXG5cclxuICAgIF9zZWxmLmFkZEJ0bi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgcmVuZGVyUm93SGFuZGxlcigpKTtcclxufTtcclxuXHJcblRhYmxlLnByb3RvdHlwZS5yZW1vdmVJdGVtID0gZnVuY3Rpb24gKCkge1xyXG4gICAgdmFyIF9zZWxmID0gdGhpcztcclxuXHJcbiAgICBmdW5jdGlvbiByZW1vdmVTZWxmSGFuZGxlcihldmVudCkge1xyXG4gICAgICAgIGlmIChldmVudC50YXJnZXQuY2xhc3NOYW1lID09ICdyZW1vdmUnKSB7XHJcbiAgICAgICAgICAgIHZhciByZW1vdmVSb3cgPSBldmVudC50YXJnZXQucGFyZW50Tm9kZS5wYXJlbnROb2RlLFxyXG4gICAgICAgICAgICAgICAgbm9kZUxpc3QgPSBBcnJheS5wcm90b3R5cGUuc2xpY2UuY2FsbChfc2VsZi5iYXNrZXQuY2hpbGRyZW4pLFxyXG4gICAgICAgICAgICAgICAgY3VycmVudEluZGV4ID0gbm9kZUxpc3QuaW5kZXhPZihyZW1vdmVSb3cpO1xyXG4gICAgICAgICAgICBfc2VsZi5waXp6YUxpc3QucmVtb3ZlQ2hpbGQoZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLmxpc3QgbGknKVtjdXJyZW50SW5kZXhdKTtcclxuICAgICAgICAgICAgX3NlbGYuYmFza2V0LnJlbW92ZUNoaWxkKHJlbW92ZVJvdyk7XHJcbiAgICAgICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5saXN0Jykuc3R5bGUubWFyZ2luTGVmdCA9IC1gJHszMDAgKiAoY3VycmVudEluZGV4IC0gMSl9YCArIGBweGA7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKGN1cnJlbnRJbmRleCAtIDEpO1xyXG4gICAgICAgICAgICBfc2VsZi5jaGVja0N1cnJlbnRJbmRleCgpO1xyXG4gICAgICAgICAgICBfc2VsZi51cGRhdGVJdGVtQ291bnQoKTtcclxuICAgICAgICAgICAgX3NlbGYuc2V0Q3VycmVudEl0ZW0oKTtcclxuICAgICAgICAgICAgaWYgKHJlbW92ZVJvdy5jbGFzc0xpc3QuY29udGFpbnMoJ3NlbGVjdGVkJykpIHtcclxuICAgICAgICAgICAgICAgIF9zZWxmLmJhc2tldC5jaGlsZHJlbltwYXJzZUludChjdXJyZW50SW5kZXgpIC0gMV0uY2xhc3NMaXN0LmFkZCgnc2VsZWN0ZWQnKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBfc2VsZi5zdW1QcmljZSgnLnRvdGFsJywgJy5zdW0tcHJpY2UnKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcignYm9keScpLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgcmVtb3ZlU2VsZkhhbmRsZXIpO1xyXG59O1xyXG5cclxuVGFibGUucHJvdG90eXBlLnNldEN1cnJlbnRJdGVtID0gZnVuY3Rpb24gKCkge1xyXG4gICAgdmFyIF9zZWxmID0gdGhpcyxcclxuICAgICAgICBidG5zID0gW10uc2xpY2UuY2FsbChkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcuc2VsZWN0LW51bScpKTtcclxuXHJcbiAgICBmdW5jdGlvbiBjbGlja0hhbmRsZXIoZXZlbnQpIHtcclxuICAgICAgICB2YXIgY3VycmVudFJvdyA9IGV2ZW50LnRhcmdldC5wYXJlbnROb2RlLnBhcmVudE5vZGUsXHJcbiAgICAgICAgICAgIG5vZGVMaXN0ID0gQXJyYXkucHJvdG90eXBlLnNsaWNlLmNhbGwoX3NlbGYuYmFza2V0LmNoaWxkcmVuKSxcclxuICAgICAgICAgICAgY3VycmVudEluZGV4ID0gbm9kZUxpc3QuaW5kZXhPZihjdXJyZW50Um93KSxcclxuICAgICAgICAgICAgbGlzdCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5saXN0IC5waXp6YS1pdGVtJyk7XHJcbiAgICAgICAgZm9yICh2YXIgayA9IDA7IGsgPCBsaXN0Lmxlbmd0aDsgaysrKSB7XHJcbiAgICAgICAgICAgIGxpc3Rba10uY2xhc3NMaXN0LnJlbW92ZSgnYWN0aXZlJyk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGxpc3RbY3VycmVudEluZGV4XS5jbGFzc0xpc3QuYWRkKCdhY3RpdmUnKTtcclxuICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcubGlzdCcpLnN0eWxlLm1hcmdpbkxlZnQgPSAtYCR7MzAwICogKGN1cnJlbnRJbmRleCl9YCArIGBweGA7XHJcbiAgICAgICAgdmFyIHRyID0gW10uc2xpY2UuY2FsbChkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcuYmFza2V0IHRyJykpO1xyXG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgdHIubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgdHJbaV0uY2xhc3NMaXN0LnJlbW92ZSgnc2VsZWN0ZWQnKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5jbG9zZXN0KCd0cicpLmNsYXNzTGlzdC5hZGQoJ3NlbGVjdGVkJyk7XHJcbiAgICB9XHJcblxyXG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBidG5zLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgYnRuc1tpXS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGNsaWNrSGFuZGxlcik7XHJcbiAgICB9XHJcbn07XHJcblxyXG5UYWJsZS5wcm90b3R5cGUuc3VtUHJpY2UgPSBmdW5jdGlvbiAoc3VtQXJyLCBjZWxsKSB7XHJcbiAgICB2YXIgYXJyID0gW10uc2xpY2UuY2FsbChkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKHN1bUFycikpLFxyXG4gICAgICAgIHN1bSA9IGFyci5yZWR1Y2UoZnVuY3Rpb24gKHN1bSwgY3VycmVudEl0ZW0pIHtcclxuICAgICAgICAgICAgcmV0dXJuIHN1bSArICgrY3VycmVudEl0ZW0uZGF0YXNldC5wcmljZSk7XHJcbiAgICAgICAgfSwgMCk7XHJcbiAgICB2YXIgZGlzcGxheVN1bUNlbGwgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKGNlbGwpO1xyXG4gICAgZGlzcGxheVN1bUNlbGwuZGF0YXNldC5wcmljZSA9IHN1bTtcclxuICAgIGRpc3BsYXlTdW1DZWxsLmlubmVySFRNTCA9IHN1bTtcclxufTtcclxuXHJcblRhYmxlLnByb3RvdHlwZS51cGRhdGVJdGVtQ29zdCA9IGZ1bmN0aW9uICgpIHtcclxuICAgIHZhciBfc2VsZiA9IHRoaXM7XHJcblxyXG4gICAgZnVuY3Rpb24gbGlzdEhhbmRsZXIoZXZlbnQpIHtcclxuICAgICAgICBmdW5jdGlvbiBnZXRSYW5kb20obWluLCBtYXgpIHtcclxuICAgICAgICAgICAgcmV0dXJuIE1hdGgucm91bmQoTWF0aC5yYW5kb20oKSAqIChtYXggLSBtaW4pICsgbWluKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHZhciB0YXJnZXQgPSBldmVudC50YXJnZXQ7XHJcbiAgICAgICAgaWYgKHRhcmdldC50YWdOYW1lID09ICdVTCcpIHtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZih0YXJnZXQuY2xvc2VzdCgnbGknKSkge1xyXG4gICAgICAgICAgICB2YXIgdGFyZ2V0TEkgPSB0YXJnZXQucGFyZW50Tm9kZS5kYXRhc2V0Lm5hbWU7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmICh0YXJnZXQudGFnTmFtZSA9PSAnSU1HJykge1xyXG4gICAgICAgICAgICB2YXIgc3JjID0gdGFyZ2V0LmdldEF0dHJpYnV0ZSgnc3JjJyk7XHJcbiAgICAgICAgICAgIHZhciBuZXdJbWcgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdpbWcnKTtcclxuICAgICAgICAgICAgbmV3SW1nLnNyYyA9IHNyYztcclxuICAgICAgICAgICAgbmV3SW1nLnN0eWxlLnRvcCA9IGdldFJhbmRvbSgyNSwgMjQwKSArIFwicHhcIjtcclxuICAgICAgICAgICAgbmV3SW1nLnN0eWxlLmxlZnQgPSBnZXRSYW5kb20oMjUsIDI0MCkgKyBcInB4XCI7XHJcbiAgICAgICAgICAgIG5ld0ltZy5jbGFzc0xpc3QuYWRkKCdpbmdyZWRpZW50Jyk7XHJcbiAgICAgICAgICAgIG5ld0ltZy5jbGFzc0xpc3QuYWRkKHRhcmdldExJKTtcclxuICAgICAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnBpenphLWl0ZW0uYWN0aXZlJykuYXBwZW5kQ2hpbGQobmV3SW1nKTtcclxuICAgICAgICAgICAgdmFyIG5hbWUgPSB0YXJnZXQucGFyZW50Tm9kZS5kYXRhc2V0Lm5hbWU7XHJcbiAgICAgICAgICAgIHZhciBpbnB1dCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5zZWxlY3RlZCAuaW5ncmVkaWVudHMtaXRlbScgKyAnLicgKyBuYW1lICsgJyAuaW5wdXQnKTtcclxuICAgICAgICAgICAgaW5wdXQudmFsdWUrKztcclxuICAgICAgICB9XHJcbiAgICAgICAgdmFyIGxpID0gdGFyZ2V0LmNsb3Nlc3QoJ2xpJyk7XHJcbiAgICAgICAgaWYgKCFfc2VsZi5pbmdyTGlzdC5jb250YWlucyhsaSkpIHtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuICAgICAgICB2YXIgY29zdCA9IHBhcnNlSW50KHRhcmdldC5wYXJlbnROb2RlLmRhdGFzZXQucHJpY2UpLFxyXG4gICAgICAgICAgICBjdXJyZW50VG90YWxDb3N0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5iYXNrZXQgLnNlbGVjdGVkIC50b3RhbFwiKTtcclxuICAgICAgICBpZiAoY3VycmVudFRvdGFsQ29zdCkge1xyXG4gICAgICAgICAgICBjdXJyZW50VG90YWxDb3N0LmRhdGFzZXQucHJpY2UgPSBwYXJzZUludChjdXJyZW50VG90YWxDb3N0LmRhdGFzZXQucHJpY2UpICsgY29zdDtcclxuICAgICAgICAgICAgY3VycmVudFRvdGFsQ29zdC5pbm5lckhUTUwgPSBjdXJyZW50VG90YWxDb3N0LmRhdGFzZXQucHJpY2U7XHJcbiAgICAgICAgICAgIF9zZWxmLnN1bVByaWNlKCcudG90YWwnLCAnLnN1bS1wcmljZScpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICB0aGlzLmluZ3JMaXN0LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgbGlzdEhhbmRsZXIpO1xyXG59O1xyXG5cclxuVGFibGUucHJvdG90eXBlLmNoZWNrQ3VycmVudEluZGV4ID0gZnVuY3Rpb24gKCkge1xyXG4gICAgdmFyIGl0ZW1zQXJyYXkgPSBbXS5zbGljZS5jYWxsKGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXCIub3JkZXJzIHRyIC5zZWxlY3QtbnVtXCIpKSxcclxuICAgICAgICBwaXp6YXNBcnJheSA9IFtdLnNsaWNlLmNhbGwoZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChcIi5waXp6YS1pbmRleFwiKSksXHJcbiAgICAgICAgaSxcclxuICAgICAgICBrO1xyXG4gICAgZm9yIChpID0gMDsgaSA8IGl0ZW1zQXJyYXkubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICBpdGVtc0FycmF5W2ldLmlubmVySFRNTCA9IGkgKyAxO1xyXG4gICAgfVxyXG4gICAgZm9yIChrID0gMDsgayA8IHBpenphc0FycmF5Lmxlbmd0aDsgaysrKSB7XHJcbiAgICAgICAgcGl6emFzQXJyYXlba10uaW5uZXJIVE1MID0gayArIDE7XHJcbiAgICB9XHJcbn07XHJcblxyXG5UYWJsZS5wcm90b3R5cGUudXBkYXRlSXRlbUNvdW50ID0gZnVuY3Rpb24gKCkge1xyXG4gICAgdmFyIGl0ZW1zQXJyYXkgPSBbXS5zbGljZS5jYWxsKGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXCIub3JkZXJzIHRyIC5zZWxlY3QtbnVtXCIpKTtcclxuICAgIHRoaXMuaXRlbUNvdW50LmlubmVySFRNTCA9IGl0ZW1zQXJyYXkubGVuZ3RoO1xyXG59O1xyXG5cclxuXHJcblRhYmxlLnByb3RvdHlwZS5zZXRBY3RpdmVGaXJzdCA9IGZ1bmN0aW9uIChwaXp6YSwgcm93KSB7XHJcbiAgICB2YXIgcGl6emFBY3RpdmUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKHBpenphKSxcclxuICAgICAgICByb3dBY3RpdmUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKHJvdyk7XHJcbiAgICBwaXp6YUFjdGl2ZVswXS5jbGFzc0xpc3QuYWRkKCdhY3RpdmUnKTtcclxuICAgIHJvd0FjdGl2ZVswXS5jbGFzc0xpc3QuYWRkKCdzZWxlY3RlZCcpO1xyXG59O1xyXG5cclxuVGFibGUucHJvdG90eXBlLmluZ3JhZGllbnRzT3B0aW9ucyA9IGZ1bmN0aW9uICgpIHtcclxuICAgIHZhciBfc2VsZiA9IHRoaXM7XHJcblxyXG4gICAgZnVuY3Rpb24gY2xpY2tBY3Rpb25IYW5kbGVyKGV2ZW50KSB7XHJcbiAgICAgICAgZnVuY3Rpb24gZ2V0UmFuZG9tKG1pbiwgbWF4KSB7XHJcbiAgICAgICAgICAgIHJldHVybiBNYXRoLnJvdW5kKE1hdGgucmFuZG9tKCkgKiAobWF4IC0gbWluKSArIG1pbik7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB2YXIgdGFyZ2V0ID0gZXZlbnQudGFyZ2V0O1xyXG4gICAgICAgIGlmICh0YXJnZXQuY2xvc2VzdCgnLnNlbGVjdGVkJykpIHtcclxuICAgICAgICAgICAgdmFyIHR5cGUgPSB0YXJnZXQuY2xvc2VzdCgnLmluZ3JlZGllbnRzLWl0ZW0nKS5kYXRhc2V0LnR5cGU7XHJcbiAgICAgICAgICAgIHZhciBwcmljZSA9IHBhcnNlSW50KHRhcmdldC5jbG9zZXN0KCcuaW5ncmVkaWVudHMtaXRlbScpLmRhdGFzZXQucHJpY2UpLFxyXG4gICAgICAgICAgICAgICAgY3VycmVudFByaWNlID0gdGFyZ2V0LmNsb3Nlc3QoJy5pbmdyZWRpZW50cy1pdGVtIC50b3RhbCcpLFxyXG4gICAgICAgICAgICAgICAgc3VtUHJpY2UgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuc3VtLXByaWNlJyk7XHJcbiAgICAgICAgICAgIHZhciBlbGVtZW50VG90YWxQcmljZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5vcmRlcnMgLnNlbGVjdGVkIC50b3RhbCcpO1xyXG4gICAgICAgICAgICBpZiAodGFyZ2V0LmNsYXNzTGlzdC5jb250YWlucyhcInBsdXNcIikpIHtcclxuICAgICAgICAgICAgICAgIHRhcmdldC5uZXh0RWxlbWVudFNpYmxpbmcudmFsdWUrKztcclxuICAgICAgICAgICAgICAgIHZhciBuZXdJbWcgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdpbWcnKTtcclxuICAgICAgICAgICAgICAgIG5ld0ltZy5zcmMgPSAnaW1hZ2VzLycgKyB0eXBlICsgJy5zdmcnO1xyXG4gICAgICAgICAgICAgICAgbmV3SW1nLnN0eWxlLnRvcCA9IGdldFJhbmRvbSgyNSwgMjQwKSArIFwicHhcIjtcclxuICAgICAgICAgICAgICAgIG5ld0ltZy5zdHlsZS5sZWZ0ID0gZ2V0UmFuZG9tKDI1LCAyNDApICsgXCJweFwiO1xyXG4gICAgICAgICAgICAgICAgbmV3SW1nLmNsYXNzTGlzdC5hZGQoJ2luZ3JlZGllbnQnKTtcclxuICAgICAgICAgICAgICAgIG5ld0ltZy5jbGFzc0xpc3QuYWRkKHR5cGUpO1xyXG4gICAgICAgICAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnBpenphLWl0ZW0uYWN0aXZlJykuYXBwZW5kQ2hpbGQobmV3SW1nKTtcclxuICAgICAgICAgICAgICAgIGVsZW1lbnRUb3RhbFByaWNlLmRhdGFzZXQucHJpY2UgPSBwcmljZSArIHBhcnNlSW50KGVsZW1lbnRUb3RhbFByaWNlLmRhdGFzZXQucHJpY2UpO1xyXG4gICAgICAgICAgICAgICAgc3VtUHJpY2UuZGF0YXNldC5wcmljZSA9IHBhcnNlSW50KHN1bVByaWNlLmRhdGFzZXQucHJpY2UpICsgIHByaWNlO1xyXG4gICAgICAgICAgICAgICAgc3VtUHJpY2UuaW5uZXJIVE1MID0gc3VtUHJpY2UuZGF0YXNldC5wcmljZTtcclxuICAgICAgICAgICAgICAgIGVsZW1lbnRUb3RhbFByaWNlLmlubmVySFRNTCA9IGVsZW1lbnRUb3RhbFByaWNlLmRhdGFzZXQucHJpY2U7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGlmICh0YXJnZXQuY2xhc3NMaXN0LmNvbnRhaW5zKFwibWludXNcIikpIHtcclxuICAgICAgICAgICAgICAgIGlmICh0YXJnZXQucHJldmlvdXNFbGVtZW50U2libGluZy52YWx1ZSA9PSAwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIHRhcmdldC5wcmV2aW91c0VsZW1lbnRTaWJsaW5nLnZhbHVlLS07XHJcbiAgICAgICAgICAgICAgICB2YXIgcmVtb3ZlZCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoYC5waXp6YS1pdGVtLmFjdGl2ZSAuaW5ncmVkaWVudC4ke3R5cGV9YCk7XHJcbiAgICAgICAgICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcucGl6emEtaXRlbS5hY3RpdmUnKS5yZW1vdmVDaGlsZChyZW1vdmVkW3JlbW92ZWQubGVuZ3RoIC0gMV0pO1xyXG4gICAgICAgICAgICAgICAgZWxlbWVudFRvdGFsUHJpY2UuZGF0YXNldC5wcmljZSA9IHBhcnNlSW50KGVsZW1lbnRUb3RhbFByaWNlLmRhdGFzZXQucHJpY2UpIC0gcHJpY2U7XHJcbiAgICAgICAgICAgICAgICBzdW1QcmljZS5kYXRhc2V0LnByaWNlID0gcGFyc2VJbnQoc3VtUHJpY2UuZGF0YXNldC5wcmljZSkgLSAgcHJpY2U7XHJcbiAgICAgICAgICAgICAgICBzdW1QcmljZS5pbm5lckhUTUwgPSBzdW1QcmljZS5kYXRhc2V0LnByaWNlO1xyXG4gICAgICAgICAgICAgICAgZWxlbWVudFRvdGFsUHJpY2UuaW5uZXJIVE1MID0gZWxlbWVudFRvdGFsUHJpY2UuZGF0YXNldC5wcmljZTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgaWYgKHRhcmdldC5jbGFzc0xpc3QuY29udGFpbnMoXCJpbnB1dFwiKSkge1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coMSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgdmFyIHRpbWVvdXQgPSBudWxsO1xyXG5cclxuICAgIGZ1bmN0aW9uIGlucHV0QWN0aW9uSGFuZGxlcihldmVudCkge1xyXG4gICAgICAgIGZ1bmN0aW9uIGdldFJhbmRvbShtaW4sIG1heCkge1xyXG4gICAgICAgICAgICByZXR1cm4gTWF0aC5yb3VuZChNYXRoLnJhbmRvbSgpICogKG1heCAtIG1pbikgKyBtaW4pO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdmFyIHRhcmdldCA9IGV2ZW50LnRhcmdldDtcclxuICAgICAgICBpZiAodGFyZ2V0LmNsb3Nlc3QoJy5zZWxlY3RlZCcpKSB7XHJcbiAgICAgICAgICAgIHZhciBfc2VsZiA9IHRoaXM7XHJcbiAgICAgICAgICAgIGlmICh0aW1lb3V0ICE9PSBudWxsKSB7XHJcbiAgICAgICAgICAgICAgICBjbGVhclRpbWVvdXQodGltZW91dCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgdGltZW91dCA9IHNldFRpbWVvdXQoZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgdmFyIHR5cGUgPSB0YXJnZXQuY2xvc2VzdCgnLmluZ3JlZGllbnRzLWl0ZW0nKS5kYXRhc2V0LnR5cGUsXHJcbiAgICAgICAgICAgICAgICAgICAgcHJpY2UgPSBwYXJzZUludCh0YXJnZXQuY2xvc2VzdCgnLmluZ3JlZGllbnRzLWl0ZW0nKS5kYXRhc2V0LnByaWNlKSxcclxuICAgICAgICAgICAgICAgICAgICBlbGVtZW50VG90YWxQcmljZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5vcmRlcnMgLnNlbGVjdGVkIC50b3RhbCcpLFxyXG4gICAgICAgICAgICAgICAgICAgIHN1bVByaWNlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnN1bS1wcmljZScpO1xyXG4gICAgICAgICAgICAgICAgaWYgKHRhcmdldC5jbGFzc0xpc3QuY29udGFpbnMoXCJpbnB1dFwiKSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHZhciB0aW1lb3V0VmFsdWUgPSB0YXJnZXQudmFsdWU7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGZ1bmN0aW9uIHJlbW92ZUVsZW1lbnQoZWxlbWVudCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBlbGVtZW50ICYmIGVsZW1lbnQucGFyZW50Tm9kZSAmJiBlbGVtZW50LnBhcmVudE5vZGUucmVtb3ZlQ2hpbGQoZWxlbWVudCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICB2YXIgcmVtb3ZlQXJyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLnBpenphLWl0ZW0uYWN0aXZlIC5pbmdyZWRpZW50JyArICcuJyArIHR5cGUpO1xyXG4gICAgICAgICAgICAgICAgICAgIGZvciAodmFyIGggPSAwOyBoIDwgcmVtb3ZlQXJyLmxlbmd0aDsgaCsrKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlbW92ZUVsZW1lbnQocmVtb3ZlQXJyW2hdKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGVsZW1lbnRUb3RhbFByaWNlLmRhdGFzZXQucHJpY2UgPXBhcnNlSW50KGVsZW1lbnRUb3RhbFByaWNlLmRhdGFzZXQucHJpY2UpIC0gIHByaWNlKnJlbW92ZUFyci5sZW5ndGg7XHJcbiAgICAgICAgICAgICAgICAgICAgc3VtUHJpY2UuZGF0YXNldC5wcmljZSA9cGFyc2VJbnQoc3VtUHJpY2UuZGF0YXNldC5wcmljZSkgLSAgcHJpY2UqcmVtb3ZlQXJyLmxlbmd0aDtcclxuICAgICAgICAgICAgICAgICAgICBmb3IgKHZhciBrID0gMDsgayA8IHRpbWVvdXRWYWx1ZTsgaysrKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBuZXdJbWcgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdpbWcnKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbmV3SW1nLnNyYyA9ICdpbWFnZXMvJyArIHR5cGUgKyAnLnN2Zyc7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG5ld0ltZy5zdHlsZS50b3AgPSBnZXRSYW5kb20oMjUsIDI0MCkgKyBcInB4XCI7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG5ld0ltZy5zdHlsZS5sZWZ0ID0gZ2V0UmFuZG9tKDI1LCAyNDApICsgXCJweFwiO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBuZXdJbWcuY2xhc3NMaXN0LmFkZCgnaW5ncmVkaWVudCcpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBuZXdJbWcuY2xhc3NMaXN0LmFkZCh0eXBlKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnBpenphLWl0ZW0uYWN0aXZlJykuYXBwZW5kQ2hpbGQobmV3SW1nKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgZWxlbWVudFRvdGFsUHJpY2UuZGF0YXNldC5wcmljZSA9IHByaWNlICsgcGFyc2VJbnQoZWxlbWVudFRvdGFsUHJpY2UuZGF0YXNldC5wcmljZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGVsZW1lbnRUb3RhbFByaWNlLmlubmVySFRNTCA9IGVsZW1lbnRUb3RhbFByaWNlLmRhdGFzZXQucHJpY2U7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHN1bVByaWNlLmRhdGFzZXQucHJpY2UgPSBwYXJzZUludChzdW1QcmljZS5kYXRhc2V0LnByaWNlKSArICBwcmljZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgc3VtUHJpY2UuaW5uZXJIVE1MID0gc3VtUHJpY2UuZGF0YXNldC5wcmljZTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0sIDgwMCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5vcmRlcnMnKS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGNsaWNrQWN0aW9uSGFuZGxlcik7XHJcbiAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcub3JkZXJzJykuYWRkRXZlbnRMaXN0ZW5lcignaW5wdXQnLCBpbnB1dEFjdGlvbkhhbmRsZXIpO1xyXG59O1xyXG5cclxudmFyIHRhYmxlID0gbmV3IFRhYmxlKCcuYWRkLXBpenphJywgJy5iYXNrZXQgdGJvZHknLCAnLm51bScsICcuc2VsZWN0LW51bScsICcuaW5ncmVkaWVudHMtbGlzdCcsICcudG90YWwnLCAnLmxpc3QnLCAnLnBpenphLWl0ZW0nKTtcclxudGFibGUuY2hlY2tDdXJyZW50SW5kZXgoKTtcclxudGFibGUuc2V0QWN0aXZlRmlyc3QoJy5waXp6YS1pdGVtJywgJy5vcmRlcnMgdHInKTtcclxudGFibGUucmVuZGVyUm93KCk7XHJcbnRhYmxlLnJlbW92ZUl0ZW0oKTtcclxudGFibGUudXBkYXRlSXRlbUNvdW50KCk7XHJcbnRhYmxlLnVwZGF0ZUl0ZW1Db3N0KCk7XHJcbnRhYmxlLnNldEN1cnJlbnRJdGVtKCk7XHJcbnRhYmxlLnN1bVByaWNlKCcudG90YWwnLCAnLnN1bS1wcmljZScpO1xyXG50YWJsZS5pbmdyYWRpZW50c09wdGlvbnMoKTtcclxudmFyIHBpenphQnVpbGRlciA9IG5ldyBQaXp6YUJ1aWxkZXIoKTtcclxucGl6emFCdWlsZGVyLnJlbmRlclNpZGViYXIoJy5pbmdyZWRpZW50cy1saXN0JywgJ3B1YmxpYy9jb25maWcuanNvbicpO1xyXG5cclxuIl19
