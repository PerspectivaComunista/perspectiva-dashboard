function formatDateTime(ISOString: string): string {
	const date = new Date(ISOString);
	const currentYear = new Date().getFullYear();
	const dateYear = date.getFullYear();

	let string;

	if (dateYear === currentYear) {
		// If the date is in the current year, only display the month and day
		string = new Intl.DateTimeFormat('ro-RO', {
			month: 'long',
			day: 'numeric',
			hour: 'numeric',
			minute: 'numeric',
		}).format(date);
	} else {
		// If the date is in a previous year, display the full date with the year
		string = new Intl.DateTimeFormat('ro-RO', {
			year: 'numeric',
			month: 'long',
			day: 'numeric',
			hour: 'numeric',
			minute: 'numeric',
		}).format(date);
	}

	return string;
}

export default formatDateTime;
