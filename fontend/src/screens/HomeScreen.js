import React, {  useEffect } from "react";
import {useDispatch,useSelector} from 'react-redux';
import Product from "../components/Product";
import MessageBox from "../components/MessageBox";
import LoadingBox from "../components/LoadingBox";
import { listProducts } from "../actions/productActions";

export default function HomeScreen() {

 const dispatch = useDispatch();
 const productList = useSelector(state => state.productList);
 const {loading,error,products} = productList;

  useEffect(() => {
    dispatch(listProducts());
  }, []); // component Did Mount , exact once

  return (
    <div>
      {loading ? (
        <LoadingBox></LoadingBox>
      ) : error ? (
        <MessageBox varient='danger'>{error}</MessageBox>
      ) : (
        <div className="row center">
          {products.map((product) => (
            <Product key={product._id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
}
