import { createReadStream } from 'fs';

async function uploadAndGenerateSignedUrl(csvFilePath: string, bucket: any, name: string): Promise<string | null> {
	const file = bucket.file(`csv/${name}.csv`);
	const fileStream = file.createWriteStream();

	return new Promise((resolve, reject) => {
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

		// Create a readable stream from the CSV file
		const readStream = createReadStream(csvFilePath);

		// Pipe the readable stream to the storage stream
		readStream.pipe(fileStream);
	});
}

export default uploadAndGenerateSignedUrl;
