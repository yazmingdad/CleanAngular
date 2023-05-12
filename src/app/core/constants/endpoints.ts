const rootUrl = 'https://localhost:7297';
export const tokenEndpoint = `${rootUrl}/token`;
export const userEndpoint = `${rootUrl}/api/User`;
export const usersEndpoint = `${userEndpoint}/up`;
export const rolesEndPoint = `${userEndpoint}/roles`;
export const addRoleEndPoint = `${userEndpoint}/addrole`;
export const removeRoleEndPoint = `${userEndpoint}/removerole`;
export const disableUserEndPoint = `${userEndpoint}/disableuser`;
export const resetPasswordEndPoint = `${userEndpoint}/resetpassword`;
export const setPasswordEndPoint = `${userEndpoint}/setpassword`;

const collectorUrl = 'https://localhost:7083';

export const missionEndpoint = `${collectorUrl}/api/Mission`;
export const activeMissionEndPoint = `${missionEndpoint}/active`;
export const cancelledMissionEndPoint = `${missionEndpoint}/cancelled`;
export const priorityEndpoint = `${missionEndpoint}/priorities`;

export const employeeEndpoint = `${collectorUrl}/api/Employee`;
export const employeeLightEndPoint = `${employeeEndpoint}/Light`;

export const cardEndpoint = `${collectorUrl}/api/Card`;
export const rankEndPoint = `${collectorUrl}/api/Rank`;
export const departmentEndPoint = `${collectorUrl}/api/Department`;
export const upDepartmentEndPoint = `${departmentEndPoint}/up`;
export const downDepartmentEndPoint = `${departmentEndPoint}/down`;

export const departmentTypesEndPoint = `${departmentEndPoint}/Types`;

export const localizationEndpoint = `${collectorUrl}/api/Localization`;
export const citiesEndPoint = `${localizationEndpoint}/Cities`;
