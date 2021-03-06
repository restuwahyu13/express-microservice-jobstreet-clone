import { Request, Response } from 'express'
import { UploadApiResponse } from 'cloudinary'
import { setUpdateCompaniesPublisher } from '../../services/publisher/profile-publisher/service.update'
import { initUpdateCompaniesSubscriber } from '../../services/subscriber/profile-subscriber/service.update'
import { streamBox } from '../../utils/util.stream'
import { getResponseSubscriber } from '../../utils/util.message'
import { cloudStorage } from '../../utils/util.cloud'
import { expressValidator } from '../../utils/util.validator'

export const updateCompaniesController = async (req: Request, res: Response): Promise<void> => {
	const errors = expressValidator(req)

	if (errors.length > 0) {
		streamBox(res, 400, {
			method: req.method,
			status: 400,
			errors
		})
	} else {
		const singleUrl: UploadApiResponse[] = []
		const multipleUrl: string[] = []

		const photo: Express.Multer.File[] = req.files['photo']
		const document: Express.Multer.File[] = req.files['banner']
		const gallery: Express.Multer.File[] = req.files['gallery']

		const singleUpload: Array<Record<string, any>> = photo.concat(document)
		const multipleUpload = gallery

		for (const file of singleUpload) {
			try {
				const response = (await cloudStorage(file.path)) as UploadApiResponse
				singleUrl.push(response)
			} catch (error) {
				throw new Error(error)
			}
		}

		for (const file of multipleUpload) {
			try {
				const response = (await cloudStorage(file.path)) as UploadApiResponse
				multipleUrl.push(response.secure_url)
			} catch (error) {
				throw new Error(error)
			}
		}

		await setUpdateCompaniesPublisher({
			companiesId: req.params.companiesId,
			companyName: req.body.companyName,
			email: req.body.email,
			phone: req.body.phone,
			photo: singleUrl[0].secure_url,
			bannerPhoto: singleUrl[1].secure_url,
			industry: req.body.industry,
			overview: req.body.overview,
			gallery: multipleUrl
		})
		await initUpdateCompaniesSubscriber()
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
}
