 "use server"
 
 // Assume this generates a temp password
import { sendEmail } from "../utils/sendEmail";
import { generateTemporaryPassword } from "../utils/generateTempPassword";
import { resetPassword } from "./user";
import { emailTemplates } from "../utils/emailTemplates";

export const resendTemporaryPassword = async (email: string) => {
  try {
    // Generate a temporary password
    const tempPassword: string = generateTemporaryPassword();

    // Update the database with the new password
    const response = await resetPassword(email, tempPassword);


    // Send email only if the password update was successful
    if (response.success) {
      // Get email template
      const { subject, html } = emailTemplates.temporaryPassword(
        response.userName || "User",
        tempPassword
      );

      // Send the email
      await sendEmail(email, subject, html);

      return { success: true, message: "Temporary password sent successfully." };
    } else {
      return { success: false, message: response.message || "Failed to update password." };
    }
  } catch (error) {
    console.error("Error resending temporary password:", error);
    return { success: false, message: "Failed to send the temporary password." };
  }
};

