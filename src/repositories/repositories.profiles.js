import { Profile } from "../database/mongo/models/models.profile.js";


function getProfileDTO(profile){
    const id = profile._id
    delete (profile._id)
    return {
        id: profile._id,
        ...profile
    }
}
export class ProfilesRepository{
    async create({firstName,lastName,profilePicture}){
        try{
            const newProfile = await Profile.create({firstName,lastName,profilePicture})
            if (!newProfile) throw new Error('Problemas al crear el perfil...')
            const searched = await this.findById(newProfile._id)
            return searched
        }
            catch(err){
                console.error(err)
                throw err
            }
        }

    async findById(id){
        try{
            const searched = await Profile.findById(id)
            if (!searched) return null
            return getProfileDTO(searched)
        }catch(error){
            console.error(err)
            throw err 
        }
    }
    }
