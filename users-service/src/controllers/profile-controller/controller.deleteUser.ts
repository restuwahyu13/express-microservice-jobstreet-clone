import { Request, Response } from 'express'
import { setDeleteUserPublisher } from '../../services/publisher/external-publisher/service.deleteUser'
import { initDeleteUsersSubscriber } from '../../services/subscriber/profile-subscriber/service.deleteUser'
import { getResponseSubscriber } from '../../utils/util.message'
import { streamBox } from '../../utils/util.stream'
import { kafkaConsumer } from '../../utils/util.kafka'

export const deleteUserController = async (req: Request, res: Response): Promise<void> => {
	const response = await kafkaConsumer('fromProfile:delete')
	await setDeleteUserPublisher({ userId: response.messages.userId })
	await initDeleteUsersSubscriber()
	const { status, message } = await getResponseSubscriber()

	if (status >= 400) {
		streamBox(res, status, {
			method: req.method,
			status,
			message
		})
	} else {
		streamBox(res, status, {
			method: req.method,
			status,
			message
		})
	}
}
