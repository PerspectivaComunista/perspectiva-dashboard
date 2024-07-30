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

	const transformedData = records.map((record: any) => ({
		createdAt: new Date().toISOString(),
		firstName: record.Nume[0] + record.Nume.slice(1).toLowerCase(),
		lastName: record.Prenume[0] + record.Prenume.slice(1).toLowerCase(),
		location: record.Locatie ? record.Locatie : null,
		address: record.Adresa ? record.Adresa : null,
		city: record.Oras ? record.Oras : null,
		county: record.Judet ? record.Judet : null,
		infants: record.Sugari ? record.Sugari : null,
		potential: record.Potential
			? record.Potential.toLowerCase() == 'a+'
				? 'aplus'
				: record.Potential.toLowerCase()
			: null,
		fidelity: record.Fidelitate ? record.Fidelitate.toLowerCase() : null,
		agentId: 'YdfnxEsV7qTPcET5vXCyOkWMezk1',
		dateOfBirth: record.DN ? formatDate(record.DN).toISOString() : null,
		phone: record.Telefon ? record.Telefon : null,
		email: record.Email ? record.Email : null,
		observations: record.Observatii ? record.Observatii : null,
		schedule: record.Orar ? record.OrarF : null,
		expertise: getExpertiseEnumFromExpertiseString(record.Titulatura),
	}));

	const db = getFirestore(firebaseServerApp);

	const batch = db.batch();
	const collectionRef = db.collection('doctors');

	transformedData.forEach((data: any) => {
		const docRef = collectionRef.doc();
		data.id = docRef.id;
		batch.set(docRef, data);
	});

	await batch.commit();

	return new Response('CSV uploaded and data stored successfully');
}

const formatDate = (date: string) => {
	const dateParts = date.split('.');
	return new Date(parseInt(dateParts[2]), parseInt(dateParts[1]), parseInt(dateParts[0]));
};

const getExpertiseEnumFromExpertiseString = (expertise: String) => {
	switch (expertise) {
		case 'PED':
			return 'pediatrics';
		case 'ORL':
			return 'otorhinolaryngology';
		case 'INFECTIOASE':
			return 'infectiousDiseases';
		case 'MF':
			return 'familyMedicine';
		case 'DERMATO':
			return 'dermatology';
		case 'DERMATOLOGIE':
			return 'dermatology';
		case 'NPI':
			return 'neurologyPsychiatry';
		case 'NN':
			return 'neonatology';
		case 'NEONATOLOGIE':
			return 'neonatology';
		case 'PNEUMOLOGIE':
			return 'pulmonology';
		case 'PNEUMO':
			return 'pulmonology';
		case 'ALERGOLOGIE':
			return 'allergyClinicalImmunology';
		case 'ALERGO':
			return 'allergyClinicalImmunology';
		case 'GASTROENTEROLOGIE':
			return 'gastroenterology';
		case 'GASTRO':
			return 'gastroenterology';
		case 'NEFROLOGIE':
			return 'nephrology';
		case 'NEFRO':
			return 'nephrology';
		default:
			return 'other';
	}
};
