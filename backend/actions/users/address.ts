"use server";

import UserModel from "../../models/user";
import mongoose from "mongoose";

interface AddressInput {
	contactName: string;
	mobileNumber: string;
	street: string;
	province: string;
	district: string;
	town: string;
	country: string;
	zip: string;
	isDefault: boolean;
}

export async function createAddress(userId: string, addressData: AddressInput) {
	try {
		const { contactName, mobileNumber, street, province, district, town, country, zip, isDefault } = addressData;

		// Optionally, unset existing default if this is a new default
		if (isDefault) {
			await UserModel.updateOne(
				{ _id: userId, "addresses.isDefault": true },
				{ $set: { "addresses.$.isDefault": false } }
			);
		}

		const address = {
			contactName,
			mobileNumber,
			street,
			province,
			district,
			town,
			country,
			zip,
			isDefault,
		};

		const newAddress = {
			_id: new mongoose.Types.ObjectId(), // unique ID for the address
			...address,
		};

		const updatedUser = await UserModel.findByIdAndUpdate(
			userId,
			{ $push: { addresses: newAddress } },
			{ new: true } // return the updated document
		);

		return { success: true, message: "Address added successfully", address: newAddress };
	} catch (error: any) {
		console.error("Error adding address:", error);
		return { success: false, message: error.message };
	}
}

interface AddressUpdateInput {
	contactName?: string;
	mobileNumber?: string;
	street?: string;
	province?: string;
	district?: string;
	town?: string;
	country?: string;
	zip?: string;
	isDefault?: boolean;
}

export async function updateAddress(userId: string, addressId: string, updates: AddressUpdateInput) {
	try {
		if (updates.isDefault === true) {
			// First set all addresses to false
			await UserModel.updateOne(
				{ _id: userId, "addresses.isDefault": true },
				{ $set: { "addresses.$.isDefault": false } }
			);
		}

		// Update the target address
		const updatedUser = await UserModel.findOneAndUpdate(
			{ _id: userId, "addresses._id": addressId },
			{ $set: Object.fromEntries(Object.entries(updates).map(([k, v]) => [`addresses.$.${k}`, v])) },
			{ new: true }
		);

		if (!updatedUser) return { success: false, message: "Address not found" };

		return { success: true, message: "Address updated successfully" };
	} catch (error: any) {
		console.error("Error updating address:", error);
		return { success: false, message: error.message };
	}
}

// export async function updateAddress(
//   userId: string,
//   addressId: string,
//   updates: AddressUpdateInput
// ) {
//   try {
//     const user = await UserModel.findById(userId);
//     if (!user) return { success: false, message: "User not found" };

//     console.log("user: ", user.addresses);
//     console.log("addressId: ", addressId);

//     // Find the target address
//     const address = user.addresses.id(addressId);

//     console.log("address found: ", address);
//     if (!address) return { success: false, message: "Address not found" };

//     // Handle default address: only one should be default
//     if (updates.isDefault === true) {
//       user.addresses.forEach((addr: any) => {
//         addr.isDefault = addr._id.toString() === addressId;
//       });
//     }

//     // Update other fields
//     Object.assign(address, updates);

//     await user.save();

//     return { success: true, user };
//   } catch (error: any) {
//     console.error("Error updating address:", error);
//     return { success: false, message: error.message };
//   }
// }
