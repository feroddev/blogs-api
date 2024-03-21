const BlogPostModel = (sequelize, DataTypes) => {
  const BlogPost = sequelize.define('BlogPost', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    content: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    userId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'User',
        key: 'id',
      },
      primaryKey: true,
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
    },
    published: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    updated: {
      type: DataTypes.DATE,
      allowNull: false,
    }
}, {
  tableName: 'blog_posts',
  createdAt: 'published',
  updatedAt: 'updated',
  underscored: true,
}
);
  BlogPost.associate = (models) => {
    BlogPost.belongsTo(models.User, { 
      foreignKey: 'userId', 
      as: 'user',
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE'
    });
  };

  return BlogPost;
};

module.exports = BlogPostModel;