const rootUrl = 'https://localhost:7297';
export const tokenEndpoint = `${rootUrl}/token`;
export const userEndpoint = `${rootUrl}/api/User`;

const collectorUrl = 'https://localhost:7083';

export const employeeEndpoint = `${collectorUrl}/api/Employee`;
export const cardEndpoint = `${collectorUrl}/api/Card`;
export const rankEndPoint = `${collectorUrl}/api/Rank`;
export const departmentEndPoint = `${collectorUrl}/api/Department`;
export const centralDepartmentEndPoint = `${departmentEndPoint}/Central`;
export const regionalDepartmentEndPoint = `${departmentEndPoint}/Regional`;
export const provincialDepartmentEndPoint = `${departmentEndPoint}/Provincial`;
