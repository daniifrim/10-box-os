#!/usr/bin/env -S uv run --script
# /// script
# requires-python = ">=3.8"
# dependencies = [
#     "openai",
#     "python-dotenv",
# ]
# ///

import os
import sys
from dotenv import load_dotenv


def prompt_llm(prompt_text):
    """
    Base OpenAI LLM prompting method using fastest model.

    Args:
        prompt_text (str): The prompt to send to the model

    Returns:
        str: The model's response text, or None if error
    """
    load_dotenv()

    api_key = os.getenv("OPENAI_API_KEY")
    if not api_key:
        return None

    try:
        from openai import OpenAI

        client = OpenAI(api_key=api_key)

        response = client.chat.completions.create(
            model="gpt-4.1-nano",  # Fastest OpenAI model
            messages=[{"role": "user", "content": prompt_text}],
            max_tokens=100,
            temperature=0.7,
        )

        return response.choices[0].message.content.strip()

    except Exception:
        return None


def generate_completion_message(conversation_context=None):
    """
    Generate a completion message with task summary using OpenAI LLM.
    
    Args:
        conversation_context (str): Recent conversation context
    
    Returns:
        str: A natural language completion message with task summary
    """
    engineer_name = os.getenv("ENGINEER_NAME", "").strip()
    
    if conversation_context:
        # Generate summary-based completion message
        name_part = f" {engineer_name}," if engineer_name else ""
        
        prompt = f"""Based on this conversation, generate a brief one-sentence summary of what the AI assistant accomplished, followed by "Ready for next task!"

Conversation context:
{conversation_context}

Requirements:
- Start with "I've completed the following task:"
- Continue with what was accomplished (e.g., "I created user login system", "I fixed database connection", "I added dark mode toggle")
- End with{name_part} Ready for next task!"
- Keep the summary under 15 words total
- Be specific about the main deliverable
- Return ONLY the completion message
- Do NOT include quotes or formatting

Example: "Added user authentication with JWT tokens. Ready for next task!"
"""
    else:
        # Fallback to generic message if no context
        if engineer_name:
            name_instruction = f"Sometimes (about 30% of the time) include the engineer's name '{engineer_name}' in a natural way."
            examples = f"""Examples of the style: 
- Standard: "Work complete!", "All done!", "Task finished!", "Ready for your next move!"
- Personalized: "{engineer_name}, all set!", "Ready for you, {engineer_name}!", "Complete, {engineer_name}!", "{engineer_name}, we're done!" """
        else:
            name_instruction = ""
            examples = """Examples of the style: "Work complete!", "All done!", "Task finished!", "Ready for your next move!" """

        prompt = f"""Generate a short, friendly completion message for when an AI coding assistant finishes a task. 

Requirements:
- Keep it under 10 words
- Make it positive and future focused
- Use natural, conversational language
- Focus on completion/readiness
- Do NOT include quotes, formatting, or explanations
- Return ONLY the completion message text
{name_instruction}

{examples}

Generate ONE completion message:"""

    response = prompt_llm(prompt)

    # Clean up response - remove quotes and extra formatting
    if response:
        response = response.strip().strip('"').strip("'").strip()
        # Take first line if multiple lines
        response = response.split("\n")[0].strip()

    return response or "Task complete! Ready for next task!"


def main():
    """Command line interface for testing."""
    if len(sys.argv) > 1:
        if sys.argv[1] == "--completion":
            # Check if conversation context is provided via stdin
            conversation_context = None
            if not sys.stdin.isatty():
                try:
                    conversation_context = sys.stdin.read().strip()
                except:
                    pass
            
            message = generate_completion_message(conversation_context)
            if message:
                print(message)
            else:
                print("Error generating completion message")
        else:
            prompt_text = " ".join(sys.argv[1:])
            response = prompt_llm(prompt_text)
            if response:
                print(response)
            else:
                print("Error calling OpenAI API")
    else:
        print("Usage: ./oai.py 'your prompt here' or ./oai.py --completion")


if __name__ == "__main__":
    main()
