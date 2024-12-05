const { gql } = require("apollo-server-express");

const typeDefs = gql`
  type Employee {
    id: ID!
    name: String!
    age: Int!
    class: String!
    subjects: [String!]!
    attendance: Int!
  }

  type Query {
    listEmployees(filter: String, page: Int, limit: Int): [Employee!]
    getEmployee(id: ID!): Employee
  }

  type Mutation {
    addEmployee(name: String!, age: Int!, class: String!, subjects: [String!]!, attendance: Int!): Employee
    updateEmployee(id: ID!, name: String, age: Int, class: String, subjects: [String!], attendance: Int): Employee
  }
`;

module.exports = { typeDefs };
