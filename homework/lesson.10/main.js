/* === Exercise ===
 *
 * == Description ==
 * Given existing markup develop drag'n'drop game
 * where user should drag colored circle into gray circle
 * and colored rectangle into gray rectangle.
 * When colored shape is placed inside of corresponding
 * gray shape, gray shape should be highlighted with a color.
 *
 * == Suggestions ==
 * - Use `mousedown` and `mouseup` events on colored shape to determine
 *   if it can be dragged.
 * - Use `mousemove` event on colored shape to move it
 *   when it's pressed and check if it's inside of corresponding
 *   gray shape.
 * - Use `getBoundingClientRect()` to get element's position coordinates.
 *
 * See expected result on video: https://youtu.be/oCynnKKqhq8
 * If you can not solve this exercise, see result here: http://jsbin.com/hanusokadu/edit?js,output
 */



function DragAction(elem, area) {
    var self = this;

    function getCoords(elem) {
        var box = elem.getBoundingClientRect();
        return {
            top: box.top + pageYOffset,
            left: box.left + pageXOffset
        };
    }

    self.elem = document.querySelector(elem);
    self.area = document.querySelector(area);

    self.elem.onmousedown = function (e) {

        var elemCoords = getCoords(self.elem),
            areaCoords = getCoords(self.area),
            elemWidth = self.elem.offsetWidth,
            elemHeight = self.elem.offsetHeight,
            areaHeight = self.area.offsetHeight,
            areaWidth = self.area.offsetWidth,
            shiftHeight = areaHeight - elemHeight,
            shiftWidth = areaWidth - elemWidth;
        var shiftX = e.pageX - elemCoords.left,
            shiftY = e.pageY - elemCoords.top;


        function move(e) {
            self.elem.style.left = e.pageX - shiftX + 'px';
            self.elem.style.top = e.pageY - shiftY + 'px';
        }

        document.onmousemove = function (e) {
            move(e);
            var currentCoords = getCoords(self.elem),
                elemCoordsObj = {
                    left: currentCoords.left,
                    top: currentCoords.top
                };
            if (elemCoordsObj.left >= areaCoords.left
                && elemCoordsObj.left <= areaCoords.left + shiftWidth
                && elemCoordsObj.top >= areaCoords.top
                && elemCoordsObj.top <= areaCoords.top + shiftHeight) {
                self.area.classList.add('active');
            } else {
                if(self.area.classList.contains('active')){
                    self.area.classList.remove('active');
                }

            }
        };

        self.elem.onmouseup = function () {
            document.onmousemove = null;
            self.elem.onmouseup = null;
        };

    };

    self.elem.ondragstart = function () {
        return false;
    };

}

var dragCircle = new DragAction('.entity.circle', '.target .circle');
var dragRect = new DragAction('.entity.rect', '.target .rect');