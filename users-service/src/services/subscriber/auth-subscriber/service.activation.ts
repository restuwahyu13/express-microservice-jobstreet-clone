import { Subscriber } from '../../../utils/util.subscriber'
import { setResponsePublisher } from '../../../utils/util.message'
import { userSchema } from '../../../models/model.user'
import { UsersDTO } from '../../../dto/dto.users'
import { IUser } from '../../../interface/interface.user'

export const initActivationSubscriber = async (): Promise<void> => {
	const activationSubscriber = new Subscriber({ key: 'Users Activation' })
	const { email }: IUser = await activationSubscriber.getMap('users-activation:service')

	try {
		const checkUser: UsersDTO = await userSchema.findOne({ email }).lean()

		if (!checkUser) {
			await setResponsePublisher({
				status: 404,
				message: 'userId is not exist for this users, please create new account'
			})
		} else {
			if (checkUser.active === true) {
				await setResponsePublisher({
					status: 400,
					message: 'user account has been active, please login'
				})
			} else {
				const updateActivation: UsersDTO = await userSchema
					.findByIdAndUpdate(checkUser._id, {
						active: true,
						updatedAt: new Date()
					})
					.lean()

				if (!updateActivation) {
					await setResponsePublisher({
						status: 403,
						message: 'activation account failed, please resend new token'
					})
				}

				await setResponsePublisher({
					status: 200,
					message: 'activation account successfully, please login'
				})
			}
		}
	} catch (error) {
		await setResponsePublisher({
			status: 500,
			message: `internal server error: ${error}`
		})
	}
}
