const RESET = `
    DROP SCHEMA public CASCADE;
    CREATE SCHEMA public;
`;

const DB_LIST = `
SELECT * FROM information_schema.tables WHERE table_schema = 'public';
`

module.exports = {
    reset: RESET,
    dbList: DB_LIST
};
