const uploadFileToStorage = async (coverImage: File, bucket: any, categoryName: string) => {
	const file = bucket.file(`assets/${categoryName}`);
	const fileStream = file.createWriteStream();

	return new Promise(async (resolve, reject) => {
		fileStream.on('error', (err: any) => {
			console.error(`Error uploading file: ${err}`);
			reject(err);
		});

		fileStream.on('finish', async () => {
			file.getSignedUrl({ action: 'read', expires: '03-09-2491' }, (err: any, downloadURL: string) => {
				if (err) {
					console.error(`Error getting signed URL: ${err}`);
					reject(err);
				} else {
					console.log('File uploaded successfully.');
					resolve(downloadURL);
				}
			});
		});

		// Create a buffer from the file
		const buffer = Buffer.from(await coverImage.arrayBuffer());

		// Pipe the ArrayBuffer to the storage stream
		fileStream.end(buffer);
	});
};

export default uploadFileToStorage;
