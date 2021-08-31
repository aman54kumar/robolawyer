from django.conf import settings
from storages.backends.azure_storage import AzureStorage


class AzureMediaStorage(AzureStorage):
    account_name = 'justbotstorage'  # Must be replaced by your <storage_account_name>
    account_key = 'NWN8car5cijH0pVmZx+M/7U+QE1TyNyZ9GIc6DUJDrccYfRce72VsvySIJFpjrh6icDEspaVReKvDu3ex2cUfA=='  # Must be replaced by your <storage_account_key>
    azure_container = 'media'
    expiration_secs = None


class AzureStaticStorage(AzureStorage):
    account_name = 'justbotstorage'  # Must be replaced by your storage_account_name
    account_key = 'NWN8car5cijH0pVmZx+M/7U+QE1TyNyZ9GIc6DUJDrccYfRce72VsvySIJFpjrh6icDEspaVReKvDu3ex2cUfA=='  # Must be replaced by your <storage_account_key>
    azure_container = 'static'
    expiration_secs = None
