import nodemailer from 'nodemailer';
import { env } from '../env.js';
import { IInquiry } from '../models/Inquiry.js';
import { IListing } from '../models/Listing.js';
import { IUser } from '../models/User.js';

const emailDisabled = env.EMAIL_DISABLED === 'true';

// Create transporter
const transporter = emailDisabled
  ? null
  : nodemailer.createTransport({
      host: env.SMTP_HOST,
      port: Number(env.SMTP_PORT),
      secure: Number(env.SMTP_PORT) === 465,
      auth: {
        user: env.SMTP_USER,
        pass: env.SMTP_PASS,
      },
    });

// Verify connection on startup (in dev mode)
if (!emailDisabled && env.NODE_ENV === 'development') {
  transporter?.verify((error) => {
    if (error) {
      console.error('❌ Email transporter error:', error);
    } else {
      console.log('✅ Email server ready');
    }
  });
}

if (emailDisabled) {
  console.warn('⚠️ Email disabled via EMAIL_DISABLED=true');
}

function generateInquiryEmailHtml(
  inquiry: IInquiry,
  listing: IListing,
  agent: IUser
): string {
  const dashboardLink = `${env.CLIENT_ORIGIN}/dashboard`;
  const listingLink = `${env.CLIENT_ORIGIN}/listings/${listing._id}`;

  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>New Inquiry</title>
  <style>
    body {
      margin: 0;
      padding: 0;
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
      line-height: 1.6;
      background-color: #f5f5f5;
    }
    .container {
      max-width: 600px;
      margin: 0 auto;
      background-color: #ffffff;
    }
    .header {
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      color: #ffffff;
      padding: 30px 20px;
      text-align: center;
    }
    .header h1 {
      margin: 0;
      font-size: 24px;
      font-weight: 600;
    }
    .content {
      padding: 30px 20px;
    }
    .property-info {
      background-color: #f8f9fa;
      border-left: 4px solid #667eea;
      padding: 15px;
      margin: 20px 0;
    }
    .property-info h2 {
      margin: 0 0 5px 0;
      font-size: 18px;
      color: #333;
    }
    .property-info p {
      margin: 5px 0;
      color: #666;
    }
    .inquiry-details {
      margin: 20px 0;
    }
    .inquiry-details h3 {
      font-size: 16px;
      color: #333;
      margin: 20px 0 10px 0;
    }
    .detail-row {
      margin: 8px 0;
      padding: 8px 0;
      border-bottom: 1px solid #eee;
    }
    .detail-label {
      font-weight: 600;
      color: #555;
      display: inline-block;
      width: 80px;
    }
    .detail-value {
      color: #333;
    }
    .message-box {
      background-color: #f8f9fa;
      padding: 15px;
      border-radius: 4px;
      margin: 15px 0;
      white-space: pre-wrap;
      color: #333;
    }
    .button {
      display: inline-block;
      padding: 12px 30px;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      color: #ffffff;
      text-decoration: none;
      border-radius: 4px;
      margin: 20px 0;
      font-weight: 600;
    }
    .footer {
      background-color: #f8f9fa;
      padding: 20px;
      text-align: center;
      color: #666;
      font-size: 14px;
    }
    .footer a {
      color: #667eea;
      text-decoration: none;
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>🏠 New Inquiry from Top Choice Realty</h1>
    </div>
    
    <div class="content">
      <p>Hi ${agent.name},</p>
      <p>You have received a new inquiry about one of your listings:</p>
      
      <div class="property-info">
        <h2>${listing.title}</h2>
        <p><strong>${listing.address}</strong></p>
        <p>${listing.neighborhood} • $${listing.price.toLocaleString()} • ${listing.beds} beds • ${listing.baths} baths</p>
      </div>
      
      <div class="inquiry-details">
        <h3>Contact Information</h3>
        <div class="detail-row">
          <span class="detail-label">Name:</span>
          <span class="detail-value">${inquiry.name}</span>
        </div>
        <div class="detail-row">
          <span class="detail-label">Email:</span>
          <span class="detail-value"><a href="mailto:${inquiry.email}">${inquiry.email}</a></span>
        </div>
        ${
          inquiry.phone
            ? `<div class="detail-row">
          <span class="detail-label">Phone:</span>
          <span class="detail-value"><a href="tel:${inquiry.phone}">${inquiry.phone}</a></span>
        </div>`
            : ''
        }
        
        <h3>Message</h3>
        <div class="message-box">${inquiry.message}</div>
      </div>
      
      <center>
        <a href="${listingLink}" class="button">View Listing</a>
        <a href="${dashboardLink}" class="button" style="background: #6c757d;">Go to Dashboard</a>
      </center>
      
      <p style="margin-top: 30px; color: #666; font-size: 14px;">
        <strong>Next steps:</strong> Please respond to this inquiry as soon as possible. 
        Contact the potential client via email or phone to schedule a showing or answer their questions.
      </p>
    </div>
    
    <div class="footer">
      <p><strong>Top Choice Realty</strong></p>
      <p>Staten Island, NY</p>
      <p><a href="${env.CLIENT_ORIGIN}">Visit our website</a></p>
    </div>
  </div>
</body>
</html>
  `.trim();
}

export async function sendInquiryEmail(
  inquiry: IInquiry,
  listing: IListing,
  agent: IUser
): Promise<void> {
  if (emailDisabled) {
    if (env.NODE_ENV === 'development') {
      console.log('📧 Email skipped (EMAIL_DISABLED=true) for:', agent.email);
    }
    return;
  }

  const subject = `New Inquiry: ${listing.title}`;
  const html = generateInquiryEmailHtml(inquiry, listing, agent);

  await transporter?.sendMail({
    from: env.SMTP_FROM,
    to: agent.email,
    subject,
    html,
    replyTo: inquiry.email,
  });

  // Log in development
  if (env.NODE_ENV === 'development') {
    console.log('📧 Email sent to:', agent.email);
    console.log('Subject:', subject);
  }
}
