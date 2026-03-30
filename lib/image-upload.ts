"use server";

import { imagekit } from "./image-kit";

export const ImageUpload = async (file: File) => {
	if (!file) return null;
	try {
		const imageKitRef = await imagekit.files.upload({
			file: file,
			fileName: `image-${Date.now()}.png`,
			folder: "/journal-images",
		});

		return imageKitRef?.url ?? null;
	} catch (error) {
		console.error("ImageKit upload error:", error);
		return null;
	}
};
