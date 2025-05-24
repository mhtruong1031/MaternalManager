import pandas as pd

# Configurable
SYMPTOM_TABLE_PATH = 'resources/infant_symptom_table.csv'

def main() -> None:
    df = pd.read_csv(SYMPTOM_TABLE_PATH)
    df.to_json('app/static/infant_symptom_table.json')

if __name__ == '__main__':
    main()