import { NotificationValues } from "@/types/profile";


 export const notificationsConfig: { key: keyof NotificationValues; label: string; description: string }[] = [
   {
     key: "orderConfirmation",
     label: "Order Confirmation",
     description: "Every time a consumer orders any goods, you will get a notification.",
   },
   {
     key: "orderStatusChanged",
     label: "Order Status Changed",
     description: "In the event that the client makes modifications to the order, you will be alerted.",
   },
   {
     key: "orderDelivered",
     label: "Order Delivered",
     description: "A notification will be sent to you once the order has been delivered.",
   },
   {
     key: "emailNotification",
     label: "Email Notification",
     description: "If you want to get updates by email, you need to enable email notifications.",
   },
 ];
  

  