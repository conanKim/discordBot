const RESET = `
    DROP SCHEMA public CASCADE;
    CREATE SCHEMA public;
`;

module.exports = {
    reset: RESET,
};
