function PizzaBuilder(pizzaList){
    this.data = null;
    this.pizzaList = document.querySelector(pizzaList);
}

PizzaBuilder.prototype.renderSidebar = function(list,data){
    var _self = this;
    this.list = document.querySelector(list);
    function renderSidebar(SelectedList,parsedData){
        var dataObj = parsedData['data'];
        for(var i = 1; i < dataObj.length;i++){
            var template = `
            <li data-name="${dataObj[i].name}" data-price="${dataObj[i].price}"><img src="${dataObj[i].src}">
            </li>`;
            SelectedList.innerHTML += template;
        }
    }
    var xhr = new XMLHttpRequest();
    xhr.open("GET", data, true);
    xhr.onreadystatechange =()=> {
        if (xhr.readyState == 4 && xhr.status == 200) {
            this.data = JSON.parse(xhr.responseText);
            renderSidebar(this.list,this.data);
        }
    };
    xhr.send();
};

function Table(addBtn, basket, itemCount,numBtn,ingrList,totalCell,pizzaList,pizzaListItem) {
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
                               <button class="select-num">${_self.currentIndex}</button>
                               </td>
                               <td class="ingredients"></td>
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
            _self.pizzaList.innerHTML +=  pizzaTemplate;
            _self.basket.innerHTML += rowTemplate;
            _self.currentIndex += 1;
            _self.checkCurrentIndex();
            _self.updateItemCount();
            _self.setCurrentItem();
            _self.sumPrice('.total','.sum-price');
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
             currentIndex = nodeList.indexOf( removeRow );
            _self.pizzaList.removeChild(document.querySelectorAll('.list li')[currentIndex]);
            _self.basket.removeChild(removeRow);
            _self.checkCurrentIndex();
            _self.updateItemCount();
            _self.setCurrentItem();
            _self.sumPrice('.total','.sum-price');
        }
    }
    document.querySelector('body').addEventListener('click', removeSelfHandler);
};

Table.prototype.setCurrentItem = function () {
    var _self = this,
        btns = [].slice.call(document.querySelectorAll('.select-num'));
    function clickHandler(event){
        var currentRow = event.target.parentNode.parentNode,
            nodeList = Array.prototype.slice.call(_self.basket.children),
            currentIndex = nodeList.indexOf( currentRow );
        document.querySelector('.list').style.marginLeft = -`${300*currentIndex}`+`px`;
        var tr = [].slice.call(document.querySelectorAll('.basket tr'));
        for(var i = 0; i < tr.length;i++){
            tr[i].classList.remove('selected');
        }
        this.closest('tr').classList.add('selected');
    }
    for(var i = 0; i < btns.length;i++){
        btns[i].addEventListener('click',clickHandler);
    }
};

Table.prototype.sumPrice = function(sumArr,cell){
    var arr = [].slice.call(document.querySelectorAll(sumArr)),
        sum = arr.reduce(function(sum,currentItem){
        return sum + (+currentItem.dataset.price);
    },0);
    console.log(sum);
    var displaySumCell = document.querySelector(cell);
    displaySumCell.dataset.price = sum;
    displaySumCell.innerHTML = sum;
};

Table.prototype.updateItemCost = function () {
    var _self= this;
    function listHandler(event){
        var target = event.target;
        var li = target.closest('li');
        if (!_self.ingrList.contains(li)){
            return;
        }
        var cost = parseInt(target.parentNode.dataset.price),
            currentTotalCost = document.querySelector(".basket .selected .total");
        if(currentTotalCost){
            currentTotalCost.dataset.price = parseInt(currentTotalCost.dataset.price) + cost;
            currentTotalCost.innerHTML = currentTotalCost.dataset.price;
            _self.sumPrice('.total','.sum-price');
        }
    }
    this.ingrList.addEventListener('click',listHandler);
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

var table = new Table('.add-pizza', '.basket tbody', '.num','.select-num','.ingredients-list','.total','.list','.pizza-item');
table.checkCurrentIndex();
table.renderRow();
table.removeItem();
table.updateItemCount();
table.updateItemCost();
table.setCurrentItem();
table.sumPrice('.total','.sum-price');
var pizzaBuilder = new PizzaBuilder();
pizzaBuilder.renderSidebar('.ingredients-list','public/config.json');

