import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();

// Create email transporter
const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 587,
  secure: false, // Use TLS
  requireTLS: true,
  connectionTimeout: 10000, // 10 seconds
  socketTimeout: 10000, // 10 seconds
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD,
  },
});

// Send reply email to user
export const sendReplyEmail = async (userEmail, userName, subject, replyMessage) => {
  try {
    const mailOptions = {
      from: process.env.EMAIL_FROM || process.env.EMAIL_USER,
      to: userEmail,
      subject: `Re: ${subject} - I Gym Response`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <div style="background: linear-gradient(135deg, #f97316 0%, #ea580c 100%); padding: 20px; border-radius: 8px; color: white;">
            <h1>Hello ${userName}!</h1>
          </div>
          
          <div style="padding: 20px; background: #f9fafb;">
            <p style="color: #374151; font-size: 16px;">We have responded to your inquiry. Here's our message:</p>
            
            <div style="background: white; border-left: 4px solid #f97316; padding: 15px; margin: 20px 0; border-radius: 4px;">
              <p style="color: #1f2937; font-size: 16px; line-height: 1.6; margin: 0;">
                ${replyMessage.replace(/\n/g, '<br>')}
              </p>
            </div>

            <div style="background: #f3f4f6; padding: 15px; border-radius: 4px; margin: 20px 0;">
              <p style="color: #666; font-size: 14px; margin: 0;">
                <strong>Your Original Inquiry:</strong><br>
                Subject: ${subject}
              </p>
            </div>

            <p style="color: #666; font-size: 14px;">
              If you have any follow-up questions, feel free to reach out to us.
            </p>
          </div>

          <div style="background: #1f2937; padding: 20px; border-radius: 8px; color: white; text-align: center; margin-top: 20px;">
            <h3 style="margin: 0 0 10px 0;">I Gym</h3>
            <p style="margin: 5px 0; font-size: 14px;">Your Local Fitness Destination</p>
            <p style="margin: 10px 0 0 0; font-size: 12px; color: #9ca3af;">
              📧 ${process.env.EMAIL_FROM || 'info@igym.com'} | 📞 +91 (YOUR) NUMBER
            </p>
          </div>

          <p style="text-align: center; color: #999; font-size: 12px; margin-top: 20px;">
            This is an automated email. Please do not reply to this inbox.
          </p>
        </div>
      `,
    };

    const info = await transporter.sendMail(mailOptions);
    console.log('✓ Reply email sent:', info.response);
    return { success: true, messageId: info.messageId };
  } catch (error) {
    console.error('❌ Error sending email:', error.message);
    // Don't throw error - let the backend continue even if email fails
    return { success: false, error: error.message };
  }
};

// Send contact confirmation email
export const sendContactConfirmationEmail = async (userEmail, userName, subject) => {
  try {
    const mailOptions = {
      from: process.env.EMAIL_FROM || process.env.EMAIL_USER,
      to: userEmail,
      subject: `Thank You for Contacting I Gym`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <div style="background: linear-gradient(135deg, #f97316 0%, #ea580c 100%); padding: 20px; border-radius: 8px; color: white;">
            <h1>Thank You, ${userName}!</h1>
          </div>
          
          <div style="padding: 20px; background: #f9fafb;">
            <p style="color: #374151; font-size: 16px;">
              We have received your message and will get back to you as soon as possible.
            </p>
            
            <div style="background: white; border-left: 4px solid #f97316; padding: 15px; margin: 20px 0; border-radius: 4px;">
              <p style="color: #666; font-size: 14px;"><strong>Subject:</strong> ${subject}</p>
              <p style="color: #666; font-size: 14px;">
                We appreciate your interest and will respond within 24 hours.
              </p>
            </div>

            <p style="color: #666; font-size: 14px;">
              In the meantime, feel free to check out our services and membership plans on our website.
            </p>
          </div>

          <div style="background: #1f2937; padding: 20px; border-radius: 8px; color: white; text-align: center; margin-top: 20px;">
            <h3 style="margin: 0 0 10px 0;">I Gym</h3>
            <p style="margin: 5px 0; font-size: 14px;">Your Local Fitness Destination</p>
            <p style="margin: 10px 0 0 0; font-size: 12px; color: #9ca3af;">
              📧 ${process.env.EMAIL_FROM || 'info@igym.com'} | 📞 +91 (YOUR) NUMBER
            </p>
          </div>
        </div>
      `,
    };

    const info = await transporter.sendMail(mailOptions);
    console.log('✓ Confirmation email sent:', info.response);
    return { success: true, messageId: info.messageId };
  } catch (error) {
    console.error('❌ Error sending confirmation email:', error.message);
    return { success: false, error: error.message };
  }
};

// Send payment confirmation email
export const sendPaymentConfirmationEmail = async (userEmail, userName, plan, amount) => {
  try {
    const mailOptions = {
      from: process.env.EMAIL_FROM || process.env.EMAIL_USER,
      to: userEmail,
      subject: `🎉 Payment Confirmed - Your I Gym Membership is Active!`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <div style="background: linear-gradient(135deg, #10b981 0%, #059669 100%); padding: 20px; border-radius: 8px; color: white;">
            <h1>✅ Payment Confirmed!</h1>
          </div>
          
          <div style="padding: 20px; background: #f9fafb;">
            <p style="color: #374151; font-size: 16px;">
              Dear ${userName},
            </p>
            
            <p style="color: #374151; font-size: 16px;">
              Your payment has been successfully processed. Your membership is now active!
            </p>

            <div style="background: white; border-left: 4px solid #10b981; padding: 15px; margin: 20px 0; border-radius: 4px;">
              <p style="color: #1f2937; font-size: 14px; margin: 5px 0;"><strong>Membership Plan:</strong> ${plan.toUpperCase()}</p>
              <p style="color: #1f2937; font-size: 14px; margin: 5px 0;"><strong>Amount Paid:</strong> ₹${amount}</p>
              <p style="color: #1f2937; font-size: 14px; margin: 5px 0;"><strong>Status:</strong> ✅ ACTIVE</p>
            </div>

            <h3 style="color: #1f2937; margin-top: 20px;">What's Next?</h3>
            <ul style="color: #374151; font-size: 14px; line-height: 1.8;">
              <li>📱 Visit our facility to complete registration</li>
              <li>🏋️ Start your fitness journey with our expert trainers</li>
              <li>📅 Book your free orientation session</li>
              <li>💪 Join our community and transform your body</li>
            </ul>

            <div style="background: #f3f4f6; padding: 15px; border-radius: 4px; margin: 20px 0;">
              <p style="color: #666; font-size: 14px; margin: 0;">
                <strong>Having questions?</strong> Contact us anytime at <br>
                📧 info@igym.com | 📞 +91 (YOUR) NUMBER
              </p>
            </div>
          </div>

          <div style="background: #1f2937; padding: 20px; border-radius: 8px; color: white; text-align: center; margin-top: 20px;">
            <h3 style="margin: 0 0 10px 0;">Welcome to I Gym Family! 💪</h3>
            <p style="margin: 5px 0; font-size: 14px;">Transform Your Body, Transform Your Life</p>
            <p style="margin: 10px 0 0 0; font-size: 12px; color: #9ca3af;">
              Visit us: 123 Fitness Lane, Your City | Open 24/7
            </p>
          </div>

          <p style="text-align: center; color: #999; font-size: 12px; margin-top: 20px;">
            This is an automated email. Please keep this for your records.
          </p>
        </div>
      `,
    };

    const info = await transporter.sendMail(mailOptions);
    console.log('✓ Payment confirmation email sent:', info.response);
    return { success: true, messageId: info.messageId };
  } catch (error) {
    console.error('❌ Error sending payment confirmation email:', error.message);
    return { success: false, error: error.message };
  }
};

export default transporter;
