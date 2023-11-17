"use client";

import { useChat } from "ai/react";

export default function Chat() {
	const { messages, input, handleInputChange, handleSubmit, isLoading } =
		useChat();

	return (
		<div className="flex flex-col w-full max-w-md py-24 mx-auto stretch">
			{messages.length > 0
				? messages.map((m) => (
						<div key={m.id} className="whitespace-pre-wrap mt-1">
							<b>
								{m.role === "user"
									? "👤 Användare: "
									: "🤖 gpt-sw3-1.3b-instruct: "}
							</b>
							<br />
							{m.content}
							<br />
						</div>
				  ))
				: null}

			<form
				onSubmit={handleSubmit}
				className="fixed bottom-0 w-full max-w-md mb-8"
			>
				<div className="relative">
					<input
						className={`w-full p-2 border border-gray-300 bg-white rounded shadow-xl ${
							isLoading ? "cursor-not-allowed" : ""
						}`}
						value={input}
						placeholder={isLoading ? "Genererar svar..." : "Säg något..."}
						onChange={handleInputChange}
						disabled={isLoading}
						// biome-ignore lint/a11y/noAutofocus: <explanation>
						autoFocus={true}
					/>
					{isLoading ? (
						<div className="absolute right-5 top-1/2 transform -translate-y-1/2 h-5 w-5 pointer-events-none">
							<svg
								className="animate-spin text-cyan-400"
								xmlns="http://www.w3.org/2000/svg"
								fill="none"
								viewBox="0 0 24 24"
							>
								<title>loading indicator</title>
								<circle
									className="opacity-25"
									cx="12"
									cy="12"
									r="10"
									stroke="currentColor"
									strokeWidth="4"
								/>
								<path
									className="opacity-75"
									fill="currentColor"
									d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
								/>
							</svg>
						</div>
					) : (
						<div className="absolute right-0 top-1/2 transform -translate-y-1/2 p-2 border border-gray-300 bg-black text-white rounded">
							<button type="submit">Skicka</button>
						</div>
					)}
				</div>
			</form>
		</div>
	);
}
