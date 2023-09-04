export type User = {
	username: string,
	email: string
}

export type ParkingPass = {
	id: string,
	registered: EpochTimeStamp,
	expiration: EpochTimeStamp,
	grade: number,
	valid: boolean,
	user: User
}