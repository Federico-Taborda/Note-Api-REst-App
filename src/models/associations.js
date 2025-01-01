import User from "./userModel.js";
import Note from "./noteModel.js";

// This file is used to define the associations between the models.

const setupAssociations = () => {
    User.hasMany(Note, { foreignKey: 'userId' });
    Note.belongsTo(User, { foreignKey: 'userId' });
}

export default setupAssociations;