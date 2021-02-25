import { Publisher } from '../../utils/util.publisher'

export const setCreateProfilePublisher = async (data: Record<string, any>): Promise<void> => {
	const createProfilePublisher = new Publisher({ key: 'Profile' })
	if (Object.keys(data).length > 0 && data) {
		await createProfilePublisher.setMap('cprofile:service', { ...data })
	} else {
		await createProfilePublisher.setMap('cprofile:service', {})
	}
}