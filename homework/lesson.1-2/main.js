json // JSON data is assigned to `json` global variable which is declared in `json.js` file

/*
 * 1. Fix and convert balance value to number
 *
 *    Produce a new array of users including fixed balance values
 *    `balance` values might be of three types:
 *      - number as a string '100.5' (convert to Number type)
 *      - number as a string + currency symbol '100.5$' (remove currency symbol and convert to Number)
 *      - `false` (convert to 0)
 */
var parsedJSON = JSON.parse(json);

var users = parsedJSON.map(function (singleUser) {
    if (singleUser.balance == false) {
        singleUser.balance = 0;
    } else {
        singleUser.balance = Math.round(parseFloat(singleUser.balance));
    }
    return singleUser;
});

//users = JSON.stringify(users);


/*
 * 2. Group users by balance (1000 - 2000, 2000+)
 *
 *    Groups should be defined in a single object,
 *    where key is the name of the group
 *    and value is array of users
 *    { '1000-2000': [], '2000+': [] }
 */

var grouped = {
    '1000-2000': [],
    '2000+': []
};

users.map(function (singleUser) {
    if (singleUser.balance >= 1000 && singleUser.balance <= 2000) {
        grouped['1000-2000'].push(singleUser);

    } else if (singleUser.balance > 2000) {
        grouped['2000+'].push(singleUser);
    }
});

//grouped = JSON.stringify(grouped);
console.log(grouped);


/*
 * 3. Find average age and balance in all groups
 *
 *    The final result should be an object
 *    where key is the name of the group
 *    and value is an object of two fields:
 *    average age and average balance
 *    { '1000-2000': { avgAge: Number, avgBalance: Number }, ... }
 */
var averages = {
    '1000-2000': {
        avgAge: null,
        avgBalance: null
    },
    '2000+': {
        avgAge: null,
        avgBalance: null
    }
};

for (var i = 0; i < grouped['1000-2000'].length; i++) {
    averages['1000-2000'].avgAge += grouped['1000-2000'][i].age;
    averages['1000-2000'].avgBalance += grouped['1000-2000'][i].balance;
}


averages['1000-2000'].avgAge = averages['1000-2000'].avgAge / grouped['1000-2000'].length;
averages['1000-2000'].avgBalance = averages['1000-2000'].avgBalance / grouped['1000-2000'].length;
console.log(averages['1000-2000'].avgAge);
console.log(averages['1000-2000'].avgBalance);


for (var k = 0; k < grouped['2000+'].length; k++) {
    averages['2000+'].avgAge += grouped['2000+'][k].age;
    averages['2000+'].avgBalance += grouped['2000+'][k].balance;
}

averages['2000+'].avgAge = averages['2000+'].avgAge / grouped['2000+'].length;
averages['2000+'].avgBalance = averages['2000+'].avgBalance / grouped['2000+'].length;
console.log(averages['2000+'].avgAge);
console.log(averages['2000+'].avgBalance);






