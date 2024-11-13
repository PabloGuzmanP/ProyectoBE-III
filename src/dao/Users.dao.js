import userModel from "./models/User.js";


export default class Users {
    
    get = (params) =>{
        return userModel.find(params);
    }

    getBy = (params) =>{
        return userModel.findById(params)
    }

    save = (doc) =>{
        return userModel.create(doc);
    }
    saveMany = (docs) =>{
        return userModel.insertMany(docs)
    }

    update = (id,doc) =>{
        return userModel.findByIdAndUpdate(id,{$set:doc})
    }

    delete = (id) =>{
        return userModel.findByIdAndDelete(id);
    }

    removePetFromUser = async (userId, petId) => {
        try {
            const updatedUser = await userModel.findByIdAndUpdate(
                userId,
                { $pull: { pets: { _id: petId } } },
                { new: true }
            );
            return updatedUser;
        } catch (error) {
            throw new Error(`Error al eliminar el pet: ${error.message}`);
        }
    }
}