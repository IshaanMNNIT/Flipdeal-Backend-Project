const express = require('express');
const { resolve } = require('path');

const app = express();
const port = 3000;

const cors = require('cors');
app.use(cors());

app.use(express.static('static'));

//Endpoint 1 : Calculate the total price of items in the cart :
app.get('/cart-total', (req, res) => {
  let newItemPrice = parseFloat(req.query.newItemPrice);
  let cartTotal = parseFloat(req.query.cartTotal);
  cartTotal += newItemPrice;
  res.send(cartTotal.toString());
});

//Endpoint 2 : Apply a discount based on membership status :
app.get('/membership-discount', (req, res) => {
  let cartTotal = parseFloat(req.query.cartTotal);
  let isMember = req.query.isMember;
  if (isMember === 'true') {
    cartTotal = cartTotal - cartTotal * 0.1;
  }
  res.send(cartTotal.toString());
});

//Endpoint 3 : Calculate tax on the cartTotal
app.get('/Calulate-tax', (req, res) => {
  let cartTotal = parseFloat(req.query.cartTotal);
  let tax = cartTotal * 0.5;
  res.send(tax.toString());
});

//Endpoint 4 : Estimating delivery time based on shipping  method
app.get('/estimate-delivery', (req, res) => {
  let distance = parseFloat(req.query.distance);
  let shippingMethod = req.query.shippingMethod;
  let time;
  if (shippingMethod === 'Standard') {
    time = distance / 50;
  } else if (shippingMethod === 'Express') {
    time = distance / 100;
  }
  res.send(time.toString());
});

//Endpoint 5 : Calculate the shipping cost based on weight and distance
app.get('/shipping-cost', (req, res) => {
  let weight = parseFloat(req.query.weight);
  let distance = parseFloat(req.query.distance);
  let shipCost = weight * distance * 0.1;
  res.send(shipCost.toString());
});

//Endpoint 6 : Calculate loyalty points earned from a purchase
app.get('/loyalty-points', (req, res) => {
  let purchaseAmount = parseFloat(req.query.purchaseAmount);
  let loyalty_Point = purchaseAmount * 2;
  res.send(loyalty_Point.toString());
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
