function pizzaBuilder() {
    Table.apply(this, arguments);
    var self = this;


}

function Table(addBtn, basket, itemCount) {
    self.addBtn = document.querySelector(addBtn);
    self.basket = document.querySelector(basket);
    self.itemCount = document.querySelector(itemCount);
    self.currentIndex = 0;
}

Table.prototype.renderRow = function () {


    function renderRowHandler() {
        Table.prototype.checkCurrentIndex();
        var index;
        if (self.currentIndex >= 1) {
            index = 2;
        }

        return function () {

            var rowTemplate = `<tr>
                           <td class="num">
                               <button class="select-num">${index}</button>
                               </td>
                               <td class="ingredients"></td>
                               <td class="total">40</td>
                               <td>
                               <button class="remove">x</button>
                           </td>
                           </tr>`;

            self.basket.innerHTML += rowTemplate;
            index++;


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
    for (i = 1; i < itemsArray.length; i++) {
        itemsArray[i].innerHTML = i;
    }
    var checkItemArray = document.querySelectorAll('.orders tr');
    if (checkItemArray.length == 1) {
        self.currentIndex = 2;
        i = 2;
    }
    if (checkItemArray.length == 0) {
        self.currentIndex = 1;
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