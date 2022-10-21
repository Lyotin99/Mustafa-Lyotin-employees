import { checkDatesCrossing } from "./checkDatesCrossing";
import { Projects } from "./types";

export const getMostCombinedPair = (
	projects: Projects,
	employees: string[]
) => {
	let employeesMap: {
		[key: string]: {
			[key: string]: {
				empId: string;
				projects: string[];
				workedTogether: number;
			};
		};
	} = {};

	employees.forEach((employeeId) => {
		Object.entries(projects).forEach((project) => {
			if (!Object.keys(project[1]).includes(employeeId)) return;

			const currEmployee = Object.values(project[1]).find(
				(employee) => employeeId === employee.empId
			);

			if (!currEmployee) return;

			Object.values(project[1]).forEach((empData) => {
				if (empData.empId === employeeId) return;

				const { dateFrom, dateTo, empId, projectId } = empData;
				const startDayX = currEmployee.dateFrom.getTime();
				const endDayX = currEmployee.dateTo.getTime();
				const startDayY = dateFrom.getTime();
				const endDayY = dateTo.getTime();
				const compareDatesResult = checkDatesCrossing(
					startDayX,
					startDayY,
					endDayX,
					endDayY
				);

				if (
					!employeesMap[employeeId] ||
					!employeesMap[employeeId][empId]
				) {
					employeesMap[employeeId] = {
						...employeesMap[employeeId],
						[empId]: {
							empId,
							projects: [projectId],
							workedTogether:
								compareDatesResult > 0 ? compareDatesResult : 0,
						},
					};
				} else {
					employeesMap[employeeId][empId].projects.push(projectId);
					employeesMap[employeeId][empId].workedTogether +=
						compareDatesResult > 0 ? compareDatesResult : 0;
				}
			});
		});
	});

	const sortedEmployees = Object.entries(employeesMap).map((employeeData) => {
		return {
			employee: employeeData[0],
			colleague: Object.entries(employeeData[1]).sort((a, b) => {
				return b[1].workedTogether - a[1].workedTogether;
			})[0][1],
		};
	});

	return Object.entries(sortedEmployees).sort((a, b) => {
		return b[1].colleague.workedTogether - a[1].colleague.workedTogether;
	})[0][1];
};
