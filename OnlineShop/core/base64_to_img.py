import base64
from rest_framework.response import Response


def upload_photo(string, path):
    with open(path, 'wb') as file:
        try:
            file.write(base64.b64decode(string.encode('utf-8')))
        except Exception:
            return Response({'message': 'Invalid photo'}, 400)
