import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(request: Request) {
  try {
    const { name, email, phone, service, setSize, message, gluing, selectedSet, deliveryMethod, estimatedPrice, address } = await request.json();

    // Create a transporter using Gmail
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER, // Your Gmail address
        pass: process.env.EMAIL_APP_PASSWORD, // Your Gmail app password
      },
    });

    // Admin notification email
    const adminMailOptions = {
      from: process.env.EMAIL_USER,
      to: process.env.EMAIL_USER, // Send to yourself
      subject: `New Contact Form Submission - ${service}${gluing ? ' (with Gluing)' : ''}`,
      html: `
        <h2>New Contact Form Submission</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Phone:</strong> ${phone || 'Not provided'}</p>
        <p><strong>Service:</strong> ${service}</p>
        
        ${selectedSet ? `
        <p><strong>Selected Set:</strong></p>
        <div style="display: flex; gap: 20px; margin-bottom: 20px;">
          ${selectedSet.set_img_url ? `
            <img src="${selectedSet.set_img_url}" alt="${selectedSet.name}" style="max-width: 200px; height: auto; border-radius: 8px;">
          ` : ''}
          <ul style="list-style: none; padding: 0;">
            <li><strong>Name:</strong> ${selectedSet.name}</li>
            <li><strong>Set Number:</strong> ${selectedSet.set_num}</li>
            <li><strong>Piece Count:</strong> ${selectedSet.num_parts}</li>
            <li><strong>Year Released:</strong> ${selectedSet.year}</li>
            <li><strong>Set URL:</strong> <a href="${selectedSet.set_url}" target="_blank">View on LEGO.com</a></li>
          </ul>
        </div>
        ` : `
        <p><strong>Set Size:</strong> ${setSize || 'Not specified'}</p>
        `}
        
        <p><strong>Delivery Method:</strong> ${deliveryMethod || 'Not specified'}</p>
        <p><strong>Gluing Requested:</strong> ${gluing ? 'Yes' : 'No'}</p>
        <p><strong>Message:</strong></p>
        <p>${message}</p>
      `,
    };

    // Auto-response email to customer
    const customerMailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: `Brick by Brick – Your LEGO Build Request${selectedSet ? ` (Set: ${selectedSet.name})` : ''}`,
      html: `
        <p>Hi ${name},</p>
        
        <p>Thanks for your request to have your LEGO ${selectedSet ? `${selectedSet.name} (Set #${selectedSet.set_num})` : 'set'} professionally assembled!</p>
        
        ${selectedSet ? `
        <div style="display: flex; gap: 20px; margin: 20px 0;">
          ${selectedSet.set_img_url ? `
            <img src="${selectedSet.set_img_url}" alt="${selectedSet.name}" style="max-width: 200px; height: auto; border-radius: 8px;">
          ` : ''}
          <div>
            <p><strong>Your Selected Options:</strong></p>
            <ul>
              <li>Service: ${service}</li>
              <li>Piece Count: ${selectedSet.num_parts}</li>
              <li>Gluing Requested: ${gluing ? 'Yes' : 'No'}</li>
              <li>Delivery Method: ${deliveryMethod}</li>
              ${(deliveryMethod === 'local' || deliveryMethod === 'shipping') ? `<li>Delivery Address: ${address}</li>` : ''}
            </ul>
          </div>
        </div>
        ` : `
        <div style="margin: 20px 0;">
          <p><strong>Your Selected Options:</strong></p>
          <ul>
            <li>Service: ${service}</li>
            <li>Set Size: ${setSize || 'Not specified'}</li>
            <li>Gluing Requested: ${gluing ? 'Yes' : 'No'}</li>
            <li>Delivery Method: ${deliveryMethod}</li>
            ${(deliveryMethod === 'local' || deliveryMethod === 'shipping') ? `<li>Delivery Address: ${address}</li>` : ''}
          </ul>
        </div>
        `}
        
        <p>Here's what's next:</p>
        
        <ul>
          <li>We'll review your request and get back to you within 12 hours via email.</li>
          <li>Your quote will include:
            <ul>
              <li>Assembly costs</li>
              ${gluing ? '<li>Gluing service costs</li>' : ''}
              ${(deliveryMethod === 'local' || deliveryMethod === 'shipping') ? '<li>Delivery/shipping costs</li>' : ''}
            </ul>
          </li>
        </ul>
        
        <p>If you need to make any changes to your request or have any questions, please reply to this email.</p>
        
        <p>Thanks again,<br>
        Tory @ Brick by Brick<br>
        📧 probrickbuilds@gmail.com<br>
        Your Trusted LEGO Building Partner</p>
      `,
    };

    // Send both emails
    await Promise.all([
      transporter.sendMail(adminMailOptions),
      transporter.sendMail(customerMailOptions)
    ]);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error sending email:', error);
    return NextResponse.json(
      { error: 'Failed to send email' },
      { status: 500 }
    );
  }
} 