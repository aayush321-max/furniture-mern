
const PDFDocument = require("pdfkit");
const fs = require("fs");
const path = require("path");

const generateInvoice = async (order, user) => {
  const invoiceNumber = `INV-${Date.now()}`;
  const invoiceDate = new Date().toLocaleDateString("en-IN");

  const dirPath = path.join(__dirname, "../invoices");
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath);
  }

  const filePath = path.join(dirPath, `invoice-${order._id}.pdf`);

  const doc = new PDFDocument({ margin: 40 });
  doc.pipe(fs.createWriteStream(filePath));

  // ================= COMPANY HEADER =================
  doc.fontSize(22).text("FurniLux", { align: "center" });
  doc.fontSize(10).text("Premium Furniture Pvt Ltd", { align: "center" });
  doc.text("GSTIN: 22AAAAA0000A1Z5", { align: "center" });
  doc.text("Bengaluru, Karnataka, India - 560001", { align: "center" });
  doc.moveDown();

  doc.fontSize(16).text("TAX INVOICE", { align: "center" });
  doc.moveDown();

  // ================= INVOICE DETAILS =================
  doc.fontSize(11);
  doc.text(`Invoice No: ${invoiceNumber}`);
  doc.text(`Order ID: ${order._id}`);
  doc.text(`Invoice Date: ${invoiceDate}`);
  doc.moveDown();

  // ================= CUSTOMER DETAILS =================
  doc.text(`Customer: ${order.customer.fullName}`);
  doc.text(`Phone: ${order.customer.phone}`);
  doc.text(`Email: ${order.customer.email}`);
  doc.text(
    `Address: ${order.customer.address.house}, ${order.customer.address.street}, ${order.customer.address.city}, ${order.customer.address.state} - ${order.customer.address.pincode}`
  );

  doc.moveDown(1.5);

  // ================= ITEMS TABLE =================
  const itemX = 50;
  const qtyX = 350;
  const priceX = 430;

  doc.fontSize(12).text("Items", itemX);
  doc.moveDown(0.5);

  doc.moveTo(itemX, doc.y).lineTo(550, doc.y).stroke();
  doc.moveDown(0.5);

  doc.fontSize(11).text("S.No", itemX);
  doc.text("Product Name", itemX + 40);
  doc.text("Qty", qtyX);
  doc.text("Price", priceX);

  doc.moveDown(0.5);
  doc.moveTo(itemX, doc.y).lineTo(550, doc.y).stroke();
  doc.moveDown(0.5);

  order.items.forEach((item, index) => {
    const y = doc.y;

    doc.text(index + 1, itemX, y);
    doc.text(item.name, itemX + 40, y, { width: 250 });
    doc.text(item.qty.toString(), qtyX, y);
    doc.text(`Rs.${(item.price * item.qty).toLocaleString()}`, priceX, y);

    doc.moveDown();
  });

  doc.moveDown();
  doc.moveTo(itemX, doc.y).lineTo(550, doc.y).stroke();
  doc.moveDown(1);

  // ================= SUMMARY =================
  doc.fontSize(11);

  doc.text(`Subtotal: Rs.${order.subtotal.toLocaleString()}`);

  if (order.discount && order.discount > 0) {
    doc.fillColor("green")
       .text(`Discount: -Rs.${order.discount.toLocaleString()}`);
    doc.fillColor("black");
  }

  doc.text(`CGST (9%): Rs.${order.cgst.toLocaleString()}`);
  doc.text(`SGST (9%): Rs.${order.sgst.toLocaleString()}`);
  doc.text(`Platform Fee: Rs.${order.platformFee.toLocaleString()}`);

  doc.moveDown(0.5);

  doc.fontSize(14).text(
    `Grand Total: Rs.${order.totalAmount.toLocaleString()}`,
    { underline: true }
  );

  doc.moveDown(2);

  // ================= SIGNATURE =================
  doc.text("Authorized Signatory", 400);
  doc.moveDown(2);
  doc.text("_______________________", 400);

  doc.moveDown(2);

  // ================= DECLARATION =================
  doc.fontSize(9).text(
    "Declaration: We declare that this invoice shows the actual price of the goods described and that all particulars are true and correct.",
    { align: "left" }
  );

  doc.moveDown();
  doc.text("This is a computer generated invoice.", {
    align: "center",
  });

 





  return new Promise((resolve, reject) => {
  const stream = fs.createWriteStream(filePath);

  doc.pipe(stream);
  doc.end();

  stream.on("finish", () => {
    resolve(filePath);
  });

  stream.on("error", (err) => {
    reject(err);
  });
});
};

module.exports = generateInvoice;