function createDiv(id, itemDescription, itemValue,flag){
    var div = document.createElement("div");
    div.setAttribute("class", "item clearfix");
    if(flag == 0){
        div.setAttribute("id" , "income-" + id);
    }else{
        div.setAttribute("id" , "expense-" + id);
    }
    divWithItemDescription = document.createElement("div");
    divWithItemDescription.setAttribute("class","item__description");
    divWithItemDescription.innerHTML = itemDescription;
    div.appendChild(divWithItemDescription);
    rightClearfix = document.createElement("div");
    rightClearfix.setAttribute("class","right clearfix");
    divWithItemValue = document.createElement("div");
    divWithItemValue.setAttribute("class","item__value");
    divWithItemValue.innerHTML = itemValue;
    divWithPercentage = document.createElement("div");
    if(flag == 1){
        divWithPercentage.setAttribute("class","budget__expenses--percentage");
    }else{
        divWithPercentage.setAttribute("class","budget__income--percentage");
    }
    divItemDelete = document.createElement("div");
    divItemDelete.setAttribute("class", "item__delete");
    divDelButton = document.createElement("div");
    divDelButton.setAttribute("class","item__delete--btn");
    divOutline = document.createElement("i");
    divOutline.setAttribute("class","ion-ios-close-outline");
    divDelButton.append(divOutline);
    divItemDelete.appendChild(divDelButton);
    rightClearfix.appendChild(divWithItemValue);
    rightClearfix.appendChild(divItemDelete);
    rightClearfix.appendChild(divWithPercentage);
    div.appendChild(rightClearfix);
    return div;
}

var budgetController = {
    totalIncome : 0,
    totalExpenses : 0,
    addDataToTop : function(){
        this.totalIncome = Math.round(this.totalIncome * 100) /100;
        this.totalExpenses = Math.round(this.totalExpenses * 100)/100;
        var BUDGET = Math.round((this.totalIncome - this.totalExpenses)*100)/100;
        var sign = "+ ";
        if(BUDGET < 0){
            sign = "";
        }
        console.log(this.totalIncome);
        if(this.totalIncome != 0){
            var percentage = Math.round((this.totalExpenses/this.totalIncome)*100,2);
        }else if(this.totalIncome == 0 && this.totalExpenses == 0){
            var percentage = 0; 
        }else{
            var percentage = 100;
        }
        document.querySelector(".budget__income--value").innerHTML = this.totalIncome.toString();
        document.querySelector(".budget__expenses--value").innerHTML = this.totalExpenses.toString();
        document.querySelector(".budget__value").innerHTML = sign + BUDGET.toString();
        document.querySelector(".budget__expenses--percentage").innerHTML = percentage + "%";
    },
}

var uiController = {
    incomeLength : 0,
    expenseLength : 0,
    addDataToIncome : function(description,value){
        value = "+ " + value;
        incomeDiv = document.querySelector(".income__list");
        devCreated = createDiv(this.incomeLength++,description,value,0);
        devCreated.querySelector(".item__delete--btn").addEventListener("click", function(event){
            value = event.path[4].querySelector(".item__value").innerHTML;
            value = parseInt(value.substring(2));
            budgetController.totalIncome = budgetController.totalIncome - value;
            event.path[4].remove();
            budgetController.addDataToTop();
        });
        incomeDiv.appendChild(devCreated);
    },
    addDataToExpense : function(description,value){
        value = "- " + value;
        expenseDev = document.querySelector(".expenses__list");
        devCreated = createDiv(this.expenseLength++,description,value,1);
        devCreated.querySelector(".item__delete--btn").addEventListener("click", function(event){
            value = event.path[4].querySelector(".item__value").innerHTML;
            value = parseInt(value.substring(2));
            budgetController.totalExpenses = budgetController.totalExpenses - value;
            event.path[4].remove();
            budgetController.addDataToTop();
        });
        expenseDev.appendChild(devCreated);
    },
}

var controller = (function(uiController,budgetController){
    function checkTheData(){
        description = document.querySelector(".add__description");
        budget = document.querySelector(".add__value");
        if(description.value && budget.value){
            var selectedValue = document.querySelector(".add__type").selectedIndex;
            if(selectedValue == 0){
                budgetController.totalIncome = budgetController.totalIncome + parseFloat(budget.value);
                uiController.addDataToIncome(description.value,budget.value);
            }else{
                budgetController.totalExpenses = budgetController.totalExpenses + parseFloat(budget.value);
                uiController.addDataToExpense(description.value,budget.value);
            }
            budgetController.addDataToTop();
        }else{
            window.alert("Enter the Description and Budget in respected feilds");
        }
    }
    document.querySelector(".add__btn").addEventListener("click", checkTheData);
    document.querySelector(".add").addEventListener("keypress" , function(event){
        if(event.keyCode == 13){
            checkTheData();
        }
    });
})(uiController,budgetController);