import os
import subprocess

# Find all JSON files in directory and run script
for json_file in [f for f in os.listdir('.') if f.endswith('.json')]:
    print(f"Processing {json_file}...")
    subprocess.run(['python', 'parse-smithbox-output.py', '-input_file', json_file])

print("Done!")
