export const emailTemplates = {
  temporaryPassword: (userName: string, tempPassword: string) => ({
    subject: "Your Temporary Password",
    html: `
      <div style="font-family: Arial, sans-serif; color: #333;">
        <h2 style="color: #4CAF50;">Password Reset Request</h2>
        <p>Dear ${userName || "User"},</p>
        <p>We received a request to reset your password. Here is your temporary password:</p>
        <p style="font-size: 18px; font-weight: bold; color: #555;">${tempPassword}</p>
        <p>Please use this password to log in to your account and update your password in the profile section as soon as possible.</p>
        <p>If you did not request a password reset, please ignore this email.</p>
        <p>Best Regards,<br />The CilunaMarket Place Team</p>
      </div>
    `,
  }),

  welcomeEmail: (userName: string) => ({
    subject: "Welcome to CilunaMarket Place!",
    html: `
      <div style="font-family: Arial, sans-serif; color: #333;">
        <h2 style="color: #4CAF50;">Welcome to CilunaMarket Place, ${userName}!</h2>
        <p>We're thrilled to have you as part of our community. CilunaMarket Place is your go-to marketplace for all things pet-related.</p>
        <p>Here's what you can do:</p>
        <ul>
          <li>Explore a wide range of pet products.</li>
          <li>Buy and sell pet-related items with ease.</li>
          <li>Connect with other pet lovers.</li>
        </ul>
        <p>Start shopping now and enjoy exclusive deals just for you!</p>
        <p>If you have any questions, feel free to reach out to our support team.</p>
        <p>Best Regards,<br /><strong>The CilunaMarket Place Team</strong></p>
      </div>
    `,
  }),

   verifyCurrentEmail: (userName: string, otp: string) => ({
    subject: "Verify Your Current Email",
    html: `
      <div style="font-family: Arial, sans-serif; color: #333;">
        <h2 style="color: #4CAF50;">Email Verification Required</h2>
        <p>Dear ${userName || "User"},</p>
        <p>You are attempting to update your email address. Please verify your current email by entering the following OTP code:</p>
        <p style="font-size: 20px; font-weight: bold; color: #555;">${otp}</p>
        <p>This OTP is valid for 5 minutes. Do not share it with anyone.</p>
        <p>If you did not request this, please ignore this email.</p>
        <p>Best Regards,<br /><strong>The CilunaMarket Place Team</strong></p>
      </div>
    `,
  }),

   verifyNewEmail: (userName: string, newEmail: string, otp: string) => ({
    subject: "Verify Your New Email Address",
    html: `
      <div style="font-family: Arial, sans-serif; color: #333;">
        <h2 style="color: #4CAF50;">New Email Verification</h2>
        <p>Dear ${userName || "User"},</p>
        <p>You have requested to change your email to <strong>${newEmail}</strong>. Please verify this new email by entering the following OTP code:</p>
        <p style="font-size: 20px; font-weight: bold; color: #555;">${otp}</p>
        <p>This OTP is valid for 5 minutes. Do not share it with anyone.</p>
        <p>If you did not request this change, please contact our support immediately.</p>
        <p>Best Regards,<br /><strong>The CilunaMarket Place Team</strong></p>
      </div>
    `,
  }),
};
