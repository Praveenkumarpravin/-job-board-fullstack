/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = async function (knex) {
    return knex.schema.createTable('jobs', function (table) {
        table.uuid('id').primary().defaultTo(knex.raw('(UUID())'));
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
        table.timestamp("created_at").defaultTo(knex.fn.now());
    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
    return knex.schema.dropTable('jobs');
};
