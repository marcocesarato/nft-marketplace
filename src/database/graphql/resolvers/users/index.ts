import {MutationCreateUserArgs, MutationUpdateUserArgs, User as UserModel} from "@app/types";
import User from "@models/User";

const resolvers = {
	Query: {
		allUsers: async (): Promise<UserModel[]> => {
			return await User.find({});
		},
		getUser: async (_: any, {_id}): Promise<UserModel> => {
			let user = User.findOne({_id});
			if (!user) {
				throw new Error("No user found");
			}
			return user;
		},
	},
	Mutation: {
		createUser: async (_, {data}: MutationCreateUserArgs): Promise<UserModel> => {
			const user = new User(data);
			return await user.save();
		},
		updateUser: async (_, {_id, data}: MutationUpdateUserArgs): Promise<UserModel> => {
			let user = await User.findById(_id);
			if (!user) {
				throw new Error("No user found");
			}
			user = await User.findOneAndUpdate({_id}, data, {
				new: true,
			});
			return user;
		},
	},
};

export default resolvers;
