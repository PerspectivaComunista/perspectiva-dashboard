import { parse } from 'csv-parse';
import fs from 'node:fs';
import os from 'node:os';
import { finished } from 'stream/promises';
const { getFirestore } = require('firebase-admin/firestore');
const { firebaseServerApp } = require('@/lib/firebase/server');

export async function POST(request: Request) {
	const processFile = async (): Promise<any> => {
		let records: any[] = [];
		const formData = await request.formData();
		const csvFile = formData.get('file') as string | undefined;

		if (!csvFile) {
			return new Response('CSV undefined');
		}

		await fs.promises.writeFile(`${os.tmpdir()}/input.csv`, csvFile);

		const parser = fs.createReadStream(`${os.tmpdir()}/input.csv`).pipe(
			parse({
				columns: true,
				skip_empty_lines: true,
				delimiter: ',',
			})
		);
		parser.on('readable', function () {
			let record;
			while ((record = parser.read()) !== null) {
				// Work with each record
				records.push(record);
			}
		});
		await finished(parser);
		return records;
	};
	// Parse the CSV content
	const records = await processFile();

	console.log(records);

	const transformedData = records.map((record: any) => ({
		createdAt: new Date().toISOString(),
		name: record.Nume[0] + record.Nume.slice(1).toLowerCase(),
		address: record.Adresa ? record.Adresa : null,
		city: record.Oras ? record.Oras : null,
		county: record.Judet ? record.Judet : null,
		manager: record.Diriginte ? record.Diriginte : null,
		potential: record.Potential ? record.Potential.toLowerCase() : null,
		fidelity: record.Fidelitate ? record.Fidelitate.toLowerCase() : null,
		agentId: 'YdfnxEsV7qTPcET5vXCyOkWMezk1',
		staffCount: record.Staff ? parseInt(record.Staff) : null,
		phone: record.Telefon ? record.Telefon : null,
		email: record.Email ? record.Email : null,
		observations: record.Observatii ? record.Observatii : null,
		type: getTypeEnumFromTypeString(record.Tip),
	}));

	const db = getFirestore(firebaseServerApp);

	const batch = db.batch();
	const collectionRef = db.collection('pharmacies');

	transformedData.forEach((data: any) => {
		const docRef = collectionRef.doc();
		data.id = docRef.id;
		batch.set(docRef, data);
	});

	await batch.commit();

	return new Response('CSV uploaded and data stored successfully');
}

const getTypeEnumFromTypeString = (expertise: String) => {
	switch (expertise) {
		case 'LANT NATIONAL':
			return 'national';
		case 'LANT LOCAL':
			return 'regional';
		case 'LANT REGIONAL':
			return 'regional';
		default:
			return 'independent';
	}
};
