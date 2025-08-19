"use client";

import React, { createContext, useContext, useReducer } from "react";

type Props = {
  children: React.ReactNode;
};
export type Product = {
  id: string;
  title: string;
  price: number;
  image?: string;
};
export type CartItem = Product & {
  qty: number;
};
type State = {
  items: CartItem[];
};
type Action = { type: "ADD"; product: Product } | { type: "CLEAR" };
// type X = 1 | 2 | 3

function cartReducer(state: State, action: Action): State {
  switch (action.type) {
    case "ADD": {
      const exist = state.items.find((item) => item.id === action.product.id);

      if (exist) {
        return {
          ...state,
          items: state.items.map((item) =>
            item.id === action.product.id
              ? { ...item, qty: item.qty + 1 }
              : item
          ),
        };
      }
      // after returning, update the state
      return {
        ...state,
        items: [...state.items, { ...action.product, qty: 1 }],
      };
    }

    case "CLEAR": {
      return {
        ...state,
        items: [],
      };
    }
  }
}

type CartContextValue = {
  items: CartItem[];
  add: (product: Product) => void;
  clear: () => void;
};

const CartContext = createContext<CartContextValue | undefined>(undefined);

export default function CartContextProvider({ children }: Props) {
  const [state, dispatch] = useReducer(cartReducer, {
    items: [],
  });

  const value: CartContextValue = {
    items: state.items,
    add: (product: Product) => dispatch({ type: "ADD", product }),
    clear: () => dispatch({ type: "CLEAR" }),
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("please choose a product");
  }
  return context;
}
