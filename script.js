
  var fields = document.getElementsByTagName('input');
  var cidBefore = document.getElementById('cid_before');
  var changeDue = document.getElementById('change_due');
  var cidAfter = document.getElementById('cid_after');
  
   
/* ############################
When inputs are changed manually
############################ */
function onInputChange(){
  var cidInput = [
    ["FIFTY", 0],
    ["TWENTY", 0],
    ["TEN", 0],
    ["FIVE", 0],
    ["TWO", 0],
    ["ONE", 0],
    ["HALF", 0],
    ["QUARTER", 0],
    ["DIME", 0],
    ["NICKEL", 0],
    ["2 PENNY", 0],
    ["PENNY", 0]
    ];
  for (let i = 0; i < fields.length; i++) {
    if(i === 0){
      priceInput = fields[i].value
    }
    if(i === 1){
      cashInput = fields[i].value
    }
    if(i > 1){
      cidInput[i-2][1] = fields[i].value;
    }
  }
  
  cidBefore.innerHTML = '';
  changeDue.innerHTML = '';
  cidAfter.innerHTML = '';
  checkCashRegister(priceInput, cashInput, cidInput);
  
}

  
/* ############################
When clear button is clicked
############################ */
document.getElementById('clearBtn').addEventListener('click', clearFields);
function clearFields(){
  cidBefore.innerHTML = '';
  changeDue.innerHTML = '';
  cidAfter.innerHTML = '';
  
  for (let i = 0; i < fields.length; i++) {
    fields[i].value = 0;
  }
}

/* ############################
When randomize button is clicked
############################ */
document.getElementById('randomizeBtn').addEventListener('click', generateValues);

// generateValues Function
function generateValues(){
  let price = 0;
  let cash = 0;
  let cid = [];
  
  let units = [
    ["PRICE",10.49],
    ["CASH", 50],
    ["FIFTY", 50],
    ["TWENTY", 20],
    ["TEN", 10],
    ["FIVE", 5],
    ["TWO", 2],
    ["ONE", 1],
    ["HALF", 0.50],
    ["QUARTER", 0.25],
    ["DIME", 0.10],
    ["NICKEL", 0.05],
    ["2 PENNY", 0.02],
    ["PENNY", 0.01]
    ];
    
  for (let i = 0; i < units.length; i++) {
    // Multiply units by random values every time the button is clicked
   var random = Math.round(Math.random() *10);
   units[i][1] *= Number(random).toFixed(2);
   // Print values to form fields
   fields[i].value = Number((units[i][1])).toFixed(2);
  // Assign values to variables: price, cash and cid
  if(i === 0){
     price = fields[i].value
    }
    if(i === 1){
     cash = fields[i].value
    }
    if (i > 1){
      cid.push([units[i][0], fields[i].value]);
    }
  }
  // console.log(price, cash, cid);
    
  cidBefore.innerHTML = '';
  changeDue.innerHTML = '';
  cidAfter.innerHTML = '';
  checkCashRegister(price, cash, cid)
  return [price, cash, cid];
}



// checkCashRegister Function
function checkCashRegister(price, cash, cid) {
var category = 0;
 var cidRemaining = [];
  var changeArray = [
    ["FIFTY", 0],
    ["TWENTY", 0],
    ["TEN", 0],
    ["FIVE", 0],
    ["TWO", 0],
    ["ONE", 0],
    ["HALF", 0],
    ["QUARTER", 0],
    ["DIME", 0],
    ["NICKEL", 0],
    ["2 PENNY", 0],
    ["PENNY", 0]  
  ];
  /* ********************* HTML ****************************** */
  // Print the cash in drawer to it's column
  cid.map(function(val) {
   
    cidBefore.innerHTML += val[1] + '<hr />';
   
  });
  /* ********************* END HTML ****************************** */
  
  
  // Convert all cash into pennies - Important to avoid inaccurate javascript math binary operation
  cash = Number((cash * 100).toFixed(0));
  price = Number((price * 100).toFixed(0));
  /* *************************************************************************************************************** */
  if (price > cash) {

    /* ********************* HTML ****************************** */
    changeDue.innerHTML = 'Insufficient Cash <hr /> Price is: ' + price/100 + '<hr />Total cash paid is: ' + cash/100;

     cid.map(function(val) {
      cidAfter.innerHTML += val[1] + '<hr />';
    });
    /* ********************* END HTML ****************************** */
    return ('Insufficient Cash');

  } else if (price === cash) {
    /* ********************* HTML ****************************** */
    cid.map(function(val) {
      cidAfter.innerHTML += val[1] + '<hr />';
    });
    /* ********************* END HTML ****************************** */

    // changeArray = cid;
    
    /* ********************* HTML ****************************** */
    changeArray.forEach(function(val) {
      changeDue.innerHTML += val[1] + '<hr />';
    });
    /* ********************* END HTML ****************************** */
    return ('No Change Is Due');
  }
/* *************************************************************************************************************** */

  // Copy cid into cidRemaining
  for (let i = 0; i < cid.length; i++) {
    cid[i][1] =  Number((cid[i][1] * 100).toFixed(0));
    cidRemaining[i] = cid[i].slice(0);
  }


  // Calculate the sum of cash in drawer
  var cidTotal = cid.reduce(function(acc, curr) {
    return acc + curr[1];
  }, 0);
  // Calculate the sum of the change due 
  var changeSum = cash - price;
  var changeTotal = changeSum;
  // Check if the change due is less then/exact as the cash in drawer
  if (changeSum > cidTotal) {

    /* ********************* HTML ****************************** */
    changeDue.innerHTML = 'Insufficient Funds <hr /> Change total is: ' + changeSum/100 + '<hr />Total cash in drawer is: ' + cidTotal/100;

    cidAfter.innerHTML = '';
    /* ********************* END HTML ****************************** */
    return ('Insufficient Funds');

  } else if (changeSum === cidTotal) {
    /* ********************* HTML ****************************** */
    cid.map(function(val) {
      cidAfter.innerHTML = 'Closed <hr />';
    });
    /* ********************* END HTML ****************************** */

    changeArray = cid;
    
    /* ********************* HTML ****************************** */
    changeArray.forEach(function(val) {
      changeDue.innerHTML += val[1]/100 + '<hr />';
    });
    /* ********************* END HTML ****************************** */
    cidRemaining = [];
    return ('Closed');
  }

  // Loop:

  for (let i = 0; i <= cid.length - 1; i++) {

    if (i === 0) {
      category = 5000;
    } else if (i === 1) {
      category = 2000;
    } else if (i === 2) {
      category = 1000;
    } else if (i === 3) {
      category = 500;
    } else if (i === 4) {
      category = 200;
    } else if (i === 5) {
      category = 100;
    } else if (i === 6) {
      category = 50;
    } else if (i === 7) {
      category = 25;
    } else if (i === 8) {
      category = 10;
    } else if (i === 9) {
      category = 5;
    } else if (i === 10) {
      category = 2;
    } else if (i === 11) {
      category = 1;
    }
        
    if (changeTotal >= category) {
      // Calculate the change amount for every ctegory
      var currentChange = changeTotal - (changeTotal % category);

      // If there is enough cash in the drawer for this category 
      if (cid[i][1] >= currentChange) {

        // Add the currentChange amount to the change array
        //changeArray.push([cid[i][0], Number(currentChange)]);
        changeArray[i][1] = Number(currentChange);
        cidRemaining[i][1] -= currentChange;
      } else {
        // If cash in drawer isn't enough take what is found in that category
        currentChange = cid[i][1];
        // Ignore any category that has 0 value in the change array;
        if (cid[i][1] > 0) {
         // changeArray.push([cid[i][0], cid[i][1]]);
          changeArray[i][1] = cid[i][1];
          cidRemaining[i][1] = 0;
        }
      }
      // Substract the current change from the change total
       changeTotal -= currentChange;
    }
  }
  
  var changeArraySum = changeArray.reduce(function(acc, curr) {
    return acc + curr[1];
  }, 0);

// Convert cash into pounds again for a better user friendly interface
  for (let i = 0; i < changeArray.length; i++) {
    changeArray[i][1] /= 100;
    cidRemaining[i][1] /= 100;
  }


  if (changeArraySum < changeSum) {
    /* ********************* HTML ****************************** */
    changeDue.innerHTML = 'Insufficient Funds <hr> Change due is: ' + changeSum/100 + '<hr> The only available change is: ' + changeArraySum/100;
    cid.map(function(val) {
      cidAfter.innerHTML += val[1]/100 + '<hr />';
    });
    /* ********************* END HTML ****************************** */
    return 'Insufficient Funds';
  }


  /* ********************* HTML ****************************** */
  changeArray.map(function(val) {
    document.getElementById('change_due').innerHTML += val[1] + '<hr />';
  });

  cidRemaining.map(function(val) {
    if (val < 0) {
      changeDue.innerHTML = 'Insuffecient funds'
      cidAfter.innerHTML += val[1] + '<hr />';
    } else {
      cidAfter.innerHTML += val[1] + '<hr />';
    }

  });
  /* ********************* END HTML ****************************** */
 
  
  return changeArray;

}