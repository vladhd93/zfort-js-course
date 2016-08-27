function PizzaBuilder(){
    self.data = null;
}

PizzaBuilder.prototype.renderSidebar = function(data){
    window.onload = function () {
        var xhr = new XMLHttpRequest();
        xhr.open("GET", data, true);
        xhr.onreadystatechange = function () {

            if (xhr.readyState == 4 && xhr.status == 200) {
                self.data = JSON.parse(xhr.responseText);
                document.querySelector('.ingredients').innerHTML = self.data['data'][0].name;
            }
        };
        xhr.send();
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
                               <button class="select-num">${self.currentIndex}</button>
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

Table.prototype.updateTable = function () {

};

Table.prototype.setCurrentItem = function () {

};

Table.prototype.updateItemCost = function () {

};


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
console.log(self);
