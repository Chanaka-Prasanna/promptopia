import { connectToDB } from "@utils/database"
import Prompt from "@models/prompt";
//  GET (read)


export const GET = async(req,{params})=>{
    try {
        await connectToDB()

        const prompt = await Prompt.findById(params.id).populate('creator')
        if(!prompt) return new Response('Pronpt not found',{
            status:404
        })
        return new Response(JSON.stringify(prompt),{
            status:200
        })
    } catch (error) {
        
        return new Response('Faild to fetch prompt',{
            status:500
        })
    }
}

// Patch (update)

export const PATCH = async (request,{params})=>{
    const {prompt,tag} = await request.json()
    try {
        await connectToDB()
        const existingPrompt = await Prompt.findById(params.id)
        if(!existingPrompt) return new Response('Pronpt not found',{
            status:404
        })

        existingPrompt.prompt = prompt;
        existingPrompt.tag = tag;
        await existingPrompt.save();

        return new Response(JSON.stringify(existingPrompt),{
            status:200
        })

    } catch (error) {
        return new Response('Faild to update prompt',{
            status:500
        })
    }
}

// DELETE (delete)
export const DELETE = async (request, { params }) => {
    try {

        await connectToDB();
        // Find the prompt by ID and remove it
        await Prompt.deleteOne({_id:params.id});

        return new Response("Prompt deleted successfully", { status: 200 });
    } catch (error) {
        console.log(error.message);
        
        return new Response("Error deleting prompt", { status: 500 });
    }
};
