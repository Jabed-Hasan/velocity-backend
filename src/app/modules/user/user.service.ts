import { UserModel } from "./user.model";
import { TUser } from "./user.interface";

// 3. Get all user 
const getAllUser = async () => {
    const result = await UserModel.find();
    return result;
};

// 3. Get a Specific user
const getSingleUser = async (id: string) => {
    const result = await UserModel.findById(id);
    return result;
};

// Update user information
const updateUser = async (id: string, payload: Partial<TUser>) => {
    // Don't allow role update through this endpoint
    delete payload.role;
    
    // Don't allow password updates through this regular update endpoint
    delete payload.password;
    
    // Create a copy of the payload to avoid modifying the original
    const updatedData = { ...payload };
    
    // NOTE: We've added middleware to handle password hashing in findOneAndUpdate
    // So we don't need to hash the password here anymore
    
    // Using $set operator explicitly to ensure middleware processes it correctly
    console.log('Updating user with data:', updatedData);
    
    // Update the user with the modified data
    const result = await UserModel.findOneAndUpdate(
        { _id: id }, 
        { $set: updatedData }, 
        { new: true, runValidators: true }
    );
    
    console.log('Updated user:', result);
    
    return result;
};

// Dedicated function for changing password
const changePassword = async (id: string, newPassword: string) => {
    // Using $set operator explicitly to ensure middleware processes it correctly
    console.log(`Changing password for user ID: ${id}`);
    
    // First check if the user exists
    const existingUser = await UserModel.findById(id);
    if (!existingUser) {
        console.log(`changePassword service: User with ID ${id} not found`);
        throw new Error(`User with ID ${id} not found`);
    }
    
    console.log('User found, updating password');
    
    // Update only the password field
    const result = await UserModel.findOneAndUpdate(
        { _id: id }, 
        { $set: { password: newPassword } }, 
        { new: true }
    );
    
    if (!result) {
        console.log('Password update failed - user not found during update');
        throw new Error('Password update failed');
    }
    
    console.log('Password updated successfully');
    return result;
};

export const userService = { 
    getSingleUser, 
    getAllUser, 
    updateUser,
    changePassword 
}