import { checkDatesCrossing } from "./checkDatesCrossing";
import { EmployeeData } from "./types";

export const compareEmployeesInProject = (employees: EmployeeData[]) => {
	let max: number = 0,
		emp1: string = "",
		emp2: string = "",
		projectId: string = "";

	employees.forEach((employeeOne, i) => {
		for (let k = i + 1; k < employees.length; k++) {
			const employeeTwo = employees[k];

			if (employeeOne.projectId !== employeeTwo.projectId) break;

			const startDayX = employeeOne.dateFrom.getTime();
			const endDayX = employeeOne.dateTo.getTime();
			const startDayY = employeeTwo.dateFrom.getTime();
			const endDayY = employeeTwo.dateTo.getTime();
			const compareDatesResult = checkDatesCrossing(
				startDayX,
				startDayY,
				endDayX,
				endDayY
			);

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
