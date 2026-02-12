const buildInvoiceData = (order, user) => {
  const company = {
    name: "FurniLux Pvt Ltd",
    address: "Plot 21, Industrial Area, New Delhi - 110001",
    state: "Delhi",
    stateCode: "07",
    gstin: "07ABCDE1234F1Z5",
  };

  const customer = {
    name: order.customer.fullName,
    email: order.customer.email,
    phone: order.customer.phone,
    address: `${order.customer.address.house}, ${order.customer.address.street}, ${order.customer.address.city}, ${order.customer.address.state} - ${order.customer.address.pincode}`,
    state: order.customer.address.state,
  };

  const items = order.items.map((item, index) => {
    const price = Number(item.price); // ✅ price is already number
    const total = price * item.qty;

    return {
      sno: index + 1,
      name: item.name,
      hsn: "9403",
      qty: item.qty,
      rate: price,
      taxableValue: total,
    };
  });

  return {
    invoiceNumber: `INV-${Date.now()}`,
    orderId: order._id,
    invoiceDate: new Date().toLocaleDateString(),
    orderDate: order.createdAt.toLocaleDateString(),
    company,
    customer,
    items,
    summary: {
      subtotal: order.subtotal,
      coupon: order.coupon,
      discount: order.discount,
      cgst: order.cgst,
      sgst: order.sgst,
      platformFee: order.platformFee,
      grandTotal: order.totalAmount,
    },
    declaration:
      "We declare that this invoice shows the actual price of the goods and all particulars are true and correct.",
  };
};

module.exports = buildInvoiceData; 