import { Subscriber } from '../../utils/util.subscriber'
import { setResponsePublisher } from '../../utils/util.message'
import { toJson } from '../../utils/util.parse'
import { profileSchema } from '../../models/model.profile'
import { ProfilesDTO } from '../../dto/dto.profile'
import { IProfile } from '../../interface/interface.profile'

export const initUpdateSubscriber = async (): Promise<void> => {
	const updateSubscriber = new Subscriber({ key: 'Update' })
	const { userId }: IProfile = await updateSubscriber.getMap('update:service')
	try {
		const checkUser: ProfilesDTO = await profileSchema.findOne({ userId })

		await setResponsePublisher({
			status: 200,
			message: 'login successfully',
			data: toJson(checkUser)
		})
	} catch (err) {
		await setResponsePublisher({
			status: 500,
			message: 'internal server error'
		})
	}
}
