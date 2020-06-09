export class Employee {
	id;
	firstName;
	lastName;
	email;
	contactNo;
	department;
	position;
	status;
	gender;
	dateJoined;
	role;
}

// id is autoincremented from postgres type: Number
// firstname and last name type: String;

// email will be autoformed like in organizations
// It will take this format Lastname.f@organization.com.  'f' is the first letter of the firstname in lowercase
// organization in this case can simply be hng;
// e.g Lan.h@hng.com

// departments, we could use the various tracks to diffrentiate, mobile, backend, frontend, UI, design.

// status is single or married.

// position is an optional field for users. It covers things like Head of Department, CEO etc.

// role is for access reasons. By default for all employees it is 'basic'. Head of Departments will have the 'supervisor' role and we that created the API will have the 'admin' role
