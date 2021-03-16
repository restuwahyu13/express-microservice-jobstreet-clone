import { Request, Response } from 'express'
import { setCreateJobsPublisher } from '../../services/publisher/jobs-publisher/service.create'
import { initCreateJobsSubscriber } from '../../services/subscriber/jobs-subscriber/service.create.'
import { getResponseSubscriber } from '../../../../companies-service/src/utils/util.message'
import { streamBox } from '../../utils/util.stream'

export const createJobsController = async (req: Request, res: Response): Promise<void> => {
	await setCreateJobsPublisher({
		companiesId: req.params.companiesId,
		jobsVancyLocation: req.body.jobsVancyLocation,
		jobsVancySalary: [...req.body.jobsVancySalary],
		jobsVancyPosition: req.body.jobsVancyPosition,
		jobsVancyCategory: req.body.jobsVancyCategory,
		jobsVancyWorkingTime: req.body.jobsVancyWorkingTime,
		jobsVancyExperince: req.body.jobsVancyExperince,
		jobsVancyStatus: req.body.jobsVancyStatus,
		jobsVancyDescription: req.body.jobsVancyDescription,
		jobsVancySkill: [...req.body.jobsVancySkill],
		jobsVancyAllowances: [...req.body.jobsVancyAllowances],
		jobsVancyAdditionalSkill: [...req.body.jobsVancyAdditionalSkill]
	})
	await initCreateJobsSubscriber()
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