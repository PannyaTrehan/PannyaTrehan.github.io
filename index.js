let total = 0;
let purchases = [];
var selectedItems = [];

document.addEventListener('DOMContentLoaded', function() {
    // Product prices
    const prices = {
        womenHaircut: 20,
        womenFringeCut: 8,
        menHaircut: 15,
        seniorCitizen: 12,

        regrowth: 45,
        womenFullHairColour: 60,
        mensHairColour: 60,
        hennaColour: 20,
        amoniaFee: 7,

        faceBleaching: 10,
        backBleaching: 10,
        faceCleansing: 25,
        VLCCgold: 40,
        fruitFacial: 40,
        partyGlow: 40,
        goldBerry: 45,
        lotusFacial: 45,
        diamondBerry: 50,
        shehnazGold: 60,
        O3Facial: 50,
        wineFacial: 50,
        kayaKalapDiamond: 70,
        kayaKalapWhitening: 60,

        keratinShort: 175,
        keratinMedium: 220,
        keratinLong: 370,

        hairSpaShort: 30,
        hairSpaMedium: 40,
        hairSpaLong: 50,

        foilsHalfHead: 130,
        foilsFullHead: 165,
        foils34Head: 140,

        threadingEyebrows: 7,
        threadingUpperLip: 5,
        threadingChin: 5,
        threadingForehead: 5,

        balayage: 175,

        waxingUnderArm: 10,
        waxingFullArms: 18,
        waxinghalfArms: 15,
        waxingFullLegs: 25,
        waxingHalfLegs: 20,
        waxingFullTummy: 25,
        waxingFullBack: 25,
        waxingFullFace: 20,
        waxingSideLocks: 10,
        waxingFullBody: 90,
    };

    // Event listener for product buttons
    const productButtons = document.querySelectorAll('.product');
    console.log(productButtons);
    productButtons.forEach(button => {
        button.addEventListener('click', function() {
            const productId = this.id;
            const productName = this.textContent;
            const productPrice = prices[productId];

            selectedItems.push({ name: productName, price: productPrice });

            addPurchase(productId);
            updateTotal(productPrice);
            updateReceipt();
            updatePrice();
        });
    });

    const clearButton = document.querySelectorAll('#clear');
    clearButton.forEach(button => {
        button.addEventListener('click', function() {
            clear();
        });
    });

    function updateTotal(price) {
        total += price;
    }

    function addPurchase(purchase) {
        purchases.push(purchase);
    }

    function clear() {
        total = 0;
        purchases.length = 0;
        selectedItems.length = 0;
        updateReceipt();
        updatePrice();
    }

    function updateReceipt() {
        const receiptList = document.getElementById('receiptList');
        receiptList.innerHTML = '';
    
        selectedItems.forEach((item, index) => {
            const listItem = document.createElement('li');
            listItem.innerHTML = `<span>${item.name}...$${item.price}</span> <button class="removeItem" data-index="${index}">Remove</button>`;
            receiptList.appendChild(listItem);
        });
    
        // Add event listeners for remove buttons
        const removeButtons = document.querySelectorAll('.removeItem');
        removeButtons.forEach(button => {
            button.addEventListener('click', function() {
                const indexToRemove = parseInt(this.getAttribute('data-index'));
                removeItem(indexToRemove);
            });
        });
    }

    function removeItem(index) {
        const removedItem = selectedItems.splice(index, 1)[0];
        total -= removedItem.price;
        updateReceipt();
        updatePrice();
    }

    // Function to update the displayed price
    function updatePrice() {
        const priceElement = document.getElementById('Price');
        const gstElement = document.getElementById('GST');
        const totalElement = document.getElementById('Total');

        // Assuming GST is 15%
        const gst = total * 0.1;
        const totalPrice = total + gst;

        // Update HTML elements
        priceElement.textContent = `Price: $${total.toFixed(2)}`;
        gstElement.textContent = `GST (10%): $${gst.toFixed(2)}`;
        totalElement.textContent = `Total: $${totalPrice.toFixed(2)}`;
    }
});
