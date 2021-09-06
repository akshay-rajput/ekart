import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  products: [],
  appliedFilters: {},
  filteredProducts: [],
  brands: ["Books", "Flash Cards", "Toys & Games", "Guides"],
  sizes: ["S", "M", "L", "XL"],
  ideal: ["Women", "Men", "Children"]
}

export const productsSlice = createSlice({
  name: 'counter',
  initialState,
  reducers: {
    addProducts: (state, action) => {
        let og_products = action.payload.slice().sort((first, next) => first.price - next.price);
        state.products = og_products
    },
    sortProducts: (state, action) => {
        let prodList = [];
        if(state.filteredProducts.length > 0){
            prodList = state.filteredProducts;

            if(action.payload === "high"){
                prodList.sort((first, next) => next.price - first.price);
            }
            else{
                prodList.sort((first, next) => first.price - next.price);
            }

            state.filteredProducts = prodList;
        }
        else{
            prodList = state.products;
            if(action.payload === "high"){
                prodList.sort((first, next) => next.price - first.price);
            }
            else{
                prodList.sort((first, next) => first.price - next.price);
            }

            state.products = prodList;
        }        
    },
    filterAllProducts: (state, action) => {
        let selectedFilters = action.payload;
        // let filterkeys = Object.keys(sample);
        console.log("seleted: ", selectedFilters);

        // check if all filters unchecked
        let noFilters = false;
        for (const key in selectedFilters) {
            if (selectedFilters.hasOwnProperty(key)) {
                if(selectedFilters[key].length < 1){
                    noFilters = true;
                }
                else{
                    noFilters = false;
                }
            }
        }

        let newFiltered = [];

        for (const key in selectedFilters) {
            // if 
            // if(state.filteredProducts.length < 1 && Object.keys(state.appliedFilters).length < 1){
            //     newFiltered = [...state.products]
            // }else{
            //     newFiltered = [...state.filteredProducts];
            // }

            let filteredData = state.products.filter(item => {
                let indexOfItem = newFiltered.indexOf(item);
                // console.log(indexOfItem);

                // return item if not already present in filtered
                if (selectedFilters.hasOwnProperty(key) & indexOfItem < 0) {
                    const appliedTypeFilters = selectedFilters[key];
                    if(appliedTypeFilters.includes(item[key])){
                        return item;
                    }
                }
            })

            newFiltered = [...newFiltered, ...filteredData]
        }

        state.filteredProducts = newFiltered;
        if(noFilters){
            state.appliedFilters = {};
        }else{
            state.appliedFilters = selectedFilters;
        }
        console.log("filtered ; ", state.filteredProducts)
    },
    clearFilters: (state) => {
        state.appliedFilters = {};
        state.filteredProducts = [];
    },
  },
})

// Action creators are generated for each case reducer function
export const { addProducts, sortProducts, filterProductsByIdeal, filterAllProducts, clearFilters } = productsSlice.actions

export default productsSlice.reducer