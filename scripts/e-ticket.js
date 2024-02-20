

let selectCount = 0;
let remainingSeats = 40;
let totalPrice = 0;
let grandTotal = 0;
let discount = 0;

function seatAction(event) {
    if (event.target.classList.value.split(' ').includes('bg-[#1DD100]')) {
        seatUnselected(event.target);
    } else {
        seatSelected(event.target);
    }
}

function seatSelected(element) {
    if (selectCount >= 4) {
        alert("You can't book more than 4 seats!");
        return;
    }

    element.classList.add('bg-[#1DD100]', 'text-white');
    element.classList.remove('bg-[#F7F8F8]');

    selectCount++;
    document.getElementById('select-count').innerText = selectCount;

    if (selectCount === 4) {
        document.getElementById('apply-coupon').removeAttribute('disabled');
    }

    remainingSeats--;
    document.getElementById('remaining-seats').innerText = remainingSeats + ' Seats left';

    const newSeat = document.createElement('div');
    newSeat.setAttribute('class', 'flex justify-between');
    newSeat.setAttribute('id', `${element.innerText}`);
    newSeat.innerHTML = `<p>${element.innerText}</p><p>Economy</p><p>550</p>`;
    document.getElementById('selected-list').appendChild(newSeat);

    totalPrice += 550;
    grandTotal = totalPrice;

    document.getElementById('total-price').innerText = totalPrice;
    document.getElementById('grand-total').innerText = grandTotal;
}

function seatUnselected(element) {
    element.classList.remove('bg-[#1DD100]', 'text-white');
    element.classList.add('bg-[#F7F8F8]');

    if (selectCount === 4) {
        document.getElementById('apply-coupon').setAttribute('disabled', true);
    }

    selectCount--;
    document.getElementById('select-count').innerText = selectCount;

    remainingSeats++;
    document.getElementById('remaining-seats').innerText = remainingSeats + ' Seats left';

    const deleteSeat = document.getElementById(`${element.innerText}`);
    document.getElementById('selected-list').removeChild(deleteSeat);

    totalPrice -= 550;
    grandTotal = totalPrice;

    document.getElementById('total-price').innerText = totalPrice;
    document.getElementById('grand-total').innerText = grandTotal;
}

function applyCoupon() {
    if (selectCount >= 2) {
        const couponCode = document.getElementById('type-coupon').value.trim();
        if (couponCode === 'NEW15') {
            discount = totalPrice * 0.15;
            discountCalculation();
        } else if (couponCode === 'Couple 20') {
            discount = totalPrice * 0.20;
            discountCalculation();
        } else {
            alert('Invalid coupon code!');
        }
    } else {
        alert('Minimum 2 seats need to be selected to apply the coupon!');
    }
}



function discountCalculation() {
    grandTotal -= discount;
    document.getElementById('grand-total').innerText = grandTotal;
    document.getElementById('coupon-container').classList.add('hidden');

    const discountElement = document.createElement('div');
    discountElement.setAttribute('class', 'text-base font-medium flex justify-between mb-4 text-green-500');
    discountElement.innerHTML = `<p>Discount</p><p>BDT -<span>${discount}</span></p>`;
    document.getElementById('total-discount-container').appendChild(discountElement);
}

function confirm() {
    if (selectCount > 0 && document.getElementById('number-input').value.length > 0) {
        my_modal_1.showModal();
    } else {
        alert("Select a seat and fill the form.");
    }
}

