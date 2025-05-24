import numpy as np
import json

class EmbeddedTable:
    def __init__(self, output_labels: list[str] = None, data: dict = {}):
        self.embedding_labels = output_labels
        self.data             = data

    def load_json(self, json_path: str):
        with open(json_path, 'r') as file:
            data: dict = json.load(file)
        
        for key in data.keys():
            value = data.get(key)

            if key == 'labels':
                self.embedding_labels = value
                continue
            
            self.data[key] = value

    def get(self, query: str) -> np.array:
        if query in self.data.keys():
            return np.array(self.data.get(query))
        return -1
    
    def find_similar(self, embedding_query: list[int]) -> tuple[str, float]:
        vector_embedding = np.array(embedding_query)

        least_error = 1e99
        match_label = ""
        for label in self.data.keys():
            disease_embedding = self.get(label)
            curr_error = np.linalg.norm(vector_embedding - disease_embedding)

            if curr_error < least_error:
                least_error = curr_error
                match_label = label
        
        return (match_label, least_error)
        





