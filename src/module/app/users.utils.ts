import { User } from './users.model'

export const createID = async () => {
  const previousId = (await getPreviousID()) || (0).toString().padStart(5, '0')
  const currentSerial = parseInt(previousId) + 1
  const currentId = currentSerial.toString().padStart(5, '0')
  console.log('user current id is:', currentId)
  return currentId
}
const getPreviousID = async () => {
  const createId = await User.findOne({}, { id: 1, _id: 0 })
    .sort({
      createdAt: -1,
    })
    .lean()
  return createId?.id
}
export default {
  createID,
}
