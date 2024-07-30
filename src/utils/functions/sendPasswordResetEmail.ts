import { Auth } from 'firebase-admin/auth';
import nodemailer from 'nodemailer';

export async function sendPasswordResetEmail(auth: Auth, email: string): Promise<void> {
	const resetLink = await auth.generatePasswordResetLink(email);

	const transporter = nodemailer.createTransport({
		host: 'mail.wolfdigitalmedia.ro',
		port: 465,
		secure: true,
		auth: {
			user: 'drphyto@wolfdigitalmedia.ro',
			pass: 'l!+o98.jFObU',
		},
	});

	await transporter.sendMail({
		from: `"Dr. Phyto" < no-reply@drphyto.ro >`,
		to: email,
		subject: `Contul tau Dr. Phyto`,
		text: `Salut! \n\nAi primit acest email pentru ca ai fost adaugat ca administrator pe platforma Dr. Phyto. \n\nPentru a-ti seta parola, acceseaza link-ul de mai jos: \n\n${resetLink} \n\nCu drag, \nEchipa Dr. Phyto`,
	});
}
