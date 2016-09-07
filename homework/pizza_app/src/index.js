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
            <li data-name="${dataObj[i].name}" data-price="${dataObj[i].price}"><img src="${dataObj[i].src}">
            </li>`;
            SelectedList.innerHTML += template;
        }
    }

    var xhr = new XMLHttpRequest();
    xhr.open("GET", data, true);
    xhr.onreadystatechange = ()=> {
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
                               <button class="select-num">${_self.currentIndex}</button>
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
                    <span class="pizza-index">${_self.currentIndex}</span>
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
            document.querySelector('.list').style.marginLeft = -`${300 * (currentIndex - 1)}` + `px`;
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
        document.querySelector('.list').style.marginLeft = -`${300 * (currentIndex)}` + `px`;
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
            return sum + (+currentItem.dataset.price);
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
    function clickActionHandler(event){
        var target = event.target;
        if(target.classList.contains("plus")){
            target.nextElementSibling.value++;
        }
        if(target.classList.contains("minus")){
            target.previousElementSibling.value--;
        }
    }
    document.querySelector('.ingredients').addEventListener('click',clickActionHandler);
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
            var input = document.querySelector('.ingredients-item'+'.'+name+' .input');
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

