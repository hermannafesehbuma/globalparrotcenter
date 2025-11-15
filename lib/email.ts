import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

const FROM_EMAIL = 'Global Parrot Center <noreply@globalparrotcenter.com>';
const TO_EMAIL = 'parrotlovers04@gmail.com';

// Email template styles matching site colors
const emailStyles = `
  <style>
    body {
      font-family: system-ui, -apple-system, sans-serif;
      line-height: 1.6;
      color: #1a1a1a;
      background-color: #ffffff;
    }
    .container {
      max-width: 600px;
      margin: 0 auto;
      padding: 20px;
    }
    .header {
      background: linear-gradient(135deg, hsl(340 75% 55%), hsl(340 75% 65%));
      color: white;
      padding: 30px;
      text-align: center;
      border-radius: 8px 8px 0 0;
    }
    .header h1 {
      margin: 0;
      font-size: 24px;
      font-weight: 700;
    }
    .content {
      background-color: #ffffff;
      padding: 30px;
      border: 1px solid hsl(340 20% 90%);
      border-top: none;
    }
    .section {
      margin-bottom: 20px;
    }
    .section-title {
      color: hsl(340 75% 45%);
      font-size: 18px;
      font-weight: 600;
      margin-bottom: 10px;
      border-bottom: 2px solid hsl(340 30% 96%);
      padding-bottom: 5px;
    }
    .field {
      margin-bottom: 15px;
    }
    .field-label {
      font-weight: 600;
      color: hsl(240 10% 3.9%);
      margin-bottom: 5px;
      display: block;
    }
    .field-value {
      color: hsl(240 3.8% 46.1%);
      padding: 8px;
      background-color: hsl(340 20% 96%);
      border-radius: 4px;
    }
    .items-table {
      width: 100%;
      border-collapse: collapse;
      margin: 20px 0;
    }
    .items-table th {
      background-color: hsl(340 30% 96%);
      color: hsl(340 75% 45%);
      padding: 12px;
      text-align: left;
      font-weight: 600;
    }
    .items-table td {
      padding: 12px;
      border-bottom: 1px solid hsl(340 20% 90%);
    }
    .total {
      text-align: right;
      font-size: 20px;
      font-weight: 700;
      color: hsl(340 75% 55%);
      margin-top: 20px;
      padding-top: 20px;
      border-top: 2px solid hsl(340 20% 90%);
    }
    .footer {
      background-color: hsl(340 20% 96%);
      padding: 20px;
      text-align: center;
      border-radius: 0 0 8px 8px;
      color: hsl(240 3.8% 46.1%);
      font-size: 14px;
    }
  </style>
`;

interface OrderEmailData {
  orderId: number;
  customerName: string;
  customerEmail?: string;
  customerPhone?: string;
  shippingAddress: {
    line1: string;
    line2?: string;
    city: string;
    state?: string;
    country: string;
    postalCode?: string;
  };
  paymentMethod: string;
  items: Array<{
    name: string;
    quantity: number;
    price: number;
  }>;
  total: number;
  notes?: string;
}

interface ContactEmailData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export async function sendOrderConfirmationEmail(data: OrderEmailData) {
  const itemsHtml = data.items
    .map(
      (item) => `
    <tr>
      <td>${item.name}</td>
      <td>${item.quantity}</td>
      <td>$${item.price.toFixed(2)}</td>
      <td>$${(item.price * item.quantity).toFixed(2)}</td>
    </tr>
  `
    )
    .join('');

  const html = `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        ${emailStyles}
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>🦜 New Order Received</h1>
          </div>
          <div class="content">
            <div class="section">
              <div class="section-title">Order Information</div>
              <div class="field">
                <span class="field-label">Order ID:</span>
                <div class="field-value">#${data.orderId}</div>
              </div>
              <div class="field">
                <span class="field-label">Customer Name:</span>
                <div class="field-value">${data.customerName}</div>
              </div>
              ${data.customerEmail ? `
              <div class="field">
                <span class="field-label">Email:</span>
                <div class="field-value">${data.customerEmail}</div>
              </div>
              ` : ''}
              ${data.customerPhone ? `
              <div class="field">
                <span class="field-label">Phone:</span>
                <div class="field-value">${data.customerPhone}</div>
              </div>
              ` : ''}
            </div>

            <div class="section">
              <div class="section-title">Shipping Address</div>
              <div class="field-value">
                ${data.shippingAddress.line1}<br>
                ${data.shippingAddress.line2 ? data.shippingAddress.line2 + '<br>' : ''}
                ${data.shippingAddress.city}, ${data.shippingAddress.state || ''} ${data.shippingAddress.postalCode || ''}<br>
                ${data.shippingAddress.country}
              </div>
            </div>

            <div class="section">
              <div class="section-title">Order Items</div>
              <table class="items-table">
                <thead>
                  <tr>
                    <th>Product</th>
                    <th>Quantity</th>
                    <th>Price</th>
                    <th>Total</th>
                  </tr>
                </thead>
                <tbody>
                  ${itemsHtml}
                </tbody>
              </table>
              <div class="total">
                Total: $${data.total.toFixed(2)}
              </div>
            </div>

            <div class="section">
              <div class="section-title">Payment Method</div>
              <div class="field-value">${data.paymentMethod}</div>
            </div>

            ${data.notes ? `
            <div class="section">
              <div class="section-title">Additional Notes</div>
              <div class="field-value">${data.notes}</div>
            </div>
            ` : ''}
          </div>
          <div class="footer">
            <p>This is an automated notification from Global Parrot Center</p>
          </div>
        </div>
      </body>
    </html>
  `;

  try {
    await resend.emails.send({
      from: FROM_EMAIL,
      to: TO_EMAIL,
      subject: `New Order #${data.orderId} - ${data.customerName}`,
      html,
    });

    // Also send confirmation to customer if email provided
    if (data.customerEmail) {
      await resend.emails.send({
        from: FROM_EMAIL,
        to: data.customerEmail,
        subject: `Order Confirmation #${data.orderId} - Global Parrot Center`,
        html: `
          <!DOCTYPE html>
          <html>
            <head>
              <meta charset="utf-8">
              ${emailStyles}
            </head>
            <body>
              <div class="container">
                <div class="header">
                  <h1>🦜 Thank You for Your Order!</h1>
                </div>
                <div class="content">
                  <p>Dear ${data.customerName},</p>
                  <p>Thank you for your order! We have received your order and will contact you within 24 hours to confirm details and arrange shipping.</p>
                  
                  <div class="section">
                    <div class="section-title">Order Summary</div>
                    <div class="field">
                      <span class="field-label">Order ID:</span>
                      <div class="field-value">#${data.orderId}</div>
                    </div>
                    <table class="items-table">
                      <thead>
                        <tr>
                          <th>Product</th>
                          <th>Quantity</th>
                          <th>Price</th>
                          <th>Total</th>
                        </tr>
                      </thead>
                      <tbody>
                        ${itemsHtml}
                      </tbody>
                    </table>
                    <div class="total">
                      Total: $${data.total.toFixed(2)}
                    </div>
                  </div>

                  <p>We will be in touch soon to finalize your order details.</p>
                  <p>Best regards,<br>The Global Parrot Center Team</p>
                </div>
                <div class="footer">
                  <p>Questions? Contact us at parrotlovers04@gmail.com</p>
                </div>
              </div>
            </body>
          </html>
        `,
      });
    }
  } catch (error) {
    console.error('Error sending order email:', error);
    throw error;
  }
}

export async function sendContactEmail(data: ContactEmailData) {
  const html = `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        ${emailStyles}
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>📧 New Contact Form Submission</h1>
          </div>
          <div class="content">
            <div class="section">
              <div class="field">
                <span class="field-label">Name:</span>
                <div class="field-value">${data.name}</div>
              </div>
              <div class="field">
                <span class="field-label">Email:</span>
                <div class="field-value">${data.email}</div>
              </div>
              <div class="field">
                <span class="field-label">Subject:</span>
                <div class="field-value">${data.subject}</div>
              </div>
              <div class="field">
                <span class="field-label">Message:</span>
                <div class="field-value" style="white-space: pre-wrap;">${data.message}</div>
              </div>
            </div>
          </div>
          <div class="footer">
            <p>This is an automated notification from Global Parrot Center</p>
          </div>
        </div>
      </body>
    </html>
  `;

  try {
    await resend.emails.send({
      from: FROM_EMAIL,
      to: TO_EMAIL,
      replyTo: data.email,
      subject: `Contact Form: ${data.subject}`,
      html,
    });
  } catch (error) {
    console.error('Error sending contact email:', error);
    throw error;
  }
}

