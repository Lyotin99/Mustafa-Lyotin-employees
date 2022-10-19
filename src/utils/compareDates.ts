export const compareDates = (date1: number, date2: number) => {
	const diffInMs = date2 - date1;

	return Math.ceil(diffInMs / (1000 * 3600 * 24));
};
