export let cart = JSON.parse(localStorage.getItem('cart'))

if(!cart){
    cart = [];
  cart.push({
    productId : "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
    quantity : 2,
    deliveryOptionId : '1'
},{
    productId : "15b6fc6f-327a-4ec4-896f-486349e85a3d",
    quantity : 1,
    deliveryOptionId : '2'
});
}


 function addLocalStorage(){
    localStorage.setItem('cart', JSON.stringify(cart))
 }

  export function addToCart(productId){
         let matchingName;

            let quantitySelect = 1;

           const selectorElement = document.querySelector(`.js-quantity-selector-${productId}`).value

           quantitySelect = Number(selectorElement);

           cart.forEach((item) =>{
                if(productId===item.productId){
                    matchingName=item
                }
            });
              
            if(matchingName){
                matchingName.quantity+=quantitySelect
            }else{
                cart.push({
                    productId : productId,
                    quantity : quantitySelect,
                    deliveryOptionId : '1'
                })
            }

            addLocalStorage();
     }

    export function removeCart(productId){
        let newCart = [];

        cart.forEach((cartItem)=>{
            if(cartItem.productId!==productId){
               newCart.push(cartItem);
            }
        })
        cart = newCart;

        addLocalStorage();
     }

    export function updateCartQuantity(){
         let cartQuantity = 0;

            cart.forEach((item)=>{
                cartQuantity += item.quantity ;
            })
             

            return cartQuantity;

            
     }