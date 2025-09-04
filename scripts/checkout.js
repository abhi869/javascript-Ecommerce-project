import {cart,removeCart, updateCartQuantity,updateCartDeliveryOptions} from '../data/cart.js'
import {products} from '../data/products.js'
import {formatCurrency} from './utils/money.js'
import dayjs from 'https://unpkg.com/supersimpledev@8.5.0/dayjs/esm/index.js'
import { deliveryOptions } from '../data/deliveryOptions.js'

let checkOutHtml = ""



let matchingData;



cart.forEach((cartItem)=>{
  

   products.forEach((product)=>{
    if(product.id===cartItem.productId){
        matchingData=product;
    }
   })

   let deliveryOptionId= cartItem.deliveryOptionId

   let deliveryItem;

   deliveryOptions.forEach((option)=>{
    
    if(cartItem.deliveryOptionId===option.id){
        deliveryItem=option;
        
    }
   })
    const deliveryDate = dayjs()
    const deliveryDays = deliveryDate.add(deliveryItem.deliveryDays, 'days')
    const formatedDeliveryDate=  deliveryDays.format('dddd, MMMM D')


  checkOutHtml += `<div class="cart-item-container js-cart-item-container-${matchingData.id}">
            <div class="delivery-date">
              Delivery date: ${formatedDeliveryDate}
            </div>

            <div class="cart-item-details-grid">
              <img class="product-image"
                src="${matchingData.image}">

              <div class="cart-item-details">
                <div class="product-name">
                  ${matchingData.name}
                </div>
                <div class="product-price">
                  $${formatCurrency(matchingData.priceCents)}
                </div>
                <div class="product-quantity">
                  <span>
                    Quantity: <span class="quantity-label">${cartItem.quantity}</span>
                  </span>
                  <span class="update-quantity-link link-primary">
                    Update
                  </span>
                  <span class="delete-quantity-link link-primary js-delete-link " data-product-id="${matchingData.id}">
                    Delete
                  </span>
                </div>
              </div>

              <div class="delivery-options">
                <div class="delivery-options-title">
                  Choose a delivery option:
                </div>
                ${deliveryOptionHtml(matchingData,cartItem)}
              </div>
            </div>
          </div>`

          
});

function deliveryOptionHtml(matchingData,cartItem){
    let html=""
   deliveryOptions.forEach((deliveryItem)=>{
    const deliveryDate = dayjs()
    const deliveryDays = deliveryDate.add(deliveryItem.deliveryDays, 'days')
    const formatedDeliveryDate=  deliveryDays.format('dddd, MMMM D')
    
    const price = deliveryItem.price===0 ?'FREE' :`$${deliveryItem.price} - `

    const isChecked = deliveryItem.id===cartItem.deliveryOptionId
    
     
    html +=
    ` <div class="delivery-option js-delivery-option" data-product-id = ${matchingData.id} data-delivery-option-id = ${deliveryItem.id}>
                  <input type="radio"
                  ${isChecked ? 'checked' : ''}
                    class="delivery-option-input"
                    name="delivery-option-${matchingData.id}">
                  <div>
                    <div class="delivery-option-date">
                      ${formatedDeliveryDate}
                    </div>
                    <div class="delivery-option-price">
                      ${price} Shipping
                    </div>
                  </div>
                </div>`

        
   });

   return html
}

let cartQuantity = updateCartQuantity();

document.querySelector('.js-return-to-home-link').innerHTML=`${cartQuantity} Items`

document.querySelector('.js-order-summary').innerHTML = checkOutHtml;

document.querySelectorAll('.js-delete-link').forEach((link)=>{
    link.addEventListener('click', (e) =>{
      const productId= link.dataset.productId;
      
      removeCart(productId);

      const container = document.querySelector(`.js-cart-item-container-${productId}`)
      container.remove();

      let newCartQuantity = updateCartQuantity();

      document.querySelector('.js-return-to-home-link').innerHTML=`${newCartQuantity} Items`
     
    })
})

  document.querySelectorAll('.js-delivery-option').forEach((deliveryItem)=>{
    deliveryItem.addEventListener('click',(e)=>{
      
      
      const productId = deliveryItem.dataset.productId ;
      const deliveryOptionId=deliveryItem.dataset.deliveryOptionId;

      
      

      updateCartDeliveryOptions(productId,deliveryOptionId);
    })
  })