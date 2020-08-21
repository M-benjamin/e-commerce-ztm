import { createSelector } from "reselect";

// > Input
// > Put cart in cache memory
const selectCart = (state) => state.cart;

// > Output selectort
export const selectCartItems = createSelector(
  [selectCart],
  (cart) => cart.cartItems
);

export const selectCartHidden = createSelector(
    [selectCart],
    cart => cart.hidden
)

export const selectCartItemsCount = createSelector(
  [selectCartItems],
  (cartItems) =>
    cartItems.reduce(
      (accumulatedQty, cartItem) => accumulatedQty + cartItem.quantity,
      0
    )
);

export const selectCartTotal = createSelector(
    [selectCartItems],
    (cartItems) =>
    cartItems.reduce(
      (accumulatedQty, cartItem) => accumulatedQty + cartItem.quantity * cartItem.price,
      0
    )
)
