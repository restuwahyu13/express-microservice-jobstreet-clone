type WorkExperince = {
	readonly companyName?: string
	readonly jobPosition?: string
	readonly startDate?: string
	readonly endDate?: string
	readonly workInformation?: string
}

type Education = {
	readonly institutionName?: string
	readonly educationDegree?: string
	readonly fieldStudy?: string
	readonly startDate?: string
	readonly endDate?: string
	readonly educationInformation?: string
}

type JobPreferences = {
	readonly jobInterests: string[]
	readonly workTypes: string[]
	readonly salaryExpectation: number
	readonly workCityPreferences: string[]
}

type SocialNetwork = {
	readonly facebook: string
	readonly twitter: string
	readonly instagram: string
	readonly linkedIn: string
	readonly behance: string
	readonly dribbble: string
	readonly github: string
	readonly codepen: string
	readonly vimeo: string
	readonly youtube: string
	readonly pinterest: string
	readonly website: string
}

type Appreciation = {
	readonly awardTitle: string
	readonly achievementTitle: string
	readonly awardYear: string
	readonly awardInformation: string
}

type VolunteerExperience = {
	readonly organizationName: string
	readonly organizationPosition: string
	readonly startDate: string
	readonly endDate: string
	readonly organizationInformation: string
}

export interface IRequest {
	readonly firstName?: string
	readonly lastName?: string
	readonly email?: string
	readonly password?: string
	readonly location?: string
	readonly phone?: number
	readonly userId?: string
	readonly photo?: string
	readonly gender?: string
	readonly birthDate?: any
	readonly status?: string
	readonly nationality?: string
	readonly aboutme?: string
	readonly resume?: string
	readonly skills?: string[]
	readonly workExperiences?: WorkExperince
	readonly educations?: Education
	readonly jobPreferences?: JobPreferences
	readonly socialNetworks?: SocialNetwork
	readonly appreciations?: Appreciation
	readonly volunteerExperiences?: VolunteerExperience
}
