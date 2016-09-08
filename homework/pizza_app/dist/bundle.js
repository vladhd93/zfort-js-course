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
            var newRow = document.createElement('tr');
            var rowTemplate = `
                           <td class="num">
                               <button class="select-num">${ _self.currentIndex }</button>
                               </td>
                               <td class="ingredients">
            <div class="ingredients-item salami" data-type="salami">
              <span class="name">Salami <img src="images/salami.svg" alt=""></span>
              <button class="plus">+</button>
              <input type='number' class="input">
              <button class="minus">-</button>
            </div>
            <div class="ingredients-item tomato" data-type="tomato">
              <span class="name">tomato <img src="images/tomato.svg" alt=""></span>
              <button class="plus">+</button>
              <input type='number' class="input">
              <button class="minus">-</button>
            </div>
            <div class="ingredients-item bacon" data-type="bacon">
              <span class="name">bacon <img src="images/bacon.svg" alt=""></span>
              <button class="plus">+</button>
              <input type='number' class="input">
              <button class="minus">-</button>
            </div>
            <div class="ingredients-item cheeze" data-type="cheeze">
              <span class="name">cheeze <img src="images/cheeze.svg" alt=""></span>
              <button class="plus">+</button>
              <input type='number' class="input">
              <button class="minus">-</button>
            </div>
            <div class="ingredients-item green" data-type="green">
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
        if (target.tagName == 'IMG') {
            var src = target.getAttribute('src');
            var newImg = document.createElement('img');
            newImg.src = src;
            newImg.style.top = getRandom(25, 240) + "px";
            newImg.style.left = getRandom(25, 240) + "px";
            newImg.classList.add('ingredient');
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
        function getRandom(min, max) {
            return Math.round(Math.random() * (max - min) + min);
        }
        var target = event.target;
        if (target.closest('.selected')) {
            if (target.classList.contains("plus")) {
                target.nextElementSibling.value++;
                var type = target.closest('.ingredients-item').dataset.type;
                var newImg = document.createElement('img');
                newImg.src = 'images/' + type + '.svg';
                newImg.style.top = getRandom(25, 240) + "px";
                newImg.style.left = getRandom(25, 240) + "px";
                newImg.classList.add('ingredient');
                newImg.classList.add(type);
                document.querySelector('.pizza-item.active').appendChild(newImg);
            }
            if (target.classList.contains("minus")) {
                target.previousElementSibling.value--;
            }
        }
    }

    document.querySelector('.orders').addEventListener('click', clickActionHandler);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJzcmNcXGluZGV4LmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FDQUEsU0FBUyxZQUFULENBQXNCLFNBQXRCLEVBQWlDO0FBQzdCLFNBQUssSUFBTCxHQUFZLElBQVo7QUFDQSxTQUFLLFNBQUwsR0FBaUIsU0FBUyxhQUFULENBQXVCLFNBQXZCLENBQWpCO0FBQ0g7O0FBRUQsYUFBYSxTQUFiLENBQXVCLGFBQXZCLEdBQXVDLFVBQVUsSUFBVixFQUFnQixJQUFoQixFQUFzQjtBQUN6RCxRQUFJLFFBQVEsSUFBWjtBQUNBLFNBQUssSUFBTCxHQUFZLFNBQVMsYUFBVCxDQUF1QixJQUF2QixDQUFaO0FBQ0EsYUFBUyxhQUFULENBQXVCLFlBQXZCLEVBQXFDLFVBQXJDLEVBQWlEO0FBQzdDLFlBQUksVUFBVSxXQUFXLE1BQVgsQ0FBZDtBQUNBLGFBQUssSUFBSSxJQUFJLENBQWIsRUFBZ0IsSUFBSSxRQUFRLE1BQTVCLEVBQW9DLEdBQXBDLEVBQXlDO0FBQ3JDLGdCQUFJLFdBQVk7NkJBQUEsQ0FDQyxRQUFRLENBQVIsRUFBVyxJQUFLLG1CQUFnQixRQUFRLENBQVIsRUFBVyxLQUFNLGlCQUFjLFFBQVEsQ0FBUixFQUFXLEdBQUk7a0JBRC9GO0FBR0EseUJBQWEsU0FBYixJQUEwQixRQUExQjtBQUNIO0FBQ0o7O0FBRUQsUUFBSSxNQUFNLElBQUksY0FBSixFQUFWO0FBQ0EsUUFBSSxJQUFKLENBQVMsS0FBVCxFQUFnQixJQUFoQixFQUFzQixJQUF0QjtBQUNBLFFBQUksa0JBQUosR0FBeUIsTUFBSztBQUMxQixZQUFJLElBQUksVUFBSixJQUFrQixDQUFsQixJQUF1QixJQUFJLE1BQUosSUFBYyxHQUF6QyxFQUE4QztBQUMxQyxpQkFBSyxJQUFMLEdBQVksS0FBSyxLQUFMLENBQVcsSUFBSSxZQUFmLENBQVo7QUFDQSwwQkFBYyxL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QUF4QztBQUNBLHVCQUFPLEtBQVAsQ0FBYSxJQUFiLEdBQW9CLFVBQVUsRUFBVixFQUFjLEdBQWQsSUFBcUIsSUFBekM7QUFDQSx1QkFBTyxTQUFQLENBQWlCLEdBQWpCLENBQXFCLFlBQXJCO0FBQ0EsdUJBQU8sU0FBUCxDQUFpQixHQUFqQixDQUFxQixJQUFyQjtBQUNBLHlCQUFTLGFBQVQsQ0FBdUIsb0JBQXZCLEVBQTZDLFdBQTdDLENBQXlELE1BQXpEO0FBQ0g7QUFDRCxnQkFBRyxPQUFPLFNBQVAsQ0FBaUIsUUFBakIsQ0FBMEIsT0FBMUIsQ0FBSCxFQUFzQztBQUNsQyx1QkFBTyxzQkFBUCxDQUE4QixLQUE5QjtBQUVIO0FBQ0o7QUFDSDs7QUFFRCxhQUFTLGFBQVQsQ0FBdUIsU0FBdkIsRUFBa0MsZ0JBQWxDLENBQW1ELE9BQW5ELEVBQTJELGtCQUEzRDtBQUNILENBM0NEOztBQTZDQSxJQUFJLFFBQVEsSUFBSSxLQUFKLENBQVUsWUFBVixFQUF3QixlQUF4QixFQUF5QyxNQUF6QyxFQUFpRCxhQUFqRCxFQUFnRSxtQkFBaEUsRUFBcUYsUUFBckYsRUFBK0YsT0FBL0YsRUFBd0csYUFBeEcsQ0FBWjtBQUNBLE1BQU0saUJBQU47QUFDQSxNQUFNLGNBQU4sQ0FBcUIsYUFBckIsRUFBbUMsWUFBbkM7QUFDQSxNQUFNLFNBQU47QUFDQSxNQUFNLFVBQU47QUFDQSxNQUFNLGVBQU47QUFDQSxNQUFNLGNBQU47QUFDQSxNQUFNLGNBQU47QUFDQSxNQUFNLFFBQU4sQ0FBZSxRQUFmLEVBQXlCLFlBQXpCO0FBQ0EsTUFBTSxrQkFBTjs7QUFFQSxJQUFJLGVBQWUsSUFBSSxZQUFKLEVBQW5CO0FBQ0EsYUFBYSxhQUFiLENBQTJCLG1CQUEzQixFQUFnRCxvQkFBaEQiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dmFyIGY9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKTt0aHJvdyBmLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsZn12YXIgbD1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwobC5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxsLGwuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pIiwiZnVuY3Rpb24gUGl6emFCdWlsZGVyKHBpenphTGlzdCkge1xyXG4gICAgdGhpcy5kYXRhID0gbnVsbDtcclxuICAgIHRoaXMucGl6emFMaXN0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihwaXp6YUxpc3QpO1xyXG59XHJcblxyXG5QaXp6YUJ1aWxkZXIucHJvdG90eXBlLnJlbmRlclNpZGViYXIgPSBmdW5jdGlvbiAobGlzdCwgZGF0YSkge1xyXG4gICAgdmFyIF9zZWxmID0gdGhpcztcclxuICAgIHRoaXMubGlzdCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IobGlzdCk7XHJcbiAgICBmdW5jdGlvbiByZW5kZXJTaWRlYmFyKFNlbGVjdGVkTGlzdCwgcGFyc2VkRGF0YSkge1xyXG4gICAgICAgIHZhciBkYXRhT2JqID0gcGFyc2VkRGF0YVsnZGF0YSddO1xyXG4gICAgICAgIGZvciAodmFyIGkgPSAxOyBpIDwgZGF0YU9iai5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICB2YXIgdGVtcGxhdGUgPSBgXHJcbiAgICAgICAgICAgIDxsaSBkYXRhLW5hbWU9XCIke2RhdGFPYmpbaV0ubmFtZX1cIiBkYXRhLXByaWNlPVwiJHtkYXRhT2JqW2ldLnByaWNlfVwiPjxpbWcgc3JjPVwiJHtkYXRhT2JqW2ldLnNyY31cIj5cclxuICAgICAgICAgICAgPC9saT5gO1xyXG4gICAgICAgICAgICBTZWxlY3RlZExpc3QuaW5uZXJIVE1MICs9IHRlbXBsYXRlO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICB2YXIgeGhyID0gbmV3IFhNTEh0dHBSZXF1ZXN0KCk7XHJcbiAgICB4aHIub3BlbihcIkdFVFwiLCBkYXRhLCB0cnVlKTtcclxuICAgIHhoci5vbnJlYWR5c3RhdGVjaGFuZ2UgPSAoKT0+IHtcclxuICAgICAgICBpZiAoeGhyLnJlYWR5U3RhdGUgPT0gNCAmJiB4aHIuc3RhdHVzID09IDIwMCkge1xyXG4gICAgICAgICAgICB0aGlzLmRhdGEgPSBKU09OLnBhcnNlKHhoci5yZXNwb25zZVRleHQpO1xyXG4gICAgICAgICAgICByZW5kZXJTaWRlYmFyKHRoaXMubGlzdCwgdGhpcy5kYXRhKTtcclxuICAgICAgICB9XHJcbiAgICB9O1xyXG4gICAgeGhyLnNlbmQoKTtcclxufTtcclxuXHJcbmZ1bmN0aW9uIFRhYmxlKGFkZEJ0biwgYmFza2V0LCBpdGVtQ291bnQsIG51bUJ0biwgaW5nckxpc3QsIHRvdGFsQ2VsbCwgcGl6emFMaXN0LCBwaXp6YUxpc3RJdGVtKSB7XHJcbiAgICB0aGlzLmFkZEJ0biA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoYWRkQnRuKTtcclxuICAgIHRoaXMuYmFza2V0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihiYXNrZXQpO1xyXG4gICAgdGhpcy5pdGVtQ291bnQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKGl0ZW1Db3VudCk7XHJcbiAgICB0aGlzLm51bUJ0biA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IobnVtQnRuKTtcclxuICAgIHRoaXMuaW5nckxpc3QgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKGluZ3JMaXN0KTtcclxuICAgIHRoaXMudG90YWxDZWxsID0gZG9jdW1lbnQucXVlcnlTZWxlY3Rvcih0b3RhbENlbGwpO1xyXG4gICAgdGhpcy5jdXJyZW50SW5kZXggPSAyO1xyXG4gICAgdGhpcy5waXp6YUxpc3QgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKHBpenphTGlzdCk7XHJcbiAgICB0aGlzLnBpenphTGlzdEl0ZW0gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKHBpenphTGlzdEl0ZW0pO1xyXG4gICAgLy90aGlzLnNhbGFtaUl0ZW0gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmluZ3JlZGllbnRzLWl0ZW0uc2FsYW1pXCIpO1xyXG4gICAgLy90aGlzLnNhbGFtaUl0ZW1JbnB1dCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuaW5ncmVkaWVudHMtaXRlbS5zYWxhbWkgLmlucHV0XCIpO1xyXG4gICAgLy90aGlzLnRvbWF0b0l0ZW0gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmluZ3JlZGllbnRzLWl0ZW0udG9tYXRvXCIpO1xyXG4gICAgLy90aGlzLnRvbWF0b0l0ZW1JbnB1dCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuaW5ncmVkaWVudHMtaXRlbS50b21hdG8gLmlucHV0XCIpO1xyXG4gICAgLy90aGlzLmJhY29uSXRlbSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuaW5ncmVkaWVudHMtaXRlbS5iYWNvblwiKTtcclxuICAgIC8vdGhpcy5iYWNvbkl0ZW1JbnB1dCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuaW5ncmVkaWVudHMtaXRlbS5iYWNvbiAuaW5wdXRcIik7XHJcbiAgICAvL3RoaXMuY2hlZXplSXRlbSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuaW5ncmVkaWVudHMtaXRlbS5jaGVlemVcIik7XHJcbiAgICAvL3RoaXMuY2hlZXplSXRlbUlucHV0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5pbmdyZWRpZW50cy1pdGVtLmNoZWV6ZSAuaW5wdXRcIik7XHJcbiAgICAvL3RoaXMuZ3JlZW5JdGVtID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5pbmdyZWRpZW50cy1pdGVtLmdyZWVuXCIpO1xyXG4gICAgLy90aGlzLmdyZWVuSXRlbUlucHV0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5pbmdyZWRpZW50cy1pdGVtLmdyZWVuIC5pbnB1dFwiKTtcclxufVxyXG5cclxuVGFibGUucHJvdG90eXBlLnJlbmRlclJvdyA9IGZ1bmN0aW9uICgpIHtcclxuICAgIHZhciBfc2VsZiA9IHRoaXM7XHJcblxyXG4gICAgZnVuY3Rpb24gcmVuZGVyUm93SGFuZGxlcigpIHtcclxuICAgICAgICByZXR1cm4gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICB2YXIgbmV3Um93ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgndHInKTtcclxuICAgICAgICAgICAgdmFyIHJvd1RlbXBsYXRlID0gYFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICA8dGQgY2xhc3M9XCJudW1cIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxidXR0b24gY2xhc3M9XCJzZWxlY3QtbnVtXCI+JHtfc2VsZi5jdXJyZW50SW5kZXh9PC9idXR0b24+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L3RkPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHRkIGNsYXNzPVwiaW5ncmVkaWVudHNcIj5cclxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cImluZ3JlZGllbnRzLWl0ZW0gc2FsYW1pXCIgZGF0YS10eXBlPVwic2FsYW1pXCI+XHJcbiAgICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJuYW1lXCI+U2FsYW1pIDxpbWcgc3JjPVwiaW1hZ2VzL3NhbGFtaS5zdmdcIiBhbHQ9XCJcIj48L3NwYW4+XHJcbiAgICAgICAgICAgICAgPGJ1dHRvbiBjbGFzcz1cInBsdXNcIj4rPC9idXR0b24+XHJcbiAgICAgICAgICAgICAgPGlucHV0IHR5cGU9J251bWJlcicgY2xhc3M9XCJpbnB1dFwiPlxyXG4gICAgICAgICAgICAgIDxidXR0b24gY2xhc3M9XCJtaW51c1wiPi08L2J1dHRvbj5cclxuICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJpbmdyZWRpZW50cy1pdGVtIHRvbWF0b1wiIGRhdGEtdHlwZT1cInRvbWF0b1wiPlxyXG4gICAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwibmFtZVwiPnRvbWF0byA8aW1nIHNyYz1cImltYWdlcy90b21hdG8uc3ZnXCIgYWx0PVwiXCI+PC9zcGFuPlxyXG4gICAgICAgICAgICAgIDxidXR0b24gY2xhc3M9XCJwbHVzXCI+KzwvYnV0dG9uPlxyXG4gICAgICAgICAgICAgIDxpbnB1dCB0eXBlPSdudW1iZXInIGNsYXNzPVwiaW5wdXRcIj5cclxuICAgICAgICAgICAgICA8YnV0dG9uIGNsYXNzPVwibWludXNcIj4tPC9idXR0b24+XHJcbiAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVwiaW5ncmVkaWVudHMtaXRlbSBiYWNvblwiIGRhdGEtdHlwZT1cImJhY29uXCI+XHJcbiAgICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJuYW1lXCI+YmFjb24gPGltZyBzcmM9XCJpbWFnZXMvYmFjb24uc3ZnXCIgYWx0PVwiXCI+PC9zcGFuPlxyXG4gICAgICAgICAgICAgIDxidXR0b24gY2xhc3M9XCJwbHVzXCI+KzwvYnV0dG9uPlxyXG4gICAgICAgICAgICAgIDxpbnB1dCB0eXBlPSdudW1iZXInIGNsYXNzPVwiaW5wdXRcIj5cclxuICAgICAgICAgICAgICA8YnV0dG9uIGNsYXNzPVwibWludXNcIj4tPC9idXR0b24+XHJcbiAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVwiaW5ncmVkaWVudHMtaXRlbSBjaGVlemVcIiBkYXRhLXR5cGU9XCJjaGVlemVcIj5cclxuICAgICAgICAgICAgICA8c3BhbiBjbGFzcz1cIm5hbWVcIj5jaGVlemUgPGltZyBzcmM9XCJpbWFnZXMvY2hlZXplLnN2Z1wiIGFsdD1cIlwiPjwvc3Bhbj5cclxuICAgICAgICAgICAgICA8YnV0dG9uIGNsYXNzPVwicGx1c1wiPis8L2J1dHRvbj5cclxuICAgICAgICAgICAgICA8aW5wdXQgdHlwZT0nbnVtYmVyJyBjbGFzcz1cImlucHV0XCI+XHJcbiAgICAgICAgICAgICAgPGJ1dHRvbiBjbGFzcz1cIm1pbnVzXCI+LTwvYnV0dG9uPlxyXG4gICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cImluZ3JlZGllbnRzLWl0ZW0gZ3JlZW5cIiBkYXRhLXR5cGU9XCJncmVlblwiPlxyXG4gICAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwibmFtZVwiPmdyZWVuIDxpbWcgc3JjPVwiaW1hZ2VzL2dyZWVuLnN2Z1wiIGFsdD1cIlwiPjwvc3Bhbj5cclxuICAgICAgICAgICAgICA8YnV0dG9uIGNsYXNzPVwicGx1c1wiPis8L2J1dHRvbj5cclxuICAgICAgICAgICAgICA8aW5wdXQgdHlwZT0nbnVtYmVyJyBjbGFzcz1cImlucHV0XCI+XHJcbiAgICAgICAgICAgICAgPGJ1dHRvbiBjbGFzcz1cIm1pbnVzXCI+LTwvYnV0dG9uPlxyXG4gICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgIDwvdGQ+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8dGQgY2xhc3M9XCJ0b3RhbFwiIGRhdGEtcHJpY2U9XCI0MFwiPjQwPC90ZD5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDx0ZD5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxidXR0b24gY2xhc3M9XCJyZW1vdmVcIj54PC9idXR0b24+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvdGQ+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgIGA7XHJcbiAgICAgICAgICAgIHZhciBwaXp6YVRlbXBsYXRlID0gYFxyXG4gICAgICAgICAgICAgICAgPGxpIGNsYXNzPVwicGl6emEtaXRlbVwiPlxyXG4gICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwicGl6emEtaW5kZXhcIj4ke19zZWxmLmN1cnJlbnRJbmRleH08L3NwYW4+XHJcbiAgICAgICAgICAgICAgICAgICAgPGltZyBzcmM9XCJpbWFnZXMvcGl6emEuc3ZnXCIgd2lkdGg9XCIzMDBcIiBoZWlnaHQ9XCIzMDBcIiBhbHQ9XCJcIiB0aXRsZT1cIlwiPlxyXG4gICAgICAgICAgICAgICAgPC9saT5cclxuICAgICAgICAgICAgYDtcclxuICAgICAgICAgICAgbmV3Um93LmlubmVySFRNTCA9IHJvd1RlbXBsYXRlO1xyXG4gICAgICAgICAgICBfc2VsZi5iYXNrZXQuYXBwZW5kQ2hpbGQobmV3Um93KTtcclxuICAgICAgICAgICAgX3NlbGYucGl6emFMaXN0LmlubmVySFRNTCArPSBwaXp6YVRlbXBsYXRlO1xyXG4gICAgICAgICAgICBfc2VsZi5jdXJyZW50SW5kZXggKz0gMTtcclxuICAgICAgICAgICAgX3NlbGYuY2hlY2tDdXJyZW50SW5kZXgoKTtcclxuICAgICAgICAgICAgX3NlbGYudXBkYXRlSXRlbUNvdW50KCk7XHJcbiAgICAgICAgICAgIF9zZWxmLnNldEN1cnJlbnRJdGVtKCk7XHJcbiAgICAgICAgICAgIF9zZWxmLnN1bVByaWNlKCcudG90YWwnLCAnLnN1bS1wcmljZScpO1xyXG5cclxuICAgICAgICB9O1xyXG4gICAgfVxyXG4gICAgX3NlbGYuYWRkQnRuLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCByZW5kZXJSb3dIYW5kbGVyKCkpO1xyXG5cclxufTtcclxuXHJcblRhYmxlLnByb3RvdHlwZS5yZW1vdmVJdGVtID0gZnVuY3Rpb24gKCkge1xyXG4gICAgdmFyIF9zZWxmID0gdGhpcztcclxuXHJcbiAgICBmdW5jdGlvbiByZW1vdmVTZWxmSGFuZGxlcihldmVudCkge1xyXG4gICAgICAgIGlmIChldmVudC50YXJnZXQuY2xhc3NOYW1lID09ICdyZW1vdmUnKSB7XHJcbiAgICAgICAgICAgIHZhciByZW1vdmVSb3cgPSBldmVudC50YXJnZXQucGFyZW50Tm9kZS5wYXJlbnROb2RlLFxyXG4gICAgICAgICAgICAgICAgbm9kZUxpc3QgPSBBcnJheS5wcm90b3R5cGUuc2xpY2UuY2FsbChfc2VsZi5iYXNrZXQuY2hpbGRyZW4pLFxyXG4gICAgICAgICAgICAgICAgY3VycmVudEluZGV4ID0gbm9kZUxpc3QuaW5kZXhPZihyZW1vdmVSb3cpO1xyXG4gICAgICAgICAgICBfc2VsZi5waXp6YUxpc3QucmVtb3ZlQ2hpbGQoZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLmxpc3QgbGknKVtjdXJyZW50SW5kZXhdKTtcclxuICAgICAgICAgICAgX3NlbGYuYmFza2V0LnJlbW92ZUNoaWxkKHJlbW92ZVJvdyk7XHJcbiAgICAgICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5saXN0Jykuc3R5bGUubWFyZ2luTGVmdCA9IC1gJHszMDAgKiAoY3VycmVudEluZGV4IC0gMSl9YCArIGBweGA7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKGN1cnJlbnRJbmRleCAtIDEpO1xyXG4gICAgICAgICAgICBfc2VsZi5jaGVja0N1cnJlbnRJbmRleCgpO1xyXG4gICAgICAgICAgICBfc2VsZi51cGRhdGVJdGVtQ291bnQoKTtcclxuICAgICAgICAgICAgX3NlbGYuc2V0Q3VycmVudEl0ZW0oKTtcclxuICAgICAgICAgICAgaWYocmVtb3ZlUm93LmNsYXNzTGlzdC5jb250YWlucygnc2VsZWN0ZWQnKSl7XHJcbiAgICAgICAgICAgICAgICBfc2VsZi5iYXNrZXQuY2hpbGRyZW5bcGFyc2VJbnQoY3VycmVudEluZGV4KSAtIDFdLmNsYXNzTGlzdC5hZGQoJ3NlbGVjdGVkJyk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgX3NlbGYuc3VtUHJpY2UoJy50b3RhbCcsICcuc3VtLXByaWNlJyk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcignYm9keScpLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgcmVtb3ZlU2VsZkhhbmRsZXIpO1xyXG59O1xyXG5cclxuVGFibGUucHJvdG90eXBlLnNldEN1cnJlbnRJdGVtID0gZnVuY3Rpb24gKCkge1xyXG4gICAgdmFyIF9zZWxmID0gdGhpcyxcclxuICAgICAgICBidG5zID0gW10uc2xpY2UuY2FsbChkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcuc2VsZWN0LW51bScpKTtcclxuXHJcbiAgICBmdW5jdGlvbiBjbGlja0hhbmRsZXIoZXZlbnQpIHtcclxuICAgICAgICB2YXIgY3VycmVudFJvdyA9IGV2ZW50LnRhcmdldC5wYXJlbnROb2RlLnBhcmVudE5vZGUsXHJcbiAgICAgICAgICAgIG5vZGVMaXN0ID0gQXJyYXkucHJvdG90eXBlLnNsaWNlLmNhbGwoX3NlbGYuYmFza2V0LmNoaWxkcmVuKSxcclxuICAgICAgICAgICAgY3VycmVudEluZGV4ID0gbm9kZUxpc3QuaW5kZXhPZihjdXJyZW50Um93KSxcclxuICAgICAgICAgICAgbGlzdCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5saXN0IC5waXp6YS1pdGVtJyk7XHJcbiAgICAgICAgZm9yICh2YXIgayA9IDA7IGsgPCBsaXN0Lmxlbmd0aDsgaysrKSB7XHJcbiAgICAgICAgICAgIGxpc3Rba10uY2xhc3NMaXN0LnJlbW92ZSgnYWN0aXZlJyk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGxpc3RbY3VycmVudEluZGV4XS5jbGFzc0xpc3QuYWRkKCdhY3RpdmUnKTtcclxuICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcubGlzdCcpLnN0eWxlLm1hcmdpbkxlZnQgPSAtYCR7MzAwICogKGN1cnJlbnRJbmRleCl9YCArIGBweGA7XHJcbiAgICAgICAgdmFyIHRyID0gW10uc2xpY2UuY2FsbChkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcuYmFza2V0IHRyJykpO1xyXG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgdHIubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgdHJbaV0uY2xhc3NMaXN0LnJlbW92ZSgnc2VsZWN0ZWQnKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5jbG9zZXN0KCd0cicpLmNsYXNzTGlzdC5hZGQoJ3NlbGVjdGVkJyk7XHJcbiAgICB9XHJcblxyXG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBidG5zLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgYnRuc1tpXS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGNsaWNrSGFuZGxlcik7XHJcbiAgICB9XHJcbn07XHJcblxyXG5UYWJsZS5wcm90b3R5cGUuc3VtUHJpY2UgPSBmdW5jdGlvbiAoc3VtQXJyLCBjZWxsKSB7XHJcbiAgICB2YXIgYXJyID0gW10uc2xpY2UuY2FsbChkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKHN1bUFycikpLFxyXG4gICAgICAgIHN1bSA9IGFyci5yZWR1Y2UoZnVuY3Rpb24gKHN1bSwgY3VycmVudEl0ZW0pIHtcclxuICAgICAgICAgICAgcmV0dXJuIHN1bSArICgrY3VycmVudEl0ZW0uZGF0YXNldC5wcmljZSk7XHJcbiAgICAgICAgfSwgMCk7XHJcbiAgICB2YXIgZGlzcGxheVN1bUNlbGwgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKGNlbGwpO1xyXG4gICAgZGlzcGxheVN1bUNlbGwuZGF0YXNldC5wcmljZSA9IHN1bTtcclxuICAgIGRpc3BsYXlTdW1DZWxsLmlubmVySFRNTCA9IHN1bTtcclxufTtcclxuXHJcblxyXG5cclxuVGFibGUucHJvdG90eXBlLnVwZGF0ZUl0ZW1Db3N0ID0gZnVuY3Rpb24gKCkge1xyXG4gICAgdmFyIF9zZWxmID0gdGhpcztcclxuXHJcbiAgICBmdW5jdGlvbiBsaXN0SGFuZGxlcihldmVudCkge1xyXG4gICAgICAgIGZ1bmN0aW9uIGdldFJhbmRvbShtaW4sIG1heCkge1xyXG4gICAgICAgICAgICByZXR1cm4gTWF0aC5yb3VuZChNYXRoLnJhbmRvbSgpICogKG1heCAtIG1pbikgKyBtaW4pO1xyXG4gICAgICAgIH1cclxuICAgICAgICB2YXIgdGFyZ2V0ID0gZXZlbnQudGFyZ2V0O1xyXG4gICAgICAgIGlmICh0YXJnZXQudGFnTmFtZSA9PSAnSU1HJykge1xyXG4gICAgICAgICAgICB2YXIgc3JjID0gdGFyZ2V0LmdldEF0dHJpYnV0ZSgnc3JjJyk7XHJcbiAgICAgICAgICAgIHZhciBuZXdJbWcgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdpbWcnKTtcclxuICAgICAgICAgICAgbmV3SW1nLnNyYyA9IHNyYztcclxuICAgICAgICAgICAgbmV3SW1nLnN0eWxlLnRvcCA9IGdldFJhbmRvbSgyNSwgMjQwKSArIFwicHhcIjtcclxuICAgICAgICAgICAgbmV3SW1nLnN0eWxlLmxlZnQgPSBnZXRSYW5kb20oMjUsIDI0MCkgKyBcInB4XCI7XHJcbiAgICAgICAgICAgIG5ld0ltZy5jbGFzc0xpc3QuYWRkKCdpbmdyZWRpZW50Jyk7XHJcbiAgICAgICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5waXp6YS1pdGVtLmFjdGl2ZScpLmFwcGVuZENoaWxkKG5ld0ltZyk7XHJcbiAgICAgICAgICAgIHZhciBuYW1lID0gdGFyZ2V0LnBhcmVudE5vZGUuZGF0YXNldC5uYW1lO1xyXG4gICAgICAgICAgICB2YXIgaW5wdXQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuc2VsZWN0ZWQgLmluZ3JlZGllbnRzLWl0ZW0nKycuJytuYW1lKycgLmlucHV0Jyk7XHJcbiAgICAgICAgICAgIGlucHV0LnZhbHVlKys7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHZhciBsaSA9IHRhcmdldC5jbG9zZXN0KCdsaScpO1xyXG4gICAgICAgIGlmICghX3NlbGYuaW5nckxpc3QuY29udGFpbnMobGkpKSB7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICAgICAgdmFyIGNvc3QgPSBwYXJzZUludCh0YXJnZXQucGFyZW50Tm9kZS5kYXRhc2V0LnByaWNlKSxcclxuICAgICAgICAgICAgY3VycmVudFRvdGFsQ29zdCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuYmFza2V0IC5zZWxlY3RlZCAudG90YWxcIik7XHJcbiAgICAgICAgaWYgKGN1cnJlbnRUb3RhbENvc3QpIHtcclxuICAgICAgICAgICAgY3VycmVudFRvdGFsQ29zdC5kYXRhc2V0LnByaWNlID0gcGFyc2VJbnQoY3VycmVudFRvdGFsQ29zdC5kYXRhc2V0LnByaWNlKSArIGNvc3Q7XHJcbiAgICAgICAgICAgIGN1cnJlbnRUb3RhbENvc3QuaW5uZXJIVE1MID0gY3VycmVudFRvdGFsQ29zdC5kYXRhc2V0LnByaWNlO1xyXG4gICAgICAgICAgICBfc2VsZi5zdW1QcmljZSgnLnRvdGFsJywgJy5zdW0tcHJpY2UnKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgdGhpcy5pbmdyTGlzdC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGxpc3RIYW5kbGVyKTtcclxufTtcclxuXHJcblRhYmxlLnByb3RvdHlwZS5jaGVja0N1cnJlbnRJbmRleCA9IGZ1bmN0aW9uICgpIHtcclxuICAgIHZhciBpdGVtc0FycmF5ID0gW10uc2xpY2UuY2FsbChkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKFwiLm9yZGVycyB0ciAuc2VsZWN0LW51bVwiKSksXHJcbiAgICAgICAgcGl6emFzQXJyYXkgPSBbXS5zbGljZS5jYWxsKGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXCIucGl6emEtaW5kZXhcIikpLFxyXG4gICAgICAgIGksXHJcbiAgICAgICAgaztcclxuICAgIGZvciAoaSA9IDA7IGkgPCBpdGVtc0FycmF5Lmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgaXRlbXNBcnJheVtpXS5pbm5lckhUTUwgPSBpICsgMTtcclxuICAgIH1cclxuICAgIGZvciAoayA9IDA7IGsgPCBwaXp6YXNBcnJheS5sZW5ndGg7IGsrKykge1xyXG4gICAgICAgIHBpenphc0FycmF5W2tdLmlubmVySFRNTCA9IGsgKyAxO1xyXG4gICAgfVxyXG59O1xyXG5cclxuVGFibGUucHJvdG90eXBlLnVwZGF0ZUl0ZW1Db3VudCA9IGZ1bmN0aW9uICgpIHtcclxuICAgIHZhciBpdGVtc0FycmF5ID0gW10uc2xpY2UuY2FsbChkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKFwiLm9yZGVycyB0ciAuc2VsZWN0LW51bVwiKSk7XHJcbiAgICB0aGlzLml0ZW1Db3VudC5pbm5lckhUTUwgPSBpdGVtc0FycmF5Lmxlbmd0aDtcclxufTtcclxuXHJcblxyXG5UYWJsZS5wcm90b3R5cGUuc2V0QWN0aXZlRmlyc3QgPSBmdW5jdGlvbiAocGl6emEscm93KSB7XHJcbiAgICB2YXIgcGl6emFBY3RpdmUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKHBpenphKSxcclxuICAgICAgICByb3dBY3RpdmUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKHJvdyk7XHJcbiAgICBwaXp6YUFjdGl2ZVswXS5jbGFzc0xpc3QuYWRkKCdhY3RpdmUnKTtcclxuICAgIHJvd0FjdGl2ZVswXS5jbGFzc0xpc3QuYWRkKCdzZWxlY3RlZCcpO1xyXG59O1xyXG5cclxuVGFibGUucHJvdG90eXBlLmluZ3JhZGllbnRzT3B0aW9ucyA9IGZ1bmN0aW9uICgpIHtcclxuICAgIC8vdmFyIHNhbGFtaUl0ZW0gPSB7XHJcbiAgICAvLyAgICBwbHVzOmRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5pbmdyZWRpZW50cy1pdGVtLnNhbGFtaSAucGx1cycpLFxyXG4gICAgLy8gICAgbWludXM6IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5pbmdyZWRpZW50cy1pdGVtLnNhbGFtaSAubWludXMnKSxcclxuICAgIC8vICAgIGlucHV0OiBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuaW5ncmVkaWVudHMtaXRlbS5zYWxhbWkgaW5wdXQnKVxyXG4gICAgLy99O1xyXG4gICAgLy8gIHZhciBpdGVtc0FyciA9IFtdO1xyXG4gICAgLy8gIHZhciBzYWxhbWlJdGVtID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5pbmdyZWRpZW50cy1pdGVtLnNhbGFtaVwiKSxcclxuICAgIC8vICAgICAgc2FsYW1pSXRlbUlucHV0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5pbmdyZWRpZW50cy1pdGVtLnNhbGFtaSAuaW5wdXRcIiksXHJcbiAgICAvLyAgICAgIHRvbWF0b0l0ZW0gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmluZ3JlZGllbnRzLWl0ZW0udG9tYXRvXCIpLFxyXG4gICAgLy8gICAgICB0b21hdG9JdGVtSW5wdXQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmluZ3JlZGllbnRzLWl0ZW0udG9tYXRvIC5pbnB1dFwiKSxcclxuICAgIC8vICAgICAgYmFjb25JdGVtID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5pbmdyZWRpZW50cy1pdGVtLmJhY29uXCIpLFxyXG4gICAgLy8gICAgICBiYWNvbkl0ZW1JbnB1dCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuaW5ncmVkaWVudHMtaXRlbS5iYWNvbiAuaW5wdXRcIiksXHJcbiAgICAvLyAgICAgIGNoZWV6ZUl0ZW0gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmluZ3JlZGllbnRzLWl0ZW0uY2hlZXplXCIpLFxyXG4gICAgLy8gICAgICBjaGVlemVJdGVtSW5wdXQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmluZ3JlZGllbnRzLWl0ZW0uY2hlZXplIC5pbnB1dFwiKSxcclxuICAgIC8vICAgICAgZ3JlZW5JdGVtID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5pbmdyZWRpZW50cy1pdGVtLmdyZWVuXCIpLFxyXG4gICAgLy8gICAgICBncmVlbkl0ZW1JbnB1dCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuaW5ncmVkaWVudHMtaXRlbS5ncmVlbiAuaW5wdXRcIik7XHJcblxyXG4gICAgZnVuY3Rpb24gY2xpY2tBY3Rpb25IYW5kbGVyKGV2ZW50KXtcclxuICAgICAgICBmdW5jdGlvbiBnZXRSYW5kb20obWluLCBtYXgpIHtcclxuICAgICAgICAgICAgcmV0dXJuIE1hdGgucm91bmQoTWF0aC5yYW5kb20oKSAqIChtYXggLSBtaW4pICsgbWluKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgdmFyIHRhcmdldCA9IGV2ZW50LnRhcmdldDtcclxuICAgICAgIGlmKHRhcmdldC5jbG9zZXN0KCcuc2VsZWN0ZWQnKSl7XHJcbiAgICAgICAgICAgaWYodGFyZ2V0LmNsYXNzTGlzdC5jb250YWlucyhcInBsdXNcIikpe1xyXG4gICAgICAgICAgICAgICB0YXJnZXQubmV4dEVsZW1lbnRTaWJsaW5nLnZhbHVlKys7XHJcbiAgICAgICAgICAgICAgIHZhciB0eXBlID0gdGFyZ2V0LmNsb3Nlc3QoJy5pbmdyZWRpZW50cy1pdGVtJykuZGF0YXNldC50eXBlO1xyXG4gICAgICAgICAgICAgICB2YXIgbmV3SW1nID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaW1nJyk7XHJcbiAgICAgICAgICAgICAgIG5ld0ltZy5zcmMgPSdpbWFnZXMvJyt0eXBlKycuc3ZnJztcclxuICAgICAgICAgICAgICAgbmV3SW1nLnN0eWxlLnRvcCA9IGdldFJhbmRvbSgyNSwgMjQwKSArIFwicHhcIjtcclxuICAgICAgICAgICAgICAgbmV3SW1nLnN0eWxlLmxlZnQgPSBnZXRSYW5kb20oMjUsIDI0MCkgKyBcInB4XCI7XHJcbiAgICAgICAgICAgICAgIG5ld0ltZy5jbGFzc0xpc3QuYWRkKCdpbmdyZWRpZW50Jyk7XHJcbiAgICAgICAgICAgICAgIG5ld0ltZy5jbGFzc0xpc3QuYWRkKHR5cGUpO1xyXG4gICAgICAgICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcucGl6emEtaXRlbS5hY3RpdmUnKS5hcHBlbmRDaGlsZChuZXdJbWcpO1xyXG4gICAgICAgICAgIH1cclxuICAgICAgICAgICBpZih0YXJnZXQuY2xhc3NMaXN0LmNvbnRhaW5zKFwibWludXNcIikpe1xyXG4gICAgICAgICAgICAgICB0YXJnZXQucHJldmlvdXNFbGVtZW50U2libGluZy52YWx1ZS0tO1xyXG5cclxuICAgICAgICAgICB9XHJcbiAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLm9yZGVycycpLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJyxjbGlja0FjdGlvbkhhbmRsZXIpO1xyXG59O1xyXG5cclxudmFyIHRhYmxlID0gbmV3IFRhYmxlKCcuYWRkLXBpenphJywgJy5iYXNrZXQgdGJvZHknLCAnLm51bScsICcuc2VsZWN0LW51bScsICcuaW5ncmVkaWVudHMtbGlzdCcsICcudG90YWwnLCAnLmxpc3QnLCAnLnBpenphLWl0ZW0nKTtcclxudGFibGUuY2hlY2tDdXJyZW50SW5kZXgoKTtcclxudGFibGUuc2V0QWN0aXZlRmlyc3QoJy5waXp6YS1pdGVtJywnLm9yZGVycyB0cicpO1xyXG50YWJsZS5yZW5kZXJSb3coKTtcclxudGFibGUucmVtb3ZlSXRlbSgpO1xyXG50YWJsZS51cGRhdGVJdGVtQ291bnQoKTtcclxudGFibGUudXBkYXRlSXRlbUNvc3QoKTtcclxudGFibGUuc2V0Q3VycmVudEl0ZW0oKTtcclxudGFibGUuc3VtUHJpY2UoJy50b3RhbCcsICcuc3VtLXByaWNlJyk7XHJcbnRhYmxlLmluZ3JhZGllbnRzT3B0aW9ucygpO1xyXG5cclxudmFyIHBpenphQnVpbGRlciA9IG5ldyBQaXp6YUJ1aWxkZXIoKTtcclxucGl6emFCdWlsZGVyLnJlbmRlclNpZGViYXIoJy5pbmdyZWRpZW50cy1saXN0JywgJ3B1YmxpYy9jb25maWcuanNvbicpO1xyXG5cclxuIl19
