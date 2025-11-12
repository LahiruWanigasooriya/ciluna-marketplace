"use client";

import { useState } from "react";
import Switch from "@/components/custom/Switch";
import Title from "@/components/custom/Title";
import { NotificationValues } from "@/types/profile";
import { updateUserProfile } from "@/backend/actions/users/user";
import { toast } from "sonner";
import { notificationsConfig } from "@/config/notificationsConfig";

interface NotificationSettingsProps {
	initialData: NotificationValues;
}

const NotificationSettings: React.FC<NotificationSettingsProps> = ({ initialData }) => {
	const [notifications, setNotifications] = useState<NotificationValues>(initialData);
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	const [loading, setLoading] = useState(false);

	const toggleNotification = async (key: keyof NotificationValues, label: string) => {
		const updatedNotifications = {
			...notifications,
			[key]: !notifications[key],
		};

		setNotifications(updatedNotifications); // Optimistic UI update
		setLoading(true);

		try {
			// Call updateUserProfile to save notification settings
			const response = await updateUserProfile({
				notificationSettings: updatedNotifications,
			});

			if (response.success) {
				toast.success(`${label} state update!`);
			} else {
				toast.error(`❌ Failed to update`);
				setNotifications(notifications); // Revert UI if API fails
			}
		} catch (error) {
			console.error("Update error:", error);
			toast.error("❌ Error updating notification settings.");
			setNotifications(notifications); // Revert UI in case of error
		} finally {
			setLoading(false);
		}
	};

	return (
		<div className="flex flex-col gap-6">
			<p className="font-interSemiBold text-base lg:text-lg text-white">Notification Information</p>
			<div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-3 xl:gap-x-24">
				{notificationsConfig.map(({ key, label, description }) => (
					<div key={key} className="flex flex-col items-start gap-2 xl:gap-3">
						<p className="text-sm md:text-base font-medium">{label}</p>
						<div className="flex justify-between items-center gap-4 w-full">
							<p className="text-xs md:text-sm font-light">{description}</p>
							<Switch isChecked={notifications[key]} onToggle={() => toggleNotification(key, label)} />
						</div>
					</div>
				))}
			</div>
		</div>
	);
};

export default NotificationSettings;
