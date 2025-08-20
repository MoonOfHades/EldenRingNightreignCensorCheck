import json
import time
import argparse
import os

# Utility for parsing JSON text files created by Smithbox because I have no idea how to dump the text entries straight to .txt if that's supported.
# Outputs unique blocked words as a multi-line text file
def main():
    parser = argparse.ArgumentParser(description="Extract unique Text entries from Smithbox export JSON.")
    parser.add_argument("input_file", "-input_file", "--input_file", help="Path to the JSON file")
    args = parser.parse_args()

    input_path = args.input_file

    with open(input_path, "r", encoding="utf-8") as f:
        data = json.load(f)

    # Name output file based on "Name" property
    base_name = data.get("Name", "output")
    timestamp_ms = int(time.time() * 1000)
    output_filename = f"{base_name}-{timestamp_ms}.txt"

    unique_text = set()

    # Traverse JSON to extract "Text" values
    for wrapper in data.get("FmgWrappers", []):
        fmg = wrapper.get("Fmg", {})
        entries = fmg.get("Entries", [])
        for entry in entries:
            text = entry.get("Text")
            if text is None:
                continue
            cleansed_text = text.strip().lower()
            if cleansed_text in unique_text:
                print("Skipping duplicate text entry: " + str(cleansed_text))
            else:
                unique_text.add(cleansed_text)
                

    # Write unique entries to file
    with open(output_filename, "w", encoding="utf-8") as out:
        for text in sorted(unique_text):
            out.write(text + "\n")

    print(f"Exported {len(unique_text)} unique entries to {output_filename}")

if __name__ == "__main__":
    main()
