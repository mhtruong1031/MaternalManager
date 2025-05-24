import numpy as np

from google import genai
from google.genai import types

from EmbeddedTable import EmbeddedTable
from config import *

from pydantic import BaseModel

SYMPTOM_PATH = "infant_symptom_embeddings.json"
MAX_TOKENS   = 1000

class Pipeline:
    def __init__(self):
        self.symptom_table             = EmbeddedTable(SYMPTOM_PATH)
        self.current_symptom_embedding = [0 for symptom in self.symptom_table.embedding_labels]

        # Gemini Configurables
        self.api_key       = API_KEY
        self.max_tokens    = MAX_TOKENS

        self.client = genai.Client(api_key=API_KEY)
    
    def gemini_query(self, prompt: str):
        response = self.chat.send_message(
            message = prompt,
            config  = types.GenerateContentConfig(
                system_instruction = f"ur mom"
            )
        )

        return response
    
    def parse_query_to_json(self, prompt: str):
        embedding  = []
        response = self.client.models.generate_content(
            model    = 'gemini-2.0-flash',
            contents = prompt,
            config   = {
                "response_mime_type": "application/json",
                "response_schema": list[SymptomEmbedding],
                "system_instruction": "You are a prompt parser. Please parse through prompts and return them as a json of 1's (true) when the user describes the matching symptom and 0's (false) when the user does not mention it."
            },
        )
        response = response.parsed[0]

        for symptom in self.symptom_table.embedding_labels:
            eval(f'embedding.append(int(response.{symptom}))')

        return embedding
    
    # Main runtime function
    def run(self, user_prompt: str) -> tuple[str, float]:
        user_embedding                 = self.parse_query_to_json(user_prompt)
        self.current_symptom_embedding = np.maximum(np.array(user_embedding), self.current_symptom_embedding)

        predicted_disease, error = self.symptom_table.find_similar(self.current_symptom_embedding)

        return (predicted_disease, error)


class SymptomEmbedding(BaseModel):
    diarrhea: int
    no_urine: int
    no_bowel: int
    stomach_pain: int
    fever: int
    breathing_fast: int
    rib_pull_in: int
    wheezing: int
    runny_nose: int
    umbilical_cord_problems: int
    jaundice: int
    crying: int
    no_sleepy: int
    sleepy: int
    no_milk: int
    vomit: int
    rash: int
    ear_pain: int
    sore_throat: int
