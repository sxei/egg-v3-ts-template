import { Application } from 'egg';

module.exports = (app: Application) => {
  const { BIGINT, STRING, TEXT, TINYINT, BOOLEAN, NUMBER, fn, INTEGER, DATE } = app.Sequelize;
  const Demo = app.model.define(
    'bcms_demo',
    {
      id: {
        type: BIGINT({ length: 20 }),
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
        comment: '主键',
      },
      erp: {
        type: STRING(50),
        allowNull: false,
        unique: true,
        comment: 'ERP',
      },
      name: {
        type: STRING(50),
        allowNull: false,
        comment: '姓名',
      },
      height: {
        type: INTEGER,
        allowNull: true,
        comment: '身高',
      },
      gender: {
        type: STRING(50),
        allowNull: true,
        comment: '性别',
      },
      avatar: {
        type: STRING(1000),
        allowNull: true,
        comment: '头像',
      },
      edu: {
        type: TINYINT({ length: 4 }),
        allowNull: true,
        comment: '最高学历',
      },
      birthday: {
        type: DATE,
        allowNull: true,
        defaultValue: null,
        comment: '出生日期',
      },
      remark: {
        // type: TEXT,
        type: STRING(15000),
        allowNull: true,
        comment: '备注',
      },
      enable: {
        type: BOOLEAN,
        allowNull: true,
        defaultValue: true,
        comment: '是否启用',
      },
    },
    {
      freezeTableName: true,
      timestamps: true,
      indexes: [
        {
          name: 'idx_bcms_demo_erp',
          fields: ['erp'],
        },
      ],
    },
  );
  return Demo;
};

// createdAt: {
//   type: DATE,
//   allowNull: false,
//   defaultValue: fn('CURRENT_TIMESTAMP'),
//   field: 'created_at',
//   comment: '创建时间',
// },
// updatedAt: {
//   type: DATE,
//   allowNull: false,
//   defaultValue: fn('CURRENT_TIMESTAMP'),
//   onUpdate: '',
//   field: 'updated_at',
//   comment: '最后修改时间',
// },
