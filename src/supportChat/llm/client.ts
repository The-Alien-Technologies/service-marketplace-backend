import OpenAI from "openai";

let client: OpenAI | null = null;                            
            
       function getClient(): OpenAI {                                
        if (!client) {                                           
       client = new OpenAI({ apiKey: process.env.OPEN_AI_KEY });                                                   
       }                                                         
       return client;                                    
      }                                                          


type GenerateTextOptions = {
    model?: string,
    prompt?: string,
    temperature?: number,
    maxToken?: number,
    instructions?: string,
    previousResponseId: string
}

type GenerateTextResponse = {
    id: string,
    text: string
}

export const llmClient = {
    async generateText( {
        model = 'gpt-4.1',
        prompt,
        temperature = 0.2,
        maxToken = 250,
        instructions,
        previousResponseId
    } : GenerateTextOptions) : Promise <GenerateTextResponse> {
       const response = await getClient().responses.create({
        model,
        input: prompt,
        temperature,
        instructions,
        max_output_tokens: maxToken,
        previous_response_id: previousResponseId

       });
       return {
        id: response.id,
        text: response.output_text
       }
    }
}