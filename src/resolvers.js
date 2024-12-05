const { employees } = require("./data");
let employeeIdCounter = 1;

const resolvers = {
  Query: {
    listEmployees: (_, { filter, page = 1, limit = 10 }) => {
      let result = employees;

      if (filter) {
        result = result.filter((e) =>
          e.name.toLowerCase().includes(filter.toLowerCase())
        );
      }

      const start = (page - 1) * limit;
      const end = start + limit;
      return result.slice(start, end);
    },
    getEmployee: (_, { id }) => employees.find((e) => e.id === id),
  },
  Mutation: {
    addEmployee: (_, { name, age, class: className, subjects, attendance }) => {
      const newEmployee = {
        id: String(employeeIdCounter++),
        name,
        age,
        class: className,
        subjects,
        attendance,
      };
      employees.push(newEmployee);
      return newEmployee;
    },
    updateEmployee: (_, { id, name, age, class: className, subjects, attendance }) => {
      const employee = employees.find((e) => e.id === id);
      if (!employee) throw new Error("Employee not found");

      if (name) employee.name = name;
      if (age) employee.age = age;
      if (className) employee.class = className;
      if (subjects) employee.subjects = subjects;
      if (attendance) employee.attendance = attendance;

      return employee;
    },
  },
};

module.exports = { resolvers };

