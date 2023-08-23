//Создание массива объектов
let items = [
	{
		id: 1,
		name: 'Футболка UZcotton мужская',
		color: 'белый',
		size: '56',
		storage: 'Коледино WB',
		seller: 'ООО Вайлдберриз',
		price: 1051,
		img: './img/tshirt.jpg',
		max: 2,
		count: 1,
		discount: 0.55,
		isChecked: false,
		address: '42181, Московская область, г.о. Подольск, д. Коледино, тер. Индустриальный Парк Коледино, д. 6 стр. 1',
		ogrn: 5167746237148,
	},

	{
		id: 2,
		name: 'Силиконовый чехол картхолдер (отверстия) для карт, прозрачный кейс бампер на Apple iPhone XR, MobiSafe',
		color: 'прозрачный',
		storage: 'Коледино WB',
		seller: 'ООО Мегапрофстиль',
		price: 10000,
		img: './img/case.jpg',
		max: 4,
		count: 1,
		discount: 0.8,
		isChecked: false,
		address: '129337, Москва, улица Красная Сосна, 2, корпус 1, стр. 1, помещение 2, офис 34',
		ogrn: 5167746237148,
	},

	{
		id: 3,
		name: 'Карандаши цветные Faber-Castell "Замок", набор 24 цвета, заточенные, шестигранные, Faber-Castell',
		storage: 'Коледино WB',
		size: '56/54/52...',
		seller: 'ООО Вайлдберриз',
		price: 522,
		img: './img/pencils.jpg',
		max: 10,
		count: 1,
		discount: 0.55,
		isChecked: false,
		address: '42181, Московская область, г.о. Подольск, д. Коледино, тер. Индустриальный Парк Коледино, д. 6 стр. 1',
		ogrn: 5167746237148,
	},
]
// Функция подсчёта товаров в корзине
const displayCheckout = items => {
	const totalSum = document.querySelector('#total-sum')
	const totalOldPrice = document.querySelector('#oldprice-sum')
	const totalDiscount = document.querySelector('#total-discount')

	let oldSum = 0
	let discountSum = 0
	let sum = 0
	let count = 0

	items.forEach(item => {
		if (item.isChecked) {
			sum += Math.round(item.count * (item.price - item.price * item.discount))
			discountSum += Math.round(item.count * item.price * item.discount)
			oldSum += item.price * item.count
			count++
		}
	})

	totalSum.textContent = sum
	totalDiscount.textContent = `–${discountSum} сом`
	totalOldPrice.textContent = `${oldSum} сом`

	const counter = document.querySelector('#checkout-counter')
	counter.textContent = `${count} ${getNoun(count, 'товар', 'товара', 'товаров')}`
	updatePaymentButtonLabel(sum)
}
//Функция обновления статуса выбранных товаров
function updateItemCheckStatus(id) {
	const checkboxes = document.querySelectorAll('.checkbox')
	const mainCheckbox = document.querySelector('.checkbox')

	if (id === '0') {
		const isChecked = mainCheckbox.checked
		items = items.map(item => ({ ...item, isChecked }))
	} else {
		const idx = items.findIndex(item => item.id == id)
		items[idx].isChecked = checkboxes[idx + 1].checked

		mainCheckbox.checked = items.every(item => item.isChecked)
	}
	displayItem(items)
}
//Функция удаление товаров
function removeItem(rawId) {
	const id = rawId.replace('delete-', '')
	const idx = items.findIndex(item => item.id == id)
	items.splice(idx, 1)
	displayItem(items)
	displayUnavailableItems(items)
}

//Счётчик
function updateItemCount(rawId, diff) {
	const id = rawId.split('-')[1]

	items = items.map(item => ({
		...item,
		count: item.id == id ? Math.max(0, Math.min(item.max, item.count + diff)) : item.count,
	}))

	displayItem(items)
}

//Функция обновление кнопки оплаты
function updatePaymentButtonLabel(sum) {
	const checkbox = document.querySelector('.agreement-checkbox')
	const button = document.querySelector('.checkout__order-button')

	const updateButtonLabel = () => {
		button.innerHTML = checkbox.checked ? `Оплатить ${sum} сом` : 'Заказать'
	}

	checkbox.addEventListener('change', updateButtonLabel)
	updateButtonLabel()
}

//Функция вывода иконок
function iconsVisibility() {
	items.forEach(item => {
		const el = document.getElementById(`item-${item.id}`)
		const hiddenDiv = document.getElementById(`icons-${item.id}`)

		if (document.body.clientWidth > 800) {
			el.addEventListener('mouseenter', () => {
				hiddenDiv.style.display = 'flex'
			})

			el.addEventListener('mouseleave', () => {
				hiddenDiv.style.display = 'none'
			})
		}
	})
}

// Получение множественного числа
function getNoun(number, one, two, five) {
	const n = Math.abs(number) % 100
	if (n >= 5 && n <= 20) {
		return five
	}
	return [five, one, two, two, two][Math.min(n % 10, 4)]
}

//Функция вывода корзины товаров
const displayItem = items => {
	let cart = items
		.map((item, index, arr) => {
			return `
        <div class="cart-sections__item" id="item-${item.id}">
          <div class="cart-sections__item-info">
            <div class="cart-sections__image-wrapper">
              <input class="cart-sections__checkbox checkbox" id=${item.id} type="checkbox" onchange="updateItemCheckStatus(this.id)" ${
				item.isChecked ? 'checked' : ''
			}/> 
              <a class="cart-sections__image-link" href="#">
                <img class="cart-sections__item-image" src=${item.img} alt=${item.name}/>
              </a>
              ${
								item.size
									? `<div class="cart-sections__size-mobile-container"><p class="cart-sections__size-mobile-text">${item.size}</p></div>`
									: ''
							}
            </div>

            <div class="cart-sections__item-text">
              <div class="cart-sections__item-price-value-mobile">
                <p class="cart-sections__price-new">${Math.round(
									item.price * item.discount * item.count
								)}<span class="cart-sections__item-price-currency"> сом</span></p>
                <p class="cart-sections__price-old">${
									item.price * item.count
								} <span class="cart-sections__item-price-currency cart-sections__price-old">сом</span></p>
              </div>
              <h2 class="cart-sections__item-header">${item.name}</h2>
              <div class="cart-sections__item-properties properties-${item.color || item.size ? true : false}">
                <span class="cart-sections__text properties-${item.color ? true : false}">Цвет: ${item.color}</span>
                <span class="cart-sections__text item__size properties-${item.size ? true : false}">Размер: ${item.size}</span>
              </div>
              <div class="cart-sections__item-storage">
                <span class="cart-sections__text">${item.storage}</span>
                <div class="cart-sections__item-seller">
                  <span class="cart-sections__text">${item.seller}</span>
                  <svg class="cart-sections__info-icon icon-${item.id}" id="icon-${
				item.id
			}" width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="8" cy="8" r="7.5" stroke="#A0A0A4"/>
                    <path d="M7.88867 5.58691C7.62826 5.58691 7.41504 5.51042 7.24902 5.35742C7.08301 5.20117 7 5.01074 7 4.78613C7 4.55501 7.08301 4.36621 7.24902 4.21973C7.41504 4.07324 7.62826 4 7.88867 4C8.15234 4 8.36556 4.07324 8.52832 4.21973C8.69434 4.36621 8.77734 4.55501 8.77734 4.78613C8.77734 5.02051 8.69434 5.21257 8.52832 5.3623C8.36556 5.51204 8.15234 5.58691 7.88867 5.58691ZM8.65039 11.3779H7.10742V6.37793H8.65039V11.3779Z" fill="#A0A0A4"/>
                  </svg>
                  <p class="cart-sections__seller-tooltip" id="tooltip-${item.id}">
                    <span class="cart-sections__seller-tooltip-name">${item.seller}</span>
                    <span class="cart-sections__seller-tooltip-ogrn">ОГРН: ${item.ogrn} </span>
                    <span class="cart-sections__seller-tooltip-adress">${item.address}</span>
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div class="cart-sections__item-price">
            <div class="cart-sections__item-price-buttons">
              <div class="counter">
                <div class="counter__wrapper">
                  <button class="counter__button" onclick="updateItemCount(this.id, -1)" id="minus-${item.id}">–</button>
                  <input class="counter__input" type="number" value='${item.count}' id="count-${item.id}"/>
                  <button class="counter__button" onclick="updateItemCount(this.id, 1)" id="plus-${item.id}">+</button>
                </div>
              </div>
              <label class="cart-sections__item-price-label none-${item.max - item.count >= 5}" for="count">Осталось ${
				item.max - item.count
			} шт.</label>
              <div class="cart-sections__item-icons" id="icons-${item.id}">
							<img  class="cart-like" src="img/svg/cart-sections_item-like.svg" alt="cart-sections_item-like" class="cart-like">
							

                <svg class="cart-delete" id="delete-${
									item.id
								}" onclick="removeItem(this.id)" width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path fill-rule="evenodd" clip-rule="evenodd" d="M2.5 5C2.5 4.72386 2.72386 4.5 3 4.5H17C17.2761 4.5 17.5 4.72386 17.5 5C17.5 5.27614 17.2761 5.5 17 5.5H3C2.72386 5.5 2.5 5.27614 2.5 5Z" fill="black"/>
                  <path fill-rule="evenodd" clip-rule="evenodd" d="M3.4584 4.5H16.5059L15.6411 15.6926C15.5405 16.9947 14.4546 18 13.1486 18H6.84639C5.54299 18 4.45829 16.9986 4.35435 15.6994L3.4584 4.5ZM4.5416 5.5L5.35117 15.6196C5.41353 16.3992 6.06435 17 6.84639 17H13.1486C13.9322 17 14.5837 16.3968 14.6441 15.6155L15.4256 5.5H4.5416Z" fill="black"/>
                  <path fill-rule="evenodd" clip-rule="evenodd" d="M13 5.5H7V3.46875C7 2.65758 7.65758 2 8.46875 2H11.5312C12.3424 2 13 2.65758 13 3.46875V5.5ZM8.46875 3C8.20987 3 8 3.20987 8 3.46875V4.5H12V3.46875C12 3.20987 11.7901 3 11.5312 3H8.46875Z" fill="black"/>
                </svg>
              </div>
            </div>
            <div class="cart-sections__item-price-value">
              <p class="cart-sections__price-new">${Math.round(
								item.count * (item.price - item.price * item.discount)
							)} <span class="cart-sections__item-price-currency">сом</span></p>
              <div class="cart-sections__price-old-wrapper">
                <p class="cart-sections__price-old" id="price-tooltip-trigger-${item.id}"> ${
				item.price * item.count
			} <span class="cart-sections__item-price-currency cart-sections__price-old">сом</span></p>
                <div class="cart-sections__price-tooltip" id="price-tooltip-${item.id}">
                  <span class="cart-sections__price-tooltip-row">
                    <p class="cart-sections__price-tooltip-discount">Скидка ${Math.round(item.discount * 100)}%</p>
                    <p>–${Math.round(item.count * item.price * item.discount)} сом</p>
                  </span>
                  <span class="cart-sections__price-tooltip-row">
                    <p class="cart-sections__price-tooltip-discount" >Скидка покупателя 0%</p>
                    <p>-0 сом</p>
                  </span>
                </div>
              </div>
            </div>
          </div>
          
          ${index !== arr.length - 1 ? '<span class="section-list-split mobile-split"></span>' : ''}
        </div>`
		})
		.join('')

	const cartContainer = document.querySelector('.cart-sections__items-list')

	cartContainer.innerHTML = cart
	iconsVisibility()
	setupSellerTooltips()
	PriceHandler()
	displayCheckout(items)
	setCounter()
	cartLabelCounter()
}
//Функция вывода отсутствующих товаров в корзине
const displayUnavailableItems = items => {
	let cart = items
		.map((item, index, arr) => {
			return `
    <div class="cart-sections__item" id="item-${item.id}">
      <div class="cart-sections__item-info cart-page__item-info--disabled">
        <div class="cart-sections__image-wrapper">
          <a class="cart-sections__image-link" href="#">
            ${
							item.size
								? `<div class="cart-sections__size-mobile-container"><p class="cart-sections__size-mobile-text">${item.size}</p></div>`
								: ''
						}
            <img class="cart-sections__item-image cart-page__item-image--disabled" src="${item.img}" alt="${item.name}"/>
          </a>
        </div>

        <div class="cart-sections__item-text">
          <h2 class="cart-sections__item-header">${item.name}</h2>
              <div class="cart-sections__item-properties properties-${item.color || item.size ? true : false}">
                <span class="cart-sections__text properties-${item.color ? true : false}">Цвет: ${item.color}</span>
                <span class="cart-sections__text item__size properties-${item.size ? true : false}">Размер: ${item.size}</span>
              </div>
        </div>
      </div>
      <div class="cart-sections__item-price">
        <div class="cart-sections__item-price-buttons buttons-unavailable">
          <div class="cart-sections__item-icons" id="icons-${item.id}">
					<img src="img/svg/cart-sections_item-like.svg" alt="cart-sections_item-like" class="cart-like">
					<img src="img/svg/cart-sections_item-del.svg" alt="cart-sections_item-del">
          </div>
        </div>
        <div class="cart-sections__item-price-value">
        </div>
      </div>
       ${index !== arr.length - 1 ? '<span class="section-list-split mobile-split"></span>' : ' '}
    </div>
    `
		})
		.join('')

	const cartEmptyContainer = document.querySelector('.items-unavailable')
	cartEmptyContainer.innerHTML = cart

	iconsVisibility()
	PriceHandler()
}

//Функция сворачивание объектов
document.addEventListener('DOMContentLoaded', () => {
	displayItem(items)
	displayUnavailableItems(items)
	PriceHandler()
	PaymentHandler()
	checkoutPaymentHandler()
	openPaymentModal()
	closePaymentModal()
	closeDeliveryModal()
	openDeliveryModal()
	cartLabelCounter()

	const acc = document.getElementsByClassName('list-button')
	let panel = document.getElementsByClassName('cart-sections__items-list')

	for (let i = 0; i < acc.length; i++) {
		acc[i].addEventListener('click', function () {
			this.classList.toggle('list-button-active')

			if (panel[i].style.display !== 'none') {
				panel[i].style.display = 'none'
			} else {
				panel[i].style.display = 'flex'
			}
		})
	}

	const userForm = document.getElementById('user-form')

	userForm.addEventListener('submit', function (event) {
		event.preventDefault()
		inputValidationSubmit(this)
	})

	userForm.querySelectorAll('input').forEach(input => {
		input.addEventListener('blur', function (event) {
			handleInputValidation(input)
		})
	})
})

//Всплывающие о товаре
function setupSellerTooltips() {
	items.forEach(item => {
		const tooltip = document.getElementById(`tooltip-${item.id}`)
		const icon = document.getElementById(`icon-${item.id}`)

		icon.addEventListener('mouseover', () => {
			tooltip.style.display = 'inherit'
		})

		icon.addEventListener('mouseout', () => {
			tooltip.style.display = 'none'
		})
	})
}

function PaymentHandler() {
	const tooltip = document.getElementById(`form-payment-tooltip`)
	const icon = document.getElementById(`form-payment-tooltip-trigger`)

	icon.addEventListener('mouseenter', () => {
		tooltip.style.display = 'inherit'
	})

	icon.addEventListener('mouseleave', () => {
		tooltip.style.display = 'none'
	})
}
function checkoutPaymentHandler() {
	const tooltip = document.getElementById(`checkout-payment-tooltip`)
	const icon = document.getElementById(`checkout__tooltip-payment-trigger`)

	icon.addEventListener('mouseenter', () => {
		tooltip.style.display = 'inherit'
	})

	icon.addEventListener('mouseleave', () => {
		tooltip.style.display = 'none'
	})
}

function PriceHandler() {
	items.forEach(item => {
		const tooltip = document.getElementById(`price-tooltip-${item.id}`)
		const icon = document.getElementById(`price-tooltip-trigger-${item.id}`)

		icon.addEventListener('mouseenter', () => {
			tooltip.style.display = 'flex'
		})

		icon.addEventListener('mouseleave', () => {
			tooltip.style.display = 'none'
		})
	})
}
//Подсчёт отмеченных товаров
function setCounter() {
	items.forEach(item => {
		const counterValue = document.querySelector(`#count-${item.id}`)
		const counterPlus = document.querySelector(`#plus-${item.id}`)
		const counterMinus = document.querySelector(`#minus-${item.id}`)

		counterPlus.classList.toggle('disabled', counterValue.value == item.max)
		counterMinus.classList.toggle('disabled', counterValue.value == 0)
	})
}

//вывод ошибок в инпутах
function handleInputValidation(input) {
	const labels = {
		email: document.querySelector('#email-label'),
		phone: document.querySelector('#phone-label'),
		inn: document.querySelector('#inn-label'),
	}

	function setError(input, errorLabelText, label) {
		input.classList.add('error')
		label.style.color = 'red'
		label.innerHTML = errorLabelText
	}

	function clearError(input, label) {
		if (input.classList.contains('error')) {
			input.classList.remove('error')
			label.innerHTML = ' '
			label.style.color = 'black'
		}
	}

	const inputValue = input.value.trim()
	const label = labels[input.id]

	switch (input.id) {
		case 'email':
			const emailRegex =
				/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
			if (inputValue === '' || emailRegex.test(inputValue.toLowerCase())) {
				clearError(input, label)
			} else {
				setError(input, 'Проверьте адрес электронной почты', label)
			}
			break

		case 'phone':
			const phoneRegex = /^(\+)?((\d{2,3}) ?\d|\d)(([ -]?\d)|( ?(\d{2,3}) ?)){5,12}\d$/
			if (inputValue === '' || phoneRegex.test(inputValue)) {
				clearError(input, label)
			} else {
				setError(input, 'Формат: +7 999 999 99 99', label)
			}
			break

		case 'inn':
			if (inputValue === '') {
				clearError(input, label)
				label.innerHTML = 'Для таможенного управления'
			} else if (inputValue.length !== 14) {
				setError(input, 'Проверьте ИНН', label)
			} else {
				clearError(input, label)
				label.style.color = 'black'
				label.innerHTML = 'Для таможенного управления'
			}
			break
	}
}
//вывод ошибок после триггера кнопки опалты
function inputValidationSubmit(form) {
	const labels = {
		name: document.querySelector('#name-label'),
		surname: document.querySelector('#surname-label'),
		email: document.querySelector('#email-label'),
		phone: document.querySelector('#phone-label'),
		inn: document.querySelector('#inn-label'),
	}

	function setError(input, errorLabelText, label) {
		input.classList.add('error')
		label.innerHTML = errorLabelText
		label.style.color = 'red'
		window.scrollTo(0, document.body.scrollHeight)
	}

	function clearError(input, label) {
		if (input.classList.contains('error')) {
			input.classList.remove('error')
			label.innerHTML = ' '
		}
	}

	form.querySelectorAll('input').forEach(input => {
		const inputValue = input.value.trim()
		const label = labels[input.id]

		switch (input.id) {
			case 'name':
				if (inputValue === '') {
					setError(input, `Укажите имя`, label)
				} else {
					clearError(input, label)
				}
				break
			case 'surname':
				if (inputValue === '') {
					setError(input, `Укажите фамилию`, label)
				} else {
					clearError(input, label)
				}
				break

			case 'email':
				const emailRegex =
					/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
				if (inputValue === '') {
					setError(input, 'Укажите адрес электронной почты', label)
				} else if (emailRegex.testinputValue.toLowerCase()) {
					clearError(input, label)
				} else {
					setError(input, 'Проверьте адрес электронной почты', label)
				}
				break

			case 'phone':
				const phoneRegex = /^(\+)?((\d{2,3}) ?\d|\d)(([ -]?\d)|( ?(\d{2,3}) ?)){5,12}\d$/
				if (inputValue === '') {
					setError(input, 'Укажите телефон', label)
				} else if (phoneRegex.test(inputValue)) {
					clearError(input, label)
				} else {
					setError(input, 'Формат: +7 999 999 99 99', label)
				}
				break

			case 'inn':
				if (inputValue === '') {
					setError(input, 'Укажите ИНН', label)
				} else if (inputValue.length !== 14) {
					setError(input, 'Проверьте ИНН', label)
				} else {
					clearError(input, label)
				}
				break
		}
	})
}
//Открытие модалки оплата
function openPaymentModal() {
	const modal = document.querySelector('.modal-payment')
	const openText = document.querySelector('.payment-button-text')
	const open = document.querySelector('.payment-button')

	open.addEventListener('click', () => {
		modal.style.display = 'flex'
	})

	openText.addEventListener('click', () => {
		modal.style.display = 'flex'
	})
}
//Закрытие модалки оптала
function closePaymentModal() {
	const close = document.querySelector('#closePayment')
	const modal = document.querySelector('.modal-payment')
	const overlay = document.querySelector('.modal-overlay')

	close.addEventListener('click', () => {
		console.log('enter')
		modal.style.display = 'none'
	})

	overlay.addEventListener('click', () => {
		console.log('enter')
		modal.style.display = 'none'
	})
}
//Открытие модалки деливери
function openDeliveryModal() {
	const modal = document.querySelector('.modal-delivery')
	const openText = document.querySelector('.delivery-button-text')
	const open = document.querySelector('.delivery-button')

	open.addEventListener('click', () => {
		modal.style.display = 'flex'
	})

	openText.addEventListener('click', () => {
		modal.style.display = 'flex'
	})
}
//Закрытие модалки деливери
function closeDeliveryModal() {
	const close = document.querySelector('#closeDelivery')
	const modal = document.querySelector('.modal-delivery')
	const overlay = document.querySelector('.modal-overlay')
	const deliveryButton = document.querySelector('#delivery-button')

	close.addEventListener('click', () => {
		console.log('enter')
		modal.style.display = 'none'
	})

	overlay.addEventListener('click', () => {
		console.log('enter')
		modal.style.display = 'none'
	})

	deliveryButton.addEventListener('click', () => {
		console.log('enter')
		modal.style.display = 'none'
	})
}
//подсчёт товаров в корзине header
function cartLabelCounter() {
	const counter = document.querySelector('.cart-count')
	const mobileCounter = document.querySelector('.mobile-count')
	let activeCount = 0

	const getActiveCount = items => {
		items.forEach(item => {
			if (item.isChecked) {
				activeCount++
			}
		})
	}

	getActiveCount(items)

	counter.innerHTML = `${activeCount}`
	mobileCounter.innerHTML = `${activeCount}`
}
