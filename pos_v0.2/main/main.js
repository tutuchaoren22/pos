'use strict';

function printReceipt(inputs) {
    const shoppingList = getAllItems(inputs);
    const summary = summaryAllItems(shoppingList);
    const result = printAllItems(shoppingList, summary);
    console.log(result);
}

function getAllItems(inputs) {
    const allItems = loadAllItems();
    const shoppingListNoCount = inputs.map(
        input => {
            var findInput = allItems.find(id => id.barcode === input);
            return findInput;
        })
    const shoppingListWithCount = shoppingListNoCount.reduce(
        (obj, item) => {
            let find = obj.find(i => i.barcode === item.barcode)
            let _d = {
                ...item,
                count: 1
            }
            find ? find.count++ : obj.push(_d);
            return obj;
        }, [])
    const shoppingList = shoppingListWithCount.map(
        input => {
            input.total = input.count * input.price;
            return input;
        })
    return shoppingList;
}

function summaryAllItems(shoppingList) {
    let totalPrice = 0;
    for (let i of shoppingList) {
        totalPrice += i.total;
    }
    return totalPrice;
}

function printAllItems(shoppingList, summary) {
    let result = `***<没钱赚商店>收据***\n`;
    shoppingList.forEach(
        item => {
            return result += `名称：${item.name}，数量：${item.count}${item.unit}，单价：${item.price.toFixed(2) }(元)，小计：${item.total.toFixed(2)}(元)\n`
        }
    );
    result += `----------------------\n总计：${summary.toFixed(2)}(元)\n**********************`;
    return result;
}

function loadAllItems() {
    return [{
            barcode: 'ITEM000000',
            name: '可口可乐',
            unit: '瓶',
            price: 3.00
        },
        {
            barcode: 'ITEM000001',
            name: '雪碧',
            unit: '瓶',
            price: 3.00
        },
        {
            barcode: 'ITEM000002',
            name: '苹果',
            unit: '斤',
            price: 5.50
        },
        {
            barcode: 'ITEM000003',
            name: '荔枝',
            unit: '斤',
            price: 15.00
        },
        {
            barcode: 'ITEM000004',
            name: '电池',
            unit: '个',
            price: 2.00
        },
        {
            barcode: 'ITEM000005',
            name: '方便面',
            unit: '袋',
            price: 4.50
        }
    ];
}