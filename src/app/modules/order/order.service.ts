/* eslint-disable @typescript-eslint/no-explicit-any */

import AppError from '../../errors/appError';
import { CarModel } from '../car/car.modle';
import { OrderModel } from './order.model';
import { orderUtils } from './order.utils';

// const createOrder = async (user: TUser, orderData: any, client_ip: string) => {

//   const { userId, carId, quantity, price, status } = orderData;
//   console.log(orderData);
//   console.log(user._id);

//   const carData = await CarModel.findById(carId);

//   if (!carData) {
//     throw new Error('Car not found.');
//   }

//   if (carData.quantity < quantity) {
//     throw new Error('This car is out of stock!');
//   }
//   // Reduces car stock quantity when order.
//   carData.quantity = carData.quantity - quantity;
//   // Checks if the stock is greater than 0, then sets the inStock property to true, otherwise false.
//   carData.inStock = carData.quantity > 0;

//   await carData.save();
//   // Product Details
//   const productDetails = {
//     userId,
//     carId,
//     status,
//     quantity,
//     price,
//     totalPrice: Number(quantity * price)
//   };

//   // let order = await Order.create({
//   //   user,
//   //   products: productDetails,
//   //   totalPrice,
//   // });








//   const totalPrice = Number(quantity * price)
//   // console.log(productDetails, "To");
//   let order = await OrderModel.create(productDetails);
//   // payment integration
//   const shurjopayPayload = {
//     amount: totalPrice,
//     order_id: order._id,
//     currency: "BDT",
//     customer_name: user.name,
//     customer_address: user.address,
//     customer_email: user.email,
//     customer_phone: user.phone,
//     customer_city: user.city,
//     client_ip,
//   };

//   const payment = await orderUtils.makePaymentAsync(shurjopayPayload);

//   if (payment?.transactionStatus) {
//     order = await order.updateOne({
//       transaction: {
//         id: payment.sp_order_id,
//         transactionStatus: payment.transactionStatus,
//       },
//     });
//   }

//   return { paymentInfo: payment.checkout_url, payment };
// };

// verify payment

const createOrder = async (
  user: any,
  payload: { products: { product: string; quantity: number }[] },
  client_ip: string
) => {
  if (!payload?.products?.length)
    throw new AppError(httpStatus.NOT_ACCEPTABLE, "Order is not specified");

  const products = payload.products;

  let totalPrice = 0;
  const productDetails = await Promise.all(
    products.map(async (item) => {
      const product = await CarModel.findById(item.product);
      if (product) {
        const subtotal = product ? (product.price || 0) * item.quantity : 0;
        totalPrice += subtotal;
        return item;
      }
    })
  );

  let order = await OrderModel.create({
    user,
    products: productDetails,
    totalPrice,
  });

  // payment integration
  const shurjopayPayload = {
    amount: totalPrice,
    order_id: order._id,
    currency: "BDT",
    customer_name: user.name,
    customer_address: user.address,
    customer_email: user.email,
    customer_phone: user.phone,
    customer_city: user.city,
    client_ip,
  };

  const payment = await orderUtils.makePaymentAsync(shurjopayPayload);

  if (payment?.transactionStatus) {
    order = await order.updateOne({
      transaction: {
        id: payment.sp_order_id,
        transactionStatus: payment.transactionStatus,
      },
    });
  }

  return payment.checkout_url;
};

const verifyPayment = async (order_id: string) => {
  const verifiedPayment = await orderUtils.verifyPaymentAsync(order_id);

  if (verifiedPayment.length) {
    await OrderModel.findOneAndUpdate(
      {
        "transaction.id": order_id,
      },
      {
        "transaction.bank_status": verifiedPayment[0].bank_status,
        "transaction.sp_code": verifiedPayment[0].sp_code,
        "transaction.sp_message": verifiedPayment[0].sp_message,
        "transaction.transactionStatus": verifiedPayment[0].transaction_status,
        "transaction.method": verifiedPayment[0].method,
        "transaction.date_time": verifiedPayment[0].date_time,
        status:
          verifiedPayment[0].bank_status == "Success"
            ? "Paid"
            : verifiedPayment[0].bank_status == "Failed"
              ? "Pending"
              : verifiedPayment[0].bank_status == "Cancel"
                ? "Cancelled"
                : "",
      }
    );
  }

  return verifiedPayment;
};

const getOrders = async () => {
  const data = await OrderModel.find();
  return data;
};

const calculateRevenue = async () => {
  const result = await OrderModel.aggregate([
    {
      $group: {
        _id: null,
        totalRevenue: { $sum: '$totalPrice' },
      },
    },
  ]);

  return result[0]?.totalRevenue || 0;
};

const getDetails = async () => {
  const result = await OrderModel.find()
  // console.log(result, "From order service");
  return result

}

export const orderService = {
  createOrder,
  calculateRevenue,
  getDetails,
  verifyPayment,
  getOrders
}
