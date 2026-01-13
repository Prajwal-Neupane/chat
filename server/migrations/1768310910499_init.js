/**
 * @type {import('node-pg-migrate').ColumnDefinitions | undefined}
 */
export const shorthands = undefined;

/**
 * @param {import('node-pg-migrate').MigrationBuilder} pgm
 */
export const up = (pgm) => {
  // Enable UUID extension
  pgm.createExtension("uuid-ossp", { ifNotExists: true });

  // Users table
  pgm.createTable("users", {
    id: {
      type: "uuid",
      primaryKey: true,
      default: pgm.func("uuid_generate_v4()"),
    },
    email: {
      type: "text",
      notNull: true,
      unique: true,
    },
    username: {
      type: "text",
      notNull: true,
    },
    password_hash: {
      type: "text",
      notNull: true,
    },
    created_at: {
      type: "timestamp",
      notNull: true,
      default: pgm.func("now()"),
    },
  });

  // Conversations table
  pgm.createTable("conversations", {
    id: {
      type: "uuid",
      primaryKey: true,
      default: pgm.func("uuid_generate_v4()"),
    },
    is_group: {
      type: "boolean",
      notNull: true,
      default: false,
    },
    created_at: {
      type: "timestamp",
      notNull: true,
      default: pgm.func("now()"),
    },
  });

  // Messages table
  pgm.createTable("messages", {
    id: {
      type: "uuid",
      primaryKey: true,
      default: pgm.func("uuid_generate_v4()"),
    },
    conversation_id: {
      type: "uuid",
      notNull: true,
      references: "conversations",
      onDelete: "cascade",
    },
    sender_id: {
      type: "uuid",
      notNull: true,
      references: "users",
      onDelete: "cascade",
    },
    content: {
      type: "text",
      notNull: true,
    },
    created_at: {
      type: "timestamp",
      notNull: true,
      default: pgm.func("now()"),
    },
  });
};

/**
 * @param {import('node-pg-migrate').MigrationBuilder} pgm
 */
export const down = (pgm) => {
  pgm.dropTable("messages");
  pgm.dropTable("conversations");
  pgm.dropTable("users");
};
