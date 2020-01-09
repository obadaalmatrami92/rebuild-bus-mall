`use strict`;

function Item(title, src) {
    this.title = title;
    this.src = src;
    this.clickcounter = 0;
    this.showncounter = 0;
    Item.all.push(this);
}

Item.counterround = 0;
Item.roundLimit = 25;

Item.all = [];

Item.left = null;
Item.center = null;
Item.right = null;

new Item('Bag', 'images/bag.jpg');
new Item('Banana', 'images/banana.jpg');
new Item('Bathroom', 'images/bathroom.jpg');
new Item('Boots', 'images/boots.jpg');
new Item('breakfast', 'images/breakfast.jpg');
new Item('bubblegum', 'images/bubblegum.jpg');
new Item('chair', 'images/chair.jpg');
new Item('cthulhu', 'images/cthulhu.jpg');
new Item('dog-duck', 'images/dog-duck.jpg');
new Item('dragon', 'images/dragon.jpg');
new Item('pen', 'images/pen.jpg');
new Item('pet-sweep', 'images/pet-sweep.jpg');
new Item('scissors', 'images/scissors.jpg');
new Item('shark', 'images/shark.jpg');
new Item('sweep', 'images/sweep.png');
new Item('tauntaun', 'images/tauntaun.jpg');
new Item('unicorn', 'images/unicorn.jpg');
new Item('usb', 'images/usb.gif');
new Item('water-can', 'images/water-can.jpg');
new Item('wine-glass', 'images/wine-glass.jpg');

function itemrender() {
    let seen = [Item.left, Item.center, Item.right]

    do {
        Item.left = randomitems();
    } while (seen.includes(Item.left));
    seen.push(Item.left)

    do {
        Item.center = randomitems();
    } while (seen.includes(Item.center));
    seen.push(Item.center)

    do {
        Item.right = randomitems()
    } while (seen.includes(Item.right));
    seen.push(Item.right);

    Item.left.showCtr++;
    Item.center.showCtr++;
    Item.right.showCtr++;

    $('#left-image').attr('src', Item.left.src);
    $('#left-image').attr('alt', Item.left.title);
    $('#left-title').text(Item.left.title);

    $('#center-image').attr('src', Item.center.src);
    $('#center-image').attr('alt', Item.center.title);
    $('#center-title').text(Item.center.title);

    $('#right-image').attr('src', Item.right.src);
    $('#right-image').attr('alt', Item.right.title);
    $('#right-title').text(Item.right.title);
}

itemrender();

function randomitems() {
    let randomIndex = Math.floor(Math.random() * Item.all.length);
    return Item.all[randomIndex]
}

function renderList() {

    $('#information').html('');

    for (let i = 0; i < Item.all.length; i++) {

        let oneItem = Item.all[i];
        let content = `${oneItem.title} had ${oneItem.clickCtr} votes and was shown ${oneItem.showCtr} times`

        $('#information').append(`<li class = "${oneItem.title}">${content}</li>`);
    }
}

$('#contant').click(function(event) {
    event.preventDefault();

    let clicked = event.target.id;
    let chosen;
    setItem();

    if (clicked === 'left-image') {
        chosen = Item.left;
    } else if (clicked === 'center-image') {
        chosen = Item.center
    } else if (clicked === 'right-image') {
        chosen = Item.right;
    } else {
        alert('please click on image of any item you want it  thank you ');
    }

    if (chosen) {
        chosen.clickCtr++;
        Item.counterround++;

        renderList()

        if (Item.counterround === Item.roundLimit) {
            alert('we allow you to click a specific number of clicks please click again')
            renderChart();
            $('#contant').off('click')
        } else {
            itemrender();
        }
    }
});

function renderChart() {


    let titleArr = [];
    let clickArr = [];
    let showArr = [];

    for (let i = 0; i < Item.all.length; i++) {
        let currentItem = Item.all[i];
        titleArr.push(currentItem.title);
        clickArr.push(currentItem.clickCtr)
        showArr.push(currentItem.showCtr)
    }

    var ctx = document.getElementById('Chart').getContext('2d');
    var chart = new Chart(ctx, {
        type: 'radar',
        data: {
            labels: ['bag', 'banana', 'bathroom', 'boots', 'breakfast', 'bubblegum', 'chair', 'cthulhu', 'dog-duck ',
                'dragon', 'pen', 'pet-sweep', 'scissors', 'shark', 'sweep', 'tauntaun', 'unicorn', 'usb', 'water-can', 'wine-glass'
            ],
            datasets: [{
                    label: 'Item Vote',
                    backgroundColor: 'white',
                    borderColor: 'black',
                    data: clickArr,
                },
                {
                    label: 'Item Shown',
                    backgroundColor: 'blue',
                    borderColor: 'black',
                    data: showArr,
                }
            ],
            options: {}
        }
    });
}


function getitem() {
    let storedData = JSON.parse(localStorage.getItem('product'))
    if (storedData) {
        Item.all = storedData;
    }

    renderList();
}

function setItem() {
    let productString = JSON.stringify(Item.all)
    localStorage.setItem('product', JSON.stringify(Item.all))
}


renderList();
itemrender();
getitem();