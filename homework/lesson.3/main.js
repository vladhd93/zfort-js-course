/*
 * 1. Create function `sum` such that
 *    sum(3)(4)(9) === 16
 */

// function sum ...
function sum1(x){
    return function(y){
        return function(z){
            return x + y + z;
        };
    };
}

var testSum = sum1(3)(4)(9);
console.log(testSum);


function sum(a) {

    var currentSum = a;

    function f(b) {
        currentSum += b;
        return f;
    }

    f.valueOf = function() {
        return currentSum;
    };

    return f;
}

console.log(sum(3)(4)(9));




/*
 * 2. Create string buffer function
 *    which accumulates passed in strings one by one
 *    and returns resulting string when called without arguments
 */

// function makeBuffer ...
function makeBuffer(){
    var storage = '';

    return function (bufferData){
        if(arguments.length == 0){
            return storage;
        }
        storage += bufferData;
    }
}
var buffer = makeBuffer();

buffer('Hello');
buffer(', ');
buffer('world');
buffer('!');

console.log(
  buffer()
);


/*
 * 3. Create recursive function which walks a tree,
 *    computes sum of values of `value` fields
 *    and returns the final result when walked the whole tree
 */

var tree = {
  value: 1,
  lchild: {
    value: 3,
    lchild: {
      value: 9,
      lchild: {
        value: 45
      },
      rchild: {
        value: 2
      }
    },
    rchild: {
      value: 0
    }
  },
  rchild: {
    value: 6,
    lchild: {
      value: 90
    },
    rchild: {
      value: 1,
      lchild: {
        value: 6,
        lchild: {
          value: 90
        },
        rchild: {
          value: 1
        }
      }
    }
  }
};

// function walkAndCollect ...

console.log(
  walkAndCollect(tree) === 254
);
