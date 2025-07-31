/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
    return knex.schema.createTable('jobs', function (table) {
        table.increments('id').primary();
        table.string('image_url');
        table.string('position');
        table.string('jobLocation');
        table.string('salaryFrom');
        table.string('salaryTo');
        table.string('description');
        table.string('company');
        table.string('jobType');
        table.string('status');
        table.string('workMode');
    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
    return knex.schema.dropTable('jobs');
};
