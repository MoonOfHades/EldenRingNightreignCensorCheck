import json
import time
import argparse
import os
import ftfy

# Utility for parsing the JSON text export files created by Smithbox because I have no idea how to dump the text entries straight to .txt (if that's supported).
# Outputs unique blocked words as a multi-line text file that will need to be renamed and placed in the expected directory for the game/language, ex: /public/assets/badwords/eldenring/french.txt
# Blocked word lists will be maintained on a best-effort basis.
def main():
    parser = argparse.ArgumentParser(description="Extract unique Text entries from Smithbox export JSON.")
    parser.add_argument("-input_file", "--input_file", help="Path to the JSON file", required=True)
    parser.add_argument("-encoding", "--encoding", help="Output file encoding (default: utf-8)")
    args = parser.parse_args()

    input_path = args.input_file
    output_encoding = args.encoding or "utf-8"

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
            # Clean the text using ftfy 
            cleansed_text = clean_text(text.strip().lower())
            if cleansed_text and cleansed_text not in unique_text:
                unique_text.add(cleansed_text)
            elif cleansed_text in unique_text:
                print("Skipping duplicate text entry: " + str(cleansed_text))
                

    with open(output_filename, "w", encoding=output_encoding) as out:
        for text in sorted(unique_text):
            out.write(text + "\n")

    print(f"Exported {len(unique_text)} unique entries to {output_filename}")
    print(f"Output file encoding: {output_encoding}")

# There were output issues parsing Thai and Arabic files as-is, so cleansing text
def clean_text(text):
    if not text:
        return text
    
     # Use ftfy for most cleanup
    cleaned = ftfy.fixes.remove_bom(text)
    cleaned = ftfy.fixes.remove_control_chars(cleaned)
    cleaned = ftfy.fix_text(
        cleaned,
        # NFC still had issues with Arabic, use NFKC mode
        normalization='NFKC'
    )
    
    # Remove bad unicode characters
    cleaned = remove_bad_unicode(cleaned)
    
    return cleaned.strip()

# Remove bad Unicode characters that ftfy doesn't handle
def remove_bad_unicode(text):

    bad_character_ranges = [
        (0x200B, 0x200D),  # Zero-width spaces and joiners
        (0xF700, 0xF8FF),  # Private Use Area
        #https://unicode.org/charts/PDF/UE000.pdf
        # Extended Private Use Area (exclude Arabic Presentation Forms)
        (0xE000, 0xF6FF),
    ]
    
    # Remove chars in bad ranges, keep otherwise
    return ''.join(
        char for char in text
        if not any(start <= ord(char) <= end for start, end in bad_character_ranges)
    )

if __name__ == "__main__":
    main()
