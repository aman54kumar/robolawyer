from O365 import Account, FileSystemTokenBackend, MSGraphProtocol
from django.conf import settings


def Authenticate():
    clientID = settings.CLIENT_ID
    secretID = settings.SECRET_ID
    tenantID = settings.TENANT_ID

    credentials = (clientID, secretID)
    token_backend = FileSystemTokenBackend(
        token_path=settings.BASE_DIR, token_filename="o365_token.txt"
    )
    scopes = [
        "message_send",
        "message_send_shared",
        "offline_access",
    ]
    protocol = MSGraphProtocol(default_resource="justbot@tech-r.org")
    account = Account(
        credentials,
        tenant_id=tenantID,
        token_backend=token_backend,
        protocol=protocol,
    )
    if not account.is_authenticated:
        print("not authenticated")
        account.authenticate(scopes=scopes)
    else:
        print("Email Authenticated!")

    return account


# below code for env var in heroku
