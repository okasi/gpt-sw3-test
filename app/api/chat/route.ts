// import { HfInference } from '@huggingface/inference';
import { HfInferenceEndpoint } from "@huggingface/inference";
// import { HuggingFaceStream, Message, StreamingTextResponse } from 'ai';
// import { experimental_buildOpenAssistantPrompt } from 'ai/prompts';

// Create a new HuggingFace Inference instance
// const Hf = new HfInference(process.env.HUGGINGFACE_API_KEY);
const endpointUrl =
	"https://api-inference.huggingface.co/models/AI-Sweden-Models/gpt-sw3-1.3b-instruct";
const Hf = new HfInferenceEndpoint(
	endpointUrl,
	process.env.HUGGINGFACE_API_KEY,
);

// IMPORTANT! Set the runtime to edge
export const runtime = "edge";

// function buildSW3Prompt(messages: Pick<Message, 'content' | 'role'>[]) {
//   let prompt = "\n<s>\n";
//   messages.forEach(({ content, role }) => {
//     if (role === "user") {
//       prompt += `User:\n${content}\n<s>\n`;
//     } else if (role === "function") {
//       throw new Error("OpenAssistant does not support function calls.");
//     } else if (role === "system") {
//       throw new Error("OpenAssistant does not support system messages.");
//     } else {
//       prompt += `Bot:\n`;
//     }
//   });
//   return prompt;
// }

export async function POST(req: Request) {
	// Extract the `messages` from the body of the request
	const { messages } = await req.json();

	console.log("Messages:", messages);

	console.log("Trying to generate message");

	const response = await Hf.request({
		// model: 'AI-Sweden-Models/gpt-sw3-1.3b-instruct',
		//@ts-ignore
		inputs: messages,
		parameters: {
			max_new_tokens: 100,
			max_time: 23,
			repetition_penalty: 1.1,
			// do_sample: true,
			// temperature: 0.6,
			// top_p: 0.6,
			// truncate: 1000,
			// return_full_text: true,
		},
	});
	console.log("response", response);

	//@ts-ignore
	const { generated_text } = await response;

	// Convert the response into a friendly text-stream
	// const stream = HuggingFaceStream(response);

	// Respond with the stream
	// return new StreamingTextResponse(stream);
	return new Response(generated_text, {
		headers: {
			"content-type": "application/json;charset=UTF-8",
		},
	});
}
