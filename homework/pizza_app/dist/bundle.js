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
        var target = event.target;
        console.log(target);
        if (target.classList.contains("plus")) {
            target.nextElementSibling.value++;
        }
        if (target.classList.contains("minus")) {
            target.previousElementSibling.value--;
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJzcmNcXGluZGV4LmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FDQUEsU0FBUyxZQUFULENBQXNCLFNBQXRCLEVBQWlDO0FBQzdCLFNBQUssSUFBTCxHQUFZLElBQVo7QUFDQSxTQUFLLFNBQUwsR0FBaUIsU0FBUyxhQUFULENBQXVCLFNBQXZCLENBQWpCO0FBQ0g7O0FBRUQsYUFBYSxTQUFiLENBQXVCLGFBQXZCLEdBQXVDLFVBQVUsSUFBVixFQUFnQixJQUFoQixFQUFzQjtBQUN6RCxRQUFJLFFBQVEsSUFBWjtBQUNBLFNBQUssSUFBTCxHQUFZLFNBQVMsYUFBVCxDQUF1QixJQUF2QixDQUFaO0FBQ0EsYUFBUyxhQUFULENBQXVCLFlBQXZCLEVBQXFDLFVBQXJDLEVBQWlEO0FBQzdDLFlBQUksVUFBVSxXQUFXLE1BQVgsQ0FBZDtBQUNBLGFBQUssSUFBSSxJQUFJLENBQWIsRUFBZ0IsSUFBSSxRQUFRLE1BQTVCLEVBQW9DLEdBQXBDLEVBQXlDO0FBQ3JDLGdCQUFJLFdBQVk7NkJBQUEsQ0FDQyxRQUFRLENBQVIsRUFBVyxJQUFLLG1CQUFnQixRQUFRLENBQVIsRUFBVyxLQUFNLGlCQUFjLFFBQVEsQ0FBUixFQUFXLEdBQUk7a0JBRC9GO0FBR0EseUJBQWEsU0FBYixJQUEwQixRQUExQjtBQUNIO0FBQ0o7O0FBRUQsUUFBSSxNQUFNLElBQUksY0FBSixFQUFWO0FBQ0EsUUFBSSxJQUFKLENBQVMsS0FBVCxFQUFnQixJQUFoQixFQUFzQixJQUF0QjtBQUNBLFFBQUksa0JBQUosR0FBeUIsTUFBSztBQUMxQixZQUFJLElBQUksVUFBSixJQUFrQixDQUFsQixJQUF1QixJQUFJLE1BQUosSUFBYyxHQUF6QyxFQUE4QztBQUMxQyxpQkFBSyxJQUFMLEdBQVksS0FBSyxLQUFMLENBQVcsSUFBSSxZQUFmLENBQVo7QUFDQSwwQkFBYyxL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Q0EsTUFBTSxlQUFOO0FBQ0EsTUFBTSxjQUFOO0FBQ0EsTUFBTSxjQUFOO0FBQ0EsTUFBTSxRQUFOLENBQWUsUUFBZixFQUF5QixZQUF6QjtBQUNBLE1BQU0sa0JBQU47O0FBRUEsSUFBSSxlQUFlLElBQUksWUFBSixFQUFuQjtBQUNBLGFBQWEsYUFBYixDQUEyQixtQkFBM0IsRUFBZ0Qsb0JBQWhEIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3ZhciBmPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIik7dGhyb3cgZi5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGZ9dmFyIGw9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGwuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sbCxsLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSIsImZ1bmN0aW9uIFBpenphQnVpbGRlcihwaXp6YUxpc3QpIHtcclxuICAgIHRoaXMuZGF0YSA9IG51bGw7XHJcbiAgICB0aGlzLnBpenphTGlzdCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IocGl6emFMaXN0KTtcclxufVxyXG5cclxuUGl6emFCdWlsZGVyLnByb3RvdHlwZS5yZW5kZXJTaWRlYmFyID0gZnVuY3Rpb24gKGxpc3QsIGRhdGEpIHtcclxuICAgIHZhciBfc2VsZiA9IHRoaXM7XHJcbiAgICB0aGlzLmxpc3QgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKGxpc3QpO1xyXG4gICAgZnVuY3Rpb24gcmVuZGVyU2lkZWJhcihTZWxlY3RlZExpc3QsIHBhcnNlZERhdGEpIHtcclxuICAgICAgICB2YXIgZGF0YU9iaiA9IHBhcnNlZERhdGFbJ2RhdGEnXTtcclxuICAgICAgICBmb3IgKHZhciBpID0gMTsgaSA8IGRhdGFPYmoubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgdmFyIHRlbXBsYXRlID0gYFxyXG4gICAgICAgICAgICA8bGkgZGF0YS1uYW1lPVwiJHtkYXRhT2JqW2ldLm5hbWV9XCIgZGF0YS1wcmljZT1cIiR7ZGF0YU9ialtpXS5wcmljZX1cIj48aW1nIHNyYz1cIiR7ZGF0YU9ialtpXS5zcmN9XCI+XHJcbiAgICAgICAgICAgIDwvbGk+YDtcclxuICAgICAgICAgICAgU2VsZWN0ZWRMaXN0LmlubmVySFRNTCArPSB0ZW1wbGF0ZTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgdmFyIHhociA9IG5ldyBYTUxIdHRwUmVxdWVzdCgpO1xyXG4gICAgeGhyLm9wZW4oXCJHRVRcIiwgZGF0YSwgdHJ1ZSk7XHJcbiAgICB4aHIub25yZWFkeXN0YXRlY2hhbmdlID0gKCk9PiB7XHJcbiAgICAgICAgaWYgKHhoci5yZWFkeVN0YXRlID09IDQgJiYgeGhyLnN0YXR1cyA9PSAyMDApIHtcclxuICAgICAgICAgICAgdGhpcy5kYXRhID0gSlNPTi5wYXJzZSh4aHIucmVzcG9uc2VUZXh0KTtcclxuICAgICAgICAgICAgcmVuZGVyU2lkZWJhcih0aGlzLmxpc3QsIHRoaXMuZGF0YSk7XHJcbiAgICAgICAgfVxyXG4gICAgfTtcclxuICAgIHhoci5zZW5kKCk7XHJcbn07XHJcblxyXG5mdW5jdGlvbiBUYWJsZShhZGRCdG4sIGJhc2tldCwgaXRlbUNvdW50LCBudW1CdG4sIGluZ3JMaXN0LCB0b3RhbENlbGwsIHBpenphTGlzdCwgcGl6emFMaXN0SXRlbSkge1xyXG4gICAgdGhpcy5hZGRCdG4gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKGFkZEJ0bik7XHJcbiAgICB0aGlzLmJhc2tldCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoYmFza2V0KTtcclxuICAgIHRoaXMuaXRlbUNvdW50ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihpdGVtQ291bnQpO1xyXG4gICAgdGhpcy5udW1CdG4gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKG51bUJ0bik7XHJcbiAgICB0aGlzLmluZ3JMaXN0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihpbmdyTGlzdCk7XHJcbiAgICB0aGlzLnRvdGFsQ2VsbCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IodG90YWxDZWxsKTtcclxuICAgIHRoaXMuY3VycmVudEluZGV4ID0gMjtcclxuICAgIHRoaXMucGl6emFMaXN0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihwaXp6YUxpc3QpO1xyXG4gICAgdGhpcy5waXp6YUxpc3RJdGVtID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihwaXp6YUxpc3RJdGVtKTtcclxuICAgIC8vdGhpcy5zYWxhbWlJdGVtID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5pbmdyZWRpZW50cy1pdGVtLnNhbGFtaVwiKTtcclxuICAgIC8vdGhpcy5zYWxhbWlJdGVtSW5wdXQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmluZ3JlZGllbnRzLWl0ZW0uc2FsYW1pIC5pbnB1dFwiKTtcclxuICAgIC8vdGhpcy50b21hdG9JdGVtID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5pbmdyZWRpZW50cy1pdGVtLnRvbWF0b1wiKTtcclxuICAgIC8vdGhpcy50b21hdG9JdGVtSW5wdXQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmluZ3JlZGllbnRzLWl0ZW0udG9tYXRvIC5pbnB1dFwiKTtcclxuICAgIC8vdGhpcy5iYWNvbkl0ZW0gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmluZ3JlZGllbnRzLWl0ZW0uYmFjb25cIik7XHJcbiAgICAvL3RoaXMuYmFjb25JdGVtSW5wdXQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmluZ3JlZGllbnRzLWl0ZW0uYmFjb24gLmlucHV0XCIpO1xyXG4gICAgLy90aGlzLmNoZWV6ZUl0ZW0gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmluZ3JlZGllbnRzLWl0ZW0uY2hlZXplXCIpO1xyXG4gICAgLy90aGlzLmNoZWV6ZUl0ZW1JbnB1dCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuaW5ncmVkaWVudHMtaXRlbS5jaGVlemUgLmlucHV0XCIpO1xyXG4gICAgLy90aGlzLmdyZWVuSXRlbSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuaW5ncmVkaWVudHMtaXRlbS5ncmVlblwiKTtcclxuICAgIC8vdGhpcy5ncmVlbkl0ZW1JbnB1dCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuaW5ncmVkaWVudHMtaXRlbS5ncmVlbiAuaW5wdXRcIik7XHJcbn1cclxuXHJcblRhYmxlLnByb3RvdHlwZS5yZW5kZXJSb3cgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICB2YXIgX3NlbGYgPSB0aGlzO1xyXG5cclxuICAgIGZ1bmN0aW9uIHJlbmRlclJvd0hhbmRsZXIoKSB7XHJcbiAgICAgICAgcmV0dXJuIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgdmFyIHJvd1RlbXBsYXRlID0gYDx0cj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgPHRkIGNsYXNzPVwibnVtXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8YnV0dG9uIGNsYXNzPVwic2VsZWN0LW51bVwiPiR7X3NlbGYuY3VycmVudEluZGV4fTwvYnV0dG9uPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC90ZD5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDx0ZCBjbGFzcz1cImluZ3JlZGllbnRzXCI+XHJcbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJpbmdyZWRpZW50cy1pdGVtIHNhbGFtaVwiPlxyXG4gICAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwibmFtZVwiPlNhbGFtaSA8aW1nIHNyYz1cImltYWdlcy9zYWxhbWkuc3ZnXCIgYWx0PVwiXCI+PC9zcGFuPlxyXG4gICAgICAgICAgICAgIDxidXR0b24gY2xhc3M9XCJwbHVzXCI+KzwvYnV0dG9uPlxyXG4gICAgICAgICAgICAgIDxpbnB1dCB0eXBlPSdudW1iZXInIGNsYXNzPVwiaW5wdXRcIj5cclxuICAgICAgICAgICAgICA8YnV0dG9uIGNsYXNzPVwibWludXNcIj4tPC9idXR0b24+XHJcbiAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVwiaW5ncmVkaWVudHMtaXRlbSB0b21hdG9cIj5cclxuICAgICAgICAgICAgICA8c3BhbiBjbGFzcz1cIm5hbWVcIj50b21hdG8gPGltZyBzcmM9XCJpbWFnZXMvdG9tYXRvLnN2Z1wiIGFsdD1cIlwiPjwvc3Bhbj5cclxuICAgICAgICAgICAgICA8YnV0dG9uIGNsYXNzPVwicGx1c1wiPis8L2J1dHRvbj5cclxuICAgICAgICAgICAgICA8aW5wdXQgdHlwZT0nbnVtYmVyJyBjbGFzcz1cImlucHV0XCI+XHJcbiAgICAgICAgICAgICAgPGJ1dHRvbiBjbGFzcz1cIm1pbnVzXCI+LTwvYnV0dG9uPlxyXG4gICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cImluZ3JlZGllbnRzLWl0ZW0gYmFjb25cIj5cclxuICAgICAgICAgICAgICA8c3BhbiBjbGFzcz1cIm5hbWVcIj5iYWNvbiA8aW1nIHNyYz1cImltYWdlcy9iYWNvbi5zdmdcIiBhbHQ9XCJcIj48L3NwYW4+XHJcbiAgICAgICAgICAgICAgPGJ1dHRvbiBjbGFzcz1cInBsdXNcIj4rPC9idXR0b24+XHJcbiAgICAgICAgICAgICAgPGlucHV0IHR5cGU9J251bWJlcicgY2xhc3M9XCJpbnB1dFwiPlxyXG4gICAgICAgICAgICAgIDxidXR0b24gY2xhc3M9XCJtaW51c1wiPi08L2J1dHRvbj5cclxuICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJpbmdyZWRpZW50cy1pdGVtIGNoZWV6ZVwiPlxyXG4gICAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwibmFtZVwiPmNoZWV6ZSA8aW1nIHNyYz1cImltYWdlcy9jaGVlemUuc3ZnXCIgYWx0PVwiXCI+PC9zcGFuPlxyXG4gICAgICAgICAgICAgIDxidXR0b24gY2xhc3M9XCJwbHVzXCI+KzwvYnV0dG9uPlxyXG4gICAgICAgICAgICAgIDxpbnB1dCB0eXBlPSdudW1iZXInIGNsYXNzPVwiaW5wdXRcIj5cclxuICAgICAgICAgICAgICA8YnV0dG9uIGNsYXNzPVwibWludXNcIj4tPC9idXR0b24+XHJcbiAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVwiaW5ncmVkaWVudHMtaXRlbSBncmVlblwiPlxyXG4gICAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwibmFtZVwiPmdyZWVuIDxpbWcgc3JjPVwiaW1hZ2VzL2dyZWVuLnN2Z1wiIGFsdD1cIlwiPjwvc3Bhbj5cclxuICAgICAgICAgICAgICA8YnV0dG9uIGNsYXNzPVwicGx1c1wiPis8L2J1dHRvbj5cclxuICAgICAgICAgICAgICA8aW5wdXQgdHlwZT0nbnVtYmVyJyBjbGFzcz1cImlucHV0XCI+XHJcbiAgICAgICAgICAgICAgPGJ1dHRvbiBjbGFzcz1cIm1pbnVzXCI+LTwvYnV0dG9uPlxyXG4gICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgIDwvdGQ+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8dGQgY2xhc3M9XCJ0b3RhbFwiIGRhdGEtcHJpY2U9XCI0MFwiPjQwPC90ZD5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDx0ZD5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxidXR0b24gY2xhc3M9XCJyZW1vdmVcIj54PC9idXR0b24+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvdGQ+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvdHI+YDtcclxuICAgICAgICAgICAgdmFyIHBpenphVGVtcGxhdGUgPSBgXHJcbiAgICAgICAgICAgICAgICA8bGkgY2xhc3M9XCJwaXp6YS1pdGVtXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJwaXp6YS1pbmRleFwiPiR7X3NlbGYuY3VycmVudEluZGV4fTwvc3Bhbj5cclxuICAgICAgICAgICAgICAgICAgICA8aW1nIHNyYz1cImltYWdlcy9waXp6YS5zdmdcIiB3aWR0aD1cIjMwMFwiIGhlaWdodD1cIjMwMFwiIGFsdD1cIlwiIHRpdGxlPVwiXCI+XHJcbiAgICAgICAgICAgICAgICA8L2xpPlxyXG4gICAgICAgICAgICBgO1xyXG4gICAgICAgICAgICBfc2VsZi5waXp6YUxpc3QuaW5uZXJIVE1MICs9IHBpenphVGVtcGxhdGU7XHJcbiAgICAgICAgICAgIF9zZWxmLmJhc2tldC5pbm5lckhUTUwgKz0gcm93VGVtcGxhdGU7XHJcbiAgICAgICAgICAgIF9zZWxmLmN1cnJlbnRJbmRleCArPSAxO1xyXG4gICAgICAgICAgICBfc2VsZi5jaGVja0N1cnJlbnRJbmRleCgpO1xyXG4gICAgICAgICAgICBfc2VsZi51cGRhdGVJdGVtQ291bnQoKTtcclxuICAgICAgICAgICAgX3NlbGYuc2V0Q3VycmVudEl0ZW0oKTtcclxuICAgICAgICAgICAgX3NlbGYuc3VtUHJpY2UoJy50b3RhbCcsICcuc3VtLXByaWNlJyk7XHJcblxyXG4gICAgICAgIH07XHJcbiAgICB9XHJcbiAgICBfc2VsZi5hZGRCdG4uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIHJlbmRlclJvd0hhbmRsZXIoKSk7XHJcblxyXG59O1xyXG5cclxuVGFibGUucHJvdG90eXBlLnJlbW92ZUl0ZW0gPSBmdW5jdGlvbiAoKSB7XHJcbiAgICB2YXIgX3NlbGYgPSB0aGlzO1xyXG5cclxuICAgIGZ1bmN0aW9uIHJlbW92ZVNlbGZIYW5kbGVyKGV2ZW50KSB7XHJcbiAgICAgICAgaWYgKGV2ZW50LnRhcmdldC5jbGFzc05hbWUgPT0gJ3JlbW92ZScpIHtcclxuICAgICAgICAgICAgdmFyIHJlbW92ZVJvdyA9IGV2ZW50LnRhcmdldC5wYXJlbnROb2RlLnBhcmVudE5vZGUsXHJcbiAgICAgICAgICAgICAgICBub2RlTGlzdCA9IEFycmF5LnByb3RvdHlwZS5zbGljZS5jYWxsKF9zZWxmLmJhc2tldC5jaGlsZHJlbiksXHJcbiAgICAgICAgICAgICAgICBjdXJyZW50SW5kZXggPSBub2RlTGlzdC5pbmRleE9mKHJlbW92ZVJvdyk7XHJcbiAgICAgICAgICAgIF9zZWxmLnBpenphTGlzdC5yZW1vdmVDaGlsZChkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcubGlzdCBsaScpW2N1cnJlbnRJbmRleF0pO1xyXG4gICAgICAgICAgICBfc2VsZi5iYXNrZXQucmVtb3ZlQ2hpbGQocmVtb3ZlUm93KTtcclxuICAgICAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmxpc3QnKS5zdHlsZS5tYXJnaW5MZWZ0ID0gLWAkezMwMCAqIChjdXJyZW50SW5kZXggLSAxKX1gICsgYHB4YDtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coY3VycmVudEluZGV4IC0gMSk7XHJcbiAgICAgICAgICAgIF9zZWxmLmNoZWNrQ3VycmVudEluZGV4KCk7XHJcbiAgICAgICAgICAgIF9zZWxmLnVwZGF0ZUl0ZW1Db3VudCgpO1xyXG4gICAgICAgICAgICBfc2VsZi5zZXRDdXJyZW50SXRlbSgpO1xyXG4gICAgICAgICAgICBpZihyZW1vdmVSb3cuY2xhc3NMaXN0LmNvbnRhaW5zKCdzZWxlY3RlZCcpKXtcclxuICAgICAgICAgICAgICAgIF9zZWxmLmJhc2tldC5jaGlsZHJlbltwYXJzZUludChjdXJyZW50SW5kZXgpIC0gMV0uY2xhc3NMaXN0LmFkZCgnc2VsZWN0ZWQnKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBfc2VsZi5zdW1QcmljZSgnLnRvdGFsJywgJy5zdW0tcHJpY2UnKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdib2R5JykuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCByZW1vdmVTZWxmSGFuZGxlcik7XHJcbn07XHJcblxyXG5UYWJsZS5wcm90b3R5cGUuc2V0Q3VycmVudEl0ZW0gPSBmdW5jdGlvbiAoKSB7XHJcbiAgICB2YXIgX3NlbGYgPSB0aGlzLFxyXG4gICAgICAgIGJ0bnMgPSBbXS5zbGljZS5jYWxsKGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5zZWxlY3QtbnVtJykpO1xyXG5cclxuICAgIGZ1bmN0aW9uIGNsaWNrSGFuZGxlcihldmVudCkge1xyXG4gICAgICAgIHZhciBjdXJyZW50Um93ID0gZXZlbnQudGFyZ2V0LnBhcmVudE5vZGUucGFyZW50Tm9kZSxcclxuICAgICAgICAgICAgbm9kZUxpc3QgPSBBcnJheS5wcm90b3R5cGUuc2xpY2UuY2FsbChfc2VsZi5iYXNrZXQuY2hpbGRyZW4pLFxyXG4gICAgICAgICAgICBjdXJyZW50SW5kZXggPSBub2RlTGlzdC5pbmRleE9mKGN1cnJlbnRSb3cpLFxyXG4gICAgICAgICAgICBsaXN0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLmxpc3QgLnBpenphLWl0ZW0nKTtcclxuICAgICAgICBmb3IgKHZhciBrID0gMDsgayA8IGxpc3QubGVuZ3RoOyBrKyspIHtcclxuICAgICAgICAgICAgbGlzdFtrXS5jbGFzc0xpc3QucmVtb3ZlKCdhY3RpdmUnKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgbGlzdFtjdXJyZW50SW5kZXhdLmNsYXNzTGlzdC5hZGQoJ2FjdGl2ZScpO1xyXG4gICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5saXN0Jykuc3R5bGUubWFyZ2luTGVmdCA9IC1gJHszMDAgKiAoY3VycmVudEluZGV4KX1gICsgYHB4YDtcclxuICAgICAgICB2YXIgdHIgPSBbXS5zbGljZS5jYWxsKGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5iYXNrZXQgdHInKSk7XHJcbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCB0ci5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICB0cltpXS5jbGFzc0xpc3QucmVtb3ZlKCdzZWxlY3RlZCcpO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLmNsb3Nlc3QoJ3RyJykuY2xhc3NMaXN0LmFkZCgnc2VsZWN0ZWQnKTtcclxuICAgIH1cclxuXHJcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IGJ0bnMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICBidG5zW2ldLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgY2xpY2tIYW5kbGVyKTtcclxuICAgIH1cclxufTtcclxuXHJcblRhYmxlLnByb3RvdHlwZS5zdW1QcmljZSA9IGZ1bmN0aW9uIChzdW1BcnIsIGNlbGwpIHtcclxuICAgIHZhciBhcnIgPSBbXS5zbGljZS5jYWxsKGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoc3VtQXJyKSksXHJcbiAgICAgICAgc3VtID0gYXJyLnJlZHVjZShmdW5jdGlvbiAoc3VtLCBjdXJyZW50SXRlbSkge1xyXG4gICAgICAgICAgICByZXR1cm4gc3VtICsgKCtjdXJyZW50SXRlbS5kYXRhc2V0LnByaWNlKTtcclxuICAgICAgICB9LCAwKTtcclxuICAgIHZhciBkaXNwbGF5U3VtQ2VsbCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoY2VsbCk7XHJcbiAgICBkaXNwbGF5U3VtQ2VsbC5kYXRhc2V0LnByaWNlID0gc3VtO1xyXG4gICAgZGlzcGxheVN1bUNlbGwuaW5uZXJIVE1MID0gc3VtO1xyXG59O1xyXG5cclxuXHJcblxyXG5UYWJsZS5wcm90b3R5cGUudXBkYXRlSXRlbUNvc3QgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICB2YXIgX3NlbGYgPSB0aGlzO1xyXG5cclxuICAgIGZ1bmN0aW9uIGxpc3RIYW5kbGVyKGV2ZW50KSB7XHJcbiAgICAgICAgZnVuY3Rpb24gZ2V0UmFuZG9tKG1pbiwgbWF4KSB7XHJcbiAgICAgICAgICAgIHJldHVybiBNYXRoLnJvdW5kKE1hdGgucmFuZG9tKCkgKiAobWF4IC0gbWluKSArIG1pbik7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHZhciB0YXJnZXQgPSBldmVudC50YXJnZXQ7XHJcbiAgICAgICAgaWYgKHRhcmdldC50YWdOYW1lID09ICdJTUcnKSB7XHJcbiAgICAgICAgICAgIHZhciBzcmMgPSB0YXJnZXQuZ2V0QXR0cmlidXRlKCdzcmMnKTtcclxuICAgICAgICAgICAgdmFyIG5ld0ltZyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2ltZycpO1xyXG4gICAgICAgICAgICBuZXdJbWcuc3JjID0gc3JjO1xyXG4gICAgICAgICAgICBuZXdJbWcuc3R5bGUudG9wID0gZ2V0UmFuZG9tKDI1LCAyNDApICsgXCJweFwiO1xyXG4gICAgICAgICAgICBuZXdJbWcuc3R5bGUubGVmdCA9IGdldFJhbmRvbSgyNSwgMjQwKSArIFwicHhcIjtcclxuICAgICAgICAgICAgbmV3SW1nLmNsYXNzTGlzdC5hZGQoJ2luZ3JlZGllbnQnKTtcclxuICAgICAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnBpenphLWl0ZW0uYWN0aXZlJykuYXBwZW5kQ2hpbGQobmV3SW1nKTtcclxuICAgICAgICAgICAgdmFyIG5hbWUgPSB0YXJnZXQucGFyZW50Tm9kZS5kYXRhc2V0Lm5hbWU7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKG5hbWUpO1xyXG4gICAgICAgICAgICB2YXIgaW5wdXQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuaW5ncmVkaWVudHMtaXRlbScrJy4nK25hbWUrJyAuaW5wdXQnKTtcclxuICAgICAgICAgICAgaW5wdXQudmFsdWUrKztcclxuICAgICAgICB9XHJcbiAgICAgICAgdmFyIGxpID0gdGFyZ2V0LmNsb3Nlc3QoJ2xpJyk7XHJcbiAgICAgICAgaWYgKCFfc2VsZi5pbmdyTGlzdC5jb250YWlucyhsaSkpIHtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuICAgICAgICB2YXIgY29zdCA9IHBhcnNlSW50KHRhcmdldC5wYXJlbnROb2RlLmRhdGFzZXQucHJpY2UpLFxyXG4gICAgICAgICAgICBjdXJyZW50VG90YWxDb3N0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5iYXNrZXQgLnNlbGVjdGVkIC50b3RhbFwiKTtcclxuICAgICAgICBpZiAoY3VycmVudFRvdGFsQ29zdCkge1xyXG4gICAgICAgICAgICBjdXJyZW50VG90YWxDb3N0LmRhdGFzZXQucHJpY2UgPSBwYXJzZUludChjdXJyZW50VG90YWxDb3N0LmRhdGFzZXQucHJpY2UpICsgY29zdDtcclxuICAgICAgICAgICAgY3VycmVudFRvdGFsQ29zdC5pbm5lckhUTUwgPSBjdXJyZW50VG90YWxDb3N0LmRhdGFzZXQucHJpY2U7XHJcbiAgICAgICAgICAgIF9zZWxmLnN1bVByaWNlKCcudG90YWwnLCAnLnN1bS1wcmljZScpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICB0aGlzLmluZ3JMaXN0LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgbGlzdEhhbmRsZXIpO1xyXG59O1xyXG5cclxuVGFibGUucHJvdG90eXBlLmNoZWNrQ3VycmVudEluZGV4ID0gZnVuY3Rpb24gKCkge1xyXG4gICAgdmFyIGl0ZW1zQXJyYXkgPSBbXS5zbGljZS5jYWxsKGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXCIub3JkZXJzIHRyIC5zZWxlY3QtbnVtXCIpKSxcclxuICAgICAgICBwaXp6YXNBcnJheSA9IFtdLnNsaWNlLmNhbGwoZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChcIi5waXp6YS1pbmRleFwiKSksXHJcbiAgICAgICAgaSxcclxuICAgICAgICBrO1xyXG4gICAgZm9yIChpID0gMDsgaSA8IGl0ZW1zQXJyYXkubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICBpdGVtc0FycmF5W2ldLmlubmVySFRNTCA9IGkgKyAxO1xyXG4gICAgfVxyXG4gICAgZm9yIChrID0gMDsgayA8IHBpenphc0FycmF5Lmxlbmd0aDsgaysrKSB7XHJcbiAgICAgICAgcGl6emFzQXJyYXlba10uaW5uZXJIVE1MID0gayArIDE7XHJcbiAgICB9XHJcbn07XHJcblxyXG5UYWJsZS5wcm90b3R5cGUudXBkYXRlSXRlbUNvdW50ID0gZnVuY3Rpb24gKCkge1xyXG4gICAgdmFyIGl0ZW1zQXJyYXkgPSBbXS5zbGljZS5jYWxsKGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXCIub3JkZXJzIHRyIC5zZWxlY3QtbnVtXCIpKTtcclxuICAgIHRoaXMuaXRlbUNvdW50LmlubmVySFRNTCA9IGl0ZW1zQXJyYXkubGVuZ3RoO1xyXG59O1xyXG5cclxuXHJcblRhYmxlLnByb3RvdHlwZS5zZXRBY3RpdmVGaXJzdCA9IGZ1bmN0aW9uIChwaXp6YSxyb3cpIHtcclxuICAgIHZhciBwaXp6YUFjdGl2ZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwocGl6emEpLFxyXG4gICAgICAgIHJvd0FjdGl2ZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwocm93KTtcclxuICAgIHBpenphQWN0aXZlWzBdLmNsYXNzTGlzdC5hZGQoJ2FjdGl2ZScpO1xyXG4gICAgcm93QWN0aXZlWzBdLmNsYXNzTGlzdC5hZGQoJ3NlbGVjdGVkJyk7XHJcbn07XHJcblxyXG5UYWJsZS5wcm90b3R5cGUuaW5ncmFkaWVudHNPcHRpb25zID0gZnVuY3Rpb24gKCkge1xyXG4gICAgLy92YXIgc2FsYW1pSXRlbSA9IHtcclxuICAgIC8vICAgIHBsdXM6ZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmluZ3JlZGllbnRzLWl0ZW0uc2FsYW1pIC5wbHVzJyksXHJcbiAgICAvLyAgICBtaW51czogZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmluZ3JlZGllbnRzLWl0ZW0uc2FsYW1pIC5taW51cycpLFxyXG4gICAgLy8gICAgaW5wdXQ6IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5pbmdyZWRpZW50cy1pdGVtLnNhbGFtaSBpbnB1dCcpXHJcbiAgICAvL307XHJcbiAgICAvLyAgdmFyIGl0ZW1zQXJyID0gW107XHJcbiAgICAvLyAgdmFyIHNhbGFtaUl0ZW0gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmluZ3JlZGllbnRzLWl0ZW0uc2FsYW1pXCIpLFxyXG4gICAgLy8gICAgICBzYWxhbWlJdGVtSW5wdXQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmluZ3JlZGllbnRzLWl0ZW0uc2FsYW1pIC5pbnB1dFwiKSxcclxuICAgIC8vICAgICAgdG9tYXRvSXRlbSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuaW5ncmVkaWVudHMtaXRlbS50b21hdG9cIiksXHJcbiAgICAvLyAgICAgIHRvbWF0b0l0ZW1JbnB1dCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuaW5ncmVkaWVudHMtaXRlbS50b21hdG8gLmlucHV0XCIpLFxyXG4gICAgLy8gICAgICBiYWNvbkl0ZW0gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmluZ3JlZGllbnRzLWl0ZW0uYmFjb25cIiksXHJcbiAgICAvLyAgICAgIGJhY29uSXRlbUlucHV0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5pbmdyZWRpZW50cy1pdGVtLmJhY29uIC5pbnB1dFwiKSxcclxuICAgIC8vICAgICAgY2hlZXplSXRlbSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuaW5ncmVkaWVudHMtaXRlbS5jaGVlemVcIiksXHJcbiAgICAvLyAgICAgIGNoZWV6ZUl0ZW1JbnB1dCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuaW5ncmVkaWVudHMtaXRlbS5jaGVlemUgLmlucHV0XCIpLFxyXG4gICAgLy8gICAgICBncmVlbkl0ZW0gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmluZ3JlZGllbnRzLWl0ZW0uZ3JlZW5cIiksXHJcbiAgICAvLyAgICAgIGdyZWVuSXRlbUlucHV0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5pbmdyZWRpZW50cy1pdGVtLmdyZWVuIC5pbnB1dFwiKTtcclxuICAgIGZ1bmN0aW9uIGNsaWNrQWN0aW9uSGFuZGxlcihldmVudCl7XHJcbiAgICAgICAgdmFyIHRhcmdldCA9IGV2ZW50LnRhcmdldDtcclxuICAgICAgICBjb25zb2xlLmxvZyh0YXJnZXQpO1xyXG4gICAgICAgICAgICBpZih0YXJnZXQuY2xhc3NMaXN0LmNvbnRhaW5zKFwicGx1c1wiKSl7XHJcbiAgICAgICAgICAgICAgICB0YXJnZXQubmV4dEVsZW1lbnRTaWJsaW5nLnZhbHVlKys7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYodGFyZ2V0LmNsYXNzTGlzdC5jb250YWlucyhcIm1pbnVzXCIpKXtcclxuICAgICAgICAgICAgICAgIHRhcmdldC5wcmV2aW91c0VsZW1lbnRTaWJsaW5nLnZhbHVlLS07XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICB9XHJcbiAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcub3JkZXJzJykuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLGNsaWNrQWN0aW9uSGFuZGxlcik7XHJcbn07XHJcblxyXG52YXIgdGFibGUgPSBuZXcgVGFibGUoJy5hZGQtcGl6emEnLCAnLmJhc2tldCB0Ym9keScsICcubnVtJywgJy5zZWxlY3QtbnVtJywgJy5pbmdyZWRpZW50cy1saXN0JywgJy50b3RhbCcsICcubGlzdCcsICcucGl6emEtaXRlbScpO1xyXG50YWJsZS5jaGVja0N1cnJlbnRJbmRleCgpO1xyXG50YWJsZS5zZXRBY3RpdmVGaXJzdCgnLnBpenphLWl0ZW0nLCcub3JkZXJzIHRyJyk7XHJcbnRhYmxlLnJlbmRlclJvdygpO1xyXG50YWJsZS5yZW1vdmVJdGVtKCk7XHJcbnRhYmxlLnVwZGF0ZUl0ZW1Db3VudCgpO1xyXG50YWJsZS51cGRhdGVJdGVtQ29zdCgpO1xyXG50YWJsZS5zZXRDdXJyZW50SXRlbSgpO1xyXG50YWJsZS5zdW1QcmljZSgnLnRvdGFsJywgJy5zdW0tcHJpY2UnKTtcclxudGFibGUuaW5ncmFkaWVudHNPcHRpb25zKCk7XHJcblxyXG52YXIgcGl6emFCdWlsZGVyID0gbmV3IFBpenphQnVpbGRlcigpO1xyXG5waXp6YUJ1aWxkZXIucmVuZGVyU2lkZWJhcignLmluZ3JlZGllbnRzLWxpc3QnLCAncHVibGljL2NvbmZpZy5qc29uJyk7XHJcblxyXG4iXX0=
