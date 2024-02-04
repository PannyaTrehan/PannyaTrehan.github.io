let total = 0;
let purchases = [];
var selectedItems = [];

document.addEventListener('DOMContentLoaded', function() {
    // Product prices
    const prices = {
        womenHaircut: 15,
        menHaircut: 12,
        kidsHaircut: 10,
        womenHairColour: 55,
        rootTouchUp: 30,
        facial: 25,
        threading: 15,
        eyebrows: 7,
        waxingUnderArm: 8,
        waxingFullArms: 18,
        waxingFullLegs: 25,
        waxingHalfLegs: 20,
        waxingFullTummy: 25,
        waxingFullBack: 25,
        waxingFullFace: 20
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
        priceElement.textContent = `Price: $${total}`;
        gstElement.textContent = `GST (15%): $${gst.toFixed(2)}`;
        totalElement.textContent = `Total: $${totalPrice.toFixed(2)}`;
    }
});
