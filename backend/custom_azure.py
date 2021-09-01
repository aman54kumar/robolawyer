from robolawyer.settings import AZURE_ACCOUNT_NAME, AZURE_STORAGE_KEY
from django.conf import settings
from storages.backends.azure_storage import AzureStorage


class AzureMediaStorage(AzureStorage):
    account_name = AZURE_ACCOUNT_NAME  # Must be replaced by your <storage_account_name>
    account_key = AZURE_STORAGE_KEY  # Must be replaced by your <storage_account_key>
    azure_container = 'media'
    expiration_secs = None


class AzureStaticStorage(AzureStorage):
    account_name = AZURE_ACCOUNT_NAME  # Must be replaced by your storage_account_name
    account_key = AZURE_STORAGE_KEY  # Must be replaced by your <storage_account_key>
    azure_container = 'static'
    expiration_secs = None
