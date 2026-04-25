import User, {IUser}  from "./user.model";

export class UserRepository {
    async findByEmailWithPassword(email: string): Promise<IUser | null> {
        return User.findOne({ email }).select("+passwordHash").exec();
    }

    async findByEmail(email: string): Promise<IUser | null> {
        return User.findOne({ email }).exec();
    }

    async create(userData: Partial<IUser>): Promise<IUser> {
        const user = new User(userData);
        return user.save();
    }

    async update(id: string, updateData: Partial<IUser>): Promise<IUser | null> {
        return User.findByIdAndUpdate(id, updateData, { new: true }).exec();
    }

    async delete(id: string): Promise<IUser | null> {
        return User.findByIdAndDelete(id).exec();
    }   

    async findNearbySellers(coordinates: { lat: number; lng: number }, radiusKm: number): Promise<IUser[]> {
        const radiusInRadians = radiusKm / 6371; // Earth's radius in km

        return User.find({
            role: { $in: ["supplier", "both"] },
            "location.coordinates": {
                $geoWithin: {
                    $centerSphere: [[coordinates.lng, coordinates.lat], radiusInRadians],
                },
            },
        }).exec();
    }

    async existsByEmail(email: string): Promise<boolean> {
        const count = await User.countDocuments({ email }).exec();
        return count > 0;
    }
}

export const userRepository = new UserRepository();