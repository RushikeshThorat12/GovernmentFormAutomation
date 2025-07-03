# marksheet_service.py

import os
import logging
import tempfile
from flask import abort

from vision_api import extract_multilingual_text, extract_barcodes
from mark_parser import parse_marksheet_text

def extract_marksheet_data(flask_file) -> dict:
    """
    Saves upload, runs English OCR + barcode detection,
    returns {
      extracted_text: str,
      barcodes: [...],
      structured_data: {candidate_name, mother_name, subjects, percentage, result}
    }
    """
    suffix = os.path.splitext(flask_file.filename)[1]
    tmp = tempfile.NamedTemporaryFile(delete=False, suffix=suffix)
    flask_file.save(tmp.name)

    try:
        text = extract_multilingual_text(tmp.name, language_hints=["en"])
        codes = extract_barcodes(tmp.name)
        structured = parse_marksheet_text(text)
        return {
            "extracted_text": text,
            "barcodes": codes,
            "structured_data": structured
        }
    except Exception as e:
        logging.error(f"[marksheet_service] error: {e}")
        abort(500, description=str(e))
    finally:
        try:
            os.unlink(tmp.name)
        except OSError:
            pass
