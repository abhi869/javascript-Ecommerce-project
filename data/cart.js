export const cart = [];

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
                    quantity : quantitySelect
                })
            }
     }