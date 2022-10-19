export interface EmployeeData {
	empId: string;
	projectId: string;
	dateFrom: Date;
	dateTo: Date;
}

export interface Projects {
	[key: string]: {
		[key: string]: EmployeeData;
	};
}
