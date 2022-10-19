import { compareDates } from "./compareDates";
import { EmployeeData } from "./types";

export const compareEmployeesInProject = (employees: EmployeeData[]) => {
	let max: number = 0,
		emp1: string = "",
		emp2: string = "",
		projectId: string = "";

	employees.forEach((el, i) => {
		const employeeOne = el;

		for (let k = i + 1; k < employees.length; k++) {
			const employeeTwo = employees[k];

			if (employeeOne.projectId !== employeeTwo.projectId) break;

			const startDate = Math.max(
				employeeOne.dateFrom.getTime(),
				employeeTwo.dateFrom.getTime()
			);
			const endDate = Math.min(
				employeeOne.dateTo.getTime(),
				employeeTwo.dateTo.getTime()
			);
			const compareDatesResult = compareDates(startDate, endDate);

			if (max < compareDatesResult) {
				max = compareDatesResult;
				emp1 = employeeOne.empId;
				emp2 = employeeTwo.empId;
				projectId = employeeOne.projectId;
			} else if (employees.length === k + 1 && max <= 0) {
				emp1 = employeeOne.empId;
				emp2 = employeeTwo.empId;
				projectId = employeeOne.projectId;
			}
		}
	});

	return { max, emp1, emp2, projectId };
};
