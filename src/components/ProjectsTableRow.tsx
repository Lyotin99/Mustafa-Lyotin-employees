import { compareEmployeesInProject } from "../utils/compareEmployeesInProject";
import { EmployeeData } from "../utils/types";

interface ProjectsTableRowProps {
	employees: EmployeeData[];
}

const ProjectsTableRow = ({ employees }: ProjectsTableRowProps) => {
	const { emp1, emp2, max, projectId } = compareEmployeesInProject(
		Object.values(employees)
	);

	return (
		<tr>
			<td>{emp1}</td>

			<td>{emp2}</td>

			<td>{projectId}</td>

			<td>{max > 0 ? max : "No collaboration"}</td>
		</tr>
	);
};

export default ProjectsTableRow;
