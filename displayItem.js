export const displayItem = items => {
	let cart = items
		.map((item, index, arr) => {
			return `
        <div class="cart-form__item" id="item-${item.id}">
          <div class="cart-form__item-info">
            <div class="cart-form__image-wrapper">
              <input class="cart-form__checkbox checkbox" id=${item.id} type="checkbox" onchange="handleCheckboxChange(this.id)" ${
				item.isChecked ? 'checked' : ''
			}/> 
              <a class="cart-form__image-link" href="#">
                <img class="cart-form__item-image" src=${item.img} alt=${item.name}/>
              </a>
              ${
								item.size
									? `<div class="cart-form__size-mobile-container"><p class="cart-form__size-mobile-text">${item.size}</p></div>`
									: ''
							}
            </div>

            <div class="cart-form__item-text">
              <div class="cart-form__item-price-value-mobile">
                <p class="cart-form__price-new">${Math.round(
									item.price * item.discount * item.count
								)}<span class="cart-form__item-price-currency"> сом</span></p>
                <p class="cart-form__price-old">${
									item.price * item.count
								} <span class="cart-form__item-price-currency cart-form__price-old">сом</span></p>
              </div>
              <h2 class="cart-form__item-header">${item.name}</h2>
              <div class="cart-form__item-properties properties-${item.color || item.size ? true : false}">
                <span class="cart-form__text properties-${item.color ? true : false}">Цвет: ${item.color}</span>
                <span class="cart-form__text item__size properties-${item.size ? true : false}">Размер: ${item.size}</span>
              </div>
              <div class="cart-form__item-storage">
                <span class="cart-form__text">${item.storage}</span>
                <div class="cart-form__item-seller">
                  <span class="cart-form__text">${item.seller}</span>
                  <svg class="cart-form__info-icon icon-${item.id}" id="icon-${
				item.id
			}" width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="8" cy="8" r="7.5" stroke="#A0A0A4"/>
                    <path d="M7.88867 5.58691C7.62826 5.58691 7.41504 5.51042 7.24902 5.35742C7.08301 5.20117 7 5.01074 7 4.78613C7 4.55501 7.08301 4.36621 7.24902 4.21973C7.41504 4.07324 7.62826 4 7.88867 4C8.15234 4 8.36556 4.07324 8.52832 4.21973C8.69434 4.36621 8.77734 4.55501 8.77734 4.78613C8.77734 5.02051 8.69434 5.21257 8.52832 5.3623C8.36556 5.51204 8.15234 5.58691 7.88867 5.58691ZM8.65039 11.3779H7.10742V6.37793H8.65039V11.3779Z" fill="#A0A0A4"/>
                  </svg>
                  <p class="cart-form__seller-tooltip" id="tooltip-${item.id}">
                    <span class="cart-form__seller-tooltip-name">${item.seller}</span>
                    <span class="cart-form__seller-tooltip-ogrn">ОГРН: ${item.ogrn} </span>
                    <span class="cart-form__seller-tooltip-adress">${item.address}</span>
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div class="cart-form__item-price">
            <div class="cart-form__item-price-buttons">
              <div class="counter">
                <div class="counter__wrapper">
                  <button class="counter__button" onclick="handleCountChange(this.id, -1)" id="minus-${item.id}">–</button>
                  <input class="counter__input" type="number" value='${item.count}' id="count-${item.id}"/>
                  <button class="counter__button" onclick="handleCountChange(this.id, 1)" id="plus-${item.id}">+</button>
                </div>
              </div>
              <label class="cart-form__item-price-label none-${item.max - item.count >= 5}" for="count">Осталось ${
				item.max - item.count
			} шт.</label>
              <div class="cart-form__item-icons" id="icons-${item.id}">
							<img  class="cart-like" src="img/svg/cart-form_item-like.svg" alt="cart-form_item-like" class="cart-like">
							

                <svg class="cart-delete" id="delete-${
									item.id
								}" onclick="handleDelete(this.id)" width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path fill-rule="evenodd" clip-rule="evenodd" d="M2.5 5C2.5 4.72386 2.72386 4.5 3 4.5H17C17.2761 4.5 17.5 4.72386 17.5 5C17.5 5.27614 17.2761 5.5 17 5.5H3C2.72386 5.5 2.5 5.27614 2.5 5Z" fill="black"/>
                  <path fill-rule="evenodd" clip-rule="evenodd" d="M3.4584 4.5H16.5059L15.6411 15.6926C15.5405 16.9947 14.4546 18 13.1486 18H6.84639C5.54299 18 4.45829 16.9986 4.35435 15.6994L3.4584 4.5ZM4.5416 5.5L5.35117 15.6196C5.41353 16.3992 6.06435 17 6.84639 17H13.1486C13.9322 17 14.5837 16.3968 14.6441 15.6155L15.4256 5.5H4.5416Z" fill="black"/>
                  <path fill-rule="evenodd" clip-rule="evenodd" d="M13 5.5H7V3.46875C7 2.65758 7.65758 2 8.46875 2H11.5312C12.3424 2 13 2.65758 13 3.46875V5.5ZM8.46875 3C8.20987 3 8 3.20987 8 3.46875V4.5H12V3.46875C12 3.20987 11.7901 3 11.5312 3H8.46875Z" fill="black"/>
                </svg>
              </div>
            </div>
            <div class="cart-form__item-price-value">
              <p class="cart-form__price-new">${Math.round(
								item.count * (item.price - item.price * item.discount)
							)} <span class="cart-form__item-price-currency">сом</span></p>
              <div class="cart-form__price-old-wrapper">
                <p class="cart-form__price-old" id="price-tooltip-trigger-${item.id}"> ${
				item.price * item.count
			} <span class="cart-form__item-price-currency cart-form__price-old">сом</span></p>
                <div class="cart-form__price-tooltip" id="price-tooltip-${item.id}">
                  <span class="cart-form__price-tooltip-row">
                    <p class="cart-form__price-tooltip-discount">Скидка ${Math.round(item.discount * 100)}%</p>
                    <p>–${Math.round(item.count * item.price * item.discount)} сом</p>
                  </span>
                  <span class="cart-form__price-tooltip-row">
                    <p class="cart-form__price-tooltip-discount" >Скидка покупателя 0%</p>
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

	const cartContainer = document.querySelector('.cart-form__items-list')
	if (cart === '') {
		cart = `пустая корзина`
	}

	cartContainer.innerHTML = cart
	iconsHover()
	tooltipSellerHandler()
	PriceHandler()
	displayCheckout(items)
	setCounter()
	cartLabelCounter()
}
